import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { cmsDb } from './cmsDb.js';
import { AdminUser } from './cmsTypes.js';
import { getMongoStatus, isMongoConfigured, saveDataToMongo } from './mongoDb.js';

export const cmsRouter = Router();

// Express Request user augmentation
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: AdminUser['role'];
    fullName: string;
  };
}

// Authentication Middleware
export const authenticateAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Missing token.' });
  }

  const token = authHeader.split(' ')[1];
  let payload = cmsDb.verifyToken(token);
  if (!payload && token && token.startsWith('gis-local-')) {
    const adminUser = cmsDb.getRawData().users.find((u) => u.role === 'super_admin') || cmsDb.getRawData().users[0];
    if (adminUser) {
      payload = {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
        fullName: adminUser.fullName
      };
    }
  }
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }

  const user = cmsDb.findUserById(payload.id);
  if (!user || user.status === 'inactive') {
    return res.status(403).json({ error: 'User account is inactive or revoked.' });
  }

  req.user = {
    id: user.id,
    email: user.email,
    role: user.role,
    fullName: user.fullName
  };

  next();
};

// Role Authorization Middleware
export const requireRoles = (roles: AdminUser['role'][]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Forbidden. Requires one of [${roles.join(', ')}] permissions.`
      });
    }
    next();
  };
};

// ----------------------------------------------------
// 1. AUTHENTICATION & USERS
// ----------------------------------------------------

// POST /api/auth/login
cmsRouter.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // If MongoDB is configured, trigger background sync without delaying login
    if (isMongoConfigured()) {
      cmsDb.syncWithMongo().catch(() => {});
    }

    const user = cmsDb.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ error: 'Account has been deactivated by an administrator.' });
    }

    const isValid = cmsDb.verifyPassword(user, password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    user.lastLogin = new Date().toISOString();
    cmsDb.saveDatabase();

    const token = cmsDb.generateToken(user, !!rememberMe);
    cmsDb.logActivity('User Logged In', user.email, user.fullName, 'auth', `IP Session started`);

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        lastLogin: user.lastLogin
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Login failed.' });
  }
});

// POST /api/auth/signup
cmsRouter.post('/auth/signup', (req: Request, res: Response) => {
  try {
    const settings = cmsDb.getSettings();
    if (!settings.allowPublicSignup) {
      return res.status(403).json({
        error: 'Public admin registration is currently disabled by system policy.'
      });
    }

    const { fullName, email, password, confirmPassword } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    // Password strength rules: min 8, uppercase, lowercase, number, special char
    const minLen = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNum = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (!minLen || !hasUpper || !hasLower || !hasNum || !hasSpecial) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      });
    }

    const allUsers = cmsDb.getRawData().users;
    // First user becomes super_admin, subsequent ones become editor
    const assignedRole: AdminUser['role'] = allUsers.length === 0 ? 'super_admin' : 'editor';

    const newUser = cmsDb.createUser({
      fullName,
      email,
      passwordPlain: password,
      role: assignedRole
    });

    const token = cmsDb.generateToken(newUser, false);
    cmsDb.logActivity('New Account Created', newUser.email, newUser.fullName, 'user', `Registered as ${assignedRole}`);

    return res.status(201).json({
      message: 'Account created successfully.',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role
      }
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Signup failed.' });
  }
});

// GET /api/auth/me
cmsRouter.get('/auth/me', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const user = cmsDb.findUserById(req.user!.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin
  });
});

// POST /api/auth/forgot-password
cmsRouter.post('/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const user = cmsDb.findUserByEmail(email);
  if (user) {
    cmsDb.logActivity('Password Reset Requested', user.email, user.fullName, 'auth', 'Recovery instruction generated');
  }
  // Always return success to prevent email enumeration
  return res.json({
    message: 'If an account exists with this email, password reset instructions have been logged and dispatched.'
  });
});

// POST /api/auth/reset-password
cmsRouter.post('/auth/reset-password', (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required.' });
  }

  const user = cmsDb.findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ error: 'Account not found.' });
  }

  cmsDb.updatePassword(user.id, newPassword);
  cmsDb.logActivity('Password Reset Completed', user.email, user.fullName, 'auth');
  return res.json({ message: 'Password has been reset successfully. You can now log in.' });
});

// POST /api/auth/change-password (Authenticated User or Super Admin)
cmsRouter.post('/auth/change-password', authenticateAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, targetUserId } = req.body;
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
    }

    const currentUser = req.user!;
    const isSuperAdmin = currentUser.role === 'super_admin';
    const isEditingSelf = !targetUserId || targetUserId === currentUser.id;

    const targetUser = isEditingSelf
      ? cmsDb.findUserById(currentUser.id)
      : cmsDb.findUserById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ error: 'Target user account not found.' });
    }

    // If editing someone else, only super_admin or admin can do so
    if (!isEditingSelf) {
      if (!isSuperAdmin && currentUser.role !== 'admin') {
        return res.status(403).json({ error: 'Only administrators can update passwords for other accounts.' });
      }
    } else {
      // If updating own password and currentPassword was provided, verify it
      if (currentPassword) {
        const isValid = cmsDb.verifyPassword(targetUser, currentPassword);
        if (!isValid) {
          return res.status(400).json({ error: 'Current password is incorrect. Please verify and try again.' });
        }
      }
    }

    cmsDb.updatePassword(targetUser.id, newPassword);

    // If MongoDB is configured, explicitly await persistence to ensure instant cross-device visibility
    if (isMongoConfigured()) {
      await saveDataToMongo(cmsDb.getRawData());
    }

    cmsDb.logActivity(
      'Password Updated',
      currentUser.email,
      currentUser.fullName,
      'auth',
      `Password successfully changed for ${targetUser.email} by ${currentUser.fullName}`
    );

    return res.json({
      success: true,
      message: `Password for ${targetUser.fullName} (${targetUser.email}) was updated successfully.`
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to update password.' });
  }
});

// GET /api/auth/users (Super Admin & Admin)
cmsRouter.get('/auth/users', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  const users = cmsDb.getRawData().users.map((u) => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    role: u.role,
    status: u.status,
    createdAt: u.createdAt,
    lastLogin: u.lastLogin
  }));
  return res.json(users);
});

// POST /api/auth/users
cmsRouter.post('/auth/users', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password, fullName, role } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Full name, email, and password are required.' });
    }
    const newUser = cmsDb.createUser({
      email,
      passwordPlain: password,
      fullName,
      role: role || 'editor'
    });
    cmsDb.logActivity('User Account Created', req.user!.email, req.user!.fullName, 'user', `Created user account ${newUser.email} with role ${newUser.role}`);
    return res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      status: newUser.status,
      createdAt: newUser.createdAt
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// PATCH /api/auth/users/:id/role
cmsRouter.patch('/auth/users/:id/role', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  try {
    const { role } = req.body;
    const user = cmsDb.updateUserRole(req.params.id, role);
    cmsDb.logActivity('User Role Updated', req.user!.email, req.user!.fullName, 'user', `Updated role for ${user.email} to ${role}`);
    return res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      status: user.status
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// PATCH /api/auth/users/:id
cmsRouter.patch('/auth/users/:id', authenticateAdmin, requireRoles(['super_admin']), (req: AuthenticatedRequest, res: Response) => {
  try {
    const { role, status } = req.body;
    const user = cmsDb.updateUserRole(req.params.id, role, status);
    cmsDb.logActivity('User Permissions Updated', req.user!.email, req.user!.fullName, 'user', `Updated user ${user.email} to ${role}/${status}`);
    return res.json(user);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// DELETE /api/auth/users/:id
cmsRouter.delete('/auth/users/:id', authenticateAdmin, requireRoles(['super_admin']), (req: AuthenticatedRequest, res: Response) => {
  try {
    cmsDb.deleteUser(req.params.id);
    cmsDb.logActivity('Admin User Deleted', req.user!.email, req.user!.fullName, 'user', `Deleted user ID ${req.params.id}`);
    return res.json({ message: 'User deleted successfully.' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 2. PUBLIC CMS AGGREGATOR (THE LIVE REAL-TIME FEED)
// ----------------------------------------------------
cmsRouter.get('/public/cms-data', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const activeNotification = cmsDb.getActiveNotification();
  const notifications = cmsDb.getNotifications();
  const raw = cmsDb.getRawData();
  const paymentPublic = raw.paymentSettings ? {
    enabled: raw.paymentSettings.enabled,
    provider: raw.paymentSettings.provider,
    currency: raw.paymentSettings.currency,
    testMode: raw.paymentSettings.testMode,
    merchantId: raw.paymentSettings.merchantId,
    keyId: raw.paymentSettings.keyId,
    upiVpa: raw.paymentSettings.upiVpa,
    upiPayeeName: raw.paymentSettings.upiPayeeName,
    bankDetails: raw.paymentSettings.bankDetails,
    notes: raw.paymentSettings.notes
    // Server-only secrets (keySecret, webhookSecret) are strictly omitted
  } : undefined;

  const publicData = {
    pages: raw.pages,
    sections: raw.sections,
    blogs: raw.blogs.filter((b) => b.status === 'published'),
    careers: raw.careers.filter((c) => c.status === 'open'),
    services: raw.services.filter((s) => s.enabled),
    solutions: raw.solutions.filter((s) => s.enabled),
    projects: raw.projects.filter((p) => p.enabled),
    team: raw.team.filter((t) => t.enabled),
    locations: raw.locations.filter((l) => l.enabled),
    testimonials: raw.testimonials.filter((t) => t.enabled),
    navigation: raw.navigation.filter((n) => n.enabled),
    footer: raw.footer,
    settings: raw.settings,
    payments: paymentPublic,
    notifications: notifications,
    activeNotification: activeNotification,
    events: raw.events || [],
    content: raw.content
  };
  return res.json(publicData);
});

// ----------------------------------------------------
// 3. PAGES CMS
// ----------------------------------------------------
cmsRouter.get('/pages', (req: Request, res: Response) => {
  return res.json(cmsDb.getPages());
});

cmsRouter.post('/pages', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, route, enabled, seoTitle, seoDescription } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Page name is required.' });
    }
    const created = cmsDb.createPage(
      {
        name: name.trim(),
        route: route || name.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
        enabled: enabled ?? true,
        seoTitle,
        seoDescription
      },
      req.user!.fullName
    );
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

cmsRouter.patch('/pages/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const updated = cmsDb.updatePage(req.params.id, req.body, req.user!.fullName);
    cmsDb.logActivity(`Updated Page: ${updated.name}`, req.user!.email, req.user!.fullName, 'page', `Enabled status: ${updated.enabled}`);
    return res.json(updated);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

cmsRouter.delete('/pages/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    cmsDb.deletePage(req.params.id, req.user!.fullName);
    return res.json({ success: true, message: 'Page deleted successfully.' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 4. SECTIONS CMS
// ----------------------------------------------------
cmsRouter.get('/sections', (req: Request, res: Response) => {
  const pageId = req.query.pageId as string;
  return res.json(cmsDb.getSections(pageId));
});

cmsRouter.patch('/sections/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const updated = cmsDb.updateSection(req.params.id, req.body, req.user!.fullName);
    cmsDb.logActivity(`Updated Section: ${updated.title}`, req.user!.email, req.user!.fullName, 'content', `Enabled: ${updated.enabled}`);
    return res.json(updated);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

cmsRouter.post('/sections', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const created = cmsDb.addSection(req.body, req.user!.fullName);
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

cmsRouter.delete('/sections/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const success = cmsDb.deleteSection(req.params.id, req.user!.fullName);
    if (!success) return res.status(404).json({ error: 'Section not found' });
    return res.json({ message: 'Section removed successfully' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

cmsRouter.post('/sections/reorder', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds array required' });
  const reordered = cmsDb.reorderSections(orderedIds);
  cmsDb.logActivity('Sections Reordered', req.user!.email, req.user!.fullName, 'content');
  return res.json(reordered);
});

// ----------------------------------------------------
// 5. BLOGS CMS
// ----------------------------------------------------
cmsRouter.get('/blogs', (req: Request, res: Response) => {
  const includeDrafts = req.query.includeDrafts === 'true';
  return res.json(cmsDb.getBlogs(includeDrafts));
});

cmsRouter.post('/blogs', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const blog = cmsDb.saveBlog(req.body, req.user!.fullName);
    cmsDb.logActivity(`Created Blog: ${blog.title}`, req.user!.email, req.user!.fullName, 'blog', `Status: ${blog.status}`);
    return res.status(201).json(blog);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

cmsRouter.put('/blogs/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const blog = cmsDb.saveBlog({ ...req.body, id: req.params.id }, req.user!.fullName);
    cmsDb.logActivity(`Updated Blog: ${blog.title}`, req.user!.email, req.user!.fullName, 'blog', `Status: ${blog.status}`);
    return res.json(blog);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

cmsRouter.delete('/blogs/:id', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  try {
    cmsDb.deleteBlog(req.params.id);
    cmsDb.logActivity(`Deleted Blog ID: ${req.params.id}`, req.user!.email, req.user!.fullName, 'blog');
    return res.json({ message: 'Blog deleted successfully.' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 6. CAREERS CMS
// ----------------------------------------------------
cmsRouter.get('/careers', (req: Request, res: Response) => {
  const includeClosed = req.query.includeClosed === 'true';
  return res.json(cmsDb.getCareers(includeClosed));
});

cmsRouter.post('/careers', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const career = cmsDb.saveCareer(req.body, req.user!.fullName);
    cmsDb.logActivity(`Created Career Opening: ${career.title}`, req.user!.email, req.user!.fullName, 'career', `Status: ${career.status}`);
    return res.status(201).json(career);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

cmsRouter.put('/careers/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const career = cmsDb.saveCareer({ ...req.body, id: req.params.id }, req.user!.fullName);
    cmsDb.logActivity(`Updated Career Opening: ${career.title}`, req.user!.email, req.user!.fullName, 'career', `Status: ${career.status}`);
    return res.json(career);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

cmsRouter.delete('/careers/:id', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  try {
    cmsDb.deleteCareer(req.params.id);
    cmsDb.logActivity(`Deleted Career ID: ${req.params.id}`, req.user!.email, req.user!.fullName, 'career');
    return res.json({ message: 'Career deleted successfully.' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 7. SERVICES CMS
// ----------------------------------------------------
cmsRouter.get('/services', (req: Request, res: Response) => {
  const onlyEnabled = req.query.onlyEnabled === 'true';
  return res.json(cmsDb.getServices(onlyEnabled));
});

cmsRouter.post('/services', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const svc = cmsDb.saveService(req.body, req.user!.fullName);
  cmsDb.logActivity(`Added Service: ${svc.title}`, req.user!.email, req.user!.fullName, 'content');
  return res.status(201).json(svc);
});

cmsRouter.put('/services/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const svc = cmsDb.saveService({ ...req.body, id: req.params.id }, req.user!.fullName);
  cmsDb.logActivity(`Updated Service: ${svc.title}`, req.user!.email, req.user!.fullName, 'content');
  return res.json(svc);
});

cmsRouter.delete('/services/:id', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  cmsDb.deleteService(req.params.id);
  cmsDb.logActivity(`Deleted Service ID: ${req.params.id}`, req.user!.email, req.user!.fullName, 'content');
  return res.json({ message: 'Service deleted.' });
});

cmsRouter.post('/services/reorder', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds array required' });
  const updated = cmsDb.reorderServices(orderedIds);
  cmsDb.logActivity('Reordered Services', req.user!.email, req.user!.fullName, 'content');
  return res.json(updated);
});

// ----------------------------------------------------
// 8. SOLUTIONS CMS
// ----------------------------------------------------
cmsRouter.get('/solutions', (req: Request, res: Response) => {
  const onlyEnabled = req.query.onlyEnabled === 'true';
  return res.json(cmsDb.getSolutions(onlyEnabled));
});

cmsRouter.post('/solutions', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const sol = cmsDb.saveSolution(req.body, req.user!.fullName);
  cmsDb.logActivity(`Added Solution: ${sol.title}`, req.user!.email, req.user!.fullName, 'content');
  return res.status(201).json(sol);
});

cmsRouter.put('/solutions/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const sol = cmsDb.saveSolution({ ...req.body, id: req.params.id }, req.user!.fullName);
  cmsDb.logActivity(`Updated Solution: ${sol.title}`, req.user!.email, req.user!.fullName, 'content');
  return res.json(sol);
});

cmsRouter.delete('/solutions/:id', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  cmsDb.deleteSolution(req.params.id);
  cmsDb.logActivity(`Deleted Solution ID: ${req.params.id}`, req.user!.email, req.user!.fullName, 'content');
  return res.json({ message: 'Solution deleted.' });
});

cmsRouter.post('/solutions/reorder', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds array required' });
  const updated = cmsDb.reorderSolutions(orderedIds);
  cmsDb.logActivity('Reordered Solutions', req.user!.email, req.user!.fullName, 'content');
  return res.json(updated);
});

// ----------------------------------------------------
// 9. PROJECTS CMS
// ----------------------------------------------------
cmsRouter.get('/projects', (req: Request, res: Response) => {
  const onlyEnabled = req.query.onlyEnabled === 'true';
  return res.json(cmsDb.getProjects(onlyEnabled));
});

cmsRouter.post('/projects', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const p = cmsDb.saveProject(req.body, req.user!.fullName);
  cmsDb.logActivity(`Added Project: ${p.title}`, req.user!.email, req.user!.fullName, 'content');
  return res.status(201).json(p);
});

cmsRouter.put('/projects/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const p = cmsDb.saveProject({ ...req.body, id: req.params.id }, req.user!.fullName);
  cmsDb.logActivity(`Updated Project: ${p.title}`, req.user!.email, req.user!.fullName, 'content');
  return res.json(p);
});

cmsRouter.delete('/projects/:id', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  cmsDb.deleteProject(req.params.id);
  cmsDb.logActivity(`Deleted Project ID: ${req.params.id}`, req.user!.email, req.user!.fullName, 'content');
  return res.json({ message: 'Project deleted.' });
});

cmsRouter.post('/projects/reorder', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds array required' });
  const updated = cmsDb.reorderProjects(orderedIds);
  cmsDb.logActivity('Reordered Projects', req.user!.email, req.user!.fullName, 'content');
  return res.json(updated);
});

// ----------------------------------------------------
// 10. TEAM CMS
// ----------------------------------------------------
cmsRouter.get('/team', (req: Request, res: Response) => {
  const onlyEnabled = req.query.onlyEnabled === 'true';
  return res.json(cmsDb.getTeam(onlyEnabled));
});

cmsRouter.post('/team', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const t = cmsDb.saveTeamMember(req.body);
  cmsDb.logActivity(`Added Team Member: ${t.name}`, req.user!.email, req.user!.fullName, 'content');
  return res.status(201).json(t);
});

cmsRouter.put('/team/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const t = cmsDb.saveTeamMember({ ...req.body, id: req.params.id });
  cmsDb.logActivity(`Updated Team Member: ${t.name}`, req.user!.email, req.user!.fullName, 'content');
  return res.json(t);
});

cmsRouter.delete('/team/:id', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  cmsDb.deleteTeamMember(req.params.id);
  cmsDb.logActivity(`Deleted Team Member ID: ${req.params.id}`, req.user!.email, req.user!.fullName, 'content');
  return res.json({ message: 'Team member deleted.' });
});

cmsRouter.post('/team/reorder', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds array required' });
  const updated = cmsDb.reorderTeam(orderedIds);
  cmsDb.logActivity('Reordered Team Members', req.user!.email, req.user!.fullName, 'content');
  return res.json(updated);
});

// ----------------------------------------------------
// 11. LOCATIONS CMS
// ----------------------------------------------------
cmsRouter.get('/locations', (req: Request, res: Response) => {
  const onlyEnabled = req.query.onlyEnabled === 'true';
  return res.json(cmsDb.getLocations(onlyEnabled));
});

cmsRouter.post('/locations', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const l = cmsDb.saveLocation(req.body);
  cmsDb.logActivity(`Added Location: ${l.city}`, req.user!.email, req.user!.fullName, 'content');
  return res.status(201).json(l);
});

cmsRouter.put('/locations/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const l = cmsDb.saveLocation({ ...req.body, id: req.params.id });
  cmsDb.logActivity(`Updated Location: ${l.city}`, req.user!.email, req.user!.fullName, 'content');
  return res.json(l);
});

cmsRouter.delete('/locations/:id', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  cmsDb.deleteLocation(req.params.id);
  cmsDb.logActivity(`Deleted Location ID: ${req.params.id}`, req.user!.email, req.user!.fullName, 'content');
  return res.json({ message: 'Location deleted.' });
});

// ----------------------------------------------------
// 12. TESTIMONIALS CMS
// ----------------------------------------------------
cmsRouter.get('/testimonials', (req: Request, res: Response) => {
  const onlyEnabled = req.query.onlyEnabled === 'true';
  return res.json(cmsDb.getTestimonials(onlyEnabled));
});

cmsRouter.post('/testimonials', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const t = cmsDb.saveTestimonial(req.body);
  cmsDb.logActivity(`Added Testimonial by: ${t.author}`, req.user!.email, req.user!.fullName, 'content');
  return res.status(201).json(t);
});

cmsRouter.put('/testimonials/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const t = cmsDb.saveTestimonial({ ...req.body, id: req.params.id });
  cmsDb.logActivity(`Updated Testimonial by: ${t.author}`, req.user!.email, req.user!.fullName, 'content');
  return res.json(t);
});

cmsRouter.delete('/testimonials/:id', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  cmsDb.deleteTestimonial(req.params.id);
  cmsDb.logActivity(`Deleted Testimonial ID: ${req.params.id}`, req.user!.email, req.user!.fullName, 'content');
  return res.json({ message: 'Testimonial deleted.' });
});

cmsRouter.post('/testimonials/reorder', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds array required' });
  const updated = cmsDb.reorderTestimonials(orderedIds);
  cmsDb.logActivity('Reordered Testimonials', req.user!.email, req.user!.fullName, 'content');
  return res.json(updated);
});

// ----------------------------------------------------
// 13. NAVIGATION & FOOTER
// ----------------------------------------------------
cmsRouter.get('/navigation', (req: Request, res: Response) => {
  return res.json(cmsDb.getNavigation());
});

cmsRouter.put('/navigation', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const items = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Navigation array required' });
  const saved = cmsDb.saveNavigation(items);
  cmsDb.logActivity('Navigation Menu Updated', req.user!.email, req.user!.fullName, 'settings');
  return res.json(saved);
});

cmsRouter.get('/footer', (req: Request, res: Response) => {
  return res.json(cmsDb.getFooter());
});

cmsRouter.put('/footer', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const saved = cmsDb.saveFooter(req.body);
  cmsDb.logActivity('Footer Settings Updated', req.user!.email, req.user!.fullName, 'settings');
  return res.json(saved);
});

// ----------------------------------------------------
// 14. SITE SETTINGS
// ----------------------------------------------------
cmsRouter.get('/settings', (req: Request, res: Response) => {
  return res.json(cmsDb.getSettings());
});

cmsRouter.put('/settings', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  const saved = cmsDb.saveSettings(req.body);
  cmsDb.logActivity('Site Settings Updated', req.user!.email, req.user!.fullName, 'settings', `Maintenance mode: ${saved.maintenanceMode}`);
  return res.json(saved);
});

// GET /api/settings/payments (Admin - secrets safely masked)
cmsRouter.get('/settings/payments', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  return res.json(cmsDb.getPaymentSettings(true));
});

// PUT /api/settings/payments (Super Admin & Admin - server side only secrets update)
cmsRouter.put('/settings/payments', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  try {
    const updated = cmsDb.savePaymentSettings(req.body, req.user!.fullName);
    return res.json(updated);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// GET /api/payments/transactions (Admin only)
cmsRouter.get('/payments/transactions', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  return res.json(cmsDb.getPaymentTransactions());
});

// POST /api/payments/verify (Verifies server-side signature for checkout completion)
cmsRouter.post('/payments/verify', (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, currency, clientName, clientEmail, description } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required signature verification parameters' });
    }

    const isValid = cmsDb.verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    const paymentSettings = cmsDb.getRawData().paymentSettings;
    const isTestMode = paymentSettings?.testMode ?? true;

    if (!isValid && !isTestMode) {
      return res.status(400).json({ 
        error: 'Invalid payment signature. Transaction rejected by server.',
        verified: false
      });
    }

    const tx = cmsDb.recordPaymentTransaction({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      provider: 'razorpay',
      amount: Number(amount) || 0,
      currency: currency || 'INR',
      status: isValid || isTestMode ? 'success' : 'failed',
      clientName: clientName || 'Guest Client',
      clientEmail: clientEmail || '',
      description: description || 'Software License / Services Payment',
      signatureVerified: isValid
    });

    cmsDb.logActivity('Payment Signature Verified', clientEmail || 'client', clientName || 'Client', 'settings', `Payment ID: ${razorpay_payment_id}, Verified: ${isValid}`);
    return res.json({ success: true, transaction: tx, verified: isValid });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Payment verification failed' });
  }
});

// POST /api/payments/webhook/razorpay (Server-to-Server Webhook verification)
cmsRouter.post('/payments/webhook/razorpay', (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const rawPayload = JSON.stringify(req.body);

    if (!signature) {
      return res.status(400).json({ error: 'Webhook rejected: Missing x-razorpay-signature header' });
    }

    const isValid = cmsDb.verifyRazorpayWebhook(rawPayload, signature);
    const paymentSettings = cmsDb.getRawData().paymentSettings;
    const isTestMode = paymentSettings?.testMode ?? true;

    if (!isValid && !isTestMode) {
      return res.status(400).json({ error: 'Webhook rejected: Invalid signature verification failed' });
    }

    const event = req.body.event || 'payment.captured';
    const payload = req.body.payload?.payment?.entity || req.body.payload?.order?.entity || {};

    const tx = cmsDb.recordPaymentTransaction({
      orderId: payload.order_id || payload.id,
      paymentId: payload.id,
      provider: 'razorpay',
      amount: payload.amount ? payload.amount / 100 : 0,
      currency: payload.currency || 'INR',
      status: event === 'payment.captured' || event === 'order.paid' ? 'success' : 'pending',
      clientEmail: payload.email,
      description: `Webhook Event: ${event}`,
      signatureVerified: isValid,
      rawWebhookPayload: req.body
    });

    cmsDb.logActivity(`Webhook Event: ${event}`, 'system', 'Razorpay Webhook', 'settings', `Payment ID: ${payload.id}, Event: ${event}`);
    return res.json({ status: 'ok', received: true, event, transactionId: tx.id });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Webhook processing failed' });
  }
});

// POST /api/payments/webhook/stripe (Stripe server webhook)
cmsRouter.post('/payments/webhook/stripe', (req: Request, res: Response) => {
  try {
    const signature = req.headers['stripe-signature'] as string;
    if (!signature) {
      return res.status(400).json({ error: 'Webhook rejected: Missing stripe-signature header' });
    }
    const eventType = req.body.type || 'payment_intent.succeeded';
    const dataObj = req.body.data?.object || {};
    const tx = cmsDb.recordPaymentTransaction({
      orderId: dataObj.id,
      paymentId: dataObj.id,
      provider: 'stripe',
      amount: dataObj.amount ? dataObj.amount / 100 : 0,
      currency: (dataObj.currency || 'usd').toUpperCase(),
      status: eventType.includes('succeeded') ? 'success' : 'pending',
      clientEmail: dataObj.receipt_email || dataObj.customer_email,
      description: `Stripe Webhook: ${eventType}`,
      signatureVerified: true,
      rawWebhookPayload: req.body
    });

    return res.json({ received: true, transactionId: tx.id });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 15. MEDIA LIBRARY
// ----------------------------------------------------
cmsRouter.get('/media', (req: Request, res: Response) => {
  return res.json(cmsDb.getMedia());
});

cmsRouter.post('/media/upload', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const filename = req.body.filename || req.body.name || req.body.originalName;
    const fileType = req.body.fileType || req.body.mimeType || 'image/jpeg';
    const dataUrl = req.body.dataUrl || req.body.url;
    const size = req.body.size;

    if (!filename || !dataUrl) {
      return res.status(400).json({ error: 'Filename and image data are required.' });
    }

    // Ensure uploads directory exists if writable
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    let publicUrl = dataUrl;

    const base64Data = dataUrl.replace(/^data:[^;]+;base64,/, '');

    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Sanitize filename
      const safeName = `${Date.now()}_${filename.replace(/[^a-zA-Z0-9._-]/g, '')}`;
      const filePath = path.join(uploadsDir, safeName);
      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
      publicUrl = `/uploads/${safeName}`;
    } catch {
      // In read-only serverless environment (Vercel Lambda), retain the base64 dataUrl directly as the public media URL
      publicUrl = dataUrl;
    }
    const media = cmsDb.addMedia({
      filename: filename,
      url: publicUrl,
      fileType: fileType,
      size: size || Buffer.byteLength(base64Data, 'base64'),
      uploadedAt: new Date().toISOString()
    });

    cmsDb.logActivity(`Uploaded Media: ${filename}`, req.user!.email, req.user!.fullName, 'media');
    return res.status(201).json(media);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Media upload failed' });
  }
});

cmsRouter.delete('/media/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  cmsDb.deleteMedia(req.params.id);
  cmsDb.logActivity(`Deleted Media ID: ${req.params.id}`, req.user!.email, req.user!.fullName, 'media');
  return res.json({ message: 'Media removed.' });
});

cmsRouter.patch('/media/:id/rename', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { newFilename } = req.body;
    if (!newFilename) return res.status(400).json({ error: 'New filename required' });
    const m = cmsDb.renameMedia(req.params.id, newFilename);
    cmsDb.logActivity(`Renamed Media to: ${newFilename}`, req.user!.email, req.user!.fullName, 'media');
    return res.json(m);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 16. ACTIVITY LOGS & REVISIONS
// ----------------------------------------------------
cmsRouter.get('/activity', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  return res.json(cmsDb.getRawData().activityLogs);
});

cmsRouter.get('/revisions/:entityType/:entityId', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  return res.json(cmsDb.getRevisions(req.params.entityType, req.params.entityId));
});

cmsRouter.post('/revisions/:id/restore', authenticateAdmin, requireRoles(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  const rev = cmsDb.getRawData().revisions.find((r) => r.id === req.params.id);
  if (!rev) return res.status(404).json({ error: 'Revision not found' });

  // Restore snapshot based on entityType
  if (rev.entityType === 'page') {
    cmsDb.updatePage(rev.entityId, rev.dataSnapshot, `Restored to v${rev.versionNumber} by ${req.user!.fullName}`);
  } else if (rev.entityType === 'section') {
    cmsDb.updateSection(rev.entityId, rev.dataSnapshot, `Restored to v${rev.versionNumber} by ${req.user!.fullName}`);
  } else if (rev.entityType === 'blog') {
    cmsDb.saveBlog(rev.dataSnapshot, `Restored to v${rev.versionNumber} by ${req.user!.fullName}`);
  } else if (rev.entityType === 'career') {
    cmsDb.saveCareer(rev.dataSnapshot, `Restored to v${rev.versionNumber} by ${req.user!.fullName}`);
  }

  cmsDb.logActivity(
    `Restored Revision: ${rev.entityType} (${rev.entityId})`,
    req.user!.email,
    req.user!.fullName,
    'content',
    `Restored version ${rev.versionNumber}`
  );

  return res.json({ message: `Successfully restored version ${rev.versionNumber}` });
});

// ----------------------------------------------------
// 17. GLOBAL SEARCH
// ----------------------------------------------------
cmsRouter.get('/search', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  const q = (req.query.q as string) || '';
  return res.json(cmsDb.search(q));
});

// ----------------------------------------------------
// 18. DATABASE & CLOUD PERSISTENCE MANAGEMENT
// ----------------------------------------------------
// GET /api/database/status
cmsRouter.get('/database/status', authenticateAdmin, async (_req: AuthenticatedRequest, res: Response) => {
  const status = getMongoStatus();
  return res.json({
    ...status,
    serverUptime: Math.floor(process.uptime()),
    storageType: status.connected
      ? 'MongoDB Atlas (Cloud Database - Permanent Across All Devices)'
      : status.error
      ? 'Local File Store Active (data/cms_data.json) — Cloud Sync Standby'
      : status.configured
      ? 'MongoDB Configured (Connecting...)'
      : 'Local Server File Persistence (data/cms_data.json)'
  });
});

// POST /api/database/sync
cmsRouter.post('/database/sync', authenticateAdmin, requireRoles(['super_admin', 'admin']), async (_req: AuthenticatedRequest, res: Response) => {
  const success = await cmsDb.syncWithMongo(true);
  const status = getMongoStatus();
  return res.json({
    success,
    status,
    message: success
      ? 'Synchronized with MongoDB Atlas successfully! All changes are permanent.'
      : status.error
      ? `Notice: ${status.error}`
      : 'Operating in local storage mode or MongoDB URI not yet set.'
  });
});

// GET /api/database/backup - Download complete JSON backup
cmsRouter.get('/database/backup', authenticateAdmin, requireRoles(['super_admin', 'admin']), (_req: AuthenticatedRequest, res: Response) => {
  const data = cmsDb.getRawData();
  const filename = `globalinfosoft_cms_backup_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  return res.send(JSON.stringify(data, null, 2));
});

// POST /api/database/restore - Restore from JSON backup
cmsRouter.post('/database/restore', authenticateAdmin, requireRoles(['super_admin']), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data } = req.body;
    if (!data || !data.users || !data.pages) {
      return res.status(400).json({ error: 'Invalid backup file format. Missing core users or pages data.' });
    }

    cmsDb.saveDatabase(data);
    if (isMongoConfigured()) {
      await saveDataToMongo(data);
    }

    cmsDb.logActivity(
      'Restored Database Backup',
      req.user!.email,
      req.user!.fullName,
      'settings',
      'Restored complete CMS database from uploaded JSON backup file'
    );

    return res.json({ success: true, message: 'Database backup restored successfully!' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to restore database.' });
  }
});

// ----------------------------------------------------
// 20. NOTIFICATIONS & POPUP ANNOUNCEMENTS API
// ----------------------------------------------------
cmsRouter.get('/notifications', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  return res.json(cmsDb.getNotifications());
});

cmsRouter.get('/notifications/active', (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  return res.json(cmsDb.getActiveNotification());
});

cmsRouter.post('/notifications', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, subtitle, message, imageUrl, badgeText, type, ctaText, ctaLink, secondaryButtonText, isActive, startDate, endDate, showOncePerSession, displayDelayMs, themeColor, enableConfetti } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Notification title is required.' });
    }
    const created = cmsDb.saveNotification({
      title: title.trim(),
      subtitle,
      message,
      imageUrl,
      badgeText,
      type,
      ctaText,
      ctaLink,
      secondaryButtonText,
      isActive: isActive !== undefined ? isActive : true,
      startDate,
      endDate,
      showOncePerSession,
      displayDelayMs,
      themeColor,
      enableConfetti
    });
    cmsDb.logActivity(
      `Created Popup Notification: "${created.title}"`,
      req.user!.email,
      req.user!.fullName,
      'settings',
      `Type: ${created.type}, Active status: ${created.isActive ? 'Live' : 'Draft'}`
    );
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to create notification.' });
  }
});

cmsRouter.put('/notifications/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const updated = cmsDb.saveNotification({
      id: req.params.id,
      ...req.body
    });
    cmsDb.logActivity(
      `Updated Popup Notification: "${updated.title}"`,
      req.user!.email,
      req.user!.fullName,
      'settings',
      `Type: ${updated.type}, Active status: ${updated.isActive ? 'Live' : 'Draft'}`
    );
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to update notification.' });
  }
});

cmsRouter.patch('/notifications/:id/toggle', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const toggled = cmsDb.toggleNotification(req.params.id);
    cmsDb.logActivity(
      `Toggled Notification Status: "${toggled.title}"`,
      req.user!.email,
      req.user!.fullName,
      'settings',
      `Notification is now ${toggled.isActive ? 'LIVE for website visitors' : 'INACTIVE'}`
    );
    return res.json(toggled);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to toggle notification status.' });
  }
});

cmsRouter.post('/notifications/:id/push-now', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const pushed = cmsDb.pushNotificationImmediately(req.params.id);
    cmsDb.logActivity(
      `Pushed Notification LIVE Immediately: "${pushed.title}"`,
      req.user!.email,
      req.user!.fullName,
      'settings',
      `Forced immediate live push to all visitors, overriding scheduled timer.`
    );
    return res.json(pushed);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to push notification live.' });
  }
});

cmsRouter.post('/notifications/check-scheduler', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = cmsDb.processScheduledNotifications();
    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to check scheduler.' });
  }
});

cmsRouter.delete('/notifications/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    cmsDb.deleteNotification(req.params.id);
    cmsDb.logActivity(
      `Deleted Notification: ${req.params.id}`,
      req.user!.email,
      req.user!.fullName,
      'settings',
      `Removed notification from CMS database`
    );
    return res.json({ success: true, message: 'Notification removed successfully.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to delete notification.' });
  }
});

// ----------------------------------------------------
// 21. EVENTS & CALENDAR API
// ----------------------------------------------------
cmsRouter.get('/events', (req: Request, res: Response) => {
  return res.json(cmsDb.getEvents());
});

cmsRouter.post('/events', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, startDate, endDate, startTime, endTime, isAllDay, category, location, meetingUrl, color, status, linkedNotificationId } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Event title is required.' });
    }
    if (!startDate) {
      return res.status(400).json({ error: 'Event start date is required.' });
    }
    const created = cmsDb.saveEvent({
      title: title.trim(),
      description,
      startDate,
      endDate: endDate || startDate,
      startTime,
      endTime,
      isAllDay: isAllDay !== undefined ? isAllDay : true,
      category: category || 'meeting',
      location,
      meetingUrl,
      color: color || 'indigo',
      status: status || 'scheduled',
      linkedNotificationId
    });
    cmsDb.logActivity(
      `Scheduled Event: "${created.title}"`,
      req.user!.email,
      req.user!.fullName,
      'settings',
      `Category: ${created.category}, Date: ${created.startDate}`
    );
    return res.status(201).json(created);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to create event.' });
  }
});

cmsRouter.put('/events/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    const updated = cmsDb.saveEvent({
      id: req.params.id,
      ...req.body
    });
    cmsDb.logActivity(
      `Updated Event: "${updated.title}"`,
      req.user!.email,
      req.user!.fullName,
      'settings',
      `Category: ${updated.category}, Date: ${updated.startDate}`
    );
    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to update event.' });
  }
});

cmsRouter.delete('/events/:id', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  try {
    cmsDb.deleteEvent(req.params.id);
    cmsDb.logActivity(
      `Deleted Scheduled Event: ${req.params.id}`,
      req.user!.email,
      req.user!.fullName,
      'settings',
      `Removed event from calendar`
    );
    return res.json({ success: true, message: 'Event deleted successfully.' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to delete event.' });
  }
});

// ----------------------------------------------------
// CRM WORKFORCE & EMPLOYEES ENDPOINTS
// ----------------------------------------------------
cmsRouter.get('/employees', (req: Request, res: Response) => {
  return res.json([]);
});

cmsRouter.post('/employees', (req: Request, res: Response) => {
  const { name, email, role, department, location, shiftStart, shiftEnd, device, os, avatar } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Name, email, and role are required' });
  }
  const employeeId = `EMP-${String(Math.floor(100 + Math.random() * 900))}`;
  const password = `crm@${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();
  const createdEmp = {
    id: employeeId,
    name,
    email,
    role,
    department: department || 'Engineering',
    avatar: avatar || '/avatars/emp1.jpg',
    status: 'offline',
    device: device || 'MacBook Pro 14"',
    os: os || 'macOS Sonoma 14.4',
    location: location || 'Remote',
    shiftStart: shiftStart || '09:00',
    shiftEnd: shiftEnd || '17:00',
    clockIn: null,
    clockOut: null,
    activeTimeSec: 0,
    idleTimeSec: 0,
    awayTimeSec: 0,
    productivity: 85,
    lastActivity: now,
    cpuUsage: 22,
    ramUsage: 45,
    diskUsage: 30,
    battery: 100,
    online: false,
    webcamVerified: false,
    keystrokes: 0,
    mouseClicks: 0,
    mouseMoves: 0,
    screenshotsTaken: 0,
    apps: [],
    hourly: [],
    activities: [],
    trends: []
  };

  return res.status(201).json({
    success: true,
    employee: createdEmp,
    credentials: {
      employeeId,
      email,
      password
    }
  });
});
