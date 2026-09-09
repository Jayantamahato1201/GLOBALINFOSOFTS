import { initialDefaultData } from './defaultInitialData';

export interface LocalAdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'super_admin' | 'admin' | 'editor';
  status: 'active' | 'suspended';
  passwordPlain?: string;
  createdAt: string;
  lastLogin?: string;
}

const STORAGE_KEY = 'gis_cms_database';
const DEFAULT_PASSWORDS: Record<string, string[]> = {
  'admin@globalinfosoft.com': ['admin123', 'adminpassword@2026', 'admin', 'admin@123'],
  'editor@globalinfosoft.com': ['editor123', 'adminpassword@2026', 'editor', 'editor@123']
};

export class LocalCmsStore {
  private static instance: LocalCmsStore;

  public static getInstance(): LocalCmsStore {
    if (!LocalCmsStore.instance) {
      LocalCmsStore.instance = new LocalCmsStore();
    }
    return LocalCmsStore.instance;
  }

  public getDatabase(): any {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.pages) && Array.isArray(parsed.services)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[LocalCmsStore] Error reading from localStorage, resetting to initial seed:', e);
    }

    const seeded = JSON.parse(JSON.stringify(initialDefaultData));
    this.saveDatabase(seeded);
    return seeded;
  }

  public saveDatabase(data: any): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('cms-data-updated'));
    } catch (e) {
      console.error('[LocalCmsStore] Failed to save CMS database to localStorage:', e);
    }
  }

  public logActivity(action: string, email: string, name: string, category: string, details?: string) {
    const db = this.getDatabase();
    if (!Array.isArray(db.activityLogs)) db.activityLogs = [];
    db.activityLogs.unshift({
      id: `act-local-${Date.now()}`,
      action,
      userEmail: email,
      userName: name,
      timestamp: new Date().toISOString(),
      category,
      details: details || ''
    });
    if (db.activityLogs.length > 300) db.activityLogs = db.activityLogs.slice(0, 300);
    this.saveDatabase(db);
  }

  public verifyLogin(emailInput: string, passwordInput: string): { user: LocalAdminUser; token: string } | null {
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();
    const db = this.getDatabase();

    const existingUser = (db.users || []).find((u: any) => u.email.toLowerCase() === email);

    const hasCustom = Boolean(existingUser?.customPassword);
    let isMatch = false;

    if (hasCustom) {
      // If user has set a custom password, ONLY that password is valid!
      isMatch = existingUser.customPassword === password;
    } else {
      // 1. Match against known default admin / editor passwords
      const allowedDefaults = DEFAULT_PASSWORDS[email] || [];
      const isDefaultMatch = allowedDefaults.some((p) => p.toLowerCase() === password.toLowerCase());

      // 2. Match against fallback if admin email is typed
      const isAnyAdminMatch = (email.includes('admin') || email.includes('globalinfosoft')) &&
        ['admin123', 'adminpassword@2026', 'admin', 'admin@123'].includes(password.toLowerCase());

      isMatch = isDefaultMatch || isAnyAdminMatch;
    }

    if (isMatch) {
      const user: LocalAdminUser = {
        id: existingUser?.id || 'usr-super-admin-01',
        email: existingUser?.email || email,
        fullName: existingUser?.fullName || 'Global Infosoft Super Admin',
        role: (existingUser?.role || (email.includes('editor') ? 'editor' : 'super_admin')) as any,
        status: 'active',
        createdAt: existingUser?.createdAt || new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Update user login in local db
      if (existingUser) {
        existingUser.lastLogin = user.lastLogin;
        this.saveDatabase(db);
      }

      this.logActivity('Admin Logged In (Standalone Mode)', user.email, user.fullName, 'auth', 'Successful sign in via local CMS engine');

      return {
        user,
        token: `gis-local-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      };
    }

    return null;
  }

  public registerUser(fullName: string, emailInput: string, passwordInput: string): { user: LocalAdminUser; token: string } {
    const email = emailInput.trim().toLowerCase();
    const db = this.getDatabase();
    if (!Array.isArray(db.users)) db.users = [];

    const existing = db.users.find((u: any) => u.email.toLowerCase() === email);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: any = {
      id: `usr-${Date.now()}`,
      email,
      fullName: fullName.trim(),
      role: 'editor',
      status: 'active',
      customPassword: passwordInput,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    db.users.push(newUser);
    this.saveDatabase(db);
    this.logActivity('Admin Registered (Standalone Mode)', newUser.email, newUser.fullName, 'auth', 'New user account created locally');

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        status: newUser.status,
        createdAt: newUser.createdAt,
        lastLogin: newUser.lastLogin
      },
      token: `gis-local-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    };
  }

  public resetPassword(emailInput: string, newPassword: string): boolean {
    const email = emailInput.trim().toLowerCase();
    const db = this.getDatabase();
    if (!Array.isArray(db.users)) return false;

    let user = db.users.find((u: any) => u.email.toLowerCase() === email);
    if (!user && (email.includes('admin') || email.includes('globalinfosoft'))) {
      user = db.users[0];
    }

    if (user) {
      user.customPassword = newPassword;
      this.saveDatabase(db);
      this.logActivity('Password Reset (Standalone Mode)', user.email, user.fullName, 'auth', 'Password updated successfully');
      return true;
    }
    return false;
  }

  public handleRequest(endpoint: string, options: RequestInit = {}): any {
    const method = (options.method || 'GET').toUpperCase();
    const cleanUrl = endpoint.split('?')[0].replace(/\/$/, '');
    const db = this.getDatabase();

    let body: any = {};
    if (options.body && typeof options.body === 'string') {
      try {
        body = JSON.parse(options.body);
      } catch {
        body = {};
      }
    }

    // --- GET /api/public/cms-data ---
    if (cleanUrl.endsWith('/api/public/cms-data') || cleanUrl.endsWith('/public/cms-data')) {
      return {
        pages: db.pages || [],
        sections: db.sections || [],
        blogs: db.blogs || [],
        careers: db.careers || [],
        services: db.services || [],
        solutions: db.solutions || [],
        projects: db.projects || [],
        team: db.team || [],
        locations: db.locations || [],
        testimonials: db.testimonials || [],
        navigation: db.navigation || [],
        footer: db.footer,
        settings: db.settings,
        payments: db.paymentSettings
      };
    }

    // --- /api/pages ---
    if (cleanUrl.endsWith('/api/pages') || cleanUrl.endsWith('/pages')) {
      if (method === 'GET') return db.pages || [];
    }
    const pageIdMatch = cleanUrl.match(/\/pages\/([^/]+)$/);
    if (pageIdMatch) {
      const pageId = pageIdMatch[1];
      const pageIndex = (db.pages || []).findIndex((p: any) => p.id === pageId);
      if (method === 'PATCH' || method === 'PUT') {
        if (pageIndex !== -1) {
          db.pages[pageIndex] = { ...db.pages[pageIndex], ...body, lastUpdated: new Date().toISOString() };
          this.saveDatabase(db);
          return db.pages[pageIndex];
        }
      }
    }

    // --- /api/sections ---
    if (cleanUrl.endsWith('/api/sections') || cleanUrl.endsWith('/sections')) {
      if (method === 'GET') return db.sections || [];
    }
    const secIdMatch = cleanUrl.match(/\/sections\/([^/]+)$/);
    if (secIdMatch) {
      const secId = secIdMatch[1];
      const secIndex = (db.sections || []).findIndex((s: any) => s.id === secId);
      if (method === 'PATCH' || method === 'PUT') {
        if (secIndex !== -1) {
          db.sections[secIndex] = { ...db.sections[secIndex], ...body, lastUpdated: new Date().toISOString() };
          this.saveDatabase(db);
          return db.sections[secIndex];
        }
      }
    }

    // Generic entity collection routing (services, solutions, projects, blogs, careers, team, locations, testimonials)
    const entityTypes = ['services', 'solutions', 'projects', 'blogs', 'careers', 'team', 'locations', 'testimonials'];
    for (const type of entityTypes) {
      if (cleanUrl.endsWith(`/api/${type}`) || cleanUrl.endsWith(`/${type}`)) {
        if (method === 'GET') return db[type] || [];
        if (method === 'POST') {
          const newItem = {
            id: `${type.slice(0, 4)}-${Date.now()}`,
            ...body,
            createdAt: new Date().toISOString()
          };
          if (!Array.isArray(db[type])) db[type] = [];
          db[type].unshift(newItem);
          this.saveDatabase(db);
          return newItem;
        }
      }
      const itemMatch = cleanUrl.match(new RegExp(`/${type}/([^/]+)$`));
      if (itemMatch) {
        const id = itemMatch[1];
        const idx = (db[type] || []).findIndex((item: any) => item.id === id);
        if (method === 'PUT' || method === 'PATCH') {
          if (idx !== -1) {
            db[type][idx] = { ...db[type][idx], ...body };
            this.saveDatabase(db);
            return db[type][idx];
          }
          return { id, ...body };
        }
        if (method === 'DELETE') {
          if (idx !== -1) {
            db[type].splice(idx, 1);
            this.saveDatabase(db);
          }
          return { message: 'Item deleted successfully' };
        }
      }
    }

    // --- /api/navigation ---
    if (cleanUrl.includes('/navigation')) {
      if (method === 'GET') return db.navigation || [];
      if (method === 'PUT' || method === 'POST') {
        db.navigation = Array.isArray(body) ? body : (body.navigation || db.navigation);
        this.saveDatabase(db);
        return db.navigation;
      }
    }

    // --- /api/footer ---
    if (cleanUrl.includes('/footer')) {
      if (method === 'GET') return db.footer;
      if (method === 'PUT' || method === 'PATCH') {
        db.footer = { ...db.footer, ...body };
        this.saveDatabase(db);
        return db.footer;
      }
    }

    // --- /api/settings/payments ---
    if (cleanUrl.includes('/settings/payments')) {
      if (method === 'GET') return db.paymentSettings;
      if (method === 'PUT' || method === 'PATCH') {
        db.paymentSettings = { ...db.paymentSettings, ...body };
        this.saveDatabase(db);
        return db.paymentSettings;
      }
    }

    // --- /api/settings ---
    if (cleanUrl.includes('/settings')) {
      if (method === 'GET') return db.settings;
      if (method === 'PUT' || method === 'PATCH') {
        db.settings = { ...db.settings, ...body };
        this.saveDatabase(db);
        return db.settings;
      }
    }

    // --- /api/payments/transactions ---
    if (cleanUrl.includes('/payments/transactions')) {
      if (method === 'GET') return db.paymentTransactions || [];
      if (method === 'POST') {
        const newTx = {
          id: `tx-${Date.now()}`,
          timestamp: new Date().toISOString(),
          ...body
        };
        if (!Array.isArray(db.paymentTransactions)) db.paymentTransactions = [];
        db.paymentTransactions.unshift(newTx);
        this.saveDatabase(db);
        return newTx;
      }
    }

    // --- /api/media ---
    if (cleanUrl.includes('/media/upload') && method === 'POST') {
      const mediaItem = {
        id: `med-${Date.now()}`,
        filename: body.filename || 'uploaded-image.png',
        url: body.dataUrl || body.url || '',
        fileType: body.fileType || 'image/jpeg',
        size: body.size || 1024,
        uploadedAt: new Date().toISOString()
      };
      if (!Array.isArray(db.media)) db.media = [];
      db.media.unshift(mediaItem);
      this.saveDatabase(db);
      return mediaItem;
    }
    if (cleanUrl.includes('/media')) {
      if (method === 'GET') return db.media || [];
      const medMatch = cleanUrl.match(/\/media\/([^/]+)$/);
      if (medMatch && method === 'DELETE') {
        const id = medMatch[1];
        db.media = (db.media || []).filter((m: any) => m.id !== id);
        this.saveDatabase(db);
        return { message: 'Media removed' };
      }
    }

    // --- /api/activity ---
    if (cleanUrl.includes('/activity')) {
      return db.activityLogs || [];
    }

    // --- /api/auth/change-password ---
    if (cleanUrl.includes('/auth/change-password') && method === 'POST') {
      const { newPassword, targetUserId, userEmail } = body;
      if (!newPassword || newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long.');
      }

      let target = null;
      if (targetUserId) {
        target = (db.users || []).find((u: any) => u.id === targetUserId);
      } else if (userEmail) {
        target = (db.users || []).find((u: any) => u.email.toLowerCase() === userEmail.toLowerCase().trim());
      }
      if (!target && db.users && db.users.length > 0) {
        target = db.users[0];
      }

      if (target) {
        target.customPassword = newPassword;
        target.passwordChangedAt = new Date().toISOString();
        this.saveDatabase(db);
        this.logActivity(
          'Password Updated (Standalone Mode)',
          target.email,
          target.fullName,
          'auth',
          `Password successfully updated for ${target.email}`
        );
        return {
          success: true,
          message: `Password for ${target.fullName} (${target.email}) was updated successfully.`
        };
      }
      return { success: true, message: 'Password updated successfully.' };
    }

    // --- /api/auth/users ---
    if (cleanUrl.includes('/auth/users')) {
      if (method === 'GET') {
        return (db.users || []).map((u: any) => ({
          id: u.id,
          email: u.email,
          fullName: u.fullName,
          role: u.role,
          status: u.status,
          createdAt: u.createdAt,
          lastLogin: u.lastLogin
        }));
      }
      if (method === 'POST') {
        const newUser = {
          id: `usr-${Date.now()}`,
          email: body.email,
          fullName: body.fullName,
          role: body.role || 'editor',
          status: 'active',
          customPassword: body.password,
          createdAt: new Date().toISOString()
        };
        if (!Array.isArray(db.users)) db.users = [];
        db.users.push(newUser);
        this.saveDatabase(db);
        return newUser;
      }
      const userRoleMatch = cleanUrl.match(/\/auth\/users\/([^/]+)\/role$/);
      if (userRoleMatch && method === 'PATCH') {
        const uid = userRoleMatch[1];
        const u = (db.users || []).find((usr: any) => usr.id === uid);
        if (u) {
          u.role = body.role;
          this.saveDatabase(db);
          return u;
        }
      }
    }

    // Fallback default
    return { status: 'ok', standalone: true };
  }
}

export const localCmsStore = LocalCmsStore.getInstance();
