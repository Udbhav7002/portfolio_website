import { PROJECTS, Project } from '../../data/projects';

export interface LanguageStat {
  language: string;
  projectCount: number;
  percentage: number;
  color: string;
}

export interface DomainStat {
  domain: string;
  count: number;
  description: string;
}

export interface PortfolioInsights {
  totalProjects: number;
  featuredCount: number;
  languages: LanguageStat[];
  domains: DomainStat[];
  keyHighlights: { label: string; value: string; desc: string }[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  python: '#3572A5',
  rust: '#dea584',
  'c++': '#f34b7d',
  java: '#b07219',
  typescript: '#3178c6',
  sql: '#e38c00',
  javascript: '#f1e05a',
};

export function computePortfolioInsights(projects: Project[] = PROJECTS): PortfolioInsights {
  const langCount: Record<string, number> = {};
  let totalLangMentions = 0;

  for (const p of projects) {
    for (const lang of p.techStack.languages) {
      const normalized = lang.toLowerCase();
      langCount[normalized] = (langCount[normalized] || 0) + 1;
      totalLangMentions++;
    }
  }

  const languages: LanguageStat[] = Object.entries(langCount)
    .map(([lang, count]) => {
      const display =
        lang === 'c++'
          ? 'C++'
          : lang === 'sql'
          ? 'SQL'
          : lang.charAt(0).toUpperCase() + lang.slice(1);
      return {
        language: display,
        projectCount: count,
        percentage: Math.round((count / totalLangMentions) * 100),
        color: LANGUAGE_COLORS[lang] || '#6b7280',
      };
    })
    .sort((a, b) => b.projectCount - a.projectCount);

  const domainCount: Record<string, { count: number; desc: string }> = {
    'AI & Local Agents': { count: 0, desc: 'Local Ollama orchestration, fast-path loops & LoRA fine-tuning' },
    'Low-Latency Systems': { count: 0, desc: 'Hardware-accelerated HEVC streaming, Apple VideoToolbox & sockets' },
    'Rust Desktop Engineering': { count: 0, desc: 'Tauri v2 native architecture, Winnowing hashing & offline speed' },
    'Computer Vision & Spatial': { count: 0, desc: 'MediaPipe 3D hand tracking, 60 FPS CoreGraphics cursor control' },
    'Full-Stack & Web Performance': { count: 0, desc: 'React 19, Feature-Sliced Design, Tailwind v4 & Zustand' },
  };

  for (const p of projects) {
    if (p.category === 'ai-agents') domainCount['AI & Local Agents'].count++;
    if (p.category === 'systems-lowlatency') domainCount['Low-Latency Systems'].count++;
    if (p.category === 'desktop-rust') domainCount['Rust Desktop Engineering'].count++;
    if (p.category === 'vision-spatial') domainCount['Computer Vision & Spatial'].count++;
    if (p.category === 'web-fullstack') domainCount['Full-Stack Web Performance'].count++;
  }

  const domains: DomainStat[] = Object.entries(domainCount).map(([domain, data]) => ({
    domain,
    count: data.count,
    description: data.desc,
  }));

  const keyHighlights = [
    { label: 'Latency Benchmark', value: '<2–5 ms', desc: 'Glass-to-glass wireless screen mirroring' },
    { label: 'Local AI Privacy', value: '100% Offline', desc: 'Zero cloud telemetry or third-party leakage' },
    { label: 'Frame Rate', value: '60 FPS Solid', desc: 'Hardware-accelerated VideoToolbox & MediaPipe' },
    { label: 'Algorithmic Rigor', value: 'Winnowing', desc: 'Intra-class plagiarism fingerprint hashing' },
  ];

  return {
    totalProjects: projects.length,
    featuredCount: projects.filter((p) => p.featured).length,
    languages,
    domains,
    keyHighlights,
  };
}
