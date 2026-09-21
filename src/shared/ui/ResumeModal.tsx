import React, { useEffect } from 'react';
import { X, Download, FileText, ExternalLink, CheckCircle } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';
import { BIO } from '../../data/bio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    fireConfetti({
      particleCount: 60,
      colors: ['#b91c1c', '#111827', '#f4f1ea']
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#f4f1ea] border-4 border-gray-900 shadow-2xl rounded-sm max-h-[90vh] flex flex-col font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 bg-gray-900 text-white border-b-2 border-gray-900">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-red-400" />
            <h2 id="resume-modal-title" className="text-sm font-bold uppercase tracking-wider">
              Official Dossier · Udbhav Sanagari Resume
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={BIO.resumeUrl}
              download="Udbhav_Sanagari_Resume.pdf"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-800 rounded transition-colors text-gray-300 hover:text-white"
              aria-label="Close resume modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Embedded PDF or High-res Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#fdfbf7]">
          <div className="max-w-2xl mx-auto bg-white border-2 border-dashed border-gray-300 p-8 shadow-sm text-gray-900 font-sans">
            {/* Header */}
            <div className="text-center border-b-2 border-gray-900 pb-4 mb-6 font-mono">
              <h1 className="text-2xl font-black uppercase tracking-tight text-gray-950 mb-1">
                {BIO.name}
              </h1>
              <p className="text-xs text-gray-600">
                {BIO.email} ·{' '}
                <a href={BIO.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-red-700">
                  LinkedIn
                </a>{' '}
                ·{' '}
                <a href={BIO.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-red-700">
                  GitHub
                </a>
              </p>
            </div>

            {/* Education */}
            <section className="mb-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
                Education
              </h3>
              <div className="flex justify-between items-baseline text-xs font-bold">
                <span>{BIO.university}</span>
                <span className="font-mono font-normal text-gray-600">{BIO.gradYear}</span>
              </div>
              <div className="text-xs text-gray-700 italic mb-1">{BIO.degree}</div>
              <div className="text-[11px] text-gray-600">
                Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming (C++/Java), Discrete Mathematics, Computer Organization
              </div>
            </section>

            {/* Technical Skills */}
            <section className="mb-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
                Technical Skills
              </h3>
              <div className="text-xs space-y-1">
                <div><strong>Languages:</strong> Python, C++, Java, Rust, TypeScript, SQL</div>
                <div><strong>Frameworks & Libraries:</strong> Tauri v2, FastAPI, PyTorch, NumPy, Pandas, Asyncio, ChromaDB, SDL2, FFmpeg</div>
                <div><strong>Developer Tools:</strong> Git, GitHub, Docker, Linux, Ollama, VS Code, Android SDK, Pytest</div>
                <div><strong>Core Competencies:</strong> Object-Oriented Design (OOP), Data Structures & Algorithms, RESTful APIs, Local LLM Deployment, System Architecture</div>
              </div>
            </section>

            {/* Featured Projects */}
            <section className="mb-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
                Featured Projects
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <div className="font-bold">
                    Local Multi-Agent Automation Framework | <span className="font-normal italic text-gray-600">Python, FastAPI, SQLite, Ollama, ChromaDB, Asyncio</span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-gray-700 text-[11px]">
                    <li>Architected autonomous, privacy-first multi-agent OS engine coordinating 3-tier Agent Army driven by local Ollama models with zero external telemetry.</li>
                    <li>Refactored execution engine with interactive fast-path self-correction loop, adapting payloads based on runtime error feedback and vision state.</li>
                    <li>Engineered asynchronous FastAPI backend with persistent SQLite task queue (`jobs.db`) and 60+ automated pytest test cases.</li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold">
                    GCR Simplified — Desktop Grading & Plagiarism Engine | <span className="font-normal italic text-gray-600">Rust, Tauri v2, React 19, TypeScript, SQLite</span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-gray-700 text-[11px]">
                    <li>Engineered and published cross-platform desktop application automating Google Classroom grading workflows with local-first, FERPA-compliant encrypted storage.</li>
                    <li>Implemented offline plagiarism detection engine utilizing the Winnowing algorithm and TF-IDF Cosine similarity with SHA-256 binary duplicate file detection.</li>
                    <li>Integrated multimodal AI evaluation via Gemini Vision to OCR and grade handwritten notebook submissions, auto-generating 4-sheet Excel gradebooks.</li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold">
                    LinktoMac — Low-Latency Screen Mirroring & Control | <span className="font-normal italic text-gray-600">C++, Java, Python, FFmpeg, VideoToolbox, SDL2</span>
                  </div>
                  <ul className="list-disc pl-4 mt-1 space-y-1 text-gray-700 text-[11px]">
                    <li>Engineered ultra-low latency (&lt;2–5ms) wireless and USB screen mirroring and remote control system bridging Android 14+ devices to macOS.</li>
                    <li>Constructed hardware-accelerated video pipeline utilizing Android MediaCodec (HEVC/H.265) streaming over TCP, decoded via Apple VideoToolbox with SDL2/Metal rendering.</li>
                    <li>Designed bidirectional low-latency input injection protocol for touch gestures and keyboard events via Android InputManager with zero-config mDNS pairing.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section className="mb-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
                Certifications
              </h3>
              <div className="flex justify-between items-baseline text-xs font-bold">
                <span>Claude Code 101</span>
                <span className="font-mono font-normal text-gray-600">Anthropic</span>
              </div>
              <div className="text-[11px] text-gray-700">Completed certification on leveraging Anthropic's Claude AI for advanced code generation and problem solving.</div>
            </section>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-gray-100 border-t border-gray-300 text-center text-xs text-gray-600 flex justify-between items-center px-6">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <CheckCircle size={14} />
            <span>Verified ATS Parsable Format (Single-Page Standard)</span>
          </span>
          <a
            href={BIO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-700 hover:text-red-700 font-bold"
          >
            <span>Open Raw PDF</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
