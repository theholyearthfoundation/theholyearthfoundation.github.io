# 🌱 Sustainability: what keeps this portal running

> The full, current version, covering this portal and the AstroLog together, is a page:
> **[theholyearthfoundation.github.io/changelog-astro-public/sustainability](https://theholyearthfoundation.github.io/changelog-astro-public/sustainability)**.
> This file lists what applies to **this repository**, so it's here even when you're reading the code.

Nothing here costs money. What it takes is a few things that quietly expire or drift, written down
so none of it depends on anyone's memory.

## What this repository is

`theholyearthfoundation.github.io` is the entry portal (`/`, `/donate/`, `/pledge/`, `/map/`, the 404, and the
`/plants-and-miracles/` short link that forwards to Kenney's Teachings) and the home of the **arrival
kit** (1.4.0) every Holy Earth Foundation page loads: `arrival/arrival.js` + `arrival/arrival.css`,
`arrival/give/give.js` and `arrival/pledge/pledge.js` (the kit),
`arrival/org.js` + `arrival/org.css` (the foundation's own settings and look), plus `starfield.js`
(the fireflies and the twin vine) and `thef.css`. The AstroLog loads those files from here by full URL.

## What needs looking after

| What | Why it matters | What to do |
| --- | --- | --- |
| **The hourly README mirror** (`.github/workflows/mirror-profile-readme.yml`) | Copies the organization profile (`theholyearthfoundation/.github` → `profile/README.md`) into this repo's `README.md` every hour. In a public repository, GitHub switches off scheduled workflows after 60 days without activity. | If the README stops following the profile, open **Actions → Mirror org profile README** and re-enable or run it. Edit the profile, never this `README.md`. |
| **The arrival kit is vendored** | `arrival.js`, `arrival.css`, `give/give.js` and `pledge/pledge.js` are copies. The canonical copy lives in `drasticstatic/my-template` (`changelog-template/arrival/`), and every org keeps its own copy so one org's change can't break another's. | To upgrade, copy all four from the template unchanged, read the porting notes in its README, and push this repo **before** the AstroLog. |
| **Deploy order** | The AstroLog loads the kit from this site. A new `org.js` key the AstroLog relies on must be live here first. | Push here, wait a minute for Pages, then push the AstroLog. |
| **Share images** (`social-card.jpg`, and the cards the AstroLog builds for `/donate/`, `/pledge/` and `/map/`) | WhatsApp, iMessage, Telegram, Slack and LinkedIn keep their own copy of a link's preview for days or weeks. Cards never carry counts, so a cached one doesn't go stale on its own. | After changing a share image, refresh the cached previews: see [`SOCIAL-PREVIEWS.md`](https://github.com/theholyearthfoundation/.github/blob/main/SOCIAL-PREVIEWS.md). `social-card.jpg` is a copy of the AstroLog's `og/page/portal.jpg` (the twin-vine card); the porch has the illustrated one. |
| **The old Teachings addresses** (`/plants-and-miracles/`) | Kenney shares this short link; it forwards to the Teachings hub and carries the flyer's own card. | Keep the folder, its `plants-and-miracles-card.jpg` and the flyer PDF where they are. |
| **The contribution ledger** (`donate/contributors.json`) | It names people. | Add someone only after they've said yes. First name and last initial; never an email or an amount. |
| **The giving links** | `/donate/` links to David A's Support David page on his own site, whose ways to give still say "coming soon" there. The foundation's own way to give is a placeholder. | When either changes, update `donate.give` in `arrival/org.js`, and the disclaimer once the foundation writes its own words about gifts. |
| **Wallet giving and the pledge** (`arrival/give/give.js`, `arrival/pledge/pledge.js`) | `/donate/` has the kit's wallet module: one Connect button (Reown AppKit) for browser wallets, phone wallets by QR code, and email or social sign-in. `/pledge/` uses the same connection to sign a pledge of support (a message: free, nothing sent, nothing recorded, no counts). Both work only on sites listed in the Reown project's allowlist. | Make sure the project in `give.reownProjectId` (`arrival/org.js`) lists **`https://theholyearthfoundation.github.io`** at dashboard.reown.com; until it does, both pages calmly say wallet connect isn't switched on for this site yet. `give.addresses` stays `null` until the foundation publishes a treasury address: never a placeholder. |
| **Wallet connect (Reown project)** | Every org's wallet features connect through **one shared Reown project today** (`00b6a1cd528ff580f1fd845ed08b0187`, made for the O-R-G dApp, held in Christopher W's Reown account). If it's deleted, suspended or runs past its free plan, wallet connect stops on every site at once (calmly; nothing breaks). | The foundation gets its own with a **one-line `org.js` change**: a free project at dashboard.reown.com under an account the foundation controls, this origin on its allowlist, and its ID in `give.reownProjectId` (the pledge uses it too). Before any treasury address is published. |
| **Links that leave GitHub** | The nav, the contact and community windows and the map point at iamoneself.com, retreats.iamoneself.com and David's site. | If one of those addresses changes, update `arrival/org.js` (one place) and the AstroLog's map. |

## 🤝 Stewardship and succession

Today drasticstatic (Christopher W) owns or administers the `theholyearthfoundation` GitHub
organization and holds the tokens that publish its pages and the Reown account above: a single
point of failure. The plan, so these pages outlive any one person: at least two owners from the
foundation's own people, publishing through org-owned automation instead of personal tokens, a token
register and renewal runbook, written hand-over steps, and scheduled exports and backups. I Am One
Self's and David A's sites are being moved into this organization, and Kenney will start working on
them himself, with Codex. The full plan is on the
[sustainability page](https://theholyearthfoundation.github.io/changelog-astro-public/sustainability#-stewardship-and-succession),
and progress on the [roadmap](https://theholyearthfoundation.github.io/changelog-astro-public/roadmap).

*Maintained by Christopher W with Alfred (Claude Code). Last reviewed 2026-10-22.*
