export interface StoryChapter {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  period: string;
  narrative: string[];
  keyMilestones: string[];
  featuredProjectId?: string;
  quote?: string;
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter-1',
    chapterNumber: '01',
    title: 'The Core Foundation: Low-Level Systems & Algorithmic Rigor',
    subtitle: 'From Data Structures to Native Systems Engineering',
    period: 'Foundations · 2024–2025',
    narrative: [
      'My engineering journey began not at the surface of web frameworks, but in the trenches of C++, Java, and Object-Oriented systems architecture.',
      'Understanding memory allocation, data structure trade-offs, and operating system scheduling laid the bedrock. I spent months obsessing over cache lines, pointers, and STL containers, ensuring that every byte and cycle was accounted for.',
      'This foundational discipline shaped my philosophy: write software that is fast, deterministic, and respectful of hardware resources.'
    ],
    keyMilestones: [
      'Mastered core Data Structures & Algorithms, discrete mathematics, and computer architecture at SRM IST.',
      'Built high-performance console data processors in modern C++ with custom sanitization pipelines.',
      'Engineered embedded microcontrollers (Arduino UNO) with real-time analog sensor acquisition.'
    ],
    quote: 'True speed is not about optimizing later; it is about building with respect for the metal from day one.'
  },
  {
    id: 'chapter-2',
    chapterNumber: '02',
    title: 'The AI Expansion: Autonomous Local Agents & Fast-Path Loops',
    subtitle: 'Breaking Free from Cloud APIs with Local Models',
    period: 'Exploration · Early 2026',
    narrative: [
      'As cloud LLMs exploded in popularity, I grew dissatisfied with high latency, vendor lock-in, and privacy leakage. I wanted autonomy—AI running directly on my own machine.',
      'I architected the Local Multi-Agent Automation Framework, designing a 3-tier Agent Army (Manager, Worker, Vision) coordinated by local Ollama models. To solve the brittleness of early AI agents, I engineered an interactive fast-path self-correction loop that feeds error diagnostics and OCR screen state back to the model in real-time.',
      'Simultaneously, I tackled local MLX fine-tuning with Cyber AI on Apple Silicon, training LoRA adapters across 63,000+ vulnerability records.'
    ],
    keyMilestones: [
      'Built the Local Multi-Agent Automation Framework with 100% local Ollama inference and zero cloud telemetry.',
      'Created SQLite persistent job tracking with asynchronous FastAPI endpoints and 60+ pytest integration tests.',
      'Curriculum LoRA fine-tuning on Apple Silicon unified memory with MLX and ChromaDB vector retrieval.'
    ],
    featuredProjectId: 'local-multi-agent',
    quote: 'Autonomous agents must be self-correcting. Blind retries are useless; contextual error feedback is intelligence.'
  },
  {
    id: 'chapter-3',
    chapterNumber: '03',
    title: 'The Desktop Shift: Rust, Tauri v2 & Algorithmic Plagiarism',
    subtitle: 'Bringing Native Performance & Domain-Driven Design to Educators',
    period: 'Refinement · Mid 2026',
    narrative: [
      'Watching educators spend hundreds of hours manually checking assignments and grading photos inspired GCR Simplified. I wanted a desktop power tool that felt instantaneous.',
      'I chose Rust 1.80+ and Tauri v2, discarding the bloated Electron paradigm. The result was a native 45MB application that downloads student submissions, processes handwritten homework through Gemini Vision, and exports institutional 4-sheet Excel workbooks.',
      'For academic integrity, I built an offline peer-to-peer plagiarism engine combining the Winnowing algorithm (k-gram rolling hashes) and TF-IDF Cosine similarity. Students never had to leave Google Classroom, and teachers reclaimed their weekends.'
    ],
    keyMilestones: [
      'Engineered and shipped GCR Simplified v0.1.9 across macOS (.dmg) and Windows (.msi).',
      'Implemented offline Winnowing fingerprint hashing and SHA-256 binary duplicate file detection.',
      'Secured credentials through native OS Keychain and Credential Manager for 100% FERPA compliance.'
    ],
    featuredProjectId: 'gcr-simplified',
    quote: 'The best software does not ask users to change their habits; it sits seamlessly on top of their existing workflows.'
  },
  {
    id: 'chapter-4',
    chapterNumber: '04',
    title: 'The Speed Frontier: Hardware-Accelerated Low Latency',
    subtitle: 'Sub-2ms Mirroring & Spatial Computing Interfaces',
    period: 'Peak Engineering · Late 2026',
    narrative: [
      'My latest engineering pursuits pushed straight into low-latency multimedia systems and spatial computing.',
      'Frustrated by laggy commercial phone mirroring tools, I built LinktoMac: an ultra-low latency (<2–5ms) bridge from Android to macOS. By pairing Android MediaCodec (HEVC/H.265) hardware encoding with Apple VideoToolbox hardware GPU decoding in C++, CPU utilization dropped below 3% at a flawless 60 FPS.',
      'In parallel, I developed Air Control, using MediaPipe 3D Z-axis hand depth and exponential velocity smoothing ("Sniper Mode") to turn any standard webcam into an Apple Vision Pro-style spatial cursor.'
    ],
    keyMilestones: [
      'Achieved glass-to-glass sub-2ms latency over local TCP sockets with Apple VideoToolbox & SDL2 Metal rendering.',
      'Implemented bidirectional gesture and keyboard input injection via Android InputManager.',
      'Built 3D spatial pinch detection eliminating false-clicks with custom kinematic smoothing filters.'
    ],
    featuredProjectId: 'linktomac',
    quote: 'When latency drops below 5 milliseconds, the technology disappears and the experience becomes magical.'
  }
];
