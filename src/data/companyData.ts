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
  name: 'Global InfoSoft',
  tagline: 'Transforming Ideas Into Intelligent Digital Realities',
  subTagline: 'Custom Software Development, Enterprise ERP, Accounting Solutions, Web & Mobile App Engineering & Digital Services in Jamshedpur.',
  foundedYear: 2014,
  yearsOfExperience: '10+',
  projectsCompleted: '350+',
  activeClients: '150+',
  uptimeSla: '99.9%',
  clientSatisfaction: '99.2%',
  contactEmail: 'kumarrajnish531@gmail.com',
  supportEmail: 'kumarrajnish531@gmail.com',
  officialEmail: 'info@globalinfosofts.com',
  primaryPhone: '+91-9431515806',
  altPhone: '+91-7654730090',
  salesPhone: '+91-9431515806',
  headOfficeAddress: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Mango, Jamshedpur 831012, Jharkhand, India',
  serviceCentres: 'Transport Nagar (Mango), Golmuri, & Sakchi, Jamshedpur',
  city: 'Jamshedpur',
  state: 'Jharkhand',
  postalCode: '831012',
  country: 'India',
  supportHours: 'Mon - Sat: 9:30 AM - 6:30 PM IST (Technical Support & Helpdesk)',
  paymentModes: 'Visa / MasterCard / RuPay, UPI / Net Banking, Cheque & Demand Draft',
  website: 'https://globalinfosofts.com',
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
    role: 'Founder & Chief Executive Officer',
    phone: '+91-9431515806',
    email: 'kumarrajnish531@gmail.com'
  },
  {
    name: 'Manoj Mahato',
    role: 'Technical Director & Lead Architect',
    phone: '+91-7654730090',
    email: 'kumarrajnish531@gmail.com'
  }
];

export const HEAD_OFFICE = {
  name: 'Global InfoSoft',
  title: 'Headquarters & Development Centre',
  address: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Mango, Jamshedpur 831012, Jharkhand',
  phone: '+91-9431515806',
  altPhone: '+91-7654730090',
  email: 'kumarrajnish531@gmail.com',
  hours: 'Mon - Sat: 9:30 AM - 6:30 PM IST'
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-software',
    title: 'Custom Software & ERP Development',
    shortDesc: 'Tailor-engineered Windows desktop & cloud software systems built for high performance, maximum security, and business automation.',
    longDesc: 'We architect bespoke desktop, web, and distributed software systems from scratch. Utilizing modern architectural patterns, .NET, and Microsoft SQL Server, our software solutions eliminate operational bottlenecks, automate business workflows, and scale seamlessly with enterprise demand.',
    iconName: 'Code2',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    duration: '4 - 8 Weeks',
    deliverables: [
      'Custom Windows Desktop Applications (.NET, C#, WPF)',
      'Enterprise Resource Planning (ERP) Modules',
      'Inventory & Point-of-Sale (POS) Integration',
      'Multi-Branch Data Synchronization & Backup',
      'Database Architecture & SQL Optimization'
    ],
    technologies: ['C# .NET', 'Microsoft SQL Server', 'WPF', 'Node.js', 'PostgreSQL', 'Python'],
    metrics: '100% Tailored to Business Workflows',
    featured: true
  },
  {
    id: 'web-development',
    title: 'Website Design & Web Application Development',
    shortDesc: 'Ultra-fast, mobile-responsive corporate websites, e-commerce stores, dynamic portals, and custom web applications.',
    longDesc: 'From institutional portals and school websites to interactive e-commerce platforms and SaaS products, our web engineering team crafts modern, SEO-friendly websites with high conversion rates, crisp UI design, and robust security.',
    iconName: 'Globe',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    duration: '2 - 6 Weeks',
    deliverables: [
      'Responsive Corporate & Business Websites',
      'School, College & Institutional Web Portals',
      'E-Commerce & Online Ordering Systems',
      'Dynamic Content Management Systems (CMS)',
      'Progressive Web Applications (PWA)'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PHP / MySQL'],
    metrics: '99.9% Mobile & Desktop Performance',
    featured: true
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Application Development',
    shortDesc: 'Native Android and iOS mobile applications designed to engage users with seamless performance and intuitive user experience.',
    longDesc: 'Deliver delightful mobile experiences tailored to your customers. We design, build, and publish high-performance mobile applications for Android and iOS devices with offline support, push notifications, payment gateway integrations, and real-time backend synchronization.',
    iconName: 'Smartphone',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    duration: '6 - 10 Weeks',
    deliverables: [
      'Native Android (Kotlin / Java) App Development',
      'Cross-Platform (Flutter & React Native) Apps',
      'B2B Field Sales & Delivery Tracking Apps',
      'Customer Loyalty & Mobile Ordering Apps',
      'Google Play Store & Apple App Store Publishing'
    ],
    technologies: ['Flutter', 'React Native', 'Kotlin', 'Firebase', 'REST APIs'],
    metrics: 'Native Speed & Fluid Touch UI',
    featured: true
  },
  {
    id: 'accounting-pos',
    title: 'GST Billing, POS & Accounting Software',
    shortDesc: 'Specialized accounting solutions for retail, wholesale, optical stores, textiles, hotels, and manufacturing businesses.',
    longDesc: 'Equipped with native Windows integration, real-time GST invoicing (GSTR-1, 3B), barcode printing & scanning, customer ledgers, and inventory tracking. Includes 6 months of dedicated complimentary technical support and 24-hour response SLAs.',
    iconName: 'Calculator',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    duration: '2 - 4 Weeks',
    deliverables: [
      'GST Billing & Tax Invoice Generation (GSTR-1/3B)',
      'Barcode Printing & Point-of-Sale (POS) Scanning',
      'Customer & Vendor Financial Ledgers with Balance Sheet',
      'Multi-Godown & Batch Expiry Inventory Control',
      'WhatsApp & SMS Invoice Dispatch'
    ],
    technologies: ['Microsoft .NET', 'SQL Server', 'Crystal Reports', 'C#', 'Thermal Print API'],
    metrics: '100% Tax & GST Compliance',
    featured: true
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Search Engine Optimization (SEO)',
    shortDesc: 'Data-driven growth strategies, local Google business optimization in Jamshedpur & PAN India, and social media campaigns.',
    longDesc: 'Propel your brand to the top of Google search rankings. We build holistic digital marketing strategies including on-page and technical SEO, local Google Maps business ranking, Google Ads pay-per-click management, and engaging social media marketing campaigns.',
    iconName: 'TrendingUp',
    category: 'marketing',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
    duration: 'Ongoing Monthly Growth',
    deliverables: [
      'Local SEO & Google Business Profile Ranking',
      'On-Page & Technical Search Engine Optimization',
      'Google Ads & Meta Advertising Campaigns',
      'Social Media Brand Management & Content',
      'Website Conversion & Traffic Analytics'
    ],
    technologies: ['Google Search Console', 'Google Analytics 4', 'SEMrush', 'Meta Ads Manager'],
    metrics: 'Top Local Search Visibility',
    featured: true
  },
  {
    id: 'hosting-support',
    title: 'Domain, Cloud Hosting & 24/7 Technical Support',
    shortDesc: 'Reliable domain registration, secure cloud server hosting, business email setup, and ongoing software maintenance.',
    longDesc: 'Keep your digital infrastructure running without downtime. We provide complete domain registration, SSL certificates, high-speed cloud hosting, business email servers, remote desktop support (AnyDesk/TeamViewer), and ongoing maintenance packages.',
    iconName: 'Headphones',
    category: 'cloud',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    duration: 'Same-Day Provisioning',
    deliverables: [
      'Domain Name Registration (.com, .in, .org, .co.in)',
      'High-Speed SSD Web & Database Hosting',
      'Custom Business Email (Google Workspace / cPanel)',
      'Remote Desktop Support & Quick Troubleshooting',
      'Regular Database Backup & Security Patches'
    ],
    technologies: ['Cloud Linux', 'cPanel', 'SSL/TLS', 'AnyDesk', 'AWS / DigitalOcean'],
    metrics: '24-Hour Guaranteed Support Turnaround',
    featured: false
  }
];

export const SOLUTIONS_DATA: SoftwareSolution[] = [
  {
    id: 'sol-retail-pos',
    title: 'Retail POS & Billing Software',
    shortDesc: 'Complete Point of Sale, Barcode Scanning, Multi-Counter Billing, and Inventory Management for retail outlets and supermarkets.',
    fullDesc: 'A lightning-fast billing and point-of-sale software engineered for high-volume retail stores, supermarkets, garment shops, and provision stores. Features instant barcode generation, touch POS counters, customer loyalty rewards, split payments, and real-time inventory management.',
    industry: 'Retail, Supermarkets & Garments',
    iconName: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=1200&q=80',
    duration: 'Ready to Deploy / 1 Week Setup',
    features: [
      'Touch POS & Rapid Barcode Checkout (<3 sec billing)',
      'Multi-Counter & Cash Drawer Management',
      'Inventory Stock Alerts & Automatic Reordering',
      'Customer Loyalty Points & WhatsApp Invoicing',
      'Comprehensive GST / VAT Tax Compliance'
    ],
    benefits: [
      'Reduces checkout queue times by over 60%',
      'Eliminates stock mismatch and manual billing errors',
      'Multi-counter real-time centralized ledger dashboard'
    ],
    technologies: ['C# .NET', 'Microsoft SQL Server', 'WPF', 'SQLite Sync', 'Thermal Print API'],
    compliance: 'GST Ready / Standard Tax Compliance',
    demoAvailable: true,
    model3DId: 'erp-core',
    featured: true
  },
  {
    id: 'sol-optical-erp',
    title: 'Optical Store Management Software',
    shortDesc: 'Specialized optical retail and eye clinic software managing lens prescriptions, frame barcode inventory, and doctor appointments.',
    fullDesc: 'Tailor-made specifically for optical stores, opticians, and vision clinics. Tracks detailed eye power prescriptions (Spherical, Cylindrical, Axis, Addition), frame barcode tagging, lens laboratory order job cards, doctor consultation schedules, and customer delivery notifications.',
    industry: 'Healthcare & Optical Retail',
    iconName: 'Glasses',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80',
    duration: 'Ready to Deploy / Custom Matrix',
    features: [
      'Complete Eye Prescription & Power Matrix Record',
      'Lens Lab Job-Card Generation & Delivery Tracking',
      'Frame & Sunglass Barcode Serial Numbering',
      'Optometrist & Doctor Appointment Scheduler',
      'Automated SMS & WhatsApp Status Updates to Patients'
    ],
    benefits: [
      'Zero prescription transcription errors',
      'Smooth workflow between showroom counter and optical workshop',
      'Enhanced customer retention through automated eye exam reminders'
    ],
    technologies: ['.NET Core', 'SQL Server', 'Crystal Reports', 'Twilio SMS'],
    compliance: 'Healthcare Data Privacy & GST Compliance',
    demoAvailable: true,
    model3DId: 'erp-core',
    featured: true
  },
  {
    id: 'sol-school-erp',
    title: 'School & College Management ERP',
    shortDesc: 'Student admissions, fee collection with instant receipts, timetable scheduling, exams/report cards, and parent SMS alerts.',
    fullDesc: 'A complete academic automation platform for schools, colleges, and coaching institutes. Empowers administrators, teachers, parents, and students with transparent fee tracking, automated attendance, homework submission, digital report cards, and SMS broadcast notifications.',
    industry: 'Education, Schools & Colleges',
    iconName: 'GraduationCap',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    duration: '2 - 4 Weeks Setup & Data Onboarding',
    features: [
      'Student Admission & Document Verification System',
      'Fee Collection, Fine Calculation & Online/Cash Receipts',
      'Examination Marks Entry & Automated Report Card Generator',
      'Teacher Timetable & Staff Payroll Management',
      'Parent SMS & WhatsApp Notification Gateway'
    ],
    benefits: [
      '100% transparent fee accounting with instant parent SMS receipts',
      'Saves hours of administrative manual work on exam report cards',
      'Strengthens institution-parent communication'
    ],
    technologies: ['React', 'Node.js', 'SQL Server / PostgreSQL', 'SMS Gateway'],
    compliance: 'Academic Board Standard Compliant',
    demoAvailable: true,
    model3DId: 'mobile-node',
    featured: true
  },
  {
    id: 'sol-wholesale-erp',
    title: 'Wholesale & Distribution ERP',
    shortDesc: 'End-to-end B2B supply chain, multi-warehouse inventory, customer credit limits, and dispatch route billing.',
    fullDesc: 'Engineered for wholesale traders, distributors, and supply chain operators. Manage bulk pricing tiers, distributor credit terms, multi-godown stock transfers, batch/expiry tracking, and field sales agent order booking with instant ledger sync.',
    industry: 'Wholesale, Trading & Distribution',
    iconName: 'Truck',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    duration: '3 - 6 Weeks Multi-Warehouse Onboarding',
    features: [
      'Multi-Godown & Multi-Location Stock Transfer',
      'Batch Number, Expiry Date & FIFO/LIFO Tracking',
      'Customer Credit Limit & Outstanding Balance Locking',
      'Field Sales Order Booking Mobile Portal',
      'Automated E-Way Bill & E-Invoicing Generation'
    ],
    benefits: [
      'Real-time visibility across all warehouses and godowns',
      'Prevents bad debt through proactive credit ceiling locks',
      'Accelerates order fulfillment dispatch cycles'
    ],
    technologies: ['Microsoft SQL Server', '.NET Core', 'C#', 'React'],
    compliance: 'E-Way Bill / GST Compliant',
    demoAvailable: true,
    model3DId: 'cloud-cluster',
    featured: true
  },
  {
    id: 'sol-hotel-restaurant',
    title: 'Hotel & Restaurant Management Software',
    shortDesc: 'Integrated room reservation, Kitchen Order Ticket (KOT), Table POS billing, banquet bookings, and guest CRM.',
    fullDesc: 'A comprehensive Hotel software suite handling front-desk check-in/out, table management, Kitchen Display/KOT printing, room service charging, banquet event booking, and food raw material inventory tracking.',
    industry: 'Hotel, Hotels & Restaurants',
    iconName: 'UtensilsCrossed',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    duration: '1 - 2 Weeks Turnkey Setup',
    features: [
      'Front-Desk Guest Check-in, Check-out & Room Status',
      'Table Billing & Wireless Kitchen Order Ticket (KOT)',
      'Digital Menu & Table Reservation Manager',
      'Banquet & Party Hall Booking Manager',
      'Recipe Costing & Kitchen Raw Material Inventory'
    ],
    benefits: [
      'Eliminates order miscommunication between servers and kitchen',
      'Maximizes room occupancy with transparent booking calendar',
      'Automated daily sales and revenue settlement reports'
    ],
    technologies: ['C# .NET', 'SQL Server', 'Thermal Printer Integration'],
    compliance: 'GST Compliant',
    demoAvailable: true,
    model3DId: 'cloud-cluster',
    featured: false
  },
  {
    id: 'sol-pharmacy-clinic',
    title: 'Pharmacy & Clinic Management System',
    shortDesc: 'Medicine batch inventory, expiry alerts, doctor prescription billing, and OPD patient records.',
    fullDesc: 'An integrated pharmacy and clinic software designed for medical stores, diagnostic centers, and clinics. Streamlines patient registrations, doctor consultations, electronic health records, medicine batch expiry tracking, and scheduled drug compliance.',
    industry: 'Healthcare, Pharmacies & Clinics',
    iconName: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
    duration: '1 - 2 Weeks Turnkey Setup',
    features: [
      'Medicine Batch Number, Rack Number & Expiry Tracking',
      'Doctor Prescription Billing & Patient History',
      'Scheduled Drug Register & Government Compliance',
      'Doctor Consultation Schedule & OPD Token Display',
      'Fast Barcode Billing with Substitute Medicine Search'
    ],
    benefits: [
      'Zero expired medicine sales with automated warning triggers',
      'Fast, error-free prescription billing with rack locator',
      'Accurate tax invoices and daily sales reports'
    ],
    technologies: ['Microsoft .NET', 'SQL Server', 'WPF'],
    compliance: 'Drug & Cosmetics Act / GST Ready',
    demoAvailable: true,
    model3DId: 'ai-neural',
    featured: false
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-retail-chain',
    title: 'Multi-Counter Retail POS & Inventory System',
    client: 'Apex Retail & Supermarket Chain',
    industry: 'Retail & Consumer Goods',
    category: 'Custom Software & POS',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80',
    summary: 'Deployed an integrated Point of Sale, Barcode Scanning, and multi-counter inventory system across high-volume retail outlets with zero checkout delays.',
    challenge: 'Long customer billing queues, inventory mismatch between counter and stock room, and lack of real-time GST tax reporting.',
    solution: 'Engineered a high-speed .NET and SQL Server desktop POS system with sub-3-second barcode scanning, automatic purchase orders, and daily WhatsApp sales summaries.',
    results: [
      { label: 'Billing Speed', value: '<3 Seconds' },
      { label: 'Inventory Discrepancy', value: '0%' },
      { label: 'Customer Queue Time', value: '-65%' },
      { label: 'GST Accuracy', value: '100%' }
    ],
    technologies: ['C# .NET', 'SQL Server', 'WPF', 'Thermal Print API'],
    duration: '6 Weeks',
    featured: true
  },
  {
    id: 'case-optical-store',
    title: 'Optical Store Prescription & Frame Inventory ERP',
    client: 'Vision Care Optical Network',
    industry: 'Healthcare & Optical Retail',
    category: 'Specialized ERP',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80',
    summary: 'Implemented a dedicated optical store management software managing complex lens power matrices, frame barcode serials, and lens workshop job cards.',
    challenge: 'Manual paper-based prescription records caused job-card errors with optical lens laboratories and missed customer delivery deadlines.',
    solution: 'Built a specialized Optical ERP recording complete sphere, cylinder, axis, and bifocal power matrices with automated SMS alerts when glasses are ready for pickup.',
    results: [
      { label: 'Prescription Accuracy', value: '100%' },
      { label: 'Workshop Turnaround', value: '2.5x Faster' },
      { label: 'Repeat Customer Rate', value: '+38%' },
      { label: 'Support Warranty', value: '6 Months Incl.' }
    ],
    technologies: ['.NET Core', 'SQL Server', 'Crystal Reports', 'Twilio SMS'],
    duration: '4 Weeks',
    featured: true
  },
  {
    id: 'case-school-erp',
    title: 'School Fee & Academic Automation ERP',
    client: 'St. Xavier Modern Academy',
    industry: 'Education & Academics',
    category: 'Web Application & ERP',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Automated fee collection, student report card generation, attendance tracking, and parent SMS broadcasts for a large private school.',
    challenge: 'Manual fee register maintenance led to receipt delays, uncollected student dues, and weeks spent compiling end-of-term examination marksheets.',
    solution: 'Designed and deployed a responsive School ERP with multi-counter fee collection, SMS receipt dispatch, and automated academic report card generators.',
    results: [
      { label: 'Fee Collection Time', value: '-75%' },
      { label: 'Parent SMS Receipts', value: 'Instant' },
      { label: 'Report Card Prep', value: '1-Click' },
      { label: 'Data Security', value: 'Encrypted Cloud' }
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'SMS Gateway'],
    duration: '8 Weeks',
    featured: true
  },
  {
    id: 'case-wholesale-distributor',
    title: 'FMCG Wholesale Supply Chain & Godown ERP',
    client: 'National FMCG Distributors',
    industry: 'Wholesale & Logistics',
    category: 'Enterprise Software',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Centralized multi-godown stock transfers, batch-expiry tracking, dealer credit limits, and automated E-Way Bill generation for a large distributor.',
    challenge: 'Excess inventory holding costs, stock expiry losses, and uncontrolled dealer credit balances across multiple regional godowns.',
    solution: 'Deployed a comprehensive Wholesale ERP featuring batch-level FIFO inventory, automatic customer credit locks, and integrated GST tax filing.',
    results: [
      { label: 'Stock Expiry Losses', value: '-90%' },
      { label: 'Dispatch Speed', value: '2x Faster' },
      { label: 'E-Way Bill Generation', value: 'Automated' },
      { label: 'Annual Cost Savings', value: 'Significant' }
    ],
    technologies: ['Microsoft SQL Server', '.NET Core', 'C#', 'React'],
    duration: '10 Weeks',
    featured: true
  }
];

export const TECHNOLOGIES_DATA: Technology[] = [
  { name: 'Microsoft .NET & C#', category: 'Backend', icon: 'Cpu', experienceYears: 10, level: 'Master', description: 'Enterprise desktop software, Windows POS utilities, and robust business logic.' },
  { name: 'Microsoft SQL Server', category: 'Database', icon: 'Table', experienceYears: 10, level: 'Master', description: 'High-reliability relational database, stored procedures, and audit analytics.' },
  { name: 'React & Next.js', category: 'Frontend', icon: 'Atom', experienceYears: 8, level: 'Expert', description: 'Responsive web portals, interactive dashboards, and modern UI systems.' },
  { name: 'TypeScript & JavaScript', category: 'Frontend', icon: 'FileCode2', experienceYears: 8, level: 'Expert', description: 'Clean, type-safe architecture for web and mobile frontends.' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'Palette', experienceYears: 6, level: 'Expert', description: 'Modern responsive utility designs, light/dark themes, and micro-interactions.' },
  { name: 'Node.js & Express', category: 'Backend', icon: 'Server', experienceYears: 8, level: 'Expert', description: 'Fast asynchronous APIs, payment webhooks, and real-time backend services.' },
  { name: 'Flutter & Dart', category: 'Mobile', icon: 'Smartphone', experienceYears: 6, level: 'Expert', description: 'Cross-platform Android and iOS mobile applications from a single codebase.' },
  { name: 'PostgreSQL & MySQL', category: 'Database', icon: 'Database', experienceYears: 9, level: 'Expert', description: 'Relational database modeling, high-speed indexing, and cloud persistence.' },
  { name: 'Cloud Hosting & DevOps', category: 'Cloud & DevOps', icon: 'Cloud', experienceYears: 8, level: 'Expert', description: 'Secure cPanel, Cloud Linux, SSD servers, SSL setup, and automated daily backups.' },
  { name: 'Google SEO & Analytics', category: 'AI & Analytics', icon: 'BarChart3', experienceYears: 8, level: 'Expert', description: 'Local business SEO ranking, search console audit, and keyword growth.' }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Requirement Gathering & Consultation',
    subtitle: 'Understanding your specific business workflows and goals',
    description: 'We meet with you (in-person in Jamshedpur or via video call) to study your exact business requirements, current challenges, and functional needs.',
    deliverables: ['Requirement Specification', 'Scope of Work', 'Project Milestone Timeline', 'Fixed Cost Estimate'],
    timeline: 'Day 1 - 3',
    icon: 'Search'
  },
  {
    stepNumber: '02',
    title: 'UI/UX Design & Architecture Planning',
    subtitle: 'Visual layouts and database architecture design',
    description: 'Our designers and software architects map out the database schemas, user interfaces, and workflow wireframes tailored specifically for your business.',
    deliverables: ['Database Schema Plan', 'UI Mockups & Prototypes', 'Workflow Architecture', 'Client Approval'],
    timeline: 'Week 1',
    icon: 'Layout'
  },
  {
    stepNumber: '03',
    title: 'Software Development & Agile Sprints',
    subtitle: 'Clean, robust coding with strict quality standards',
    description: 'We develop your custom software, website, or mobile application with structured modules, efficient database queries, and clean code.',
    deliverables: ['Core Module Releases', 'Progress Demonstrations', 'Database Integration', 'Security Configuration'],
    timeline: 'Week 2 - 6',
    icon: 'Cpu'
  },
  {
    stepNumber: '04',
    title: 'Testing, Quality Assurance & Data Migration',
    subtitle: 'Thorough testing on real devices and local hardware',
    description: 'We test printer compatibility, barcode scanning speed, network reliability, and migrate your existing legacy data safely into the new software.',
    deliverables: ['Hardware Integration QA', 'Barcode & Printer Testing', 'Data Migration Verification', 'Performance Signoff'],
    timeline: 'Week 6 - 7',
    icon: 'ShieldCheck'
  },
  {
    stepNumber: '05',
    title: 'Deployment, Staff Training & Handover',
    subtitle: 'Smooth installation and hands-on staff training',
    description: 'We install the software on your systems, configure network databases, train your staff hands-on, and provide complete documentation.',
    deliverables: ['On-Site / Remote Installation', 'Staff Training Session', 'User Manual & Guides', '100% IP & Source Ownership'],
    timeline: 'Week 7',
    icon: 'Rocket'
  },
  {
    stepNumber: '06',
    title: '6 Months Free Support & Warranty',
    subtitle: 'Guaranteed 24-hour SLA response and remote support',
    description: 'We stand by our software with 6 months of complimentary technical support, bug fixes, remote troubleshooting (AnyDesk), and system updates.',
    deliverables: ['6 Months Complimentary Warranty', 'Guaranteed 24-Hour SLA', 'Remote Desk Support', 'Regular Database Backups'],
    timeline: '6 Months Included',
    icon: 'HeartHandshake'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-starter',
    name: 'Starter Business / Retail',
    tagline: 'Ideal for retail stores, clinics, and small businesses looking for fast billing and accounting.',
    price: '₹9,999',
    period: 'one-time setup with 6-month free support',
    popular: false,
    deliverables: [
      'Single-Store Desktop POS or Responsive Business Website',
      'Barcode Scanning & Thermal Receipt Printer Setup',
      'Customer Ledger & GST Tax Invoice Templates',
      'Inventory Stock Control & Low-Stock Alerts',
      'Automated Local Database Backup',
      '3 Months Complimentary Technical Support'
    ],
    features: [
      { name: 'Core Billing & POS Engine', included: true },
      { name: 'Inventory Stock Management', included: true },
      { name: 'Customer Database & Ledgers', included: true },
      { name: 'GST Invoicing Compliance', included: true },
      { name: 'Multi-Counter Synchronization', included: false },
      { name: 'Custom ERP Module Development', included: false },
      { name: 'Dedicated Support Desk', included: true },
      { name: '24/7 Priority Hotline', included: false }
    ],
    supportLevel: 'Remote Desk & Phone Support (Business Hours)',
    idealFor: 'Single retail stores, clinics, grocery shops, service professionals'
  },
  {
    id: 'plan-professional',
    name: 'Professional Business Suite',
    tagline: 'Our most popular package for mid-sized stores, wholesalers, schools, and multi-counter enterprises.',
    price: '₹24,999',
    period: 'one-time setup with 6-month free support',
    popular: true,
    deliverables: [
      'Multi-Counter ERP / Custom Dynamic Web Portal',
      'LAN Network Database & Multi-User Access Roles',
      'Barcode Serial Tagging & WhatsApp Invoice Dispatch',
      'Automated E-Invoicing, GSTR-1/3B & Financial Reports',
      'Comprehensive Staff Training & Data Migration',
      '6 Months Complimentary Technical Support SLA'
    ],
    features: [
      { name: 'Core Billing & POS Engine', included: true },
      { name: 'Inventory Stock Management', included: true },
      { name: 'Customer Database & Ledgers', included: true },
      { name: 'GST Invoicing Compliance', included: true },
      { name: 'Multi-Counter Synchronization', included: true },
      { name: 'Custom ERP Module Development', included: true },
      { name: 'Dedicated Support Desk', included: true },
      { name: '24/7 Priority Hotline', included: false }
    ],
    supportLevel: 'Priority 24-Hour Response SLA + Remote Support',
    idealFor: 'Wholesalers, optical chains, schools, supermarkets, hotels'
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Custom ERP & App',
    tagline: 'Complete bespoke software architecture, mobile app, cloud hosting, and priority support.',
    price: '₹49,999+',
    period: 'tailored milestone roadmap',
    popular: false,
    deliverables: [
      'Bespoke Enterprise Software & Android/iOS Mobile App',
      'Cloud Server Sync across Multiple Cities / Branches',
      '100% Intellectual Property (IP) & Source Code Transfer',
      'Advanced Security Hardening & Automated Cloud Backup',
      'Custom ERP/CRM/API Integrations & Complete Training',
      '1 Year Priority Support with Dedicated Account Manager'
    ],
    features: [
      { name: 'Core Billing & POS Engine', included: true },
      { name: 'Inventory Stock Management', included: true },
      { name: 'Customer Database & Ledgers', included: true },
      { name: 'GST Invoicing Compliance', included: true },
      { name: 'Multi-Counter Synchronization', included: true },
      { name: 'Custom ERP Module Development', included: true },
      { name: 'Dedicated Account Manager', included: true },
      { name: '24/7 Priority Hotline', included: true }
    ],
    supportLevel: 'Dedicated 24/7 Hotline & Priority Turnaround',
    idealFor: 'Large distributors, educational institutions, manufacturing factories'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Rajesh Agrawal',
    role: 'Managing Director',
    company: 'Agrawal Retail & Supermarket',
    location: 'Jamshedpur, Jharkhand',
    content: 'Global InfoSoft provided us with a fantastic multi-counter POS software. Our billing queues have dropped dramatically, barcode scanning is instantaneous, and the GST return reports save us hours of work every month.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    projectType: 'Retail POS & Multi-Counter ERP'
  },
  {
    id: 'test-2',
    author: 'Sunil Kumar',
    role: 'Director',
    company: 'Vision Care Optical Store',
    location: 'Ranchi / Jamshedpur',
    content: 'The optical store management software designed by Rajnish and his team is customized perfectly for our lens prescription workflow. Tracking frame barcodes and workshop orders is now completely seamless.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    projectType: 'Optical Store Management Software'
  },
  {
    id: 'test-3',
    author: 'Pooja Sharma',
    role: 'Principal Administrator',
    company: 'St. Xavier Academy',
    location: 'Jamshedpur, Jharkhand',
    content: 'Our school fee management and report card system built by Global InfoSoft is reliable and easy for our office staff to use. Their technical support team is always prompt whenever we need assistance.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    projectType: 'School Management ERP'
  },
  {
    id: 'test-4',
    author: 'Manoj Gupta',
    role: 'Wholesale Distributor',
    company: 'Gupta Trading & Supply Co.',
    location: 'Dhanbad / Jamshedpur',
    content: 'We manage multiple godowns with thousands of items. Global InfoSoft ERP gives us real-time stock balances, batch expiry warnings, and instant E-Way bill generation. Their 6-month free support was truly helpful.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    projectType: 'Wholesale & Inventory ERP'
  }
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General & Services',
    question: 'What IT and software services does Global InfoSoft provide?',
    answer: 'Global InfoSoft (established in 2014 in Jamshedpur) provides Custom Software Development, Website Design & Web Development, Mobile Application Development (Android & iOS), GST Billing & POS Software, Industry-specific ERP (Retail, Optical, School, Wholesale, Hotel), Digital Marketing (SEO), Domain & Cloud Web Hosting, and 24/7 Technical Maintenance Support.'
  },
  {
    id: 'faq-2',
    category: 'Support & Warranty',
    question: 'What warranty and technical support do you provide after software delivery?',
    answer: 'Every custom software package and ERP system from Global InfoSoft includes 6 Months of Free Technical Support and Warranty. We provide instant remote assistance via AnyDesk/TeamViewer and phone support with a guaranteed 24-hour turnaround.'
  },
  {
    id: 'faq-3',
    category: 'Hardware Compatibility',
    question: 'Is your billing software compatible with our existing computers, thermal printers, and barcode scanners?',
    answer: 'Yes. Our software runs on all standard Windows desktop/laptop systems (Windows 7/8/10/11) and works seamlessly with all popular USB/Ethernet thermal receipt printers (TVS, Epson, Citizen, Posiflex) and standard 1D/2D barcode scanners.'
  },
  {
    id: 'faq-4',
    category: 'Installation & Demo',
    question: 'Can we get a live demonstration or trial before placing an order?',
    answer: 'Yes, absolutely! We offer free live demonstrations of our software either in-person at your business premises in Jamshedpur/Jharkhand or via online remote screen sharing.'
  },
  {
    id: 'faq-5',
    category: 'GST & Updates',
    question: 'Does the software support GST invoice formats and tax returns?',
    answer: 'Yes. All our billing and accounting software packages are 100% GST-ready. They generate GST-compliant tax invoices, calculate CGST/SGST/IGST automatically, and export audit-ready reports for GSTR-1, GSTR-3B, and accountant review.'
  },
  {
    id: 'faq-6',
    category: 'IP & Ownership',
    question: 'Who owns the data and intellectual property of custom projects?',
    answer: 'You have 100% full ownership of your data and software. Your business database resides securely on your designated local machine or private cloud server with automatic encrypted backups.'
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: 'Jamshedpur (Head Office)',
    country: 'Jharkhand, India',
    address: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Mango, Jamshedpur 831012',
    phone: '+91-9431515806',
    email: 'kumarrajnish531@gmail.com',
    hours: 'Mon - Sat: 9:30 AM - 6:30 PM IST',
    isHQ: true
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-rajnish',
    name: 'Rajnish Kumar',
    role: 'Founder & Chief Executive Officer',
    department: 'Executive Leadership & Software Strategy',
    bio: 'Founder of Global InfoSoft with over a decade of hands-on experience in software engineering, enterprise ERP architecture, retail point-of-sale systems, and IT consultancy across India.',
    iconName: 'Code2',
    initials: 'RK',
    skills: ['Enterprise Software Architecture', 'Business Workflow Strategy', 'Client Solutions', 'C# .NET & SQL Systems', 'IT Project Leadership']
  },
  {
    id: 'tm-software-dev',
    name: 'Software Engineering Team',
    role: 'Custom Software, ERP & Accounting Systems',
    department: 'Desktop & ERP Engineering Division',
    bio: 'Specialized in developing custom software solutions, enterprise ERP, retail point-of-sale (POS) systems, and multi-location inventory platforms built with .NET, SQL Server, and modern full-stack architectures.',
    iconName: 'Code2',
    initials: 'SE',
    skills: ['Custom Software Development', 'Enterprise ERP Systems', 'Retail POS & Billing', 'SQL Server Database Architecture', 'C# .NET', 'GST Invoicing Engine']
  },
  {
    id: 'tm-web-dev',
    name: 'Web Design & Development Team',
    role: 'Full-Stack Web Portals & E-Commerce Solutions',
    department: 'Web Engineering Division',
    bio: 'Professional web engineers and UI designers creating responsive, high-performance websites, institutional portals, e-commerce platforms, and user interfaces tailored to client business requirements.',
    iconName: 'Globe',
    initials: 'WD',
    skills: ['Website Design & UI/UX', 'Full-Stack Web Development', 'E-Commerce Platforms', 'React & TypeScript', 'Responsive Layouts', 'RESTful APIs']
  },
  {
    id: 'tm-mobile-dev',
    name: 'Mobile Application Team',
    role: 'Android & iOS Application Engineering',
    department: 'Mobile Engineering Division',
    bio: 'Dedicated mobile software engineers delivering intuitive, high-performance mobile applications for Android and iOS devices to help businesses expand their digital and mobile footprint.',
    iconName: 'Smartphone',
    initials: 'MD',
    skills: ['Android App Development', 'iOS App Development', 'Flutter Framework', 'Mobile UI Design', 'API Integration', 'App Security']
  },
  {
    id: 'tm-digital-marketing',
    name: 'Digital Marketing & SEO Team',
    role: 'Search Engine Optimization & Local Brand Growth',
    department: 'Digital Marketing Division',
    bio: 'Certified digital marketing and SEO specialists focused on Google search visibility, Google Business Profile ranking, social media marketing campaigns, and measurable online business growth in Jamshedpur & India.',
    iconName: 'TrendingUp',
    initials: 'DM',
    skills: ['Search Engine Optimization (SEO)', 'Local Google Business SEO', 'Digital Marketing Campaigns', 'Social Media Strategy', 'Traffic Analytics']
  },
  {
    id: 'tm-tech-support',
    name: 'Technical Support & Client Service Team',
    role: '24/7 Technical Support & Remote Maintenance',
    department: 'Client Operations & Helpdesk',
    bio: 'Dedicated technical support specialists providing reliable client assistance, remote troubleshooting (AnyDesk), system maintenance, software updates, and post-deployment warranty support with rapid response SLAs.',
    iconName: 'Headphones',
    initials: 'TS',
    skills: ['Technical Support', 'AnyDesk Remote Troubleshooting', 'Hardware Integration', 'Software Maintenance', 'SLA Management']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Retail Billing & POS Software Helps Indian Retailers Eliminate Billing Bottlenecks',
    slug: 'retail-billing-pos-software-guide',
    excerpt: 'Learn how modern point-of-sale software, rapid barcode scanning, and automated GST reporting can streamline store checkout and prevent inventory loss.',
    content: `In today's fast-paced retail market in India, businesses can no longer afford manual paper billing, stock mismatch, and delayed customer queues. A modern Point of Sale (POS) and inventory software is the backbone of successful supermarkets, garment stores, and retail outlets.

Key Advantages of Modern POS Systems:
1. Sub-3-Second Barcode Scanning: Eliminates customer waiting queues at checkout counters.
2. Real-Time Stock Tracking: Get instant alerts when products reach minimum reorder levels to avoid running out of stock.
3. Automated GST Invoicing: Generate tax-compliant invoices with CGST/SGST breakdowns and export one-click GSTR-1 reports.
4. Customer Loyalty & WhatsApp Receipts: Engage repeat buyers and send digital bills directly to customer phones.

Global InfoSoft provides tailor-made retail billing solutions with 6 months of free technical support and guaranteed 24-hour response SLAs.`,
    author: 'Rajnish Kumar',
    authorRole: 'CEO & Software Strategist',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'August 2026',
    readTime: '4 min read',
    category: 'Retail Software & POS',
    tags: ['Retail POS', 'GST Billing', 'Inventory Control', 'Barcode Scanning'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67e55722c3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-2',
    title: 'Specialized Optical Store Software: Managing Eye Power Prescriptions & Lab Job-Cards',
    slug: 'optical-store-management-software-guide',
    excerpt: 'Discover how specialized optical software simplifies lens prescription tracking, frame serial number barcodes, and optometrist appointments.',
    content: `Optical stores and eye clinics require specialized software that standard retail billing tools simply cannot handle. Tracking complex lens prescriptions (Spherical, Cylindrical, Axis, Addition for both Left and Right eyes) demands a tailor-engineered software solution.

Essential Features for Optical Stores:
- Detailed Eye Prescription Matrix for Distance and Near vision.
- Optical Workshop Job-Card Generation with lens coating and type instructions.
- Frame and Sunglass Barcode Serial Numbering.
- Automated SMS and WhatsApp updates to customers when spectacles are ready for collection.

Global InfoSoft Optical Store Management Software is built specifically for opticians and eye care clinics to ensure zero transcription errors and smooth operations.`,
    author: 'Global InfoSoft Engineering',
    authorRole: 'Software Division',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: 'July 2026',
    readTime: '5 min read',
    category: 'Healthcare & Optical',
    tags: ['Optical ERP', 'Eye Power Matrix', 'Prescription Software', 'Healthcare'],
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blog-3',
    title: 'Why Schools and Colleges Need a Dedicated Fee Management & ERP System',
    slug: 'school-fee-management-erp-benefits',
    excerpt: 'Explore how school ERP systems automate student fee collection, instant SMS receipts, examination report cards, and administrative operations.',
    content: `Managing a school or college involves hundreds of student records, periodic fee collections, fee concession categories, examination marksheets, and parent communication.

How School ERP Modernizes Academics:
1. Transparent Fee Accounting: Prevent accounting mismatches with automated receipt numbers, fine calculations, and instant parent SMS receipts.
2. One-Click Report Card Generation: Eliminate hundreds of hours of manual marksheet writing at the end of each semester.
3. Student Attendance & Notice Broadcast: Send important holiday and fee reminder notices instantly to parents.

Global InfoSoft provides easy-to-use School ERP software backed by on-site staff training and continuous technical maintenance.`,
    author: 'Global InfoSoft Team',
    authorRole: 'Academic Solutions',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    date: 'June 2026',
    readTime: '4 min read',
    category: 'Education ERP',
    tags: ['School ERP', 'Fee Management', 'Student Attendance', 'Report Cards'],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'
  }
];
