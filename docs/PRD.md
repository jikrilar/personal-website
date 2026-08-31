# Product Requirements Document (PRD)

## Personal Portfolio Website

**Document Version:** 1.1  
**Status:** Ready for Design & Development  
**Product Type:** Personal Portfolio Website  
**Primary Stack:** Astro, Tailwind CSS, Magic UI  
**Supporting UI Runtime:** React Islands where required by interactive Magic UI/custom components

---

## 1. Product Overview

Personal Portfolio Website adalah website pribadi yang berfungsi sebagai representasi profesional, teknis, dan visual dari pemilik portfolio. Website akan menampilkan identitas, ringkasan profil, technical skills, project, experience, serta sarana bagi pengunjung untuk mengirim pesan.

Website dirancang dengan pendekatan visual yang clean, modern, monokrom, dan interaktif. Animasi digunakan sebagai bagian dari pengalaman pengguna, bukan sekadar dekorasi. Setiap section memiliki karakter visual yang berbeda, tetapi tetap mengikuti satu design language yang konsisten.

Astro digunakan sebagai fondasi utama agar website tetap cepat dan ringan. Tailwind CSS digunakan untuk styling dan responsive layout. Magic UI digunakan secara selektif untuk komponen visual dan motion. Komponen custom akan digunakan untuk bagian Skills dan Experience agar desain tidak terasa seperti gabungan banyak component library.

---

## 2. Background & Problem Statement

Portfolio developer sering kali jatuh pada salah satu dari dua ekstrem:

1. Terlalu statis sehingga tidak cukup menunjukkan kemampuan visual dan frontend.
2. Terlalu penuh animasi sehingga informasi profesional menjadi sulit dibaca.

Website ini harus berada di tengah keduanya. Pengunjung harus dapat dengan cepat memahami siapa pemilik portfolio, apa kemampuan utamanya, project yang pernah dibuat, serta pengalaman yang dimiliki, sambil tetap mendapatkan pengalaman visual yang memorable.

Portfolio juga harus berfungsi sebagai bukti kemampuan membangun website modern dengan perhatian terhadap performance, responsive design, animation, usability, dan detail UI.

---

## 3. Product Goals

### 3.1 Primary Goals

- Memperkenalkan identitas profesional pemilik portfolio dengan cepat dan jelas.
- Menampilkan skill teknis dalam visual yang clean dan interaktif.
- Menampilkan project utama serta project lainnya dengan hierarchy yang jelas.
- Menampilkan pengalaman profesional melalui timeline berbasis scroll.
- Menyediakan contact form yang mudah digunakan.
- Menghasilkan pengalaman portfolio yang memorable tanpa mengorbankan readability dan performance.
- Menunjukkan kemampuan frontend melalui pemanfaatan motion, interaction, component composition, dan responsive design.

### 3.2 Secondary Goals

- Memiliki struktur yang mudah dikembangkan ketika project atau experience baru ditambahkan.
- Memiliki performa tinggi pada desktop maupun mobile.
- Memiliki SEO dasar yang baik agar halaman dapat ditemukan dan dibagikan dengan baik.
- Menjaga penggunaan JavaScript client-side seminimal mungkin melalui Astro Islands.

---

## 4. Non-Goals

Versi awal website tidak ditujukan untuk:

- Menjadi CMS penuh.
- Memiliki dashboard admin.
- Memiliki authentication/user account.
- Menjadi blog platform penuh.
- Menggunakan animasi berat pada setiap elemen.
- Menggunakan banyak component library sekaligus.
- Menampilkan seluruh detail CV secara verbatim.
- Menggunakan visual colorful yang bertentangan dengan design direction utama.

---

## 5. Target Audience

### 5.1 Primary Audience

- Recruiter dan HR.
- Hiring manager.
- Technical recruiter.
- Engineering/IT team.
- Calon rekan kerja atau kolaborator.

### 5.2 Secondary Audience

- Developer lain.
- Calon klien atau pihak yang ingin menghubungi pemilik portfolio.
- Pengunjung yang ingin melihat project atau technical stack yang digunakan.

---

## 6. Design Direction

### 6.1 Visual Principles

Website menggunakan prinsip berikut:

- Clean.
- Modern.
- Monochrome / black-and-white dominant.
- Strong typography.
- Generous whitespace.
- Minimal border usage.
- Motion-driven interaction.
- High contrast.
- Tidak menggunakan gradient atau visual colorful sebagai elemen utama.

### 6.2 Motion Principles

Motion harus:

- Memiliki tujuan yang jelas.
- Membantu hierarchy atau transition.
- Tidak menghambat pengguna membaca konten.
- Tidak membuat scroll terasa berat.
- Menggunakan durasi dan easing yang konsisten.
- Menghormati preferensi `prefers-reduced-motion`.

### 6.3 Visual Rhythm

Website harus memiliki pergantian antara section visual yang kuat dan section yang lebih tenang:

1. Intro — visual.
2. Hero — strong visual.
3. About — interactive visual.
4. Skills — clean + interactive.
5. Projects — strong visual.
6. Experience — clean + scroll motion.
7. Send Message — strong visual.
8. Footer — minimal.

---

## 7. Technology Stack

### 7.1 Core

- **Astro** — routing, page structure, static rendering, SEO, layout, asset handling.
- **Tailwind CSS** — styling, responsive layout, design tokens, utility classes.
- **TypeScript** — preferred language untuk komponen dan logic.

### 7.2 Interactive Components

- **Magic UI** — komponen motion dan visual tertentu.
- **React** — hanya digunakan sebagai island untuk komponen yang membutuhkan runtime React.
- **Motion / animation dependency used by selected components** — digunakan hanya bila diperlukan.

### 7.3 Component Strategy

Magic UI hanya digunakan pada komponen yang sudah ditentukan dalam PRD.

Komponen Magic UI yang direncanakan:

- Morphing Text.
- Video Text.
- Typing Animation.
- Pixel Image.
- Bento Grid.
- Border Beam.
- Particles.

Custom implementation digunakan untuk:

- Interactive Tech Stack Grid.
- Scroll Timeline.

Tujuannya adalah menghindari ketergantungan berlebihan terhadap component library dan menjaga design language tetap konsisten.

### 7.4 Development Tooling

Development dilakukan menggunakan tooling berikut:

- **OpenCode** — agentic coding environment utama selama development.
- **Magic UI MCP Server** — digunakan melalui OpenCode untuk membantu mencari, mengambil referensi, dan mengimplementasikan komponen Magic UI yang sudah ditentukan dalam PRD.

Magic UI MCP dikonfigurasikan sebagai local MCP server pada OpenCode dengan package:

```text
@magicuidesign/mcp@latest
```

Contoh konfigurasi OpenCode:

```json
{
  "mcp": {
    "magicuidesign-mcp": {
      "type": "local",
      "command": [
        "npx",
        "-y",
        "@magicuidesign/mcp@latest"
      ],
      "enabled": true
    }
  }
}
```

### 7.5 Magic UI MCP Usage Rules

Magic UI MCP merupakan **development tooling**, bukan bagian dari runtime website dan bukan requirement yang terlihat oleh end user.

Aturan penggunaan:

- Gunakan Magic UI MCP hanya ketika mencari, menambahkan, atau memodifikasi komponen Magic UI.
- Jangan menggunakan Magic UI MCP untuk general coding task yang tidak berhubungan dengan Magic UI.
- Jangan menggunakan Magic UI MCP untuk mengganti custom Interactive Tech Stack Grid.
- Jangan menggunakan Magic UI MCP untuk mengganti custom Scroll Timeline.
- Komponen dari Magic UI tetap harus disesuaikan dengan design direction monochrome website.
- Hindari menambahkan komponen Magic UI baru di luar daftar PRD tanpa kebutuhan produk yang jelas.
- MCP tidak mengubah arsitektur aplikasi; komponen React tetap diintegrasikan melalui Astro React Islands hanya jika hydration memang diperlukan.
- Komponen yang tidak membutuhkan client-side interaction harus diusahakan tetap statis/server-rendered untuk menjaga performa.

---

## 8. Information Architecture

Website menggunakan struktur single-page dengan urutan berikut:

```text
Loading / Intro Overlay
        ↓
Navbar
        ↓
Hero
        ↓
About
        ↓
Skills
        ↓
Projects
        ↓
Experience
        ↓
Send Message
        ↓
Footer
```

Navigasi utama menggunakan anchor navigation menuju section terkait.

---

# 9. Functional Requirements

## 9.1 Loading / Intro Overlay

### Purpose

Memberikan first impression sebelum halaman utama ditampilkan.

### Component

Magic UI **Morphing Text**.

### Content

Teks tampil secara bergantian:

1. Hello
2. Bonjour
3. Hola
4. Ciao
5. Hallo
6. Olá
7. Hei
8. Goedendag
9. Halo, Selamat Datang

### Behavior

- Intro berlangsung sekitar **3 detik**.
- Intro berupa full-screen overlay.
- Halaman utama tetap boleh dirender di belakang overlay.
- Website tidak boleh sengaja menahan network/resource loading selama 3 detik.
- Setelah sequence selesai, overlay keluar menggunakan transition yang smooth.
- Hero kemudian menjadi fokus utama.

### Recommended Transition

```text
Morphing greetings
        ↓
"Halo, Selamat Datang"
        ↓
Fade / clip / translate transition
        ↓
Hero reveal
```

### Requirements

- Loader hanya berfungsi sebagai intro animation.
- Tidak boleh menyebabkan layout shift setelah hilang.
- Scroll halaman sebaiknya dikunci selama intro aktif.
- Harus memiliki graceful behavior untuk pengguna dengan reduced motion.

---

## 9.2 Navbar

### Purpose

Memberikan navigasi cepat ke section utama tanpa mengganggu hero.

### Visual

- Tidak menggunakan border.
- Minimal.
- Menyatu dengan halaman.
- Tidak menggunakan visual card yang berat.

### Navigation Items

Minimum:

- About
- Skills
- Projects
- Experience
- Contact

### Behavior

- Anchor navigation.
- Smooth scrolling jika motion preference memungkinkan.
- Active-state boleh ditambahkan secara subtle.
- Harus responsive pada mobile.

### Optional Enhancement

Navbar dapat berubah menjadi compact mobile navigation pada viewport kecil tanpa mengubah design language utama.

---

## 9.3 Hero Section

### Purpose

Menjadi primary identity statement dan visual focal point website.

### Main Component

Magic UI **Video Text**.

### Content

- Nama lengkap pemilik portfolio menjadi elemen visual utama.
- Nama harus menjadi fokus terbesar pada viewport awal.

### Layout

- Full-width.
- Memiliki vertical spacing besar.
- Harus terlihat kuat pada desktop maupun mobile.

### Requirements

- Video yang digunakan sebagai fill harus memiliki kontras yang cukup.
- Text tetap terbaca sebagai nama meskipun menggunakan video mask/fill.
- Asset video harus dioptimasi.
- Harus tersedia fallback apabila video tidak dapat dimainkan.
- Hindari elemen tambahan yang mengurangi dominasi nama.

---

## 9.4 About Section

### Purpose

Memberikan ringkasan singkat mengenai profil dan positioning profesional.

### Layout

Desktop:

```text
┌──────────────────────┬──────────────────────┐
│                      │                      │
│      Summary         │       Photo          │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

Mobile:

```text
Summary
   ↓
Photo
```

### Left Column

Magic UI **Typing Animation**.

Content berupa ringkasan profesional yang singkat dan tidak mengulang seluruh CV.

### Right Column

Magic UI **Pixel Image**.

Content berupa personal photo.

### Requirements

- Typing animation harus tetap mudah dibaca.
- Teks tidak boleh terlalu panjang untuk animated typing.
- Pixel effect harus tetap menjaga wajah/foto dapat dikenali dengan jelas.
- Image harus responsive dan optimized.
- Layout tidak boleh terlalu sempit pada tablet.

---

## 9.5 Skills Section

### Purpose

Menampilkan technical capabilities secara terstruktur tanpa terlihat seperti kumpulan badge biasa.

### Component

Custom **Interactive Tech Stack Grid**.

### Recommended Categories

Kategori dapat disesuaikan dengan content final, namun struktur awal:

- Development.
- Database.
- Infrastructure.
- Tools.

Contoh visual:

```text
SKILLS

01 — DEVELOPMENT
────────────────────────────────────────
Astro       React       Laravel
TypeScript  JavaScript  Tailwind CSS

02 — DATABASE
────────────────────────────────────────
MySQL       PostgreSQL

03 — INFRASTRUCTURE / TOOLS
────────────────────────────────────────
Docker      Git         Linux
AWS         Microsoft 365
```

### Interaction

Setiap skill item dapat memiliki:

- Hover reveal.
- Subtle scale.
- Animated underline.
- Icon movement/reveal.
- Opacity shift pada skill lain ketika satu item difokuskan.

### Entrance Animation

Skill dapat muncul menggunakan staggered reveal saat memasuki viewport.

Recommended movement:

- Small `translateY`.
- Fade-in.
- Short stagger.

### Requirements

- Interaction desktop tidak boleh menjadi requirement untuk memahami skill.
- Mobile harus tetap usable tanpa hover.
- Semua skill harus dapat dibaca langsung.
- Hindari proficiency percentage/bar jika tidak memiliki data objektif.
- Section harus menjadi visual resting point sebelum Projects.

---

## 9.6 Projects Section

### Purpose

Menampilkan karya utama dan kemampuan implementasi secara visual.

### Main Component

Magic UI **Bento Grid**.

### Hierarchy

Project dibagi menjadi:

1. Featured / Main Project.
2. Supporting projects.

### Featured Project

Featured project menggunakan:

- Bento Grid item yang lebih dominan.
- Magic UI **Border Beam**.

### Other Projects

Project lain menggunakan Bento Grid tanpa Border Beam, kecuali terdapat alasan visual yang kuat.

### Project Card Content

Minimum:

- Project name.
- Short description.
- Tech stack.
- Visual/screenshot.
- Link ke live project apabila tersedia.
- Link ke source repository apabila memang ingin dipublikasikan.

### Requirements

- Featured project harus terlihat jelas sebagai project utama.
- Bento layout harus responsive.
- Project card harus usable melalui keyboard.
- Hover interaction tidak boleh menjadi satu-satunya cara membuka project.
- Images menggunakan optimized Astro assets jika memungkinkan.

### Border Beam Direction

Border Beam harus menggunakan warna netral/monochrome agar tetap konsisten dengan website.

---

## 9.7 Experience Section

### Purpose

Menampilkan perjalanan profesional secara kronologis dengan visual sederhana dan scroll interaction.

### Component

Custom **Scroll Timeline**.

Tidak menggunakan component timeline dari third-party library.

### Desktop Concept

```text
2024 — 2025      │    Company / Organization
                 ●    Role
                 █
                 █    Short description
                 █
                 │    Supporting details
                 │
2022 — 2025      ●    Organization
                 │    Role / Education
                 │
                 ○
```

### Core Elements

- Year / duration.
- Vertical timeline rail.
- Scroll progress line.
- Timeline markers/dots.
- Company / organization name.
- Position / role.
- Short description.
- Optional supporting metadata.

### Scroll Behavior

- Base timeline menggunakan neutral/inactive state.
- Progress line mengisi berdasarkan scroll position.
- Timeline marker menjadi active ketika item memasuki area fokus viewport.
- Experience content dapat menggunakan fade + small translate animation.

### Recommended Interaction

```text
Inactive marker   ○
Active marker     ●
Completed rail    █
Remaining rail    │
```

### Requirements

- Tidak menggunakan card berat.
- Tidak menggunakan colorful glow.
- Tidak menggunakan zig-zag timeline.
- Content tetap terbaca jika JavaScript gagal.
- Mobile menggunakan simplified single-column layout.
- Scroll animation harus smooth namun ringan.

---

## 9.8 Send Message Section

### Purpose

Memberikan cara langsung bagi pengunjung untuk menghubungi pemilik portfolio.

### Background

Magic UI **Particles**.

Particles harus:

- Subtle.
- Tidak mengurangi readability.
- Tidak terlalu padat.
- Mengikuti monochrome design direction.

### Contact Form

Form ditampilkan dalam card dengan Magic UI **Border Beam**.

### Fields

Minimum:

- Name.
- Email.
- Message.
- Send Message button.

### Form States

Form harus memiliki:

- Idle.
- Focus.
- Validation error.
- Submitting.
- Success.
- Submission error.

### Validation

Minimum:

- Name required.
- Valid email required.
- Message required.
- Empty submission tidak boleh diterima.

### Submission

Mechanism pengiriman pesan dapat menggunakan API/serverless endpoint atau email service yang dipilih saat development.

PRD tidak mengunci provider tertentu.

### Border Beam

Border Beam menggantikan Shine Border karena Shine Border memiliki karakter visual colorful yang tidak sesuai dengan design direction website.

Beam harus dibuat neutral/monochrome.

---

## 9.9 Footer

### Purpose

Menutup halaman dengan informasi minimal dan navigasi tambahan.

### Minimum Content

- Nama.
- Copyright.
- Social links yang relevan.
- Back to top.

### Visual

- Minimal.
- Tidak membutuhkan animated background besar.
- Typography dan spacing menjadi elemen utama.

---

# 10. Content Requirements

## 10.1 About Copy

About harus:

- Ringkas.
- Berorientasi profesional.
- Tidak terasa seperti copy-paste CV.
- Menjelaskan area kemampuan utama.
- Ideal untuk typing animation.

## 10.2 Skills

Setiap skill harus ditempatkan pada kategori yang relevan.

Skill tidak perlu diberi nilai persentase atau rating visual.

## 10.3 Projects

Setiap project minimum memiliki:

```text
Title
Short description
Role / contribution apabila relevan
Tech stack
Preview visual
Live link (optional)
Repository link (optional)
```

Featured project mendapatkan prioritas visual lebih tinggi.

## 10.4 Experience

Setiap experience minimum memiliki:

```text
Period
Company / organization
Role
Short summary
Key responsibilities or achievements
```

Description harus cukup singkat agar timeline tidak berubah menjadi CV panjang.

---

# 11. Responsive Requirements

Website harus mendukung minimal:

- Mobile.
- Tablet.
- Laptop.
- Desktop.
- Large desktop.

### Mobile Behavior

- About berubah dari 2 kolom menjadi stack.
- Skills grid menyesuaikan jumlah kolom.
- Bento Grid berubah menjadi layout yang tetap memiliki hierarchy tetapi tidak memaksa grid desktop.
- Timeline menjadi single-column.
- Particles dapat dikurangi density-nya.
- Hero Video Text harus tetap terbaca.
- Navbar berubah ke layout mobile yang sesuai.

Tidak boleh ada horizontal overflow pada ukuran layar normal.

---

# 12. Performance Requirements

Target utama adalah menjaga keunggulan Astro sebagai static-first framework.

### Requirements

- JavaScript client-side hanya untuk interactive islands.
- Komponen statis tetap dirender oleh Astro bila memungkinkan.
- Video hero harus di-compress dan menggunakan format yang sesuai.
- Images menggunakan responsive image optimization.
- Lazy load media yang berada di bawah fold jika sesuai.
- Hindari loading third-party library yang tidak digunakan.
- Hindari menjalankan animation loop mahal di background.
- Particles harus memiliki jumlah elemen yang terkendali.

### Performance Targets

Target Lighthouse pada production build:

- Performance: **90+**.
- Accessibility: **90+**.
- Best Practices: **90+**.
- SEO: **90+**.

Angka tersebut merupakan target, bukan alasan untuk mengorbankan usability demi skor semata.

---

# 13. Accessibility Requirements

Website harus:

- Menggunakan semantic HTML.
- Memiliki heading hierarchy yang benar.
- Memiliki focus state yang jelas.
- Bisa dinavigasi menggunakan keyboard.
- Memiliki label form yang benar.
- Memiliki alt text pada image yang relevan.
- Memiliki color contrast yang memadai.
- Tidak mengandalkan hover saja.
- Menghormati `prefers-reduced-motion`.

Untuk reduced motion:

- Morphing dapat disederhanakan.
- Timeline scroll animation dapat menjadi static state.
- Parallax/motion besar harus dikurangi atau dinonaktifkan.
- Informasi tidak boleh hilang hanya karena animation dimatikan.

---

# 14. SEO Requirements

Minimum SEO implementation:

- Unique page title.
- Meta description.
- Canonical URL.
- Open Graph metadata.
- Social preview image.
- Favicon.
- Semantic section structure.
- Descriptive links.
- Sitemap.
- Robots configuration yang sesuai.

Structured data dapat ditambahkan jika relevan pada fase development.

---

# 15. Browser Compatibility

Prioritas browser modern:

- Google Chrome.
- Microsoft Edge.
- Mozilla Firefox.
- Safari.
- Mobile Chrome.
- Mobile Safari.

Experimental effect harus memiliki fallback ketika browser tidak mendukung fitur tertentu.

---

# 16. Error & Fallback States

### Video Text

Jika video gagal dimuat:

- Nama tetap muncul menggunakan solid text fallback.

### Pixel Image

Jika effect gagal:

- Foto biasa tetap tampil.

### Contact Form

Jika submission gagal:

- User mendapatkan pesan error yang jelas.
- Isi message tidak langsung hilang.

### Animation

Jika JavaScript gagal:

- Konten utama harus tetap terlihat dan dapat dibaca.

---

# 17. Suggested Project Structure

Struktur dapat disesuaikan selama development, namun arah awal:

```text
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   │
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Projects.astro
│   │   ├── Experience.astro
│   │   └── Contact.astro
│   │
│   ├── ui/
│   │   ├── IntroLoader.*
│   │   ├── InteractiveTechGrid.*
│   │   ├── ScrollTimeline.*
│   │   └── magic-ui/
│   │
│   └── forms/
│       └── ContactForm.*
│
├── data/
│   ├── skills.*
│   ├── projects.*
│   └── experience.*
│
├── layouts/
│   └── Layout.astro
│
├── pages/
│   └── index.astro
│
├── styles/
│   └── global.css
│
└── assets/
    ├── images/
    └── video/
```

`.*` menunjukkan implementasi dapat berupa `.astro`, `.tsx`, atau file data TypeScript sesuai kebutuhan hydration.

---

# 18. Data-Driven Content

Skills, projects, dan experience sebaiknya tidak di-hardcode langsung di markup jika jumlah item dapat bertambah.

Contoh konsep:

```ts
skills = []
projects = []
experience = []
```

Keuntungan:

- Mudah menambah project baru.
- Mudah mengubah urutan experience.
- UI component tetap reusable.
- Content dan presentation terpisah.

---

# 19. Acceptance Criteria

Website versi pertama dianggap memenuhi PRD jika:

### General

- [ ] Website berhasil berjalan menggunakan Astro + Tailwind CSS.
- [ ] Magic UI hanya digunakan pada komponen yang direncanakan.
- [ ] Interactive Tech Stack Grid tetap merupakan custom component.
- [ ] Scroll Timeline tetap merupakan custom component.
- [ ] Tidak ada horizontal overflow pada responsive viewport normal.
- [ ] Design language konsisten dan monochrome dominant.

### Development Tooling

- [ ] OpenCode dapat menjalankan Magic UI MCP Server ketika diperlukan selama development.
- [ ] Magic UI MCP tidak menjadi runtime dependency website production.
- [ ] MCP hanya digunakan untuk workflow komponen Magic UI dan tidak menjadi dependency implementasi komponen custom.

### Intro

- [ ] Morphing greeting tampil selama sekitar 3 detik.
- [ ] Sequence berakhir dengan "Halo, Selamat Datang".
- [ ] Intro keluar dengan smooth transition.
- [ ] Intro tidak menahan resource loading secara artificial.

### Navbar

- [ ] Navbar tidak memiliki border.
- [ ] Navigation menuju section terkait bekerja.
- [ ] Mobile navigation usable.

### Hero

- [ ] Nama lengkap tampil menggunakan Video Text.
- [ ] Hero memiliki fallback jika video gagal dimuat.

### About

- [ ] Desktop menggunakan two-column layout.
- [ ] Summary menggunakan Typing Animation.
- [ ] Photo menggunakan Pixel Image.
- [ ] Mobile layout berubah menjadi vertical stack.

### Skills

- [ ] Menggunakan custom Interactive Tech Stack Grid.
- [ ] Skills terorganisasi berdasarkan kategori.
- [ ] Interaction tidak menghalangi akses informasi.
- [ ] Grid responsive.

### Projects

- [ ] Projects menggunakan Bento Grid.
- [ ] Featured project memiliki hierarchy lebih tinggi.
- [ ] Featured project menggunakan Border Beam.
- [ ] Supporting projects tetap clean.

### Experience

- [ ] Menggunakan custom Scroll Timeline.
- [ ] Scroll progress line bekerja.
- [ ] Active marker berubah sesuai scroll.
- [ ] Mobile menggunakan simplified timeline.

### Contact

- [ ] Section memiliki Particles background.
- [ ] Contact form berada dalam card dengan Border Beam.
- [ ] Form memiliki validation state.
- [ ] Form memiliki success dan error feedback.

### Footer

- [ ] Footer memiliki informasi dasar dan social links.
- [ ] Back-to-top berfungsi.

### Quality

- [ ] Keyboard navigation berfungsi.
- [ ] Reduced motion memiliki fallback.
- [ ] SEO metadata dasar tersedia.
- [ ] Production build berhasil tanpa critical error.

---

# 20. Future Enhancements

Fitur berikut tidak termasuk MVP namun dapat dipertimbangkan setelah versi pertama stabil:

- Dedicated project detail / case study pages.
- Download CV action.
- Blog / notes.
- Dynamic CMS.
- Analytics.
- View transition antar halaman jika project detail ditambahkan.
- Dark/light mode toggle jika dibutuhkan di masa depan.
- Additional language support.
- Extended contact integrations.

---

# 21. Final Page Blueprint

```text
┌───────────────────────────────────────────────┐
│                                               │
│            MORPHING TEXT INTRO                │
│                 ±3 seconds                    │
│                                               │
└───────────────────────────────────────────────┘
                       ↓

NAVBAR — borderless / minimal

                       ↓

HERO
└── Video Text
    └── Full Name

                       ↓

ABOUT
├── Typing Animation → Summary
└── Pixel Image      → Personal Photo

                       ↓

SKILLS
└── Custom Interactive Tech Stack Grid

                       ↓

PROJECTS
└── Bento Grid
    ├── Featured Project → Border Beam
    └── Supporting Projects

                       ↓

EXPERIENCE
└── Custom Scroll Timeline
    ├── Scroll Progress Rail
    ├── Active Marker
    └── Experience Entries

                       ↓

SEND MESSAGE
├── Particles Background
└── Form Card
    └── Border Beam

                       ↓

FOOTER
└── Minimal closing content
```

---

## 22. Product Decision Summary

Keputusan utama yang sudah dikunci:

- Astro menjadi framework utama.
- Tailwind CSS menjadi styling system.
- Magic UI digunakan secara selektif.
- Hero menggunakan Video Text.
- About menggunakan Typing Animation + Pixel Image.
- Skills menggunakan custom Interactive Tech Stack Grid.
- Projects menggunakan Bento Grid dengan Border Beam untuk featured project.
- Experience menggunakan custom Scroll Timeline.
- Send Message menggunakan Particles + Border Beam form card.
- Shine Border tidak digunakan karena efek visualnya terlalu colorful untuk design direction website.
- Intro menggunakan Morphing Text selama sekitar 3 detik.
- Intro merupakan overlay animation, bukan artificial page-loading delay.
- Website memprioritaskan clean visual, high readability, performance, dan purposeful motion.
