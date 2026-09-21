import React, { memo } from 'react';
import { 
  Bot, 
  Cpu, 
  Layers, 
  Eye, 
  Globe, 
  Calendar, 
  ArrowUpRight, 
  Star,
  ExternalLink
} from 'lucide-react';
import { Project, ProjectCategory } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  onClick?: (id: string) => void;
  isCompact?: boolean;
}

const CATEGORY_ICONS: Record<ProjectCategory, typeof Bot> = {
  all: Layers,
  'ai-agents': Bot,
  'systems-lowlatency': Cpu,
  'desktop-rust': Layers,
  'vision-spatial': Eye,
  'web-fullstack': Globe,
};

const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  all: 'bg-gray-100 text-gray-700',
  'ai-agents': 'bg-purple-50 text-purple-700 border-purple-200',
  'systems-lowlatency': 'bg-blue-50 text-blue-700 border-blue-200',
  'desktop-rust': 'bg-amber-50 text-amber-700 border-amber-200',
  'vision-spatial': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'web-fullstack': 'bg-rose-50 text-rose-700 border-rose-200',
};

export const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, onClick, isCompact = false }) => {
  const Icon = CATEGORY_ICONS[project.category] || Layers;
  const colorClass = CATEGORY_COLORS[project.category] || 'bg-gray-100 text-gray-700 border-gray-200';

  const cardContent = (
    <>
      <header className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded border transition-colors ${colorClass}`}>
            <Icon size={15} aria-hidden="true" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 font-mono">
            {project.categoryLabel}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          {project.stars && (
            <span className="flex items-center gap-0.5 text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <Star size={10} className="fill-amber-500" />
              {project.stars}
            </span>
          )}
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-mono border border-gray-200">
            {project.statusLabel}
          </span>
        </div>
      </header>

      <h3 className="text-base sm:text-lg font-black tracking-tight text-gray-950 mb-1 leading-snug group-hover:text-red-700 transition-colors">
        {project.title}
      </h3>

      <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
        {project.subtitle}
      </p>

      {/* Metrics Row */}
      {!isCompact && (
        <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-50/70 p-2.5 rounded border border-gray-200/80 font-mono text-[11px]">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-gray-600 font-bold">{m.label}</span>
              <span className="font-bold text-gray-900 truncate">{m.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tech Stack Chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
          {project.techStack.primary}
        </span>
        {project.techStack.languages.slice(0, 3).map((lang) => (
          <span key={lang} className="bg-gray-100 text-gray-700 border border-gray-200 px-1.5 py-0.5 rounded font-mono text-[10px]">
            {lang}
          </span>
        ))}
      </div>

      <footer className="pt-3 border-t border-dashed border-gray-300 flex items-center justify-between font-mono text-[11px] text-gray-600 mt-auto">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} aria-hidden="true" />
          <span>{project.date}</span>
        </div>
        <div className="flex items-center gap-1 text-red-700 font-bold group-hover:translate-x-0.5 transition-transform">
          <span>Dossier</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </div>
      </footer>
    </>
  );

  const baseClasses =
    'w-full text-left bg-[#fdfbf7] border-2 border-dashed border-gray-300 p-5 font-mono text-gray-900 rounded-sm relative overflow-hidden transition-all duration-200 flex flex-col justify-between';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={() => onClick(project.id)}
        className={`${baseClasses} cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2`}
        aria-label={`Open dossier for ${project.title}`}
      >
        {cardContent}
      </button>
    );
  }

  return <article className={baseClasses}>{cardContent}</article>;
});
