import React, { useMemo } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Download, 
  GitFork, 
  Network, 
  Layers, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { GithubIcon } from '../../shared/ui/Icons';
import { useStore } from '../../shared/store/useStore';
import { findProjectConnections } from '../../features/connection';
import { ProjectCard } from '../../shared/ui/ProjectCard';

export const ProjectDetail: React.FC = () => {
  const { projects, selectedProjectId, setSelectedProject, setView } = useStore();

  const currentProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  const connections = useMemo(() => {
    return findProjectConnections(currentProject, projects);
  }, [currentProject, projects]);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col font-mono pb-12">
      {/* Back Navigation */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-gray-300 pb-4 mb-8">
        <button
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-900 text-xs font-bold uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors rounded-sm shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Dossier</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>System ID:</span>
          <code className="bg-gray-200 px-2 py-0.5 rounded text-gray-800 font-bold">
            {currentProject.id}
          </code>
        </div>
      </div>

      {/* Main Project Dossier */}
      <article className="bg-[#fdfbf7] border-4 border-gray-900 p-6 md:p-10 shadow-lg rounded-sm mb-12">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-gray-900 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-red-600 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-xs">
                {currentProject.categoryLabel}
              </span>
              <span className="bg-gray-200 text-gray-800 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-xs">
                {currentProject.statusLabel}
              </span>
              <span className="text-gray-500 text-xs font-bold">
                · {currentProject.date}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-gray-950">
              {currentProject.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-700 mt-1 max-w-3xl leading-relaxed">
              {currentProject.subtitle}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            {currentProject.githubUrl && (
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-sm"
              >
                <GithubIcon size={14} />
                <span>Source Code</span>
                <ExternalLink size={11} className="opacity-70" />
              </a>
            )}
            {currentProject.liveDemoUrl && (
              <a
                href={currentProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-sm"
              >
                <ExternalLink size={14} />
                <span>Live Deployment</span>
              </a>
            )}
            {currentProject.releaseUrl && (
              <a
                href={currentProject.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-sm"
              >
                <Download size={14} />
                <span>Download Release</span>
              </a>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {currentProject.metrics.map((m, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-300 p-3 rounded-sm shadow-xs">
              <span className="text-[10px] uppercase tracking-wider text-gray-600 block font-bold">
                {m.label}
              </span>
              <span className="text-lg font-black text-gray-950 mt-0.5 block">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left 2 Cols: Deep Summary & Highlights */}
          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 border-b border-gray-300 pb-1 mb-3">
                System Overview & Engineering Scope
              </h2>
              <p className="text-sm text-gray-800 leading-relaxed font-sans">
                {currentProject.description}
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600 border-b border-gray-300 pb-1 mb-3">
                Key Engineering Highlights
              </h2>
              <ul className="space-y-2 text-xs font-sans text-gray-800">
                {currentProject.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-red-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Col: Technical Stack Card */}
          <div className="bg-white border-2 border-dashed border-gray-400 p-5 rounded-sm h-fit">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-900 pb-2 mb-4 flex items-center gap-2">
              <Code2 size={16} />
              <span>Full Tech Stack</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-600 block mb-1">Languages</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.techStack.languages.map((l) => (
                    <span key={l} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 text-[11px] font-bold">
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-600 block mb-1">Frameworks & Runtime</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.techStack.frameworks.map((f) => (
                    <span key={f} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 text-[11px]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-600 block mb-1">Tools & Platforms</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.techStack.tools.map((t) => (
                    <span key={t} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-300 text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture & Execution Flow */}
        <section className="border-t-2 border-dashed border-gray-300 pt-6 mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2 mb-3">
            <Cpu size={16} className="text-red-700" />
            <span>Architecture & Data Pipeline</span>
          </h2>
          <p className="text-xs text-gray-600 font-sans mb-4">
            {currentProject.architecture.overview}
          </p>

          <div className="bg-gray-950 text-gray-100 p-5 rounded-sm border-2 border-gray-900 text-xs font-mono space-y-2 overflow-x-auto shadow-inner">
            <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-800 pb-1">
              Deterministic Execution Pipeline
            </div>
            {currentProject.architecture.flow.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0">{String(idx + 1).padStart(2, '0')}.</span>
                <span className="text-gray-300">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Architectural Trade-offs & Decisions */}
        <section className="border-t-2 border-dashed border-gray-300 pt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2 mb-3">
            <ShieldCheck size={16} className="text-emerald-700" />
            <span>Core Architectural Trade-offs & Decisions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentProject.architecture.keyDecisions.map((decision, idx) => (
              <div key={idx} className="bg-white border border-gray-300 p-3.5 rounded-sm font-sans text-xs text-gray-800 shadow-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-red-700 block mb-1">
                  Design Decision #{idx + 1}
                </span>
                {decision}
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* Connected Systems / Relationship Matrix */}
      <section className="border-t-4 border-gray-900 pt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950 flex items-center gap-2">
              <Network size={22} className="text-red-700" />
              <span>Interconnected Systems Matrix</span>
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Deterministic architectural and technology overlap between <strong className="text-gray-900">{currentProject.shortTitle}</strong> and other portfolio systems.
            </p>
          </div>
          <span className="text-xs font-mono bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-sm font-bold">
            {connections.length} Synergistic Systems Found
          </span>
        </div>

        {/* Connection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((conn) => (
            <div 
              key={conn.targetProject.id} 
              className="flex flex-col bg-white border-2 border-gray-300 p-5 rounded-sm shadow-sm hover:border-gray-900 transition-colors"
            >
              {/* Strength Meter */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-gray-900">Affinity Score: {conn.score}/10</span>
                <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-red-600 h-full rounded-full"
                    style={{ width: `${Math.min(100, conn.score * 10)}%` }}
                  />
                </div>
              </div>

              {/* Target Project Card Summary */}
              <div className="mb-4">
                <h3 className="text-base font-bold text-gray-950 hover:text-red-700 transition-colors mb-1">
                  {conn.targetProject.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {conn.targetProject.subtitle}
                </p>
              </div>

              {/* Reasons List */}
              <div className="bg-gray-50 p-2.5 rounded border border-gray-200 text-[11px] mb-4 space-y-1">
                <span className="text-[9px] uppercase font-bold text-gray-600 block">Connection Evidence:</span>
                {conn.reasons.slice(0, 3).map((r, i) => (
                  <div key={i} className="text-gray-700 truncate">
                    • {r}
                  </div>
                ))}
              </div>

              {/* Action */}
              <button
                onClick={() => setSelectedProject(conn.targetProject.id)}
                className="mt-auto w-full py-1.5 bg-gray-900 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors text-center"
              >
                Inspect This System
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
