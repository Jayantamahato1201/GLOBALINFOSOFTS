import {
  ServiceItem,
  SoftwareSolution,
  PricingPlan,
  TeamMember,
  BlogPost,
  CaseStudy,
  Technology,
  Testimonial,
  ProcessStep,
  FaqItem,
  OfficeLocation,
  LeadershipContact
} from '../types';

export const COMPANY_INFO = {
  name: 'Global InfoSofts',
  tagline: 'Transforming Ideas Into Intelligent Digital Realities',
  subTagline: 'Custom Software Development, Enterprise ERP, Accounting Solutions, Web & Mobile App Engineering & Digital Services.',
  foundedYear: 2014,
  yearsOfExperience: '10+',
  projectsCompleted: '350+',
  globalClients: '150+',
  uptimeSla: '99.98%',
  clientSatisfaction: '99.5%',
  contactEmail: 'kumarrajnish531@gmail.com',
  supportEmail: 'kumarrajnish531@gmail.com',
  ctoEmail: 'manoj@globalinfosofts.com',
  salesPhone: '+91-9431515806',
  intlPhone: '+91-9431515806',
  headOfficeAddress: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Jamshedpur 831012',
  city: 'Jamshedpur',
  state: 'Jharkhand',
  postalCode: '831012',
  supportHours: 'Mon - Sat: 9:30 AM - 7:00 PM IST (24/7 SLA Telemetry)',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/global-infosofts',
    twitter: 'https://twitter.com/globalinfosofts',
    facebook: 'https://facebook.com/globalinfosofts',
    github: 'https://github.com/globalinfosofts',
    youtube: 'https://youtube.com/@globalinfosofts'
  }
};

export const LEADERSHIP_CONTACTS: LeadershipContact[] = [
  {
    name: 'Rajnish Kumar',
    role: 'CEO',
    phone: '+91-9431515806',
    email: 'kumarrajnish531@gmail.com'
  },
  {
    name: 'Manoj Mahato',
    role: 'CTO',
    phone: '+91-9431515806',
    email: 'manoj@globalinfosofts.com'
  }
];

export const HEAD_OFFICE = {
  name: 'Global Infosoft',
  title: 'Head Office',
  address: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Jamshedpur 831012',
  phone: '+91-9431515806',
  altPhone: '+91-9431515806',
  email: 'kumarrajnish531@gmail.com',
  hours: 'Mon - Sat: 9:30 AM - 7:00 PM IST'
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    shortDesc: 'Tailor-engineered, scalable enterprise software systems built for high performance, maximum security, and business agility.',
    longDesc: 'We architect bespoke desktop, web, and distributed software systems from scratch. Utilizing modern architectural patterns such as microservices, domain-driven design, and clean architecture, our software solutions eliminate operational bottlenecks and scale seamlessly with enterprise demand.',
    iconName: 'Code2',
    category: 'software',
    deliverables: [
      'Microservices & Distributed Systems',
      'Desktop & Windows Native (.NET/WPF/Electron)',
      'Enterprise Workflow Automation',
      'Legacy Software Modernization',
      'Custom API Gateways & Middleware'
    ],
    technologies: ['C# .NET', 'Node.js', 'Python', 'Java', 'Go', 'Electron', 'PostgreSQL'],
    metrics: '3.8x Operational Efficiency',
    featured: true
  },
  {
    id: 'web-development',
    title: 'Full-Stack Web Development',
    shortDesc: 'Ultra-fast, responsive web platforms and dynamic SaaS applications delivering unmatched UI/UX and conversion rates.',
    longDesc: 'From high-load SaaS platforms to interactive web portals, our engineering team crafts modern, SEO-optimized web applications with lightning-fast load times, fluid 3D micro-interactions, responsive design systems, and robust cloud backends.',
    iconName: 'Globe',
    category: 'web',
    deliverables: [
      'Progressive Web Apps (PWA)',
      'Custom SaaS & B2B Web Portals',
      'High-Conversion E-Commerce Stores',
      'Interactive 3D Web Experiences',
      'Headless CMS & Real-Time Dashboards'
    ],
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Node.js', 'GraphQL'],
    metrics: '99.9% Lighthouse Speed Score',
    featured: true
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Application Engineering',
    shortDesc: 'Native and cross-platform mobile apps for iOS and Android that engage millions of users with native-speed performance.',
    longDesc: 'Deliver delightful mobile experiences tailored to your end-users. We design, build, and publish high-performance iOS and Android applications with offline-first sync, biometric security, real-time push notifications, and seamless device sensor integration.',
    iconName: 'Smartphone',
    category: 'mobile',
    deliverables: [
      'iOS (Swift / SwiftUI) Native Apps',
      'Android (Kotlin / Jetpack Compose)',
      'Cross-Platform (React Native & Flutter)',
      'Mobile Banking & Wallet Solutions',
      'App Store Optimization (ASO) & Deployment'
    ],
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'GraphQL', 'AWS Mobile'],
    metrics: '4.9★ Average App Store Rating',
    featured: true
  },
  {
    id: 'erp-crm',
    title: 'Enterprise ERP & CRM Solutions',
    shortDesc: 'Unified enterprise resource planning and customer relationship management systems built to streamline all business operations.',
    longDesc: 'Centralize inventory management, supply chain logistics, financial accounting, human resources, and customer lifecycle data into one intuitive, real-time dashboard tailored precisely to your company workflows.',
    iconName: 'Layers',
    category: 'enterprise',
    deliverables: [
      'Custom ERP Architecture & Modular Extensions',
      'Omnichannel CRM & Lead Pipelines',
      'Automated Inventory & Supply Chain Tracking',
      'Integrated Multi-Department Accounting',
      'Role-Based Access Control (RBAC) & Audit Trails'
    ],
    technologies: ['Microsoft SQL Server', 'PostgreSQL', '.NET Core', 'Python Django', 'Docker', 'Redis'],
    metrics: '45% Reduction in Admin Overhead',
    featured: true
  },
  {
    id: 'accounting-software',
    title: 'Accounting & Business Management',
    shortDesc: 'Specialized accounting solutions for retail, wholesale, optical, textiles, hospitality, and healthcare businesses.',
    longDesc: 'Equipped with native Windows integration, real-time GST/VAT compliance, invoice generation, ledger management, and barcode inventory. Includes dedicated 6-month free support and guaranteed 24-hour response SLAs.',
    iconName: 'Calculator',
    category: 'software',
    deliverables: [
      'Multi-Currency & Tax / GST Compliance',
      'Barcode & Point-of-Sale (POS) Integration',
      'Financial Ledger & Balance Sheet Reporting',
      'Custom Industry Modules (Retail, Optical, Hotel)',
      'Native Windows .NET & SQL High-Reliability Engine'
    ],
    technologies: ['Microsoft .NET', 'SQL Server', 'WPF', 'Crystal Reports', 'C#', 'Azure'],
    metrics: '100% Tax & Audit Compliance'
  },
  {
    id: 'digital-marketing',
    title: 'Strategic Digital Marketing & SEO',
    shortDesc: 'Data-driven growth strategies, full-funnel customer acquisition, SEO dominance, and high-ROI conversion campaigns.',
    longDesc: 'Propel your brand to the top of search engines and social platforms. We build holistic digital marketing funnels, competitor benchmark audits, content calendars, conversion rate optimization (CRO), automated email campaigns, and paid acquisition funnels.',
    iconName: 'TrendingUp',
    category: 'marketing',
    deliverables: [
      'Technical, On-Page & Local SEO Dominance',
      'Performance Paid Advertising (Google & Meta Ads)',
      'Growth Funnel Setup & Conversion Optimization',
      'Competitor Intelligence & Market Gap Analysis',
      'Automated Nurture Email Workflows & Analytics'
    ],
    technologies: ['Google Analytics 4', 'SEMrush', 'HubSpot', 'Meta Pixel', 'Ahrefs', 'Search Console'],
    metrics: '+340% Organic Traffic Growth'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Engineering & DevOps',
    shortDesc: 'Bulletproof cloud infrastructure, CI/CD automation, container orchestration, and zero-downtime reliability.',
    longDesc: 'Architect, migrate, and maintain cloud environments across AWS, Google Cloud, and Microsoft Azure. We implement automated infrastructure-as-code, Docker Kubernetes pipelines, 24/7 monitoring, and automated disaster recovery.',
    iconName: 'Cloud',
    category: 'cloud',
    deliverables: [
      'Cloud Architecture (AWS, GCP, Azure)',
      'Automated CI/CD Deployment Pipelines',
      'Kubernetes & Docker Containerization',
      'SOC2 & ISO 27001 Security Hardening',
      '24/7 Server Health Monitoring & Auto-Scaling'
    ],
    technologies: ['AWS', 'Google Cloud', 'Terraform', 'Kubernetes', 'Docker', 'GitHub Actions'],
    metrics: '99.99% Infrastructure Uptime'
  },
  {
    id: 'ai-automation',
    title: 'AI & Workflow Automation',
    shortDesc: 'Empower your enterprise with intelligent AI models, document processing, smart chatbots, and predictive analytics.',
    longDesc: 'Integrate cutting-edge AI capabilities into your everyday business workflows. From fine-tuned LLM assistants and automated invoice extraction to predictive inventory forecasting and computer vision inspection systems.',
    iconName: 'Sparkles',
    category: 'ai',
    deliverables: [
      'Intelligent Enterprise Knowledge Chatbots',
      'Automated Document OCR & Data Extraction',
      'Predictive Business Intelligence & Forecasting',
      'AI Workflow Agent Automations',
      'Secure On-Premise & Cloud LLM Integration'
    ],
    technologies: ['Gemini API', 'Python', 'PyTorch', 'LangChain', 'FastAPI', 'Vector Databases'],
    metrics: '70% Faster Data Processing'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'nexus-erp',
    title: 'Next-Gen Manufacturing ERP & Supply Chain System',
    client: 'Apex Industrial Corp',
    industry: 'Manufacturing & Distribution',
    category: 'Enterprise ERP',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    summary: 'Re-engineered the complete supply chain, multi-warehouse inventory, and production scheduling for a global manufacturing conglomerate across 4 countries.',
    challenge: 'The client struggled with siloed legacy spreadsheet systems, causing 18% inventory mismatch, delays in procurement, and inaccurate financial projections.',
    solution: 'Designed and deployed a modular cloud ERP system with real-time barcode telemetry, automated purchase order generation, role-based operator portals, and integrated financial ledgers.',
    results: [
      { label: 'Inventory Accuracy', value: '99.8%' },
      { label: 'Procurement Cycle', value: '-60%' },
      { label: 'Cost Savings', value: '$1.4M / yr' },
      { label: 'Deployment Time', value: '14 Weeks' }
    ],
    technologies: ['.NET Core', 'PostgreSQL', 'React', 'Docker', 'Redis', 'Tailwind CSS'],
    duration: '4 Months',
    liveUrl: 'https://globalinfosofts.com/portfolio/nexus-erp'
  },
  {
    id: 'paystream-mobile',
    title: 'FinTech Digital Wallet & Micro-Lending Mobile App',
    client: 'PayStream Financial Services',
    industry: 'Financial Technology',
    category: 'Mobile & Cloud',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    summary: 'Engineered a high-concurrency mobile banking app handling over 500,000 daily micro-transactions with bank-grade biometric authentication and zero downtime.',
    challenge: 'Needed ultra-low latency transaction processing (<200ms) with strict PCI-DSS compliance and biometric fraud detection.',
    solution: 'Built native-speed cross-platform mobile apps with biometric key storage, tokenized payment gateways, offline receipt caching, and automated credit risk scoring.',
    results: [
      { label: 'Active Users', value: '1.2M+' },
      { label: 'Avg Latency', value: '140ms' },
      { label: 'App Store Rating', value: '4.9★' },
      { label: 'Daily Volume', value: '$8.2M' }
    ],
    technologies: ['Flutter', 'Node.js', 'AWS Lambda', 'DynamoDB', 'WebSockets', 'OpenID'],
    duration: '5 Months',
    liveUrl: 'https://globalinfosofts.com/portfolio/paystream'
  },
  {
    id: 'mediconnect-health',
    title: 'HIPAA-Compliant Telehealth & Clinical EHR Platform',
    client: 'CareFirst Medical Alliance',
    industry: 'Healthcare & Medicine',
    category: 'Web Application & Cloud',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Built an end-to-end telemedicine video consultation platform with encrypted electronic health records (EHR) and prescription management.',
    challenge: 'Existing third-party tools lacked HIPAA data isolation, suffered from video buffering, and failed to integrate with hospital legacy billing software.',
    solution: 'Developed a WebRTC ultra-low latency video consultation suite with end-to-end encrypted medical chart sync, automated appointment reminders, and digital prescription signatures.',
    results: [
      { label: 'Consultations Hosted', value: '350K+' },
      { label: 'Patient Wait Time', value: '-72%' },
      { label: 'Compliance Score', value: '100% HIPAA' },
      { label: 'Uptime Reliability', value: '99.99%' }
    ],
    technologies: ['React', 'WebRTC', 'Go', 'PostgreSQL', 'Google Cloud', 'Docker'],
    duration: '6 Months',
    liveUrl: 'https://globalinfosofts.com/portfolio/mediconnect'
  },
  {
    id: 'omnigrowth-marketing',
    title: 'Global SaaS Brand Positioning & Organic SEO Funnel',
    client: 'CloudMetric SaaS',
    industry: 'B2B Enterprise Software',
    category: 'Digital Marketing & Growth',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Executed an omnichannel growth sprint, re-engineered technical SEO, implemented interactive ROI calculators, and orchestrated high-converting lead funnels.',
    challenge: 'High customer acquisition costs ($420/lead) with poor organic search discoverability against established market leaders.',
    solution: 'Constructed an authoritative technical content silo, rebuilt the landing page for sub-second performance, and deployed automated email nurture sequences.',
    results: [
      { label: 'Organic Traffic', value: '+410%' },
      { label: 'CAC Reduction', value: '-54%' },
      { label: 'Demo Bookings', value: '+280%' },
      { label: 'Top 3 Keywords', value: '140+' }
    ],
    technologies: ['Next.js', 'GA4', 'HubSpot', 'SEMrush', 'Stripe', 'Tailwind'],
    duration: '3 Months',
    liveUrl: 'https://globalinfosofts.com/portfolio/omnigrowth'
  }
];

export const TECHNOLOGIES_DATA: Technology[] = [
  { name: 'React 19 & Next.js', category: 'Frontend', icon: 'Atom', experienceYears: 8, level: 'Expert', description: 'Server components, reactive micro-frontends, high-performance UI engines.' },
  { name: 'TypeScript', category: 'Frontend', icon: 'FileCode2', experienceYears: 7, level: 'Expert', description: 'Strict typing, robust contract schemas, and zero-runtime failure safety.' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'Palette', experienceYears: 6, level: 'Expert', description: 'Design tokens, dark/light architectures, responsive micro-animations.' },
  { name: 'Three.js & WebGL', category: 'Frontend', icon: 'Box', experienceYears: 5, level: 'Advanced', description: '3D interactive shaders, product configurators, and kinetic visualizers.' },
  
  { name: 'Node.js & Express', category: 'Backend', icon: 'Server', experienceYears: 9, level: 'Expert', description: 'Asynchronous event-driven microservices with high concurrency throughput.' },
  { name: 'Microsoft .NET & C#', category: 'Backend', icon: 'Cpu', experienceYears: 12, level: 'Master', description: 'Enterprise desktop software, native Windows utilities, and distributed APIs.' },
  { name: 'Python & Django / FastAPI', category: 'Backend', icon: 'Code', experienceYears: 8, level: 'Expert', description: 'High-speed AI backends, data processing pipelines, and REST/GraphQL APIs.' },
  { name: 'Go (Golang)', category: 'Backend', icon: 'Zap', experienceYears: 5, level: 'Advanced', description: 'Ultra-low-latency network systems, distributed workers, and microservices.' },
  
  { name: 'Flutter & Dart', category: 'Mobile', icon: 'Smartphone', experienceYears: 6, level: 'Expert', description: 'Pixel-perfect multi-platform apps for iOS, Android, and Desktop from one codebase.' },
  { name: 'React Native', category: 'Mobile', icon: 'Layers', experienceYears: 7, level: 'Expert', description: 'Native bridging, high-performance mobile UI, and rapid feature iteration.' },
  { name: 'Swift & SwiftUI (iOS)', category: 'Mobile', icon: 'Apple', experienceYears: 8, level: 'Advanced', description: 'Native iOS engineering with CoreData, Apple Pay, and metal graphics.' },
  { name: 'Kotlin (Android)', category: 'Mobile', icon: 'Smartphone', experienceYears: 8, level: 'Advanced', description: 'Modern native Android architecture with Jetpack Compose & Coroutines.' },
  
  { name: 'Amazon Web Services (AWS)', category: 'Cloud & DevOps', icon: 'Cloud', experienceYears: 9, level: 'Expert', description: 'EC2, ECS, Lambda, S3, RDS, CloudFront, IAM security architectures.' },
  { name: 'Google Cloud Platform (GCP)', category: 'Cloud & DevOps', icon: 'CloudCog', experienceYears: 7, level: 'Expert', description: 'Cloud Run, Kubernetes Engine, BigQuery, and enterprise AI models.' },
  { name: 'Docker & Kubernetes', category: 'Cloud & DevOps', icon: 'Container', experienceYears: 8, level: 'Expert', description: 'Zero-downtime blue/green rollouts, cluster orchestration, and automated scaling.' },
  { name: 'CI/CD & Terraform', category: 'Cloud & DevOps', icon: 'GitBranch', experienceYears: 7, level: 'Advanced', description: 'Infrastructure as Code (IaC) with automated test and deployment pipelines.' },
  
  { name: 'PostgreSQL', category: 'Database', icon: 'Database', experienceYears: 10, level: 'Expert', description: 'ACID transactional data, relational modeling, and high-volume indexing.' },
  { name: 'Microsoft SQL Server', category: 'Database', icon: 'Table', experienceYears: 12, level: 'Master', description: 'Enterprise ERP clustering, stored procedures, and audit analytics.' },
  { name: 'MongoDB & Redis', category: 'Database', icon: 'HardDrive', experienceYears: 8, level: 'Expert', description: 'Ultra-fast in-memory caching and document-oriented storage.' },
  
  { name: 'Gemini & Generative AI', category: 'AI & Analytics', icon: 'Sparkles', experienceYears: 4, level: 'Advanced', description: 'Enterprise RAG, multimodal intelligence, and intelligent automation agents.' },
  { name: 'Google Analytics 4 & SEMrush', category: 'AI & Analytics', icon: 'BarChart3', experienceYears: 9, level: 'Expert', description: 'Full-funnel attribution, competitor search intelligence, and conversion tracking.' }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discovery & Strategic Blueprint',
    subtitle: 'Deep-dive analysis of goals and technical feasibility',
    description: 'We conduct architectural workshops, audit existing systems, define clear user personas, and establish non-negotiable performance & security KPIs.',
    deliverables: ['Technical Specification Document', 'Architecture Blueprints', 'Milestone Roadmap', 'Risk Mitigation Plan'],
    timeline: 'Week 1 - 2',
    icon: 'Search'
  },
  {
    stepNumber: '02',
    title: 'Interactive UI/UX & 3D Prototyping',
    subtitle: 'Human-centric user journeys and responsive wireframes',
    description: 'Our design team creates interactive design systems, responsive component libraries, and clickable prototypes tested against real user scenarios.',
    deliverables: ['Figma Design System', 'Clickable Prototype', 'Accessibility Audit', 'Design Token Library'],
    timeline: 'Week 2 - 3',
    icon: 'Layout'
  },
  {
    stepNumber: '03',
    title: 'Agile Engineering & Sprints',
    subtitle: 'Iterative, test-driven full-stack development',
    description: 'We code with strict TypeScript safety, automated unit tests, clean modular patterns, and bi-weekly sprint demos with working software.',
    deliverables: ['Bi-Weekly Demo Builds', 'Clean Source Code Repository', 'Automated CI/CD Pipeline', 'REST/GraphQL API Docs'],
    timeline: 'Week 4 - 10',
    icon: 'Cpu'
  },
  {
    stepNumber: '04',
    title: 'Rigorous QA & Security Penetration',
    subtitle: 'Zero-tolerance testing across devices and load thresholds',
    description: 'Automated end-to-end testing, load testing under peak concurrent traffic, vulnerability scans, and cross-browser/device validation.',
    deliverables: ['Security Penetration Report', 'Load & Stress Test Metrics', 'Cross-Device QA Signoff', 'WCAG AA Compliance'],
    timeline: 'Week 10 - 12',
    icon: 'ShieldCheck'
  },
  {
    stepNumber: '05',
    title: 'Zero-Downtime Cloud Deployment',
    subtitle: 'Production rollout with auto-scaling & telemetry',
    description: 'Seamless production launch across configured cloud environments with active health monitors, CDN caching, and automated disaster backups.',
    deliverables: ['Production Cloud Deployment', 'Live Monitoring Dashboards', 'DNS & SSL Configuration', 'Disaster Recovery Setup'],
    timeline: 'Week 12 - 13',
    icon: 'Rocket'
  },
  {
    stepNumber: '06',
    title: 'Continuous Support & Growth Optimization',
    subtitle: '24/7 SLA guarantees and continuous feature iteration',
    description: 'Dedicated post-launch engineering support, security patches, performance tuning, and data-driven conversion growth sprints.',
    deliverables: ['24/7 Technical Support SLA', 'Monthly Performance Audits', 'SEO & Conversion Reviews', 'Feature Roadmap Backlog'],
    timeline: 'Ongoing Partnership',
    icon: 'HeartHandshake'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Vikram Malhotra',
    role: 'Chief Operating Officer',
    company: 'Apex Industrial Dynamics',
    location: 'Bangalore / Singapore',
    content: 'Global InfoSofts transformed our entire multi-factory manufacturing operations. Their custom ERP eliminated 300+ hours of manual logging per month and gave our executive board real-time visibility across 4 countries.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    projectType: 'Enterprise Cloud ERP'
  },
  {
    id: 'test-2',
    author: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'PayStream Financial Inc',
    location: 'San Francisco, USA',
    content: 'The mobile app built by Global InfoSofts exceeded all expectations. We hit 1M+ transactions within 90 days with zero downtime and sub-200ms payment processing. Their engineering discipline and speed are unmatched.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    projectType: 'FinTech Mobile Application'
  },
  {
    id: 'test-3',
    author: 'Dr. Arvind Sharma',
    role: 'Managing Director',
    company: 'CareFirst Healthcare Network',
    location: 'Kolkata, India',
    content: 'Finding an engineering partner who genuinely understands healthcare compliance and real-time WebRTC architecture was tough until we partnered with Global InfoSofts. Our patient satisfaction scores rose by 42%.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    projectType: 'Telehealth & EHR Suite'
  },
  {
    id: 'test-4',
    author: 'Marcus Vance',
    role: 'Head of Marketing',
    company: 'CloudMetric SaaS',
    location: 'London, UK',
    content: 'Their digital marketing and SEO growth engine delivered a 340% increase in organic pipeline in 4 months. The interactive calculators and landing page speed they engineered directly cut our customer acquisition costs in half.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    projectType: 'Digital Marketing & SEO Funnel'
  }
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General & Engagement',
    question: 'What services does Global InfoSofts specialize in?',
    answer: 'Global InfoSofts is a full-lifecycle technology partner specializing in Custom Enterprise Software, Full-Stack Web & SaaS Development, Mobile Applications (iOS & Android), Custom ERP/CRM Systems, Accounting Software with GST/Tax Compliance, Cloud DevOps & Security, and Strategic Digital Marketing (SEO & Funnel Optimization).'
  },
  {
    id: 'faq-2',
    category: 'IP & Ownership',
    question: 'Who owns the intellectual property and code of the project?',
    answer: 'You retain 100% full intellectual property (IP) ownership of all source code, design assets, database architectures, and documentation upon project completion. We sign non-disclosure agreements (NDAs) before discovery.'
  },
  {
    id: 'faq-3',
    category: 'Timeline & Delivery',
    question: 'How long does a typical software or web development project take?',
    answer: 'Project timelines vary based on scope: standard business web applications and mobile MVPs typically launch in 4 to 8 weeks, while complex enterprise ERP/CRM architectures or comprehensive digital ecosystems take 12 to 24 weeks with bi-weekly working sprint releases.'
  },
  {
    id: 'faq-4',
    category: 'Support & SLAs',
    question: 'What kind of post-launch support and warranty do you provide?',
    answer: 'We provide comprehensive post-launch warranty and 24/7 technical support. For our accounting and custom software packages, we offer 6 months of complimentary support with a guaranteed 24-hour response SLA, followed by dedicated managed services.'
  },
  {
    id: 'faq-5',
    category: 'Pricing & Estimates',
    question: 'How do you structure project pricing and contracts?',
    answer: 'We offer flexible engagement models tailored to your business needs: Fixed-Price Milestone Contracts for well-defined scopes, Dedicated Engineering Teams (Time & Materials) for scaling products, and Monthly Growth Retainers for marketing and continuous DevOps.'
  },
  {
    id: 'faq-6',
    category: 'Technology & Migration',
    question: 'Can you modernize or integrate with our existing legacy systems?',
    answer: 'Yes. Our team has extensive experience modernizing legacy Windows .NET, SQL Server, and monolithic platforms into modern cloud microservices, modernizing APIs, and migrating data safely without business downtime.'
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: 'Jamshedpur (Head Office)',
    country: 'Jharkhand, India',
    address: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Jamshedpur 831012',
    phone: '+91-9431515806',
    email: 'kumarrajnish531@gmail.com',
    hours: 'Mon - Sat: 9:30 AM - 7:00 PM IST',
    isHQ: true
  }
];

export const SOLUTIONS_DATA: SoftwareSolution[] = [
  {
    id: 'sol-retail-pos',
    title: 'Retail POS & Billing Software',
    shortDesc: 'Complete Point of Sale, Barcode Scanning, Multi-Counter Billing, and Inventory Management for retail outlets and supermarkets.',
    fullDesc: 'A lightning-fast billing and point-of-sale software engineered for high-volume retail environments. Features instant barcode generation, touch POS counters, customer loyalty rewards, split payments, and real-time inventory synchronization across multi-branch stores.',
    industry: 'Retail & Supermarkets',
    iconName: 'ShoppingBag',
    features: [
      'Touch POS & Rapid Barcode Checkout (<3 sec billing)',
      'Multi-Counter & Cash Drawer Management',
      'Inventory Stock Alerts & Automatic Reordering',
      'Customer Loyalty Points & WhatsApp Invoicing',
      'Comprehensive GST / VAT Tax Compliance'
    ],
    benefits: [
      'Reduces checkout queue times by 65%',
      'Eliminates stock pilferage and inventory discrepancies',
      'Multi-branch real-time centralized dashboard'
    ],
    technologies: ['C# .NET', 'Microsoft SQL Server', 'WPF', 'SQLite Sync', 'Thermal Print API'],
    compliance: 'GST Ready / ISO 9001:2015 Standards',
    demoAvailable: true,
    model3DId: 'erp-core',
    featured: true
  },
  {
    id: 'sol-optical-erp',
    title: 'Optical Store Management Software',
    shortDesc: 'Specialized optical retail and eye clinic software managing lens prescriptions, frame inventory, and doctor appointments.',
    fullDesc: 'Tailor-made specifically for optical stores, opticians, and vision clinics. Tracks detailed eye power prescriptions (Spherical, Cylindrical, Axis, Addition), frame barcode tagging, lens laboratory order job cards, doctor consultation schedules, and customer delivery notifications.',
    industry: 'Healthcare & Optical Retail',
    iconName: 'Glasses',
    features: [
      'Complete Eye Prescription & Power Matrix Record',
      'Lens Lab Job-Card Generation & Delivery Tracking',
      'Frame & Sunglass Barcode Serial Numbering',
      'Optometrist & Doctor Appointment Scheduler',
      'Automated SMS & WhatsApp Status Updates to Patients'
    ],
    benefits: [
      'Zero prescription transcription errors',
      'Smooth integration between front showroom and optical workshop',
      'Enhanced repeat customer retention through eye exam reminders'
    ],
    technologies: ['.NET Core', 'SQL Server', 'React', 'Crystal Reports', 'Twilio SMS'],
    compliance: 'Healthcare Data Privacy & GST Compliance',
    demoAvailable: true,
    model3DId: 'erp-core',
    featured: true
  },
  {
    id: 'sol-wholesale-erp',
    title: 'Wholesale & Distribution ERP',
    shortDesc: 'End-to-end B2B supply chain, multi-warehouse inventory, credit limit management, and dispatch route logistics.',
    fullDesc: 'Engineered for wholesale traders, distributors, and supply chain operators. Manage bulk pricing tiers, distributor credit terms, multi-godown stock transfers, batch/expiry tracking, and field sales agent order booking with instant ledger sync.',
    industry: 'Wholesale & Supply Chain',
    iconName: 'Truck',
    features: [
      'Multi-Godown & Multi-Location Stock Transfer',
      'Batch Number, Expiry Date & FIFO/LIFO Tracking',
      'Customer Credit Limit & Outstanding Balance Locking',
      'Field Sales Order Booking Mobile Portal',
      'Automated E-Way Bill & E-Invoicing Generation'
    ],
    benefits: [
      'Real-time visibility across all warehouses and transit stock',
      'Prevents bad debt through proactive credit ceiling locks',
      'Accelerates order fulfillment dispatch cycles'
    ],
    technologies: ['PostgreSQL', '.NET Core', 'Redis', 'Docker', 'React Native'],
    compliance: 'E-Way Bill / E-Invoice Government API Integration',
    demoAvailable: true,
    model3DId: 'cloud-cluster',
    featured: true
  },
  {
    id: 'sol-hotel-restaurant',
    title: 'Hotel & Restaurant Management ERP',
    shortDesc: 'Integrated room reservation, Kitchen Order Ticket (KOT), Table POS, banquet billing, and guest CRM.',
    fullDesc: 'A comprehensive hospitality software suite handling front-desk check-in/out, contactless digital QR menus, table management, Kitchen Display Systems (KDS), room service charging, banquet event booking, and housekeeping task boards.',
    industry: 'Hospitality & Restaurants',
    iconName: 'UtensilsCrossed',
    features: [
      'Front-Desk Guest Check-in, Check-out & Room Status',
      'Table Billing & Wireless Kitchen Order Ticket (KOT)',
      'Digital QR Code Menu & Online Ordering',
      'Banquet & Conference Hall Booking Manager',
      'Recipe Costing & Kitchen Raw Material Inventory'
    ],
    benefits: [
      'Eliminates order miscommunication between servers and chefs',
      'Maximizes room occupancy with channel manager integration',
      'Automated daily night audit and revenue reports'
    ],
    technologies: ['Node.js', 'React', 'PostgreSQL', 'WebSockets', 'Tailwind'],
    compliance: 'PCI-DSS Compliant & GST Compliant',
    demoAvailable: true,
    model3DId: 'cloud-cluster',
    featured: true
  },
  {
    id: 'sol-hospital-pharmacy',
    title: 'Hospital & Pharmacy Management System',
    shortDesc: 'Complete Clinical EHR, OPD/IPD billing, bed allocation, lab reports, and integrated pharmacy inventory.',
    fullDesc: 'An integrated healthcare information system (HMIS) designed for hospitals, clinics, diagnostic centers, and pharmacies. Streamlines patient registrations, doctor consultations, electronic health records, nursing station charting, and medicine batch expiry tracking.',
    industry: 'Healthcare & Pharmaceuticals',
    iconName: 'Stethoscope',
    features: [
      'OPD / IPD Patient Registration & Bed Management',
      'Electronic Health Records (EHR) & Diagnostic Lab Test Reports',
      'Pharmacy POS with Scheduled Drug & Expiry Tracking',
      'Doctor Consultation Schedule & Token Display Screen',
      'Insurance / TPA Claim Billing & Audit'
    ],
    benefits: [
      'Fast and paperless clinical documentation',
      'Zero expired medicine sales with automated warning triggers',
      'Strict adherence to patient privacy standards'
    ],
    technologies: ['React', 'Python FastAPI', 'PostgreSQL', 'WebRTC', 'Docker'],
    compliance: 'HIPAA Compliant & ISO Medical Standards',
    demoAvailable: true,
    model3DId: 'ai-neural',
    featured: true
  },
  {
    id: 'sol-school-erp',
    title: 'School & College Management ERP',
    shortDesc: 'Student admissions, fee collection with online gateway, timetable scheduling, exams/grading, and parent app.',
    fullDesc: 'A complete academic automation platform for schools, colleges, and coaching institutes. Empowers administrators, teachers, parents, and students with transparent fee tracking, automated attendance, homework submission, digital report cards, and GPS bus tracking.',
    industry: 'Education & Academics',
    iconName: 'GraduationCap',
    features: [
      'Online Student Admission & Document Verification',
      'Fee Collection, Fine Calculation & Online Payment Gateway',
      'Examination Marks Entry & Automated Report Card Generator',
      'Teacher Timetable & Staff Payroll Management',
      'Parent Mobile App for Homework, Attendance & Notices'
    ],
    benefits: [
      '100% transparent fee accounting with instant SMS receipts',
      'Saves over 80 hours per semester on exam report generation',
      'Strengthens parent-teacher communication'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Flutter', 'AWS S3'],
    compliance: 'Academic Board Standard Compliance',
    demoAvailable: true,
    model3DId: 'mobile-node',
    featured: false
  },
  {
    id: 'sol-real-estate',
    title: 'Real Estate & Property Management ERP',
    shortDesc: 'Lead pipeline management, property inventory, payment milestone schedules, construction progress, and legal documentation.',
    fullDesc: 'Engineered for real estate builders, developers, and property leasing agencies. Manage buyer inquiries from multiple channels, block/book units with interactive floor plans, schedule construction-linked payment demands, and generate legal deed templates.',
    industry: 'Real Estate & Construction',
    iconName: 'Building2',
    features: [
      'Visual Unit Availability & Master Layout Booking Map',
      'Construction Milestone Payment Demand Letters',
      'Omnichannel Real Estate Lead Pipeline & Agent Commission',
      'Tenant Lease Agreements & Maintenance Billing',
      'Contractor & Material Procurement Tracking'
    ],
    benefits: [
      'Accurate cash flow forecasting across multi-phase projects',
      'Prevents double-booking of plots or apartments',
      'Automated milestone notifications to buyers'
    ],
    technologies: ['.NET Core', 'React', 'SQL Server', 'Azure', 'Tailwind'],
    compliance: 'RERA Ready Standards',
    demoAvailable: true,
    model3DId: 'erp-core',
    featured: false
  },
  {
    id: 'sol-gst-accounting',
    title: 'GST Billing & Financial Accounting',
    shortDesc: 'Reliable financial software featuring multi-currency ledgers, GST Return GSTR-1/3B filing, and balance sheet reporting.',
    fullDesc: 'Our flagship accounting engine tailored for Indian and international taxation. Generates audit-ready financial statements, bank reconciliations, cash-flow forecasts, and seamless export to Excel/PDF with 100% tax accuracy.',
    industry: 'Financial & Accounting',
    iconName: 'Calculator',
    features: [
      'Automated GSTR-1, GSTR-2A, GSTR-3B & GSTR-9 Ready Reports',
      'General Ledger, Trial Balance, Profit & Loss and Balance Sheet',
      'Multi-Bank Account Reconciliations with Statement Import',
      'Automated E-Invoicing & QR Code generation',
      'Comprehensive User Permission Roles & Audit Log Trail'
    ],
    benefits: [
      'Audit-proof accounts with one-click CA/Auditor export',
      'Guaranteed 24-hour support SLA and 6 months free warranty',
      'Runs lightning fast on standard desktop hardware'
    ],
    technologies: ['C# .NET', 'SQL Server', 'WPF', 'Crystal Reports', 'Secure Vault'],
    compliance: 'GST Act 2017 & International Accounting Standards',
    demoAvailable: true,
    model3DId: 'erp-core',
    featured: false
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter Business',
    tagline: 'Ideal for small retail, boutique businesses, and growing startups launching their first digital systems.',
    price: '$499',
    period: 'one-time setup / or from $49/mo',
    popular: false,
    deliverables: [
      'Single-Store Desktop POS or Responsive Web Presence',
      'Core Inventory & Billing Engine',
      'Standard Tax & Invoice Templates',
      'Barcode Scanner & Thermal Printer Setup',
      'Local Backup & Data Export',
      '3 Months Complimentary Technical Support'
    ],
    features: [
      { name: 'Core Billing & POS Engine', included: true },
      { name: 'Inventory Stock Management', included: true },
      { name: 'Customer Database & History', included: true },
      { name: 'GST / Tax Invoicing Compliance', included: true },
      { name: 'Multi-Branch Synchronization', included: false },
      { name: 'Custom ERP Module Development', included: false },
      { name: 'Dedicated Account Manager', included: false },
      { name: '24/7 Priority Phone Support', included: false }
    ],
    supportLevel: 'Email & Remote Desk (Business Hours)',
    idealFor: 'Single retail stores, clinics, boutique agencies'
  },
  {
    id: 'plan-professional',
    name: 'Professional Suite',
    tagline: 'Our most popular package for mid-sized enterprises requiring multi-location synchronization and web apps.',
    price: '$1,299',
    period: 'one-time setup / or from $119/mo',
    popular: true,
    deliverables: [
      'Multi-Location ERP / Custom Full-Stack Web App',
      'Real-Time Cloud Database & Multi-User Roles',
      'Customer Loyalty, SMS & WhatsApp Integrations',
      'Automated E-Invoicing & Financial Ledger Reports',
      'API Integration for Payment Gateways & Logistics',
      '6 Months Complimentary Technical Support SLA'
    ],
    features: [
      { name: 'Core Billing & POS Engine', included: true },
      { name: 'Inventory Stock Management', included: true },
      { name: 'Customer Database & History', included: true },
      { name: 'GST / Tax Invoicing Compliance', included: true },
      { name: 'Multi-Branch Synchronization', included: true },
      { name: 'Custom ERP Module Development', included: true },
      { name: 'Dedicated Account Manager', included: true },
      { name: '24/7 Priority Phone Support', included: false }
    ],
    supportLevel: 'Priority 24-Hour Response SLA + Remote Support',
    idealFor: 'Wholesalers, growing retail chains, hotels, SaaS businesses'
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Custom',
    tagline: 'Complete bespoke software architecture, mobile applications, cloud infrastructure, and 24/7 SLA guarantees.',
    price: 'Custom',
    period: 'tailored milestone roadmap',
    popular: false,
    deliverables: [
      'Bespoke Enterprise Software / Mobile App (iOS & Android)',
      'High-Availability Cloud Architecture & Microservices',
      '100% Intellectual Property (IP) & Source Code Transfer',
      'Comprehensive Security Audits & Penetration Testing',
      'Custom ERP/CRM/FinTech Integrations & Data Migration',
      '1 Year Dedicated 24/7 Support with Guaranteed 1-Hour SLA'
    ],
    features: [
      { name: 'Core Billing & POS Engine', included: true },
      { name: 'Inventory Stock Management', included: true },
      { name: 'Customer Database & History', included: true },
      { name: 'GST / Tax Invoicing Compliance', included: true },
      { name: 'Multi-Branch Synchronization', included: true },
      { name: 'Custom ERP Module Development', included: true },
      { name: 'Dedicated Account Manager', included: true },
      { name: '24/7 Priority Phone Support', included: true }
    ],
    supportLevel: 'Dedicated 24/7 Engineering Hotline & 1-Hour SLA',
    idealFor: 'Large manufacturers, healthcare networks, financial institutions'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-software-dev',
    name: 'Software Development Team',
    role: 'Custom Software, ERP & Accounting Solutions',
    department: 'Software Engineering Division',
    bio: 'Specialized in developing custom software solutions, enterprise ERP, retail point-of-sale (POS) systems, and multi-location inventory platforms built with .NET, SQL Server, and modern full-stack architectures.',
    iconName: 'Code2',
    initials: 'SD',
    skills: ['Custom Software Development', 'Enterprise ERP Systems', 'Retail POS & Billing', 'SQL Server Database Architecture', 'C# .NET', 'System Integration']
  },
  {
    id: 'tm-web-dev',
    name: 'Web Design & Development Team',
    role: 'Full-Stack Web Portals & E-Commerce Solutions',
    department: 'Web Engineering Division',
    bio: 'Professional web engineers and designers creating responsive, high-performance websites, custom web applications, e-commerce platforms, and user experiences tailored to client business requirements.',
    iconName: 'Globe',
    initials: 'WD',
    skills: ['Website Design & UI/UX', 'Full-Stack Web Development', 'E-Commerce Platforms', 'React & TypeScript', 'Responsive Layouts', 'RESTful APIs']
  },
  {
    id: 'tm-mobile-dev',
    name: 'Mobile Application Development Team',
    role: 'Android & iOS Application Engineering',
    department: 'Mobile Engineering Division',
    bio: 'Dedicated mobile software engineers delivering intuitive, high-performance mobile applications for Android and iOS devices to help businesses expand their digital and mobile footprint.',
    iconName: 'Smartphone',
    initials: 'MD',
    skills: ['Android App Development', 'iOS App Development', 'Cross-Platform Frameworks', 'Mobile UI Design', 'API Integration', 'Mobile App Security']
  },
  {
    id: 'tm-digital-marketing',
    name: 'Digital Marketing & SEO Team',
    role: 'Search Engine Optimization & Growth Strategy',
    department: 'Digital Marketing Division',
    bio: 'Certified digital marketing and SEO specialists focused on search engine visibility, organic keyword rankings, social media marketing campaigns, and measurable online brand growth.',
    iconName: 'TrendingUp',
    initials: 'DM',
    skills: ['Search Engine Optimization (SEO)', 'Digital Marketing Campaigns', 'Social Media Strategy', 'Online Brand Promotion', 'Analytics & Growth Reporting']
  },
  {
    id: 'tm-tech-support',
    name: 'Technical Support & Client Service Team',
    role: '24/7 Technical Support & Maintenance',
    department: 'Client Operations & Support',
    bio: 'Dedicated technical support specialists providing reliable client assistance, remote troubleshooting, system maintenance, software updates, and post-deployment warranty support with rapid response SLAs.',
    iconName: 'Headphones',
    initials: 'TS',
    skills: ['24/7 Technical Support', 'System Troubleshooting', 'Remote Desktop Assistance', 'Software Maintenance', 'SLA Management']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Enterprise ERP Modernization: Migrating from Legacy Spreadsheets to Cloud Systems',
    slug: 'enterprise-erp-modernization-guide',
    excerpt: 'Discover the step-by-step roadmap to eliminating inventory discrepancies and manual bottlenecks with modern modular ERP architecture.',
    content: `Modern enterprises can no longer afford to operate on fragmented spreadsheets and outdated desktop silos. In this comprehensive guide, we dissect the core methodologies for consolidating multi-branch inventory, real-time billing, and automated tax compliance into a unified cloud-enabled ERP system.\n\n### Key Architectural Takeaways:\n1. **Modular Domain Segregation**: Separate accounting, inventory, and point-of-sale into distinct services to avoid systemic bottlenecks.\n2. **Real-time Telemetry**: Implement barcode and batch tracking to achieve over 99.8% inventory accuracy.\n3. **Audit-Ready Compliance**: Automate tax reporting and e-invoicing at the point of sale.`,
    author: 'Global InfoSofts Engineering Team',
    authorRole: 'Enterprise Software Division',
    authorAvatar: '',
    date: 'August 24, 2026',
    readTime: '6 min read',
    category: 'Enterprise Software',
    tags: ['ERP', 'Cloud Migration', 'Software Architecture', 'Inventory'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-2',
    title: 'Architecting Sub-Second Web Applications with React 19 and Modern Cloud Backends',
    slug: 'sub-second-web-applications-react-19',
    excerpt: 'How we engineer ultra-responsive SaaS platforms and client portals that maintain 99+ Google Lighthouse performance scores.',
    content: `User engagement drops by over 32% for every additional second a web page takes to load. At Global InfoSofts, we follow a strict performance budget: server-rendered components, intelligent code splitting, edge caching, and optimized WebGL graphics.\n\n### Performance Principles:\n- **Zero Unnecessary Rerenders**: Use strict typing and immutable states.\n- **Asset Optimization**: Deliver next-gen WebP/AVIF imagery and inline critical CSS.\n- **Edge Network Acceleration**: Distribute static assets and API responses globally.`,
    author: 'Global InfoSofts Web Team',
    authorRole: 'Web Engineering Division',
    authorAvatar: '',
    date: 'August 18, 2026',
    readTime: '5 min read',
    category: 'Web Engineering',
    tags: ['React', 'Web Performance', 'TypeScript', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-3',
    title: 'Native vs Cross-Platform: Choosing Between Flutter, React Native, and Native Mobile',
    slug: 'native-vs-cross-platform-mobile-guide',
    excerpt: 'An objective breakdown of performance, development speed, and cost efficiency for engineering enterprise mobile apps in 2026.',
    content: `When building high-concurrency mobile applications, selecting the right framework directly impacts time-to-market and long-term maintainability. We compare Flutter, React Native, and Swift/Kotlin across rendering speed, device API access, and maintenance overhead.`,
    author: 'Global InfoSofts Mobile Team',
    authorRole: 'Mobile Engineering Division',
    authorAvatar: '',
    date: 'August 10, 2026',
    readTime: '7 min read',
    category: 'Mobile Apps',
    tags: ['Flutter', 'React Native', 'Mobile Development', 'iOS', 'Android'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
  }
];

