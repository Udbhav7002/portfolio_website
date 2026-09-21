import React from 'react';
import { BookOpen, Calendar, ArrowRight, Quote, CheckCircle } from 'lucide-react';
import { STORY_CHAPTERS, StoryChapter } from '../../data/story';
import { useStore } from '../../shared/store/useStore';

export const Narrative: React.FC = () => {
  const { setSelectedProject } = useStore();

  return (
    <div className="w-full max-w-4xl mx-auto font-mono pb-16">
      {/* Header Docket */}
      <section className="border-b-4 border-gray-900 pb-6 mb-12">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={18} className="text-red-700" />
          <span className="text-xs uppercase tracking-widest font-bold text-gray-500">
            Chronological Archive · Forensic Narrative
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-gray-950 mb-2">
          The Engineering Evolution
        </h1>
        <p className="text-sm text-gray-600 font-sans max-w-2xl leading-relaxed">
          How foundational C++ systems, local LLM orchestration, Rust desktop engineering, and hardware-accelerated video streaming synthesized into a unified engineering philosophy.
        </p>
      </section>

      {/* Chapters Timeline */}
      <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 before:w-0.5 before:bg-gray-300 before:border-l before:border-dashed before:border-gray-400">
        {STORY_CHAPTERS.map((chapter: StoryChapter) => (
          <article 
            key={chapter.id}
            className="relative pl-10 sm:pl-16 group"
          >
            {/* Chapter Circle Badge */}
            <div className="absolute left-1.5 sm:left-3.5 top-0 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold shadow-md border-2 border-[#f4f1ea] group-hover:bg-red-600 transition-colors">
              {chapter.chapterNumber}
            </div>

            {/* Chapter Card */}
            <div className="bg-[#fdfbf7] border-2 border-dashed border-gray-300 p-6 sm:p-8 rounded-sm shadow-sm hover:border-gray-900 transition-all">
              {/* Timeline meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-300 pb-3 mb-4">
                <span className="text-[11px] font-bold text-red-700 uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>{chapter.period}</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                  Chapter {chapter.chapterNumber} of 04
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-950 mb-1">
                {chapter.title}
              </h2>
              <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-6">
                {chapter.subtitle}
              </h3>

              {/* Narrative Text */}
              <div className="space-y-4 text-xs sm:text-sm font-sans text-gray-800 leading-relaxed mb-6">
                {chapter.narrative.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Quote */}
              {chapter.quote && (
                <div className="bg-red-50/60 border-l-4 border-red-700 p-4 rounded-r text-xs sm:text-sm font-serif italic text-gray-800 mb-6 flex items-start gap-2">
                  <Quote size={16} className="text-red-700 shrink-0 mt-0.5" />
                  <span>"{chapter.quote}"</span>
                </div>
              )}

              {/* Milestones */}
              <div className="border-t border-dashed border-gray-300 pt-4 mb-4">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">
                  Technical Milestones Achieved
                </h4>
                <ul className="space-y-1.5 text-xs font-sans text-gray-700">
                  {chapter.keyMilestones.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deep Link to Project */}
              {chapter.featuredProjectId && (
                <div className="pt-3 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(chapter.featuredProjectId!)}
                    className="flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-black transition-colors"
                  >
                    <span>Inspect Featured Architecture in Dossier</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
