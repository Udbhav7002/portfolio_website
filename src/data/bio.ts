export interface SkillCategory {
  title: string;
  skills: { name: string; level: string; highlight?: boolean }[];
}

export const BIO = {
  name: 'Udbhav Sanagari',
  handle: 'Udbhav7002',
  tagline: 'Systems Engineer · AI Researcher · Full-Stack Builder',
  summary: 'Computer Science and AI/ML undergraduate specializing in local LLM orchestration, native systems programming (C++, Rust), low-latency multimedia pipelines, and high-performance desktop architectures.',
  email: 'sanagariudbhav@gmail.com',
  github: 'https://github.com/Udbhav7002',
  linkedin: 'https://linkedin.com/in/udbhav-sanagari-926520374/',
  location: 'Kattankulathur, India',
  university: 'SRM Institute of Science and Technology',
  degree: 'Bachelor of Technology in Computer Science and Engineering (AI & ML)',
  gradYear: 'Expected May 2029',
  resumeUrl: '/resume.pdf',
  certifications: [
    {
      name: 'Claude Code 101',
      issuer: 'Anthropic',
      description: 'Advanced code generation, prompt architecture, and agentic problem solving.'
    }
  ],
  skills: [
    {
      title: 'Languages',
      skills: [
        { name: 'Python', level: 'Advanced', highlight: true },
        { name: 'C++', level: 'Advanced', highlight: true },
        { name: 'Rust', level: 'Proficient', highlight: true },
        { name: 'Java', level: 'Proficient' },
        { name: 'TypeScript', level: 'Advanced', highlight: true },
        { name: 'SQL', level: 'Proficient' },
        { name: 'Bash', level: 'Working' }
      ]
    },
    {
      title: 'Frameworks & Systems',
      skills: [
        { name: 'FastAPI', level: 'Advanced', highlight: true },
        { name: 'Tauri v2', level: 'Advanced', highlight: true },
        { name: 'React 19', level: 'Advanced', highlight: true },
        { name: 'Asyncio', level: 'Advanced' },
        { name: 'ChromaDB', level: 'Advanced', highlight: true },
        { name: 'Apple VideoToolbox', level: 'Proficient', highlight: true },
        { name: 'SDL2 & Metal', level: 'Proficient' },
        { name: 'FFmpeg', level: 'Proficient' },
        { name: 'Tailwind CSS v4', level: 'Advanced' },
        { name: 'PyTorch & MLX', level: 'Working' }
      ]
    },
    {
      title: 'Tools & Infrastructure',
      skills: [
        { name: 'Git & GitHub', level: 'Advanced' },
        { name: 'Docker', level: 'Proficient' },
        { name: 'Linux / POSIX', level: 'Advanced' },
        { name: 'Ollama', level: 'Advanced', highlight: true },
        { name: 'Android SDK & ADB', level: 'Proficient', highlight: true },
        { name: 'CMake', level: 'Working' },
        { name: 'SQLite', level: 'Advanced' },
        { name: 'Pytest & Vitest', level: 'Advanced' }
      ]
    }
  ]
};
