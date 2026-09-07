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
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
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
    id: 'ai-vs-human-doctor-future-medicine',
    title: 'Who Will Win the Future of Medicine: AI Doctor or Human Doctor?',
    slug: 'ai-vs-human-doctor-future-medicine',
    excerpt: 'Artificial Intelligence (AI) is making huge strides, and the world of medicine is about to change in a big way. Will AI take the place of human doctors, or will they work together to create a new paradigm of patient care?',
    content: `Artificial Intelligence (AI) is making huge strides, and the world of medicine is about to change in a big way. From deep-learning diagnostic models capable of detecting microscopic melanoma cells to autonomous surgical robotics executing sub-millimeter incisions, technology has advanced beyond simple assistance into primary clinical interpretation.

Will AI take the place of human doctors, or will they form an unbreakable partnership? The debate over synthetic precision versus human intuition is one of the most critical discussions shaping the future of global healthcare.

1. The Explosive Growth of Medical AI
In recent trials, deep convolutional neural networks (CNNs) trained on millions of clinical mammograms, retinal fundus photographs, and thoracic CT scans demonstrated diagnostic accuracy rates exceeding 94%, matching or in some cases surpassing board-certified specialists. Where a human doctor might take 20 minutes to meticulously review 500 MRI slices, an AI inference engine can highlight anomalies in less than 300 milliseconds.

2. Where AI Excels: Speed, Scale, and Fatigue-Free Analysis
Unlike human physicians who battle 24-hour emergency room shifts, sleep deprivation, and cognitive exhaustion, AI diagnostic algorithms operate with unwavering consistency. Key advantages include:
• Petabyte-Scale Pattern Recognition: Analyzing patient genetics alongside hundreds of thousands of published clinical studies simultaneously.
• Early Biomarker Detection: Spotting subtle cardiovascular changes and pre-diabetic retinal microaneurysms months before symptomatic onset.
• Instantaneous Global Tele-Triage: Providing instant, high-grade diagnostic triage to rural clinics and under-served communities lacking localized specialists.

3. The Irreplaceable Human Factor: Empathy, Intuition, and Moral Accountability
Despite breathtaking computing power, machines lack the fundamental pillars that define the healing arts:
• Empathy and Bedside Manner: Healing is deeply psychological. When delivering life-altering diagnoses, patients seek comfort, human reassurance, and compassion—qualities no synthesized voice or screen can genuinely convey.
• Navigating Ambiguity and Edge Cases: Human bodies are not uniform codebases. Multiple overlapping comorbidities, cultural preferences, and atypical presentations require holistic lateral reasoning.
• Ethical and Legal Responsibility: When an unexpected surgical complication arises, who bears the moral burden? Society demands that medical life-and-death choices reside with licensed human practitioners accountable to ethical oaths.

4. The Verdict: The Rise of Collaborative "Centaur Medicine"
The question is not whether AI will replace human doctors. As medical leaders frequently emphasize: AI will not replace doctors, but doctors who use AI will rapidly replace those who do not.

The true winner of the future is the patient. In this collaborative paradigm—often referred to as 'Centaur Healthcare'—AI acts as an omniscient digital co-pilot handling clerical burdens, cross-referencing global drug interaction databases, and highlighting radiological anomalies, allowing human doctors to do what they do best: listen, comfort, and heal.`,
    author: 'Admin',
    authorRole: 'Global InfoSoft Research & Medical AI Group',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'Mar 15, 2024',
    readTime: '6 min read',
    category: 'TECHNOLOGY',
    tags: ['AI', 'Healthcare'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    featuredQuote: 'AI will not replace human doctors, but doctors who embrace AI will inevitably replace those who do not.',
    summaryHighlights: [
      'Diagnostic AI processes thousands of high-resolution radiology scans in sub-second inference windows.',
      'Human doctors remain irreplaceable for emotional empathy, holistic patient context, and moral decision-making.',
      'The future belongs to Centaur Medicine: physicians armed with predictive machine intelligence.'
    ],
    sections: [
      {
        heading: 'The Paradigm Shift: From Supportive Software to Autonomous Triage',
        subheading: 'How neural networks transitioned from laboratory experiments to real-time clinical workflows',
        paragraphs: [
          'Over the past five years, artificial intelligence in medicine has transitioned from theoretical research to daily frontline deployment. Deep neural architectures trained on billions of clinical datapoints can now detect micro-calcifications in mammography, identify diabetic retinopathy in retinal scans, and predict patient sepsis 12 hours before physical vitals deteriorate.',
          'In intensive care units and high-volume trauma centers, AI models continuously monitor multi-lead telemetry, oxygenation curves, and arterial waveforms, alerting on-duty physicians to critical micro-variations that would evade human observation.'
        ],
        bulletPoints: [
          'High-throughput computer vision screening with >94% sensitivity across radiological imaging.',
          'Real-time automated EHR transcription reducing physician clerical burnout by up to 45%.',
          'Cross-referencing global drug interaction tables against patient genomic profiles in milliseconds.'
        ]
      },
      {
        heading: 'Where AI Excels: Processing Speed, Petabyte Scale, and Zero Cognitive Fatigue',
        subheading: 'The mechanical advantages of synthetic diagnostic intelligence',
        paragraphs: [
          'A critical challenge facing modern medicine is human cognitive capacity. A seasoned radiologist reviews tens of thousands of scans each year. Even the most dedicated clinicians experience eye strain, fatigue, and cognitive overload towards the end of exhausting 14-hour rotations.',
          'An algorithm experiences zero fatigue. Whether analyzing its first CT scan at 8:00 AM or its 10,000th at 3:00 AM, the neural network evaluates every pixel with mathematical precision. Furthermore, machine intelligence democratizes top-tier specialty knowledge, delivering diagnostic recommendations to rural health clinics where specialists are unavailable.'
        ],
        callout: 'An AI inference engine can evaluate 1,200 cross-sectional MRI slices in 280 milliseconds, highlighting suspicious micro-lesions for secondary human review.'
      },
      {
        heading: 'The Irreplaceable Human Element: Compassion, Intuition, and Moral Accountability',
        subheading: 'Why synthesized algorithms can never replace the bedside healer',
        paragraphs: [
          'Despite astonishing computation power, medicine is fundamentally an empathetic human endeavor. When a patient receives a devastating cancer diagnosis, they do not want a statistical likelihood percentage generated by an algorithm; they need a compassionate human caregiver who can hold their hand, explain difficult options, and navigate personal existential dread.',
          'Moreover, clinical diagnosis is rarely a neat mathematical problem. Patients frequently present with atypical symptoms, masked by emotional distress, social factors, or unusual genetic quirks. A seasoned clinician relies on clinical intuition—unconscious pattern synthesis honed by decades of human interaction—to sense when a patient is withholding information or when an atypical symptom warrants investigation.'
        ],
        bulletPoints: [
          'Emotional intelligence and empathy directly boost patient recovery and treatment adherence.',
          'Holistic consideration of family dynamics, spiritual beliefs, and quality-of-life preferences.',
          'Ethical and legal accountability: Life-and-death decisions must remain in human hands.'
        ]
      },
      {
        heading: 'The True Future: Centaur Healthcare (AI + Physician Partnership)',
        subheading: 'Harnessing the combined synergy of machine calculation and human wisdom',
        paragraphs: [
          'The ultimate destination is neither the robotic physician nor the tech-resistant practitioner. The real transformation lies in Centaur Healthcare—where doctors leverage intelligent AI co-pilots.',
          'By delegating administrative documentation, routine scan triaging, and drug allergy cross-referencing to verified AI pipelines, doctors reclaim hours of their day. They can return to the bedside, spend meaningful time conversing with patients, and focus on nuanced treatment planning.',
          'At Global InfoSoft, our engineering teams build compliant, high-availability healthcare architectures, offline-first clinical records, and intelligent data systems that bridge modern technology with human-centric care.'
        ]
      }
    ],
    comparisonTable: [
      {
        feature: 'Diagnostic Speed',
        aiDoctor: 'Sub-second inference across thousands of scans',
        humanDoctor: 'Minutes to hours depending on case complexity'
      },
      {
        feature: 'Pattern Consistency',
        aiDoctor: '100% consistent; zero physical fatigue',
        humanDoctor: 'Susceptible to sleep deprivation and shift fatigue'
      },
      {
        feature: 'Empathy & Bedside Manner',
        aiDoctor: 'None (synthetic language without emotional grounding)',
        humanDoctor: 'Authentic compassion, psychological comfort, and connection'
      },
      {
        feature: 'Atypical / Rare Comorbidities',
        aiDoctor: 'Constrained by distribution of training datasets',
        humanDoctor: 'Superior lateral thinking and holistic diagnostic intuition'
      },
      {
        feature: 'Legal & Moral Accountability',
        aiDoctor: 'Ambiguous; shared across software developers & vendors',
        humanDoctor: 'Clear fiduciary duty and licensed medical board accountability'
      }
    ]
  },
  {
    id: 'green-tech-sustainable-it-future',
    title: 'Green Tech & Sustainable IT: A Smarter, Greener Future',
    slug: 'green-tech-sustainable-it-future',
    titleHighlight: true,
    excerpt: 'Learn how green technology, energy-efficient data centers, and eco-friendly computing are making IT more sustainable, resilient, and cost-effective.',
    content: `As cloud computing, artificial intelligence clusters, and global enterprise networks scale at an unprecedented rate, the environmental footprint of digital infrastructure has become an urgent engineering priority. Green Technology and Sustainable IT are no longer corporate public relations buzzwords—they are essential engineering standards that drive operational cost savings, compute efficiency, and climate responsibility.

1. The Energy Demands of Modern Hyperscale Computing
Modern hyperscale data centers consume gigawatts of electrical power to keep racks of high-density GPUs and microprocessors running cool. Without intentional eco-engineering, server power draw directly inflates operating expenditures while taxing regional electrical grids.

2. Pillars of Sustainable IT Architecture:
• Advanced Immersion Liquid Cooling: Replacing noisy, power-hungry AC chiller units with dielectric liquid immersion cooling cuts data center PUE (Power Usage Effectiveness) from 1.6 down to 1.05.
• Renewable Energy Integration: Direct co-location with on-site solar arrays, wind turbines, and industrial battery energy storage systems (BESS).
• Intelligent Workload Scheduling: Moving non-critical batch computations and model training jobs dynamically to regions where wind and solar production are currently peaking.
• Circular Hardware Lifecycle: Refurbishing modular server components, reducing electronic waste (e-waste), and optimizing hardware utilization through containerized microservices.

3. The Economic Bottom Line: Going Green Saves Capital
Businesses that invest in energy-efficient infrastructure realize between 25% and 40% reduction in lifetime power and cooling utility costs. Green IT is the rare operational paradigm where ecological stewardship and financial profitability go hand in hand.`,
    author: 'Admin',
    authorRole: 'Clean Tech & Sustainable Cloud Architecture',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: 'Apr 12, 2024',
    readTime: '5 min read',
    category: 'TECHNOLOGY',
    tags: ['Green Technology', 'Sustainable IT'],
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    featuredQuote: 'Sustainable IT is not just an environmental imperative; it is the ultimate optimization of enterprise compute efficiency.',
    summaryHighlights: [
      'Liquid immersion cooling reduces data center energy consumption by up to 35%.',
      'Dynamic workload routing allows compute clusters to follow peak renewable energy cycles.',
      'Circular electronic hardware recycling lowers TCO while meeting strict ESG compliance.'
    ],
    sections: [
      {
        heading: 'The Power Dilemma: AI and Hyperscale Compute Demands',
        subheading: 'Why computing efficiency is the defining engineering challenge of our decade',
        paragraphs: [
          'With the explosive adoption of generative AI models and real-time enterprise streaming pipelines, compute racks that once pulled 5 to 10 kilowatts per cabinet are now demanding 40 to 100 kilowatts. Powering and cooling these arrays creates immense operational strain.',
          'Forward-thinking enterprises are adopting zero-emission energy contracts, investing in on-premise microgrids, and restructuring server architectures to maximize instructions executed per watt consumed.'
        ]
      },
      {
        heading: 'Core Strategies Driving Modern Sustainable IT',
        subheading: 'Practical implementation methods for green digital transformation',
        paragraphs: [
          'Sustainable computing spans hardware, software, and physical facility engineering. By optimizing software codebases to eliminate idle CPU cycles, companies directly diminish unnecessary power draw.',
          'At the infrastructure level, liquid immersion cooling eliminates energy-intensive mechanical refrigeration, running silent and operating with near-zero evaporative water loss.'
        ],
        bulletPoints: [
          'Microservice optimization: Reducing algorithmic bloat to decrease cloud CPU consumption.',
          'Dynamic power throttling and sleep states on server blades during off-peak hours.',
          'Transitioning to ARM-based energy-efficient processor architectures.'
        ]
      }
    ]
  },
  {
    id: 'auraquantic-illuminating-quantum-future',
    title: 'AuraQuantic: Illuminating the Quantum Future',
    slug: 'auraquantic-illuminating-quantum-future',
    excerpt: 'Quantum Computing: How a Technology Millions of Times Faster Than Your PC Is About to Reshape the World. Discover the future of computing with real-world enterprise applications.',
    content: `Quantum Computing represents the most profound leap in computational capability since the invention of the silicon semiconductor. By harnessing the peculiar laws of quantum mechanics—superposition, entanglement, and quantum tunneling—quantum processors process exponentially complex permutations in seconds that would take traditional supercomputers thousands of years to compute.

1. Beyond Binary: The Power of Qubits
Traditional computers operate on binary bits, which exist strictly as a 0 or a 1. A quantum bit (qubit), through quantum superposition, exists in a simultaneous probabilistic state of both 0 and 1. When multiple qubits are entangled, the computational problem space expands exponentially with each added qubit.

2. Real-World Applications Transforming Enterprise:
• Molecular Drug Discovery & Materials Science: Simulating complex protein folding and molecular bonding to discover life-saving pharmaceuticals in weeks rather than decades.
• Financial Risk Modeling & Algorithmic Hedging: Calculating multi-variable global market portfolio risks in real time.
• Cryptographic Security & Post-Quantum Encryption: Developing quantum-resistant lattice-based encryption standards before quantum decryption cracks legacy RSA keys.
• Supply Chain & Global Logistics Optimization: Solving the traveling salesperson problem across thousands of interrelated delivery corridors simultaneously.

3. Preparing Your Enterprise for the Quantum Era
While fault-tolerant quantum computers remain in cryogenic laboratories today, hybrid quantum-classical algorithms are already running in enterprise pilots. Organizations must begin auditing cryptographic vulnerabilities and exploring quantum SDKs today to ensure they are prepared for the coming quantum horizon.`,
    author: 'Admin',
    authorRole: 'Advanced Computing & Quantum Systems',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    date: 'May 1, 2024',
    readTime: '7 min read',
    category: 'TECHNOLOGY',
    tags: ['Quantum Computing', 'Technology'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    featuredQuote: 'Quantum computing is not simply a faster classical computer; it is an entirely new mathematical language for deciphering reality.',
    summaryHighlights: [
      'Superposition and quantum entanglement allow parallel processing of massive combinatorial matrices.',
      'Applications in molecular simulations, drug discovery, and logistics optimization.',
      'The critical urgency of adopting post-quantum cryptography (PQC) before legacy RSA keys are rendered obsolete.'
    ]
  }
];
