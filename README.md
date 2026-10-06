# RadarHelp — RTO Radar help centre (prototype)

A working prototype of the RadarHelp help centre, built from the information
architecture and the "Radar Sweep" design concept. It's plain HTML, CSS and
JavaScript, with no build step and no dependencies, so it can move into
RTO Radar's real stack later without untangling a framework.

## Run it in VS Code

1. **File › Open Folder…** and choose `Desktop\radarhelp`.
2. Install the recommended extension when VS Code asks (**Live Server**), or
   find it in the Extensions panel.
3. Right-click `index.html` › **Open with Live Server**. The site opens at
   `http://127.0.0.1:5500` and reloads every time you save a file.

No extension? Double-click `index.html` to open it straight in your browser.
Everything works from the file too, including search and saved progress.

## What's in it

| Page | File | What it shows |
|---|---|---|
| Help home | `index.html` | Search, Start here, the four ways into help, workflows, FAQs, What's New |
| Help Guides hub | `guides.html` | The six categories from the sketch |
| Workflows | `workflows.html`, `workflow.html?id=…` | All 13 "I'd like to…" journeys; steps can be ticked off |
| Features | `features.html`, `feature.html?m=…` | Module hubs with "Feeds into" / "Fed by" links |
| Guide | `article.html?id=…` | Any guide; add `&wf=…` to show the workflow step banner |
| Roles | `roles.html?r=admin` | "I'm a…" switcher (admin, auditor, trainer, coord) |
| Search | `search.html?q=…` | Searches guides, workflows and modules |
| Other | `page.html?p=…` | Webinars, Video Library, Ideas Forum, What's New, Submit a request, Contact |

## How the content works

Everything is driven by **`assets/js/content.js`**:

- `LIST` — one line per guide: module, id, type, title, roles, minutes.
- `BODIES` — the written guides. Eight are written; the rest show a
  "being written" panel but keep all their links.
- `LINKS` — how data moves between modules. This generates
  "Where this shows up", "Feeds into" and "Fed by".
- `WORKFLOWS` — each step points at a guide id. "Part of these workflows"
  and the step banner are generated from this.
- Each module's `cfg` list generates "Configured in".

**To add a guide:** add a line to `LIST` (and optionally a body in `BODIES`).
It appears in its module hub, in search, and in any workflow that points at
its id.

`assets/js/app.js` draws the shared header and footer and renders each page.
`assets/css/radarhelp.css` holds the brand tokens (`--rto-navy`, etc.) at the top.

## Placeholders to fill

- Webinar dates and topics, release notes, video links and "Updated" dates are
  shown in `[BRACKETS]`.
- The **Submit a request**, **Contact us** and **Newsletter** forms aren't
  connected to anything yet; they say so when submitted.
- Workflow progress and Getting Started completion are saved in the visitor's
  browser only.

## Connecting "Was this guide helpful?"

The Getting Started page ends with a "Was this guide helpful?" vote that shows
"X out of Y found this helpful". Counting votes across people needs the
platform, so the page calls an adapter if one is defined before `app.js` loads:

```js
window.RH_FEEDBACK = {
  // Totals for a guide, plus the signed-in user's own vote ('yes' | 'no' | null)
  get(guideId)          { return fetch(...).then(r => r.json()); }, // -> { yes, total, mine }
  // Record the signed-in user's vote, replacing any earlier one; return the new totals
  vote(guideId, choice) { return fetch(...).then(r => r.json()); }  // -> { yes, total, mine }
};
```

The platform should store one vote per user per guide, so changing a vote
moves it rather than adding another. Without the adapter (as in this
prototype), votes are kept in the visitor's browser only.
