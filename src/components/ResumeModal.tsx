import React, { useEffect } from 'react';
import { personalInfo } from '../data/portfolio';
import { X, Download, Printer, ExternalLink } from 'lucide-react';

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
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn print:p-0 print:bg-white print:static"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white text-gray-900 rounded-2xl shadow-2xl transition-all print:max-h-none print:shadow-none print:rounded-none print:w-full print:p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-[#18181b] text-white px-6 py-4 rounded-t-2xl border-b border-gray-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Suraj Jaiswal — Official Resume (PDF Document View)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Suraj_Resume.pdf"
              download="Suraj_Jaiswal_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
              title="Download Official PDF Resume"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <a
              href="/Suraj_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium transition-colors"
              title="Open Original PDF in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>

            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              aria-label="Close Resume Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable PDF Page Document Container */}
        <div className="p-6 sm:p-12 font-serif text-[13px] leading-relaxed text-gray-900 bg-white print:p-6 print:text-[12px]">
          
          {/* Header */}
          <header className="text-center border-b pb-4 mb-5">
            <h1 className="text-3xl font-extrabold tracking-widest text-gray-900 uppercase font-serif mb-1">
              SURAJ JAISWAL
            </h1>
            <div className="text-xs text-gray-700 font-sans flex flex-wrap items-center justify-center gap-2 font-medium">
              <span>Pune, Maharashtra, India</span>
              <span>|</span>
              <a href="mailto:surajjaiswal4222@gmail.com" className="text-blue-700 hover:underline">
                surajjaiswal4222@gmail.com
              </a>
              <span>|</span>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                LinkedIn
              </a>
              <span>|</span>
              <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                GitHub
              </a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-2 font-serif">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-justify text-gray-800 text-xs leading-normal">
              Third-year B.Tech Computer Science (AI &amp; ML) student with hands-on experience in backend engineering, REST APIs, AI/ML systems, and full-stack application development. Proficient in Python, Java, C++, Flask, FastAPI, Node.js, React, SQL/NoSQL databases, and cloud deployment. Experienced in building production-oriented systems involving generative AI, computer vision, fraud detection, authentication, and distributed processing. Strong foundation in Data Structures, DBMS, Machine Learning, and Software Engineering.
            </p>
          </section>

          {/* Education */}
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-2 font-serif">
              EDUCATION
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
              <span className="font-bold text-gray-900">G. H. Raisoni College of Engineering and Management, Pune</span>
              <span className="text-xs font-sans text-gray-700">2024 – 2028</span>
            </div>
            <div className="italic text-xs text-gray-800">
              B.Tech. in Computer Science Engineering (AI &amp; ML) | <span className="font-semibold not-italic">CGPA: 8.96</span>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-2 font-serif">
              EXPERIENCE
            </h2>
            
            <div className="space-y-3.5">
              {/* FlyRank AI */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-gray-900">FlyRank AI</span>
                  <span className="text-xs font-sans text-gray-700">Jun 2026 – Present</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between italic text-xs text-gray-800 mb-1">
                  <span>Backend AI Engineer Intern</span>
                  <span className="not-italic text-gray-600 font-sans text-[11px]">Pune, India – Remote</span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs text-gray-800">
                  <li>Working on backend AI engineering tasks involving API development, server-side logic, and AI-powered application workflows.</li>
                  <li>Contributing to reliable backend components and integrating AI capabilities into production-oriented systems.</li>
                </ul>
              </div>

              {/* CodeAlpha */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-gray-900">CodeAlpha</span>
                  <span className="text-xs font-sans text-gray-700">Mar 2026 – Present</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between italic text-xs text-gray-800 mb-1">
                  <span>Backend Developer Intern</span>
                  <span className="not-italic text-gray-600 font-sans text-[11px]">Remote</span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs text-gray-800">
                  <li>Developed and worked with RESTful backend services using Python, Flask, and database-driven application logic.</li>
                  <li>Implemented backend workflows, debugging, API integration, and problem-solving tasks while improving code reliability and maintainability.</li>
                </ul>
              </div>

              {/* ShadowFox */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <span className="font-bold text-gray-900">ShadowFox</span>
                  <span className="text-xs font-sans text-gray-700">Mar 2026 – Apr 2026</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between italic text-xs text-gray-800 mb-1">
                  <span>AI/ML Intern</span>
                  <span className="not-italic text-gray-600 font-sans text-[11px]">Remote</span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs text-gray-800">
                  <li>Built computer vision applications using YOLOv8 and OpenCV across data preprocessing, model development, testing, and evaluation.</li>
                  <li>Applied machine learning and software engineering practices to develop and improve practical AI solutions.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Selected Projects */}
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-2 font-serif">
              PROJECTS
            </h2>

            <div className="space-y-3.5">
              {/* YOLO-Driven Automated Attendance System */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-gray-900">
                    YOLO-Driven Automated Attendance System
                  </span>
                  <a href="https://github.com/srj7042/YOLO_Attend" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-sans text-xs hover:underline inline-flex items-center gap-0.5">
                    GitHub <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs text-gray-800 mt-1">
                  <li>Built an image-based automated attendance system using YOLOv8 for person detection and FaceNet for face recognition and student identification.</li>
                  <li>Developed a Flask backend with role-based access for Admin and Teachers, supporting student management, attendance tracking, manual overrides, reports, and analytics.</li>
                  <li>Designed database workflows using PostgreSQL/SQLite to manage students, users, attendance records, confidence scores, timestamps, and uploaded images.</li>
                  <li className="font-sans text-[11px]">
                    <span className="font-bold">Tech:</span> Python, Flask, YOLOv8, FaceNet, PostgreSQL, OpenCV.
                  </li>
                </ul>
              </div>

              {/* BidRakshak */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-gray-900">
                    BidRakshak – GeM Compliance Verification Platform
                  </span>
                  <a href="https://github.com/srj7042/BidRakshak" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-sans text-xs hover:underline inline-flex items-center gap-0.5">
                    GitHub <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs text-gray-800 mt-1">
                  <li>Developed an automated procurement compliance platform to validate vendor documents against 15+ compliance checks, including GST, PAN, MSME, EPFO, ESIC, BIS, and Make in India requirements.</li>
                  <li>Built FastAPI REST APIs, JWT authentication, role-based access control, audit logging, and a configurable rules engine for compliance verification.</li>
                  <li>Integrated OCR and LLM pipelines to extract structured information from uploaded documents and generate evidence-backed compliance results.</li>
                  <li className="font-sans text-[11px]">
                    <span className="font-bold">Tech:</span> FastAPI, Next.js, PostgreSQL, OCR, LLM.
                  </li>
                </ul>
              </div>

              {/* PolicyPilot */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-gray-900">
                    PolicyPilot – Insurance Policy Analysis Platform
                  </span>
                  <span className="text-gray-500 font-sans text-[11px]">
                    Python • PDF Processing • OCR • LLM
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs text-gray-800 mt-1">
                  <li>Built an insurance document analysis system that extracts and structures important information from uploaded policy PDFs.</li>
                  <li>Extracted key attributes including premium, coverage, waiting periods, room-rent limits, co-pay, deductibles, exclusions, claims, and renewal conditions.</li>
                  <li>Designed structured analysis workflows to simplify insurance policy comparison and highlight important coverage conditions and limitations.</li>
                  <li className="font-sans text-[11px]">
                    <span className="font-bold">Tech:</span> Python, PDF Processing, OCR, LLM.
                  </li>
                </ul>
              </div>

              {/* Abhyaas */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-gray-900">
                    Abhyaas – AI Learning Path Recommender
                  </span>
                  <a href="https://github.com/srj7042/Abhyaas" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-sans text-xs hover:underline inline-flex items-center gap-0.5">
                    GitHub <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <ul className="list-disc pl-5 space-y-0.5 text-xs text-gray-800 mt-1">
                  <li>Developed an AI-driven learning platform that generates personalized learning paths based on learner goals, existing skills, and diagnostic assessments.</li>
                  <li>Implemented Skill Twin, Skill Graph, Gap Analyzer, AI Tutor, adaptive rerouting, and explainable recommendation features.</li>
                  <li>Built dynamic learner profiles and progress visualization using Next.js, TypeScript, Supabase, Gemini API, and Recharts.</li>
                  <li className="font-sans text-[11px]">
                    <span className="font-bold">Tech:</span> Next.js, TypeScript, Supabase, Gemini API, Recharts.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-2 font-serif">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-1 text-xs text-gray-800">
              <div><span className="font-bold">Languages:</span> Python, Java, C++, SQL</div>
              <div><span className="font-bold">Backend:</span> Flask, FastAPI, Node.js, Express.js, REST APIs</div>
              <div><span className="font-bold">Frontend:</span> React.js, Next.js, HTML, CSS, Tailwind CSS, Vite</div>
              <div><span className="font-bold">AI/ML:</span> YOLOv8, FaceNet, OpenCV, DeepFace, TensorFlow, Keras, Scikit-learn, NumPy, Pandas</div>
              <div><span className="font-bold">Databases:</span> PostgreSQL, MySQL, MongoDB</div>
              <div><span className="font-bold">Cloud/DevOps:</span> AWS, Azure, Docker, Terraform, Vercel, Git, GitHub</div>
              <div><span className="font-bold">Core CS:</span> Data Structures &amp; Algorithms, OOP, DBMS, Machine Learning, Cloud Computing</div>
            </div>
          </section>

          {/* Leadership & Additional Experience */}
          <section className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-2 font-serif">
              LEADERSHIP &amp; ADDITIONAL EXPERIENCE
            </h2>

            <div className="space-y-2 text-xs text-gray-800">
              <div>
                <div className="flex justify-between font-bold">
                  <span>G. H. Raisoni College of Engineering and Management</span>
                  <span className="font-normal font-sans text-gray-700">Jan 2026 – Present</span>
                </div>
                <div className="flex justify-between italic mb-0.5">
                  <span>Peer Counselor</span>
                  <span className="not-italic font-sans text-gray-600">Pune, India</span>
                </div>
                <ul className="list-disc pl-5">
                  <li>Support and guide peers through academic and student-related challenges while coordinating with students and faculty.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold">
                  <span>Messe Global, Laxmi Lawns</span>
                  <span className="font-normal font-sans text-gray-700">Aug 2025</span>
                </div>
                <div className="flex justify-between italic mb-0.5">
                  <span>Backstage Event Operations Coordinator</span>
                  <span className="not-italic font-sans text-gray-600">Pune, India</span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5">
                  <li>Handled backstage operations for a live South Indian cultural event attended by approximately 3,500 people, featuring Shobana (Padma Bhushan awardee) and artists including Kapil.</li>
                  <li>Coordinated artist movement and backstage logistics to support smooth event execution.</li>
                  <li>Worked with event teams to manage time-sensitive backstage activities in a fast-paced live-event environment.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold">
                  <span>Freelance</span>
                  <span className="font-normal font-sans text-gray-700">2024</span>
                </div>
                <div className="flex justify-between italic mb-0.5">
                  <span>Event Coordinator</span>
                  <span className="not-italic font-sans text-gray-600">Pune, India</span>
                </div>
                <ul className="list-disc pl-5 space-y-0.5">
                  <li>Coordinated college events, teams, vendors, and logistics, demonstrating leadership, communication, and time-management skills.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Additional */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-1.5 font-serif">
              ADDITIONAL
            </h2>
            <div className="text-xs text-gray-800">
              <span className="font-bold">Interests:</span> Backend Engineering, Artificial Intelligence, Machine Learning, Computer Vision, Distributed Systems
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
