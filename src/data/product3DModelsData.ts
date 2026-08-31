export interface SubsystemHotspot {
  id: string;
  name: string;
  category: string;
  position: [number, number, number]; // 3D coordinates relative to model
  summary: string;
  specs: { label: string; value: string }[];
  techStack: string[];
}

export interface ArchitectureLayer {
  name: string;
  depthOffset: number; // For exploded view offset
  color: number;
  description: string;
}

export interface Product3DModelConfig {
  id: string;
  serviceId: string;
  title: string;
  subtitle: string;
  category: string;
  iconName: string;
  themeColor: number;
  secondaryColor: number;
  accentColor: number;
  stats: { label: string; value: string }[];
  tagline: string;
  description: string;
  layers: ArchitectureLayer[];
  hotspots: SubsystemHotspot[];
  keyFeatures: string[];
}

export const PRODUCT_3D_MODELS: Product3DModelConfig[] = [
  {
    id: 'erp-core',
    serviceId: 'erp-crm',
    title: 'Enterprise ERP & Core FinTech Monolith',
    subtitle: 'High-Concurrency Transactional Engine & GST Accounting System',
    category: 'Enterprise Software',
    iconName: 'Layers',
    themeColor: 0x6366f1, // Indigo
    secondaryColor: 0x818cf8, // Indigo-light
    accentColor: 0x38bdf8, // Sky
    stats: [
      { label: 'Throughput', value: '45,000 TPS' },
      { label: 'Latency', value: '< 1.8 ms' },
      { label: 'Compliance', value: '100% Tax/GST' },
      { label: 'Uptime SLA', value: '99.999%' }
    ],
    tagline: 'Multi-Tenant ACID Ledger with Automated Tax Compliance',
    description: 'Designed for mid-to-large enterprises, our ERP architecture integrates real-time double-entry bookkeeping, multi-warehouse inventory valuation, and multi-tier cryptographic audit trails into a resilient, low-latency core.',
    layers: [
      { name: 'Presentation & Executive Dashboard', depthOffset: 2.2, color: 0x818cf8, description: 'React 19 & TypeScript real-time analytics with sub-second chart rendering' },
      { name: 'Business Logic & Rules Engine', depthOffset: 0.8, color: 0x6366f1, description: 'Stateless Go & Node.js microservices with distributed transaction locks' },
      { name: 'ACID Ledger & Database Shards', depthOffset: -0.8, color: 0x4f46e5, description: 'PostgreSQL with multi-master clustering and automated write-ahead logging' },
      { name: 'Security & Audit Perimeter', depthOffset: -2.2, color: 0x38bdf8, description: 'Role-based access control (RBAC), AES-256 at rest, TLS 1.3 in transit' }
    ],
    hotspots: [
      {
        id: 'hotspot-ledger',
        name: 'Distributed ACID Ledger Core',
        category: 'Database Engine',
        position: [0, 0, 0],
        summary: 'Atomic multi-currency ledger with real-time balance reconciliation and zero data drift.',
        specs: [
          { label: 'Transaction Isolation', value: 'Serializable' },
          { label: 'Replication Lag', value: '< 5 ms' },
          { label: 'Data Durability', value: '11 Nines (99.999999999%)' }
        ],
        techStack: ['PostgreSQL', 'Redis Cluster', 'Kafka', 'pgpool-II']
      },
      {
        id: 'hotspot-tax',
        name: 'Automated Tax & GST Engine',
        category: 'Compliance Subsystem',
        position: [2.2, 1.4, 1.2],
        summary: 'Automatic multi-jurisdiction tax calculation, e-invoicing generation, and automated filing exports.',
        specs: [
          { label: 'Calculation Latency', value: '0.4 ms' },
          { label: 'Tax Rules Supported', value: '120+ International Jurisdictions' },
          { label: 'E-Waybill Integration', value: 'Real-time API Hook' }
        ],
        techStack: ['Go', 'gRPC', 'OpenAPI', 'Redis']
      },
      {
        id: 'hotspot-rbac',
        name: 'Zero-Trust RBAC Security Shield',
        category: 'Security Tier',
        position: [-2.2, 1.4, -1.2],
        summary: 'Granular permission matrix, biometric audit signatures, and automated threat isolation.',
        specs: [
          { label: 'Auth Token', value: 'Encrypted JWT / PASETO' },
          { label: 'Session Invalidation', value: 'Instant (< 100ms)' },
          { label: 'Audit Logging', value: 'Immutable Write-Once Ledger' }
        ],
        techStack: ['OAuth 2.1', 'OIDC', 'Vault', 'WAF']
      },
      {
        id: 'hotspot-event-stream',
        name: 'Event-Driven Transaction Pipeline',
        category: 'Integration Bus',
        position: [0, -2.2, 1.8],
        summary: 'Guaranteed-delivery pub/sub broker synchronizing warehouse scans, POS stations, and accounting.',
        specs: [
          { label: 'Message Capacity', value: '100K msgs/sec' },
          { label: 'Ordering Guarantee', value: 'Strict FIFO per Partition' },
          { label: 'Dead Letter Queue', value: 'Automated Self-Healing' }
        ],
        techStack: ['Apache Kafka', 'RabbitMQ', 'gRPC']
      }
    ],
    keyFeatures: [
      'Multi-currency double-entry ledger with instant trial balance generation',
      'Automated GST/VAT e-invoicing & real-time regulatory compliance',
      'Supply chain barcode & batch tracking across 50+ warehouses',
      'Role-based granular permissions with tamper-proof audit trails'
    ]
  },
  {
    id: 'web-saas',
    serviceId: 'web-development',
    title: 'Modern Full-Stack Web & SaaS Cloud Hub',
    subtitle: 'Ultra-Fast Reactive Micro-Frontends & Serverless Scalability',
    category: 'Web Engineering',
    iconName: 'Globe',
    themeColor: 0x3b82f6, // Blue
    secondaryColor: 0x60a5fa, // Light Blue
    accentColor: 0xa855f7, // Purple
    stats: [
      { label: 'Lighthouse Score', value: '99 / 100' },
      { label: 'TTFB (Edge)', value: '< 28 ms' },
      { label: 'Edge Locations', value: '310+ Global PoPs' },
      { label: 'Concurrent Users', value: '500,000+' }
    ],
    tagline: 'Sub-second Interactive Web Applications Built for High Conversion',
    description: 'Our modern web platform utilizes edge-rendered React 19 architecture, distributed GraphQL/REST federation, and multi-region CDN caching for instantaneous page loads and zero layout shifts.',
    layers: [
      { name: 'Edge CDN & Serverless SSR', depthOffset: 2.2, color: 0x60a5fa, description: 'Edge compute nodes routing traffic with sub-30ms global response times' },
      { name: 'Reactive UI Component Plane', depthOffset: 0.8, color: 0x3b82f6, description: 'Modular React 19, Tailwind CSS, and WebGL hardware-accelerated animations' },
      { name: 'GraphQL & REST Federation Bus', depthOffset: -0.8, color: 0x2563eb, description: 'Unified data access layer with automated schema stitching and caching' },
      { name: 'Multi-Tenant Storage & Redis Cluster', depthOffset: -2.2, color: 0xa855f7, description: 'Horizontally partitioned PostgreSQL and Redis sub-millisecond memory cache' }
    ],
    hotspots: [
      {
        id: 'hotspot-edge-ssr',
        name: 'Edge CDN & Server-Side Rendering',
        category: 'Edge Infrastructure',
        position: [0, 2.2, 0],
        summary: 'Dynamic edge generation delivering pre-rendered HTML with instant hydration.',
        specs: [
          { label: 'First Contentful Paint', value: '0.42 s' },
          { label: 'Cache Hit Ratio', value: '96.8%' },
          { label: 'SSL Handshake', value: 'TLS 1.3 0-RTT' }
        ],
        techStack: ['Cloudflare Workers', 'Vercel Edge', 'Next.js / Vite', 'HTTP/3']
      },
      {
        id: 'hotspot-graphql',
        name: 'Federated GraphQL Gateway',
        category: 'API Orchestration',
        position: [2.0, 0, 1.5],
        summary: 'Single unified endpoint serving multi-service data graphs with field-level authorization.',
        specs: [
          { label: 'Query Resolution', value: '1.2 ms avg' },
          { label: 'Schema Validation', value: 'Strict TypeScript Types' },
          { label: 'Rate Limiting', value: 'Distributed Token Bucket' }
        ],
        techStack: ['Apollo Router', 'Node.js / Express', 'TypeScript', 'Redis']
      },
      {
        id: 'hotspot-cache',
        name: 'Distributed In-Memory Cache',
        category: 'Performance Layer',
        position: [-2.0, -1.0, -1.2],
        summary: 'Ultra-low latency key-value cache preventing repetitive database hits for popular queries.',
        specs: [
          { label: 'Read Latency', value: '0.25 ms' },
          { label: 'Eviction Strategy', value: 'LRU with TTL Tags' },
          { label: 'Clustering', value: '3-Node Active-Active' }
        ],
        techStack: ['Redis Enterprise', 'DragonflyDB', 'Memcached']
      }
    ],
    keyFeatures: [
      'Sub-second Edge SSR with 99+ Google Lighthouse score optimization',
      'Micro-frontend architecture enabling parallel team releases',
      'Integrated Stripe & Multi-gateway recurring subscription billing',
      'Real-time collaborative WebSockets with zero reconnect flicker'
    ]
  },
  {
    id: 'mobile-fintech',
    serviceId: 'mobile-apps',
    title: 'High-Concurrency Mobile FinTech Platform',
    subtitle: 'iOS & Android Native Performance with Biometric Security',
    category: 'Mobile Engineering',
    iconName: 'Smartphone',
    themeColor: 0x10b981, // Emerald
    secondaryColor: 0x34d399,
    accentColor: 0x6366f1,
    stats: [
      { label: 'Frame Rate', value: '120 FPS Solid' },
      { label: 'Offline Sync', value: '100% Conflict-Free' },
      { label: 'App Store Rating', value: '4.9 / 5.0' },
      { label: 'Active Devices', value: '1.2M+ Daily' }
    ],
    tagline: 'High-Performance Cross-Platform Mobile Apps with Native Device Integration',
    description: 'Built with React Native and Flutter native bridgeless architectures, our mobile platforms support full offline data queues, biometric hardware cryptography, and instantaneous push events.',
    layers: [
      { name: 'Hardware Biometrics & Security Enclave', depthOffset: 2.2, color: 0x34d399, description: 'Apple FaceID / Android BiometricPrompt with cryptographic key storage' },
      { name: 'JSI Fast Native Bridge', depthOffset: 0.8, color: 0x10b981, description: 'Direct C++ native memory bindings eliminating serialization overhead' },
      { name: 'Local Reactive SQLite Storage', depthOffset: -0.8, color: 0x059669, description: 'Encrypted local client database supporting offline transactional queues' },
      { name: 'Delta-Sync Cloud Broker', depthOffset: -2.2, color: 0x6366f1, description: 'CRDT-based conflict-free delta sync reconnecting seamlessly over 3G/5G/Wi-Fi' }
    ],
    hotspots: [
      {
        id: 'hotspot-biometrics',
        name: 'Hardware Security Module (HSM) Enclave',
        category: 'Device Security',
        position: [0, 2.4, 0.5],
        summary: 'Cryptographic public/private key generation inside Secure Enclave / StrongBox hardware.',
        specs: [
          { label: 'Key Storage', value: 'Hardware-Backed Keystore' },
          { label: 'Signature Time', value: '< 15 ms' },
          { label: 'Jailbreak / Root Detection', value: 'Zero-Tolerance Auto-Lock' }
        ],
        techStack: ['Secure Enclave', 'Android KeyStore', 'WebAuthn / FIDO2']
      },
      {
        id: 'hotspot-offline-sync',
        name: 'Conflict-Free Offline Sync Engine',
        category: 'Data Persistence',
        position: [1.8, -0.5, 1.2],
        summary: 'Users can perform transactions completely offline; data syncs seamlessly upon reconnection.',
        specs: [
          { label: 'Conflict Resolution', value: 'CRDT Vector Clocks' },
          { label: 'Local Encryption', value: 'SQLCipher AES-256' },
          { label: 'Sync Throughput', value: '5,000 records / sec' }
        ],
        techStack: ['SQLite', 'WatermelonDB', 'Realm', 'Protobuf']
      },
      {
        id: 'hotspot-push-bus',
        name: 'Real-Time WebSocket & Push Conduit',
        category: 'Notification Bus',
        position: [-1.8, 0.5, -1.0],
        summary: 'Sub-second push notifications and bi-directional trading ticker updates.',
        specs: [
          { label: 'Push Delivery Latency', value: '< 350 ms' },
          { label: 'Battery Consumption', value: '< 1.2% per day' },
          { label: 'Protocols', value: 'WSS, APNs, FCM' }
        ],
        techStack: ['Firebase FCM', 'Apple APNs', 'Socket.io', 'gRPC']
      }
    ],
    keyFeatures: [
      'Native-feel 120 FPS fluid micro-animations with gesture physics',
      'Automated background delta synchronization with server-authoritative state',
      'Integrated payment gateways (Apple Pay, Google Pay, UPI, Stripe)',
      'Bank-grade biometric KYC flow with camera liveness detection'
    ]
  },
  {
    id: 'ai-cognitive',
    serviceId: 'ai-automation',
    title: 'AI Neural Automation & Cognitive Agent Cluster',
    subtitle: 'Serverless LLM Inference, Vector Search & Autonomous Workflow Bots',
    category: 'Artificial Intelligence',
    iconName: 'Sparkles',
    themeColor: 0x8b5cf6, // Violet
    secondaryColor: 0xa78bfa,
    accentColor: 0xec4899,
    stats: [
      { label: 'Inference Speed', value: '110 Tokens/sec' },
      { label: 'Accuracy Benchmark', value: '99.4% F1-Score' },
      { label: 'Cost Reduction', value: '70% Token Optimization' },
      { label: 'Vector Index Size', value: '50M+ Embeddings' }
    ],
    tagline: 'Autonomous AI Agents Automating Complex Business Operations',
    description: 'Harness the power of cutting-edge multimodal AI models, high-dimensional vector databases, and deterministic function-calling pipelines to automate customer service, document parsing, and predictive analytics.',
    layers: [
      { name: 'Cognitive Agent Orchestrator', depthOffset: 2.2, color: 0xa78bfa, description: 'Multi-agent coordination loop handling planning, tool-calling, and evaluation' },
      { name: 'Tensor Inference & Reasoning Core', depthOffset: 0.8, color: 0x8b5cf6, description: 'Low-latency quantized LLM compute with context-window caching' },
      { name: 'High-Dimensional Vector Memory', depthOffset: -0.8, color: 0x7c3aed, description: 'HNSW index vector database for sub-10ms similarity semantic search' },
      { name: 'Enterprise Data Connectors & Guardrails', depthOffset: -2.2, color: 0xec4899, description: 'PII redactor, hallucination verifiers, and secure SQL/ERP bridges' }
    ],
    hotspots: [
      {
        id: 'hotspot-vector-db',
        name: 'HNSW Vector Memory Matrix',
        category: 'Semantic Search',
        position: [0, -1.8, 1.4],
        summary: 'Retrieval-Augmented Generation (RAG) indexing millions of enterprise PDFs and tables.',
        specs: [
          { label: 'Search Latency', value: '4.2 ms' },
          { label: 'Embedding Dimensions', value: '1536 / 3072 dims' },
          { label: 'Recall Rate', value: '98.9%' }
        ],
        techStack: ['Pinecone', 'pgvector', 'Qdrant', 'OpenAI Embeddings']
      },
      {
        id: 'hotspot-llm-core',
        name: 'Tensor Processing Core',
        category: 'Model Inference',
        position: [0, 0, 0],
        summary: 'Multi-model reasoning orchestrator blending Gemini 2.5 Pro, Claude 3.7, and fine-tuned local models.',
        specs: [
          { label: 'Streaming Time-to-First-Token', value: '180 ms' },
          { label: 'Context Length', value: '1,000,000 Tokens' },
          { label: 'Deterministic Guardrails', value: 'JSON Schema Validation' }
        ],
        techStack: ['@google/genai', 'LangChain', 'vLLM', 'HuggingFace']
      },
      {
        id: 'hotspot-guardrail',
        name: 'Hallucination & PII Firewall',
        category: 'AI Security',
        position: [2.0, 1.5, -1.2],
        summary: 'Real-time inspection intercepting PII, financial leaks, and invalid schema outputs.',
        specs: [
          { label: 'Filtering Latency', value: '< 8 ms' },
          { label: 'Data Masking', value: 'Automated Anonymization' },
          { label: 'Compliance', value: 'GDPR & HIPAA Aligned' }
        ],
        techStack: ['Presidio', 'NeMo Guardrails', 'Regex Filter Engine']
      }
    ],
    keyFeatures: [
      'Multi-modal document intelligence extracting invoices & contracts with 99.8% precision',
      'Autonomous customer support agents resolving 70%+ inquiries without human intervention',
      'Semantic hybrid search across product catalogs and documentation repositories',
      'Real-time predictive forecasting for inventory restock and revenue projections'
    ]
  },
  {
    id: 'cloud-mesh',
    serviceId: 'cloud-devops',
    title: 'Cloud DevOps & Kubernetes Multi-Region Mesh',
    subtitle: 'Zero-Downtime Infrastructure as Code & Automated CI/CD Pipelines',
    category: 'Cloud Engineering',
    iconName: 'Cloud',
    themeColor: 0x0ea5e9, // Sky blue
    secondaryColor: 0x38bdf8,
    accentColor: 0x10b981,
    stats: [
      { label: 'Deploy Frequency', value: '45+ / Day' },
      { label: 'MTTR', value: '< 2.4 Mins' },
      { label: 'Global Availability', value: '99.99%' },
      { label: 'Cloud Cost Savings', value: '38% Avg' }
    ],
    tagline: 'Enterprise Cloud Architecture Engineered for Resilience and Cost Efficiency',
    description: 'We construct battle-tested Kubernetes infrastructure, automated GitOps CI/CD delivery pipelines, and multi-region disaster recovery systems on AWS, Google Cloud, and Azure.',
    layers: [
      { name: 'Global Ingress & Cloudflare WAF', depthOffset: 2.2, color: 0x38bdf8, description: 'DDoS mitigation layer scrubbing 100+ Gbps attacks without origin latency' },
      { name: 'Autoscaling Kubernetes Pod Cluster', depthOffset: 0.8, color: 0x0ea5e9, description: 'Horizontal Pod Autoscalers dynamically scaling 5 to 500 nodes based on CPU/RAM' },
      { name: 'Multi-AZ Replicated Storage', depthOffset: -0.8, color: 0x0284c7, description: 'Distributed block and object storage with cross-continent live sync' },
      { name: 'Observability & Prometheus Telemetry', depthOffset: -2.2, color: 0x10b981, description: 'Distributed tracing, Grafana metrics dashboards, and automated alert paging' }
    ],
    hotspots: [
      {
        id: 'hotspot-k8s',
        name: 'Kubernetes Elastic Cluster Matrix',
        category: 'Container Orchestration',
        position: [0, 0, 0],
        summary: 'Microservices container fleet self-healing against node failures within seconds.',
        specs: [
          { label: 'Scaling Velocity', value: '0 to 100 Pods in 12s' },
          { label: 'Container Runtime', value: 'containerd with gVisor sandbox' },
          { label: 'Node Distribution', value: '3 Multi-Availability Zones' }
        ],
        techStack: ['Kubernetes (EKS/GKE)', 'Helm', 'ArgoCD', 'Istio Service Mesh']
      },
      {
        id: 'hotspot-iac',
        name: 'Terraform Infrastructure as Code',
        category: 'Automation',
        position: [-2.0, 1.4, 1.2],
        summary: '100% reproducible cloud architecture defined in declarative version-controlled code.',
        specs: [
          { label: 'Drift Detection', value: 'Hourly Automated Audits' },
          { label: 'Provisioning Speed', value: 'Full Staging in 8 mins' },
          { label: 'Secrets Management', value: 'HashiCorp Vault & KMS' }
        ],
        techStack: ['Terraform', 'Terragrunt', 'AWS CDK', 'GitHub Actions']
      },
      {
        id: 'hotspot-observability',
        name: 'Prometheus & OpenTelemetry APM',
        category: 'Monitoring',
        position: [2.0, -1.2, -1.2],
        summary: 'Full-stack distributed tracing tracking every single RPC down to the millisecond.',
        specs: [
          { label: 'Metrics Ingestion', value: '500,000 samples / sec' },
          { label: 'Alert Dispatch SLA', value: '< 10 seconds' },
          { label: 'Log Retention', value: '365 Days Compressed' }
        ],
        techStack: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Datadog']
      }
    ],
    keyFeatures: [
      'Automated GitOps CI/CD pipelines deploying safely with Canary & Blue-Green strategies',
      'Multi-region active-passive & active-active automated failover architecture',
      'FinOps cloud cost audit & optimization reducing monthly compute spend by 30-50%',
      'SOC 2 Type II, ISO 27001, and HIPAA compliance enforcement policies'
    ]
  },
  {
    id: 'retail-pos',
    serviceId: 'accounting-pos',
    title: 'Smart POS & Omnichannel Retail Ledger',
    subtitle: 'Lightning-Fast Offline Billing, Inventory Sync & Barcode Matrix',
    category: 'Retail Software',
    iconName: 'Calculator',
    themeColor: 0xf59e0b, // Amber
    secondaryColor: 0xfbbf24,
    accentColor: 0x10b981,
    stats: [
      { label: 'Billing Speed', value: '3 Secs / Invoice' },
      { label: 'Offline Resiliency', value: '100% Uptime' },
      { label: 'SKU Capacity', value: '1,000,000+ Items' },
      { label: 'Store Sync Lag', value: '< 2 Seconds' }
    ],
    tagline: 'High-Volume Retail Point-of-Sale Engineered for Zero Checkout Delays',
    description: 'Designed for supermarkets, pharmacies, apparel chains, and restaurants, our POS software ensures that cash counters never stall, even during complete internet outages.',
    layers: [
      { name: 'Cashier Touch Terminal & Customer Screen', depthOffset: 2.2, color: 0xfbbf24, description: 'Ergonomic touch-first UI with barcode scanner listener and dual display' },
      { name: 'High-Speed Local Transaction Engine', depthOffset: 0.8, color: 0xf59e0b, description: 'Ultra-fast sub-second invoice compilation with instant thermal printing' },
      { name: 'Centralized Multi-Store Cloud Shard', depthOffset: -0.8, color: 0xd97706, description: 'Real-time stock valuation and automatic purchase order generation' },
      { name: 'Encrypted Payment Gateway Bus', depthOffset: -2.2, color: 0x10b981, description: 'PCI-DSS certified tokenization for card swipes, contactless NFC, and UPI QR' }
    ],
    hotspots: [
      {
        id: 'hotspot-pos-terminal',
        name: 'Offline-First Billing Engine',
        category: 'Counter Execution',
        position: [0, 1.8, 0.8],
        summary: 'Cashiers can scan, bill, and print receipts without active internet connection.',
        specs: [
          { label: 'Barcode Lookup', value: '< 0.05 ms' },
          { label: 'Receipt Generation', value: 'Instant Thermal Esc/POS' },
          { label: 'Offline Queue', value: 'Up to 50,000 transactions' }
        ],
        techStack: ['Electron / Tauri', 'SQLite', 'C++ Raw HID Drivers', 'Node.js']
      },
      {
        id: 'hotspot-inventory-sync',
        name: 'Multi-Store Inventory Delta Broker',
        category: 'Stock Management',
        position: [1.8, -0.8, -1.0],
        summary: 'Synchronizes item stock across physical retail outlets, online e-commerce, and warehouses.',
        specs: [
          { label: 'Sync Latency', value: '1.4 seconds' },
          { label: 'Stock Reconciliation', value: 'Automated FIFO / Weighted Avg' },
          { label: 'Low-Stock Alerts', value: 'Instant WhatsApp / SMS' }
        ],
        techStack: ['PostgreSQL', 'WebSockets', 'Redis', 'Node.js']
      },
      {
        id: 'hotspot-payment-token',
        name: 'PCI-DSS Payment Tokenizer',
        category: 'Payment Terminal',
        position: [-1.8, 0, 1.2],
        summary: 'Zero card data touches local memory; all transactions pass via hardware encrypted tokens.',
        specs: [
          { label: 'Supported Gateways', value: 'Stripe, Square, PineLabs, Razorpay' },
          { label: 'Card Tokenization', value: 'Point-to-Point Encryption (P2PE)' },
          { label: 'Dynamic QR', value: 'Instant Screen Render' }
        ],
        techStack: ['EMV Kernel', 'PCI-PTS Compliant Drivers', 'TLS 1.3']
      }
    ],
    keyFeatures: [
      'Sub-3-second billing flow supporting thermal printers, barcode scanners, and weighing scales',
      '100% resilient offline capability with automatic cloud background reconciliation',
      'Integrated GST tax calculation, HSN/SAC codes, and e-waybill generation',
      'Real-time multi-branch inventory valuation, stock transfers, and low-stock alarms'
    ]
  }
];
