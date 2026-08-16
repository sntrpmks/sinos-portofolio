export type Locale = "en" | "id";

export interface TranslationSchema {
  nav: {
    work: string;
    about: string;
    journey: string;
    contact: string;
    resume: string;
    lab: string;
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
  lab: {
    tag: string;
    titleMain: string;
    titleAccent: string;
    subtitle: string;
    playableTag: string;
    comingSoonTag: string;
    playBtn: string;
    exploreLab: string;
    stackBuilderTitle: string;
    stackBuilderDesc: string;
    debugTitle: string;
    debugDesc: string;
    terminalTitle: string;
    terminalDesc: string;
    game: {
      backToLab: string;
      challengeTag: string;
      availableComponents: string;
      yourArchitecture: string;
      checkArchitecture: string;
      reset: string;
      timer: string;
      score: string;
      systemReady: string;
      systemFailed: string;
      nextChallenge: string;
      playAgain: string;
      exploreProjects: string;
      highScore: string;
      emptyArchitecture: string;
      selectPrompt: string;
      correctFeedback: string;
      missingFeedback: string;
      orderFeedback: string;
      unnecessaryFeedback: string;
    };
  };
}

export const translations: Record<Locale, TranslationSchema> = {
  en: {
    nav: {
      work: "Projects",
      about: "About",
      journey: "Journey",
      contact: "Contact",
      resume: "Resume",
      lab: "Lab",
      askAi: "Ask SIN.OS",
      searchShortcut: "⌘K",
      searchPlaceholder: "Search projects, skills, certificates, or pages...",
      menu: "Menu",
      language: "Language",
    },
    hero: {
      identityTag: "SIN.OS // PROFILE",
      location: "Wonosobo, Indonesia",
      headlineTitle: "Sinatria Pamungkas",
      headlineSub: "Full Stack Developer | AI Enthusiast",
      intro:
        "I build web applications across the frontend and backend, explore practical AI integrations, and convert real-world problems into functional digital tools.",
      ctaWork: "View Projects",
      ctaAi: "Ask SIN.OS",
    },
    selectedWork: {
      tag: "01 // PORTFOLIO",
      titleMain: "Selected ",
      titleAccent: "Projects.",
      exploreAll: "View all projects →",
      viewCaseStudy: "View Project Details",
      exploreCaseFilesCount: "Explore all case studies",
    },
    about: {
      tag: "02 // BACKGROUND",
      titleMain: "About ",
      titleAccent: "Me.",
      readFullBio: "Read full bio →",
      subhead: "FULL STACK DEVELOPER | AI ENTHUSIAST",
      summary:
        "Informatics Management student at Universitas Sains Al-Qur'an (UNSIQ) and Software Engineering (RPL) graduate from SMKN 1 Wonosobo. I enjoy building things from the interface users see to the systems running behind them.",
      internship: "Student Internship: Proactive Robotika",
      location: "Wonosobo, Indonesia",
      btnPhilosophy: "How I Think & Principles →",
      btnTimeline: "Full Journey Timeline →",
    },
    capabilities: {
      tag: "03 // CAPABILITIES",
      titleMain: "Technologies & ",
      titleAccent: "Tools.",
      subhead: "Tech Stack & Hands-on Tools",
      verifiedIn: "Used in",
      projectsCount: "project(s)",
    },
    milestones: {
      tag: "04 // MILESTONES",
      titleMain: "Certificates & ",
      titleAccent: "Achievements.",
      viewAll: "View all credentials",
      previewScan: "Preview Scan",
      credentialLink: "Credential Link",
    },
    aiUtility: {
      tag: "SIN.OS AI ASSISTANT",
      title: "Have questions about Sinatria's portfolio?",
      description:
        "Ask our grounded AI assistant about specific projects, technical decisions, or background credentials directly.",
      cta: "Ask SIN.OS →",
      modalTitle: "Ask SIN.OS AI",
      modalSubtitle: "Ask anything about Sinatria's projects, tech stack, or background.",
      inputPlaceholder: "Ask a question about Sinatria's work...",
      suggestedHeader: "Suggested questions:",
      suggested: [
        "What projects has Sinatria built?",
        "What technologies does he use most?",
        "What did he do during his robotics internship?",
        "How can I contact Sinatria?",
      ],
      emptyNote: "Grounded strictly on verified SIN.OS portfolio data.",
    },
    contact: {
      tag: "05 // CONTACT",
      titleMain: "Let's ",
      titleAccent: "Connect.",
      description: "Have a project idea, opportunity, or want to discuss technology? Feel free to reach out.",
      cta: "Get in touch →",
      emailLabel: "Direct Email",
      linkedinLabel: "LinkedIn Profile",
      githubLabel: "GitHub Profile",
    },
    journeyPage: {
      title: "Development Journey",
      subtitle:
        "Tracing growth from initial programming basics in 2024 to student internship at Proactive Robotika, web application development, and verified software & AI credentials.",
      credentialsTitle: "Verified Certifications & Credentials",
      timelineTitle: "Experience & Education Timeline",
    },
    footer: {
      rights: "All rights reserved.",
      terminalTrigger: "terminal",
    },
    lab: {
      tag: "EXPERIMENTAL LAB",
      titleMain: "SIN.OS ",
      titleAccent: "Lab.",
      subtitle: "Small interactive experiments and architecture puzzles built around how I think about systems.",
      playableTag: "PLAYABLE MVP",
      comingSoonTag: "COMING SOON",
      playBtn: "Launch Experiment →",
      exploreLab: "Explore SIN.OS Lab",
      stackBuilderTitle: "Stack Builder",
      stackBuilderDesc: "An architecture-building puzzle. Select and order components to construct valid system topologies.",
      debugTitle: "Debug SIN.OS",
      debugDesc: "Diagnose silent bugs, race conditions, and memory bottlenecks under real system constraints.",
      terminalTitle: "Terminal Mission",
      terminalDesc: "Command-line objective challenges and script automation tasks.",
      game: {
        backToLab: "← Back to Lab",
        challengeTag: "CHALLENGE",
        availableComponents: "AVAILABLE COMPONENTS",
        yourArchitecture: "YOUR ARCHITECTURE TOPOLOGY",
        checkArchitecture: "Validate Architecture →",
        reset: "Reset Board",
        timer: "Time",
        score: "Score",
        systemReady: "System ready.",
        systemFailed: "Architecture check failed.",
        nextChallenge: "Next Challenge →",
        playAgain: "Play Again",
        exploreProjects: "Want to see how I build real projects? Explore Projects →",
        highScore: "Best Score",
        emptyArchitecture: "Tap components below to place them into your system topology.",
        selectPrompt: "Tap or click components to add them in order.",
        correctFeedback: "Nice. The architecture checks out perfectly.",
        missingFeedback: "Some key architectural layer is missing from the pipeline.",
        orderFeedback: "Components are placed out of logical flow order.",
        unnecessaryFeedback: "Contains unnecessary components for this specific challenge.",
      },
    },
  },

  id: {
    nav: {
      work: "Project",
      about: "Tentang",
      journey: "Perjalanan",
      contact: "Kontak",
      resume: "Resume",
      lab: "Lab",
      askAi: "Tanya SIN.OS",
      searchShortcut: "⌘K",
      searchPlaceholder: "Cari project, keahlian, sertifikat, atau halaman...",
      menu: "Menu",
      language: "Bahasa",
    },
    hero: {
      identityTag: "SIN.OS // PROFIL",
      location: "Wonosobo, Indonesia",
      headlineTitle: "Sinatria Pamungkas",
      headlineSub: "Full Stack Developer | AI Enthusiast",
      intro:
        "Saya membangun aplikasi web dari frontend sampai backend, mengeksplorasi integrasi AI, dan senang mengubah kebutuhan nyata menjadi aplikasi yang berguna.",
      ctaWork: "Lihat Project",
      ctaAi: "Tanya SIN.OS",
    },
    selectedWork: {
      tag: "01 // PORTOFOLIO",
      titleMain: "Project ",
      titleAccent: "Pilihan.",
      exploreAll: "Lihat semua project →",
      viewCaseStudy: "Lihat Detail Project",
      exploreCaseFilesCount: "Jelajahi semua studi kasus",
    },
    about: {
      tag: "02 // LATAR BELAKANG",
      titleMain: "Tentang ",
      titleAccent: "Saya.",
      readFullBio: "Baca profil lengkap →",
      subhead: "FULL STACK DEVELOPER | AI ENTHUSIAST",
      summary:
        "Mahasiswa Manajemen Informatika di Universitas Sains Al-Qur'an (UNSIQ) dan alumni Rekayasa Perangkat Lunak SMKN 1 Wonosobo. Saya senang membangun aplikasi dari tampilan antarmuka sampai sistem di belakangnya.",
      internship: "Magang Siswa: Proactive Robotika",
      location: "Wonosobo, Indonesia",
      btnPhilosophy: "Cara Berpikir & Prinsip →",
      btnTimeline: "Lini Masa Perjalanan →",
    },
    capabilities: {
      tag: "03 // KEAHLIAN",
      titleMain: "Teknologi & ",
      titleAccent: "Stack.",
      subhead: "Teknologi yang Biasa Digunakan",
      verifiedIn: "Digunakan di",
      projectsCount: "project",
    },
    milestones: {
      tag: "04 // PENCAPAIAN",
      titleMain: "Sertifikat & ",
      titleAccent: "Pencapaian.",
      viewAll: "Lihat semua sertifikat",
      previewScan: "Pratinjau Berkas",
      credentialLink: "Tautan Kredensial",
    },
    aiUtility: {
      tag: "ASISTEN AI SIN.OS",
      title: "Punya pertanyaan tentang karya atau latar belakang Sinatria?",
      description:
        "Tanyakan langsung pada SIN.OS AI tentang project, keputusan teknis, atau latar belakang Sinatria.",
      cta: "Tanya SIN.OS →",
      modalTitle: "TANYA SIN.OS AI",
      modalSubtitle: "Tanyakan apa saja tentang project, keahlian, atau pengalaman Sinatria.",
      inputPlaceholder: "Tanyakan sesuatu tentang Sinatria...",
      suggestedHeader: "Rekomendasi pertanyaan:",
      suggested: [
        "Project apa saja yang pernah dibuat Sinatria?",
        "Teknologi apa yang paling sering dia gunakan?",
        "Pengalaman apa yang dia dapat saat magang robotika?",
        "Bagaimana cara menghubungi Sinatria?",
      ],
      emptyNote: "Jawaban berdasarkan data resmi portofolio SIN.OS.",
    },
    contact: {
      tag: "05 // KONTAK",
      titleMain: "Mari ",
      titleAccent: "Terhubung.",
      description: "Punya ide project, peluang kerja sama, atau ingin berdiskusi? Hubungi saya.",
      cta: "Hubungi Saya →",
      emailLabel: "Email Direct",
      linkedinLabel: "Profil LinkedIn",
      githubLabel: "Profil GitHub",
    },
    journeyPage: {
      title: "Perjalanan Pengembangan",
      subtitle:
        "Perjalanan belajar coding dari dasar di tahun 2024, magang siswa di Proactive Robotika, hingga mengembangkan aplikasi web dan meraih sertifikasi terverifikasi.",
      credentialsTitle: "Sertifikasi & Kredensial Terverifikasi",
      timelineTitle: "Lini Masa Pengalaman & Pendidikan",
    },
    footer: {
      rights: "Hak cipta dilindungi.",
      terminalTrigger: "terminal",
    },
    lab: {
      tag: "LAB EKSPERIMEN",
      titleMain: "SIN.OS ",
      titleAccent: "Lab.",
      subtitle: "Eksperimen interaktif dan teka-teki arsitektur yang dirancang berdasarkan logika pemrograman sistem.",
      playableTag: "SIAP DIMAINKAN",
      comingSoonTag: "SEGERA HADIR",
      playBtn: "Mulai Eksperimen →",
      exploreLab: "Jelajahi SIN.OS Lab",
      stackBuilderTitle: "Stack Builder",
      stackBuilderDesc: "Teka-teki penyusunan arsitektur web. Pilih dan urutkan komponen untuk membangun alur sistem yang valid.",
      debugTitle: "Debug SIN.OS",
      debugDesc: "Diagnosa bug tersembunyi, kondisi race, dan kendala memori dalam batasan sistem nyata.",
      terminalTitle: "Terminal Mission",
      terminalDesc: "Tantangan berbasis perintah command-line dan otomatisasi script.",
      game: {
        backToLab: "← Kembali ke Lab",
        challengeTag: "TANTANGAN",
        availableComponents: "KOMPONEN TERSEDIA",
        yourArchitecture: "TOPOLOGI ARSITEKTUR ANDA",
        checkArchitecture: "Uji Arsitektur →",
        reset: "Reset Board",
        timer: "Waktu",
        score: "Skor",
        systemReady: "Sistem siap.",
        systemFailed: "Uji arsitektur belum sesuai.",
        nextChallenge: "Tantangan Berikutnya →",
        playAgain: "Main Lagi",
        exploreProjects: "Ingin melihat bagaimana saya membangun project nyata? Lihat Project →",
        highScore: "Skor Tertinggi",
        emptyArchitecture: "Tekan komponen di bawah untuk memasukkannya ke dalam alur topologi sistem.",
        selectPrompt: "Tekan atau klik komponen untuk menyusun urutan alur sistem.",
        correctFeedback: "Nice. Arsitekturnya sudah benar dan berfungsi presisi.",
        missingFeedback: "Ada lapisan komponen penting yang belum dimasukkan ke alur.",
        orderFeedback: "Urutan posisi komponen belum sesuai alur logika yang tepat.",
        unnecessaryFeedback: "Terdapat komponen berlebih yang tidak diperlukan untuk tantangan ini.",
      },
    },
  },
};

