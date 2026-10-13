# 🌱 Sustainability: what keeps this portal running

> The full, current version, covering this portal and the AstroLog together, is a page:
> **[theholyearthfoundation.github.io/changelog-astro-public/sustainability](https://theholyearthfoundation.github.io/changelog-astro-public/sustainability)**.
> This file lists what applies to **this repository**, so it's here even when you're reading the code.

Nothing here costs money. What it takes is a few things that quietly expire or drift, written down
so none of it depends on anyone's memory.

## What this repository is

`theholyearthfoundation.github.io` is the entry portal (`/`, `/donate/`, `/map/`, the 404, and the
`/plants-and-miracles/` short link that forwards to Kenney's Teachings) and the home of the **arrival
kit** every Holy Earth Foundation page loads: `arrival/arrival.js` + `arrival/arrival.css` (the kit),
`arrival/org.js` + `arrival/org.css` (the foundation's own settings and look), plus `starfield.js`
(the fireflies and the twin vine) and `thef.css`. The AstroLog loads those files from here by full URL.

## What needs looking after

| What | Why it matters | What to do |
| --- | --- | --- |
| **The hourly README mirror** (`.github/workflows/mirror-profile-readme.yml`) | Copies the organization profile (`theholyearthfoundation/.github` → `profile/README.md`) into this repo's `README.md` every hour. In a public repository, GitHub switches off scheduled workflows after 60 days without activity. | If the README stops following the profile, open **Actions → Mirror org profile README** and re-enable or run it. Edit the profile, never this `README.md`. |
| **The arrival kit is vendored** | `arrival.js` and `arrival.css` are copies. The canonical copy lives in `drasticstatic/my-template` (`changelog-template/arrival/`), and every org keeps its own copy so one org's change can't break another's. | To upgrade, copy both files from the template unchanged, read the porting notes in its README, and push this repo **before** the AstroLog. |
| **Deploy order** | The AstroLog loads the kit from this site. A new `org.js` key the AstroLog relies on must be live here first. | Push here, wait a minute for Pages, then push the AstroLog. |
| **Share images** (`social-card.jpg`, and the cards the AstroLog builds for `/donate/` and `/map/`) | WhatsApp, iMessage, Telegram, Slack and LinkedIn keep their own copy of a link's preview for days or weeks. Cards never carry counts, so a cached one doesn't go stale on its own. | After changing a share image, refresh the cached previews: see [`SOCIAL-PREVIEWS.md`](https://github.com/theholyearthfoundation/.github/blob/main/SOCIAL-PREVIEWS.md). `social-card.jpg` is a copy of the AstroLog's `og/page/portal.jpg`. |
| **The old Teachings addresses** (`/plants-and-miracles/`) | Kenney shares this short link; it forwards to the Teachings hub and carries the flyer's own card. | Keep the folder, its `plants-and-miracles-card.jpg` and the flyer PDF where they are. |
| **The contribution ledger** (`donate/contributors.json`) | It names people. | Add someone only after they've said yes. First name and last initial; never an email or an amount. |
| **The giving links** | `/donate/` links to David A's Support David page on his own site, whose ways to give still say "coming soon" there. The foundation's own way to give is a placeholder. | When either changes, update `donate.give` in `arrival/org.js`, and the disclaimer once the foundation writes its own words about gifts. |
| **Wallet giving, later** | The crypto slot on `/donate/` is empty on purpose. A wallet-connect module (Reown AppKit, with Web3Auth for email sign-in) will fill it. | Its projects' domain allowlists must include `https://theholyearthfoundation.github.io`, with a real client ID (never a demo one), or the button won't load here. |
| **Links that leave GitHub** | The nav, the contact and community windows and the map point at iamoneself.com, retreats.iamoneself.com and David's site. | If one of those addresses changes, update `arrival/org.js` (one place) and the AstroLog's map. |

*Maintained by Christopher W with Alfred (Claude Code). Last reviewed 2026-10-13.*
