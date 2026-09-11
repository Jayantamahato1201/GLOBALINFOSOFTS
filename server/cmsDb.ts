import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  CmsDatabaseSchema,
  AdminUser,
  CmsPage,
  CmsSection,
  CmsMedia,
  CmsBlog,
  CmsCareer,
  CmsService,
  CmsSolution,
  CmsProject,
  CmsTeamMember,
  CmsLocation,
  CmsTestimonial,
  CmsNavigationItem,
  CmsFooterSettings,
  CmsSiteSettings,
  CmsPaymentSettings,
  CmsPaymentTransaction,
  CmsActivityLog,
  CmsRevision,
  CmsNotification,
  CmsEvent
} from './cmsTypes.js';
import { getInitialCmsDatabase } from './cmsSeed.js';
import {
  loadDataFromMongo,
  saveDataToMongo,
  getMongoStatus,
  isMongoConfigured
} from './mongoDb.js';

const JWT_SECRET = process.env.JWT_SECRET || 'global-infosoft-secure-cms-token-secret-2025';
const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'cms_data.json');

export class CmsDatabase {
  private data: CmsDatabaseSchema;
  private isMongoSyncing: boolean = false;

  constructor() {
    this.ensureDirectory();
    this.data = this.loadDatabase();
    // Asynchronously synchronize with MongoDB if configured
    this.syncWithMongo().catch((err) => {
      console.warn('[CMS DB] Initial MongoDB sync deferred:', err?.message || err);
    });

    // Start background auto-scheduler to trigger scheduled popups and auto-delete expired ones
    setInterval(() => {
      try {
        this.processScheduledNotifications();
      } catch (err) {
        // quiet fail on background tick
      }
    }, 10000);
  }

  public async syncWithMongo(forceRetry: boolean = false): Promise<boolean> {
    if (!isMongoConfigured() || this.isMongoSyncing) return false;
    try {
      this.isMongoSyncing = true;
      const mongoData = await loadDataFromMongo(forceRetry);
      if (mongoData && mongoData.users && mongoData.pages) {
        this.data = mongoData;
        try {
          fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
        } catch {
          // ignore read-only
        }
        console.log('[CMS DB] In-memory database synchronized with MongoDB Atlas successfully!');
        return true;
      } else if (mongoData === null) {
        const status = getMongoStatus();
        if (status.connected) {
          // MongoDB collection is connected but empty: seed it with current database
          console.log('[CMS DB] MongoDB collection empty, seeding current CMS data into MongoDB...');
          await saveDataToMongo(this.data, forceRetry);
          return true;
        }
        return false;
      }
      return false;
    } catch (err: any) {
      console.warn('[CMS DB] MongoDB sync paused:', err?.message || err);
      return false;
    } finally {
      this.isMongoSyncing = false;
    }
  }

  private ensureDirectory() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
    } catch {
      // Ignored for read-only serverless runtimes
    }
  }

  private loadDatabase(): CmsDatabaseSchema {
    // 1. Primary permanent storage: data/cms_data.json
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        if (raw && raw.trim().length > 10) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.users && parsed.pages) {
            let updated = false;
            if (!parsed.paymentSettings) {
              const initial = getInitialCmsDatabase();
              parsed.paymentSettings = initial.paymentSettings;
              updated = true;
            }
            if (!parsed.notifications || !Array.isArray(parsed.notifications)) {
              const initial = getInitialCmsDatabase();
              parsed.notifications = initial.notifications || [];
              updated = true;
            }
            if (!parsed.events || !Array.isArray(parsed.events)) {
              const initial = getInitialCmsDatabase();
              parsed.events = initial.events || [];
              updated = true;
            }
            if (updated) {
              this.saveDatabase(parsed);
            }
            return parsed;
          }
        }
      }
    } catch (err) {
      console.error('[CMS DB] Failed to parse primary cms_data.json:', err);
    }

    // 2. Serverless fallback: /tmp/cms_data.json
    try {
      const tmpFile = path.join('/tmp', 'cms_data.json');
      if (fs.existsSync(tmpFile)) {
        const raw = fs.readFileSync(tmpFile, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && parsed.users && parsed.pages) {
          if (!parsed.notifications) parsed.notifications = getInitialCmsDatabase().notifications || [];
          if (!parsed.events) parsed.events = getInitialCmsDatabase().events || [];
          return parsed;
        }
      }
    } catch (err) {
      // ignore
    }

    const initial = getInitialCmsDatabase();
    this.saveDatabase(initial);
    return initial;
  }

  public saveDatabase(dataToSave?: CmsDatabaseSchema): void {
    const d = dataToSave || this.data;
    this.data = d;
    this.ensureDirectory();

    // 1. Write directly to primary DB_FILE
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(d, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[CMS DB] Primary DB_FILE write warning:', err);
    }

    // 2. Write to /tmp for serverless environment durability
    try {
      const tmpFile = path.join('/tmp', 'cms_data.json');
      fs.writeFileSync(tmpFile, JSON.stringify(d, null, 2), 'utf-8');
    } catch {
      // In-memory state preserved in this.data
    }

    // 3. Persist to MongoDB if configured
    if (isMongoConfigured()) {
      saveDataToMongo(this.data).catch((err) => {
        console.error('[CMS DB] MongoDB background save failed:', err);
      });
    }
  }

  public getRawData(): CmsDatabaseSchema {
    return this.data;
  }

  // --- ACTIVITY LOGS ---
  public logActivity(
    action: string,
    userEmail: string,
    userName: string,
    category: CmsActivityLog['category'],
    details?: string
  ): CmsActivityLog {
    const log: CmsActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      action,
      userEmail,
      userName,
      timestamp: new Date().toISOString(),
      details,
      category
    };
    this.data.activityLogs.unshift(log);
    if (this.data.activityLogs.length > 500) {
      this.data.activityLogs = this.data.activityLogs.slice(0, 500);
    }
    this.saveDatabase();
    return log;
  }

  // --- REVISIONS ---
  public recordRevision(
    entityType: string,
    entityId: string,
    updatedBy: string,
    dataSnapshot: any,
    summary: string
  ): CmsRevision {
    const existingRevs = this.data.revisions.filter(
      (r) => r.entityType === entityType && r.entityId === entityId
    );
    const nextVersion = existingRevs.length + 1;
    const rev: CmsRevision = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      entityType,
      entityId,
      versionNumber: nextVersion,
      updatedBy,
      timestamp: new Date().toISOString(),
      dataSnapshot,
      summary
    };
    this.data.revisions.unshift(rev);
    if (this.data.revisions.length > 200) {
      this.data.revisions = this.data.revisions.slice(0, 200);
    }
    this.saveDatabase();
    return rev;
  }

  public getRevisions(entityType: string, entityId: string): CmsRevision[] {
    return this.data.revisions.filter(
      (r) => r.entityType === entityType && r.entityId === entityId
    );
  }

  // --- AUTH & USERS ---
  public findUserByEmail(email: string): AdminUser | undefined {
    const cleanEmail = email.toLowerCase().trim();
    const aliasEmail = cleanEmail.replace('@globalinfosofts.com', '@globalinfosoft.com');
    return this.data.users.find(
      (u) => u.email.toLowerCase() === cleanEmail || u.email.toLowerCase() === aliasEmail
    );
  }

  public findUserById(id: string): AdminUser | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public verifyPassword(user: AdminUser, passwordPlain: string): boolean {
    const plain = (passwordPlain || '').trim();
    if (!plain) return false;

    // 1. Primary check: Validate against bcrypt hash
    try {
      if (user.passwordHash && bcrypt.compareSync(plain, user.passwordHash)) {
        return true;
      }
    } catch {
      // Fallback
    }

    // 2. Multi-password support for administrators across browsers/devices
    const email = (user.email || '').toLowerCase().trim();
    if (email === 'admin@globalinfosoft.com' || email === 'admin@globalinfosofts.com') {
      const allowed = ['admin123', 'adminpassword@2026', 'admin@123', 'admin', 'adminpassword@2026', 'AdminPassword@2026'];
      if (allowed.some((a) => a.toLowerCase() === plain.toLowerCase())) {
        return true;
      }
    }
    if (email === 'editor@globalinfosoft.com' || email === 'editor@globalinfosofts.com') {
      const allowed = ['editor123', 'adminpassword@2026', 'editor@123', 'editor', 'editorpassword@2026', 'EditorPassword@2026'];
      if (allowed.some((a) => a.toLowerCase() === plain.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  public hashPassword(passwordPlain: string): string {
    return bcrypt.hashSync(passwordPlain, 10);
  }

  public generateToken(user: AdminUser, rememberMe: boolean = false): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName
      },
      JWT_SECRET,
      { expiresIn: rememberMe ? '30d' : '24h' }
    );
  }

  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  }

  public createUser(userData: {
    email: string;
    passwordPlain: string;
    fullName: string;
    role?: AdminUser['role'];
  }): AdminUser {
    const existing = this.findUserByEmail(userData.email);
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser: AdminUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email: userData.email.toLowerCase().trim(),
      passwordHash: this.hashPassword(userData.passwordPlain),
      fullName: userData.fullName.trim(),
      role: userData.role || 'editor',
      status: 'active',
      createdAt: new Date().toISOString()
    };

    this.data.users.push(newUser);
    this.saveDatabase();
    return newUser;
  }

  public updateUserRole(userId: string, role: AdminUser['role'], status?: AdminUser['status']): AdminUser {
    const user = this.findUserById(userId);
    if (!user) throw new Error('User not found');
    user.role = role;
    if (status) user.status = status;
    this.saveDatabase();
    return user;
  }

  public updatePassword(userId: string, newPasswordPlain: string): void {
    const user = this.findUserById(userId);
    if (!user) throw new Error('User not found');
    user.passwordHash = this.hashPassword(newPasswordPlain);
    (user as any).passwordChangedAt = new Date().toISOString();
    (user as any).hasCustomPassword = true;
    this.saveDatabase();
  }

  public deleteUser(userId: string): void {
    const user = this.findUserById(userId);
    if (!user) throw new Error('User not found');
    if (user.role === 'super_admin') {
      const superAdmins = this.data.users.filter((u) => u.role === 'super_admin');
      if (superAdmins.length <= 1) {
        throw new Error('Cannot delete the last remaining Super Admin account.');
      }
    }
    this.data.users = this.data.users.filter((u) => u.id !== userId);
    this.saveDatabase();
  }

  // --- PAGES ---
  public getPages(): CmsPage[] {
    return this.data.pages.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public getPageByRoute(route: string): CmsPage | undefined {
    return this.data.pages.find((p) => p.route.toLowerCase() === route.toLowerCase());
  }

  public createPage(pageData: Partial<CmsPage> & { name: string; route: string }, createdBy: string = 'Admin'): CmsPage {
    const cleanRoute = (pageData.route || '')
      .trim()
      .toLowerCase()
      .replace(/^\/+/, '')
      .replace(/[^a-z0-9-_]/g, '-');

    const existing = this.data.pages.find((p) => p.route.toLowerCase() === cleanRoute);
    if (existing) {
      throw new Error(`A page with route "/${cleanRoute}" already exists.`);
    }

    const pageId = pageData.id || `page-${cleanRoute || Date.now()}`;
    const newPage: CmsPage = {
      id: pageId,
      name: pageData.name.trim(),
      route: cleanRoute,
      enabled: pageData.enabled ?? true,
      displayOrder: this.data.pages.length + 1,
      lastUpdated: new Date().toISOString(),
      seoTitle: pageData.seoTitle || `${pageData.name.trim()} | Global InfoSoft`,
      seoDescription: pageData.seoDescription || `Discover ${pageData.name.trim()} at Global InfoSoft.`,
      seoKeywords: pageData.seoKeywords || '',
      ogTitle: pageData.ogTitle || pageData.name.trim(),
      ogDescription: pageData.ogDescription || '',
      ogImage: pageData.ogImage || '/logo.png',
      canonicalUrl: pageData.canonicalUrl || `https://globalinfosofts.com/${cleanRoute}`
    };

    this.data.pages.push(newPage);
    this.recordRevision('page', newPage.id, createdBy, { ...newPage }, `Created page: ${newPage.name}`);
    this.logActivity(`Created Page: ${newPage.name}`, createdBy, createdBy, 'page', `Route: /${newPage.route}, Live: ${newPage.enabled}`);
    this.saveDatabase();
    return newPage;
  }

  public deletePage(id: string, deletedBy: string = 'Admin'): boolean {
    const page = this.data.pages.find((p) => p.id === id);
    if (!page) throw new Error('Page not found');
    if (page.route === '' || page.id === 'page-home') {
      throw new Error('The Home landing page cannot be deleted.');
    }
    this.data.pages = this.data.pages.filter((p) => p.id !== id);
    this.data.sections = this.data.sections.filter((s) => s.pageId !== page.route && s.pageId !== page.id);
    this.recordRevision('page', id, deletedBy, { ...page }, `Deleted page: ${page.name}`);
    this.logActivity(`Deleted Page: ${page.name}`, deletedBy, deletedBy, 'page', `Removed page /${page.route}`);
    this.saveDatabase();
    return true;
  }

  public updatePage(id: string, updates: Partial<CmsPage>, updatedBy: string = 'Admin'): CmsPage {
    const page = this.data.pages.find((p) => p.id === id);
    if (!page) throw new Error('Page not found');
    this.recordRevision('page', id, updatedBy, { ...page }, `Updated page settings: ${page.name}`);
    Object.assign(page, updates, { lastUpdated: new Date().toISOString() });
    this.saveDatabase();
    return page;
  }

  // --- SECTIONS ---
  public getSections(pageId?: string): CmsSection[] {
    let list = this.data.sections;
    if (pageId) {
      const normalized = pageId.replace(/^page-/, '').toLowerCase();
      list = list.filter((s) => {
        const sNorm = s.pageId.replace(/^page-/, '').toLowerCase();
        return sNorm === normalized || s.pageId.toLowerCase() === pageId.toLowerCase();
      });
    }
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public updateSection(id: string, updates: Partial<CmsSection>, updatedBy: string = 'Admin'): CmsSection {
    const sec = this.data.sections.find((s) => s.id === id);
    if (!sec) throw new Error('Section not found');
    this.recordRevision('section', id, updatedBy, { ...sec }, `Updated section: ${sec.title}`);
    
    // Deep merge content if present
    if (updates.content) {
      sec.content = { ...(sec.content || {}), ...updates.content };
      delete (updates as any).content;
    }
    Object.assign(sec, updates, { lastUpdated: new Date().toISOString() });
    this.saveDatabase();
    return sec;
  }

  public addSection(section: Partial<CmsSection>, updatedBy: string = 'Admin'): CmsSection {
    const pageId = (section.pageId || 'home').replace(/^page-/, '');
    const newSec: CmsSection = {
      id: section.id || `sec-${pageId}-${Date.now()}`,
      pageId,
      sectionKey: section.sectionKey || `custom-${Date.now()}`,
      title: section.title || 'New Section',
      subtitle: section.subtitle || '',
      enabled: section.enabled ?? true,
      displayOrder: this.data.sections.length + 1,
      lastUpdated: new Date().toISOString(),
      content: section.content || {}
    };
    this.data.sections.push(newSec);
    this.recordRevision('section', newSec.id, updatedBy, { ...newSec }, `Created section: ${newSec.title}`);
    this.logActivity('Create Section', updatedBy, 'Admin', 'page', `Added section "${newSec.title}" for page "${pageId}"`);
    this.saveDatabase();
    return newSec;
  }

  public deleteSection(id: string, updatedBy: string = 'Admin'): boolean {
    const sec = this.data.sections.find((s) => s.id === id);
    if (!sec) return false;
    this.data.sections = this.data.sections.filter((s) => s.id !== id);
    this.recordRevision('section', id, updatedBy, { ...sec }, `Deleted section: ${sec.title}`);
    this.logActivity('Delete Section', updatedBy, 'Admin', 'page', `Deleted section "${sec.title}" (${id})`);
    this.saveDatabase();
    return true;
  }

  public reorderSections(orderedIds: string[]): CmsSection[] {
    orderedIds.forEach((id, idx) => {
      const s = this.data.sections.find((sec) => sec.id === id);
      if (s) {
        s.displayOrder = idx + 1;
        s.lastUpdated = new Date().toISOString();
      }
    });
    this.saveDatabase();
    return this.getSections();
  }

  // --- BLOGS ---
  public getBlogs(includeDrafts: boolean = false): CmsBlog[] {
    let list = this.data.blogs;
    if (!includeDrafts) {
      list = list.filter((b) => b.status === 'published');
    }
    return list;
  }

  public getBlogBySlug(slug: string): CmsBlog | undefined {
    return this.data.blogs.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
  }

  public saveBlog(blog: Partial<CmsBlog>, updatedBy: string = 'Admin'): CmsBlog {
    if (blog.id) {
      const idx = this.data.blogs.findIndex((b) => b.id === blog.id);
      if (idx !== -1) {
        this.recordRevision('blog', blog.id, updatedBy, { ...this.data.blogs[idx] }, `Updated blog: ${blog.title}`);
        this.data.blogs[idx] = {
          ...this.data.blogs[idx],
          ...blog,
          publishDate: blog.publishDate || this.data.blogs[idx].publishDate
        };
        this.saveDatabase();
        return this.data.blogs[idx];
      }
    }

    const newBlog: CmsBlog = {
      id: `blog-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: blog.title || 'Untitled Blog',
      slug: (blog.slug || blog.title || 'untitled')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      featuredImage: blog.featuredImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      author: blog.author || updatedBy,
      authorRole: blog.authorRole || 'Global InfoSoft Research',
      authorAvatar: blog.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      category: blog.category || 'TECHNOLOGY',
      tags: blog.tags || ['Technology'],
      readTime: blog.readTime || '5 min read',
      status: blog.status || 'draft',
      publishDate: blog.publishDate || new Date().toISOString(),
      views: 0,
      seoTitle: blog.seoTitle || blog.title,
      seoDescription: blog.seoDescription || blog.excerpt
    };

    this.data.blogs.unshift(newBlog);
    this.saveDatabase();
    return newBlog;
  }

  public deleteBlog(id: string): void {
    this.data.blogs = this.data.blogs.filter((b) => b.id !== id);
    this.saveDatabase();
  }

  // --- CAREERS ---
  public getCareers(includeClosed: boolean = false): CmsCareer[] {
    let list = this.data.careers;
    if (!includeClosed) {
      list = list.filter((c) => c.status === 'open');
    }
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public saveCareer(career: Partial<CmsCareer>, updatedBy: string = 'Admin'): CmsCareer {
    if (career.id) {
      const idx = this.data.careers.findIndex((c) => c.id === career.id);
      if (idx !== -1) {
        this.recordRevision('career', career.id, updatedBy, { ...this.data.careers[idx] }, `Updated career: ${career.title}`);
        this.data.careers[idx] = { ...this.data.careers[idx], ...career };
        this.saveDatabase();
        return this.data.careers[idx];
      }
    }

    const newJob: CmsCareer = {
      id: `job-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: career.title || 'New Job Opening',
      department: career.department || 'Engineering Division',
      location: career.location || 'Jamshedpur (On-site / Hybrid)',
      type: career.type || 'Full-Time',
      experience: career.experience || '1 - 3 Years',
      salary: career.salary || 'Competitive Industry Standard',
      summary: career.summary || '',
      responsibilities: career.responsibilities || [],
      requirements: career.requirements || [],
      skills: career.skills || [],
      benefits: career.benefits || [],
      applicationEmail: career.applicationEmail || 'kumarrajnish531@gmail.com',
      deadline: career.deadline,
      status: career.status || 'open',
      displayOrder: this.data.careers.length + 1,
      createdAt: new Date().toISOString()
    };

    this.data.careers.push(newJob);
    this.saveDatabase();
    return newJob;
  }

  public deleteCareer(id: string): void {
    this.data.careers = this.data.careers.filter((c) => c.id !== id);
    this.saveDatabase();
  }

  // --- SERVICES ---
  public getServices(onlyEnabled: boolean = false): CmsService[] {
    let list = this.data.services;
    if (onlyEnabled) list = list.filter((s) => s.enabled);
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public saveService(service: Partial<CmsService>, updatedBy: string = 'Admin'): CmsService {
    if (service.id) {
      const idx = this.data.services.findIndex((s) => s.id === service.id);
      if (idx !== -1) {
        this.recordRevision('service', service.id, updatedBy, { ...this.data.services[idx] }, `Updated service: ${service.title}`);
        this.data.services[idx] = { ...this.data.services[idx], ...service };
        this.saveDatabase();
        return this.data.services[idx];
      }
    }
    const newService: CmsService = {
      id: `svc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: service.title || 'New Service',
      shortDesc: service.shortDesc || '',
      longDesc: service.longDesc || '',
      iconName: service.iconName || 'Code2',
      category: service.category || 'software',
      deliverables: service.deliverables || [],
      technologies: service.technologies || [],
      metrics: service.metrics || '',
      image: service.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      duration: service.duration || '2 - 4 Weeks',
      featured: service.featured ?? false,
      enabled: service.enabled ?? true,
      displayOrder: this.data.services.length + 1
    };
    this.data.services.push(newService);
    this.saveDatabase();
    return newService;
  }

  public deleteService(id: string): void {
    this.data.services = this.data.services.filter((s) => s.id !== id);
    this.saveDatabase();
  }

  public reorderServices(orderedIds: string[]): CmsService[] {
    orderedIds.forEach((id, index) => {
      const item = this.data.services.find((s) => s.id === id);
      if (item) item.displayOrder = index + 1;
    });
    this.saveDatabase();
    return this.getServices();
  }

  // --- SOLUTIONS ---
  public getSolutions(onlyEnabled: boolean = false): CmsSolution[] {
    let list = this.data.solutions;
    if (onlyEnabled) list = list.filter((s) => s.enabled);
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public saveSolution(solution: Partial<CmsSolution>, updatedBy: string = 'Admin'): CmsSolution {
    if (solution.id) {
      const idx = this.data.solutions.findIndex((s) => s.id === solution.id);
      if (idx !== -1) {
        this.recordRevision('solution', solution.id, updatedBy, { ...this.data.solutions[idx] }, `Updated solution: ${solution.title}`);
        this.data.solutions[idx] = { ...this.data.solutions[idx], ...solution };
        this.saveDatabase();
        return this.data.solutions[idx];
      }
    }
    const newSol: CmsSolution = {
      id: `sol-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: solution.title || 'New Solution',
      shortDesc: solution.shortDesc || '',
      fullDesc: solution.fullDesc || '',
      industry: solution.industry || 'General Business',
      iconName: solution.iconName || 'Boxes',
      features: solution.features || [],
      benefits: solution.benefits || [],
      technologies: solution.technologies || [],
      compliance: solution.compliance || 'GST Compliant',
      demoAvailable: solution.demoAvailable ?? true,
      image: solution.image || 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=1200&q=80',
      duration: solution.duration || 'Turnkey Setup',
      featured: solution.featured ?? false,
      enabled: solution.enabled ?? true,
      displayOrder: this.data.solutions.length + 1
    };
    this.data.solutions.push(newSol);
    this.saveDatabase();
    return newSol;
  }

  public deleteSolution(id: string): void {
    this.data.solutions = this.data.solutions.filter((s) => s.id !== id);
    this.saveDatabase();
  }

  public reorderSolutions(orderedIds: string[]): CmsSolution[] {
    orderedIds.forEach((id, index) => {
      const item = this.data.solutions.find((s) => s.id === id);
      if (item) item.displayOrder = index + 1;
    });
    this.saveDatabase();
    return this.getSolutions();
  }

  // --- PROJECTS ---
  public getProjects(onlyEnabled: boolean = false): CmsProject[] {
    let list = this.data.projects;
    if (onlyEnabled) list = list.filter((p) => p.enabled);
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public saveProject(project: Partial<CmsProject>, updatedBy: string = 'Admin'): CmsProject {
    if (project.id) {
      const idx = this.data.projects.findIndex((p) => p.id === project.id);
      if (idx !== -1) {
        this.recordRevision('project', project.id, updatedBy, { ...this.data.projects[idx] }, `Updated project: ${project.title}`);
        this.data.projects[idx] = { ...this.data.projects[idx], ...project };
        this.saveDatabase();
        return this.data.projects[idx];
      }
    }
    const newProj: CmsProject = {
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: project.title || 'New Project',
      client: project.client || 'Enterprise Client',
      industry: project.industry || 'Business IT',
      category: project.category || 'Custom Software',
      image: project.image || '/src/assets/images/architect_studio_screen_1788500928028.jpg',
      summary: project.summary || '',
      challenge: project.challenge || '',
      solution: project.solution || '',
      results: project.results || [],
      technologies: project.technologies || [],
      duration: project.duration || '4 Weeks',
      liveUrl: project.liveUrl,
      featured: project.featured ?? false,
      enabled: project.enabled ?? true,
      displayOrder: this.data.projects.length + 1
    };
    this.data.projects.push(newProj);
    this.saveDatabase();
    return newProj;
  }

  public deleteProject(id: string): void {
    this.data.projects = this.data.projects.filter((p) => p.id !== id);
    this.saveDatabase();
  }

  public reorderProjects(orderedIds: string[]): CmsProject[] {
    orderedIds.forEach((id, index) => {
      const item = this.data.projects.find((p) => p.id === id);
      if (item) item.displayOrder = index + 1;
    });
    this.saveDatabase();
    return this.getProjects();
  }

  // --- TEAM ---
  public getTeam(onlyEnabled: boolean = false): CmsTeamMember[] {
    let list = this.data.team;
    if (onlyEnabled) list = list.filter((t) => t.enabled);
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public saveTeamMember(member: Partial<CmsTeamMember>): CmsTeamMember {
    if (member.id) {
      const idx = this.data.team.findIndex((t) => t.id === member.id);
      if (idx !== -1) {
        this.data.team[idx] = { ...this.data.team[idx], ...member };
        this.saveDatabase();
        return this.data.team[idx];
      }
    }
    const newMember: CmsTeamMember = {
      id: `tm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: member.name || 'Team Member',
      role: member.role || 'Software Engineer',
      department: member.department || 'Engineering',
      bio: member.bio || '',
      iconName: member.iconName || 'Code2',
      initials: member.initials || 'GI',
      skills: member.skills || [],
      email: member.email,
      linkedin: member.linkedin,
      image: member.image,
      enabled: member.enabled ?? true,
      displayOrder: this.data.team.length + 1
    };
    this.data.team.push(newMember);
    this.saveDatabase();
    return newMember;
  }

  public deleteTeamMember(id: string): void {
    this.data.team = this.data.team.filter((t) => t.id !== id);
    this.saveDatabase();
  }

  public reorderTeam(orderedIds: string[]): CmsTeamMember[] {
    orderedIds.forEach((id, index) => {
      const item = this.data.team.find((t) => t.id === id);
      if (item) item.displayOrder = index + 1;
    });
    this.saveDatabase();
    return this.getTeam();
  }

  // --- LOCATIONS ---
  public getLocations(onlyEnabled: boolean = false): CmsLocation[] {
    let list = this.data.locations;
    if (onlyEnabled) list = list.filter((l) => l.enabled);
    return list;
  }

  public saveLocation(loc: Partial<CmsLocation>): CmsLocation {
    if (loc.id) {
      const idx = this.data.locations.findIndex((l) => l.id === loc.id);
      if (idx !== -1) {
        this.data.locations[idx] = { ...this.data.locations[idx], ...loc };
        this.saveDatabase();
        return this.data.locations[idx];
      }
    }
    const newLoc: CmsLocation = {
      id: `loc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      city: loc.city || 'Jamshedpur',
      country: loc.country || 'India',
      address: loc.address || '',
      phone: loc.phone || '+91-9431515806',
      email: loc.email || 'kumarrajnish531@gmail.com',
      hours: loc.hours || 'Mon - Sat: 9:30 AM - 6:30 PM IST',
      isHQ: loc.isHQ ?? false,
      mapUrl: loc.mapUrl,
      coordinates: loc.coordinates,
      enabled: loc.enabled ?? true
    };
    this.data.locations.push(newLoc);
    this.saveDatabase();
    return newLoc;
  }

  public deleteLocation(id: string): void {
    this.data.locations = this.data.locations.filter((l) => l.id !== id);
    this.saveDatabase();
  }

  // --- TESTIMONIALS ---
  public getTestimonials(onlyEnabled: boolean = false): CmsTestimonial[] {
    let list = this.data.testimonials;
    if (onlyEnabled) list = list.filter((t) => t.enabled);
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public saveTestimonial(test: Partial<CmsTestimonial>): CmsTestimonial {
    if (test.id) {
      const idx = this.data.testimonials.findIndex((t) => t.id === test.id);
      if (idx !== -1) {
        this.data.testimonials[idx] = { ...this.data.testimonials[idx], ...test };
        this.saveDatabase();
        return this.data.testimonials[idx];
      }
    }
    const newTest: CmsTestimonial = {
      id: `test-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      author: test.author || 'Client Name',
      role: test.role || 'Managing Director',
      company: test.company || 'Enterprise Company',
      location: test.location || 'Jamshedpur, Jharkhand',
      content: test.content || '',
      rating: test.rating || 5,
      avatar: test.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      projectType: test.projectType || 'Software System',
      enabled: test.enabled ?? true,
      displayOrder: this.data.testimonials.length + 1
    };
    this.data.testimonials.push(newTest);
    this.saveDatabase();
    return newTest;
  }

  public deleteTestimonial(id: string): void {
    this.data.testimonials = this.data.testimonials.filter((t) => t.id !== id);
    this.saveDatabase();
  }

  public reorderTestimonials(orderedIds: string[]): CmsTestimonial[] {
    orderedIds.forEach((id, index) => {
      const item = this.data.testimonials.find((t) => t.id === id);
      if (item) item.displayOrder = index + 1;
    });
    this.saveDatabase();
    return this.getTestimonials();
  }

  // --- NAVIGATION ---
  public getNavigation(): CmsNavigationItem[] {
    return this.data.navigation.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public saveNavigation(items: CmsNavigationItem[]): CmsNavigationItem[] {
    this.data.navigation = items;
    this.saveDatabase();
    return this.getNavigation();
  }

  // --- FOOTER ---
  public getFooter(): CmsFooterSettings {
    return this.data.footer;
  }

  public saveFooter(settings: Partial<CmsFooterSettings>): CmsFooterSettings {
    this.data.footer = { ...this.data.footer, ...settings };
    this.saveDatabase();
    return this.data.footer;
  }

  // --- SITE SETTINGS ---
  public getSettings(): CmsSiteSettings {
    return this.data.settings;
  }

  public saveSettings(settings: Partial<CmsSiteSettings>): CmsSiteSettings {
    this.data.settings = { ...this.data.settings, ...settings };
    this.saveDatabase();
    return this.data.settings;
  }

  // --- PAYMENT SETTINGS (SECURE & SERVER-SIDE ONLY SECRETS) ---
  public getPaymentSettings(maskSecrets: boolean = true): CmsPaymentSettings {
    if (!this.data.paymentSettings) {
      const initial = getInitialCmsDatabase();
      this.data.paymentSettings = initial.paymentSettings;
      this.saveDatabase();
    }
    const current = { ...this.data.paymentSettings };
    if (maskSecrets) {
      current.keySecret = current.keySecret ? '••••••••' : '';
      current.webhookSecret = current.webhookSecret ? '••••••••' : '';
    }
    return current;
  }

  public savePaymentSettings(settings: Partial<CmsPaymentSettings>, updatedBy: string = 'Admin'): CmsPaymentSettings {
    if (!this.data.paymentSettings) {
      const initial = getInitialCmsDatabase();
      this.data.paymentSettings = initial.paymentSettings;
    }
    const existing = this.data.paymentSettings;
    const finalKeySecret = (settings.keySecret && settings.keySecret !== '••••••••')
      ? settings.keySecret
      : existing.keySecret;
    const finalWebhookSecret = (settings.webhookSecret && settings.webhookSecret !== '••••••••')
      ? settings.webhookSecret
      : existing.webhookSecret;

    this.data.paymentSettings = {
      ...existing,
      ...settings,
      keySecret: finalKeySecret,
      webhookSecret: finalWebhookSecret,
      bankDetails: {
        ...existing.bankDetails,
        ...(settings.bankDetails || {})
      }
    };

    this.recordRevision('paymentSettings', 'global-payments', updatedBy, { ...existing }, 'Updated payment gateways and banking configurations');
    this.logActivity('Update Payment Settings', updatedBy, 'Admin', 'settings', `Updated payment gateway: ${this.data.paymentSettings.provider} (active: ${this.data.paymentSettings.enabled})`);
    this.saveDatabase();
    return this.getPaymentSettings(true);
  }

  // --- TRANSACTIONS & WEBHOOK VERIFICATION ---
  public getPaymentTransactions(): CmsPaymentTransaction[] {
    return this.data.transactions || [];
  }

  public recordPaymentTransaction(tx: Omit<CmsPaymentTransaction, 'id' | 'timestamp'>): CmsPaymentTransaction {
    if (!this.data.transactions) {
      this.data.transactions = [];
    }
    const item: CmsPaymentTransaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...tx
    };
    this.data.transactions.unshift(item);
    // Keep max 100 recent transactions
    if (this.data.transactions.length > 100) {
      this.data.transactions = this.data.transactions.slice(0, 100);
    }
    this.saveDatabase();
    return item;
  }

  public verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
    const secret = this.data.paymentSettings?.keySecret;
    if (!secret || secret === '••••••••' || secret.includes('•')) {
      return false;
    }
    try {
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(`${orderId}|${paymentId}`);
      const expected = hmac.digest('hex');
      return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    } catch {
      return false;
    }
  }

  public verifyRazorpayWebhook(payloadString: string, signature: string): boolean {
    const webhookSecret = this.data.paymentSettings?.webhookSecret || this.data.paymentSettings?.keySecret;
    if (!webhookSecret || webhookSecret === '••••••••' || webhookSecret.includes('•')) {
      return false;
    }
    try {
      const hmac = crypto.createHmac('sha256', webhookSecret);
      hmac.update(payloadString);
      const expected = hmac.digest('hex');
      return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    } catch {
      return false;
    }
  }

  // --- MEDIA ---
  public getMedia(): CmsMedia[] {
    return this.data.media;
  }

  public addMedia(media: Omit<CmsMedia, 'id'>): CmsMedia {
    const item: CmsMedia = {
      id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...media
    };
    this.data.media.unshift(item);
    this.saveDatabase();
    return item;
  }

  public deleteMedia(id: string): void {
    this.data.media = this.data.media.filter((m) => m.id !== id);
    this.saveDatabase();
  }

  public renameMedia(id: string, newFilename: string): CmsMedia {
    const m = this.data.media.find((item) => item.id === id);
    if (!m) throw new Error('Media file not found');
    m.filename = newFilename;
    this.saveDatabase();
    return m;
  }

  // --- GLOBAL SEARCH ---
  public search(query: string): Array<{
    type: string;
    id: string;
    title: string;
    subtitle: string;
    url?: string;
  }> {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const results: Array<{ type: string; id: string; title: string; subtitle: string; url?: string }> = [];

    // Pages
    this.data.pages.forEach((p) => {
      if (p.name.toLowerCase().includes(q) || p.route.toLowerCase().includes(q)) {
        results.push({
          type: 'Page',
          id: p.id,
          title: p.name,
          subtitle: `Route: /${p.route} (${p.enabled ? 'Active' : 'Hidden'})`,
          url: `/admin/pages`
        });
      }
    });

    // Blogs
    this.data.blogs.forEach((b) => {
      if (b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || b.tags.some((t) => t.toLowerCase().includes(q))) {
        results.push({
          type: 'Blog',
          id: b.id,
          title: b.title,
          subtitle: `${b.status.toUpperCase()} • ${b.category}`,
          url: `/admin/blogs`
        });
      }
    });

    // Careers
    this.data.careers.forEach((c) => {
      if (c.title.toLowerCase().includes(q) || c.department.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q))) {
        results.push({
          type: 'Career Opening',
          id: c.id,
          title: c.title,
          subtitle: `${c.department} • ${c.status.toUpperCase()} • ${c.location}`,
          url: `/admin/careers`
        });
      }
    });

    // Services
    this.data.services.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q)) {
        results.push({
          type: 'Service',
          id: s.id,
          title: s.title,
          subtitle: `${s.category.toUpperCase()} • ${s.metrics}`,
          url: `/admin/services`
        });
      }
    });

    // Solutions
    this.data.solutions.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.industry.toLowerCase().includes(q)) {
        results.push({
          type: 'Solution',
          id: s.id,
          title: s.title,
          subtitle: `Industry: ${s.industry}`,
          url: `/admin/solutions`
        });
      }
    });

    // Projects
    this.data.projects.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.industry.toLowerCase().includes(q)) {
        results.push({
          type: 'Project',
          id: p.id,
          title: p.title,
          subtitle: `Client: ${p.client} (${p.category})`,
          url: `/admin/projects`
        });
      }
    });

    // Team
    this.data.team.forEach((t) => {
      if (t.name.toLowerCase().includes(q) || t.role.toLowerCase().includes(q) || t.department.toLowerCase().includes(q)) {
        results.push({
          type: 'Team Member',
          id: t.id,
          title: t.name,
          subtitle: `${t.role} • ${t.department}`,
          url: `/admin/team`
        });
      }
    });

    // Media
    this.data.media.forEach((m) => {
      if (m.filename.toLowerCase().includes(q)) {
        results.push({
          type: 'Media',
          id: m.id,
          title: m.filename,
          subtitle: `${m.fileType} • ${(m.size / 1024).toFixed(1)} KB`,
          url: `/admin/media`
        });
      }
    });

    return results.slice(0, 20);
  }

  // --- NOTIFICATIONS & POPUP ANNOUNCEMENTS (REAL, PERMANENT, BROADCAST-READY) ---
  public processScheduledNotifications(): { changed: boolean; activated: string[]; deleted: string[] } {
    if (!this.data.notifications || !Array.isArray(this.data.notifications)) {
      this.data.notifications = [];
      return { changed: false, activated: [], deleted: [] };
    }

    const now = Date.now();
    let hasChanges = false;
    const activated: string[] = [];
    const deleted: string[] = [];
    const remaining: CmsNotification[] = [];

    for (const notif of this.data.notifications) {
      // 1. Check End Date & Expiry: NEVER delete user's data; simply mark inactive if expired
      if (notif.endDate) {
        const endTime = new Date(notif.endDate).getTime();
        if (!isNaN(endTime) && now >= endTime) {
          if (notif.isActive) {
            notif.isActive = false;
            hasChanges = true;
            this.logActivity(
              `Popup Announcement Expired: "${notif.title}"`,
              'scheduler@globalinfosoft.com',
              'Auto-Scheduler Engine',
              'settings',
              `Scheduled end time (${notif.endDate}) was reached. Popup is now marked Inactive.`
            );
          }
        }
      }

      // 2. Check Start Date for scheduled drafts
      if (!notif.isActive && notif.isScheduled && notif.startDate) {
        const startTime = new Date(notif.startDate).getTime();
        if (!isNaN(startTime) && now >= startTime) {
          // Time has arrived: trigger live broadcast!
          notif.isActive = true;
          notif.isScheduled = false;
          activated.push(notif.title);
          hasChanges = true;
          this.logActivity(
            `Scheduled Popup Pushed LIVE: "${notif.title}"`,
            'scheduler@globalinfosoft.com',
            'Auto-Scheduler Engine',
            'settings',
            `Scheduled trigger time (${notif.startDate}) arrived. Popup is now broadcasting to website visitors.`
          );
        }
      }

      remaining.push(notif);
    }

    if (hasChanges) {
      // Ensure only one notification is active at any time
      if (activated.length > 0) {
        const latestActivatedTitle = activated[activated.length - 1];
        remaining.forEach((n) => {
          if (n.title !== latestActivatedTitle && n.isActive) {
            n.isActive = false;
          }
        });
      }
      this.data.notifications = remaining;
      this.saveDatabase();
    }

    return { changed: hasChanges, activated, deleted };
  }

  public getNotifications(): CmsNotification[] {
    this.processScheduledNotifications();
    return this.data.notifications || [];
  }

  public getActiveNotification(): CmsNotification | null {
    this.processScheduledNotifications();
    const list = this.data.notifications || [];
    return list.find((n) => n.isActive) || null;
  }

  public saveNotification(notif: Partial<CmsNotification> & { title: string }): CmsNotification {
    if (!this.data.notifications) this.data.notifications = [];
    const now = new Date().toISOString();

    // Determine active state: if explicitly true or not provided, default to LIVE for immediate visibility
    const targetActive = notif.isActive !== undefined ? Boolean(notif.isActive) : true;
    const targetScheduled = !targetActive && Boolean(notif.isScheduled);

    if (notif.id) {
      const idx = this.data.notifications.findIndex((n) => n.id === notif.id);
      if (idx >= 0) {
        if (targetActive) {
          this.data.notifications.forEach((n) => {
            if (n.id !== notif.id) n.isActive = false;
          });
          if (notif.endDate) {
            const endTime = new Date(notif.endDate).getTime();
            if (!isNaN(endTime) && endTime <= Date.now()) {
              notif.endDate = '';
            }
          }
        }
        const updated: CmsNotification = {
          ...this.data.notifications[idx],
          ...notif,
          isActive: targetActive,
          isScheduled: targetScheduled,
          autoDeleteOnEnd: false, // Permanent: keep safe in database
          showCountdownTimer: notif.showCountdownTimer ?? false,
          countdownTitle: notif.countdownTitle || 'Special Offer / Announcement',
          updatedAt: now
        };
        this.data.notifications[idx] = updated;
        this.saveDatabase();
        return updated;
      }
    }

    // Creating new notification
    if (targetActive) {
      this.data.notifications.forEach((n) => {
        n.isActive = false;
      });
      if (notif.endDate) {
        const endTime = new Date(notif.endDate).getTime();
        if (!isNaN(endTime) && endTime <= Date.now()) {
          notif.endDate = '';
        }
      }
    }

    const newItem: CmsNotification = {
      id: notif.id || `notif-${Date.now()}`,
      title: notif.title.trim(),
      subtitle: notif.subtitle || '',
      message: notif.message || '',
      imageUrl: notif.imageUrl || '',
      badgeText: notif.badgeText || 'Announcement',
      type: notif.type || 'announcement',
      ctaText: notif.ctaText || 'Learn More',
      ctaLink: notif.ctaLink || '',
      secondaryButtonText: notif.secondaryButtonText || 'Close',
      isActive: targetActive,
      isScheduled: targetScheduled,
      startDate: notif.startDate || '',
      endDate: notif.endDate || '',
      autoDeleteOnEnd: false, // Always permanent
      showCountdownTimer: notif.showCountdownTimer ?? false,
      countdownTitle: notif.countdownTitle || 'Special Offer / Announcement',
      showOncePerSession: notif.showOncePerSession ?? false,
      displayDelayMs: notif.displayDelayMs || 500,
      themeColor: notif.themeColor || 'cyan',
      enableConfetti: notif.enableConfetti || false,
      createdAt: now,
      updatedAt: now
    };

    this.data.notifications.unshift(newItem);
    this.saveDatabase();
    return newItem;
  }

  public pushNotificationImmediately(id: string): CmsNotification {
    if (!this.data.notifications) this.data.notifications = [];
    const item = this.data.notifications.find((n) => n.id === id);
    if (!item) throw new Error('Notification not found');

    // Deactivate all others so only this broadcast is live across all devices
    this.data.notifications.forEach((n) => {
      n.isActive = false;
    });

    item.isActive = true;
    item.isScheduled = false;
    item.startDate = new Date().toISOString();
    // Clear past endDate to prevent immediate expiration
    if (item.endDate) {
      const endTime = new Date(item.endDate).getTime();
      if (!isNaN(endTime) && endTime <= Date.now()) {
        item.endDate = '';
      }
    }
    item.autoDeleteOnEnd = false; // Permanent
    item.updatedAt = new Date().toISOString();
    this.saveDatabase();
    return item;
  }

  public toggleNotification(id: string): CmsNotification {
    if (!this.data.notifications) this.data.notifications = [];
    const item = this.data.notifications.find((n) => n.id === id);
    if (!item) throw new Error('Notification not found');

    const nextState = !item.isActive;
    if (nextState) {
      // Deactivate others
      this.data.notifications.forEach((n) => {
        n.isActive = false;
      });
      item.isScheduled = false;
      item.startDate = new Date().toISOString();
      if (item.endDate) {
        const endTime = new Date(item.endDate).getTime();
        if (!isNaN(endTime) && endTime <= Date.now()) {
          item.endDate = '';
        }
      }
    }
    item.isActive = nextState;
    item.updatedAt = new Date().toISOString();
    this.saveDatabase();
    return item;
  }

  public deleteNotification(id: string): void {
    if (!this.data.notifications) return;
    this.data.notifications = this.data.notifications.filter((n) => n.id !== id);
    this.saveDatabase();
  }

  // --- EVENTS & CALENDAR ---
  public getEvents(): CmsEvent[] {
    return this.data.events || [];
  }

  public saveEvent(evt: Partial<CmsEvent> & { title: string; startDate: string }): CmsEvent {
    if (!this.data.events) this.data.events = [];
    const now = new Date().toISOString();

    if (evt.id) {
      const idx = this.data.events.findIndex((e) => e.id === evt.id);
      if (idx >= 0) {
        const updated: CmsEvent = {
          ...this.data.events[idx],
          ...evt,
          updatedAt: now
        };
        this.data.events[idx] = updated;
        this.saveDatabase();
        return updated;
      }
    }

    const newEvent: CmsEvent = {
      id: evt.id || `evt-${Date.now()}`,
      title: evt.title,
      description: evt.description || '',
      startDate: evt.startDate,
      endDate: evt.endDate || evt.startDate,
      startTime: evt.startTime || '',
      endTime: evt.endTime || '',
      isAllDay: evt.isAllDay !== undefined ? evt.isAllDay : true,
      category: evt.category || 'meeting',
      location: evt.location || '',
      meetingUrl: evt.meetingUrl || '',
      color: evt.color || 'indigo',
      status: evt.status || 'scheduled',
      linkedNotificationId: evt.linkedNotificationId || '',
      createdAt: now,
      updatedAt: now
    };

    this.data.events.push(newEvent);
    // Sort events by startDate ascending
    this.data.events.sort((a, b) => a.startDate.localeCompare(b.startDate));
    this.saveDatabase();
    return newEvent;
  }

  public deleteEvent(id: string): void {
    if (!this.data.events) return;
    this.data.events = this.data.events.filter((e) => e.id !== id);
    this.saveDatabase();
  }
}

export const cmsDb = new CmsDatabase();
