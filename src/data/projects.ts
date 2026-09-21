export type ProjectCategory = 
  | 'all'
  | 'ai-agents' 
  | 'systems-lowlatency' 
  | 'desktop-rust' 
  | 'vision-spatial' 
  | 'web-fullstack';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectArchitecture {
  overview: string;
  flow: string[];
  keyDecisions: string[];
}

export interface ProjectTechStack {
  primary: string;
  languages: string[];
  frameworks: string[];
  tools: string[];
}

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: 'production' | 'released' | 'open-source' | 'hackathon-winner';
  statusLabel: string;
  date: string;
  featured: boolean;
  summary: string;
  description: string;
  highlights: string[];
  architecture: ProjectArchitecture;
  techStack: ProjectTechStack;
  metrics: ProjectMetric[];
  githubUrl?: string;
  liveDemoUrl?: string;
  releaseUrl?: string;
  stars?: number;
}

export const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'ai-agents', label: 'AI & Local Agents' },
  { value: 'desktop-rust', label: 'Rust & Desktop' },
  { value: 'systems-lowlatency', label: 'Systems & Low-Latency' },
  { value: 'vision-spatial', label: 'Computer Vision' },
  { value: 'web-fullstack', label: 'Full-Stack Web' },
];

export const PROJECTS: Project[] = [
  {
    id: 'local-multi-agent',
    title: 'Local Multi-Agent Automation Framework',
    shortTitle: 'Multi-Agent Framework',
    subtitle: 'Autonomous, privacy-first multi-agent OS automation engine powered by local Ollama LLMs with interactive fast-path self-correction.',
    category: 'ai-agents',
    categoryLabel: 'AI & Local Agents',
    status: 'open-source',
    statusLabel: 'Active / Open Source',
    date: '2026',
    featured: true,
    stars: 1,
    summary: 'A 100% offline OS automation engine that decomposes natural language goals into precise desktop, terminal, and browser actions with self-correcting error recovery loops.',
    description: 'Built to run strictly on local hardware without sending telemetry or prompts to third-party cloud APIs. Coordinates an Agent Army composed of a Manager (planning & reflection), Worker (execution & command translation), and Vision (multi-monitor Tesseract OCR verification). When an action fails, the StepRunner feeds execution errors and screen state back to the model for dynamic replanning.',
    highlights: [
      'Architected a 3-tier Agent Army: Manager (TaskPlanner/Critic), Worker (StepRunner), and Vision (UIParser).',
      'Refactored core engine with an interactive fast-path self-correction loop that adapts payloads based on runtime errors.',
      'Asynchronous FastAPI backend with persistent SQLite task queue (`jobs.db`) supporting background job submission via UUID tracking.',
      'ChromaDB vector database and LRU in-memory caching mechanism delivering O(1) retrieval for reusable skills.',
      'Automated test suite with 60+ pytest cases covering concurrency, memory truncation, job tracking, and safety gates.',
    ],
    architecture: {
      overview: 'Separates planning from execution using decoupled asyncio micro-dispatchers, backed by SQLite job tracking and ChromaDB semantic memory.',
      flow: [
        'User Prompt / REST API (POST /prompt) -> Orchestrator parses intent',
        'Manager Agent generates step-by-step DAG plan with verification criteria',
        'Worker Agent translates steps into terminal commands, GUI inputs, or browser actions',
        'Vision Agent validates outcome via Tesseract OCR screen captures',
        'Fast-Path Feedback: If step fails, feeds stderr and OCR diff directly back to Worker for instant payload correction',
        'Memory Store records verified execution trajectories into ChromaDB for instant future reuse'
      ],
      keyDecisions: [
        'Pure Local LLM Execution: Bound to Ollama instances (Llama 3, Qwen 2.5 Coder, LLaVA) with zero network leakage.',
        'SQLite Async Job Queue: Prevents long-running OS tasks from blocking HTTP workers, returning 202 Accepted with pollable UUIDs.',
        'Defensive OCR Parsing: Handles dynamic multi-monitor coordinate offsets to prevent UI misclicks.'
      ]
    },
    techStack: {
      primary: 'Python & FastAPI',
      languages: ['Python', 'SQL', 'Bash'],
      frameworks: ['FastAPI', 'Asyncio', 'ChromaDB', 'Pytest'],
      tools: ['Ollama', 'Docker', 'SQLite', 'Tesseract OCR']
    },
    metrics: [
      { label: 'Cloud Leakage', value: '0% (100% Local)' },
      { label: 'Automated Tests', value: '60+ Passed' },
      { label: 'Skill Retrieval', value: 'O(1) Caching' },
      { label: 'Architecture', value: '3-Tier Agent Army' }
    ],
    githubUrl: 'https://github.com/Udbhav7002/Local-Multi-Agent-Automation-Framework-with-UI'
  },
  {
    id: 'gcr-simplified',
    title: 'GCR Simplified — Desktop Grading & Plagiarism Engine',
    shortTitle: 'GCR Simplified',
    subtitle: 'Local-first, FERPA-compliant desktop application automating Google Classroom evaluation, peer plagiarism detection, and Excel reporting.',
    category: 'desktop-rust',
    categoryLabel: 'Rust & Desktop',
    status: 'released',
    statusLabel: 'Production Release v0.1.9',
    date: '2026',
    featured: true,
    summary: 'A cross-platform desktop power tool that compresses a 4-hour teacher grading workflow into 5 minutes through automated text extraction, handwriting AI grading, and offline plagiarism analysis.',
    description: 'Developed to eliminate the manual overhead educators face when grading dozens of submissions. Operates directly on top of Google Classroom via OAuth 2.0 PKCE. Features an offline peer-to-peer plagiarism engine combining the Winnowing algorithm (k-gram fingerprint hashing) and TF-IDF Cosine similarity. Integrates Google Gemini Vision to OCR and grade handwritten notebook photo submissions, exporting institutional 4-sheet .xlsx gradebooks.',
    highlights: [
      'Built with Rust 1.80+ and Tauri v2 backend, paired with React 19 and TypeScript frontend for lightweight, native execution.',
      'Offline intra-class plagiarism engine combining the Winnowing algorithm with TF-IDF Cosine similarity to catch verbatim and paraphrased copying.',
      'Instant identical file detection through SHA-256 binary hashing to catch renamed duplicate uploads.',
      'Multimodal evaluation engine utilizing Gemini Vision to accurately transcribe and grade handwritten photos.',
      'Generates institutional 4-sheet Excel gradebooks containing class statistics, grade sheets, integrity reports, and rubric feedback.',
      'Packaged and distributed cross-platform installers: macOS (.dmg Apple Silicon & Intel) and Windows (.msi).'
    ],
    architecture: {
      overview: 'Domain-Driven Design (DDD) with clean separation between Tauri Rust core (OAuth, document parsing, plagiarism engine, SQLite) and React 19 UI.',
      flow: [
        'Teacher signs in via Google OAuth 2.0 PKCE (credentials stored in system Keychain)',
        'Course roster and student submissions (PDF, DOCX, JPG) sync to local SQLite cache',
        'Extraction Pipeline extracts raw text and passes images to Gemini Vision API',
        'Plagiarism Engine generates rolling k-gram hash fingerprints (Winnowing) to compute peer similarity matrices',
        'AI Grading Engine evaluates rubrics and prepares suggested scores with override controls',
        'Export Service compiles full class metrics into multi-tab .xlsx spreadsheet'
      ],
      keyDecisions: [
        'Tauri v2 over Electron: Reduced binary footprint by 90% and memory footprint from ~800MB to under 45MB.',
        'Offline-First Plagiarism: Ensures student assignments never leave the local machine to third-party plagiarism databases.',
        'FERPA Compliance: Token authentication stored strictly in native OS encrypted credential vaults.'
      ]
    },
    techStack: {
      primary: 'Rust & Tauri v2',
      languages: ['Rust', 'TypeScript', 'SQL'],
      frameworks: ['Tauri v2', 'React 19', 'Tailwind CSS', 'Vite'],
      tools: ['SQLite', 'Google Gemini Vision', 'Cargo', 'Vitest']
    },
    metrics: [
      { label: 'Grading Workflow', value: '4 hrs -> 5 mins' },
      { label: 'Plagiarism Engine', value: 'Winnowing + TF-IDF' },
      { label: 'Binary Hashing', value: 'SHA-256' },
      { label: 'Cross-Platform', value: 'macOS & Windows' }
    ],
    githubUrl: 'https://github.com/Udbhav7002/GCR_Simplified',
    releaseUrl: 'https://github.com/Udbhav7002/GCR_Simplified/releases/tag/v0.1.9'
  },
  {
    id: 'linktomac',
    title: 'LinktoMac — Low-Latency Screen Mirroring & Control',
    shortTitle: 'LinktoMac',
    subtitle: 'Ultra-low latency (<2–5ms) wireless and USB screen mirroring and remote control system from Android 14+ to macOS.',
    category: 'systems-lowlatency',
    categoryLabel: 'Systems & Low-Latency',
    status: 'released',
    statusLabel: 'Production App & Releases',
    date: '2026',
    featured: true,
    stars: 1,
    summary: 'A high-performance Android-to-macOS bridge that streams high-framerate screens with sub-2ms latency over local Wi-Fi or USB ADB using hardware-accelerated HEVC pipelines.',
    description: 'Engineered from scratch to outperform existing commercial solutions (e.g. Scrcpy or commercial mirroring tools) on macOS. Built around a C++ mirror client leveraging Apple VideoToolbox for hardware HEVC decoding and SDL2/Metal for low-overhead rendering. Features bidirectional low-latency input event injection, zero-config mDNS device discovery, and 4-digit PIN pairing.',
    highlights: [
      'Sub-2ms to 5ms glass-to-glass latency utilizing Android MediaCodec (HEVC/H.265) hardware encoding over raw TCP sockets.',
      'Native C++ client implementing Apple VideoToolbox hardware-accelerated decoding and SDL2 Metal texture blitting.',
      'Bidirectional low-latency input injection protocol for touch gestures, multi-finger drag, scroll, and keyboard events via Android InputManager.',
      'Zero-configuration network discovery via mDNS / Zeroconf with 4-digit challenge-response PIN pairing.',
      'Supports dual transports: ultra-fast USB ADB mode and secure remote tunneling via Pinggy SSH tunnels.'
    ],
    architecture: {
      overview: 'Hybrid C++ and Java architecture decoupling video capture, network streaming, hardware decoding, and OS-level input injection.',
      flow: [
        'Android MediaProjection captures screen buffer -> feeds MediaCodec HEVC hardware encoder',
        'Compressed NAL units transmit over dedicated TCP socket (port 27189)',
        'macOS C++ mirror client receives packet stream -> parses Annex B frames via FFmpeg',
        'Apple VideoToolbox decodes frames directly into CVPixelBuffers on Apple Silicon GPU',
        'SDL2 / Metal surface renders frames at 60+ FPS with zero CPU copying overhead',
        'User mouse/keyboard events on Mac serialize to TCP socket (port 27190) -> Android InputManager injects events'
      ],
      keyDecisions: [
        'HEVC/H.265 over H.264: Delivers 40% higher compression efficiency at equivalent bitrates, preventing Wi-Fi packet drops.',
        'Apple VideoToolbox Hardware Pipeline: Replaced software FFmpeg decoding, dropping CPU utilization from 45% to <3%.',
        'mDNS Zero-Config: Eliminates the need for users to manually look up IP addresses on local networks.'
      ]
    },
    techStack: {
      primary: 'C++ & VideoToolbox',
      languages: ['C++', 'Java', 'Python'],
      frameworks: ['SDL2', 'FFmpeg', 'Apple VideoToolbox', 'Metal'],
      tools: ['Android SDK', 'CMake', 'ADB', 'mDNS/Zeroconf']
    },
    metrics: [
      { label: 'Video Latency', value: '<2–5 ms' },
      { label: 'Codec', value: 'HEVC / H.265' },
      { label: 'macOS CPU Usage', value: '<3%' },
      { label: 'Framerate', value: '60 FPS Solid' }
    ],
    githubUrl: 'https://github.com/Udbhav7002/LinktoMac',
    releaseUrl: 'https://github.com/Udbhav7002/LinktoMac/releases'
  },
  {
    id: 'air-control',
    title: 'Air Control — Spatial Hand Tracking & Cursor Engine',
    shortTitle: 'Air Control',
    subtitle: 'Apple Vision Pro-style spatial hand tracking and cursor control for macOS at 60 FPS using standard webcams.',
    category: 'vision-spatial',
    categoryLabel: 'Computer Vision',
    status: 'open-source',
    statusLabel: 'Open Source',
    date: '2026',
    featured: false,
    summary: 'A spatial computing interface that turns any standard webcam into a touchless cursor controller with sub-pixel precision and 3D depth pinch detection.',
    description: 'Formulated to solve common computer vision control flaws: hand-shake jitter and false clicks. Employs Google MediaPipe 3D hand landmarks, leveraging the Z-axis (depth) to eliminate false pinch triggers when turning the hand sideways. Features dynamic velocity exponential smoothing ("Sniper Mode") for sub-pixel precision and delta-offset kinematic compensation to lock cursor position during drag-and-drop.',
    highlights: [
      'Engineered true 3D pinch detection using spatial depth landmarks (Z-axis) to prevent 2D projection overlap false-triggers.',
      'Designed a dynamic velocity exponential smoothing filter ("Sniper Mode") that eliminates human hand-shake at low speeds while maintaining zero lag on fast gestures.',
      'Delta-offset kinematic compensation calculates vector offsets to keep cursor coordinates locked during pinch-to-drag actions.',
      'Native macOS Quartz / CoreGraphics event injection via PyObjC at solid 60 FPS.'
    ],
    architecture: {
      overview: 'Real-time OpenCV and MediaPipe processing pipeline injecting CoreGraphics system events into the macOS window server.',
      flow: [
        'Webcam video frame captured via OpenCV at 60 FPS',
        'Google MediaPipe Hand Landmarker computes 21 3D hand coordinates (X, Y, Z)',
        'Kinematic Filter checks index-thumb spatial Euclidean distance with Z-axis depth gating',
        'Exponential Velocity Filter calculates cursor displacement; triggers Sniper Mode smoothing at slow velocities',
        'macOS Quartz CoreGraphics dispatches synthetic mouse down, mouse up, and drag events'
      ],
      keyDecisions: [
        'Z-Axis True 3D Depth: Solved the fundamental limitation of 2D webcam gesture trackers.',
        'Exponential Smoothing over Kalman: Reduced compute overhead by 65% while delivering superior responsiveness for fine UI buttons.'
      ]
    },
    techStack: {
      primary: 'Python & MediaPipe',
      languages: ['Python'],
      frameworks: ['Google MediaPipe', 'OpenCV', 'macOS Quartz (PyObjC)'],
      tools: ['NumPy', 'CoreGraphics']
    },
    metrics: [
      { label: 'Tracking Speed', value: '60 FPS' },
      { label: 'Detection Space', value: 'True 3D (X, Y, Z)' },
      { label: 'Precision Filter', value: 'Sniper Smoothing' },
      { label: 'Hardware Needed', value: 'Any Standard Webcam' }
    ],
    githubUrl: 'https://github.com/Udbhav7002/Air_control'
  },
  {
    id: 'cyber-ai',
    title: 'Cyber AI — Agentic Local Cybersecurity Copilot',
    shortTitle: 'Cyber AI',
    subtitle: 'Pure-Python local cybersecurity copilot on Apple Silicon with curriculum MLX LoRA fine-tuning across 63k+ vulnerability records.',
    category: 'ai-agents',
    categoryLabel: 'AI & Local Agents',
    status: 'open-source',
    statusLabel: 'Research / Open Source',
    date: '2026',
    featured: false,
    summary: 'A privacy-first cybersecurity assistant engineered in pure Python to run on Apple Silicon unified memory without third-party agent wrapper frameworks.',
    description: 'Designed around strict ChatML formatting for DeepSeek-R1-Distill-Qwen-14B models. Features a two-phase curriculum LoRA fine-tuning pipeline on 63k+ vulnerability and threat reasoning records. Integrates long-term vector memory with ChromaDB cosine similarity and real-time CVE threat context injection via DuckDuckGo search.',
    highlights: [
      'Pure Python and Apple MLX orchestration without LangChain, LlamaIndex, or heavy external agent dependencies.',
      'Curriculum fine-tuning split into Phase 1 (10,000 code vulnerability records) and Phase 2 (53,000+ threat reasoning rows).',
      'Persistent long-term vector memory using local ChromaDB with cosine similarity to recall past vulnerability lessons.',
      'Real-time threat intelligence through integrated DuckDuckGo search context injection (/web command).'
    ],
    architecture: {
      overview: 'Lightweight agentic REPL streaming tokens directly from MLX LoRA adapters, augmented with ChromaDB vector memory and live web search routing.',
      flow: [
        'Interactive Ollama-style terminal REPL receives user prompt or CVE query',
        'Agent orchestrator checks for `/web` flag; queries DuckDuckGo for live threat advisories',
        'ChromaDB client retrieves cosine-similar security lessons from historical queries',
        'Prompt formatted with ChatML tokens (<|im_start|>) and injected with dynamic context',
        'Fine-tuned DeepSeek-R1 14B model streams tokens synchronously to stdout'
      ],
      keyDecisions: [
        'No Agent Frameworks: Avoided LangChain abstractions to optimize memory footprint on unified RAM.',
        'Curriculum Learning: Trained vulnerability classification prior to general threat reasoning for higher precision.'
      ]
    },
    techStack: {
      primary: 'Python & Apple MLX',
      languages: ['Python'],
      frameworks: ['MLX', 'ChromaDB', 'Pytest'],
      tools: ['DuckDuckGo DDGS', 'ChatML', 'Apple Silicon']
    },
    metrics: [
      { label: 'Training Data', value: '63,000+ Rows' },
      { label: 'Memory Search', value: 'ChromaDB Cosine' },
      { label: 'Framework Overhead', value: '0% (Pure Python)' },
      { label: 'Live Intel', value: 'Real-Time DDGS' }
    ]
  },
  {
    id: 'paper-trail',
    title: 'Paper Trail — Digital Life Forensics',
    shortTitle: 'Paper Trail',
    subtitle: 'Forensic analysis of 4,464 digital receipts transforming raw personal data into an interactive investigative narrative.',
    category: 'web-fullstack',
    categoryLabel: 'Full-Stack Web',
    status: 'hackathon-winner',
    statusLabel: 'WebRush Hackathon Project',
    date: '2026',
    featured: true,
    summary: 'A forensic web application built in under 6 hours for the WebRush hackathon, analyzing thousands of financial, music, and transit receipts to uncover human stories.',
    description: 'Constructed around Feature-Sliced Design principles, decoupling pure deterministic connection algorithms from the React 19 view layer. Features a deterministic connection scoring engine (same-day, location, shared tags), scroll-triggered storytelling chapters, and an insights analytics dashboard with WCAG AA compliance.',
    highlights: [
      'Built and shipped in under 6 hours for the WebRush frontend hackathon.',
      'Feature-Sliced Design architecture with 100% testable pure domain logic in features/.',
      'Deterministic relationship scoring engine connecting receipts across multiple dimensions with human-readable rationale.',
      'Zero external font dependencies; 100% WCAG AA contrast compliance and keyboard navigation.'
    ],
    architecture: {
      overview: 'Feature-Sliced Design with pure functional engine layers and Zustand centralized state management.',
      flow: [
        'Normalized 4,464 receipts into typed entity models',
        'Zustand store coordinates active view modes (Explore, Story, Insights, Connect)',
        'Connection engine scores relationship matrices using multi-variable weighting',
        'Framer Motion renders scroll-triggered story chapters and evidence links'
      ],
      keyDecisions: [
        'Feature-Sliced Architecture: Kept business logic completely decoupled from UI components.',
        'PWA Precaching: Instant offline reload with service worker precaching.'
      ]
    },
    techStack: {
      primary: 'React 19 & TypeScript',
      languages: ['TypeScript', 'CSS'],
      frameworks: ['React 19', 'Tailwind CSS v4', 'Zustand', 'Framer Motion'],
      tools: ['Vite', 'Vitest', 'Vercel']
    },
    metrics: [
      { label: 'Receipts Analyzed', value: '4,464' },
      { label: 'Build Duration', value: '<6 Hours' },
      { label: 'Test Suite', value: '12 Unit Tests' },
      { label: 'Accessibility', value: 'WCAG AA 100%' }
    ],
    githubUrl: 'https://github.com/Udbhav7002/paper-trail',
    liveDemoUrl: 'https://paper-trail-lilac.vercel.app/'
  },
  {
    id: 'lazybigreel',
    title: 'LazyBigReel — Remote Reel & Short Controller',
    shortTitle: 'LazyBigReel',
    subtitle: 'Zero-latency local WebSocket trackpad for Reels and Shorts with dual-haptic feedback.',
    category: 'systems-lowlatency',
    categoryLabel: 'Systems & Low-Latency',
    status: 'open-source',
    statusLabel: 'Open Source',
    date: '2026',
    featured: false,
    stars: 1,
    summary: 'Turns any smartphone into a zero-latency couch trackpad for scrolling Instagram Reels and YouTube Shorts on macOS displays.',
    description: 'Built for seamless hands-off media viewing over local Wi-Fi. Features custom React Native haptic vibration curves (light double-tap for next reel, heavy thud for previous reel), a pitch-black battery saver mode, and a double-clickable macOS startup script launching background servers and QR code pairings.',
    highlights: [
      'Sub-millisecond swipe delivery over local Socket.io WebSocket connections.',
      'Native Expo haptics delivering distinct tactile sensations for scroll directions.',
      'Battery-saving pitch-black display mode while watching the main monitor.',
      'Zero-configuration 1-click launch via custom macOS `.command` scripts.'
    ],
    architecture: {
      overview: 'Local socket bridge between mobile React Native touch listener and Node.js OS keyboard injector.',
      flow: [
        'Phone swipe gesture registered via React Native gesture handler',
        'Haptic engine fires directional vibration on mobile device',
        'Socket.io transmits swipe payload over local Wi-Fi',
        'Mac background server converts socket event into simulated keypress (Arrow Up / Down)'
      ],
      keyDecisions: [
        'React Native over Mobile Web: Safari blocks programmatic vibration APIs; native Expo ensured crisp haptic response.',
        'Local Sockets over Bluetooth: Avoided macOS Bluetooth pairing complexities.'
      ]
    },
    techStack: {
      primary: 'Node.js & React Native',
      languages: ['JavaScript', 'TypeScript'],
      frameworks: ['React Native', 'Expo', 'Socket.io', 'Express'],
      tools: ['Node.js', 'macOS Accessibility API']
    },
    metrics: [
      { label: 'Network Latency', value: 'Zero-Latency Sockets' },
      { label: 'Haptic Feedback', value: 'Dual Native Profiles' },
      { label: 'Pairing', value: 'Instant QR Scan' },
      { label: 'Configuration', value: '1-Click Launch' }
    ],
    githubUrl: 'https://github.com/Udbhav7002/LazyBigReel'
  }
];
