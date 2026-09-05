# Design discipline for this project

Before writing any page, component, or stylesheet, act like a design lead who gives every project a visual identity suited to what it actually is — not a template. Make deliberate, specific choices about color, typography, and layout, and justify them by the subject at hand rather than reaching for defaults.

## Before writing code: a short design plan

Sketch this in a few lines before touching CSS:
- **Color**: 4–6 named hex values, described by role (background, surface, primary accent, secondary accent, text, muted text) — not just "blue" and "gray."
- **Type**: at least two roles — a display face with real character used with restraint, and a complementary body face. Add a third utility face (for labels, data, code, timestamps) if the content calls for it.
- **Layout**: one or two sentences on the actual layout concept — not "a hero and some cards," but what makes this arrangement fit this content.

Then build from that plan, and don't drift from it component by component.

## Ground every choice in the actual subject

Before picking anything, name the one concrete subject, its audience, and the page's single job. Pull at least one real, specific detail from that subject's own world into the content — its real terms, units, categories, conventions — not as decoration but as actual content. Never use lorem ipsum or placeholder copy in anything meant to be reviewed or shipped; use the real content, or realistic content clearly sourced from what's actually being built.

## Avoid the current AI-generated-design defaults

Unless the user has explicitly asked for one of these, don't reach for: warm cream background with a serif display face and a terracotta accent; near-black with a single acid-green or vermilion pop color; a purple-to-blue gradient hero on white; Inter or Space Grotesk as the "safe" font; emoji as section markers; everything centered; `rounded-lg` on every single element; a colored accent bar on otherwise-identical rounded cards. These are recognizable as generated, not designed. Where the user has specified a direction, follow it exactly — their words win even if it's one of these looks. Where nothing is specified, spend that freedom on something specific to the project instead.

## Typography

Load real fonts properly — self-hosted or from a real font CDN, with genuine fallback stacks, never a system-font-only approach when the design plan calls for a display face. Keep body text near 65 characters per line. Set a real type scale and stay on it. Give headings `text-wrap: balance` where supported. Give uppercase labels a touch of letter-spacing. Pick a neutral gray with a slight hue bias toward the accent rather than a pure mid-gray — a chosen neutral reads as designed, a default one doesn't.

## Both themes, done properly (when the site supports system theme switching)

Structure colors as CSS custom properties from the start: a base `:root` block with the full light (or primary) palette, then explicit dark-mode overrides via `prefers-color-scheme` and/or a `data-theme` attribute — never a color hardcoded in only one place that silently breaks in the other mode. Every element takes its color from the same token set as the surface behind it. If the project deliberately commits to one single visual world regardless of system theme (a brand that's always dark, an arcade aesthetic, a single fixed identity) — that's a legitimate choice, but make it on purpose and say so, don't just forget the other mode.

## Layout and composition

Use flex/grid with `gap` for spacing between siblings, not ad hoc margins that collapse or double unpredictably. Wide content (tables, code blocks, data grids) scrolls inside its own container — the page itself never scrolls horizontally. Repeated elements (cards in a grid, rows in a list, badges across items) share the same edges, padding, and internal alignment from one to the next — treat them as one system, not one-off components that happen to look similar. Not everything needs to be a card: spend border/fill/shadow/radius by role, lifting only what actually needs separating, or the whole page reads as flat regardless of how much styling is on it.

## Motion, when used

Reach for it deliberately, not by default. One well-considered moment (a page-load sequence, a meaningful hover state, a transition that clarifies what changed) lands harder than motion scattered everywhere. Always respect `prefers-reduced-motion`. Never let content depend on an animation or observer to become visible — if the JS that triggers a reveal fails, is slow, or (for a client-rendered app) doesn't re-run after a client-side route change, the content must still show up. Build any scroll- or route-triggered animation with a visible-by-default fallback, not an opacity:0 starting state with no safety net.

## Copy

Write from the user's side of the screen: name things the way people recognize them, not the way the system models them internally. Buttons say exactly what they do ("Publish," not "Submit"); confirmations say what happened ("Published," not "Success"). Errors say what went wrong and how to fix it. Specific beats clever, always.

## Calibrate the effort to what's being built

A utilitarian page — an admin panel, an internal tool, a settings screen — deserves real typographic hierarchy and a considered palette, but not a dramatic hero or heavy motion; over-designing a tool makes it harder to use. A page meant to make a strong first impression — a landing page, a portfolio, a pitch deck as a webpage — is where it's worth taking one genuine aesthetic risk and committing to it fully rather than playing it safe. Read which one you're building before deciding how far to push.

## Before calling it done

Check the build for the boring-but-real stuff: every non-void tag closed, every attribute double-quoted, visible keyboard focus states on every interactive element, real semantic headings (not styled divs), alt text on every real image. Look at the actual rendered result — not just the code — before considering it finished.
