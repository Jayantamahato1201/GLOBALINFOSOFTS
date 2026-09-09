import bcrypt from 'bcryptjs';
import { CmsDatabaseSchema } from './cmsTypes.js';

export function getInitialCmsDatabase(): CmsDatabaseSchema {
  const defaultPasswordHash = bcrypt.hashSync('AdminPassword@2026', 10);

  return {
    users: [
      {
        id: 'usr-super-admin-01',
        email: 'admin@globalinfosoft.com',
        passwordHash: defaultPasswordHash,
        fullName: 'Global Infosoft Super Admin',
        role: 'super_admin',
        status: 'active',
        createdAt: '2025-01-01T00:00:00.000Z',
        lastLogin: '2025-03-01T10:00:00.000Z'
      },
      {
        id: 'usr-editor-01',
        email: 'editor@globalinfosoft.com',
        passwordHash: defaultPasswordHash,
        fullName: 'Content Editor',
        role: 'editor',
        status: 'active',
        createdAt: '2025-01-15T00:00:00.000Z',
        lastLogin: '2025-03-02T14:20:00.000Z'
      }
    ],

    pages: [
      {
        id: 'page-home',
        name: 'Home',
        route: 'home',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: 'Global InfoSofts - Enterprise Software & Digital Solutions',
        seoDescription: 'Global InfoSofts: Enterprise Software Engineering, Custom Web & Mobile Applications, ERP/CRM Systems, Retail POS & 24/7 Technical Support in Jamshedpur.',
        seoKeywords: 'software development, ERP, retail POS, billing software, web development, Jamshedpur',
        ogTitle: 'Global InfoSofts - Enterprise Software & Digital Solutions',
        ogDescription: 'Transforming ideas into intelligent digital realities with custom software, POS systems, and cloud portals.',
        ogImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        displayOrder: 1
      },
      {
        id: 'page-services',
        name: 'Services',
        route: 'services',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: 'Our Services - Custom Software, ERP & Web Apps | Global InfoSoft',
        seoDescription: 'Explore our full spectrum of software development services: desktop ERP, point-of-sale systems, e-commerce, and mobile apps.',
        displayOrder: 2
      },
      {
        id: 'page-solutions',
        name: 'Solutions',
        route: 'solutions',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: 'Industry Software Solutions - Retail POS, Healthcare & Schools | Global InfoSoft',
        seoDescription: 'Tailor-made software packages for supermarkets, optical stores, schools, distributors, and jewelers.',
        displayOrder: 3
      },
      {
        id: 'page-projects',
        name: 'Projects & Case Studies',
        route: 'projects',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: 'Client Case Studies & Software Deployments | Global InfoSoft',
        seoDescription: 'Verified case studies of custom ERP, billing software, and web portals delivered to retail and wholesale leaders.',
        displayOrder: 4
      },
      {
        id: 'page-pricing',
        name: 'Pricing & Packages',
        route: 'pricing',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: 'Software Pricing & Setup Packages | Global InfoSoft',
        seoDescription: 'Transparent pricing packages for single-store retail POS, multi-counter ERP suites, and enterprise custom software.',
        displayOrder: 5
      },
      {
        id: 'page-about',
        name: 'About Us',
        route: 'about',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: 'About Global InfoSoft - 10+ Years of Engineering Excellence',
        seoDescription: 'Founded in 2014 in Jamshedpur, Jharkhand. Over 350+ completed software installations and 150+ active enterprise clients.',
        displayOrder: 6
      },
      {
        id: 'page-team',
        name: 'Leadership & Team',
        route: 'team',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: 'Our Leadership & Engineering Team | Global InfoSoft',
        seoDescription: 'Meet the software architects, full-stack engineers, and support specialists driving client success.',
        displayOrder: 7
      },
      {
        id: 'page-careers',
        name: 'Careers',
        route: 'careers',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: 'Careers at Global InfoSoft - Build Your Tech Career',
        seoDescription: 'Join our dynamic software engineering and digital marketing teams in Jamshedpur. View open positions and apply.',
        displayOrder: 8
      },
      {
        id: 'page-support',
        name: 'Tech Support & Helpdesk',
        route: 'support',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: '24/7 Technical Support & Remote Helpdesk | Global InfoSoft',
        seoDescription: 'Instant remote desktop assistance (AnyDesk), database backup, hardware printer config, and guaranteed 24-hour SLAs.',
        displayOrder: 9
      },
      {
        id: 'page-blog',
        name: 'Insights & Blogs',
        route: 'blog',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: 'Technology Insights, AI & Software Architecture Blog | Global InfoSoft',
        seoDescription: 'In-depth engineering analysis on AI healthcare, green data centers, and quantum computing.',
        displayOrder: 10
      },
      {
        id: 'page-contact',
        name: 'Contact & Demo',
        route: 'contact',
        enabled: true,
        lastUpdated: new Date().toISOString(),
        seoTitle: 'Contact Global InfoSoft - Schedule a Live Software Demo',
        seoDescription: 'Request a customized software quotation or schedule an on-site demo in Jamshedpur. Phone: +91-9431515806.',
        displayOrder: 11
      }
    ],

    sections: [
      {
        id: 'sec-home-hero',
        pageId: 'home',
        sectionKey: 'hero',
        title: 'Hero Showcase & 3D Core',
        subtitle: 'Main banner featuring headline, CTA buttons, and interactive tech visualizer',
        enabled: true,
        displayOrder: 1,
        lastUpdated: new Date().toISOString(),
        content: {
          headline: 'Enterprise Software & Digital Solutions',
          subheadline: 'Architecting ultra-high performance Windows desktop software, custom ERP, retail POS billing platforms, and modern web applications with 100% intellectual property ownership.',
          primaryBtnText: 'Explore Solutions',
          primaryBtnUrl: 'solutions',
          secondaryBtnText: 'Get Free Demo',
          secondaryBtnUrl: 'contact'
        }
      },
      {
        id: 'sec-home-services',
        pageId: 'home',
        sectionKey: 'services',
        title: 'Services Carousel',
        subtitle: 'Interactive carousel showcasing key software development services',
        enabled: true,
        displayOrder: 2,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'sec-home-solutions',
        pageId: 'home',
        sectionKey: 'solutions',
        title: 'Software Solutions Browser',
        subtitle: 'Industry-specific software packages with feature specs and 3D preview',
        enabled: true,
        displayOrder: 3,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'sec-home-why-deploy',
        pageId: 'home',
        sectionKey: 'why_deploy',
        title: 'Why Deploy With Us',
        subtitle: 'Key architectural advantages: 6 months free support, offline-first, GST compliance',
        enabled: true,
        displayOrder: 4,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'sec-home-projects',
        pageId: 'home',
        sectionKey: 'projects',
        title: 'Case Studies & Deployed Systems',
        subtitle: 'Real customer implementations and measurable business results',
        enabled: true,
        displayOrder: 5,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'sec-home-experts',
        pageId: 'home',
        sectionKey: 'experts',
        title: 'Meet The Experts / Leadership',
        subtitle: 'Leadership team and dedicated engineering divisions',
        enabled: true,
        displayOrder: 6,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'sec-home-blogs',
        pageId: 'home',
        sectionKey: 'blogs',
        title: 'Blogs & Technical Insights',
        subtitle: 'Latest articles and thought leadership',
        enabled: true,
        displayOrder: 7,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'sec-home-build-package',
        pageId: 'home',
        sectionKey: 'build_package',
        title: 'Build Your Custom Package',
        subtitle: 'Interactive modular software package configurator with instant estimate',
        enabled: true,
        displayOrder: 8,
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'sec-home-cta',
        pageId: 'home',
        sectionKey: 'cta',
        title: 'Bottom Call-to-Action',
        subtitle: 'Ready to upgrade banner with direct contact and WhatsApp buttons',
        enabled: true,
        displayOrder: 9,
        lastUpdated: new Date().toISOString()
      }
    ],

    media: [
      {
        id: 'med-01',
        filename: 'architect_studio_screen.jpg',
        url: '/src/assets/images/architect_studio_screen_1788500928028.jpg',
        fileType: 'image/jpeg',
        size: 342100,
        uploadedAt: '2025-02-10T10:00:00.000Z',
        usedIn: ['Projects: Riddhi Architect ERP']
      },
      {
        id: 'med-02',
        filename: 'seven_financials_laptop.jpg',
        url: '/src/assets/images/seven_financials_laptop_1788500908977.jpg',
        fileType: 'image/jpeg',
        size: 421000,
        uploadedAt: '2025-02-10T10:05:00.000Z',
        usedIn: ['Projects: Seven Financials Web Portal']
      },
      {
        id: 'med-03',
        filename: 'gaming_platform_screen.jpg',
        url: '/src/assets/images/gaming_platform_screen_1788500955919.jpg',
        fileType: 'image/jpeg',
        size: 512000,
        uploadedAt: '2025-02-10T10:10:00.000Z',
        usedIn: ['Projects: KubberX Gaming Web App']
      },
      {
        id: 'med-04',
        filename: 'custom_software_banner.jpg',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        fileType: 'image/jpeg',
        size: 289000,
        uploadedAt: '2025-02-11T12:00:00.000Z',
        usedIn: ['Services: Custom Software & ERP']
      },
      {
        id: 'med-05',
        filename: 'retail_pos_system.jpg',
        url: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=1200&q=80',
        fileType: 'image/jpeg',
        size: 387000,
        uploadedAt: '2025-02-12T09:30:00.000Z',
        usedIn: ['Solutions: Retail POS']
      }
    ],

    blogs: [
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
        featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        publishDate: '2024-03-15T00:00:00.000Z',
        seoTitle: 'AI Doctor vs Human Doctor: Future of Healthcare | Global InfoSoft',
        seoDescription: 'Will AI take the place of human doctors? An architectural analysis on speed, empathy, and collaborative Centaur Medicine.',
        views: 1420,
        featuredQuote: 'AI will not replace human doctors, but doctors who embrace AI will inevitably replace those who do not.',
        summaryHighlights: [
          'Diagnostic AI processes thousands of high-resolution radiology scans in sub-second inference windows.',
          'Human doctors remain irreplaceable for emotional empathy, holistic patient context, and moral decision-making.',
          'The future belongs to Centaur Medicine: physicians armed with predictive machine intelligence.'
        ]
      },
      {
        id: 'green-tech-sustainable-it-future',
        title: 'Green Tech & Sustainable IT: A Smarter, Greener Future',
        slug: 'green-tech-sustainable-it-future',
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
        featuredImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        publishDate: '2024-04-12T00:00:00.000Z',
        seoTitle: 'Green Tech & Sustainable IT: A Smarter Future | Global InfoSoft',
        seoDescription: 'How liquid immersion cooling, renewable workload scheduling, and circular hardware are revolutionizing enterprise compute.',
        views: 890,
        featuredQuote: 'Sustainable IT is not just an environmental imperative; it is the ultimate optimization of enterprise compute efficiency.',
        summaryHighlights: [
          'Liquid immersion cooling reduces data center energy consumption by up to 35%.',
          'Dynamic workload routing allows compute clusters to follow peak renewable energy cycles.',
          'Circular electronic hardware recycling lowers TCO while meeting strict ESG compliance.'
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
        featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
        status: 'published',
        publishDate: '2024-05-01T00:00:00.000Z',
        seoTitle: 'AuraQuantic: Illuminating the Quantum Future | Global InfoSoft',
        seoDescription: 'Discover how quantum entanglement, superposition, and qubits are redefining computing for global enterprises.',
        views: 1150,
        featuredQuote: 'Quantum computing is not simply a faster classical computer; it is an entirely new mathematical language for deciphering reality.',
        summaryHighlights: [
          'Superposition and quantum entanglement allow parallel processing of massive combinatorial matrices.',
          'Applications in molecular simulations, drug discovery, and logistics optimization.',
          'The critical urgency of adopting post-quantum cryptography (PQC) before legacy RSA keys are rendered obsolete.'
        ]
      }
    ],

    careers: [
      {
        id: 'job-01',
        title: 'Senior Full-Stack .NET & React Engineer',
        department: 'Engineering Division',
        location: 'Jamshedpur (On-site / Hybrid)',
        type: 'Full-Time',
        experience: '3 - 5 Years',
        salary: '₹6,00,000 - ₹9,50,000 / year',
        summary: 'We are seeking an experienced Full-Stack Engineer skilled in C# .NET, Microsoft SQL Server, React, and modern TypeScript to lead enterprise ERP and client software developments.',
        responsibilities: [
          'Architect and develop high-throughput desktop ERP modules (.NET WPF/C#) and connected React web portals.',
          'Design optimized SQL Server schemas, stored procedures, and automated database sync routines.',
          'Integrate hardware devices (thermal POS printers, barcode scanners, weighing scales).',
          'Conduct code reviews and mentor junior engineering staff.'
        ],
        requirements: [
          'Strong proficiency in C#, .NET 8 / .NET Core, and Microsoft SQL Server.',
          'Hands-on experience with React, TypeScript, and RESTful API engineering.',
          'Solid understanding of multithreading, local offline caching, and database transactions.'
        ],
        skills: ['C# .NET', 'SQL Server', 'React', 'TypeScript', 'WPF', 'REST APIs'],
        benefits: [
          'Competitive compensation with annual performance bonuses',
          'Health insurance coverage and paid sick leave',
          'Hands-on exposure to high-scale enterprise retail and ERP clients',
          'Flexible hybrid work arrangements and tech equipment allowance'
        ],
        applicationEmail: 'kumarrajnish531@gmail.com',
        deadline: '2025-06-30',
        status: 'open',
        displayOrder: 1,
        createdAt: '2025-02-01T00:00:00.000Z'
      },
      {
        id: 'job-02',
        title: 'Mobile Application Developer (Flutter / Android)',
        department: 'Mobile Engineering Division',
        location: 'Jamshedpur / Remote',
        type: 'Full-Time',
        experience: '1 - 3 Years',
        salary: '₹3,60,000 - ₹6,00,000 / year',
        summary: 'Join our mobile team to develop native and cross-platform Android and iOS business applications that integrate with our ERP and billing platforms.',
        responsibilities: [
          'Develop smooth, highly responsive mobile applications using Flutter and Dart.',
          'Implement offline SQLite synchronization and background push notification systems.',
          'Ensure pixel-perfect UI execution matching modern Figma designs.',
          'Publish and maintain apps on the Google Play Store and Apple App Store.'
        ],
        requirements: [
          'Minimum 1 year of production Flutter / Dart experience with published portfolio apps.',
          'Knowledge of state management patterns (Riverpod, Bloc, or Provider).',
          'Experience integrating REST APIs, WebSockets, and local device storage.'
        ],
        skills: ['Flutter', 'Dart', 'Android SDK', 'SQLite', 'REST APIs', 'Git'],
        benefits: [
          'Flexible work culture with remote options',
          'Mentorship under senior mobile architects',
          'Annual learning budget for technical certifications'
        ],
        applicationEmail: 'kumarrajnish531@gmail.com',
        deadline: '2025-07-15',
        status: 'open',
        displayOrder: 2,
        createdAt: '2025-02-15T00:00:00.000Z'
      },
      {
        id: 'job-03',
        title: 'Technical Support & QA Specialist',
        department: 'Client Operations & Helpdesk',
        location: 'Jamshedpur (On-site)',
        type: 'Full-Time',
        experience: 'Fresher / 0 - 2 Years',
        salary: '₹2,40,000 - ₹3,60,000 / year',
        summary: 'Provide frontline technical support, remote troubleshooting via AnyDesk, on-site software installations, and software QA testing for our retail clients.',
        responsibilities: [
          'Install and configure Global InfoSoft POS and ERP packages on client Windows computers.',
          'Provide prompt remote assistance for thermal printer driver setup, network databases, and GST invoices.',
          'Perform manual regression and feature verification tests before client software releases.',
          'Document user feedback and log bug reports for the development team.'
        ],
        requirements: [
          'Diploma or Degree in Computer Science, IT, or BCA/MCA.',
          'Strong problem-solving mindset and clear communication skills in Hindi & English.',
          'Familiarity with Windows OS configurations, networking basics, and hardware drivers.'
        ],
        skills: ['Windows Troubleshooting', 'AnyDesk / TeamViewer', 'Thermal Printers', 'Basic SQL', 'Customer Support'],
        benefits: [
          'Direct mentorship from Founder & CTO',
          'Rapid career advancement into software development or database administration',
          'Travel allowances and incentive pay for client deployment milestones'
        ],
        applicationEmail: 'kumarrajnish531@gmail.com',
        deadline: '2025-08-01',
        status: 'open',
        displayOrder: 3,
        createdAt: '2025-02-20T00:00:00.000Z'
      }
    ],

    services: [
      {
        id: 'custom-software',
        title: 'Custom Software Development',
        shortDesc: 'Bespoke Windows desktop applications and specialized enterprise workflow automation engines.',
        longDesc: 'Tailor-engineered software built from scratch to match your exact business logic. Eliminates manual bottlenecks with robust architecture, multi-user concurrency, and local offline resilience.',
        iconName: 'Code2',
        category: 'software',
        deliverables: [
          'Windows Desktop Software (.NET, C#, WPF)',
          'Custom Business Workflow Automation',
          'Role-Based Staff Access & Audit Logs',
          'Automated Daily Database Backups'
        ],
        technologies: ['C# .NET', 'MS SQL Server', 'WPF', 'Windows Forms', 'Node.js'],
        metrics: '100% Tailored to Your Workflows',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        duration: '4 - 8 Weeks',
        featured: true,
        enabled: true,
        displayOrder: 1
      },
      {
        id: 'erp-development',
        title: 'ERP Software Development',
        shortDesc: 'Integrated enterprise resource planning connecting purchase, inventory, sales, HR, and accounts.',
        longDesc: 'Centralize every department under a unified system with real-time multi-branch synchronization, detailed ledger audit trails, and executive dashboard analytics.',
        iconName: 'Building2',
        category: 'erp',
        deliverables: [
          'Multi-Branch Inventory & Stock Transfer',
          'Purchase Order, Vendor & Supply Chain Tracking',
          'Integrated Accounts & Financial Ledgers',
          'Payroll, Attendance & Staff Management'
        ],
        technologies: ['C# .NET', 'SQL Server Enterprise', 'REST APIs', 'PostgreSQL', 'Crystal Reports'],
        metrics: 'Single Source of Truth for Enterprise',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        duration: '6 - 12 Weeks',
        featured: true,
        enabled: true,
        displayOrder: 2
      },
      {
        id: 'customer-support',
        title: 'Dedicated Technical Support & AMC',
        shortDesc: 'Instant remote desktop troubleshooting, periodic system health checkups, and annual maintenance.',
        longDesc: 'Reliable post-deployment technical care to ensure zero downtime. Direct phone and AnyDesk remote support for your billing counters, servers, and staff.',
        iconName: 'Headphones',
        category: 'support',
        deliverables: [
          'Direct Phone & Remote Desktop Troubleshooting',
          'Quarterly System Health & Performance Audits',
          'Data Integrity Validation & Disaster Recovery',
          'Annual Maintenance Contracts (AMC)'
        ],
        technologies: ['AnyDesk Remote', 'TeamViewer', 'Helpdesk Ticketing', 'Windows Server', 'SQL Maintenance'],
        metrics: '< 15 Min Emergency Response',
        image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80',
        duration: 'Ongoing AMC Subscription',
        featured: true,
        enabled: true,
        displayOrder: 3
      },
      {
        id: 'cloud-hosting',
        title: 'Domain & Cloud Server Hosting',
        shortDesc: 'High-speed SSD cloud VPS, business email setups, SSL certificates, and 99.9% uptime monitoring.',
        longDesc: 'Secure, high-availability cloud infrastructure for hosting databases, web APIs, portals, and official business email accounts with automated off-site backups.',
        iconName: 'Cloud',
        category: 'cloud',
        deliverables: [
          'High-Speed SSD Cloud VPS & Dedicated Servers',
          'Official Corporate Email (info@yourcompany.com)',
          'Automated Daily Off-Site Backups',
          'SSL Certificates & DDoS Protection'
        ],
        technologies: ['Linux VPS', 'cPanel', 'Cloudflare', 'AWS', 'Docker', 'SSL/TLS'],
        metrics: '99.9% Verified Server Uptime',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        duration: 'Annual Managed Hosting',
        featured: false,
        enabled: true,
        displayOrder: 4
      },
      {
        id: 'website-design',
        title: 'Website Design & UI/UX',
        shortDesc: 'Stunning, mobile-responsive corporate websites, brand identities, and high-converting landing pages.',
        longDesc: 'First impressions matter. We design contemporary, lightweight websites tailored to establish corporate credibility and convert visitors into qualified leads.',
        iconName: 'Palette',
        category: 'web',
        deliverables: [
          'Modern Responsive UI/UX Design',
          'Corporate Showcase & Portfolio Portals',
          'Interactive WhatsApp & Call Lead Funnels',
          'Lighthouse Speed Optimization (<1.5s)'
        ],
        technologies: ['Figma', 'React', 'Tailwind CSS', 'Next.js', 'HTML5/CSS3'],
        metrics: '99+ Google PageSpeed Score',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        duration: '1 - 3 Weeks',
        featured: false,
        enabled: true,
        displayOrder: 5
      },
      {
        id: 'web-applications',
        title: 'Web Application Development',
        shortDesc: 'Interactive browser portals, client dashboards, SaaS software, and secure customer logins.',
        longDesc: 'Scalable web applications engineered with modern web technologies, real-time database synchronization, and role-based permissions.',
        iconName: 'Globe',
        category: 'web',
        deliverables: [
          'Custom Web Portals & Customer Dashboards',
          'RESTful API Backend Integration',
          'Role-Based Access & OAuth Authentication',
          'Payment Gateway & Invoice Automation'
        ],
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Express', 'Prisma'],
        metrics: 'Sub-second API Latency',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        duration: '3 - 6 Weeks',
        featured: true,
        enabled: true,
        displayOrder: 6
      },
      {
        id: 'mobile-apps',
        title: 'Mobile Application Development',
        shortDesc: 'Native Android and cross-platform apps for field sales, customer loyalty, and mobile shopping.',
        longDesc: 'Extend your enterprise workflows to mobile devices with offline-capable apps that synchronize with your central database.',
        iconName: 'Smartphone',
        category: 'mobile',
        deliverables: [
          'Native Android App Development (Kotlin)',
          'Cross-Platform iOS & Android (Flutter)',
          'Offline Local Storage & Background Sync',
          'Google Play Store Publishing & Setup'
        ],
        technologies: ['Flutter', 'Android SDK', 'Kotlin', 'Firebase', 'SQLite'],
        metrics: '60 FPS Smooth Mobile UX',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
        duration: '4 - 6 Weeks',
        featured: true,
        enabled: true,
        displayOrder: 7
      },
      {
        id: 'gst-billing',
        title: 'GST Billing & Invoicing Software',
        shortDesc: 'Ultra-fast tax invoice generation, GSTR-1 & GSTR-3B report exports, and party credit ledger tracking.',
        longDesc: 'Built specifically for Indian businesses. Supports thermal and A4/A5 invoices, e-Way bills, multi-tax GST slabs, and automated payment reminders.',
        iconName: 'Receipt',
        category: 'pos',
        deliverables: [
          'One-Click GST Invoice & Bill Generation',
          'GSTR-1, GSTR-2 & GSTR-3B Tax Ready Exports',
          'Customer & Vendor Outstanding Ledger Alerts',
          'Thermal Receipt & Laser Printer Compatibility'
        ],
        technologies: ['C# .NET', 'SQL Server Express', 'Crystal Reports', 'ESC/POS'],
        metrics: '100% Tax Compliant & Fast Billing',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
        duration: 'Instant Setup (1 - 2 Days)',
        featured: true,
        enabled: true,
        displayOrder: 8
      },
      {
        id: 'pos-systems',
        title: 'Retail POS & Barcode Systems',
        shortDesc: 'Hardware-integrated point of sale for retail stores, supermarkets, pharmacies, and restaurants.',
        longDesc: 'Fast counter sales with barcode scanner support, weighing scale integration, electronic cash drawers, batch-wise expiry tracking, and instant thermal printing.',
        iconName: 'Calculator',
        category: 'pos',
        deliverables: [
          'High-Speed Barcode Scanning & Label Printing',
          'Weighing Scale & Cash Drawer Hardware Link',
          'Batch, MRP & Expiry Date Management',
          'Multi-Counter Cashier LAN Synchronization'
        ],
        technologies: ['ESC/POS', 'Barcode 128 / EAN', 'C# .NET', 'SQL Server Express'],
        metrics: '< 1 Sec Checkout Time per Item',
        image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80',
        duration: '1 - 3 Days',
        featured: true,
        enabled: true,
        displayOrder: 9
      },
      {
        id: 'accounting-software',
        title: 'Accounting & Financial Software',
        shortDesc: 'Double-entry bookkeeping, cash/bank book management, profit & loss statements, and balance sheets.',
        longDesc: 'Complete financial management for traders, distributors, and service providers with bank reconciliation and automated tax computations.',
        iconName: 'Layers',
        category: 'pos',
        deliverables: [
          'Full Double-Entry Financial Accounting',
          'Automated Profit & Loss, Trial Balance & Balance Sheet',
          'Bank Reconciliation & Multi-Account Transfers',
          'Comprehensive Audit Trail & Historical Ledgers'
        ],
        technologies: ['C# .NET', 'MS SQL Server', 'Financial Accounting Core', 'PDF/Excel Exports'],
        metrics: 'Zero-Error Balanced Books',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        duration: 'Instant Setup (1 - 3 Days)',
        featured: false,
        enabled: true,
        displayOrder: 10
      },
      {
        id: 'seo-services',
        title: 'Search Engine Optimization (SEO)',
        shortDesc: 'Top ranking on Google Search & Google Maps for local customers searching in your city and industry.',
        longDesc: 'Proven on-page, technical, and local SEO strategies to dominate search results, attract qualified buyers, and grow organic traffic consistently.',
        iconName: 'Search',
        category: 'marketing',
        deliverables: [
          'Google Business Profile (Map Pack) Optimization',
          'Targeted Commercial Keyword Research',
          'Schema Markup, Meta Tags & Speed Tuning',
          'High-Authority Local Citations & Link Building'
        ],
        technologies: ['Google Search Console', 'Google Analytics 4', 'Ahrefs', 'Schema.org'],
        metrics: 'Top 3 Google Maps Ranking',
        image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
        duration: 'Ongoing Monthly Growth',
        featured: false,
        enabled: true,
        displayOrder: 11
      },
      {
        id: 'digital-marketing',
        title: 'Digital Marketing & Social Ads',
        shortDesc: 'Targeted Meta and Google ad campaigns, social media branding, and verified commercial lead generation.',
        longDesc: 'Laser-targeted paid advertising campaigns delivering high ROI, customer engagement, and direct inquiries via WhatsApp and phone.',
        iconName: 'TrendingUp',
        category: 'marketing',
        deliverables: [
          'Meta (Facebook & Instagram) Targeted Lead Ads',
          'Google Search PPC Campaign Management',
          'Creative Ad Copy, Banners & Video Reels',
          'Direct WhatsApp & Call Lead Funnel Automation'
        ],
        technologies: ['Meta Ads Manager', 'Google Ads', 'Canva Pro', 'WhatsApp Business API'],
        metrics: 'High ROI & Direct Buyer Inquiries',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        duration: 'Monthly Campaign Management',
        featured: false,
        enabled: true,
        displayOrder: 12
      }
    ],

    solutions: [
      {
        id: 'sol-retail-pos',
        title: 'Retail POS & Supermarket Billing Software',
        shortDesc: 'Complete retail management with high-speed barcode billing, batch expiry tracking, thermal receipts, and GST accounting.',
        fullDesc: 'Designed for supermarkets, departmental stores, garment outlets, and grocery businesses. Handles thousands of inventory SKUs with lightning-fast barcode lookups, weighing scale integrations, multi-counter cash drawer management, customer loyalty points, and automated GST-compliant tax invoicing.',
        industry: 'Retail & Supermarkets',
        iconName: 'ShoppingCart',
        features: [
          'Sub-second barcode scanning and instant thermal receipt printing',
          'Batch-wise stock control with manufacturing and expiry date alerts',
          'Multi-counter LAN setup with central administrator inventory controls',
          'GST Invoicing (CGST, SGST, IGST) with GSTR-1 and GSTR-3B export',
          'Customer loyalty points, promotional discounts, and ledger accounting'
        ],
        benefits: [
          'Zero billing queues during peak rush hours',
          'Eliminates stock shrinkage and pilferage with live reconciliation',
          'Audit-ready tax reports save 10+ hours of accountant reconciliation monthly'
        ],
        technologies: ['C# .NET', 'Microsoft SQL Server', 'ESC/POS Driver', 'Barcode 128'],
        compliance: 'GST Compliant, E-Way Bill Ready, 100% Data Ownership',
        demoAvailable: true,
        image: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=1200&q=80',
        duration: 'Turnkey Setup (1 - 3 Days)',
        featured: true,
        enabled: true,
        displayOrder: 1
      },
      {
        id: 'sol-optical',
        title: 'Optical Store & Eye Clinic Management Software',
        shortDesc: 'Bespoke optical ERP for prescription tracking, frame inventory, lens workshop job cards, and automated patient recall SMS.',
        fullDesc: 'Custom-built software engineered specifically for optical showrooms and optometry clinics. Track patient power prescriptions (Sph, Cyl, Axis, Add for both eyes), manage frame barcodes and branded lens inventories, generate workshop job-slips for lens fitting, and send automated WhatsApp/SMS notifications when spectacles are ready for collection.',
        industry: 'Optical & Eye Care',
        iconName: 'Eye',
        features: [
          'Comprehensive eye power prescription database with historical comparison',
          'Spectacle lens power matrix (Single Vision, Bifocal, Progressive)',
          'Frame barcode tagging with brand, model, size, and color variants',
          'Workshop job card tracking for lens edging, fitting, and delivery date',
          'Automated WhatsApp/SMS alerts when glasses are ready for pickup'
        ],
        benefits: [
          'Instant retrieval of repeat patient prescription records in seconds',
          'Zero prescription fitting mistakes with standardized workshop slips',
          'Enhanced patient trust and repeat visits through automated annual reminders'
        ],
        technologies: ['C# .NET', 'SQL Server', 'Thermal & Laser Printers', 'WhatsApp API'],
        compliance: 'HIPAA-aligned Patient Data Privacy, GST Compliant',
        demoAvailable: true,
        image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80',
        duration: 'Turnkey Setup (2 - 4 Days)',
        featured: true,
        enabled: true,
        displayOrder: 2
      },
      {
        id: 'sol-school',
        title: 'School, College & Institute Management ERP',
        shortDesc: 'End-to-end educational institution software for student admissions, fee billing with receipts, attendance, and exam marks.',
        fullDesc: 'A unified campus management ERP for schools, colleges, and coaching institutes. Automates fee collection with custom installment plans, thermal receipt printing, student report card generation with grading rules, teacher timetables, SMS notifications to parents, and multi-user administrative access controls.',
        industry: 'Education & Academics',
        iconName: 'GraduationCap',
        features: [
          'Student admissions and complete demographic profile management',
          'Customizable fee structures (tuition, transport, lab) with receipt printing',
          'Automated fee defaulter reminders via SMS and WhatsApp',
          'CBSE/ICSE/State Board compliant report cards and mark sheets',
          'Teacher timetable scheduling and staff payroll record keeping'
        ],
        benefits: [
          '100% elimination of manual paper fee registers and calculation errors',
          'Drastically accelerates fee recovery with automated reminder alerts',
          'Provides principals and trustees with instant real-time financial dashboards'
        ],
        technologies: ['C# .NET', 'SQL Server Express', 'Crystal Reports', 'SMS Gateway'],
        compliance: 'CBSE & ICSE Grading Standards Compliant',
        demoAvailable: true,
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
        duration: 'Turnkey Setup (3 - 7 Days)',
        featured: true,
        enabled: true,
        displayOrder: 3
      },
      {
        id: 'sol-wholesale',
        title: 'Wholesale Distribution & Inventory ERP',
        shortDesc: 'Multi-godown inventory control, batch-wise tracking, automated price lists, credit limits, and E-Way bill generation.',
        fullDesc: 'Engineered for FMCG distributors, pharmaceutical stockists, hardware wholesalers, and trading firms. Manage multiple warehouses with real-time stock transfer audits, party-wise credit days and limits, salesman commission tracking, automated purchase order creation, and direct E-Way bill JSON exports.',
        industry: 'Wholesale & FMCG Distribution',
        iconName: 'Boxes',
        features: [
          'Multi-godown stock balances with inter-branch transfer logging',
          'Party-wise rate lists, discount matrix, and credit limit locks',
          'Batch and expiry management with automated near-expiry alerts',
          'Salesman routing, order taking, and commission calculation',
          'One-click E-Way Bill and E-Invoice JSON data generation'
        ],
        benefits: [
          'Prevents overdue credit debt by auto-locking billing on defaulted parties',
          'Eliminates dead inventory and expired goods through proactive alerts',
          'Coordinates warehouse dispatch with delivery vans accurately'
        ],
        technologies: ['C# .NET', 'Microsoft SQL Server', 'REST APIs', 'E-Way Bill Engine'],
        compliance: 'GST Invoicing, E-Way Bill Ready, Tally Import/Export Ready',
        demoAvailable: true,
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        duration: 'Turnkey Setup (5 - 10 Days)',
        featured: false,
        enabled: true,
        displayOrder: 4
      }
    ],

    projects: [
      {
        id: 'proj-seven-financials',
        title: 'Seven Financials – Enterprise Web Portal',
        client: 'Seven Financials Management Ltd',
        industry: 'Financial Advisory & Accounting',
        category: 'Fintech & Web Portal',
        image: '/src/assets/images/seven_financials_laptop_1788500908977.jpg',
        summary: 'A secure, high-performance financial advisory web portal engineered for Seven Financials, featuring automated loan eligibility calculators, interactive investment portfolios, and encrypted client document vaults.',
        challenge: 'The client struggled with manual paper loan applications, fragmented investor inquiries, and slow response times across distributed branch offices in eastern India.',
        solution: 'Global InfoSoft architected a responsive, cloud-hosted web portal with dynamic investment calculators, encrypted client onboarding workflows, and WhatsApp lead integration.',
        results: [
          { label: 'Loan Lead Conversion', value: '+68%' },
          { label: 'Client Onboarding Time', value: '-55%' },
          { label: 'Page Load Speed', value: '1.1s' }
        ],
        technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
        duration: '5 Weeks',
        featured: true,
        enabled: true,
        displayOrder: 1
      },
      {
        id: 'proj-riddhi-architect',
        title: 'Riddhi Architect Studio – Portfolio & Project ERP',
        client: 'Riddhi Architects & Interior Designers',
        industry: 'Architecture & Construction',
        category: 'Enterprise ERP & Web Design',
        image: '/src/assets/images/architect_studio_screen_1788500928028.jpg',
        summary: 'A modern, visually immersive architectural showcase and internal project billing ERP system allowing architects to track client blueprints, contractor milestones, and site material expenses.',
        challenge: 'Architectural blueprints, site billing logs, and milestone photo updates were scattered across emails and physical binders, leading to budget disputes and delayed billing.',
        solution: 'Designed an interactive portfolio showcasing high-res architectural renders alongside a custom project management dashboard for material invoice approvals and contractor logs.',
        results: [
          { label: 'Milestone Approval Rate', value: '98%' },
          { label: 'Client Inquiries', value: '+120%' },
          { label: 'Billing Dispute Reduction', value: '85%' }
        ],
        technologies: ['C# .NET', 'React', 'SQL Server', 'Cloud Storage'],
        duration: '6 Weeks',
        featured: true,
        enabled: true,
        displayOrder: 2
      },
      {
        id: 'proj-kubberx-gaming',
        title: 'KubberX – Dynamic Web Application',
        client: 'KubberX Digital Media',
        industry: 'Interactive Media & Gaming',
        category: 'Full-Stack Web App',
        image: '/src/assets/images/gaming_platform_screen_1788500955919.jpg',
        summary: 'A dynamic, high-engagement web platform for gaming communities featuring real-time leaderboard score tracking, tournament registration modules, and low-latency interaction.',
        challenge: 'Handling sudden traffic surges during live tournament announcements while maintaining responsive 60 FPS visual rendering across mobile devices.',
        solution: 'Built an optimized, reactive web application utilizing React, edge caching, and lightweight WebSockets for live score broadcasts and instant tournament matchmaking.',
        results: [
          { label: 'Concurrent Users', value: '10,000+' },
          { label: 'Average Session Time', value: '18 min' },
          { label: 'Server Latency', value: '<45ms' }
        ],
        technologies: ['React', 'Node.js', 'WebSockets', 'Redis', 'Tailwind CSS'],
        duration: '4 Weeks',
        featured: true,
        enabled: true,
        displayOrder: 3
      }
    ],

    team: [
      {
        id: 'tm-manoj',
        name: 'Manoj Mahato',
        role: 'Full Stack Developer',
        department: 'Engineering Division',
        bio: 'Expert in React and Node.js ecosystems. Dedicated to crafting seamless user experiences and robust backend solutions.',
        iconName: 'Code2',
        initials: 'MM',
        skills: ['React', 'Node.js', 'Full Stack Development', 'REST APIs', 'Cloud Architecture'],
        email: 'kumarrajnish531@gmail.com',
        enabled: true,
        displayOrder: 1
      },
      {
        id: 'tm-shruti',
        name: 'Shruti Kumari',
        role: 'Full Stack Developer',
        department: 'Engineering Division',
        bio: 'Passionate about building scalable web applications with modern technologies. Loves clean code and creative problem-solving.',
        iconName: 'Globe',
        initials: 'SK',
        skills: ['React', 'Web Applications', 'Clean Architecture', 'Frontend UI/UX', 'JavaScript & TypeScript'],
        email: 'kumarrajnish531@gmail.com',
        enabled: true,
        displayOrder: 2
      },
      {
        id: 'tm-rajnish',
        name: 'Rajnish Kumar',
        role: 'Senior Developer',
        department: 'Engineering Division',
        bio: '10+ years of experience in software development. Specializes in system architecture and mentoring junior developers.',
        iconName: 'Code2',
        initials: 'RK',
        skills: ['System Architecture', 'Enterprise Software', 'Mentoring', 'C# .NET & SQL', 'Full Stack Development'],
        email: 'kumarrajnish531@gmail.com',
        enabled: true,
        displayOrder: 3
      }
    ],

    locations: [
      {
        id: 'loc-jamshedpur-hq',
        city: 'Jamshedpur (Headquarters)',
        country: 'Jharkhand, India',
        address: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Mango, Jamshedpur 831012, Jharkhand, India',
        phone: '+91-9431515806',
        email: 'kumarrajnish531@gmail.com',
        hours: 'Mon - Sat: 9:30 AM - 6:30 PM IST (Technical Support & Helpdesk)',
        isHQ: true,
        mapUrl: 'https://maps.google.com/?q=Dimna+Road+Mango+Jamshedpur',
        enabled: true
      }
    ],

    testimonials: [
      {
        id: 'test-1',
        author: 'Rajesh Agrawal',
        role: 'Managing Director',
        company: 'Agrawal Retail & Supermarket',
        location: 'Jamshedpur, Jharkhand',
        content: 'Global InfoSoft provided us with a fantastic multi-counter POS software. Our billing queues have dropped dramatically, barcode scanning is instantaneous, and the GST return reports save us hours of work every month.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        projectType: 'Retail POS & Multi-Counter ERP',
        enabled: true,
        displayOrder: 1
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
        projectType: 'Optical Store Management Software',
        enabled: true,
        displayOrder: 2
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
        projectType: 'School Management ERP',
        enabled: true,
        displayOrder: 3
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
        projectType: 'Wholesale & Inventory ERP',
        enabled: true,
        displayOrder: 4
      }
    ],

    navigation: [
      { id: 'nav-home', label: 'Home', page: 'home', path: '/', enabled: true, displayOrder: 1, isSecondary: false },
      { id: 'nav-support', label: 'Tech Support', page: 'support', path: '/support', enabled: true, displayOrder: 2, isSecondary: false },
      { id: 'nav-pricing', label: 'Pricing', page: 'pricing', path: '/pricing', enabled: true, displayOrder: 3, isSecondary: false },
      { id: 'nav-contact', label: 'Contact', page: 'contact', path: '/contact', enabled: true, displayOrder: 4, isSecondary: false },
      { id: 'nav-about', label: 'About', page: 'about', path: '/about', enabled: true, displayOrder: 5, isSecondary: false },
      { id: 'nav-blog', label: 'Blog', page: 'blog', path: '/blog', enabled: true, displayOrder: 6, isSecondary: false },
      { id: 'nav-careers', label: 'Careers', page: 'careers', path: '/careers', enabled: true, displayOrder: 7, isSecondary: false },
      { id: 'nav-services', label: 'Services', page: 'services', path: '/services', enabled: true, displayOrder: 8, isSecondary: true },
      { id: 'nav-solutions', label: 'Solutions', page: 'solutions', path: '/solutions', enabled: true, displayOrder: 9, isSecondary: true },
      { id: 'nav-projects', label: 'Projects', page: 'projects', path: '/projects', enabled: true, displayOrder: 10, isSecondary: true },
      { id: 'nav-team', label: 'Team', page: 'team', path: '/team', enabled: true, displayOrder: 11, isSecondary: true }
    ],

    footer: {
      companyDescription: 'Custom Software Development, Enterprise ERP, Accounting Solutions, Web & Mobile App Engineering & Digital Services in Jamshedpur.',
      copyrightText: `© ${new Date().getFullYear()} Global InfoSoft. All rights reserved.`,
      address: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Mango, Jamshedpur, Jharkhand 831012',
      phone: '+91-9431515806',
      email: 'kumarrajnish531@gmail.com',
      socialLinks: {
        linkedin: 'https://linkedin.com/company/global-infosofts',
        twitter: 'https://twitter.com/globalinfosofts',
        facebook: 'https://facebook.com/globalinfosofts',
        github: 'https://github.com/globalinfosofts',
        youtube: 'https://youtube.com/@globalinfosofts'
      },
      enabledColumns: {
        brand: true,
        solutions: true,
        services: true,
        quickLinks: true,
        contact: true
      }
    },

    settings: {
      companyName: 'Global InfoSoft',
      tagline: 'Transforming Ideas Into Intelligent Digital Realities',
      subTagline: 'Custom Software Development, Enterprise ERP, Accounting Solutions, Web & Mobile App Engineering & Digital Services in Jamshedpur.',
      logoUrl: '/logo.svg',
      faviconUrl: '/logo.svg',
      phone: '+91-9431515806',
      altPhone: '+91-7654730090',
      salesPhone: '+91-9431515806',
      contactEmail: 'kumarrajnish531@gmail.com',
      supportEmail: 'kumarrajnish531@gmail.com',
      officialEmail: 'info@globalinfosofts.com',
      headOfficeAddress: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Mango, Jamshedpur 831012, Jharkhand, India',
      supportHours: 'Mon - Sat: 9:30 AM - 6:30 PM IST (Technical Support & Helpdesk)',
      maintenanceMode: false,
      maintenanceMessage: 'We are currently performing scheduled system upgrades on our portal. We will be back online shortly. For emergency software support, please reach out on WhatsApp at +91-9431515806.',
      allowPublicSignup: true,
      socialLinks: {
        linkedin: 'https://linkedin.com/company/global-infosofts',
        twitter: 'https://twitter.com/globalinfosofts',
        facebook: 'https://facebook.com/globalinfosofts',
        github: 'https://github.com/globalinfosofts',
        youtube: 'https://youtube.com/@globalinfosofts'
      }
    },

    paymentSettings: {
      enabled: true,
      provider: 'upi_bank',
      currency: 'INR',
      testMode: false,
      merchantId: 'GIS-MERCHANT-831012',
      keyId: 'rzp_live_gis_public_key',
      keySecret: 'gis_sec_live_9431515806_jamshedpur',
      webhookSecret: 'whsec_gis_payment_stream_secure',
      upiVpa: '9431515806@paytm',
      upiPayeeName: 'Global InfoSoft',
      bankDetails: {
        accountHolderName: 'GLOBAL INFOSOFT',
        bankName: 'State Bank of India',
        accountNumber: '389201948201',
        ifscCode: 'SBIN0001234',
        branch: 'Dimna Road Mango, Jamshedpur'
      },
      notes: 'Direct Bank Transfer / NEFT / IMPS / UPI Payments for Software Licenses, AMC & Custom Development Contracts.'
    },

    content: {
      homeHero: {
        headline: 'Enterprise Software & Digital Solutions',
        subheadline: 'Architecting ultra-high performance Windows desktop software, custom ERP, retail POS billing platforms, and modern web applications with 100% intellectual property ownership.',
        experienceBadge: '10+ Years of Engineering Excellence',
        primaryBtnText: 'Explore Solutions',
        secondaryBtnText: 'Get Free Demo'
      },
      companyStats: {
        yearsOfExperience: '10+',
        projectsCompleted: '350+',
        activeClients: '150+',
        uptimeSla: '99.9%',
        clientSatisfaction: '99.2%'
      }
    },

    activityLogs: [
      {
        id: 'act-01',
        action: 'System Initialized',
        userEmail: 'system@globalinfosoft.com',
        userName: 'System Orchestrator',
        timestamp: new Date().toISOString(),
        details: 'CMS Database seeded with verified Global InfoSoft website records and super administrator credentials.',
        category: 'settings'
      }
    ],

    revisions: []
  };
}
