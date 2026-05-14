/* ==========================================================================
   Rajiv Bhardwaj — Portfolio
   Vanilla JS: theme toggle, loader, particles, cursor glow, scroll progress,
   typing animation, intersection reveals, scrollspy, project filtering,
   skills/timeline/certs rendering, contact form.
   ========================================================================== */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- DATA ---------------- */

  const SKILLS = [
    {
      title: "Frontend",
      description: "Building beautiful, accessible interfaces.",
      skills: [
        { name: "React", icon: iconReact, color: "text-cyan-400" },
        { name: "Tailwind CSS", icon: iconTailwind, color: "text-sky-400" },
        { name: "JavaScript", icon: iconJs, color: "text-yellow-400" },
        { name: "HTML/CSS", icon: iconHtmlCss, color: "text-orange-500" },
      ],
    },
    {
      title: "Backend",
      description: "Designing reliable APIs and services.",
      skills: [
        { name: "Node.js", icon: iconNode, color: "text-green-500" },
        { name: "Express.js", icon: iconExpress, color: "" },
        { name: "REST APIs", icon: iconApi, color: "text-violet-400" },
      ],
    },
    {
      title: "Database",
      description: "Modeling data for scale and performance.",
      skills: [
        { name: "MongoDB", icon: iconMongo, color: "text-green-500" },
        { name: "MySQL", icon: iconMysql, color: "text-blue-500" },
      ],
    },
    {
      title: "Programming",
      description: "Strong CS fundamentals and problem solving.",
      skills: [
        { name: "Java", icon: iconJava, color: "text-orange-500" },
        { name: "Python", icon: iconPython, color: "text-yellow-300" },
      ],
    },
    {
      title: "AI / ML",
      description: "Bringing intelligence to real-world apps.",
      skills: [
        { name: "OpenCV", icon: iconOpenCV, color: "text-emerald-400" },
        { name: "Face Recognition", icon: iconFace, color: "text-fuchsia-400" },
        { name: "AI Integration", icon: iconAI, color: "text-indigo-400" },
      ],
    },
    {
      title: "Tools",
      description: "Day-to-day developer toolbelt.",
      skills: [
        { name: "Git", icon: iconGit, color: "text-orange-500" },
        { name: "GitHub", icon: iconGithub, color: "" },
        { name: "VS Code", icon: iconVSCode, color: "text-blue-400" },
        { name: "Postman", icon: iconPostman, color: "text-orange-400" },
      ],
    },
  ];

  const PROJECTS = [
    {
      id: "socialsphere",
      title: "SocialSphere",
      category: "Full Stack",
      description:
        "A full-stack social media platform with real-time messaging, posts, likes, comments, notifications, and user authentication.",
      features: [
        "Real-time messaging",
        "Posts, likes & comments",
        "Live notifications",
        "User authentication",
        "Responsive feed UI",
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
      githubUrl: "https://github.com/rajivBhardwaj07/SocialSphere",
      liveUrl: "https://social-sphere-alpha-six.vercel.app",
      accent: "from-fuchsia-500 via-violet-500 to-indigo-500",
    },
    {
      id: "real-time-comm",
      title: "Real-Time Communication App",
      category: "Full Stack",
      description:
        "A real-time communication platform with instant messaging, video/audio calling, and scalable WebSocket-based architecture.",
      features: [
        "Instant messaging",
        "Video & audio calling",
        "Live notifications",
        "WebSocket-based architecture",
        "Authentication",
      ],
      tech: ["React", "Node.js", "Express", "Socket.io", "WebRTC", "MongoDB"],
      githubUrl: "https://github.com/rajivBhardwaj07/Real-Time-Communication-App",
      liveUrl: "https://real-time-communication-app-two.vercel.app",
      accent: "from-emerald-500 via-teal-500 to-cyan-500",
    },
    {
      id: "edu-tracker",
      title: "Edu-Tracker",
      category: "Full Stack",
      description:
        "A modern education management & student progress tracking platform with attendance, assignments, and real-time analytics.",
      features: [
        "Attendance tracking",
        "Assignments management",
        "Performance analytics",
        "Real-time monitoring",
        "Admin dashboard",
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      githubUrl: "https://github.com/rajivBhardwaj07/Edu-Tracker",
      accent: "from-amber-500 via-orange-500 to-rose-500",
    },
    {
      id: "restaurant-app",
      title: "Restaurant App",
      category: "Full Stack",
      description:
        "A Node.js-powered restaurant web app with a clean menu, order flow, and responsive UI.",
      features: [
        "Menu browsing",
        "Order flow",
        "Responsive UI",
        "Node.js backend",
      ],
      tech: ["Node.js", "Express", "JavaScript", "HTML", "CSS"],
      githubUrl: "https://github.com/rajivBhardwaj07/Restaurant-App",
      liveUrl: "https://restaurant-app-livid-eight.vercel.app",
      accent: "from-rose-500 via-pink-500 to-fuchsia-500",
    },
    {
      id: "paste-app",
      title: "Paste App",
      category: "Full Stack",
      description:
        "A modern paste / snippet sharing app with URL-based sharing, CRUD operations, and a clean interface.",
      features: [
        "Create & save pastes",
        "Shareable URLs",
        "Full CRUD operations",
        "Responsive design",
      ],
      tech: ["React", "Redux", "Tailwind CSS", "JavaScript"],
      githubUrl: "https://github.com/rajivBhardwaj07/Paste-App",
      liveUrl: "https://paste-app-iota-neon.vercel.app",
      accent: "from-sky-500 via-blue-500 to-indigo-500",
    },
    {
      id: "razorpay-clone",
      title: "Razorpay Landing Clone",
      category: "Frontend",
      description:
        "Pixel-perfect Razorpay landing page clone built with Tailwind CSS — focused on layout, responsiveness, and polish.",
      features: [
        "Pixel-perfect UI",
        "Fully responsive layout",
        "Tailwind CSS utility classes",
        "Smooth hover & transitions",
      ],
      tech: ["HTML", "Tailwind CSS", "JavaScript"],
      githubUrl: "https://github.com/rajivBhardwaj07/Razorpay-clone",
      liveUrl: "https://razorpay-clone-six-pi.vercel.app",
      accent: "from-blue-500 via-cyan-500 to-teal-500",
    },
    {
      id: "website",
      title: "Personal Website",
      category: "Frontend",
      description:
        "A clean, responsive personal website built from scratch using HTML & CSS — a foundational frontend project.",
      features: [
        "Pure HTML & CSS",
        "Responsive layout",
        "Clean, minimal design",
        "Lightweight & fast",
      ],
      tech: ["HTML", "CSS"],
      githubUrl: "https://github.com/rajivBhardwaj07/Website",
      liveUrl: "https://website-three-ochre-94.vercel.app",
      accent: "from-violet-500 via-purple-500 to-pink-500",
    },
    {
      id: "banking-system",
      title: "Banking Management System",
      category: "Java",
      description:
        "A desktop-based banking management system built in Java for handling accounts, transactions, and customer records.",
      features: [
        "Account management",
        "Transactions handling",
        "Customer records",
        "Desktop UI",
        "JDBC database access",
      ],
      tech: ["Java", "Swing", "JDBC", "MySQL"],
      githubUrl: "https://github.com/rajivBhardwaj07/BANKING-MANAGEMENT-SYSTEM",
      liveUrl: "https://banking-management-system-nu.vercel.app",
      accent: "from-amber-500 via-yellow-500 to-orange-500",
    },
  ];

  const PROJECT_CATEGORIES = ["All", "Full Stack", "Frontend", "Java"];

  const TIMELINE = [
    {
      type: "education",
      icon: "book-open",
      accent: "from-brand-500 to-accent-400",
      title: "B.Tech, Computer Science & Engineering",
      org: "Amity University (in progress)",
      period: "2022 — Present",
      location: "India",
      description:
        "Pursuing a Bachelor's degree with a focus on full stack development, data structures, algorithms, and applied AI.",
      bullets: [
        "Core CS foundations: DSA, DBMS, OS, Computer Networks",
        "Specialization tracks: Web Development & AI/ML",
        "Active participant in coding contests and hackathons",
      ],
    },
    {
      type: "milestone",
      icon: "star",
      accent: "from-fuchsia-500 to-rose-500",
      title: "AI & Full Stack Learning Journey",
      org: "Self-driven · Personal Projects",
      period: "2023 — Present",
      description:
        "Building production-grade MERN stack projects — from real-time social and communication apps to education tools and pixel-perfect UI clones.",
      bullets: [
        "Built SocialSphere — full-stack social platform with real-time chat",
        "Shipped Real-Time Communication App with WebSocket & WebRTC",
        "Exploring scalable MERN architectures and AI tooling",
      ],
    },
    {
      type: "experience",
      icon: "briefcase",
      accent: "from-emerald-500 to-teal-400",
      title: "Internship Preparation",
      org: "Open to Full Stack / AI Internships",
      period: "2026 — Available",
      description:
        "Actively preparing for full stack & AI engineering internships, sharpening problem solving and system design.",
      bullets: [
        "Daily DSA practice and system design study",
        "Refining portfolio projects for production readiness",
        "Strong communication and remote collaboration",
      ],
    },
  ];

  const CERTS = [
    {
      title: "Full Stack Web Development",
      issuer: "Coursera",
      year: "2024",
      description:
        "End-to-end web development covering React, Node.js, Express, and MongoDB.",
      accent: "from-indigo-500 to-cyan-400",
    },
    
    
    {
      title: "MongoDB for Developers",
      issuer: "MongoDB University",
      year: "2025",
      description:
        "Document modeling, aggregation pipelines, and Node.js driver patterns.",
      accent: "from-fuchsia-500 to-violet-500",
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      year: "2023",
      description:
        "HTML, CSS, Flexbox, Grid, and accessibility-first responsive layouts.",
      accent: "from-sky-500 to-blue-500",
    },
    {
      title: "Git & GitHub Essentials",
      issuer: "GitHub Education",
      year: "2023",
      description:
        "Version control workflows, branching strategies, and collaboration on GitHub.",
      accent: "from-orange-500 to-amber-500",
    },
  ];

  /* ---------------- ICONS (inline SVGs) ---------------- */

  function svg(d, viewBox = "0 0 24 24") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor" aria-hidden="true">${d}</svg>`;
  }
  function iconReact() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="2.2" fill="currentColor"/>
      <ellipse cx="12" cy="12" rx="10" ry="4"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
    </svg>`;
  }
  function iconNext() {
    return svg(
      `<path d="M11 2a10 10 0 1 0 6.5 17.6L7 7v10h2V11l9.5 11.4A10 10 0 0 0 11 2Zm4 5h2v8h-2V7Z"/>`,
    );
  }
  function iconTailwind() {
    return svg(
      `<path d="M12 6c-2.7 0-4.4 1.3-5 4 .9-1.2 1.95-1.65 3.15-1.35.7.18 1.2.68 1.75 1.23C12.85 10.74 13.95 11.85 16 11.85c2.7 0 4.4-1.3 5-4-.9 1.2-1.95 1.65-3.15 1.35-.7-.18-1.2-.68-1.75-1.23C15.15 7.11 14.05 6 12 6Zm-5 6c-2.7 0-4.4 1.3-5 4 .9-1.2 1.95-1.65 3.15-1.35.7.18 1.2.68 1.75 1.23C7.85 16.74 8.95 17.85 11 17.85c2.7 0 4.4-1.3 5-4-.9 1.2-1.95 1.65-3.15 1.35-.7-.18-1.2-.68-1.75-1.23C10.15 13.11 9.05 12 7 12Z"/>`,
    );
  }
  function iconJs() {
    return svg(
      `<rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" opacity=".15"/>
       <path d="M9 16.5c.4.7 1 1 1.7 1 .9 0 1.3-.5 1.3-1.5V9h1.6v7c0 1.7-1 2.7-2.6 2.7-1.4 0-2.4-.7-2.9-1.8l1-.4Zm6.7-.1c.4.5 1 1 1.9 1 .8 0 1.3-.4 1.3-.9 0-.6-.5-.9-1.4-1.3l-.5-.2c-1.5-.6-2.4-1.4-2.4-3 0-1.4 1.1-2.5 2.8-2.5 1.2 0 2.1.4 2.7 1.5l-1.5.9c-.3-.6-.7-.8-1.2-.8-.6 0-1 .4-1 .8 0 .6.4.8 1.3 1.2l.5.2c1.7.7 2.6 1.5 2.6 3.1 0 1.7-1.3 2.6-3.1 2.6-1.7 0-2.8-.8-3.4-1.9l1.4-.7Z"/>`,
    );
  }
  function iconTs() {
    return svg(
      `<rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" opacity=".15"/>
       <path d="M13 10h6v1.6h-2.2V18H15v-6.4H13V10Zm-2.5 1.6H8.5v6.4H6.7V11.6H4.5V10h6v1.6Z"/>`,
    );
  }
  function iconHtmlCss() {
    return svg(
      `<path d="M3 3l1.6 18 7.4 2 7.4-2L21 3H3Zm14.7 4.5-.4 2.5-5.3 0v2.4h5l-.6 5.6L12 19l-4.4-1 0-3h2.1l.1 1.4 2.2.6 2.3-.6.3-2.7H7.5l-.7-7.7h11l-.1 1.5Z"/>`,
    );
  }
  function iconNode() {
    return svg(
      `<path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 6.8 3.8L12 11.9 5.2 8.1 12 4.3Zm-7 5.7 6 3.4v6.4l-6-3.4V10Zm14 0v6.4l-6 3.4V13.4l6-3.4Z"/>`,
    );
  }
  function iconExpress() {
    return svg(
      `<path d="M3 12c0-3.3 2.5-6 6-6 2.6 0 4.6 1.5 5.6 3.6L11 15h2.5l1.7-3 1.7 3H19l-3-5 3-5h-2.1l-1.7 3-1.7-3H11l3 5-2.4 4c-.6 1-1.7 1.5-2.6 1.5C7 18 5 16 5 13c0-2.4 1.7-4.5 4.2-4.5 2 0 3.6 1.4 4 3H6.7c.3-1.3 1.2-2 2.5-2 .8 0 1.5.3 1.9.8l1.4-1A4.7 4.7 0 0 0 9.2 8C6.4 8 4 10 4 13c0 .7.1 1.3.3 1.9C2.3 14.3 3 12 3 12Z"/>`,
    );
  }
  function iconApi() {
    return svg(
      `<path d="M5 4h6v6H5V4Zm8 0h6v6h-6V4Zm-8 8h6v8H5v-8Zm8 4h6v4h-6v-4Zm0-2h6v0h-6v0Z"/>
       <path d="M13 12h6v2h-6v-2Z" opacity=".5"/>`,
    );
  }
  function iconMongo() {
    return svg(
      `<path d="M12 2c2 4 5 6 5 11 0 4-2 7-5 9-3-2-5-5-5-9 0-5 3-7 5-11Zm0 4c-1 2-2 4-2 7 0 3 1 5 2 6V6Z"/>`,
    );
  }
  function iconMysql() {
    return svg(
      `<path d="M3 8c0-2 1.5-3 3.5-3 1.4 0 2.8.7 4.2 2C12.6 8.6 13.7 9 15 9c1.5 0 2.5-.6 2.5-1.5L19 8c-.4 1.7-2 3-4 3-2 0-3.5-.6-5-2-1-1-2-1.5-3-1.5C5.7 7.5 5 8 5 8.5L3 8Zm14.5 5c.8.8 1.5 1.7 2.5 3l-1.4 1.2c-.7-.9-1.4-1.7-2.1-2.4-.6-.6-1.5-1.3-2.5-1.8 0 1.6-.4 3.4-2 5L11 18c1.5-1.4 1.6-3.7 1.6-6.3 0-1.4-.4-2.7-1-4l1.6-.7c.6 1.5 1 2.5 1 4 1 .4 2 1.1 3.3 2.5Z"/>`,
    );
  }
  function iconJava() {
    return svg(
      `<path d="M9 3c0 2 3 3 3 5s-2 2-2 4 2 2 2 4-2 3-2 3 4-2 4-4-2-2-2-4 2-2 2-4-3-4-5-4Zm-2 14c-1 1-1 2 1 2.5 4 1 10 .5 13-1.5-1.5.5-9 1-12 0-.5-.2-1-.5-1-.5-.5 0-.7-.2-1-.5Zm-1 3c2 1 8 2 14 0-1 1-4 2-8 2s-7-.5-6-2Z"/>`,
    );
  }
  function iconPython() {
    return svg(
      `<path d="M11 2c-3 0-5 1.5-5 4v3h6V10H5c-2 0-3 2-3 5s1 5 3 5h2v-3c0-2 1.5-3 4-3h4c2 0 3-1 3-3V6c0-2-1.5-3-4-3h-3Zm-2 2.5c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1Z"/>
       <path d="M13 22c3 0 5-1.5 5-4v-3h-6v-1h7c2 0 3-2 3-5s-1-5-3-5h-2v3c0 2-1.5 3-4 3h-4c-2 0-3 1-3 3v6c0 2 1.5 3 4 3h3Zm2-2.5c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1Z" opacity=".7"/>`,
    );
  }
  function iconOpenCV() {
    return svg(
      `<circle cx="6" cy="8" r="3.5"/>
       <circle cx="12" cy="18" r="3.5" opacity=".7"/>
       <circle cx="18" cy="8" r="3.5" opacity=".5"/>`,
    );
  }
  function iconFace() {
    return svg(
      `<rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
       <circle cx="9" cy="10" r="1.2"/>
       <circle cx="15" cy="10" r="1.2"/>
       <path d="M9 15c1 1 4 1 6 0" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
    );
  }
  function iconAI() {
    return svg(
      `<path d="M12 3 4 7v10l8 4 8-4V7l-8-4Zm0 2.3 6 3v7.4l-6 3-6-3V8.3l6-3Z"/>
       <path d="M9 10h6v1.5H9V10Zm0 3h6v1.5H9V13Z" opacity=".7"/>`,
    );
  }
  function iconGit() {
    return svg(
      `<path d="M21.6 11.3 12.7 2.4a1.4 1.4 0 0 0-2 0L9 4.3l2.3 2.3c.5-.2 1.1 0 1.5.4.4.4.5 1 .3 1.6L15.3 11a1.4 1.4 0 0 1 1.5.3 1.4 1.4 0 0 1-2 2 1.4 1.4 0 0 1-.3-1.5L12.5 9.7v5.7a1.4 1.4 0 1 1-1.2 0V9.6a1.4 1.4 0 0 1-.7-1.8L8.3 5.6 2.4 11.4a1.4 1.4 0 0 0 0 2l8.9 8.8a1.4 1.4 0 0 0 2 0l8.3-8.3a1.4 1.4 0 0 0 0-1.7Z"/>`,
    );
  }
  function iconGithub() {
    return svg(
      `<path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0 1 12 6.8c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.59.69.49A10 10 0 0 0 12 2Z"/>`,
    );
  }
  function iconVSCode() {
    return svg(
      `<path d="M17 2 7 12l-4-3-1 1.5 4 4.5-4 4.5L3 21l4-3 10 10 4-2V4l-4-2Zm0 5.6v9l-5-4.5 5-4.5Z"/>`,
    );
  }
  function iconPostman() {
    return svg(
      `<circle cx="12" cy="12" r="9"/>
       <path d="m9 14 5-5 1.5 1.5L10.5 15.5 9 14Z" fill="#fff"/>`,
    );
  }

  /* ---------------- THEME ---------------- */

  const themeBtn = $("#theme-toggle");
  themeBtn?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
    if (window.feather) window.feather.replace();
  });

  /* ---------------- LOADING SCREEN ---------------- */

  window.addEventListener("load", () => {
    setTimeout(() => $("#loader")?.classList.add("hidden"), 800);
  });

  /* ---------------- YEAR IN FOOTER ---------------- */

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------- SCROLL PROGRESS ---------------- */

  const progressEl = $("#scroll-progress");
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
    if (progressEl) progressEl.style.transform = `scaleX(${ratio.toFixed(4)})`;
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------------- NAVBAR (scroll effect + scrollspy + mobile menu) ---------------- */

  const navShell = $("#nav-shell");
  const navLinks = $$("#nav-links a");
  const mobileToggle = $("#mobile-toggle");
  const mobileMenu = $("#mobile-menu");

  function onScrollNav() {
    if (!navShell) return;
    if (window.scrollY > 16) {
      navShell.classList.add(
        "shadow-lg",
        "shadow-black/5",
        "backdrop-blur-2xl",
      );
      navShell.style.borderColor = "rgb(var(--border))";
      navShell.style.backgroundColor = "rgb(var(--card) / 0.7)";
    } else {
      navShell.classList.remove(
        "shadow-lg",
        "shadow-black/5",
        "backdrop-blur-2xl",
      );
      navShell.style.borderColor = "transparent";
      navShell.style.backgroundColor = "transparent";
    }
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  mobileToggle?.addEventListener("click", () => {
    if (!mobileMenu) return;
    const open = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    mobileToggle.setAttribute("aria-expanded", String(!open));
    document.body.style.overflow = !open ? "hidden" : "";
    const icon = mobileToggle.querySelector("svg");
    if (icon) {
      mobileToggle.innerHTML = !open
        ? '<i data-feather="x" class="h-5 w-5"></i>'
        : '<i data-feather="menu" class="h-5 w-5"></i>';
      if (window.feather) window.feather.replace();
    }
  });
  $$("#mobile-menu a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu?.classList.add("hidden");
      mobileToggle?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      mobileToggle.innerHTML = '<i data-feather="menu" class="h-5 w-5"></i>';
      if (window.feather) window.feather.replace();
    }),
  );

  // Scrollspy
  const sectionIds = navLinks.map((a) => a.getAttribute("href")).filter(Boolean);
  const sections = sectionIds
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible || !visible.target.id) return;
      const id = "#" + visible.target.id;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------------- REVEAL ON SCROLL ---------------- */

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  $$(".reveal").forEach((el) => revealObs.observe(el));

  /* ---------------- TYPING ANIMATION ---------------- */

  const typedEl = $("#typed");
  const phrases = [
    "Full Stack Apps",
    "AI-powered Tools",
    "MERN Experiences",
    "Scalable Systems",
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    if (!typedEl) return;
    const current = phrases[phraseIdx % phrases.length];
    if (!deleting) {
      charIdx++;
      typedEl.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        return setTimeout(tick, 1400);
      }
      return setTimeout(tick, 70);
    } else {
      charIdx--;
      typedEl.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx++;
      }
      return setTimeout(tick, 40);
    }
  }
  if (!reduceMotion) tick();
  else if (typedEl) typedEl.textContent = phrases[0];

  /* ---------------- CURSOR GLOW ---------------- */

  const cursorGlow = $("#cursor-glow");
  if (cursorGlow && !reduceMotion && !window.matchMedia("(pointer: coarse)").matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      cursorGlow.style.transform = `translate3d(${cx - 200}px, ${cy - 200}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });
    raf = requestAnimationFrame(loop);
  } else if (cursorGlow) {
    cursorGlow.style.display = "none";
  }

  /* ---------------- PARTICLE BACKGROUND ---------------- */

  (function particles() {
    const canvas = $("#particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(110, Math.floor((w * h) / 16000));
      particles = [];
      for (let i = 0; i < target; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.4,
        });
      }
    }
    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains("dark");
      const dotColor = isDark ? "rgba(165,180,252,0.7)" : "rgba(79,70,229,0.45)";
      const linePrefix = isDark ? "rgba(99,102,241," : "rgba(79,70,229,";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const mx = mouse.x - p.x;
        const my = mouse.y - p.y;
        const md2 = mx * mx + my * my;
        if (md2 < 160 * 160) {
          const f = (1 - Math.sqrt(md2) / 160) * 0.04;
          p.vx = Math.max(-0.8, Math.min(0.8, p.vx + (mx / 160) * f));
          p.vy = Math.max(-0.8, Math.min(0.8, p.vy + (my / 160) * f));
        }

        ctx.beginPath();
        ctx.fillStyle = dotColor;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            const a = (1 - Math.sqrt(d2) / 130) * 0.35;
            ctx.strokeStyle = `${linePrefix}${a.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      if (!reduceMotion) requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener("mouseleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
    resize();
    if (!reduceMotion) requestAnimationFrame(draw);
    else draw();
  })();

  /* ---------------- RENDER: SKILLS ---------------- */

  const skillsGrid = $("#skills-grid");
  if (skillsGrid) {
    skillsGrid.innerHTML = SKILLS.map(
      (cat, idx) => `
      <div class="reveal reveal-delay-${(idx % 6) + 1} card group relative overflow-hidden p-6 hover:shadow-glow">
        <div class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/30 to-accent-400/20 opacity-0 blur-3xl transition-opacity group-hover:opacity-100"></div>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">${cat.title}</h3>
          <span class="text-xs font-mono" style="color: rgb(var(--muted))">0${idx + 1}</span>
        </div>
        <p class="mt-1 text-sm" style="color: rgb(var(--muted))">${cat.description}</p>
        <div class="mt-6 grid grid-cols-3 gap-3">
          ${cat.skills
            .map(
              (s) => `
            <div class="skill-tile" title="${s.name}">
              <span class="h-7 w-7 ${s.color}">${s.icon()}</span>
              <span class="text-[11px] font-medium" style="color: rgb(var(--muted))">${s.name}</span>
            </div>`,
            )
            .join("")}
        </div>
      </div>`,
    ).join("");
    // Re-observe new .reveal nodes
    $$("#skills-grid .reveal").forEach((el) => revealObs.observe(el));
  }

  /* ---------------- RENDER: PROJECTS + FILTER ---------------- */

  const filtersEl = $("#project-filters");
  const grid = $("#projects-grid");
  const emptyEl = $("#projects-empty");
  let activeFilter = "All";

  function renderFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = PROJECT_CATEGORIES.map(
      (c) =>
        `<button type="button" data-filter="${c}" class="filter-btn ${c === activeFilter ? "active" : ""}">${c}</button>`,
    ).join("");
    filtersEl.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => {
        activeFilter = b.getAttribute("data-filter") || "All";
        renderFilters();
        renderProjects();
      }),
    );
  }

  function renderProjects() {
    if (!grid) return;
    const list =
      activeFilter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter);

    if (list.length === 0) {
      grid.innerHTML = "";
      if (emptyEl) {
        emptyEl.classList.remove("hidden");
        emptyEl.textContent = `More ${activeFilter} projects coming soon.`;
      }
      return;
    }
    if (emptyEl) emptyEl.classList.add("hidden");

    grid.innerHTML = list
      .map(
        (p, i) => `
      <article class="project-card reveal reveal-delay-${(i % 6) + 1} group relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all hover:shadow-glow"
        style="border-color: rgb(var(--border)); background-color: rgb(var(--card) / 0.6)"
        data-cat="${p.category}">
        <div class="relative h-48 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br ${p.accent} opacity-90"></div>
          <div class="absolute inset-0 grid-bg opacity-30"></div>
          <div class="absolute inset-0 noise opacity-10"></div>
          <div class="mock-window">
            <div class="mb-2 flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full bg-rose-400"></span>
              <span class="h-2 w-2 rounded-full bg-amber-400"></span>
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
            </div>
            <div class="space-y-2">
              <div class="h-2 w-3/4 rounded bg-white/40"></div>
              <div class="h-2 w-1/2 rounded bg-white/30"></div>
              <div class="h-16 rounded bg-white/20"></div>
              <div class="grid grid-cols-3 gap-2">
                <div class="h-6 rounded bg-white/30"></div>
                <div class="h-6 rounded bg-white/20"></div>
                <div class="h-6 rounded bg-white/30"></div>
              </div>
            </div>
          </div>
          <div class="absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur">${p.category}</div>
        </div>
        <div class="p-6">
          <h3 class="text-lg font-semibold">${p.title}</h3>
          <p class="mt-2 text-sm leading-relaxed" style="color: rgb(var(--muted))">${p.description}</p>
          <ul class="mt-4 space-y-1.5 text-sm" style="color: rgb(var(--muted))">
            ${p.features
              .map(
                (f) =>
                  `<li class="flex items-start gap-2"><span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400"></span>${f}</li>`,
              )
              .join("")}
          </ul>
          <div class="mt-5 flex flex-wrap gap-1.5">
            ${p.tech.map((t) => `<span class="chip" style="color: rgb(var(--muted))">${t}</span>`).join("")}
          </div>
          <div class="mt-6 flex items-center gap-3">
            ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-400 px-4 py-2 text-xs font-semibold text-white shadow-glow"><i data-feather="external-link" class="h-3.5 w-3.5"></i> Live Demo</a>` : ""}
            <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur transition-colors hover:text-brand-400" style="border-color: rgb(var(--border)); background-color: rgb(var(--bg) / 0.4)"><i data-feather="github" class="h-3.5 w-3.5"></i> GitHub</a>
          </div>
        </div>
      </article>`,
      )
      .join("");

    if (window.feather) window.feather.replace();
    $$("#projects-grid .reveal").forEach((el) => revealObs.observe(el));
  }

  renderFilters();
  renderProjects();

  /* ---------------- RENDER: TIMELINE ---------------- */

  const tl = $("#timeline");
  if (tl) {
    tl.innerHTML = TIMELINE.map((item, idx) => {
      const isLeft = idx % 2 === 0;
      const label =
        item.type === "education"
          ? "Education"
          : item.type === "experience"
            ? "Experience"
            : "Milestone";
      const bullets = item.bullets
        .map(
          (b) =>
            `<li class="flex gap-2 ${isLeft ? "md:flex-row-reverse" : ""}"><span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400"></span><span>${b}</span></li>`,
        )
        .join("");
      return `
        <li class="reveal relative md:grid md:grid-cols-2 md:gap-10">
          <div class="absolute left-4 top-2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-gradient-to-br ${item.accent} text-white shadow-glow ring-4 md:left-1/2" style="--tw-ring-color: rgb(var(--bg))">
            <i data-feather="${item.icon}" class="h-4 w-4"></i>
          </div>
          <div class="pl-12 md:pl-0 ${isLeft ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}">
            <div class="glass relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-glow">
              <div class="flex flex-wrap items-center gap-2 text-xs">
                <span class="chip"><span class="h-1.5 w-1.5 rounded-full bg-gradient-to-br ${item.accent}"></span>${label}</span>
                <span class="font-mono text-[11px]" style="color: rgb(var(--muted))">${item.period}</span>
              </div>
              <h3 class="mt-3 text-lg font-semibold">${item.title}</h3>
              <p class="text-sm" style="color: rgb(var(--muted))">${item.org}${item.location ? ` · ${item.location}` : ""}</p>
              <p class="mt-3 text-sm leading-relaxed" style="color: rgb(var(--muted))">${item.description}</p>
              <ul class="mt-3 space-y-1.5 text-sm ${isLeft ? "md:text-right" : ""}" style="color: rgb(var(--muted))">${bullets}</ul>
            </div>
          </div>
        </li>`;
    }).join("");
    $$("#timeline .reveal").forEach((el) => revealObs.observe(el));
  }

  /* ---------------- RENDER: CERTIFICATIONS ---------------- */

  const certsGrid = $("#certs-grid");
  if (certsGrid) {
    certsGrid.innerHTML = CERTS.map(
      (c, i) => `
      <a href="#" class="reveal reveal-delay-${(i % 6) + 1} group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all hover:shadow-glow hover:-translate-y-1.5"
         style="border-color: rgb(var(--border)); background-color: rgb(var(--card) / 0.6)">
        <div class="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${c.accent} opacity-20 blur-3xl transition-opacity group-hover:opacity-40"></div>
        <div class="flex items-center justify-between">
          <div class="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${c.accent} text-white shadow-glow">
            <i data-feather="award" class="h-5 w-5"></i>
          </div>
          <span class="font-mono text-xs" style="color: rgb(var(--muted))">${c.year}</span>
        </div>
        <h3 class="mt-4 text-lg font-semibold">${c.title}</h3>
        <p class="mt-1 text-xs uppercase tracking-[0.18em]" style="color: rgb(var(--muted))">${c.issuer}</p>
        <p class="mt-3 text-sm leading-relaxed" style="color: rgb(var(--muted))">${c.description}</p>
        <div class="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">
          View credential <i data-feather="external-link" class="h-4 w-4"></i>
        </div>
      </a>`,
    ).join("");
    $$("#certs-grid .reveal").forEach((el) => revealObs.observe(el));
  }

  /* ---------------- CONTACT FORM ---------------- */

  const form = $("#contact-form");
  const status = $("#cf-status");
  const submitBtn = $("#cf-submit");

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg;
    status.className =
      "text-sm font-medium " +
      (kind === "ok"
        ? "text-emerald-500"
        : kind === "err"
          ? "text-rose-500"
          : "");
  }

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $("#cf-name").value.trim();
    const email = $("#cf-email").value.trim();
    const message = $("#cf-message").value.trim();
    if (!name || !email || !message) {
      setStatus("Please fill all fields.", "err");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email.", "err");
      return;
    }
    submitBtn.disabled = true;
    setStatus("Sending…", "");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("Thanks! I'll be in touch soon.", "ok");
        form.reset();
      } else {
        setStatus(data.error || "Something went wrong. Try again.", "err");
      }
    } catch {
      setStatus("Network error. Please try again.", "err");
    } finally {
      submitBtn.disabled = false;
    }
  });

  /* ---------------- INIT FEATHER ICONS ---------------- */

  function initFeather() {
    if (window.feather) window.feather.replace();
    else setTimeout(initFeather, 50);
  }
  initFeather();
})();
