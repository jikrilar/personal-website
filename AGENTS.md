# AGENTS.md

## Personal Portfolio Website — Agent Instructions

**Status:** Active  
**Purpose:** Operating rules for coding agents working on this project  
**Primary Agent Environment:** OpenCode  
**Source of Truth Documents:**

```text
prd.md
architecture.md
design-system.md
task.md
```

This file defines **how an agent must work** on the project.

It does not replace the project documentation.

---

# 1. Core Rule

Before modifying the project, read the relevant project documentation.

Priority order:

```text
1. prd.md
2. architecture.md
3. design-system.md
4. task.md
5. AGENTS.md
6. existing implementation
```

If an implementation conflicts with the documentation, the documentation wins unless the user explicitly changes the requirement.

Do not silently reinterpret product decisions.

---

# 2. Project Summary

This project is a personal portfolio website built with:

```text
Astro
TypeScript
Tailwind CSS
React Islands
Magic UI
```

Development tooling:

```text
OpenCode
Magic UI MCP Server
```

Architecture direction:

```text
Astro static-first
+
minimal client-side JavaScript
+
selective React hydration
+
typed local content
+
custom Skills and Experience sections
```

Visual direction:

```text
Monochrome
Clean
Editorial
Interactive
Motion-driven
Minimal shadows
Generous whitespace
```

---

# 3. Final Page Structure

The page structure is fixed as follows:

```text
0. Intro / Loading
1. Navbar
2. Hero
3. About
4. Skills
5. Projects
6. Experience
7. Send Message / Contact
8. Footer
```

Approved implementation:

```text
Intro
→ Magic UI Morphing Text

Navbar
→ custom Astro implementation
→ borderless

Hero
→ Magic UI Video Text

About
→ Magic UI Typing Animation
→ Magic UI Pixel Image

Skills
→ custom Interactive Tech Stack Grid

Projects
→ Magic UI Bento Grid
→ Border Beam on featured project only

Experience
→ custom Scroll Timeline

Contact
→ Magic UI Particles
→ contact form card
→ Magic UI Border Beam

Footer
→ custom minimal Astro implementation
```

Do not replace these choices without explicit user instruction.

---

# 4. Development Workflow

Development must be task-oriented.

Preferred workflow:

```text
read task
    ↓
read relevant docs
    ↓
inspect existing implementation
    ↓
implement only task scope
    ↓
validate
    ↓
build
    ↓
report changes
```

Do not attempt to finish unrelated sections in the same task.

---

# 5. Task Scope Rule

When the user asks:

```text
Kerjakan task Hero Section.
```

The agent must:

1. locate the matching task in `task.md`;
2. read its scope and acceptance criteria;
3. read relevant requirements in:
   - `prd.md`
   - `architecture.md`
   - `design-system.md`;
4. inspect existing Hero implementation;
5. modify only files required for the Hero task;
6. validate the Hero task;
7. report completion.

Do not redesign or rewrite other sections unless a required shared dependency must change.

If a shared file must change, keep the modification minimal.

---

# 6. Task Aliases

Interpret these prompts as follows:

```text
task foundation
→ TASK 00

task loading
task intro
→ TASK 01

task navbar
→ TASK 02

task hero
task hero section
→ TASK 03

task about
task about section
→ TASK 04

task skills
task skills section
→ TASK 05

task projects
task projects section
→ TASK 06

task experience
task experience section
→ TASK 07

task contact
task send message
task contact section
→ TASK 08

task footer
→ TASK 09

task SEO
→ TASK 10

task performance
→ TASK 11

task accessibility
→ TASK 12

task responsive QA
→ TASK 13

task visual polish
→ TASK 14

task deployment readiness
→ TASK 15
```

---

# 7. Astro-First Rule

Astro is the application shell.

Default implementation should use:

```text
.astro
HTML
CSS / Tailwind
```

Do not use React automatically.

Before using React, ask internally:

```text
Can this work with Astro + CSS?
```

If yes:

```text
use Astro
```

If no:

```text
use a React Island
```

---

# 8. React Island Rule

React is allowed only when a component requires:

- runtime state;
- browser APIs;
- scroll tracking;
- animation state;
- canvas rendering;
- complex client interaction.

Examples where React may be appropriate:

```text
Morphing Text
Typing Animation
Pixel Image
Scroll Timeline
Particles
Contact Form state
```

Do not create a global React application root.

Do not convert the website into an SPA.

---

# 9. Hydration Rule

Use the lightest Astro hydration strategy possible.

Preferred priority:

```text
no hydration
    ↓
client:visible
    ↓
client:idle
    ↓
client:load
```

Use `client:load` only for content that must be interactive immediately.

Avoid:

```text
client:only
```

unless the component cannot render server-side.

Do not hydrate static content.

---

# 10. Static Content Rule

Portfolio content must be local and typed.

Use:

```text
src/data/
```

for:

```text
navigation.ts
skills.ts
projects.ts
experience.ts
social-links.ts
```

Do not fetch static portfolio content from the client.

Do not introduce a CMS or database unless explicitly requested.

---

# 11. Magic UI Rules

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

Magic UI should not be used outside this list without explicit user approval.

---

# 12. Magic UI MCP Rules

Magic UI MCP is a **development-time tool only**.

Use it only when:

- retrieving an approved Magic UI component;
- inspecting an approved component;
- integrating an approved component;
- fixing an approved Magic UI component;
- adapting approved component styling to this project.

Do not use Magic UI MCP for:

- general coding tasks;
- debugging unrelated code;
- custom Skills implementation;
- custom Experience implementation;
- arbitrary component discovery;
- replacing existing custom components.

The MCP server must not become a runtime dependency.

---

# 13. Custom Component Protection

The following components must remain custom:

```text
Interactive Tech Stack Grid
Scroll Timeline
```

Do not replace them with:

```text
Aceternity UI
React Bits
21st.dev components
Magic UI alternatives
other third-party timeline/skills components
```

unless explicitly requested.

---

# 14. Skills Rules

Skills implementation:

```text
Custom Interactive Tech Stack Grid
```

Visual direction:

```text
clean
editorial
thin separators
no heavy cards
monochrome
subtle interaction
```

Allowed interaction:

```text
hover emphasis
focus emphasis
underline animation
small icon movement
slight opacity reduction on surrounding items
subtle reveal
```

Do not add:

```text
physics simulation
orbiting icons
logo marquee
infinite carousel
glowing cards
```

Mobile must not depend on hover.

---

# 15. Experience Rules

Experience implementation:

```text
Custom Scroll Timeline
```

Required behavior:

```text
vertical rail
scroll progress fill
active marker
subtle content reveal
static fallback
```

Visual direction:

```text
minimal
clean
monochrome
no large cards
```

Do not implement:

```text
zig-zag timeline
glowing timeline
alternating cards
third-party timeline component
```

---

# 16. Intro Rules

Intro uses:

```text
Magic UI Morphing Text
```

Greeting order:

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

Target duration:

```text
approximately 3 seconds
```

Important:

```text
Intro is a visual overlay.
Intro is NOT a real resource loader.
```

The page may render behind it.

Ensure:

- scroll lock during intro;
- scroll restoration after intro;
- cleanup safety;
- reduced-motion fallback.

---

# 17. Navbar Rules

Navbar must remain:

```text
borderless
minimal
monochrome
```

Do not introduce:

- heavy pills;
- colorful active states;
- large card container;
- decorative border.

Use semantic `<nav>`.

---

# 18. Hero Rules

Hero primary component:

```text
Magic UI Video Text
```

Primary content:

```text
full personal name
```

The full name must remain the dominant visual element.

Do not add competing strong effects such as:

```text
Aurora
Particles
Animated Grid
Gradient Mesh
Large Glow
```

Hero height target:

```text
80–100vh
```

Video must have a readable fallback.

---

# 19. About Rules

Desktop layout:

```text
summary | photo
```

Mobile:

```text
summary
photo
```

Components:

```text
summary → Typing Animation
photo   → Pixel Image
```

The text must still be readable when animation is disabled.

The photo must remain understandable when Pixel Image animation is disabled.

---

# 20. Projects Rules

Projects use:

```text
Magic UI Bento Grid
```

Featured project:

```text
featured: true
```

Do not determine featured project using array position.

Bad:

```ts
projects[0]
```

Preferred:

```ts
projects.find((project) => project.featured)
```

Border Beam:

```text
featured project only
```

Do not add Border Beam to every project.

---

# 21. Contact Rules

Contact background:

```text
Magic UI Particles
```

Form card:

```text
Magic UI Border Beam
```

Particles must be:

```text
monochrome
low density
low opacity
slow
```

Border Beam must be monochrome.

Do not use Shine Border.

Do not use colorful particle defaults.

---

# 22. Shine Border Rule

Shine Border is intentionally excluded.

Reason:

```text
default effect is too colorful for this design direction
```

Do not reintroduce Shine Border unless the user explicitly changes the design requirement.

---

# 23. Color Rules

Primary palette:

```text
black
white
neutral gray
```

Do not add decorative:

```text
blue
purple
pink
green
orange
rainbow gradient
neon glow
```

Semantic status colors may be used minimally if needed for:

```text
success
error
validation
```

but not as decorative theme colors.

---

# 24. Dark Mode Rule

If dark mode is implemented:

- preserve the same design system;
- invert monochrome hierarchy appropriately;
- do not introduce new colors;
- Border Beam remains monochrome;
- Particles remain monochrome.

Dark mode is not a separate visual identity.

---

# 25. Shadow Rule

Default:

```text
no shadow
```

If depth is needed:

```text
very subtle neutral shadow only
```

Do not create:

```text
colored shadow
hard black cartoon shadow
strong elevated SaaS cards
```

---

# 26. Border Rule

Default:

```text
1px neutral border
```

Use stronger border only for:

- focus;
- active interaction;
- visual hierarchy.

Navbar remains borderless.

---

# 27. Typography Rule

Primary font direction:

```text
Geist
```

Fallback option:

```text
Inter
```

Optional:

```text
Geist Mono
```

Use typography to create hierarchy rather than color.

Avoid excessive use of ultra-bold weights.

---

# 28. Motion Rule

Motion must have a purpose.

Allowed:

- content introduction;
- progress indication;
- interaction feedback;
- visual storytelling.

Avoid:

- animation on every element;
- multiple strong effects in one section;
- long decorative animation with no purpose.

Motion rhythm:

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

---

# 29. Reduced Motion Rule

All meaningful motion must respect:

```text
prefers-reduced-motion: reduce
```

Expected fallback:

```text
Morphing Text      → simple fade
Typing Animation   → immediate text
Pixel Image        → static image
Skills reveal      → static
Border Beam        → static border
Scroll Timeline    → static timeline
Particles          → disabled
Smooth scroll      → disabled
```

Content must never depend on animation.

---

# 30. Accessibility Rules

All work must preserve:

- semantic HTML;
- keyboard navigation;
- visible focus;
- logical heading order;
- meaningful alt text;
- proper form labels;
- readable contrast;
- reduced motion;
- adequate touch targets.

Decorative effects should use:

```text
aria-hidden="true"
```

when appropriate.

Do not remove focus outlines without a visible replacement.

---

# 31. Contact Form Architecture

Contact UI must remain provider-agnostic.

Preferred architecture:

```text
ContactForm
    ↓
submitContactMessage()
    ↓
API endpoint / adapter
    ↓
email provider
```

Do not hardcode provider SDK calls directly into UI components.

Secrets must remain server-side.

Never expose API keys to the browser.

---

# 32. Contact Form Security

Implement server-side validation.

Consider:

- required fields;
- email validation;
- payload length limits;
- basic normalization;
- honeypot if needed;
- rate limiting if supported.

Do not add heavy CAPTCHA unless there is a real spam problem.

---

# 33. Asset Rules

Profile and project images:

- optimize;
- provide dimensions;
- provide alt text;
- use responsive sizing.

Hero video:

- short;
- compressed;
- muted;
- looping;
- `playsinline`;
- fallback available.

Do not use oversized media files without justification.

---

# 34. Performance Rules

Do not sacrifice Astro performance benefits.

Avoid:

```text
global hydration
unnecessary React
client-side content fetching
duplicate animation libraries
oversized hero video
high particle count
unused dependencies
```

Prefer:

```text
static HTML
lazy loading
client:visible
optimized images
small runtime islands
```

---

# 35. Dependency Rules

Before adding a dependency, verify:

```text
Is it required?
Is the capability already available?
Can this be done with Astro/CSS?
Does it duplicate an existing library?
```

Do not add a new UI library to solve one small visual problem.

Do not install:

```text
Aceternity UI
React Bits
21st.dev component packages
additional animation framework
```

unless explicitly approved.

---

# 36. Code Quality Rules

Use:

- TypeScript;
- explicit meaningful types;
- clear naming;
- small focused components;
- reusable data structures;
- simple abstractions.

Avoid:

- premature abstraction;
- huge components;
- duplicated constants;
- inline magic values across many files;
- dead code;
- unused imports.

---

# 37. Folder Ownership

Follow this general structure:

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

Use the existing structure if already established.

Do not reorganize the entire project during a section task unless the current structure blocks the task.

---

# 38. File Naming

Prefer:

```text
PascalCase.astro
PascalCase.tsx
kebab-case utility files only when appropriate
```

Examples:

```text
Hero.astro
InteractiveTechStackGrid.astro
ScrollTimeline.tsx
ContactForm.tsx
```

Data:

```text
skills.ts
projects.ts
experience.ts
```

---

# 39. Validation After Every Task

After implementing a task, run the available project validation commands.

At minimum:

```text
type check
production build
```

Also run lint/tests if configured.

Do not claim completion if the project fails to build because of the changes made.

---

# 40. Browser Testing Rule

Do not automatically launch Playwright or browser automation for every prompt.

Browser automation is only justified when the current task requires:

- visual verification;
- responsive QA;
- interaction validation;
- browser-only bug reproduction;
- explicit user request.

Do not use Playwright as a default post-task ritual.

If normal build/type validation is sufficient, stop there.

---

# 41. Avoid Unnecessary Tool Invocation

Do not automatically invoke:

- Magic UI MCP;
- Playwright;
- external search;
- unrelated MCP servers;

for every prompt.

Use tools only when required by the specific task.

This prevents:

- unnecessary context usage;
- slower execution;
- irrelevant tool output;
- agent drift.

---

# 42. OpenCode Context Discipline

Keep each task narrow.

Do not load or reason about unrelated files unless necessary.

When the user asks for one section:

```text
inspect that section
+
shared dependencies
+
relevant documentation
```

Do not refactor the entire repository.

This project intentionally uses per-section tasks to reduce context-window pressure.

---

# 43. Do Not Overwrite User Content

If real portfolio content already exists:

- preserve it unless the task requires editing it;
- do not replace with generic placeholder copy;
- do not invent experience details;
- do not invent project links;
- do not invent social URLs.

Use placeholders only when unavoidable and clearly mark them.

---

# 44. No Silent Requirement Changes

If the implementation is difficult, do not silently choose a different design.

Examples of forbidden substitutions:

```text
Scroll Timeline
→ static cards because easier

Pixel Image
→ normal image because easier

Video Text
→ standard heading because easier

Bento Grid
→ generic grid because easier
```

Implement the documented requirement or clearly report the technical blocker.

---

# 45. Scope Protection Examples

## When working on Hero

Allowed:

- Hero files;
- Video Text component;
- Hero video asset;
- shared typography token if necessary.

Not allowed:

- redesign Skills;
- change Contact;
- replace Navbar;
- add global particles.

---

## When working on Skills

Allowed:

- skills data;
- Interactive Tech Stack Grid;
- section styling.

Not allowed:

- install a component library;
- modify Projects;
- replace Experience timeline.

---

## When working on Experience

Allowed:

- experience data;
- timeline component;
- scroll progress logic.

Not allowed:

- install Aceternity;
- add glowing effects;
- redesign Skills.

---

# 46. Final Report Format

After completing a task, report:

```text
Task completed:
- TASK XX — Name

Files created/modified:
- ...
- ...

Implemented:
- ...
- ...

Validation:
- Type check: pass/fail
- Production build: pass/fail
- Other relevant checks: pass/fail

Acceptance criteria:
- completed items
- remaining items, if any

Notes:
- only meaningful technical notes
```

Keep the report concise.

Do not dump large logs unless an error requires explanation.

---

# 47. If Validation Fails

If validation fails:

1. determine whether the error was introduced by the current task;
2. fix current-task errors;
3. do not expand into unrelated refactoring;
4. if the error predates the task, clearly identify it;
5. do not claim the task is fully complete if a blocking error remains.

---

# 48. Final Visual Checklist

Before considering UI work done, verify:

```text
monochrome
clean
no accidental gradients
no colorful component defaults
no excessive shadow
no excessive radius
consistent typography
consistent spacing
responsive
accessible
reduced motion supported
```

---

# 49. Final Architecture Checklist

Verify:

```text
Astro remains app shell
React only where needed
no global SPA conversion
typed local content
minimal hydration
custom Skills remains custom
custom Experience remains custom
Magic UI MCP is development-only
contact secrets remain server-side
```

---

# 50. Final Principle

The project should feel like:

```text
one intentionally designed portfolio
```

not:

```text
a collection of animated UI library demos
```

When uncertain, prefer:

```text
simpler
cleaner
more static
more semantic
less hydrated
less decorative
```

as long as the documented product requirement is still satisfied.


## Personal Content Source

The canonical personal information source is:

`content/CV.md`

When implementing personal content:

- Read `content/CV.md` first.
- Do not invent employment history.
- Do not invent education.
- Do not invent skills.
- Do not invent certifications.
- Do not invent project details.
- Do not invent dates.
- Do not invent social URLs.
- Do not modify factual personal information without user instruction.

Structured website data should live under:

`src/data/`

and must remain consistent with `content/CV.md`.

## Preview Server Rules

Do not run `npm run preview` or `astro preview` as part of normal
post-task validation.

Normal validation should use:

- TypeScript/type check
- `npm run build`
- lint/tests if configured

Only start the Astro preview server when browser-based or visual
verification is explicitly required.

If a preview server is started:
- do not wait indefinitely for the process to exit;
- treat a successful "server running" message as startup success;
- perform the required verification;
- stop the preview server after verification.

Do not leave preview/dev servers running after the task is complete.
