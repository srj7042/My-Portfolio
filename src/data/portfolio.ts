import { PersonalInfo, Project, SkillCategory, ExperienceItem, EducationItem } from '../types/portfolio';

export const personalInfo: PersonalInfo = {
  name: "Suraj Jaiswal",
  role: "AI/ML Engineer & Backend Developer",
  shortTitle: "AI/ML Developer • Backend Engineer • Computer Science Student",
  tagline: "Building intelligent software systems at the intersection of computer vision, backend engineering, and robust APIs.",
  heroBio: "I build intelligent software systems combining computer vision, backend engineering, APIs, databases, and modern web technologies.",
  aboutParagraphs: [
    "I am a Computer Science & Engineering student specializing in Artificial Intelligence and Machine Learning. My engineering focus centers on building reliable backend architecture, high-efficiency REST APIs, and practical computer vision systems that solve tangible operational problems.",
    "From real-time automated face recognition pipelines powered by YOLOv8 and FaceNet to scalable backend services and responsive data management tools, I focus on turning machine learning models into robust, end-to-end software products."
  ],
  availability: "Available for Software Engineering & AI/ML Internships",
  social: {
    github: "https://github.com/srj7042",
    linkedin: "https://www.linkedin.com/in/suraj-jaiswal-8b746830a/",
    email: "surajjaiswal4222@gmail.com",
  },
  resumeUrl: "/Suraj_Resume.pdf",
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    description: "Core programming languages for algorithmic problem solving and backend services.",
    skills: ["Python", "Java", "C++", "SQL"]
  },
  {
    title: "Backend Engineering",
    description: "Server architecture, microservices, authentication systems, and API design.",
    skills: ["Flask", "FastAPI", "Node.js", "Express.js", "REST APIs"]
  },
  {
    title: "Frontend Engineering",
    description: "Responsive web UI component design and modern framework interfaces.",
    skills: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Vite"]
  },
  {
    title: "AI & Machine Learning",
    description: "Computer vision frameworks, deep learning models, and quantitative data libraries.",
    skills: ["YOLOv8", "FaceNet", "OpenCV", "DeepFace", "TensorFlow", "Keras", "Scikit-learn", "NumPy", "Pandas"]
  },
  {
    title: "Databases & Storage",
    description: "Relational schema modeling, graph databases, document stores, and persistence.",
    skills: ["PostgreSQL", "MySQL"]
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure provisioning, containerization, CI/CD, and cloud platforms.",
    skills: ["AWS", "Docker", "Terraform", "Vercel", "Git", "GitHub"]
  },
  {
    title: "Core Computer Science",
    description: "Fundamental CS theoretical principles and engineering concepts.",
    skills: ["DSA", "OOP", "DBMS", "Machine Learning", "Cloud Computing"]
  }
];

export const projects: Project[] = [
  {
    id: "yolo-attend",
    title: "YOLO_Attend",
    subtitle: "YOLO-Driven Automated Attendance System",
    category: "AI / Computer Vision",
    shortDescription: "An automated attendance platform using YOLO for real-time face detection, recognition, and automated timestamp logging.",
    fullDescription: "YOLO_Attend is a computer vision application engineered to streamline attendance verification in classrooms and workplaces. Using deep learning object detection (YOLO), the system processes visual inputs, identifies attendees, and updates attendance logs automatically.",
    problem: "Manual attendance taking is inefficient and vulnerable to errors and proxy marking.",
    whatIBuilt: "Designed the real-time detection pipeline, image preprocessing routines, and attendance record management interface.",
    features: [
      "Real-time face detection and identification powered by YOLO",
      "Automated timestamp logging and attendee record persistence",
      "Clean UI for viewing attendance reports and student logs"
    ],
    tech: ["Python", "YOLO", "OpenCV", "HTML5", "CSS3"],
    githubUrl: "https://github.com/srj7042/YOLO_Attend",
    featured: true
  },
  {
    id: "bidrakshak",
    title: "BidRakshak",
    subtitle: "Smart Bidding Protection & Fraud Prevention Platform",
    category: "Full-Stack Web",
    shortDescription: "An intelligent security and auction bidding protection platform engineered to detect suspicious bid patterns, prevent fraud, and ensure transparent auction management.",
    fullDescription: "BidRakshak is a security-focused web platform designed to safeguard digital auctions and bidding systems. It incorporates real-time bid validation, anomaly detection algorithms, activity monitoring, and automated alerts to protect auction integrity and prevent manipulative bidding practices.",
    problem: "Online bidding portals and digital auctions face risks of proxy manipulation, artificial bid inflation, and suspicious user behavior.",
    whatIBuilt: "Architected the core bidding verification workflow, user authentication layer, anomaly detection logic, and responsive web dashboard.",
    features: [
      "Real-time bid validation and anomaly detection algorithms",
      "Suspicious bidding activity alerts and audit logging",
      "Secure user authentication and automated bidding rules engine",
      "Responsive analytics dashboard for live bid monitoring"
    ],
    tech: ["TypeScript", "React", "Node.js", "Python", "Tailwind CSS"],
    githubUrl: "https://github.com/srj7042/BidRakshak",
    featured: true
  },
  {
    id: "python-certificate-sender-bot",
    title: "Python Certificate Sender Bot",
    subtitle: "Automated Bulk Certificate Generation & Email Dispatch Bot",
    category: "Automation & Tools",
    shortDescription: "An automated Python tool designed to generate personalized event certificates in bulk and dispatch them directly via email with delivery status logging.",
    fullDescription: "A Python automation solution built for events, workshops, and hackathons. It parses participant data from CSV/Excel files, dynamically overlays custom typography onto certificate templates, generates high-resolution PDFs/images, and dispatches them via SMTP with custom HTML email formatting and status logs.",
    problem: "Manually generating and emailing hundreds of participant certificates for workshops or hackathons takes hours of repetitive effort.",
    whatIBuilt: "Developed the image processing scripts, PDF rendering pipeline, SMTP email dispatcher, and error handling logging module.",
    features: [
      "Dynamic name & text placement on image/PDF certificate templates",
      "Automated bulk email dispatching via SMTP with custom HTML body formatting",
      "CSV/Excel data input parsing with field validation",
      "Comprehensive delivery status logging and retry mechanisms for failed dispatches"
    ],
    tech: ["Python", "OpenCV", "Pillow", "SMTP", "Pandas"],
    githubUrl: "https://github.com/srj7042/python_certificate_sender_bot",
    featured: true,
    isFlagship: true
  },
  {
    id: "abhyaas",
    title: "Abhyaas",
    subtitle: "Interactive Skill Practice & Learning Platform",
    category: "Full-Stack Web",
    shortDescription: "A comprehensive practice and skill assessment web application built with TypeScript and modern web standards.",
    fullDescription: "Abhyaas is an educational web application engineered to facilitate structured learning, interactive practice problem-solving, and continuous skill assessment for students and developers.",
    problem: "Learners need clean, distraction-free environments to practice coding problems and systematically track progress.",
    whatIBuilt: "Architected the TypeScript application UI, interactive practice session modules, and progress tracking interfaces.",
    features: [
      "Interactive practice sessions with real-time feedback",
      "User progress tracking and performance analytics dashboard",
      "Clean, modern UI designed with React and TypeScript",
      "Fast Vite build setup with responsive layout across devices"
    ],
    tech: ["TypeScript", "React", "Node.js", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/srj7042/Abhyaas",
    featured: true
  },

  {
    id: "savdhaan",
    title: "Savdhaan",
    subtitle: "Emergency Alert & Safety System",
    category: "Full-Stack Web",
    shortDescription: "A real-time safety alert and SOS notification platform designed for instant user assistance and emergency routing.",
    fullDescription: "Savdhaan provides a low-latency safety dashboard and emergency contact broadcast system to assist users in distress situations with quick action triggers.",
    problem: "Emergency situations demand instant, one-tap safety broadcasts with zero navigation delay.",
    whatIBuilt: "Engineered the responsive emergency UI, instant alert dispatch logic, and location coordinate helper routines.",
    features: [
      "One-tap emergency broadcast trigger and status updates",
      "Contact notification routing and location coordinate logging",
      "High-contrast, accessible UI for quick emergency access"
    ],
    tech: ["TypeScript", "React", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/srj7042/Savdhaan",
    featured: true
  },
  {
    id: "msg-app",
    title: "MSG-APP",
    subtitle: "Real-Time Messaging & Communication Application",
    category: "Full-Stack Web",
    shortDescription: "A fast, responsive messaging web application supporting real-time chat sessions and structured conversation channels.",
    fullDescription: "MSG-APP enables instant messaging between users with lightweight socket payloads, conversation listing, and user status indicators.",
    problem: "Traditional message platforms can be bloated; custom messaging engines provide full protocol control.",
    whatIBuilt: "Built the message rendering stream, conversation state handlers, and chat room UI.",
    features: [
      "Real-time message thread rendering and timestamping",
      "Clean conversation sidebar and user active status",
      "Responsive layout across mobile and desktop devices"
    ],
    tech: ["TypeScript", "React", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/srj7042/MSG-APP",
    featured: true
  },
  {
    id: "qr-code-saas",
    title: "Customizable QR Code SaaS Platform",
    subtitle: "Dynamic QR Code Generator & Analytics Web Service",
    category: "Full-Stack Web",
    shortDescription: "A production-ready QR code SaaS tool for generating styled QR codes with customizable color schemes, logo overlays, and export options.",
    fullDescription: "A web application that allows users to create custom-branded QR codes, alter color palettes, embed logo watermarks, and export high-resolution PNG/SVG vector files.",
    problem: "Generic QR tools lack custom branding controls and multi-format vector exports.",
    whatIBuilt: "Frontend application with client-side canvas generation, custom design controls, and Vercel deployment.",
    features: [
      "Custom color palette selection and branding logo overlay",
      "Multi-format export (PNG, SVG)",
      "Live preview and dynamic payload validation",
      "Deployed live on Vercel"
    ],
    tech: ["JavaScript", "React", "Tailwind CSS", "Node.js", "Vercel"],
    githubUrl: "https://github.com/srj7042/qr-code-saas",
    liveUrl: "https://qr-code-saas-seven.vercel.app",
    featured: true
  }
];

export const experienceList: ExperienceItem[] = [
  {
    role: "Backend AI Engineer Intern",
    organization: "FlyRank AI",
    period: "Jun 2026 – Present",
    location: "Pune, India – Remote",
    contributions: [
      "Working on backend AI engineering tasks involving API development, server-side logic, and AI-powered application workflows.",
      "Contributing to reliable backend components and integrating AI capabilities into production-oriented systems."
    ]
  },
  {
    role: "Backend Developer Intern",
    organization: "CodeAlpha",
    period: "Mar 2026 – Present",
    location: "Remote",
    contributions: [
      "Developed and worked with RESTful backend services using Python, Flask, and database-driven application logic.",
      "Implemented backend workflows, debugging, API integration, and problem-solving tasks while improving code reliability and maintainability."
    ]
  },
  {
    role: "AI/ML Intern",
    organization: "ShadowFox",
    period: "Mar 2026 – Apr 2026",
    location: "Remote",
    contributions: [
      "Built computer vision applications using YOLOv8 and OpenCV across data preprocessing, model development, testing, and evaluation.",
      "Applied machine learning and software engineering practices to develop and improve practical AI solutions."
    ]
  }
];

export const educationList: EducationItem[] = [
  {
    degree: "B.Tech. in Computer Science Engineering (AI & ML)",
    field: "Artificial Intelligence & Machine Learning | CGPA: 8.96",
    institution: "G. H. Raisoni College of Engineering and Management, Pune",
    expectedGraduation: "2024 – 2028",
    highlights: [
      "Core CS: Data Structures & Algorithms, OOP, DBMS, Machine Learning, Cloud Computing",
      "Hands-on project work in Generative AI, Computer Vision, Fraud Detection, RESTful APIs, and Distributed Systems."
    ]
  }
];
