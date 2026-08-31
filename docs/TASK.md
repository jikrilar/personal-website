# Task Breakdown

## Personal Portfolio Website

**Document Version:** 1.0  
**Status:** Ready for Development  
**Related Documents:** `prd.md`, `architecture.md`, `design-system.md`  
**Primary Stack:** Astro, TypeScript, Tailwind CSS  
**UI / Motion:** Magic UI + Custom Components  
**Development Agent:** OpenCode

---

# 1. Purpose

Dokumen ini membagi pekerjaan development **per section** agar setiap bagian dapat dikerjakan secara terpisah oleh coding agent.

Contoh prompt:

```text
Kerjakan task Hero Section berdasarkan task.md.
```

atau:

```text
Kerjakan task Experience Section.
Ikuti prd.md, architecture.md, design-system.md, dan task.md.
Jangan mengubah section lain di luar dependency yang diperlukan.
```

Setiap task harus dianggap sebagai **work package mandiri**.

---

# 2. Source of Truth Priority

Jika terdapat konflik antar dokumen, gunakan urutan prioritas berikut:

```text
1. prd.md
2. architecture.md
3. design-system.md
4. task.md
5. existing implementation
```

Agent tidak boleh mengganti keputusan desain atau arsitektur secara diam-diam.

---

# 3. Global Agent Rules

Saat mengerjakan satu section:

- fokus hanya pada scope task tersebut;
- jangan melakukan redesign section lain;
- jangan menambahkan library baru jika dependency yang ada sudah cukup;
- gunakan Astro sebagai default;
- gunakan React Island hanya jika browser runtime memang diperlukan;
- jangan mengubah custom component menjadi third-party component;
- jangan menggunakan Magic UI MCP untuk task yang tidak menggunakan Magic UI;
- gunakan Magic UI MCP hanya untuk komponen Magic UI yang telah disetujui;
- pertahankan desain monochrome;
- jangan menambahkan gradient warna-warni;
- jangan menambahkan colorful glow/shadow;
- pastikan mobile responsive;
- pastikan keyboard accessibility;
- pastikan `prefers-reduced-motion` dipertimbangkan;
- lakukan type check/build setelah task selesai;
- jangan meninggalkan dead code atau unused dependency.

---

# 4. Definition of Done — Semua Section

Sebuah section dianggap selesai jika:

- [ ] Implementasi sesuai PRD.
- [ ] Implementasi sesuai Architecture.
- [ ] Implementasi sesuai Design System.
- [ ] Responsive mobile, tablet, dan desktop.
- [ ] Tidak ada TypeScript error.
- [ ] Production build berhasil.
- [ ] Tidak ada broken import.
- [ ] Tidak ada console error yang berasal dari section.
- [ ] Keyboard interaction bekerja jika ada interactive element.
- [ ] Reduced-motion fallback tersedia jika ada animation.
- [ ] Tidak menambahkan dependency yang tidak diperlukan.
- [ ] Tidak merusak section yang sudah selesai.

---

# 5. Task Dependency Map

```text
PROJECT FOUNDATION
      │
      ├──────────────┐
      ▼              ▼
   LOADING         NAVBAR
      │              │
      └──────┬───────┘
             ▼
            HERO
             │
             ▼
            ABOUT
             │
             ▼
            SKILLS
             │
             ▼
           PROJECTS
             │
             ▼
          EXPERIENCE
             │
             ▼
           CONTACT
             │
             ▼
            FOOTER
             │
             ▼
       FINAL QA / POLISH
```

Section tertentu technically dapat dikerjakan paralel setelah Project Foundation selesai.

---

# TASK 00 — Project Foundation

## Goal

Menyiapkan fondasi project agar seluruh section dapat dikembangkan secara konsisten.

## Scope

- Astro project configuration.
- TypeScript.
- Tailwind CSS.
- React integration.
- Global styles.
- Design tokens.
- Base layout.
- Data directories.
- Initial reusable utilities.
- Magic UI MCP configuration untuk OpenCode bila belum ada.

## Tasks

### Project Setup

- [ ] Pastikan Astro project berjalan.
- [ ] Aktifkan TypeScript strict mode.
- [ ] Integrasikan Tailwind CSS.
- [ ] Integrasikan React untuk React Islands.
- [ ] Install dependency Magic UI yang benar-benar diperlukan.
- [ ] Install icon library hanya jika digunakan.
- [ ] Hindari dependency UI library tambahan.

### Directory Structure

Buat struktur minimal:

```text
src/
├─ assets/
├─ components/
│  ├─ layout/
│  ├─ sections/
│  ├─ custom/
│  ├─ magic-ui/
│  └─ forms/
├─ data/
├─ layouts/
├─ lib/
├─ pages/
├─ styles/
└─ types/
```

### Global Design Tokens

- [ ] Implement CSS variables dari `design-system.md`.
- [ ] Background.
- [ ] Foreground.
- [ ] Muted.
- [ ] Border.
- [ ] Surface.
- [ ] Radius.
- [ ] Animation duration.
- [ ] Easing.

### Typography

- [ ] Integrasikan primary font.
- [ ] Integrasikan monospace font jika digunakan.
- [ ] Buat global heading/body behavior.
- [ ] Pastikan typography responsive.

### Base Layout

- [ ] Buat `BaseLayout.astro`.
- [ ] Implement SEO metadata base.
- [ ] Implement favicon placeholder.
- [ ] Implement global stylesheet.
- [ ] Pastikan semantic page shell.

### Reduced Motion

- [ ] Tambahkan global `prefers-reduced-motion`.
- [ ] Non-essential smooth scrolling harus disabled pada reduced motion.

## Acceptance Criteria

- [ ] `npm run dev` berjalan.
- [ ] Production build berhasil.
- [ ] TypeScript tanpa error.
- [ ] Tailwind aktif.
- [ ] React Islands dapat digunakan.
- [ ] Global tokens tersedia.
- [ ] Belum ada unnecessary client-side hydration.

---

# TASK 01 — Loading / Intro Section

## Agent Prompt Name

```text
Loading Section
```

atau:

```text
Intro Section
```

## Goal

Membuat intro overlay sekitar 3 detik menggunakan Magic UI Morphing Text.

## Approved Component

```text
Magic UI — Morphing Text
```

Magic UI MCP boleh digunakan pada task ini.

## Greeting Sequence

Gunakan urutan:

```text
Hello
Bonjour
Hola
Ciao
Hallo
Olá
Hei
Goedendag
Halo, Selamat Datang
```

## Tasks

### Component

- [ ] Tambahkan Morphing Text dari Magic UI.
- [ ] Adapt styling menjadi monochrome.
- [ ] Buat intro fullscreen overlay.
- [ ] Center text secara horizontal dan vertical.
- [ ] Background mengikuti design token.
- [ ] Foreground mengikuti design token.

### Timing

- [ ] Total intro sekitar 3 detik.
- [ ] Intro bukan real resource loader.
- [ ] Main page boleh dirender di belakang overlay.
- [ ] Greeting terakhir adalah `Halo, Selamat Datang`.

### Exit Transition

- [ ] Buat fade/scale/translate exit yang subtle.
- [ ] Hindari colorful transition.
- [ ] Setelah selesai, intro tidak menangkap pointer event.
- [ ] Hapus/disable overlay setelah transition selesai.

### Scroll Behavior

- [ ] Lock scroll saat intro aktif.
- [ ] Restore scroll setelah intro selesai.
- [ ] Pastikan cleanup aman.

### Reduced Motion

- [ ] Gunakan transition yang lebih sederhana.
- [ ] Hindari morphing agresif.
- [ ] Jangan membuat content utama inaccessible.

## Out of Scope

- Resource preloader.
- Progress bar.
- Percentage loader.
- Skeleton screen.

## Acceptance Criteria

- [ ] Greeting sequence benar.
- [ ] Durasi sekitar 3 detik.
- [ ] Tidak memperlambat resource loading secara sengaja.
- [ ] Hero dapat tampil setelah intro selesai.
- [ ] Tidak ada scroll-lock bug.
- [ ] Reduced motion bekerja.

---

# TASK 02 — Navbar Section

## Agent Prompt Name

```text
Navbar Section
```

## Goal

Membuat navbar minimal, borderless, responsive, dan menyatu dengan page.

## Tasks

### Structure

- [ ] Gunakan semantic `<nav>`.
- [ ] Tambahkan navigation anchors:
  - About
  - Skills
  - Projects
  - Experience
  - Contact

### Visual

- [ ] Navbar tanpa border.
- [ ] Tidak menggunakan card container.
- [ ] Tidak menggunakan pill besar.
- [ ] Tidak menggunakan colorful background.
- [ ] Gunakan typography yang minimal.

### Position

- [ ] Implement sticky/fixed behavior sesuai layout terbaik.
- [ ] Tambahkan background/blur hanya jika readability membutuhkan.
- [ ] Jangan membuat blur terlalu kuat.

### Navigation

- [ ] Semua link mengarah ke section ID yang benar.
- [ ] Smooth scrolling hanya jika reduced motion tidak aktif.
- [ ] Tambahkan Back/Home behavior bila dibutuhkan.

### Responsive

- [ ] Desktop navigation readable.
- [ ] Mobile navigation usable.
- [ ] Jika menggunakan mobile menu, harus keyboard accessible.
- [ ] Jangan over-engineer menu jika link masih muat secara sederhana.

## Acceptance Criteria

- [ ] Tidak ada border.
- [ ] Semua anchor bekerja.
- [ ] Responsive.
- [ ] Keyboard accessible.
- [ ] Tidak mengganggu Hero.

---

# TASK 03 — Hero Section

## Agent Prompt Name

```text
Hero Section
```

## Goal

Membuat Hero sebagai visual anchor utama menggunakan full name dengan Magic UI Video Text.

## Approved Component

```text
Magic UI — Video Text
```

Magic UI MCP boleh digunakan pada task ini.

## Tasks

### Structure

- [ ] Buat `Hero.astro`.
- [ ] Gunakan full name sebagai primary Hero text.
- [ ] Gunakan Video Text sebagai primary visual.
- [ ] Hero memiliki tinggi sekitar `80–100vh`.

### Video

- [ ] Gunakan video yang ringan dan looping.
- [ ] `muted`.
- [ ] autoplay-compatible.
- [ ] `playsinline`.
- [ ] Tambahkan fallback jika video gagal.
- [ ] Jangan membuat video menghambat page secara berlebihan.

### Typography

- [ ] Nama adalah elemen terbesar pada page.
- [ ] Gunakan responsive typography.
- [ ] Hindari text overflow.
- [ ] Perhatikan nama panjang pada mobile.

### Supporting Content

Jika digunakan:

- [ ] Maksimal satu descriptor pendek.
- [ ] Optional CTA dibuat subtle.
- [ ] Supporting content tidak boleh bersaing dengan nama.

### Motion

- [ ] Video Text menjadi effect utama.
- [ ] Jangan menambahkan effect besar lain di Hero.
- [ ] Reduced-motion fallback tetap readable.

## Out of Scope

- Gradient background.
- Aurora.
- Animated grid.
- Particle background.
- Multiple text effects.

## Acceptance Criteria

- [ ] Full name menjadi visual utama.
- [ ] Video Text bekerja.
- [ ] Fallback bekerja.
- [ ] Responsive pada mobile.
- [ ] Tidak ada overflow.
- [ ] Reduced motion readable.

---

# TASK 04 — About Section

## Agent Prompt Name

```text
About Section
```

## Goal

Membuat About dua kolom dengan Typing Animation untuk summary dan Pixel Image untuk personal photo.

## Approved Components

```text
Magic UI — Typing Animation
Magic UI — Pixel Image
```

Magic UI MCP boleh digunakan pada task ini.

## Desktop Layout

```text
Summary          Photo
50%              50%
```

## Mobile Layout

```text
Summary
  ↓
Photo
```

## Tasks

### Section Structure

- [ ] Buat section ID `about`.
- [ ] Tambahkan section label/title.
- [ ] Implement 2-column desktop layout.
- [ ] Stack menjadi single column pada mobile.

### Summary

- [ ] Pisahkan summary copy dari component implementation.
- [ ] Gunakan Typing Animation.
- [ ] Kecepatan typing tidak terlalu lambat.
- [ ] Text tetap tersedia dalam fallback/reduced-motion.

### Photo

- [ ] Gunakan Pixel Image.
- [ ] Source photo configurable.
- [ ] Tambahkan alt text meaningful.
- [ ] Gunakan responsive sizing.
- [ ] Pastikan photo tetap recognizable.

### Layout Quality

- [ ] Alignment antar kolom seimbang.
- [ ] Whitespace cukup.
- [ ] Tidak menggunakan card berat.

## Acceptance Criteria

- [ ] Desktop dua kolom.
- [ ] Mobile stacked.
- [ ] Typing Animation bekerja.
- [ ] Pixel Image bekerja.
- [ ] Reduced motion fallback tersedia.
- [ ] Image memiliki alt text.

---

# TASK 05 — Skills Section

## Agent Prompt Name

```text
Skills Section
```

## Goal

Membuat custom **Interactive Tech Stack Grid** yang clean, editorial, monochrome, dan tidak bergantung pada external UI component.

## Component Ownership

```text
CUSTOM COMPONENT
```

Jangan gunakan Magic UI MCP untuk mencari pengganti component ini.

## Suggested Categories

```text
Development
Database
Infrastructure
Tools
```

Kategori final mengikuti data yang tersedia.

## Tasks

### Data

- [ ] Buat typed skill data.
- [ ] Simpan di `src/data/skills.ts`.
- [ ] Pisahkan data dari UI.

Recommended interface:

```ts
interface Skill {
  name: string;
  category: string;
  icon?: string;
  url?: string;
}
```

### Layout

- [ ] Buat custom Interactive Tech Stack Grid.
- [ ] Gunakan editorial grid.
- [ ] Gunakan section numbering/category label.
- [ ] Gunakan thin separators.
- [ ] Hindari heavy card layout.
- [ ] Hindari marquee.
- [ ] Hindari physics simulation.

### Interaction

Desktop hover/focus:

- [ ] Selected skill lebih emphasized.
- [ ] Optional underline animation.
- [ ] Optional small icon motion.
- [ ] Surrounding item dapat sedikit diturunkan opacity.
- [ ] Jangan membuat skill lain menjadi unreadable.

### Mobile

- [ ] Interaction tidak bergantung hover.
- [ ] Gunakan 1–2 column layout sesuai density.
- [ ] Semua skill langsung readable.

### Animation

- [ ] Optional staggered reveal.
- [ ] Motion subtle.
- [ ] Prefer CSS sebelum React.
- [ ] Gunakan React hanya jika benar-benar diperlukan.

## Out of Scope

- Magic UI skills component.
- React Bits skills component.
- Orbiting icons.
- Infinite logo marquee.
- Physics chips.

## Acceptance Criteria

- [ ] Custom implementation.
- [ ] Typed local data.
- [ ] Clean monochrome design.
- [ ] Desktop interaction bekerja.
- [ ] Keyboard focus equivalent dengan hover.
- [ ] Mobile tidak membutuhkan hover.
- [ ] Tidak ada dependency baru yang tidak diperlukan.

---

# TASK 06 — Projects Section

## Agent Prompt Name

```text
Projects Section
```

## Goal

Membuat project showcase menggunakan Magic UI Bento Grid dengan Border Beam hanya pada featured project.

## Approved Components

```text
Magic UI — Bento Grid
Magic UI — Border Beam
```

Magic UI MCP boleh digunakan pada task ini.

## Tasks

### Project Data

- [ ] Buat `src/data/projects.ts`.
- [ ] Gunakan typed project model.
- [ ] Support:
  - title
  - description
  - tech stack
  - image
  - live URL
  - repository URL
  - featured
  - order

### Bento Grid

- [ ] Implement Bento Grid.
- [ ] Featured project menggunakan area lebih besar.
- [ ] Secondary projects memiliki visual hierarchy lebih rendah.
- [ ] Responsive grid pada tablet/mobile.

### Featured Project

- [ ] Tentukan featured berdasarkan `featured: true`.
- [ ] Jangan bergantung pada array index.
- [ ] Tambahkan Border Beam hanya pada featured project.
- [ ] Border Beam harus monochrome.

### Project Cards

- [ ] Screenshot/image.
- [ ] Project title.
- [ ] Short description.
- [ ] Tech tags.
- [ ] Live link jika ada.
- [ ] Repository link jika ada.
- [ ] Accessible external link indication.

### Interaction

- [ ] Subtle image scale.
- [ ] Subtle border change.
- [ ] Small translate allowed.
- [ ] Hindari heavy tilt/parallax.

## Acceptance Criteria

- [ ] Bento Grid bekerja.
- [ ] Featured project jelas.
- [ ] Border Beam hanya featured project.
- [ ] Beam monochrome.
- [ ] Project data terpisah dari UI.
- [ ] Responsive.

---

# TASK 07 — Experience Section

## Agent Prompt Name

```text
Experience Section
```

## Goal

Membuat custom clean Scroll Timeline dengan vertical progress mengikuti scroll.

## Component Ownership

```text
CUSTOM COMPONENT
```

Jangan mencari Aceternity/third-party timeline sebagai replacement.

## Tasks

### Data

- [ ] Buat `src/data/experience.ts`.
- [ ] Gunakan typed data.
- [ ] Data meliputi:
  - organization
  - role
  - start/end
  - period label
  - summary
  - optional highlights
  - optional technologies

### Base Markup

- [ ] Render semantic content terlebih dahulu.
- [ ] Content harus tetap readable tanpa JavaScript.
- [ ] Buat clean vertical layout.

### Timeline Rail

- [ ] Base rail 1px neutral.
- [ ] Progress rail foreground/monochrome.
- [ ] Progress mengikuti scroll section.
- [ ] Gunakan active marker kecil.

### Scroll Behavior

- [ ] Progress line mengisi dari atas ke bawah.
- [ ] Marker aktif ketika item mencapai viewport focus area.
- [ ] Content dapat fade/translate ringan.
- [ ] Optional sticky year pada desktop jika tetap clean.

### Mobile

- [ ] Single timeline layout.
- [ ] Jangan membuat metadata column terlalu sempit.
- [ ] Timeline tetap readable.

### Reduced Motion

- [ ] Render static timeline.
- [ ] Semua data tetap terlihat.
- [ ] Tidak ada required scroll animation.

## Out of Scope

- Alternating zig-zag timeline.
- Glowing timeline.
- Large timeline cards.
- Third-party timeline library.

## Acceptance Criteria

- [ ] Custom implementation.
- [ ] Scroll progress bekerja.
- [ ] Active markers bekerja.
- [ ] Static fallback bekerja.
- [ ] Clean monochrome layout.
- [ ] Mobile readable.
- [ ] Data terpisah dari UI.

---

# TASK 08 — Send Message / Contact Section

## Agent Prompt Name

```text
Contact Section
```

atau:

```text
Send Message Section
```

## Goal

Membuat contact section dengan Particles background dan form card menggunakan monochrome Border Beam.

## Approved Components

```text
Magic UI — Particles
Magic UI — Border Beam
```

Magic UI MCP boleh digunakan pada task ini.

## Tasks

### Section Background

- [ ] Tambahkan Particles.
- [ ] Particles monochrome.
- [ ] Low density.
- [ ] Low opacity.
- [ ] Slow movement.
- [ ] Particles tidak mengganggu readability.
- [ ] Decorative layer tidak menerima pointer event.

### Contact Card

- [ ] Centered card.
- [ ] Max width sekitar 640–720px.
- [ ] Border subtle.
- [ ] Border Beam monochrome.
- [ ] Surface background cukup opaque agar field readable.

### Form Fields

- [ ] Name.
- [ ] Email.
- [ ] Message.
- [ ] Visible labels.
- [ ] Proper autocomplete.
- [ ] Accessible error messages.

### Validation

Client:

- [ ] Required fields.
- [ ] Valid email.
- [ ] Message minimum sensible length.

Server:

- [ ] Validate ulang payload.
- [ ] Batasi payload length.
- [ ] Jangan mempercayai client validation.

### Submission Architecture

Gunakan abstraction:

```text
ContactForm
    ↓
submitContactMessage()
    ↓
API endpoint/provider adapter
```

- [ ] Jangan hardcode provider logic ke UI.
- [ ] Jangan expose secret/API key ke browser.
- [ ] Provider dapat diganti.

### UI States

- [ ] Idle.
- [ ] Loading.
- [ ] Success.
- [ ] Error.
- [ ] Preserve message jika submission gagal.

### Anti-Spam

Implement ringan jika diperlukan:

- [ ] Honeypot optional.
- [ ] Rate limiting jika provider/platform mendukung.

Jangan menambahkan CAPTCHA berat tanpa kebutuhan.

### Reduced Motion

- [ ] Disable Particles.
- [ ] Border Beam dapat menjadi static border.

## Acceptance Criteria

- [ ] Particles monochrome.
- [ ] Border Beam monochrome.
- [ ] Form accessible.
- [ ] Validation bekerja.
- [ ] Error state bekerja.
- [ ] Success state bekerja.
- [ ] Secret tidak terekspos.
- [ ] Provider decoupled dari UI.

---

# TASK 09 — Footer Section

## Agent Prompt Name

```text
Footer Section
```

## Goal

Membuat footer minimal yang menutup page tanpa visual noise.

## Tasks

### Content

- [ ] Copyright/current year.
- [ ] Name.
- [ ] GitHub.
- [ ] LinkedIn.
- [ ] Email/contact link jika digunakan.
- [ ] Back to top.

### Visual

- [ ] Minimal typography.
- [ ] Whitespace cukup.
- [ ] No heavy card.
- [ ] No colorful icon.
- [ ] Optional thin top border hanya jika diperlukan.

### Interaction

- [ ] External links accessible.
- [ ] Back to top bekerja.
- [ ] Hover/focus subtle.

## Acceptance Criteria

- [ ] Minimal.
- [ ] Responsive.
- [ ] Social links bekerja.
- [ ] Keyboard accessible.
- [ ] Tidak bersaing dengan Contact section.

---

# TASK 10 — SEO & Metadata

## Agent Prompt Name

```text
SEO Task
```

## Goal

Menyelesaikan metadata dan indexing foundation.

## Tasks

- [ ] Page title.
- [ ] Meta description.
- [ ] Canonical URL.
- [ ] Open Graph metadata.
- [ ] Social preview image.
- [ ] Favicon.
- [ ] `robots.txt`.
- [ ] Sitemap.
- [ ] Semantic heading hierarchy.
- [ ] Exactly one primary H1.
- [ ] Proper section headings.

## Acceptance Criteria

- [ ] Metadata ter-render pada production output.
- [ ] Social metadata valid.
- [ ] No duplicate H1.
- [ ] Sitemap tersedia.

---

# TASK 11 — Performance Optimization

## Agent Prompt Name

```text
Performance Task
```

## Goal

Mengoptimalkan performance setelah seluruh major section selesai.

## Tasks

### JavaScript

- [ ] Audit React hydration.
- [ ] Hapus hydration yang tidak diperlukan.
- [ ] Lazy hydrate below-the-fold components.
- [ ] Hindari `client:load` kecuali benar-benar perlu.

### Images

- [ ] Optimize profile image.
- [ ] Optimize project screenshots.
- [ ] Responsive image sizing.
- [ ] Proper dimensions.
- [ ] Lazy loading below fold.

### Hero Video

- [ ] Compress video.
- [ ] Short loop.
- [ ] Appropriate format.
- [ ] Poster/fallback.
- [ ] Verify mobile behavior.

### Animation

- [ ] Reduce excessive particle count.
- [ ] Audit continuous animations.
- [ ] Avoid multiple expensive animations simultaneously.

### Build

- [ ] Inspect bundle.
- [ ] Remove unused dependencies.
- [ ] Remove dead components.

## Acceptance Criteria

- [ ] No unnecessary global hydration.
- [ ] Hero remains performant.
- [ ] Images optimized.
- [ ] No obvious layout shift.
- [ ] Production build clean.

---

# TASK 12 — Accessibility Review

## Agent Prompt Name

```text
Accessibility Task
```

## Goal

Melakukan accessibility pass setelah semua section selesai.

## Tasks

- [ ] Test full keyboard navigation.
- [ ] Verify focus order.
- [ ] Verify visible focus.
- [ ] Verify form labels.
- [ ] Verify form errors.
- [ ] Verify image alt.
- [ ] Decorative animations `aria-hidden` bila relevan.
- [ ] Check heading hierarchy.
- [ ] Check color contrast.
- [ ] Check touch target size.
- [ ] Check reduced motion.
- [ ] Verify content remains readable without animation.

## Acceptance Criteria

- [ ] Semua interactive element keyboard accessible.
- [ ] Tidak ada invisible focus.
- [ ] Contrast memadai.
- [ ] Reduced motion respected.
- [ ] Decorative effects tidak mengganggu assistive technology.

---

# TASK 13 — Responsive QA

## Agent Prompt Name

```text
Responsive QA Task
```

## Goal

Memastikan seluruh page tetap konsisten pada berbagai viewport.

## Test Viewports

Minimum:

```text
Mobile       ~375px
Large Mobile ~430px
Tablet       ~768px
Laptop       ~1024px
Desktop      ~1440px
Large        ~1920px
```

## Tasks

- [ ] Navbar.
- [ ] Hero typography.
- [ ] About column stacking.
- [ ] Skills grid.
- [ ] Bento Grid.
- [ ] Timeline.
- [ ] Contact form.
- [ ] Footer.
- [ ] No horizontal overflow.
- [ ] No clipped text.
- [ ] No broken fixed/sticky elements.

## Acceptance Criteria

- [ ] No horizontal scrollbar caused by layout.
- [ ] Hero name remains readable.
- [ ] All sections preserve hierarchy.
- [ ] Touch interactions usable.

---

# TASK 14 — Final Visual Polish

## Agent Prompt Name

```text
Visual Polish Task
```

## Goal

Melakukan consistency pass tanpa redesign.

## Tasks

### Typography

- [ ] Verify consistent font weights.
- [ ] Verify heading sizes.
- [ ] Verify muted text treatment.

### Spacing

- [ ] Section vertical rhythm.
- [ ] Container alignment.
- [ ] Card padding.
- [ ] Mobile spacing.

### Border

- [ ] Consistent neutral borders.
- [ ] Border Beam monochrome.
- [ ] No accidental colorful defaults.

### Motion

- [ ] Animation timing consistent.
- [ ] Hover effects subtle.
- [ ] No duplicated effects.
- [ ] Calm vs strong section rhythm tetap terjaga.

### Visual Cleanup

- [ ] Remove accidental gradients.
- [ ] Remove unnecessary shadow.
- [ ] Remove excessive radius.
- [ ] Ensure library components visually belong to same system.

## Acceptance Criteria

- [ ] Website terasa seperti satu design system.
- [ ] Tidak terlihat seperti kumpulan demo component.
- [ ] Monochrome visual tetap konsisten.
- [ ] Tidak ada redesign di luar dokumentasi.

---

# TASK 15 — Final Build & Deployment Readiness

## Agent Prompt Name

```text
Deployment Readiness Task
```

## Goal

Menyiapkan project untuk production deployment.

## Tasks

### Validation

- [ ] Type check.
- [ ] Production build.
- [ ] Test generated site.
- [ ] Check environment variables.
- [ ] Verify `.env.example`.
- [ ] Verify no secret committed.

### Contact

- [ ] Production contact endpoint/provider bekerja.
- [ ] Environment variables tersedia.
- [ ] Error logging reasonable.

### SEO

- [ ] Production canonical URL.
- [ ] Social image.
- [ ] Sitemap.
- [ ] Robots.

### Cleanup

- [ ] Remove debug logs.
- [ ] Remove temporary assets.
- [ ] Remove placeholder content.
- [ ] Remove unused imports.
- [ ] Remove unused dependencies.

## Acceptance Criteria

- [ ] Production build sukses.
- [ ] No TypeScript error.
- [ ] No console error.
- [ ] No secrets exposed.
- [ ] Site siap deploy.

---

# 6. Recommended Development Order

Gunakan urutan berikut:

```text
Task 00 — Project Foundation

Task 01 — Loading / Intro
Task 02 — Navbar
Task 03 — Hero
Task 04 — About
Task 05 — Skills
Task 06 — Projects
Task 07 — Experience
Task 08 — Contact
Task 09 — Footer

Task 10 — SEO
Task 11 — Performance
Task 12 — Accessibility
Task 13 — Responsive QA
Task 14 — Visual Polish
Task 15 — Deployment Readiness
```

---

# 7. Suggested Agent Prompt Template

Gunakan template berikut untuk setiap task:

```text
Kerjakan TASK [nomor] — [nama task] dari task.md.

Gunakan:
- prd.md
- architecture.md
- design-system.md
- task.md

sebagai source of truth.

Aturan:
- kerjakan hanya scope task tersebut;
- jangan redesign section lain;
- jangan menambahkan dependency yang tidak diperlukan;
- ikuti architecture Astro static-first;
- gunakan React Island hanya jika diperlukan;
- pertahankan visual monochrome;
- jalankan type check/build setelah selesai;
- laporkan file yang dibuat/diubah dan acceptance criteria yang sudah terpenuhi.
```

Contoh:

```text
Kerjakan TASK 03 — Hero Section dari task.md.

Gunakan prd.md, architecture.md, design-system.md, dan task.md
sebagai source of truth.

Jangan mengubah section lain kecuali dependency yang benar-benar
diperlukan. Gunakan Magic UI MCP hanya untuk mengambil atau
mengadaptasi Video Text.

Setelah selesai, jalankan type check dan production build.
```

---

# 8. Short Prompt Aliases

Agar prompting lebih cepat:

```text
"Kerjakan task foundation"
→ TASK 00

"Kerjakan task loading"
→ TASK 01

"Kerjakan task navbar"
→ TASK 02

"Kerjakan task hero section"
→ TASK 03

"Kerjakan task about section"
→ TASK 04

"Kerjakan task skills section"
→ TASK 05

"Kerjakan task projects section"
→ TASK 06

"Kerjakan task experience section"
→ TASK 07

"Kerjakan task contact section"
→ TASK 08

"Kerjakan task footer"
→ TASK 09

"Kerjakan task SEO"
→ TASK 10

"Kerjakan task performance"
→ TASK 11

"Kerjakan task accessibility"
→ TASK 12

"Kerjakan task responsive QA"
→ TASK 13

"Kerjakan task visual polish"
→ TASK 14

"Kerjakan task deployment readiness"
→ TASK 15
```

---

# 9. Scope Protection

Agent tidak boleh melakukan hal berikut tanpa perubahan requirement:

```text
Skills
→ mengganti custom grid dengan external component

Experience
→ mengganti custom timeline dengan Aceternity/third-party timeline

Contact
→ mengganti Border Beam menjadi Shine Border

Hero
→ menambah background visual besar selain Video Text

Contact
→ menambah colorful Particles

General
→ menambahkan multiple UI libraries
→ mengubah site menjadi React SPA
→ menambahkan CMS/database untuk portfolio content
```

---

# 10. Completion Tracking

Progress dapat ditandai langsung pada dokumen ini.

```text
[ ] TASK 00 — Project Foundation
[ ] TASK 01 — Loading / Intro
[ ] TASK 02 — Navbar
[ ] TASK 03 — Hero
[ ] TASK 04 — About
[ ] TASK 05 — Skills
[ ] TASK 06 — Projects
[ ] TASK 07 — Experience
[ ] TASK 08 — Contact
[ ] TASK 09 — Footer
[ ] TASK 10 — SEO
[ ] TASK 11 — Performance
[ ] TASK 12 — Accessibility
[ ] TASK 13 — Responsive QA
[ ] TASK 14 — Visual Polish
[ ] TASK 15 — Deployment Readiness
```

---

# 11. Final Development Principle

Setiap prompt ke coding agent harus sesempit mungkin.

Preferred:

```text
Kerjakan task Experience Section.
```

Avoid:

```text
Selesaikan seluruh website dan buat sebagus mungkin.
```

Development approach:

```text
one section
    ↓
implement
    ↓
validate
    ↓
build
    ↓
review
    ↓
next section
```

Tujuannya adalah menjaga context agent tetap kecil, mengurangi perubahan yang tidak diminta, dan membuat hasil tiap section lebih mudah direview.
