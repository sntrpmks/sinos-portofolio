export type Locale = "en" | "id";

export interface TranslationSchema {
  nav: {
    work: string;
    about: string;
    journey: string;
    contact: string;
    resume: string;
    askAi: string;
    searchShortcut: string;
    searchPlaceholder: string;
    menu: string;
    language: string;
  };
  hero: {
    identityTag: string;
    location: string;
    headlineTitle: string;
    headlineSub: string;
    intro: string;
    ctaWork: string;
    ctaAi: string;
  };
  selectedWork: {
    tag: string;
    titleMain: string;
    titleAccent: string;
    exploreAll: string;
    viewCaseStudy: string;
    exploreCaseFilesCount: string;
  };
  about: {
    tag: string;
    titleMain: string;
    titleAccent: string;
    readFullBio: string;
    subhead: string;
    summary: string;
    internship: string;
    location: string;
    btnPhilosophy: string;
    btnTimeline: string;
  };
  capabilities: {
    tag: string;
    titleMain: string;
    titleAccent: string;
    subhead: string;
    verifiedIn: string;
    projectsCount: string;
  };
  milestones: {
    tag: string;
    titleMain: string;
    titleAccent: string;
    viewAll: string;
    previewScan: string;
    credentialLink: string;
  };
  aiUtility: {
    tag: string;
    title: string;
    description: string;
    cta: string;
    modalTitle: string;
    modalSubtitle: string;
    inputPlaceholder: string;
    suggestedHeader: string;
    suggested: readonly string[];
    emptyNote: string;
  };
  contact: {
    tag: string;
    titleMain: string;
    titleAccent: string;
    description: string;
    cta: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
  };
  journeyPage: {
    title: string;
    subtitle: string;
    credentialsTitle: string;
    timelineTitle: string;
  };
  footer: {
    rights: string;
    terminalTrigger: string;
  };
}

export const translations: Record<Locale, TranslationSchema> = {
  en: {
    nav: {
      work: "Work",
      about: "About",
      journey: "Journey",
      contact: "Contact",
      resume: "Resume",
      askAi: "Ask SIN.OS",
      searchShortcut: "⌘K",
      searchPlaceholder: "Search SIN.OS pages, work, certifications...",
      menu: "Menu",
      language: "Language",
    },
    hero: {
      identityTag: "SIN.OS // IDENTITY",
      location: "Wonosobo, Indonesia",
      headlineTitle: "Sinatria Pamungkas",
      headlineSub: "Full Stack Developer | AI Enthusiast",
      intro:
        "I build web applications, explore AI/API integrations, and turn ideas into working digital experiences. Focused on clean system design, practical engineering, and reliable architecture.",
      ctaWork: "View my work",
      ctaAi: "Ask SIN.OS",
    },
    selectedWork: {
      tag: "01 // PORTFOLIO",
      titleMain: "Selected ",
      titleAccent: "Work.",
      exploreAll: "Explore all case files",
      viewCaseStudy: "View case study",
      exploreCaseFilesCount: "Explore all case files",
    },
    about: {
      tag: "02 // BACKGROUND",
      titleMain: "About ",
      titleAccent: "Me.",
      readFullBio: "Read full bio →",
      subhead: "FULL STACK DEVELOPER | AI ENTHUSIAST",
      summary:
        "Informatics Management student at Universitas Sains Al-Qur'an (UNSIQ) and SMKN 1 Wonosobo alumni. Dedicated to building high-performance web systems, native mobile applications, and exploring practical LLM / AI integrations.",
      internship: "Student Internship: Proactive Robotika",
      location: "Wonosobo, Indonesia",
      btnPhilosophy: "Engineering Philosophy →",
      btnTimeline: "Full Journey Timeline →",
    },
    capabilities: {
      tag: "03 // CAPABILITIES",
      titleMain: "What I ",
      titleAccent: "Work With.",
      subhead: "Evidence-Backed Stack",
      verifiedIn: "Verified in",
      projectsCount: "project(s)",
    },
    milestones: {
      tag: "04 // MILESTONES",
      titleMain: "A Few ",
      titleAccent: "Milestones.",
      viewAll: "View all credentials",
      previewScan: "Preview Scan",
      credentialLink: "Credential Link",
    },
    aiUtility: {
      tag: "AI ASSISTANT UTILITY",
      title: "Have questions about Sinatria's background?",
      description:
        "Ask our grounded AI assistant. Query specific projects, technical decisions, or background credentials instantly.",
      cta: "Ask SIN.OS →",
      modalTitle: "Ask SIN.OS Assistant",
      modalSubtitle: "Ask anything about Sinatria's projects, technical decisions, or background.",
      inputPlaceholder: "Ask a question about Sinatria's portfolio...",
      suggestedHeader: "Suggested questions:",
      suggested: [
        "What projects has Sinatria built?",
        "What AI & API experience does he have?",
        "What did he learn during his robotics internship?",
        "What technologies does he specialize in?",
      ],
      emptyNote: "Grounded on verified SIN.OS content only.",
    },
    contact: {
      tag: "05 // CONTACT",
      titleMain: "Let's ",
      titleAccent: "Build Something.",
      description: "Have an idea, opportunity, or project discussion? Feel free to reach out.",
      cta: "Get in touch →",
      emailLabel: "Direct Email",
      linkedinLabel: "LinkedIn Profile",
      githubLabel: "GitHub Repository",
    },
    journeyPage: {
      title: "Development Journey",
      subtitle:
        "Tracing growth from baseline programming fundamentals in 2024 to student internship at Proactive Robotika, web application development, and verified AI & software engineering certifications.",
      credentialsTitle: "Verified Certifications & Credentials",
      timelineTitle: "Experience & Education Timeline",
    },
    footer: {
      rights: "All rights reserved.",
      terminalTrigger: "terminal",
    },
  },

  id: {
    nav: {
      work: "Project",
      about: "Tentang",
      journey: "Perjalanan",
      contact: "Kontak",
      resume: "Resume",
      askAi: "Tanya SIN.OS",
      searchShortcut: "⌘K",
      searchPlaceholder: "Cari project, sertifikat, atau halaman...",
      menu: "Menu",
      language: "Bahasa",
    },
    hero: {
      identityTag: "SIN.OS // IDENTITAS",
      location: "Wonosobo, Indonesia",
      headlineTitle: "Sinatria Pamungkas",
      headlineSub: "Full Stack Developer | AI Enthusiast",
      intro:
        "Saya membangun aplikasi web dari frontend hingga backend, sekaligus mengeksplorasi bagaimana AI dapat diintegrasikan ke dalam produk digital. Berfokus pada arsitektur yang rapi dan eksekusi yang nyata.",
      ctaWork: "Lihat project",
      ctaAi: "Tanya SIN.OS",
    },
    selectedWork: {
      tag: "01 // PORTOFOLIO",
      titleMain: "Project ",
      titleAccent: "Pilihan.",
      exploreAll: "Lihat semua project →",
      viewCaseStudy: "Lihat studi kasus",
      exploreCaseFilesCount: "Jelajahi semua studi kasus",
    },
    about: {
      tag: "02 // LATAR BELAKANG",
      titleMain: "Tentang ",
      titleAccent: "Saya.",
      readFullBio: "Baca profil lengkap →",
      subhead: "FULL STACK DEVELOPER | AI ENTHUSIAST",
      summary:
        "Mahasiswa Manajemen Informatika di Universitas Sains Al-Qur'an (UNSIQ) dan alumni SMKN 1 Wonosobo. Saya berfokus membangun aplikasi web, sistem mobile native, serta mengeksplorasi integrasi AI secara praktis.",
      internship: "Magang Siswa: Proactive Robotika",
      location: "Wonosobo, Indonesia",
      btnPhilosophy: "Filosofi Rekayasa →",
      btnTimeline: "Lini Masa Perjalanan →",
    },
    capabilities: {
      tag: "03 // KETRAMPILAN",
      titleMain: "Teknologi & ",
      titleAccent: "Keahlian.",
      subhead: "Stack Berbasis Bukti",
      verifiedIn: "Terverifikasi di",
      projectsCount: "project",
    },
    milestones: {
      tag: "04 // TONGGAK PERJALANAN",
      titleMain: "Sertifikat & ",
      titleAccent: "Pencapaian.",
      viewAll: "Lihat semua sertifikat",
      previewScan: "Pratinjau Berkas",
      credentialLink: "Tautan Kredensial",
    },
    aiUtility: {
      tag: "UTILITAS ASISTEN AI",
      title: "Ingin tahu lebih banyak tentang project Sinatria?",
      description:
        "Tanyakan langsung pada SIN.OS AI tentang project, keputusan teknis, atau latar belakang Sinatria.",
      cta: "Tanya SIN.OS →",
      modalTitle: "ASK SIN.OS AI",
      modalSubtitle: "Tanyakan apa saja tentang project, keputusan teknis, atau latar belakang Sinatria.",
      inputPlaceholder: "Tanyakan sesuatu tentang Sinatria...",
      suggestedHeader: "Rekomendasi pertanyaan:",
      suggested: [
        "Sinatria itu siapa?",
        "Ceritakan project yang pernah dibuat",
        "Teknologi apa yang paling dikuasainya?",
        "Bagaimana cara menghubungi Sinatria?",
      ],
      emptyNote: "Berdasarkan data resmi SIN.OS.",
    },
    contact: {
      tag: "05 // KONTAK",
      titleMain: "Mari ",
      titleAccent: "Berdiskusi.",
      description: "Punya ide project, peluang kerja sama, atau ingin berdiskusi teknis? Silakan hubungi saya.",
      cta: "Hubungi saya →",
      emailLabel: "Email Langsung",
      linkedinLabel: "Profil LinkedIn",
      githubLabel: "Repositori GitHub",
    },
    journeyPage: {
      title: "Perjalanan Pengembangan",
      subtitle:
        "Perkembangan dari dasar pemrograman di tahun 2024, magang di Proactive Robotika, hingga pengembangan aplikasi web dan sertifikasi terverifikasi.",
      credentialsTitle: "Sertifikasi & Kredensial Terverifikasi",
      timelineTitle: "Lini Masa Pengalaman & Pendidikan",
    },
    footer: {
      rights: "Hak cipta dilindungi undang-undang.",
      terminalTrigger: "terminal",
    },
  },
};
