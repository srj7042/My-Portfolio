export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI / Computer Vision' | 'Backend Engineering' | 'Full-Stack Web' | 'REST APIs & Tools' | 'Automation & Tools';
  shortDescription: string;
  fullDescription: string;
  problem: string;
  whatIBuilt: string;
  architecture?: string[];
  features: string[];
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  isFlagship?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location?: string;
  contributions: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  expectedGraduation: string;
  highlights?: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  shortTitle: string;
  tagline: string;
  heroBio: string;
  aboutParagraphs: string[];
  availability: string;
  social: SocialLinks;
  resumeUrl: string;
}
