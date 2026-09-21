import React, { useMemo } from 'react';
import { 
  BarChart3, 
  Code, 
  Layers, 
  Award, 
  GraduationCap, 
  Flame, 
  Terminal, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';
import { useStore } from '../../shared/store/useStore';
import { computePortfolioInsights } from '../../features/insights';
import { BIO } from '../../data/bio';

export const Metrics: React.FC = () => {
  const { projects, setSelectedProject } = useStore();
  const insights = useMemo(() => computePortfolioInsights(projects), [projects]);

  return (
    <div className="w-full max-w-6xl mx-auto font-mono pb-16">
      {/* Header */}
      <section className="border-b-4 border-gray-900 pb-6 mb-10">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 size={18} className="text-red-700" />
          <span className="text-xs uppercase tracking-widest font-bold text-gray-500">
            System Telemetry · Engineering Intelligence
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-gray-950 mb-2">
          Insights & Metrics
        </h1>
        <p className="text-sm text-gray-600 font-sans max-w-2xl leading-relaxed">
          Quantitative telemetry across languages, architectural paradigms, and performance benchmarks across Udbhav's software catalog.
        </p>
      </section>

      {/* Benchmark Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {insights.keyHighlights.map((h, i) => (
          <div 
            key={i} 
            className="bg-[#fdfbf7] border-2 border-gray-900 p-4 rounded-sm shadow-xs flex flex-col justify-between"
          >
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
              {h.label}
            </span>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-black text-gray-950">
                {h.value}
              </span>
            </div>
            <span className="text-[11px] font-sans text-gray-600 leading-tight">
              {h.desc}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Language Distribution */}
        <section className="bg-white border-2 border-dashed border-gray-300 p-6 rounded-sm shadow-xs">
          <div className="flex items-center justify-between border-b-2 border-gray-900 pb-3 mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <Code size={16} className="text-red-700" />
              <span>Language Distribution</span>
            </h2>
            <span className="text-xs text-gray-500">{insights.languages.length} Core Languages</span>
          </div>

          <div className="space-y-4">
            {insights.languages.map((l) => (
              <div key={l.language}>
                <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                  <span className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: l.color }}
                    />
                    <span>{l.language}</span>
                  </span>
                  <span className="text-gray-500">
                    {l.projectCount} {l.projectCount === 1 ? 'system' : 'systems'} ({l.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${l.percentage}%`, backgroundColor: l.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architectural Domains */}
        <section className="bg-white border-2 border-dashed border-gray-300 p-6 rounded-sm shadow-xs">
          <div className="flex items-center justify-between border-b-2 border-gray-900 pb-3 mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <Layers size={16} className="text-red-700" />
              <span>Architectural Domains</span>
            </h2>
            <span className="text-xs text-gray-500">5 Distinct Pillars</span>
          </div>

          <div className="space-y-3">
            {insights.domains.map((d) => (
              <div key={d.domain} className="p-3 bg-gray-50 rounded border border-gray-200">
                <div className="flex justify-between items-center text-xs font-bold text-gray-950 mb-0.5">
                  <span>{d.domain}</span>
                  <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-[10px]">
                    {d.count} {d.count === 1 ? 'System' : 'Systems'}
                  </span>
                </div>
                <p className="text-[11px] font-sans text-gray-600">{d.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Academic Background & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        <section className="bg-[#fdfbf7] border-2 border-gray-900 p-6 rounded-sm shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2 border-b-2 border-gray-900 pb-3 mb-4">
            <GraduationCap size={17} className="text-red-700" />
            <span>Academic Credential</span>
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline font-bold text-sm text-gray-950">
              <span>{BIO.university}</span>
              <span className="text-xs font-normal text-gray-600">{BIO.gradYear}</span>
            </div>
            <div className="text-xs text-gray-700 italic font-sans">{BIO.degree}</div>
            <div className="text-xs text-gray-600 font-sans pt-2 border-t border-dashed border-gray-300">
              <strong>Relevant Focus:</strong> Data Structures & Algorithms, Object-Oriented Programming (C++/Java), Discrete Mathematics, Computer Organization
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="bg-[#fdfbf7] border-2 border-gray-900 p-6 rounded-sm shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2 border-b-2 border-gray-900 pb-3 mb-4">
            <Award size={17} className="text-red-700" />
            <span>Verified Certifications</span>
          </h2>
          <div className="space-y-4">
            {BIO.certifications.map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-baseline text-xs font-bold text-gray-950">
                  <span>{c.name}</span>
                  <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded text-[10px]">
                    {c.issuer}
                  </span>
                </div>
                <p className="text-xs font-sans text-gray-600">{c.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
