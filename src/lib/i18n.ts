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
    buildAppTitle: string;
    buildAppDesc: string;
    debugTitle: string;
    debugDesc: string;
    terminalTitle: string;
    terminalDesc: string;
    game: {
      backToLab: string;
      tagline: string;
      introTitle: string;
      introDesc: string;
      letsGo: string;
      checkBtn: string;
      nextBtn: string;
      seeResultsBtn: string;
      skipBtn: string;
      emptyPrompt: string;
      skippedFeedback: string;
      playAgain: string;
      exploreProjects: string;
      highScore: string;
      levelTag: string;
      youBuiltIt: string;
      fullScoreNote: string;
      partialScoreNote: string;
      correctFeedback: readonly string[];
      incorrectFeedback: readonly string[];
    };
    debugGame: {
      tagline: string;
      introTitle: string;
      introDesc: string;
      letsGo: string;
      checkBtn: string;
      nextBtn: string;
      seeResultsBtn: string;
      skipBtn: string;
      emptyPrompt: string;
      skippedFeedback: string;
      playAgain: string;
      exploreProjects: string;
      highScore: string;
      levelTag: string;
      debuggedIt: string;
      fullScoreNote: string;
      partialScoreNote: string;
      systemStatusHeader: string;
      correctFeedback: readonly string[];
      incorrectFeedback: readonly string[];
    };
    shipItTitle: string;
    shipItDesc: string;
    shipItGame: {
      tagline: string;
      introTitle: string;
      introDesc: string;
      instruction: string;
      startBtn: string;
      crashed: string;
      scoreTag: string;
      bestTag: string;
      tryAgain: string;
      backToLab: string;
      exploreProjects: string;
      localStage: string;
      stagingStage: string;
      productionStage: string;
      youreLive: string;
      almostNote: string;
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
      subtitle: "Small interactive mini-games and developer puzzles built around how I think about systems.",
      playableTag: "MINI-GAME",
      comingSoonTag: "COMING SOON",
      playBtn: "Play",
      exploreLab: "Explore SIN.OS Lab",
      buildAppTitle: "Build the App",
      buildAppDesc: "Pick the right pieces and build a tiny app. Quick, casual, and easy to play.",
      debugTitle: "Debug SIN.OS",
      debugDesc: "Uh oh. Something broke. Diagnose quick bugs under real system constraints.",
      terminalTitle: "Terminal Mission",
      terminalDesc: "Something's offline. Command-line objective challenges and script automation tasks.",
      game: {
        backToLab: "Back to Lab",
        tagline: "Pick what you need. Build something cool.",
        introTitle: "Let's build a tiny app.",
        introDesc: "Pick the things you think it needs. Quick & easy.",
        letsGo: "Let's go",
        checkBtn: "Check it",
        nextBtn: "Next",
        seeResultsBtn: "See results",
        skipBtn: "Skip",
        emptyPrompt: "Pick something first.",
        skippedFeedback: "Skipped — let's move on.",
        playAgain: "Play again",
        exploreProjects: "Want to see the real stuff? Explore Projects",
        highScore: "Best Score",
        levelTag: "LEVEL",
        youBuiltIt: "YOU BUILT IT.",
        fullScoreNote: "Clean run. You've got the basics down.",
        partialScoreNote: "Pretty good. Want another shot?",
        correctFeedback: [
          "Nice! You nailed it.",
          "Yep, that's it.",
          "Easy. Clean choice.",
          "You got it!",
          "Boom. Perfect.",
        ],
        incorrectFeedback: [
          "Not quite. Think about what the app actually needs.",
          "Almost! Take another look.",
          "Hmm, close! Try again.",
          "Dikit lagi! Re-check your picks.",
        ],
      },
      debugGame: {
        tagline: "Something broke. Can you find it?",
        introTitle: "Something broke. Let's find out what.",
        introDesc: "Inspect the clues and pick what's likely broken. Quick & easy.",
        letsGo: "Let's find out",
        checkBtn: "Check it",
        nextBtn: "Next",
        seeResultsBtn: "See results",
        skipBtn: "Skip",
        emptyPrompt: "Pick something first.",
        skippedFeedback: "Skipped — moving on.",
        playAgain: "Play again",
        exploreProjects: "Want to see the real stuff? Explore Projects",
        highScore: "Best Score",
        levelTag: "LEVEL",
        debuggedIt: "DEBUGGED IT.",
        fullScoreNote: "Clean run. Nice catch!",
        partialScoreNote: "Pretty good. Want another shot?",
        systemStatusHeader: "SIN.OS STATUS",
        correctFeedback: [
          "Nice catch! You found it.",
          "Yep, that makes total sense.",
          "Spot on! Clean diagnosis.",
          "Boom. Problem solved.",
        ],
        incorrectFeedback: [
          "Not quite. Check the clues again.",
          "Almost! Take another look.",
          "Hmm, close! Think about where the issue originates.",
        ],
      },
      shipItTitle: "SHIP IT",
      shipItDesc: "Can you keep it online?",
      shipItGame: {
        tagline: "Can you keep it online?",
        introTitle: "Keep the deployment alive.",
        introDesc: "Tap or press Space to boost your packet. Avoid bugs and errors on the way to production.",
        instruction: "Tap, click, or press Space.",
        startBtn: "Start Deployment",
        crashed: "CRASHED.",
        scoreTag: "Score",
        bestTag: "Best",
        tryAgain: "Try again",
        backToLab: "Back to Lab",
        exploreProjects: "Want to see real projects? Explore Projects",
        localStage: "LOCAL",
        stagingStage: "STAGING",
        productionStage: "PRODUCTION",
        youreLive: "YOU'RE LIVE.",
        almostNote: "Dikit lagi ke-ship.",
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
      subtitle: "Mini-game interaktif santai yang dirancang di sekitar logika berpikir seorang Full Stack Developer.",
      playableTag: "MINI-GAME",
      comingSoonTag: "SEGERA HADIR",
      playBtn: "Main",
      exploreLab: "Jelajahi SIN.OS Lab",
      buildAppTitle: "Build the App",
      buildAppDesc: "Pilih bagian yang pas dan bikin aplikasi kecil. Santai, cepat, dan gampang dimainkan.",
      debugTitle: "Debug SIN.OS",
      debugDesc: "Waduh, ada yang rusak. Cari tahu bug tersembunyi secara cepat.",
      terminalTitle: "Terminal Mission",
      terminalDesc: "Ada yang offline. Tantangan berbasis perintah command-line dan script.",
      game: {
        backToLab: "Kembali ke Lab",
        tagline: "Pilih yang dibutuhkan. Bikin sesuatu yang keren.",
        introTitle: "Yuk, bikin aplikasi kecil.",
        introDesc: "Pilih hal-hal yang menurutmu dibutuhkan. Cepat & gampang.",
        letsGo: "Gas",
        checkBtn: "Cek",
        nextBtn: "Lanjut",
        seeResultsBtn: "Lihat hasil",
        skipBtn: "Lewati",
        emptyPrompt: "Pilih dulu.",
        skippedFeedback: "Dilewati. Lanjut ke berikutnya.",
        playAgain: "Main lagi",
        exploreProjects: "Mau lihat project aslinya? Lihat Project",
        highScore: "Skor Terbaik",
        levelTag: "LEVEL",
        youBuiltIt: "BERHASIL DIBANGUN.",
        fullScoreNote: "Clean banget! Dasarnya sudah dapet.",
        partialScoreNote: "Udah lumayan! Mau coba lagi?",
        correctFeedback: [
          "Nice! Yap, benar.",
          "Mantap! Pilihan yang pas.",
          "Berhasil. Simple kan?",
          "Yap! Tepat banget.",
          "Clean! Gas terus.",
        ],
        incorrectFeedback: [
          "Belum tepat. Coba pikir lagi, aplikasinya butuh apa?",
          "Hampir! Coba lihat lagi jawabannya.",
          "Dikit lagi. Coba cek lagi pilihanmu.",
          "Belum pas. Coba lagi yuk!",
        ],
      },
      debugGame: {
        tagline: "Ada yang rusak. Bisa kamu temukan?",
        introTitle: "Ada yang rusak. Yuk, kita cari tahu.",
        introDesc: "Periksa petunjuknya dan pilih bagian yang bermasalah. Cepat & gampang.",
        letsGo: "Gas cari tahu",
        checkBtn: "Cek",
        nextBtn: "Lanjut",
        seeResultsBtn: "Lihat hasil",
        skipBtn: "Lewati",
        emptyPrompt: "Pilih dulu.",
        skippedFeedback: "Dilewati. Lanjut ke berikutnya.",
        playAgain: "Main lagi",
        exploreProjects: "Mau lihat project aslinya? Lihat Project",
        highScore: "Skor Terbaik",
        levelTag: "LEVEL",
        debuggedIt: "BERHASIL DIDEBUG.",
        fullScoreNote: "Clean banget! Mantap diagnosanya.",
        partialScoreNote: "Udah lumayan! Mau coba lagi?",
        systemStatusHeader: "SIN.OS STATUS",
        correctFeedback: [
          "Nice, ketemu! Pilihan yang pas.",
          "Yap, bener banget bagian itu yang bermasalah.",
          "Mantap! Diagnosanya tepat.",
          "Berhasil. Masalah teratasi!",
        ],
        incorrectFeedback: [
          "Belum tepat. Coba cek petunjuknya lagi.",
          "Hampir! Coba lihat lebih teliti.",
          "Belum pas. Coba pikir dari mana masalahnya berasal.",
        ],
      },
      shipItTitle: "SHIP IT",
      shipItDesc: "Bisa bikin dia tetap online?",
      shipItGame: {
        tagline: "Bisa bikin dia tetap online?",
        introTitle: "Jaga deployment tetap hidup.",
        introDesc: "Tap atau tekan Space untuk boost paket. Hindari bug dan error menuju production.",
        instruction: "Tap, klik, atau tekan Space.",
        startBtn: "Mulai Deployment",
        crashed: "CRASH.",
        scoreTag: "Skor",
        bestTag: "Terbaik",
        tryAgain: "Coba lagi",
        backToLab: "Kembali ke Lab",
        exploreProjects: "Mau lihat project aslinya? Lihat Project",
        localStage: "LOCAL",
        stagingStage: "STAGING",
        productionStage: "PRODUCTION",
        youreLive: "SUDAH LIVE.",
        almostNote: "Dikit lagi ke-ship.",
      },
    },
  },
};

