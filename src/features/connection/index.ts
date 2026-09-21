import { Project } from '../../data/projects';

export interface ProjectConnection {
  targetProject: Project;
  score: number;
  reasons: string[];
  sharedTags: string[];
}

export function findProjectConnections(source: Project, allProjects: Project[]): ProjectConnection[] {
  const connections: ProjectConnection[] = [];

  const sourceTech = new Set([
    ...source.techStack.languages.map((l) => l.toLowerCase()),
    ...source.techStack.frameworks.map((f) => f.toLowerCase()),
    ...source.techStack.tools.map((t) => t.toLowerCase()),
  ]);

  for (const other of allProjects) {
    if (other.id === source.id) continue;

    let score = 0;
    const reasons: string[] = [];
    const sharedTags: string[] = [];

    // Category synergy
    if (other.category === source.category) {
      score += 4;
      reasons.push(`Same architectural domain (${source.categoryLabel})`);
    }

    // Compare languages
    for (const lang of other.techStack.languages) {
      if (sourceTech.has(lang.toLowerCase())) {
        score += 3;
        sharedTags.push(lang);
        reasons.push(`Shared language stack: ${lang}`);
      }
    }

    // Compare frameworks
    for (const fw of other.techStack.frameworks) {
      if (sourceTech.has(fw.toLowerCase())) {
        score += 3;
        sharedTags.push(fw);
        reasons.push(`Shared runtime/framework: ${fw}`);
      }
    }

    // Compare tools
    for (const tool of other.techStack.tools) {
      if (sourceTech.has(tool.toLowerCase())) {
        score += 2;
        sharedTags.push(tool);
        reasons.push(`Shared toolchain: ${tool}`);
      }
    }

    // Local / privacy alignment
    if (
      (source.id === 'local-multi-agent' || source.id === 'gcr-simplified' || source.id === 'cyber-ai') &&
      (other.id === 'local-multi-agent' || other.id === 'gcr-simplified' || other.id === 'cyber-ai')
    ) {
      score += 2;
      reasons.push('Aligned local-first & privacy-first architectural paradigm');
    }

    // Low latency alignment
    if (
      (source.id === 'linktomac' || source.id === 'air-control' || source.id === 'lazybigreel') &&
      (other.id === 'linktomac' || other.id === 'air-control' || other.id === 'lazybigreel')
    ) {
      score += 2;
      reasons.push('Aligned ultra-low latency & real-time responsiveness goal');
    }

    if (score > 0) {
      connections.push({
        targetProject: other,
        score,
        reasons,
        sharedTags: Array.from(new Set(sharedTags)),
      });
    }
  }

  return connections.sort((a, b) => b.score - a.score);
}
