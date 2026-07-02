export interface ResumeProject {
  title: string;
  subtitle: string;
  codeUrl: string;
  hasLive: boolean;
  bullets: string[];
  technologies: string[];
}

export interface ResumeSkillCategory {
  label: string;
  value: string;
}

export interface ResumeData {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  linkedinUrl: string;
  githubUrl: string;
  summary: string;
  education: {
    institution: string;
    period: string;
    degree: string;
    location: string;
  };
  projects: ResumeProject[];
  technicalSkills: ResumeSkillCategory[];
  achievements: string[];
}

export const resumeData: ResumeData = {
  name: "MAYANK SANGWANI",
  title: "Java Full Stack Developer",
  phone: "7607459745",
  email: "gurusangwani06@gmail.com",
  linkedin: "Linkedin",
  github: "Github",
  linkedinUrl: "https://www.linkedin.com/in/mayank-sangwani-164ab12a9/",
  githubUrl: "https://github.com/guru340",
  summary: "Highly motivated Java Developer skilled in building Scalable full-stack applications using Spring Boot and React. Experienced in developing REST APIs, working in Agile terms, and integrating AI solutions using Spring AI. Quick learner with strong problem-solving and debugging skills.",
  education: {
    institution: "Galgotia College Of Engineering And Technology",
    period: "2023 – 2027",
    degree: "B.Tech in Computer Science and Engineering",
    location: "Greater Noida , Uttar Pradesh"
  },
  projects: [
    {
      title: "CodeHarbour",
      subtitle: "Full Stack Web Application",
      codeUrl: "https://github.com/guru340/CodeHarbour.git",
      hasLive: true,
      bullets: [
        "Implemented Selenium to create an instance of Chrome in order to interact with the correct elements of the web page.",
        "Managed MySQL database with optimized queries for performance and scalability.",
        "Implemented authentication, API data handling, and dynamic UI features."
      ],
      technologies: ["Java", "React.js", "Spring Boot", "Spring Data JPA", "MySQL", "REST APIs", "Git", "OOPs"]
    },
    {
      title: "SmartCV AI",
      subtitle: "Full Stack Web Application",
      codeUrl: "https://github.com/gurusangwani06/SmartCV-AI",
      hasLive: true,
      bullets: [
        "Built a Smart Resume Analyzer using AI/NLP to calculate ATS score and suggest improvements.",
        "Designed RESTful APIs for resume parsing, keyword extraction, and scoring system.",
        "Integrated frontend and backend with efficient data handling and real-time analysis."
      ],
      technologies: ["Java", "Spring Boot", "MySql", "React", "Rest APIs", "GroqAPI key", "Spring AI"]
    },
    {
      title: "Fit Track AI",
      subtitle: "Full Stack Web Application",
      codeUrl: "https://github.com/gurusangwani06/Fit-Track-AI",
      hasLive: false,
      bullets: [
        "Built a scalable microservices-based fitness app using Spring Boot & Spring Cloud.",
        "Implemented API Gateway and Eureka for service discovery and routing.",
        "Developed RESTful APIs with Kafka for event-driven communication.",
        "Secured APIs using OAuth2 & Spring Security; built frontend with React (Redux, Router).",
        "Integrated Apache Kafka for event-driven communication, improving system performance and decoupling services."
      ],
      technologies: ["Java", "Spring Boot", "Spring Cloud", "Spring AI", "Microservices", "Kafka", "OAuth2", "React.js", "MongoDB/PostgreSQL"]
    }
  ],
  technicalSkills: [
    { label: "Languages", value: "C, Java, JavaScript, SQL, OOPS" },
    { label: "Front-end", value: "React.js, Next.js, Tailwind CSS, Redux, Framer Motion" },
    { label: "Backend", value: "Hibernate(ORM), Spring Boot, Spring Data JPA, Spring AI, REST APIs, Microservices" },
    { label: "Tools", value: "Git, GitHub, Docker, Junit, Kafka, Kubernetes, AWS, Maven, Apache Tomcat" },
    { label: "Databases", value: "PostgreSQL, MySQL, MongoDB" },
    { label: "Technologies", value: "RESTful APIs, Microservices, CI/CD, DevOps, Secure Authentication (OAuth2, JWT), Data Structures and Algorithms, Software Development Lifecycle, Testing, Deployment, AI/ML Integration" },
    { label: "Domains & Expertise", value: "Artificial Intelligence (AI), Machine Learning (ML), Cloud Computing (CU), Back-end Development, Frontend Development" },
    { label: "Soft Skills", value: "Leadership, Team Collaboration, Problem-Solving, Time Management, Communication" }
  ],
  achievements: [
    "Java Full Stack Developer Certification- CodeForSuccess",
    "Solved 650+ LeetCode problems and contest rating 1633.",
    "Codeforces rating 897."
  ]
};
