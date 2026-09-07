# AGENTS.md — Animated Slide Deck

## Mission

This repository is an interactive slide presentation served by Vite.

The goal is to build the deck incrementally, one slide at a time, with polished animations and precise visual control.

The user will add and refine slides progressively. Do not try to invent the whole presentation in advance.

## Core principles

1. Keep the codebase understandable and easy to edit.
2. Prefer the simplest tool that gives the required visual result.
3. Do not over-engineer.
4. You are free to use libraries, frameworks, animation engines, rendering tools, shaders, canvas, SVG, WebGL, or other techniques when they materially improve the result.
5. Any dependency or technique you introduce must be deliberate, justified by the requested slide, and used confidently.
6. Avoid adding tools only because they are fashionable, familiar, or potentially useful later.
7. Preserve existing slides and behavior when adding a new slide.
8. Each change should be visually testable in the browser.
9. Visual quality and maintainability matter more than ideological stack purity.

## Tech stack

Vite is the development server and build foundation.

Beyond that, choose the most appropriate frontend tools for the requested result.

You may use, among others:

- Vanilla HTML / CSS / JavaScript
- React, Vue, Svelte, or another frontend framework
- GSAP
- Motion / Framer Motion
- Three.js
- Canvas
- SVG
- WebGL
- CSS animations and transitions
- Web Animations API
- utility CSS or styling libraries

However:

- do not rewrite the existing project into another framework without a concrete need;
- do not introduce a large dependency for a trivial effect;
- do not mix multiple tools that solve the same problem unless there is a clear reason;
- when adding a dependency, keep its usage localized and understandable;
- prefer proven APIs and stable patterns;
- if a technique makes the slide harder to maintain than the visual benefit justifies, choose a simpler option.

The guiding rule is not “avoid dependencies”.

The guiding rule is: use the best tool for the requested visual result, but stay in control of the complexity.

## Presentation format

The presentation is a sequence of full-screen slides.

Reference design size:

- 1920 × 1080
- 16:9 aspect ratio

The deck must scale proportionally to fit the viewport while preserving the 16:9 composition.

Do not redesign slide layouts responsively like a normal website.

Instead:

- render a fixed 16:9 stage;
- scale the stage to fit the available browser viewport;
- keep all slide composition coordinates visually stable.

The page itself must not scroll during presentation mode.

## Recommended project structure

Keep the structure understandable and shallow.

Example:

```text
/
├── index.html
├── package.json
├── AGENTS.md
└── src/
    ├── main.js
    ├── styles.css
    ├── deck/
    │   ├── deck.js
    │   └── slides.js
    └── slides/
        ├── slide-01.js
        ├── slide-01.css
        ├── slide-02.js
        └── slide-02.css
```

This is a guideline, not a reason to create unnecessary files.

## Slide architecture

Each slide should be isolated enough that it can be edited without breaking unrelated slides.

A slide should have:

- a stable unique id;
- its own markup/render function;
- its own styles when styles are specific to that slide;
- an optional `enter()` lifecycle for animations;
- an optional `exit()` lifecycle for cleanup.

Avoid a generic component system unless repetition becomes real and obvious.

Do not create abstractions for hypothetical future slides.

## Slide registry

Maintain one simple ordered registry of slides.

Adding a slide should require approximately:

1. creating the slide file;
2. optionally creating its CSS;
3. adding one import / registry entry.

Do not require edits across many files.

## Navigation

The base deck must support:

- Arrow Right → next slide
- Arrow Left → previous slide
- Space → next slide
- Home → first slide
- End → last slide

Navigation must be bounded.

Do not loop from the last slide to the first unless explicitly requested.

Also expose simple programmatic methods such as:

- `next()`
- `prev()`
- `goTo(index)`

## URL state

Keep the current slide index reflected in the URL hash.

Example:

```text
#1
#2
#3
```

Reloading the page should restore the corresponding slide when possible.

Invalid hashes should safely fall back to the first slide.

## Animation rules

Animations are a first-class part of the presentation.

Use whichever technique best fits the requested effect: CSS, Web Animations API, GSAP, Motion, SVG, Canvas, WebGL, Three.js, shaders, or another suitable tool.

For every animated slide:

- animation starts when the slide becomes active;
- leaving and re-entering the slide must replay it cleanly;
- timers, observers, animation handles, timelines, RAF loops, WebGL resources, and event listeners must be cleaned up on exit when applicable;
- avoid animation state leaking between slides;
- keep animation code local to the slide whenever practical;
- preserve smooth playback at presentation scale.

Prefer GPU-friendly properties such as transform and opacity when appropriate, but do not limit the visual language to them.

Avoid unnecessary layout thrashing and uncontrolled perpetual loops.

Use `requestAnimationFrame` when continuous rendering is actually required.

Respect `prefers-reduced-motion` with a sensible fallback.

## Timing

Do not create automatic slide progression unless explicitly requested.

Animations may have internal sequencing, but the user controls when to change slides.

## Styling rules

Use CSS variables for presentation-wide tokens such as:

- background
- foreground
- accent
- font family
- spacing
- easing
- slide dimensions

Keep global styles minimal.

Slide-specific visual experiments should remain local to that slide whenever practical.

Do not introduce a design system unless requested.

## Typography

Do not fetch remote fonts by default.

Use a sensible local/system font stack unless the user provides or requests a specific font.

If a custom font is later added, load it locally when possible.

## Assets

Place local visual assets in a clear folder such as:

```text
public/assets/
```

Do not use random placeholder images from remote services.

If a requested asset is missing, create a clear placeholder block and tell the user what asset path is expected.

## Browser target

Target current desktop Chrome / Chromium first.

Keep the implementation standards-based enough to work in other modern browsers where practical.

Do not spend time on legacy browser compatibility.

## Accessibility minimum

Even though this is a visual presentation:

- decorative imagery should not pollute the accessibility tree;
- meaningful images should have alt text;
- keyboard navigation must remain usable;
- reduced-motion preferences must be respected.

Do not add complex accessibility infrastructure unless requested.

## Development experience

The project must run with:

```bash
npm install
npm run dev
```

The Vite dev server must be enough for local development.

Keep console errors at zero.

Avoid unnecessary warnings.

## What NOT to do

Do not add infrastructure that is unrelated to the requested presentation work.

Unless the user asks for it or the current feature genuinely requires it, avoid:

- a backend;
- a database;
- authentication;
- an admin interface;
- a slide editor;
- a CMS;
- automatic slide generation;
- export pipelines;
- presenter tooling;
- deployment infrastructure;
- Docker;
- autoplay;
- automatic progression.

Frontend libraries and visual tooling are allowed when they directly improve the implementation.

The restriction is on unnecessary product/infrastructure scope, not on creative or technical tools.

## Change discipline

When asked to implement a new slide:

1. inspect the existing deck structure;
2. preserve the current navigation and scaling system;
3. implement only the requested slide/change;
4. reuse existing primitives only when this genuinely simplifies the code;
5. keep unrelated files untouched;
6. ensure the slide is visually centered and fits the 16:9 canvas;
7. verify that entering the slide triggers the intended animation;
8. verify that leaving and returning resets the animation correctly.

## Visual fidelity

When the user provides a screenshot, mockup, image, or precise visual description:

- prioritize visual fidelity over generic best practices;
- match spacing, sizing, alignment, typography, layering, and timing carefully;
- do not “improve” the design unless asked;
- if a design detail is ambiguous, make the smallest reasonable assumption.

## Scope control

The user is building this presentation progressively.

Therefore:

- never generate extra slides unless asked;
- never replace the deck with a new architecture just because a later slide is more complex;
- refactor only when the current structure genuinely prevents the requested work;
- keep each iteration small enough to review visually.

## Definition of done for the base

The initial base is complete when it has:

- a Vite project that starts correctly;
- a fixed 1920×1080 presentation stage scaled to the viewport;
- one simple placeholder slide;
- previous / next navigation;
- keyboard controls;
- URL hash synchronization;
- slide enter / exit lifecycle;
- reduced-motion handling;
- clean, minimal CSS;
- no unnecessary dependencies.

After that, stop and wait for the user to request the next slide.
