# ENTERPRISE ARCHITECTURE GUIDE: MODERN WEB APPLICATION STANDARDS

Panduan arsitektur dan struktur proyek berbasis **Next.js / React / TypeScript** skala industri. Panduan ini dirancang secara universal untuk menjamin keterbacaan, efisiensi, serta skalabilitas produk digital dari skala portofolio hingga platform enterprise.

---

## 🔍 1. EVALUASI KRITIS TERHADAP ARSITEKTUR REPO KEVIN NAZAR (`portofolio-v2`)

Meskipun repositori teman Anda (`kevinnazarr/portofolio-v2`) terlihat rapi di permukaan karena menggunakan pemisahan folder *features*, **dokumen `ARCHITECTURE.md` miliknya sendiri membocorkan 8 Dosa Arsitektur (Architectural Smells & Technical Debt)** yang SANGAT DIHINDARI dalam standar industri enterprise.

### ❌ 8 Celah & Kesalahan Arsitektur di Repositori Teman Anda:

1. **Dead Code & Kode Sampah yang Terlupakan (Catatan Poin 13)**:
   - Terdapat berkas `src/lib/form-validation.ts` (132 baris) yang sama sekali **tidak di-import di mana pun**.
   - Terdapat berkas tipe `src/types/api.ts` yang dibuat tetapi **tidak dipakai** karena Route Handler mendefinisikan tipenya sendiri secara ad-hoc.
   - *Pelajaran*: Dalam skala industri, *dead code* meningkatkan ukuran repositori, membingungkan pengembang lain, dan membuang waktu saat audit.

2. **Duplikasi Skema Validasi (Melanggar Prinsip DRY)**:
   - Memiliki `src/lib/validation/contact.schema.ts` (65 baris) DAN `src/lib/validation/contact.ts`.
   - *Pelajaran*: Memiliki dua sumber validasi untuk fitur yang sama berisiko menimbulkan *bug* ketika salah satu berkas diperbarui tetapi berkas lainnya lupa diubah.

3. **Script NPM Rusak & Berkas Hilang (*Broken Build Pipeline*)**:
   - Di `package.json` terdapat perintah `npm run upload:r2` yang merujuk ke berkas `scripts/upload-to-r2.ts`, tetapi **folder `scripts/` dan berkasnya SAMA SEKALI TIDAK ADA di repositori**.
   - *Pelajaran*: Script build yang rusak akan menghancurkan sistem CI/CD otomatis di perusahaan.

4. **Salah Penempatan Lokasi Data Konten (*Wrong Domain Classification*)**:
   - Data entitas proyek (JSON) diletakkan di `src/dictionaries/content/projects/`.
   - *Pelajaran*: Folder `dictionaries/` secara standar industri murni hanya untuk **kamus teks UI lokalisasi** (`id.json`, `en.json`). Menaruh data bisnis/proyek di dalam `dictionaries/` adalah kesalahan klasifikasi domain. Data entitas harus berada di `content/` atau `src/data/`.

5. **Ketergantungan Berbahaya pada `mtime` Berkas untuk Sitemap SEO**:
   - `sitemap.ts` mengambil tanggal modifikasi dari `fs.statSync(mtime)`.
   - *Pelajaran*: Di server CI/CD atau Vercel deployment (di mana Git melakukan *clone* ulang setiap kali deploy), tanggal `mtime` berkas akan **selalu berubah menjadi hari ini**, merusak caching Google Bot karena menganggap seluruh halaman diubah setiap kali ada commit kecil.

6. **Keterikatan Ketat pada Vendor Hosting (*Vendor Lock-in*)**:
   - Logika proxy di `src/proxy.ts` mengandalkan header spesifik Vercel `x-vercel-ip-country`.
   - *Pelajaran*: Jika aplikasi dipindahkan ke AWS, Docker, VPS, atau Cloudflare, aplikasi akan mengalami *fallback error* karena header tersebut tidak ada di server non-Vercel.

7. **Dokumentasi README Usang & Menyesatkan (*Desynchronized Docs*)**:
   - README menyebutkan path folder `src/content/projects/`, padahal lokasi aktualnya sudah dipindah ke `src/dictionaries/content/projects/`.
   - *Pelajaran*: Dokumentasi yang salah lebih berbahaya daripada tidak ada dokumentasi sama sekali.

8. **Over-Engineering untuk Skala Portofolio**:
   - Mengombinasikan GSAP ScrollTrigger + Framer Motion + Spline 3D + Upstash Redis + Resend + Custom Proxy + CSRF Tokens sekaligus pada portofolio pribadi tanpa pembersihan dependensi.

---

## 🏛️ 2. FILOSOFI UTAMA ARSITEKTUR INDUSTRI

1. **Separation of Concerns (Pemisahan Tanggung Jawab)**:
   - **Route Layer (`src/app`)**: Hanya menangani rute, layout dasar, dan eksekusi server-side awal.
   - **UI Layer (`src/components`)**: Murni komponen tampilan tanpa logika bisnis (*stateless / presentation-only*).
   - **Domain/Feature Layer (`src/features`)**: Modul mandiri yang membungkus logika bisnis, state, API, dan komponen spesifik domain.
   - **Core/Service Layer (`src/lib`, `src/config`)**: Layanan eksternal, konfigurasi, dan utilitas helper.

2. **Feature-Sliced Design (FSD)**:
   - Fitur utama dikelompokkan secara mandiri (*self-contained*). Jika sebuah fitur dihapus, seluruh folder fitur tersebut dapat dibuang tanpa merusak modul lainnya.

3. **Single Source of Truth (SSOT)**:
   - Konfigurasi, rute, dan teks lokalisasi disimpan secara terpusat di `config/`, `constants/`, dan `dictionaries/`.

---

## 📁 3. STRUKTUR DIREKTORI UNIVERSAL (TEMPLATE STANDAR)

```text
root/
├── .vscode/                   # Konfigurasi workspace IDE (settings, extensions)
├── public/                    # Aset statis publik (images, icons, fonts, pdf)
│   ├── favicon.ico
│   └── media/
├── src/                       # Kode sumber aplikasi utama
│   ├── app/                   # Routing Layer (Next.js App Router)
│   │   ├── (auth)/            # Route Group untuk otentikasi (login, register)
│   │   ├── (dashboard)/       # Route Group untuk area aplikasi utama
│   │   ├── api/               # API Route Handlers (Backend Endpoints)
│   │   │   └── v1/
│   │   ├── globals.css        # Style global & CSS Variables / Tailwind Setup
│   │   ├── layout.tsx         # Root Layout
│   │   ├── page.tsx           # Homepage Route
│   │   ├── robots.ts          # Generator SEO robots.txt
│   │   └── sitemap.ts         # Generator SEO sitemap.xml
│   │
│   ├── components/            # Shared Atomic UI Components (Design System)
│   │   ├── ui/                # Komponen Primitif (Button, Input, Card, Modal, Dropdown)
│   │   ├── layout/            # Komponen Tata Letak (Navbar, Footer, Sidebar)
│   │   └── feedback/          # Komponen Status (Toast, Skeleton, Loader, ErrorState)
│   │
│   ├── config/                # Konfigurasi Aplikasi & Lingkungan (Environment)
│   │   ├── env.ts             # Validasi Environment Variables (menggunakan Zod)
│   │   └── site.ts            # Metadata Situs (title, description, SEO defaults)
│   │
│   ├── constants/             # Teks & Nilai Tetap (Immutable Values)
│   │   └── navigation.ts      # Menu navigasi & tautan rute
│   │
│   ├── dictionaries/          # Lokalisasi Multi-Bahasa (i18n Dictionaries)
│   │   ├── en.json            # Kamus Teks UI Bahasa Inggris
│   │   ├── id.json            # Kamus Teks UI Bahasa Indonesia
│   │   └── index.ts           # Loader Dictionaries
│   │
│   ├── features/              # Feature-Sliced Modules (Logika Bisnis Berdasarkan Domain)
│   │   ├── auth/              # Modul Otentikasi
│   │   ├── projects/          # Modul Studi Kasus & Portofolio
│   │   ├── ai-assistant/      # Modul Chatbot & Integrasi AI
│   │   └── contact/           # Modul Form Kontak & Validasi
│   │
│   ├── hooks/                 # Shared Custom React Hooks (Non-Feature Specific)
│   │   ├── use-debounce.ts
│   │   └── use-media-query.ts
│   │
│   ├── lib/                   # Utility & SDK Helper Services
│   │   ├── ai/                # Integrasi Client SDK AI
│   │   ├── db/                # Klien Database
│   │   └── utils.ts           # Fungsi helper umum (cn, formatDate)
│   │
│   ├── middleware.ts          # Next.js Middleware (Auth Guard, i18n Redirects)
│   └── types/                 # Definisi Tipe TypeScript Global
│       ├── api.ts             # Tipe Payload Response HTTP Standard
│       └── index.ts
│
├── .env.example               # Contoh berkas variabel lingkungan tanpa secret
├── .env.local                 # Berkas variabel lingkungan lokal (TIDAK DIPUSH KE GIT)
├── .gitignore                 # Berkas yang diabaikan Git
├── next.config.ts             # Konfigurasi Next.js Compiler
├── package.json               # Daftar Dependensi & NPM Scripts
├── README.md                  # Dokumentasi Resmi Proyek
└── tsconfig.json              # Konfigurasi TypeScript & Path Aliases
```

---

## 🎯 4. ANATOMI FOLDER FITUR MANDIRI (`src/features/<feature-name>`)

Setiap modul di dalam `src/features/` berdiri secara mandiri (*encapsulated module*):

```text
src/features/projects/
├── api/                       # API Calls & Mutation Hooks
│   └── get-projects.ts
├── components/                # Komponen Visual Spesifik Fitur
│   ├── project-card.tsx
│   └── project-gallery.tsx
├── hooks/                     # Custom Hooks Spesifik Fitur
│   └── use-project-filter.ts
├── types/                     # Tipe Data Spesifik Fitur
│   └── project.types.ts
└── index.ts                   # Public Barrel Export (Gerbang resmi modul)
```

---

## 📜 5. 7 ATURAN EMAS KODIFIKASI (PREVENTING ANTI-PATTERNS)

1. **App Router (`src/app`) Hanya Berisi "Thin Pages"**: Berkas `page.tsx` hanya sebagai penampung rute (maksimal 20-40 baris kode).
2. **Pemisahan Jelas `components/` vs `features/`**: `components/` hanya untuk UI netral (*Design System*), `features/` untuk domain bisnis.
3. **Proteksi Impor Menggunakan Public API (`index.ts`)**: Hanya mengimpor apa yang diekspor oleh `index.ts` dari sebuah modul fitur.
4. **Tanpa Hardcoded Teks / Secrets**: Semua kunci dan teks wajib melalui `dictionaries/` atau `config/env.ts`.
5. **Tanpa Dead Code / Script Rusak**: Jalankan audit pembersihan berkas sebelum melakukan commit atau rilis produksi.
6. **Validasi Environment Variables di `src/config/env.ts`**: Gunakan Zod untuk mengecek keberadaan variabel lingkungan saat runtime.
7. **Pemisahan Data Bisnis vs Teks UI**: Data entitas (JSON produk/proyek) wajib dipisahkan dari folder `dictionaries/` lokalisasi UI.
