export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  category: 'software' | 'web' | 'mobile' | 'enterprise' | 'marketing' | 'cloud' | 'ai';
  deliverables: string[];
  technologies: string[];
  metrics: string;
  image?: string;
  duration?: string;
  featured?: boolean;
}

export interface SoftwareSolution {
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
  image?: string;
  duration?: string;
  model3DId?: string;
  featured?: boolean;
}

export interface DetailModalData {
  type: 'project' | 'service' | 'solution';
  id: string;
  category: string;
  title: string;
  description: string;
  longDesc?: string;
  iconName?: string;
  deliverables?: string[];
  features?: string[];
  benefits?: string[];
  duration?: string;
  metadata?: string;
  image: string;
  technologies: string[];
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  popular?: boolean;
  deliverables: string[];
  features: { name: string; included: boolean }[];
  supportLevel: string;
  idealFor: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  iconName?: string;
  initials?: string;
  skills: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  titleHighlight?: boolean;
  featuredQuote?: string;
  summaryHighlights?: string[];
  sections?: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
    bulletPoints?: string[];
    callout?: string;
  }[];
  comparisonTable?: {
    feature: string;
    aiDoctor: string;
    humanDoctor: string;
  }[];
}

export interface CareerJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  technologies: string[];
  duration: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Cloud & DevOps' | 'Database' | 'AI & Analytics';
  icon: string;
  experienceYears: number;
  level: string;
  description: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
  projectType: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface LeadershipContact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  isHQ?: boolean;
}

export type PageId =
  | 'home'
  | 'services'
  | 'solutions'
  | 'projects'
  | 'pricing'
  | 'about'
  | 'team'
  | 'support'
  | 'blog'
  | 'contact';

