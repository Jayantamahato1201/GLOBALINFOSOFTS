export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: 'super_admin' | 'admin' | 'editor';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

export interface CmsPage {
  id: string;
  name: string;
  route: string;
  enabled: boolean;
  lastUpdated: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  displayOrder: number;
}

export interface CmsSection {
  id: string;
  pageId: string;
  sectionKey: string;
  title: string;
  subtitle?: string;
  enabled: boolean;
  displayOrder: number;
  lastUpdated: string;
  content?: Record<string, any>;
}

export interface CmsMedia {
  id: string;
  filename: string;
  url: string;
  fileType: string;
  size: number;
  uploadedAt: string;
  usedIn?: string[];
  dimensions?: string;
}

export interface CmsBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  image?: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  readTime: string;
  status: 'published' | 'draft' | 'scheduled';
  publishDate: string;
  date?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  views: number;
  featuredQuote?: string;
  summaryHighlights?: string[];
  sections?: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
    bulletPoints?: string[];
    callout?: string;
  }[];
}

export interface CmsCareer {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  applicationEmail: string;
  deadline?: string;
  status: 'open' | 'closed' | 'draft';
  displayOrder: number;
  createdAt: string;
}

export interface CmsService {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  category: 'software' | 'erp' | 'support' | 'cloud' | 'web' | 'mobile' | 'enterprise' | 'pos' | 'marketing' | 'ai' | string;
  deliverables: string[];
  technologies: string[];
  metrics: string;
  image: string;
  duration: string;
  featured: boolean;
  enabled: boolean;
  displayOrder: number;
}

export interface CmsSolution {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  industry: string;
  iconName: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  compliance: string;
  demoAvailable: boolean;
  image: string;
  duration: string;
  featured: boolean;
  enabled: boolean;
  displayOrder: number;
}

export interface CmsProject {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  image: string;
  summary: string;
  description?: string;
  challenge: string;
  solution: string;
  results: (string | { label: string; value: string })[];
  technologies: string[];
  duration: string;
  completionDate?: string;
  liveUrl?: string;
  featured: boolean;
  enabled: boolean;
  displayOrder: number;
}

export interface CmsTeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  iconName?: string;
  initials?: string;
  skills: string[];
  email?: string;
  linkedin?: string;
  image?: string;
  enabled: boolean;
  displayOrder: number;
}

export interface CmsLocation {
  id: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  isHQ: boolean;
  mapUrl?: string;
  coordinates?: string;
  enabled: boolean;
}

export interface CmsTestimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
  projectType: string;
  enabled: boolean;
  displayOrder: number;
}

export interface CmsNavigationItem {
  id: string;
  label: string;
  page: string;
  path: string;
  enabled: boolean;
  displayOrder: number;
  isSecondary: boolean;
}

export interface CmsFooterSettings {
  companyDescription: string;
  copyrightText: string;
  address: string;
  phone: string;
  email: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    facebook: string;
    github: string;
    youtube: string;
  };
  enabledColumns: {
    brand: boolean;
    solutions: boolean;
    services: boolean;
    quickLinks: boolean;
    contact: boolean;
  };
}

export interface CmsSiteSettings {
  companyName: string;
  tagline: string;
  subTagline: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  altPhone: string;
  salesPhone: string;
  contactEmail: string;
  supportEmail: string;
  officialEmail: string;
  email?: string;
  headOfficeAddress: string;
  address?: string;
  supportHours: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  allowPublicSignup: boolean;
  socialLinks: {
    linkedin: string;
    twitter: string;
    facebook: string;
    github: string;
    youtube: string;
    instagram?: string;
  };
}

export interface CmsActivityLog {
  id: string;
  action: string;
  userEmail: string;
  userName: string;
  timestamp: string;
  details?: string;
  category: 'auth' | 'page' | 'blog' | 'career' | 'media' | 'content' | 'settings' | 'user';
}

export interface CmsRevision {
  id: string;
  entityType: string;
  entityId: string;
  versionNumber: number;
  updatedBy: string;
  timestamp: string;
  dataSnapshot: any;
  summary: string;
}

export interface CmsPaymentSettings {
  enabled: boolean;
  provider: 'razorpay' | 'stripe' | 'phonepe' | 'cashfree' | 'upi_bank';
  currency: 'INR' | 'USD';
  testMode: boolean;
  merchantId: string;
  keyId: string; // Public API Key (Client accessible)
  keySecret: string; // Secret Key (SERVER-SIDE ONLY, masked for client)
  webhookSecret: string; // Webhook Secret (SERVER-SIDE ONLY, masked)
  upiVpa: string; // e.g. 9431515806@paytm or globalinfosoft@upi
  upiPayeeName: string; // Global InfoSoft
  bankDetails: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branch: string;
  };
  notes: string;
}

export interface CmsPaymentTransaction {
  id: string;
  orderId?: string;
  paymentId?: string;
  provider: 'razorpay' | 'stripe' | 'upi' | 'bank_transfer';
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  clientName?: string;
  clientEmail?: string;
  description?: string;
  signatureVerified: boolean;
  timestamp: string;
  rawWebhookPayload?: any;
}

export interface CmsNotification {
  id: string;
  title: string;
  subtitle?: string;
  message: string;
  imageUrl?: string;
  badgeText?: string;
  type: 'festival' | 'announcement' | 'offer' | 'alert' | 'celebration';
  ctaText?: string;
  ctaLink?: string;
  secondaryButtonText?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  autoDeleteOnEnd?: boolean;
  showCountdownTimer?: boolean;
  countdownTitle?: string;
  isScheduled?: boolean;
  showOncePerSession?: boolean;
  displayDelayMs?: number;
  themeColor?: string; // 'amber' | 'emerald' | 'indigo' | 'rose' | 'cyan' | 'purple'
  enableConfetti?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CmsEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string;   // HH:mm
  isAllDay: boolean;
  category: 'holiday' | 'festival' | 'meeting' | 'webinar' | 'deadline' | 'milestone' | 'celebration';
  location?: string;
  meetingUrl?: string;
  color?: string; // 'amber' | 'emerald' | 'indigo' | 'rose' | 'cyan' | 'purple' | 'blue'
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  linkedNotificationId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CmsDatabaseSchema {
  users: AdminUser[];
  pages: CmsPage[];
  sections: CmsSection[];
  media: CmsMedia[];
  blogs: CmsBlog[];
  careers: CmsCareer[];
  services: CmsService[];
  solutions: CmsSolution[];
  projects: CmsProject[];
  team: CmsTeamMember[];
  locations: CmsLocation[];
  testimonials: CmsTestimonial[];
  navigation: CmsNavigationItem[];
  footer: CmsFooterSettings;
  settings: CmsSiteSettings;
  paymentSettings: CmsPaymentSettings;
  transactions?: CmsPaymentTransaction[];
  notifications?: CmsNotification[];
  events?: CmsEvent[];
  content: Record<string, any>;
  activityLogs: CmsActivityLog[];
  revisions: CmsRevision[];
}
