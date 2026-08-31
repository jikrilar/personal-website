# Design System

## Personal Portfolio Website

**Document Version:** 1.0  
**Status:** Ready for Development  
**Related Documents:** `prd.md` v1.1, `architecture.md` v1.0  
**Primary Stack:** Astro, Tailwind CSS, TypeScript  
**UI / Motion:** Magic UI + Custom Components  
**Design Direction:** Monochrome, Clean, Editorial, Interactive

---

# 1. Design System Purpose

Dokumen ini menjadi source of truth untuk seluruh keputusan visual dan interaction pada Personal Portfolio Website.

Tujuan utama design system:

- menjaga visual tetap konsisten di seluruh section;
- mempertahankan karakter **monochrome, clean, modern, dan personal**;
- memastikan motion terasa intentional, bukan dekoratif berlebihan;
- mencegah penggunaan warna, shadow, border, atau animation yang tidak sesuai arah desain;
- memberi guideline yang jelas untuk implementasi di Astro + Tailwind;
- memudahkan OpenCode mengembangkan UI tanpa keluar dari keputusan desain.

---

# 2. Design Principles

## 2.1 Monochrome First

Palet utama menggunakan:

- hitam;
- putih;
- neutral gray.

Tidak menggunakan:

- rainbow gradient;
- neon multicolor;
- colorful glow;
- colorful border;
- decorative accent colors yang tidak diperlukan.

Jika sebuah komponen library memiliki default effect berwarna, effect tersebut harus dimodifikasi menjadi monochrome atau tidak digunakan.

---

## 2.2 Visual Hierarchy Through Typography

Visual hierarchy dibangun melalui:

- ukuran typography;
- font weight;
- whitespace;
- line-height;
- alignment;
- border;
- contrast.

Bukan melalui banyak warna.

---

## 2.3 Motion With Purpose

Animation digunakan untuk:

- memperkenalkan content;
- menunjukkan scroll progress;
- menambah feedback interaction;
- memberi visual identity;
- memperhalus transition antar-state.

Animation tidak digunakan hanya karena tersedia.

---

## 2.4 Clean Over Decorative

Default component treatment:

```text
clean layout
+ strong typography
+ subtle border
+ restrained motion
```

Avoid:

```text
heavy shadow
+ multiple gradients
+ glassmorphism berlebihan
+ glow berlebihan
+ excessive rounded cards
```

---

## 2.5 Content Remains Primary

Semua visual effect harus mendukung content.

Urutan prioritas:

```text
Content
   ↓
Hierarchy
   ↓
Interaction
   ↓
Decoration
```

---

# 3. Brand Personality

Website harus terasa:

- modern;
- confident;
- technical;
- clean;
- intentional;
- interactive;
- polished;
- personal.

Website tidak boleh terasa:

- corporate template;
- colorful SaaS dashboard;
- gaming UI;
- overly futuristic;
- playful cartoon;
- component-library showcase.

---

# 4. Color System

## 4.1 Core Palette

### Light Theme

```css
--background: #ffffff;
--foreground: #0a0a0a;

--surface: #ffffff;
--surface-muted: #f5f5f5;

--muted: #737373;
--muted-foreground: #525252;

--border: #e5e5e5;
--border-strong: #a3a3a3;

--inverse-background: #0a0a0a;
--inverse-foreground: #fafafa;
```

### Dark Theme

```css
--background: #0a0a0a;
--foreground: #fafafa;

--surface: #111111;
--surface-muted: #171717;

--muted: #a3a3a3;
--muted-foreground: #d4d4d4;

--border: #262626;
--border-strong: #525252;

--inverse-background: #fafafa;
--inverse-foreground: #0a0a0a;
```

---

## 4.2 Recommended Tailwind Mapping

```text
background
foreground
surface
surface-muted
muted
muted-foreground
border
border-strong
inverse-background
inverse-foreground
```

Tidak disarankan menggunakan raw hex secara langsung di banyak component.

---

## 4.3 Semantic Usage

### Background

Main page:

```text
var(--background)
```

Section tidak perlu alternating background tanpa alasan.

Subtle differentiation dapat menggunakan:

```text
surface-muted
```

secara sangat terbatas.

### Foreground

Primary text:

```text
foreground
```

Secondary text:

```text
muted
```

### Border

Default:

```text
border
```

Interactive active state:

```text
border-strong
```

---

# 5. Border Beam Styling

Border Beam digunakan pada:

1. featured project;
2. contact form card.

Beam harus tetap monochrome.

Recommended visual:

### Light Theme

```text
base border: #e5e5e5
beam: black → gray → black
```

### Dark Theme

```text
base border: #262626
beam: white → gray → white
```

Avoid:

```text
blue
purple
pink
rainbow
multi-color beam
```

Intensity harus subtle.

Border Beam merupakan accent, bukan focal point utama.

---

# 6. Typography

## 6.1 Font Direction

Recommended:

### Primary

```text
Geist
```

Alternative:

```text
Inter
```

Use one primary sans-serif family consistently.

Optional monospace:

```text
Geist Mono
```

untuk:

- numbering;
- tech labels;
- dates;
- small metadata;
- code-inspired labels.

---

# 7. Typography Scale

Recommended desktop scale:

```text
Display XL    96–144px
Display L     72–96px
H1            56–72px
H2            40–56px
H3            28–36px
H4            20–24px
Body Large    18–20px
Body          16px
Small         14px
Caption       12px
```

Mobile:

```text
Display XL    48–64px
Display L     40–52px
H1            36–48px
H2            30–40px
H3            24–30px
H4            18–22px
Body Large    17–18px
Body          16px
Small         14px
Caption       12px
```

---

# 8. Font Weight

Recommended:

```text
Regular       400
Medium        500
Semibold      600
Bold          700
```

Avoid excessive use of:

```text
800
900
```

except Hero/Display jika memang dibutuhkan oleh Video Text composition.

---

# 9. Line Height

Recommended:

```text
Display       0.9 – 1.0
Heading       1.05 – 1.2
Body          1.5 – 1.7
Small         1.4 – 1.5
```

Body copy harus tetap nyaman dibaca.

---

# 10. Letter Spacing

Use sparingly.

Recommended:

```text
Display       -0.03em to -0.05em
Heading       -0.02em
Body          normal
Upper labels  0.08em – 0.14em
```

Section labels seperti:

```text
01 — ABOUT
02 — SKILLS
```

dapat menggunakan uppercase + wider tracking.

---

# 11. Layout System

## 11.1 Page Container

Recommended:

```text
max-width: 1280px–1440px
```

Content utama:

```text
width: 100%
margin-inline: auto
```

Side padding:

```text
mobile       20–24px
tablet       32px
desktop      48–64px
large        72–96px
```

---

# 12. Section Spacing

Recommended vertical spacing:

```text
mobile     96–120px
tablet     120–144px
desktop    144–192px
```

Hero dapat memiliki lebih sedikit atau lebih banyak tergantung viewport.

Experience dan Skills sebaiknya memiliki whitespace besar karena menjadi section yang lebih calm.

---

# 13. Grid System

Desktop:

```text
12-column grid
```

Common patterns:

```text
About:
6 columns / 6 columns

Skills:
full width

Projects:
Bento Grid

Experience:
3–4 columns metadata
+
8–9 columns content

Contact:
centered card
```

Mobile:

```text
single column
```

---

# 14. Responsive Breakpoints

Suggested:

```text
sm    640px
md    768px
lg    1024px
xl    1280px
2xl   1536px
```

Use Tailwind defaults unless project requirement changes.

---

# 15. Border Radius

Design should not feel overly rounded.

Recommended:

```text
radius-sm    6px
radius-md    10px
radius-lg    16px
radius-xl    20px
```

Usage:

```text
buttons          8–10px
form fields      8–10px
project cards    12–16px
contact card     16–20px
```

Avoid pill shape unless element memang berupa badge/chip.

---

# 16. Border System

Default:

```text
1px solid var(--border)
```

Stronger:

```text
1px solid var(--border-strong)
```

Section separator dapat menggunakan:

```text
border-top
```

secara selektif.

Navbar:

```text
no border
```

sesuai keputusan produk.

---

# 17. Shadow System

Default:

```text
no shadow
```

Jika shadow diperlukan:

```text
very subtle
low opacity
soft blur
```

Avoid:

- hard black shadow;
- colored shadow;
- elevated SaaS-card appearance.

Visual depth lebih baik berasal dari border dan contrast.

---

# 18. Iconography

Recommended icon library:

```text
Lucide
```

Icon style:

- outline;
- 1.5–2px stroke;
- monochrome;
- consistent size;
- no filled colorful icons.

Tech stack logos boleh menggunakan brand logo shape, tetapi sebaiknya tetap monochrome jika memungkinkan.

---

# 19. Motion Tokens

Recommended timing:

```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 450ms;
--duration-reveal: 600ms;
```

Recommended easing:

```css
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

---

# 20. Motion Intensity

## Subtle

Use for:

- hover;
- focus;
- underline;
- icon movement.

Range:

```text
translate: 2–6px
scale: 1.01–1.03
```

## Medium

Use for:

- card reveal;
- section reveal;
- typing/pixel effects.

## Strong

Reserved for:

- Intro Morphing Text;
- Hero Video Text;
- Scroll Timeline progress;
- Particles background.

Strong motion tidak boleh muncul bersamaan dalam terlalu banyak section.

---

# 21. Reduced Motion

Saat user menggunakan:

```text
prefers-reduced-motion: reduce
```

Behavior:

```text
Morphing Text      → simple fade
Typing Animation   → text appears immediately
Pixel Image        → static image
Tech Grid          → no stagger
Bento effect       → static
Border Beam        → static border
Scroll Timeline    → static line
Particles          → disabled
Smooth scroll      → disabled
```

---

# 22. Section Rhythm

Visual rhythm final:

```text
Intro        → Strong
Hero         → Strong
About        → Strong
Skills       → Calm
Projects     → Strong
Experience   → Calm
Contact      → Strong
Footer       → Minimal
```

Tujuan:

- memberi breathing room;
- menjaga visual effects tetap impactful;
- mencegah motion fatigue.

---

# 23. Intro / Loading State

## Component

```text
Magic UI — Morphing Text
```

## Duration

```text
± 3 seconds
```

## Greeting Sequence

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

## Layout

```text
full viewport
centered content
background = page background
foreground = page foreground
```

## Typography

Recommended:

```text
H2 / Display L
medium or semibold
```

## Exit

Recommended:

```text
opacity fade
+
small scale/translate
```

Do not use colorful transition.

---

# 24. Navbar

## Visual

```text
borderless
minimal
transparent / page background
```

## Position

Recommended:

```text
sticky or fixed
top
```

dengan blur/background hanya jika readability membutuhkannya.

## Content

Possible:

```text
Logo / Initial
About
Skills
Projects
Experience
Contact
```

## Hover

```text
opacity
underline
small translate
```

Avoid:

- filled navigation tabs;
- large pills;
- heavy background.

---

# 25. Hero Section

## Main Visual

```text
Magic UI — Video Text
```

Text:

```text
Full Name
```

Hero harus menjadi visual anchor terbesar di halaman.

## Layout

Recommended:

```text
min-height: 80–100vh
```

Full-name typography harus dominan.

## Supporting Content

Jika ditambahkan:

- role;
- short one-line descriptor;
- subtle CTA.

Supporting content tidak boleh bersaing dengan Video Text.

---

# 26. About Section

## Layout

Desktop:

```text
Text           Photo
50%            50%
```

Mobile:

```text
Text
↓
Photo
```

## Left Column

Component:

```text
Magic UI — Typing Animation
```

Content:

- short personal summary;
- concise;
- human;
- professional.

Typing effect tidak boleh terlalu lambat.

## Right Column

Component:

```text
Magic UI — Pixel Image
```

Image:

- personal photo;
- clean composition;
- neutral background preferred;
- good contrast.

Pixel effect harus menjadi transition enhancement, bukan membuat image sulit dikenali.

---

# 27. Skills Section

## Component

```text
Custom Interactive Tech Stack Grid
```

## Design Direction

Clean editorial grid.

Recommended:

```text
01 — DEVELOPMENT
────────────────────────────────────
Astro        React        Laravel
TypeScript   JavaScript   Tailwind

02 — DATABASE
────────────────────────────────────
MySQL        PostgreSQL

03 — INFRASTRUCTURE & TOOLS
────────────────────────────────────
Docker       Git          Linux
AWS          Microsoft 365
```

## Card Treatment

Preferred:

```text
no heavy card
no shadow
light border or row separators
```

## Interaction

Hover/focus:

```text
selected skill becomes primary
optional icon reveal
underline animation
small directional icon movement
other items opacity ↓ slightly
```

Do not reduce surrounding items below readable contrast.

## Entrance

Subtle stagger allowed.

No physics simulation.

No marquee by default.

---

# 28. Skills Mobile Behavior

Mobile should not rely on hover.

Preferred:

```text
2-column grid
```

or:

```text
single-column row list
```

depending final content density.

Tap interaction must not be required to understand skill names.

---

# 29. Projects Section

## Component

```text
Magic UI — Bento Grid
```

## Hierarchy

```text
Featured Project
↓
Secondary Projects
```

Featured project should occupy more grid area.

## Featured Project

Add:

```text
Border Beam
```

Beam monochrome.

## Card Content

Recommended:

- screenshot / visual;
- title;
- short description;
- tech stack;
- project link;
- repository link if available.

## Card Treatment

```text
background: surface
border: 1px
radius: medium/large
shadow: none
```

Hover:

```text
slight translate
image scale 1.01–1.03
border stronger
```

---

# 30. Project Tech Tags

Tags should remain minimal.

Example:

```text
Astro
Tailwind
TypeScript
```

Recommended style:

```text
small text
border
muted background
small radius
```

Avoid colorful tech badges unless all are converted to monochrome treatment.

---

# 31. Experience Section

## Component

```text
Custom Scroll Timeline
```

## Visual Direction

Minimal.

Do not use:

- alternating zig-zag cards;
- glow;
- large bubbles;
- colorful nodes.

## Desktop Layout

Recommended:

```text
DATE / PERIOD   │   EXPERIENCE CONTENT
                ●
                │
                │
```

## Timeline Style

Base rail:

```text
1px muted border
```

Progress rail:

```text
foreground
```

Marker:

```text
small circle
```

Inactive marker:

```text
border
background
```

Active marker:

```text
foreground
```

---

# 32. Experience Content

Each item includes:

```text
Period
Company / Organization
Role
Short Description
Optional Tech / Responsibility Labels
```

Typography hierarchy:

```text
Period          small / mono / muted
Company         H3
Role            body large / medium
Description     body / muted
Metadata        small
```

---

# 33. Experience Motion

On scroll:

```text
progress line fills
marker activates
content fades / moves slightly upward
```

Recommended translate:

```text
8–16px
```

No excessive parallax.

Optional:

```text
sticky year on desktop
```

only if implementation remains clean.

---

# 34. Contact / Send Message Section

## Background

```text
Magic UI — Particles
```

Particles must be monochrome and subtle.

Recommended:

```text
low density
low opacity
slow movement
```

Avoid visual noise behind form fields.

---

# 35. Contact Form Card

Add:

```text
Magic UI — Border Beam
```

Beam monochrome.

Card:

```text
centered
max-width ± 640–720px
surface background
1px border
medium/large radius
no heavy shadow
```

---

# 36. Form Fields

Fields:

```text
Name
Email
Message
```

Recommended style:

```text
background transparent / surface
1px border
8–10px radius
comfortable padding
```

Focus:

```text
border → foreground / strong border
no colorful outline
```

Labels should remain visible.

Placeholder tidak boleh menggantikan label.

---

# 37. Form Button

Recommended:

```text
primary inverse button
```

Light:

```text
black background
white text
```

Dark:

```text
white background
black text
```

Hover:

```text
small opacity/scale change
```

Loading:

```text
disabled
spinner or text state
```

Success/error state should use neutral iconography and text.

If semantic status color is introduced, use it minimally and only for feedback—not for decoration.

---

# 38. Footer

Minimal.

Possible content:

```text
© Year Name
GitHub
LinkedIn
Email
Back to top
```

Visual:

```text
small typography
ample whitespace
no heavy border
```

Optional top border may be used only if visual separation is needed.

---

# 39. Buttons

## Primary

```text
background: foreground
text: background
border: foreground
```

## Secondary

```text
transparent
border
foreground text
```

## Ghost

```text
transparent
no border
foreground/muted
```

Recommended height:

```text
40–48px
```

---

# 40. Link Styling

Inline links should be identifiable.

Recommended:

```text
underline
underline offset
opacity transition
```

External arrow:

```text
↗
```

or Lucide arrow icon.

---

# 41. Focus States

All interactive elements must have visible focus.

Recommended:

```text
outline or ring using foreground / border-strong
```

Do not remove outline without replacement.

---

# 42. Image Treatment

Profile image:

```text
Pixel Image effect
```

Project images:

```text
clean crop
consistent aspect ratio
no colored frame
```

Recommended aspect ratio:

```text
16:10
16:9
4:3
```

depending Bento placement.

---

# 43. Background Effects

Only approved background effects:

```text
Hero          → Video Text internally
Contact       → Particles
```

Do not add:

- animated grid;
- aurora;
- gradient mesh;
- stars;
- blobs;
- noisy background;
- extra beam backgrounds.

unless design system is explicitly revised.

---

# 44. Component Library Usage

Approved Magic UI components:

```text
Morphing Text
Video Text
Typing Animation
Pixel Image
Bento Grid
Border Beam
Particles
```

Custom components:

```text
Interactive Tech Stack Grid
Scroll Timeline
```

Do not replace custom components with third-party components without revising design documentation.

---

# 45. Magic UI MCP Design Rules

Magic UI MCP may be used to:

- retrieve approved components;
- inspect component implementation;
- adapt styling to monochrome;
- maintain component source.

Magic UI MCP must not be used to:

- introduce random new visual effects;
- add colorful UI;
- replace Skills custom component;
- replace Experience custom component;
- add components not defined in PRD/design system without explicit requirement.

---

# 46. Copy Tone

Writing tone:

- concise;
- professional;
- natural;
- direct;
- personal.

Avoid:

- buzzword-heavy language;
- overly dramatic statements;
- generic AI-sounding descriptions;
- very long paragraphs.

---

# 47. Content Length Guidelines

## Hero

```text
1 primary visual statement
1 optional short descriptor
```

## About

```text
2–4 short sentences
```

## Project

```text
1–2 sentence summary
```

## Experience

```text
2–4 short sentences
```

## Contact

```text
1 short intro sentence
```

---

# 48. Accessibility

Minimum standards:

- semantic HTML;
- keyboard navigation;
- visible focus;
- alt text;
- sufficient contrast;
- motion reduction;
- form labels;
- readable text size;
- touch target minimum approximately 44px.

Decorative components:

```text
Particles
Border Beam
decorative motion
```

should be hidden from assistive technology where appropriate.

---

# 49. Dark Mode

If dark mode is implemented:

```text
same visual hierarchy
same monochrome philosophy
same component behavior
```

Do not create an entirely different design.

Border Beam and Particles must switch to monochrome values appropriate for dark background.

Theme transition should be subtle.

---

# 50. Do / Don't

## Do

```text
use whitespace
use large typography
use neutral borders
use subtle motion
use monochrome assets
use responsive layouts
use clear hierarchy
```

## Don't

```text
use rainbow gradients
use colorful shadows
use glassmorphism everywhere
use heavy rounded cards
use excessive blur
use animations on every element
use multiple component libraries for the same purpose
```

---

# 51. Suggested CSS Variables

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --surface: #ffffff;
  --surface-muted: #f5f5f5;

  --muted: #737373;
  --muted-foreground: #525252;

  --border: #e5e5e5;
  --border-strong: #a3a3a3;

  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 1rem;
  --radius-xl: 1.25rem;

  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 450ms;
  --duration-reveal: 600ms;

  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --surface: #111111;
  --surface-muted: #171717;

  --muted: #a3a3a3;
  --muted-foreground: #d4d4d4;

  --border: #262626;
  --border-strong: #525252;
}
```

---

# 52. Visual QA Checklist

Before component is considered done:

- [ ] Follows monochrome palette.
- [ ] No unnecessary gradient.
- [ ] No colorful shadow.
- [ ] Typography hierarchy is clear.
- [ ] Border treatment matches system.
- [ ] Spacing follows section rhythm.
- [ ] Hover/focus state exists where relevant.
- [ ] Motion is subtle and purposeful.
- [ ] Reduced-motion behavior exists.
- [ ] Mobile layout is usable.
- [ ] Component works with keyboard.
- [ ] Decorative animation does not block content.
- [ ] Magic UI default colors are overridden when needed.
- [ ] No new visual language is introduced accidentally.

---

# 53. Section Acceptance Criteria

## Intro

- [ ] Fullscreen overlay.
- [ ] Morphing Text used.
- [ ] Greeting sequence matches PRD.
- [ ] Duration approximately 3 seconds.
- [ ] Exit is smooth and monochrome.
- [ ] Reduced-motion fallback exists.

## Navbar

- [ ] No border.
- [ ] Minimal visual.
- [ ] Responsive.
- [ ] Keyboard accessible.
- [ ] Anchor navigation works.

## Hero

- [ ] Full name is primary visual.
- [ ] Video Text used.
- [ ] Video has fallback.
- [ ] Typography remains readable.

## About

- [ ] Two columns on desktop.
- [ ] Stacked on mobile.
- [ ] Typing Animation used for summary.
- [ ] Pixel Image used for profile photo.
- [ ] Content remains readable without motion.

## Skills

- [ ] Custom Interactive Tech Stack Grid.
- [ ] No third-party skills component.
- [ ] Clear categories.
- [ ] Hover/focus interaction.
- [ ] Mobile works without hover.
- [ ] No excessive animation.

## Projects

- [ ] Bento Grid used.
- [ ] Featured project visually dominant.
- [ ] Border Beam only on featured project.
- [ ] Beam is monochrome.
- [ ] Project links are clear.

## Experience

- [ ] Custom Scroll Timeline.
- [ ] Progress line follows scroll.
- [ ] Active markers are clear.
- [ ] Clean vertical composition.
- [ ] No zig-zag card layout.
- [ ] Static fallback works.

## Contact

- [ ] Particles background used.
- [ ] Particles are subtle and monochrome.
- [ ] Form card uses Border Beam.
- [ ] Beam is monochrome.
- [ ] Labels remain visible.
- [ ] Loading/success/error states are clear.

## Footer

- [ ] Minimal.
- [ ] Social links accessible.
- [ ] No unnecessary decoration.

---

# 54. Final Design Direction

The final visual language is:

```text
Monochrome
+
Large Editorial Typography
+
Generous Whitespace
+
Thin Borders
+
Selective Magic UI Motion
+
Custom Interactive Skills
+
Custom Scroll Timeline
+
Minimal Shadows
+
Strong Responsive Behavior
```

Core rule:

> **If an effect does not improve hierarchy, interaction, or storytelling, remove it.**

The portfolio should feel intentionally designed as one system—not as a collection of animated components.
