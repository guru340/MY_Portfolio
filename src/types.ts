export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: string[];
  year?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  achievements: string[];
  tech: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  slug: string;
  category: string;
}

export interface Book {
  title: string;
  author: string;
  coverImage: string;
  status: 'reading' | 'completed' | 'queued';
  progress: number; // 0 to 100
}
