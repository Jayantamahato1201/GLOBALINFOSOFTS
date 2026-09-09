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
  CmsRevision
} from './cmsTypes.js';
import { getInitialCmsDatabase } from './cmsSeed.js';

const JWT_SECRET = process.env.JWT_SECRET || 'global-infosoft-secure-cms-token-secret-2025';
const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'cms_data.json');

export class CmsDatabase {
  private data: CmsDatabaseSchema;

  constructor() {
    this.ensureDirectory();
    this.data = this.loadDatabase();
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
    try {
      // In serverless environments, check if /tmp has a previous write in this container
      const tmpFile = path.join('/tmp', 'cms_data.json');
      if (fs.existsSync(tmpFile)) {
        const raw = fs.readFileSync(tmpFile, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && parsed.users && parsed.pages) {
          return parsed;
        }
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && parsed.users && parsed.pages) {
          if (!parsed.paymentSettings) {
            const initial = getInitialCmsDatabase();
            parsed.paymentSettings = initial.paymentSettings;
            this.saveDatabase(parsed);
          }
          return parsed;
        }
      }
    } catch (err) {
      console.error('[CMS DB] Failed to parse existing cms_data.json, re-seeding:', err);
    }

    const initial = getInitialCmsDatabase();
    this.saveDatabase(initial);
    return initial;
  }

  public saveDatabase(dataToSave?: CmsDatabaseSchema): void {
    const d = dataToSave || this.data;
    try {
      this.ensureDirectory();
      const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tempFile, JSON.stringify(d, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(d, null, 2), 'utf-8');
      } catch (e) {
        // Fallback for read-only environments (such as Vercel AWS Lambda)
        try {
          const tmpFile = path.join('/tmp', 'cms_data.json');
          fs.writeFileSync(tmpFile, JSON.stringify(d, null, 2), 'utf-8');
        } catch {
          // Data is maintained in-memory in this.data
        }
      }
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
    return bcrypt.compareSync(passwordPlain, user.passwordHash);
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
}

export const cmsDb = new CmsDatabase();
