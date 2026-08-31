# Architecture Document

## Personal Portfolio Website

**Document Version:** 1.0  
**Status:** Ready for Development  
**Related Document:** `prd.md` v1.1  
**Primary Stack:** Astro, TypeScript, Tailwind CSS  
**UI / Motion:** Magic UI + selective React Islands  
**Development Environment:** OpenCode + Magic UI MCP Server

---

## 1. Purpose

Dokumen ini mendefinisikan arsitektur teknis untuk Personal Portfolio Website berdasarkan requirement yang telah ditetapkan pada `prd.md`.

Tujuan utama arsitektur adalah:

- menjaga website tetap cepat dengan pendekatan **Astro static-first**;
- menggunakan JavaScript client-side hanya ketika benar-benar diperlukan;
- mengintegrasikan Magic UI tanpa mengubah seluruh website menjadi React application;
- memisahkan content, presentation, animation, dan external service;
- menjaga custom Skills dan Experience tetap independen dari component library;
- membuat project mudah dipelihara dan dikembangkan;
- mempertahankan accessibility, SEO, dan progressive enhancement.

---

# 2. Architecture Principles

## 2.1 Static First

Default implementation menggunakan Astro component dan server/static rendering.

React tidak boleh digunakan sebagai default untuk seluruh section hanya karena Magic UI menggunakan React.

Urutan keputusan implementasi:

```text
Can this be rendered with Astro + HTML + CSS?
        │
        ├─ Yes → Astro component
        │
        └─ No
            ↓
Does it need React only for component composition?
        │
        ├─ Yes → React component without hydration
        │
        └─ No
            ↓
Does it need browser runtime / state / scroll / animation?
        │
        └─ Yes → React Island with the lightest hydration strategy
```

---

## 2.2 Progressive Enhancement

Konten utama harus tetap tersedia meskipun:

- JavaScript gagal dimuat;
- animation tidak berjalan;
- user menggunakan `prefers-reduced-motion`;
- video Hero gagal dimuat;
- interactive enhancement tidak tersedia.

Animation merupakan enhancement, bukan dependency untuk memahami isi website.

---

## 2.3 Minimal Client JavaScript

Hydration hanya diberikan kepada komponen yang membutuhkan:

- browser APIs;
- animation state;
- scroll progress;
- runtime interaction;
- form submission state;
- canvas/particle rendering.

Komponen statis tidak boleh di-hydrate tanpa alasan.

---

## 2.4 Component Ownership

Komponen dibagi menjadi tiga kelompok.

### Astro-owned

Untuk:

- layout;
- navigation shell;
- section composition;
- content rendering;
- semantic markup;
- SEO;
- static project cards;
- footer.

### Magic UI-owned

Digunakan hanya untuk:

- Morphing Text;
- Video Text;
- Typing Animation;
- Pixel Image;
- Bento Grid;
- Border Beam;
- Particles.

### Custom-owned

Dibangun sendiri:

- Interactive Tech Stack Grid;
- Scroll Timeline;
- Contact Form composition;
- section wrappers;
- responsive behavior.

Magic UI tidak boleh menggantikan custom-owned components tanpa perubahan requirement.

---

# 3. High-Level System Architecture

```text
┌───────────────────────────────────────────────────────────────┐
│                         Browser                               │
│                                                               │
│  Static HTML + CSS                                            │
│  ├─ Navbar                                                    │
│  ├─ Hero                                                      │
│  ├─ About                                                     │
│  ├─ Skills                                                    │
│  ├─ Projects                                                  │
│  ├─ Experience                                                │
│  ├─ Contact                                                   │
│  └─ Footer                                                    │
│                                                               │
│  Hydrated Islands                                             │
│  ├─ Intro / Morphing Text                                     │
│  ├─ Typing / Pixel effect when required                       │
│  ├─ Interactive Tech Stack enhancement                        │
│  ├─ Scroll Timeline progress                                  │
│  ├─ Particles                                                 │
│  └─ Contact Form state                                        │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            │ POST message
                            ▼
┌───────────────────────────────────────────────────────────────┐
│                    Contact Submission Layer                   │
│                                                               │
│   Astro server endpoint / serverless function                 │
│                    OR                                         │
│   external form/email provider                                │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
                      Email / Inbox
```

Public portfolio content tidak membutuhkan database pada versi awal.

---

# 4. Application Rendering Model

## 4.1 Page Rendering

Main page:

```text
src/pages/index.astro
```

`index.astro` bertanggung jawab untuk composition, bukan untuk menyimpan seluruh markup section.

Contoh:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import Navbar from "@/components/layout/Navbar.astro";
import Hero from "@/components/sections/Hero.astro";
import About from "@/components/sections/About.astro";
import Skills from "@/components/sections/Skills.astro";
import Projects from "@/components/sections/Projects.astro";
import Experience from "@/components/sections/Experience.astro";
import Contact from "@/components/sections/Contact.astro";
import Footer from "@/components/layout/Footer.astro";
---

<BaseLayout>
  <Navbar />
  <main>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Contact />
  </main>
  <Footer />
</BaseLayout>
```

Intro overlay ditempatkan pada level layout/page agar dapat menutup viewport sebelum Hero menjadi fokus visual.

---

## 4.2 Static Content

Data portfolio harus di-import saat build untuk menghasilkan HTML.

```text
data
 ↓
Astro section
 ↓
HTML
 ↓
Browser
```

Tidak diperlukan client-side fetch untuk:

- skills;
- projects;
- experience;
- social links;
- navigation.

Ini menghindari loading state yang tidak diperlukan.

---

# 5. Hydration Strategy

Astro React integration memungkinkan React component dirender tanpa mengirim runtime React ke browser apabila hydration directive tidak diberikan.

Karena itu, setiap component harus menggunakan hydration seminimal mungkin.

## 5.1 Recommended Hydration Matrix

| Component | Rendering | Suggested Strategy |
|---|---|---|
| Navbar | Astro | No hydration by default |
| Intro / Morphing Text | React / Magic UI | `client:load` |
| Video Text | React or Astro wrapper | No hydration unless required |
| Typing Animation | React / Magic UI | `client:visible` or `client:load` if UX requires |
| Pixel Image | React / Magic UI | `client:visible` |
| Interactive Tech Stack Grid | Astro/CSS preferred | No hydration if CSS is sufficient |
| Bento Grid | Astro/React | No hydration by default |
| Border Beam | React/CSS | No hydration unless implementation requires runtime |
| Scroll Timeline | React island or lightweight JS | `client:visible` |
| Particles | React / Magic UI | `client:visible` |
| Contact Form | React island or Astro + JS | `client:visible` |
| Footer | Astro | No hydration |

`client:only` harus dihindari kecuali component benar-benar tidak dapat dirender pada server.

---

# 6. Intro Architecture

## 6.1 Responsibility

Intro bertugas sebagai visual overlay sekitar 3 detik.

Intro **bukan resource loader**.

```text
Page rendered
     │
     ├─ content exists behind overlay
     │
     ▼
Intro overlay active
     │
     ├─ Morphing greeting sequence
     │
     ▼
Final greeting
"Halo, Selamat Datang"
     │
     ▼
Exit transition
     │
     ▼
Hero visible
```

## 6.2 State

Minimal state:

```ts
type IntroState =
  | "active"
  | "exiting"
  | "complete";
```

## 6.3 Scroll Lock

Saat intro aktif:

```text
body overflow → hidden
```

Setelah intro selesai:

```text
body overflow → restored
```

Harus ada cleanup jika component unmount atau error.

## 6.4 Reduced Motion

Untuk `prefers-reduced-motion`:

- greetings dapat dipersingkat;
- morphing dapat diganti dengan fade sederhana;
- exit transition dibuat singkat;
- informasi utama tidak ditahan lebih lama dari yang diperlukan.

---

# 7. Navbar Architecture

Navbar merupakan Astro layout component.

Recommended responsibilities:

- render anchor navigation;
- semantic `<nav>`;
- responsive navigation;
- accessibility labels;
- optional active-section indicator.

Navbar tidak membutuhkan state global.

Anchor target:

```text
#about
#skills
#projects
#experience
#contact
```

Smooth scrolling dikontrol melalui CSS dan harus dihormati oleh reduced-motion preference.

---

# 8. Hero Architecture

## 8.1 Composition

```text
Hero.astro
   │
   └─ VideoText component
        ├─ full name
        ├─ video source
        └─ fallback style
```

Hero tidak boleh memiliki dependency terhadap data API.

## 8.2 Video Assets

Video disimpan secara lokal jika lisensi dan ukuran memungkinkan.

Recommended location:

```text
public/media/hero/
```

atau asset pipeline jika format dan penggunaan mendukung.

Requirements:

- compressed;
- muted;
- autoplay-compatible;
- `playsinline`;
- fallback poster/solid text;
- tidak menghambat Largest Contentful Paint secara berlebihan.

---

# 9. About Architecture

```text
About.astro
├─ AboutSummary
│  └─ TypingAnimation
└─ AboutPhoto
   └─ PixelImage
```

Desktop:

```text
50% content | 50% visual
```

Mobile:

```text
content
  ↓
photo
```

Text content disimpan terpisah dari animation component agar copy dapat diubah tanpa mengubah implementation.

Photo source tidak di-hardcode di dalam Pixel Image component.

---

# 10. Skills Architecture

## 10.1 Component

Custom component:

```text
InteractiveTechStackGrid
```

Tidak menggunakan Magic UI.

## 10.2 Preferred Implementation

Prioritas:

```text
Astro markup
+
Tailwind CSS
+
CSS hover/focus states
```

React island hanya digunakan jika interaction akhir memang membutuhkan state yang tidak praktis dengan CSS.

## 10.3 Data Model

```ts
export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
  url?: string;
}

export type SkillCategory =
  | "development"
  | "database"
  | "infrastructure"
  | "tools";
```

Possible structure:

```ts
export interface SkillGroup {
  id: string;
  label: string;
  order: number;
  skills: Skill[];
}
```

## 10.4 Interaction

Desktop enhancement:

```text
default
   ↓
hover / focus skill
   ├─ selected item emphasized
   ├─ underline / icon motion
   └─ surrounding items optionally reduce opacity
```

Keyboard focus harus menghasilkan treatment visual yang setara dengan hover.

Mobile tidak bergantung pada hover.

---

# 11. Projects Architecture

## 11.1 Data Model

```ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  image: ImageMetadata | string;
  liveUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
  order: number;
}
```

## 11.2 Composition

```text
Projects.astro
   │
   └─ ProjectBentoGrid
       ├─ FeaturedProject
       │   └─ BorderBeam
       │
       ├─ Project
       ├─ Project
       └─ Project
```

Featured project ditentukan melalui data, bukan hardcoded berdasarkan index.

Bad:

```ts
projects[0]
```

Preferred:

```ts
projects.find(project => project.featured)
```

## 11.3 Navigation

Project dapat memiliki:

- live URL;
- repository URL;
- future detail page.

External links harus jelas dan accessible.

---

# 12. Experience Architecture

## 12.1 Component

Custom:

```text
ScrollTimeline
```

Tidak menggunakan third-party timeline component.

## 12.2 Data Model

```ts
export interface Experience {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  periodLabel: string;
  summary: string;
  highlights?: string[];
  technologies?: string[];
  order: number;
}
```

## 12.3 Rendering

Base content dirender menjadi semantic HTML terlebih dahulu.

Animation layer hanya menambahkan:

- progress rail;
- active marker;
- item reveal;
- optional sticky year.

```text
Semantic content
      │
      ▼
Timeline layout
      │
      ▼
Scroll enhancement
```

## 12.4 Scroll Progress

Recommended model:

```text
timeline container
      │
      ├─ base rail
      │
      ├─ progress rail ← scrollYProgress
      │
      └─ markers ← active/in-view state
```

Jika menggunakan Motion:

```ts
useScroll({
  target: timelineRef,
  offset: ["start center", "end center"]
})
```

Implementation detail dapat berubah selama development selama behavior tetap sama.

## 12.5 Reduced Motion / JS Failure

Fallback:

```text
static vertical timeline
```

Semua content tetap terlihat.

---

# 13. Contact Section Architecture

## 13.1 Composition

```text
Contact.astro
├─ ParticlesBackground
└─ ContactFormCard
   ├─ BorderBeam
   └─ ContactForm
```

Particles diposisikan sebagai decorative layer.

Form harus berada pada layer dengan contrast yang jelas.

---

# 14. Contact Form Submission Architecture

Provider pengiriman pesan belum dikunci pada PRD.

Agar UI tidak terikat provider tertentu, gunakan abstraction boundary.

```text
ContactForm
    │
    ▼
submitContactMessage()
    │
    ▼
Contact Endpoint / Provider Adapter
    │
    ▼
Email Service
```

## 14.1 Request Contract

```ts
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
```

Response contract:

```ts
export interface ContactResponse {
  success: boolean;
  message: string;
}
```

## 14.2 Recommended API Contract

```http
POST /api/contact
Content-Type: application/json
```

Body:

```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "message": "Hello..."
}
```

Success:

```json
{
  "success": true,
  "message": "Message sent successfully."
}
```

Validation error:

```json
{
  "success": false,
  "message": "Invalid form data."
}
```

## 14.3 Hosting Consideration

Jika deployment menggunakan platform dengan serverless/runtime support:

```text
Astro API endpoint
      ↓
email provider
```

Jika deployment dipilih sebagai static-only hosting:

```text
Contact Form
      ↓
external form endpoint
```

UI component tidak boleh bergantung langsung pada SDK provider.

Dengan cara ini provider dapat diganti tanpa redesign form.

---

# 15. Form Security

Contact endpoint harus mempertimbangkan:

- server-side validation;
- payload length limits;
- input normalization;
- rate limiting jika tersedia;
- anti-spam mechanism jika dibutuhkan;
- secret/API key hanya di environment variable;
- tidak pernah mengekspos private provider key ke client.

Optional anti-spam:

- honeypot field;
- request throttling;
- CAPTCHA/Turnstile hanya jika spam benar-benar menjadi masalah.

Jangan menambahkan CAPTCHA berat pada versi awal tanpa kebutuhan.

---

# 16. Data Architecture

Portfolio content disimpan sebagai local typed data.

Recommended:

```text
src/data/
├─ skills.ts
├─ projects.ts
├─ experience.ts
├─ navigation.ts
└─ social-links.ts
```

Benefits:

- no runtime API request;
- typed content;
- easy reordering;
- reusable;
- clear separation between content and UI.

---

# 17. Asset Architecture

Recommended structure:

```text
src/assets/
├─ images/
│  ├─ profile/
│  └─ projects/
│
public/
├─ media/
│  └─ hero/
└─ icons/
```

## 17.1 Images

Use Astro asset optimization when possible.

Project screenshots and profile images should define:

- meaningful alt text;
- width/height;
- responsive sizes;
- optimized format.

## 17.2 Video

Hero video should prioritize:

- low file size;
- short loop;
- no audio;
- fallback behavior;
- mobile compatibility.

---

# 18. Styling Architecture

## 18.1 Tailwind

Tailwind digunakan untuk:

- spacing;
- typography;
- layout;
- responsive breakpoints;
- states;
- theme tokens.

Avoid arbitrary one-off values when a reusable design token is more appropriate.

## 18.2 Global Styles

`src/styles/global.css` digunakan untuk:

- CSS variables;
- reset/base rules;
- body styles;
- selection;
- reduced motion;
- reusable global animations only when justified.

Suggested tokens:

```css
:root {
  --background: ...;
  --foreground: ...;
  --muted: ...;
  --border: ...;
  --surface: ...;

  --radius-sm: ...;
  --radius-md: ...;

  --duration-fast: ...;
  --duration-normal: ...;
  --duration-slow: ...;
}
```

Exact values ditentukan pada Design System.

---

# 19. Animation Architecture

Animation dibagi menjadi tiga level.

## Level 1 — CSS Micro Interaction

Untuk:

- hover;
- underline;
- focus;
- opacity;
- small scale;
- button transition.

## Level 2 — Viewport Animation

Untuk:

- staggered skill reveal;
- experience item reveal;
- section entrance.

Gunakan hanya ketika element masuk viewport.

## Level 3 — Continuous / Runtime Animation

Untuk:

- Morphing Text;
- Scroll Timeline progress;
- Particles;
- complex Magic UI effects.

Level 3 harus dibatasi karena memiliki runtime cost terbesar.

---

# 20. Accessibility Architecture

Semantic structure:

```text
<header>
  <nav>
</header>

<main>
  <section id="about">
  <section id="skills">
  <section id="projects">
  <section id="experience">
  <section id="contact">
</main>

<footer>
```

Requirements:

- exactly one primary `<h1>`;
- logical heading hierarchy;
- keyboard-focusable links/buttons;
- visible focus states;
- form labels;
- meaningful alternative text;
- decorative animation hidden from assistive technology when appropriate.

Particles and decorative beams should use appropriate accessibility treatment such as:

```text
aria-hidden="true"
```

when they contain no semantic content.

---

# 21. Reduced Motion Architecture

Global detection:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable or simplify non-essential motion */
}
```

Runtime components juga harus membaca preference apabila CSS saja tidak cukup.

Expected behavior:

| Component | Reduced Motion |
|---|---|
| Intro | Simple/faster fade |
| Video Text | Static/fallback presentation allowed |
| Typing Animation | Text may appear immediately |
| Pixel Image | Static image |
| Tech Grid | No stagger required |
| Border Beam | Static border |
| Scroll Timeline | Static timeline |
| Particles | Disabled |
| Smooth scroll | Disabled |

---

# 22. SEO Architecture

SEO dikelola pada layout level.

```text
BaseLayout.astro
├─ title
├─ meta description
├─ canonical
├─ Open Graph
├─ Twitter/social metadata
├─ favicon
└─ structured metadata
```

Page-specific content tetap disediakan sebagai props jika project berkembang menjadi multi-page.

Additional build assets:

```text
sitemap.xml
robots.txt
social preview image
```

---

# 23. Error and Fallback Architecture

## Hero Video Failure

```text
video fails
   ↓
solid/fallback full-name text remains
```

## Pixel Image Failure

```text
effect fails
   ↓
normal optimized image
```

## Animation Failure

```text
JS unavailable
   ↓
static semantic content
```

## Contact Submission Failure

```text
submit
   ↓
error
   ↓
show actionable message
   ↓
retain form content
```

---

# 24. Environment Configuration

Only values that differ by environment belong in environment variables.

Possible example:

```text
PUBLIC_SITE_URL=
CONTACT_PROVIDER_API_KEY=
CONTACT_TO_EMAIL=
```

Private variables must never use a public-exposed prefix.

`.env` must not be committed.

Provide:

```text
.env.example
```

without secret values.

---

# 25. Suggested Directory Structure

```text
/
├─ public/
│  ├─ favicon/
│  ├─ icons/
│  └─ media/
│     └─ hero/
│
├─ src/
│  ├─ assets/
│  │  └─ images/
│  │     ├─ profile/
│  │     └─ projects/
│  │
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Navbar.astro
│  │  │  └─ Footer.astro
│  │  │
│  │  ├─ sections/
│  │  │  ├─ Hero.astro
│  │  │  ├─ About.astro
│  │  │  ├─ Skills.astro
│  │  │  ├─ Projects.astro
│  │  │  ├─ Experience.astro
│  │  │  └─ Contact.astro
│  │  │
│  │  ├─ custom/
│  │  │  ├─ InteractiveTechStackGrid.astro
│  │  │  ├─ ScrollTimeline.tsx
│  │  │  └─ ScrollTimelineItem.astro
│  │  │
│  │  ├─ magic-ui/
│  │  │  ├─ MorphingText.tsx
│  │  │  ├─ VideoText.tsx
│  │  │  ├─ TypingAnimation.tsx
│  │  │  ├─ PixelImage.tsx
│  │  │  ├─ BentoGrid.tsx
│  │  │  ├─ BorderBeam.tsx
│  │  │  └─ Particles.tsx
│  │  │
│  │  └─ forms/
│  │     └─ ContactForm.tsx
│  │
│  ├─ data/
│  │  ├─ navigation.ts
│  │  ├─ skills.ts
│  │  ├─ projects.ts
│  │  ├─ experience.ts
│  │  └─ social-links.ts
│  │
│  ├─ layouts/
│  │  └─ BaseLayout.astro
│  │
│  ├─ lib/
│  │  ├─ contact/
│  │  │  ├─ schema.ts
│  │  │  └─ submit-contact.ts
│  │  └─ utils.ts
│  │
│  ├─ pages/
│  │  ├─ index.astro
│  │  └─ api/
│  │     └─ contact.ts
│  │
│  ├─ styles/
│  │  └─ global.css
│  │
│  └─ types/
│     └─ portfolio.ts
│
├─ .env.example
├─ astro.config.*
├─ package.json
├─ tsconfig.json
└─ tailwind / CSS configuration as required by project setup
```

Directory dapat disederhanakan jika implementation ternyata tidak membutuhkan seluruh layer.

Arsitektur harus menghindari folder abstraksi yang tidak memberi manfaat nyata.

---

# 26. Dependency Strategy

## Required

```text
Astro
Tailwind CSS
TypeScript
React integration
```

## Selective

```text
Magic UI component dependencies
Motion dependency when actually used
Icon library if needed
Contact provider SDK only on server if needed
```

Rules:

- install dependency only when used;
- avoid multiple animation libraries with overlapping responsibility;
- do not install an additional UI framework solely for Skills or Experience;
- periodically remove unused dependencies.

---

# 27. Magic UI MCP Architecture

Magic UI MCP adalah **development-time integration**.

```text
OpenCode
   │
   ▼
Magic UI MCP
   │
   ▼
Magic UI component reference/source
   │
   ▼
Project source code
```

MCP tidak berada dalam runtime path:

```text
Browser ─X─ Magic UI MCP
Production Server ─X─ Magic UI MCP
```

## Usage Rules

MCP hanya digunakan untuk:

- Morphing Text;
- Video Text;
- Typing Animation;
- Pixel Image;
- Bento Grid;
- Border Beam;
- Particles;
- maintenance terhadap komponen Magic UI tersebut.

MCP tidak digunakan untuk:

- Interactive Tech Stack Grid;
- Scroll Timeline;
- generic debugging;
- unrelated refactoring;
- arbitrary component discovery tanpa requirement.

---

# 28. OpenCode Development Boundaries

Agent development harus mengikuti source-of-truth berikut:

```text
PRD
 ↓
Architecture
 ↓
Design System
 ↓
Task Breakdown
 ↓
Implementation
```

Apabila agent menemukan alternative component yang berbeda dengan keputusan dokumen:

```text
Do not silently replace architecture.
```

Contoh:

```text
Skills
→ custom Interactive Tech Stack Grid
→ not Magic UI grid

Experience
→ custom Scroll Timeline
→ not Aceternity / external timeline

Contact
→ Border Beam
→ not Shine Border
```

---

# 29. Performance Architecture

## Critical Path

Prioritas loading:

```text
HTML
 ↓
critical CSS
 ↓
Hero typography / fallback
 ↓
Hero media
 ↓
below-fold media
 ↓
below-fold interactive islands
```

## Below-the-Fold

Components seperti:

- Pixel Image;
- Skills enhancement;
- Scroll Timeline;
- Particles;
- Contact Form runtime;

sebaiknya tidak mengambil prioritas hydration yang sama dengan Intro/Hero.

## Avoid

- global React hydration;
- SPA conversion;
- large client bundle;
- unnecessary client-side data fetch;
- duplicate animation libraries;
- oversized hero video;
- uncontrolled particle count.

---

# 30. Deployment Architecture

Recommended production model:

```text
Git Repository
      │
      ▼
Build Pipeline
      │
      ├─ Astro build
      ├─ Type check
      └─ optional lint/test
      │
      ▼
Hosting Platform
      │
      ├─ Static assets
      └─ Serverless contact endpoint if required
```

Compatible deployment direction includes platforms capable of serving Astro static output and, if `/api/contact` is used, a compatible serverless/runtime adapter.

Exact hosting provider remains a deployment decision.

---

# 31. Testing Strategy

## Static / Build

- Astro build succeeds.
- TypeScript errors = 0.
- no broken imports.
- no missing required environment variables in production.

## Responsive

Minimum verification:

- mobile;
- tablet;
- laptop;
- desktop;
- large desktop.

## Functional

Test:

- navbar anchors;
- intro completion;
- video fallback;
- project links;
- tech-grid interaction;
- timeline progress;
- contact validation;
- contact success;
- contact failure.

## Accessibility

Verify:

- keyboard navigation;
- focus states;
- heading structure;
- labels;
- contrast;
- reduced motion.

## Performance

Run production Lighthouse and verify targets from PRD.

---

# 32. Architecture Decision Records

## ADR-001 — Astro as Application Shell

**Decision:** Astro menjadi framework utama.

**Reason:**

- portfolio sebagian besar content-driven;
- static-first output;
- strong SEO;
- selective hydration;
- React dapat digunakan hanya pada islands.

---

## ADR-002 — React Is Not the Application Root

**Decision:** React hanya menjadi supporting runtime.

**Reason:**

- mencegah SPA/client bundle yang tidak diperlukan;
- mempertahankan keuntungan Astro;
- Magic UI tetap dapat digunakan secara selective.

---

## ADR-003 — Skills Is Custom

**Decision:** Skills menggunakan custom Interactive Tech Stack Grid.

**Reason:**

- menjaga visual section tetap clean;
- tidak menambah library baru;
- interaction dapat dibuat dengan CSS terlebih dahulu;
- lebih mudah disesuaikan dengan personal branding.

---

## ADR-004 — Experience Is Custom

**Decision:** Experience menggunakan custom Scroll Timeline.

**Reason:**

- available third-party timelines tidak sesuai clean visual direction;
- scroll behavior dapat dibuat sesuai kebutuhan;
- static fallback mudah dipertahankan.

---

## ADR-005 — Border Beam Replaces Shine Border

**Decision:** Contact Form menggunakan Border Beam.

**Reason:**

- Shine Border memiliki karakter colorful;
- Border Beam lebih mudah diselaraskan dengan monochrome theme;
- konsisten dengan featured project treatment.

---

## ADR-006 — Portfolio Data Is Local

**Decision:** Skills, projects, dan experience menggunakan local typed data.

**Reason:**

- tidak membutuhkan CMS/database pada MVP;
- build-time rendering lebih cepat;
- mudah dipelihara;
- tidak menambah network dependency.

---

## ADR-007 — Contact Provider Is Abstracted

**Decision:** Contact UI tidak terikat langsung pada satu provider.

**Reason:**

- provider belum dikunci;
- deployment target dapat berubah;
- memudahkan migrasi;
- credentials tetap server-side.

---

## ADR-008 — Magic UI MCP Is Development Only

**Decision:** Magic UI MCP hanya digunakan oleh OpenCode saat development.

**Reason:**

- MCP bukan runtime website;
- mencegah dependency coupling;
- menghindari MCP digunakan untuk custom components yang sudah dikunci.

---

# 33. Architecture Acceptance Criteria

Architecture dianggap diimplementasikan dengan benar apabila:

- [ ] Astro tetap menjadi application shell utama.
- [ ] Tidak ada global React application root.
- [ ] React hydration hanya digunakan ketika browser runtime memang diperlukan.
- [ ] Static content tidak di-fetch dari client.
- [ ] Skills berasal dari local typed data.
- [ ] Projects berasal dari local typed data.
- [ ] Experience berasal dari local typed data.
- [ ] Interactive Tech Stack Grid merupakan custom implementation.
- [ ] Scroll Timeline merupakan custom implementation.
- [ ] Magic UI terbatas pada component yang ditentukan PRD.
- [ ] Magic UI MCP tidak menjadi production dependency.
- [ ] Contact Form tidak mengekspos secret pada client.
- [ ] Contact provider dapat diganti tanpa redesign UI.
- [ ] Reduced-motion behavior tersedia.
- [ ] Website tetap readable saat animation gagal.
- [ ] Hero memiliki video fallback.
- [ ] Main content memiliki semantic HTML.
- [ ] Build production berhasil tanpa TypeScript error.
- [ ] Performance architecture tetap mengikuti target PRD.

---

# 34. Summary

Arsitektur website menggunakan pendekatan:

```text
Astro Static-First
        +
Tailwind CSS
        +
Typed Local Content
        +
Selective React Islands
        +
Selective Magic UI
        +
Custom Skills / Experience
        +
Serverless / Abstracted Contact Layer
```

Prinsip paling penting:

> **Render everything statically by default, hydrate only what must be interactive.**

Dengan pendekatan ini, website tetap dapat menggunakan visual dan motion yang kuat tanpa kehilangan keunggulan Astro dalam performance, SEO, dan minimal client-side JavaScript.
