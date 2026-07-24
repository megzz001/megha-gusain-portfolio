export interface Project {
  id: string;
  title: string;
  tech: string[];
  description: string;
  details: string[];
  role?: string;
  period?: string;
  demoUrl?: string;
  screenshotUrl?: string;
  githubUrl?: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  type?: 'experience' | 'education';
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  link?: string;
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    level: number; // 0 to 100 for visual progress, or a specific metric
    icon?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}
