import React, { lazy, Suspense } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { 
  LayoutGrid, 
  Network, 
  BookOpen, 
  BarChart3, 
  Fingerprint, 
  FileText, 
  Sparkles,
  Mail
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../../shared/ui/Icons';
import { fireConfetti } from '../../shared/utils/confetti';
import { useStore, ViewMode } from '../../shared/store/useStore';
import { BIO } from '../../data/bio';
import { ResumeModal } from '../../shared/ui/ResumeModal';

// Lazy load view widgets
const Dossier = lazy(() => import('../../widgets/dossier').then((m) => ({ default: m.Dossier })));
const ProjectDetail = lazy(() => import('../../widgets/project-detail').then((m) => ({ default: m.ProjectDetail })));
const Narrative = lazy(() => import('../../widgets/narrative').then((m) => ({ default: m.Narrative })));
const Metrics = lazy(() => import('../../widgets/metrics').then((m) => ({ default: m.Metrics })));

const NAV_ITEMS: { view: ViewMode; icon: typeof LayoutGrid; label: string; alwaysEnabled: boolean }[] = [
  { view: 'explore', icon: LayoutGrid, label: 'Dossier', alwaysEnabled: true },
  { view: 'story', icon: BookOpen, label: 'Story', alwaysEnabled: true },
  { view: 'insights', icon: BarChart3, label: 'Insights', alwaysEnabled: true },
  { view: 'connect', icon: Network, label: 'Connect', alwaysEnabled: false },
];

export const HomePage: React.FC = () => {
  const { 
    activeView, 
    setView, 
    viewedProjectIds, 
    selectRandomProject,
    isResumeModalOpen,
    setResumeModalOpen 
  } = useStore();

  const discoveredCount = Object.keys(viewedProjectIds).length;

  const handleSurprise = () => {
    fireConfetti({
      particleCount: 50,
      colors: ['#b91c1c', '#111827', '#f4f1ea']
    });
    selectRandomProject();
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-gray-900 selection:bg-red-200 selection:text-red-900 overflow-x-hidden flex flex-col justify-between font-mono">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-gray-900 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Header Bar */}
      <div>
        <header className="max-w-6xl mx-auto pt-8 px-4 sm:px-8 mb-6 border-b-4 border-gray-900 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-red-700 font-bold">
                Production Dossier · Verified Architecture
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-gray-950">
              {BIO.name}
            </h1>
            <p className="text-xs text-gray-600 mt-1 max-w-xl leading-relaxed">
              {BIO.tagline} · SRM IST (AI & ML)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
            {/* Surprise Me Button */}
            <button 
              onClick={handleSurprise}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-1.5 shadow-sm rounded-sm min-h-[36px]"
              aria-label="Discover a random project architecture"
            >
              <Sparkles size={13} />
              <span>Surprise me</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => setResumeModalOpen(true)}
              className="px-3 py-2 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-mono text-[11px] uppercase tracking-widest transition-colors flex items-center gap-1.5 shadow-sm rounded-sm min-h-[36px]"
              aria-label="Open verified resume"
            >
              <FileText size={13} />
              <span>Resume</span>
            </button>

            {/* Discovered Counter */}
            <div 
              className="hidden sm:flex items-center gap-1.5 bg-red-50 border border-red-200 px-3 py-2 font-mono text-xs text-red-700 rounded-sm"
              aria-live="polite"
            >
              <Fingerprint size={14} />
              <span className="font-bold">{discoveredCount}</span>
              <span className="text-[10px] uppercase tracking-wider">Inspected</span>
            </div>

            {/* View Navigation Switcher */}
            <nav aria-label="View modes navigation">
              <div className="flex items-center gap-1 bg-gray-200 p-1 rounded-sm shadow-inner">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeView === item.view;
                  const isDisabled = !item.alwaysEnabled && !isActive;
                  return (
                    <button
                      key={item.view}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => !isDisabled && setView(item.view)}
                      disabled={isDisabled}
                      className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors rounded-sm min-h-[32px] ${
                        isActive
                          ? 'bg-gray-900 text-white shadow-md'
                          : isDisabled
                          ? 'text-gray-400 cursor-not-allowed opacity-40'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-300'
                      }`}
                      title={isDisabled ? 'Select a project to inspect connections' : ''}
                    >
                      <item.icon size={13} aria-hidden="true" />
                      <span className="hidden sm:inline">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <MotionConfig reducedMotion="user">
          <main id="main-content" className="px-4 sm:px-8">
            <Suspense fallback={<div className="py-24 text-center font-mono text-gray-500 text-xs uppercase tracking-widest animate-pulse">Decrypting system dossier…</div>}>
              <AnimatePresence mode="wait">
                {activeView === 'explore' && <Dossier key="dossier" />}
                {activeView === 'connect' && <ProjectDetail key="detail" />}
                {activeView === 'story' && <Narrative key="story" />}
                {activeView === 'insights' && <Metrics key="metrics" />}
              </AnimatePresence>
            </Suspense>
          </main>
        </MotionConfig>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 mt-16 border-t-2 border-dashed border-gray-300">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-mono">
          <div className="flex items-center gap-4">
            <a 
              href={BIO.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-red-700 transition-colors"
            >
              <GithubIcon size={14} />
              <span>github.com/Udbhav7002</span>
            </a>
            <a 
              href={BIO.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-red-700 transition-colors"
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
            </a>
            <a 
              href={`mailto:${BIO.email}`} 
              className="flex items-center gap-1.5 hover:text-red-700 transition-colors"
            >
              <Mail size={14} />
              <span>{BIO.email}</span>
            </a>
          </div>

          <div className="text-gray-500 text-[11px] text-center sm:text-right">
            Designed with Paper Trail Aesthetic · React 19 · TypeScript · Tailwind CSS v4 · Vercel
          </div>
        </div>
      </footer>

      {/* Interactive Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setResumeModalOpen(false)} 
      />
    </div>
  );
};
