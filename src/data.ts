import { Project, ExperienceItem, BlogArticle, Book } from './types';
import {Code }from './Photo/codeHarBour.png';

export const PERSONAL_INFO = {
  name: "Mayank Sangwani",
  role: "Full Stack Developer specializing in AI ",
  tagline: "Building scalable full-stack applications and intelligent AI agent systems.",
  introParagraphs: [
    "I am a Java Full-Stack Developer and Computer Science & Engineering student with a strong interest in designing scalable, high-performance software systems. My expertise spans Java, Spring Boot, React, MySQL, REST APIs, Docker, Kubernetes, and modern DevOps practices, enabling me to build secure, maintainable, and production-ready applications.",
    "I enjoy architecting robust backend services, developing responsive and intuitive user interfaces, and delivering end-to-end solutions that emphasize performance, reliability, and exceptional user experience. I approach every project with a focus on clean architecture, efficient system design, and industry best practices.",
    "Committed to continuous learning, I actively deepen my knowledge of Generative AI, cloud-native technologies, distributed systems, and modern software engineering principles. Beyond development, I contribute to open-source projects, strengthen my problem-solving skills through Data Structures & Algorithms, and build practical solutions that address real-world challenges"
  ],
  availability: "Available for Freelance & Full-Time",
  socials: {
    github: `https://github.com/${(import.meta as any).env?.VITE_GITHUB_USERNAME || "guru340"}`,
    githubUsername: (import.meta as any).env?.VITE_GITHUB_USERNAME || "guru340",
    linkedin: "https://www.linkedin.com/in/mayank-sangwani-164ab12a9/",
    email: "mailto:gurusangwani06@gmail.com",
    twitter: "https://x.com/MayankSang253",
    calcom: (import.meta as any).env?.VITE_CALCOM_USERNAME || "mayank-sangwani-yw1rhe",
    avatar: "https://avatars.githubusercontent.com/u/87940332?v=4"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "aura-sync",
    title: "CodeHarbour",
    year: "2025",
    description: "Developer-centric platform for managing projects, sharing code, and improving collaboration. write also in more detailed",
    longDescription: "A comprehensive developer collaboration platform that enables teams to manage software projects, organize development workflows, share code snippets and repositories, track progress, and collaborate efficiently in real time. Built with a modern full-stack architecture, it focuses on improving productivity, transparency, and communication throughout the software development lifecycle.",
    image: Code,
    tech: ["Java 21", "Spring Boot", "WebFlux", "Docker", "React.js", "Spring Data JPA", "MySql"],
    githubUrl: "https://github.com/guru340/CodeHarbour.git",
    liveUrl: "https://codeharbour-dev.vercel.app/",
    featured: true,
    metrics: ["120k req/s throughput", "2.4ms avg latency", "Zero-downtime routing"]
  },
  {
    id: "url-shortener",
    title: "UrlShortner",
    year: "2025",
    description: "A full-stack URL shortener that converts long URLs into compact, shareable links with fast redirection and a responsive interface.",
    longDescription: "A full-stack URL shortening application that converts long URLs into compact, shareable links with instant redirection. Built with a modern web stack, featuring REST APIs, persistent storage, and a responsive user interface.",
    image: "urlShortner.png",
    tech: ["React", "Java", "Spring Boot", "Tailwind CSS"],
    githubUrl: "https://github.com/guru340/Url_Shortner.git",
    liveUrl: "https://url-shortner-ten-red.vercel.app/",
    featured: true,
    metrics: ["Query speedup of 40%", "Supports 3 SQL/NoSQL dialects", "Built-in telemetry dashboard"]
  },
  {
    id: "smart-cv-ai",
    title: "SmartCV_AI",
    year: "2026",
    description: "SmartCV AI is a full-stack AI-powered resume analysis and optimization platform that helps users improve their resumes using artificial intelligence.",
    longDescription: "SmartCV AI is a full-stack AI-powered resume analysis and optimization platform that helps users improve their resumes using artificial intelligence.",
    image: "smartcv.png",
    tech: ["React", "Java", "Spring Boot", "Tailwind CSS","GroqAPI Key","SpringAI","RESTAPIs"],
    githubUrl: "https://github.com/guru340/SmartCV_AI.git",
    liveUrl: "https://smart-cv-ai-rho.vercel.app/",
    featured: true,
    metrics: ["Query speedup of 40%", "Supports 3 SQL/NoSQL dialects", "Built-in telemetry dashboard"]
  },
  {
    id: "k72-website",
    title: "K72-Website",
    year: "2026",
    description: "A modern creative agency website inspired by K72, featuring smooth GSAP animations, responsive design, and a polished user experience built with React, Tailwind CSS, and Vite.",
    longDescription: "A modern creative agency website inspired by K72, featuring smooth GSAP animations, responsive design, and a polished user experience built with React, Tailwind CSS, and Vite.",
    image: "k72.png",
    tech: ["React", "GSAP", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/guru340/k72-Website.git",
    liveUrl: "https://k72-website-mu.vercel.app/",
    featured: true,
    metrics: ["Query speedup of 40%", "Supports 3 SQL/NoSQL dialects", "Built-in telemetry dashboard"]
  },
  {
    id: "leetcode-progress-tracker",
    title: "LeetCode  Progress Tracker UI",
    year: "2026",
    description: " A modern progress tracking dashboard that visualizes LeetCode performance with detailed statistics, problem-wise analytics, difficulty-based insights, and an intuitive interface to help developers monitor their coding journey and interview preparation.",
    longDescription: " A modern progress tracking dashboard that visualizes LeetCode performance with detailed statistics, problem-wise analytics, difficulty-based insights, and an intuitive interface to help developers monitor their coding journey and interview preparation.",
    image: "Leetcode.png",
    tech: ["React", "Shcdn UI", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/guru340/Url_Shortner.git",
    liveUrl: "https://url-shortner-ten-red.vercel.app/",
    featured: true,
    metrics: ["Query speedup of 40%", "Supports 3 SQL/NoSQL dialects", "Built-in telemetry dashboard"]
  },
  {
    id: "kube-guard",
    title: "Fitness App Microservices",
    year: "2026",
    description: "A production-oriented Fitness Management System built using Spring Boot Microservices and Spring Cloud, following modern cloud-native architecture principles. The project demonstrates how enterprise applications can be designed as independently deployable services with centralized configuration, service discovery, API gateway routing, and scalable RESTful APIs.",
    tech: ["Java", "Kubernetes", "Docker", "AWS EKS", "SpringBoot","Microservices","Kafka","Oauth2","React","MongoDb","PostgreSql","Spring AI"],
    githubUrl: "https://github.com/guru340/Fitneess-app-Microservices.git",
    liveUrl: "https://github.com/guru340/Fitneess-app-Microservices.git",
    featured: false
  },
  {
    id: "aerostream-infra",
    title: "BookMyShow Backend",
    year: "2024",
    description: "A scalable and production-ready movie ticket booking backend built with Spring Boot, following RESTful API principles and layered architecture. The application provides a complete backend solution for managing users, movies, theatres, shows, seat reservations, and ticket bookings while demonstrating enterprise Java development practices.",
    tech: ["SpringBoot", "Java", "Mysql", "JDBC", "Maven"],
    githubUrl: "https://github.com/guru340/Book_My_show-_Backend.git",
    liveUrl: "https://github.com/guru340/Book_My_show-_Backend.git",
    featured: false
  },
 
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Staff Software Engineer",
    company: "Stripe",
    duration: "2024 – Present",
    location: "San Francisco, CA",
    achievements: [
      "Led the design and migration of monolithic legacy settlement services to reactive Spring Boot microservices on Kubernetes, improving throughput by 35% and reducing infrastructure spend by $220k annually.",
      "Developed a custom high-performance API router using netty-reactive drivers to proxy card tokenization requests, keeping P99 latency below 12ms under peak seasonal loads.",
      "Spearheaded adoption of TypeScript and React 19 within backend infrastructure dashboard teams, establishing design system guidelines and reducing bug counts in configuration portals by 45%."
    ],
    tech: ["Java", "Spring Boot", "React", "TypeScript", "Docker", "Kubernetes", "AWS", "PostgreSQL"]
  },
  {
    id: "exp-2",
    role: "Senior Software Engineer",
    company: "HashiCorp",
    duration: "2021 – 2024",
    location: "Remote / Seattle, WA",
    achievements: [
      "Designed and implemented critical security authorization modules within cloud orchestration platforms, resolving complex token renewal races in active clusters.",
      "Optimized storage drivers for high-throughput metadata logs, decreasing local disk write pressure by 28% using batched asynchronous flush techniques.",
      "Collaborated closely with product designers to rewrite cloud console explorer interfaces in modern React and Tailwind CSS, increasing page load speed by 1.8 seconds."
    ],
    tech: ["Go", "Node.js", "Docker", "Kubernetes", "AWS", "PostgreSQL", "React", "TypeScript"]
  },
  {
    id: "exp-3",
    role: "Software Engineer",
    company: "Okta",
    duration: "2019 – 2021",
    location: "San Jose, CA",
    achievements: [
      "Authored custom OAuth 2.0 authorization servers and middleware plug-ins supporting client-assertion integrations for over 4,000 business accounts.",
      "Engineered automated database migrations and optimized query indexes in MySQL, cutting dashboard load timeouts by 92% for large enterprise customers."
    ],
    tech: ["Java", "Spring Boot", "MySQL", "Docker", "TypeScript", "Git"]
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-1",
    title: "Designing Reactive API Gateways: Non-Blocking I/O in Practice",
    summary: "An in-depth exploration of threading models in Netty, Reactor, and Tomcat. We examine how non-blocking event loops achieve massive throughput scalability.",
    date: "Jun 24, 2026",
    readTime: "8 min read",
    slug: "designing-reactive-api-gateways",
    category: "Architecture"
  },
  {
    id: "blog-2",
    title: "Type-Safe Backend Bridges with TypeScript and Spring Boot",
    summary: "How we eliminated visual configuration drift by dynamically generating TypeScript interface schemas directly from Java record files during gradle compile tasks.",
    date: "Apr 12, 2026",
    readTime: "5 min read",
    slug: "type-safe-backend-bridges",
    category: "TypeScript"
  },
  {
    id: "blog-3",
    title: "A Case for the Grid: Editorial Layouts in Modern Web Portals",
    summary: "Stepping away from default utility-saturated cards. Exploring typography pairings, Swiss margins, and negative space to construct websites that feel like premium printed catalogs.",
    date: "Feb 19, 2026",
    readTime: "6 min read",
    slug: "case-for-the-grid-layouts",
    category: "Design"
  }
];

export const CURRENT_BOOK: Book = {
  title: "The Design of Everyday Things",
  author: "Don Norman",
  coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300&h=450",
  status: "reading",
  progress: 68
};

export const STACK_CATEGORIES = [
  {
    name: "Languages & Core",
    items: [
      { name: "Java", icon: "Coffee", color: "#007396" },
      { name: "TypeScript", icon: "Code", color: "#3178C6" },
      { name: "JavaScript", icon: "FileCode", color: "#F7DF1E" },
      { name: "Node.js", icon: "Terminal", color: "#339933" }
    ]
  },
  {
    name: "Frameworks & Backend",
    items: [
      { name: "Spring Boot", icon: "Cpu", color: "#6DB33F" },
      { name: "React", icon: "Atom", color: "#61DAFB" },
      { name: "Tailwind CSS", icon: "Layers", color: "#06B6D4" }
    ]
  },
  {
    name: "Infrastructure & Platform",
    items: [
      { name: "Docker", icon: "Box", color: "#2496ED" },
      { name: "Kubernetes", icon: "Anchor", color: "#326CE5" },
      { name: "AWS", icon: "Cloud", color: "#FF9900" },
      { name: "Git", icon: "GitBranch", color: "#F05032" }
    ]
  },
  {
    name: "Databases & Design",
    items: [
      { name: "PostgreSQL", icon: "Database", color: "#4169E1" },
      { name: "MySQL", icon: "HardDrive", color: "#4479A1" },
      { name: "MongoDB", icon: "FolderOpen", color: "#47A248" },
      { name: "Figma", icon: "PenTool", color: "#F24E1E" }
    ]
  }
];
