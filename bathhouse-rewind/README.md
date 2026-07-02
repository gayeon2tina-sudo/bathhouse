# Bathhouse Rewind

An interactive journey through five bathhouse traditions across the world —
Korea, Japan, Türkiye, Finland, and Russia — built as a companion piece to
research on intangible cultural heritage, embodied ritual, and leadership.

Structurally inspired by Google Arts & Culture's *Route 66 Rewind* (dashboard →
map → stop-by-stop journey, with a REWIND mechanic), but reworked around a
bathhouse threshold instead of a car, and a "wipe the steam off the glass"
interaction instead of a Street View photo.

**This is a static site. No build step, no dependencies, no npm install.**
Open `index.html` in a browser, or serve the folder with any static server.

```
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## File structure

```
bathhouse-rewind/
├── index.html      — all four screens (landing, threshold, map, detail)
├── styles.css       — full token system (see "Design tokens" below)
├── app.js           — state machine, map rendering, steam-wipe canvas
├── data.js          — ALL content lives here. Add a stop, nothing else changes.
└── README.md        — this file
```

## Design tokens

| Token | Value | Use |
|---|---|---|
| `--steam-shadow` | `#1B2420` | background |
| `--parchment` | `#E8E1D3` | primary text |
| `--tile-teal` / `--tile-teal-bright` | `#4C7A6D` / `#6FA394` | primary accent, "protected heritage" |
| `--copper` / `--copper-bright` | `#B5652B` / `#D07C3F` | secondary accent, "unprotected heritage", rewind toggle |
| `--mist` | `#AEC3C2` | steam-canvas hint text |

Type: **Fraunces** (display/headings), **Work Sans** (body), **IBM Plex Mono**
(labels, coordinates, eyebrows). All loaded from Google Fonts in `index.html`.

## The five screens

0. **Welcome** — a handwritten-style personal note (Caveat font, paper card).
   **This is the one screen with placeholder text you must replace yourself** —
   see "Adding your welcome note" below. Nothing else in the project should be
   this personal; everywhere else, the eight bathhouse stories are researched
   third-person narrative, not a stand-in for your own voice.
1. **Landing** — title, one-line premise, "Step through the door."
2. **Threshold** — a short pause screen (mirrors every tradition's actual
   undressing/crossing ritual) before the map.
3. **Map** — a *schematic*, not literal, map. Markers are placed using real
   lat/lon coordinates projected onto a simplified plane (see `MAP_BOUNDS` and
   `project()` in `app.js`) — relative geography holds, but there are no
   coastlines. This was a deliberate choice to avoid inaccurate cartography
   without a full geo library; see "Optional upgrades" below if you want real
   coastlines.
4. **Detail** — the core screen. A canvas is painted with a fogged "mist"
   texture; moving the pointer erases a soft circle (`destination-out`
   compositing) to reveal the text underneath. A PAST / PRESENT toggle
   (the "rewind" mechanic) swaps the body text between historical origin and
   contemporary practice, sourced from `data.js`.

## Adding your welcome note

Open `index.html` and find the `<section id="screen-welcome">` block near the
top. Replace the paragraph inside `.welcome__note` with your own reflection —
why public bathhouses matter to you, how your poem connects to this project,
what you hope a visitor takes from it. Then delete the
`.welcome__placeholder-flag` paragraph entirely; it exists only so the
placeholder can't accidentally ship. Keep it short — a few sentences read far
better in a handwritten font than a full essay does.

## Currently included traditions

Korea (Seoul), Japan (Tokyo), Türkiye (Istanbul), Finland (Helsinki), Russia
(Moscow), Morocco (Marrakech), Iceland (Reykjavik), Hungary (Budapest) — eight
stops, each with a `past`, `present`, `story` (narrative vignette), `touch`
(pull-quote), and heritage-protection note. All were researched from general
reference sources; see "Sourcing" below before treating any of it as citable
in academic work.

## Adding photos

The `image` and `imageCredit` fields in `data.js` are wired up and ready —
set `image: "images/korea.jpg"` and it appears automatically, with the credit
line rendered underneath.

**Do not add copyrighted photographs without checking the license first.**
Good sources for properly licensed images:

- **Wikimedia Commons** (commons.wikimedia.org) — search each bathhouse type;
  most images are CC BY-SA or public domain, but the license and required
  attribution differ per image. Copy the exact attribution text into
  `imageCredit`.
- **Unsplash / Pexels** — free-to-use, no attribution legally required, but
  crediting the photographer in `imageCredit` is still good practice.
- **Your own photographs**, if you have any from visiting these places —
  the strongest option, and the only one with zero licensing ambiguity.

Avoid pulling images directly from tourism blogs, spa marketing sites, or
Instagram/TikTok — these are almost always copyrighted and not licensed for
reuse, even for a coursework project.

## Adding a new bathhouse tradition

Everything renders from the `STOPS` array in `data.js`. To add one:

1. Add a new object to `STOPS` with the same shape as the existing five
   (see the JSDoc comment at the top of `data.js` for field descriptions).
2. Make sure `coords.lat` / `coords.lon` fall roughly within `MAP_BOUNDS`
   (currently lon -10→150, lat 25→65 — covers Iceland through Japan). If you
   add a stop outside that range (e.g. Morocco, Mexico, or a Southern
   Hemisphere location), widen `MAP_BOUNDS` in `data.js` accordingly.
3. Nothing else needs to change. The map marker, detail screen, rewind
   toggle, and heritage badge all read from the object automatically.

Good candidates to research next: Morocco (hammam), Iceland (heitir pottar /
hot pots), Hungary (Ottoman-era thermal baths in Budapest), Mexico (temazcal —
note this is a sweat lodge with Indigenous ceremonial significance; research
carefully and consider whether/how to represent it respectfully, ideally with
a source from within the tradition rather than a tourism blog).

## Adding audio narration

`data.js` has an `audio` field on every stop, currently `null`. The player UI
and `<audio>` wiring in `app.js` are already built and waiting — set
`audio: "audio/korea.mp3"` (or similar) and the play button activates
automatically.

Two ways to get narration:

- **Field recordings** — ambient sound (water, steam, scrubbing) is more
  faithful to the "intangible heritage" argument than a narrated voiceover,
  and avoids putting words in the mouth of a culture you're documenting.
- **Text-to-speech of the `past`/`present` copy** — faster, but flag clearly
  in the UI that narration is synthetic (Route 66 Rewind does this with its
  "Text, audio and video are generated by AI" disclaimer — worth keeping that
  norm here if you go this route).

## Known limitations / optional upgrades

- **Map is schematic, not geographic.** For real coastlines, swap the SVG
  `<g id="markers">` approach for `d3-geo` + `topojson-client`, loading
  `https://unpkg.com/world-atlas@2/countries-110m.json`. This is a bigger
  lift (external data fetch, projection math) but would make the map load-
  bearing on its own rather than schematic.
- **No persistence.** Nothing is saved between sessions. If you want visitors
  to leave their own reflections (as discussed for the earlier "ritual
  composer" prototype), that needs a backend or a hosted key-value store —
  and if submissions are shared publicly, visitors need to be told that
  clearly before they type anything.
- **Accessibility pass done, not exhaustive.** Keyboard focus states, `aria-
  label`s, and `prefers-reduced-motion` are handled. Screen-reader testing on
  the steam-wipe canvas specifically (a purely visual interaction) hasn't
  been done — consider adding a "reveal all" button as a non-visual
  alternative path to the same content.
- **Sourcing.** Historical claims in `data.js` are drawn from general
  reference sources gathered during research, not primary ethnographic
  fieldwork. If this becomes a public-facing piece (rather than a personal
  portfolio/coursework companion), each `past`/`present` field should carry
  a proper citation.

## Suggested first prompts for Claude Code

- "Source and add properly licensed Wikimedia Commons images for each of the
  eight stops in data.js, with correct imageCredit attribution for each."
- "Add [culture] as a new stop, researching from primary/academic sources
  where possible rather than tourism blogs."
- "Replace the schematic map with a real d3-geo world map using the
  world-atlas topojson data."
- "Add a 'reveal all' accessible alternative to the steam-wipe canvas for
  keyboard and screen-reader users."
- "Set up a minimal Node/Express backend so reflections can be stored and
  shown anonymously and in aggregate, not as individual attributed quotes."
