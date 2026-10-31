/* The Holy Earth Foundation's arrival config, read by arrival.js (kit v1.5). Shared by every THEF page
   that loads the kit: the entry portal (/, /donate/, /pledge/, /map/, the 404) and, by full URL, the
   AstroLog.

   Every fact here comes from THEF's own public materials: this portal, the AstroLog, Kenney's Plants &
   Miracles flyer (as published in Teachings), iamoneself.com, retreats.iamoneself.com and David
   Amaringo's site. Anything the foundation hasn't published yet (a community space, a contacts page,
   a welcome from Kenney, wording about gifts) is marked as a placeholder or "coming soon" rather than
   guessed, and no link or address is ever made up. Kenney's WhatsApp, phone and Telegram show
   directly in the contact window (Christopher's decision, 2026-10-22; they're public on
   iamoneself.com). People are named by first name and last initial, except the founder, credited as
   "Isaiah (Kenney)" (THEF's choice). Strings shown in the guide and the modals may hold simple HTML. */
(function () {
  var ROOT = "https://theholyearthfoundation.github.io";
  var LOG = ROOT + "/changelog-astro-public";
  var TEACH = LOG + "/teachings";
  var READING = ROOT + "/reading-room-public/";
  var SITE = "https://www.iamoneself.com";
  var SPEAKER = SITE + "/about-the-speaker";
  var RETREATS = "https://retreats.iamoneself.com";
  // Kenney's own WhatsApp, phone and Telegram (public on iamoneself.com; shown directly since
  // 2026-10-22, Christopher's decision).
  var WHATSAPP = "https://wa.me/18569792316";
  var PHONE = "tel:+18569792316";
  var PHONE_SHOWN = "+1 856-979-2316";
  var TELEGRAM = "https://t.me/iamoneself";
  // David's site, at his own address since 2026-10-25 (served by the foundation). Its Contact page sends visitors
  // to Kenney's About the Speaker page; its Support David page is the one giving path that exists.
  var DAVID = "https://david.iamoneself.com";
  // I Am One Self's channels, as iamoneself.com links them (quiet, but public).
  var YOUTUBE = "https://www.youtube.com/channel/UCwxGrMD_vgdFGZKVQCPazQw";
  var X = "https://x.com/TheOneSelfIAM";
  // The vine's colors, alternating like its strands: sky (A Course in Miracles), gold (plant
  // medicine), leaf, and the glow where they meet. They color the guide's flower (one petal per
  // step) and ring the initials avatars.
  var VINE = ["#8ed1f2", "#e9b949", "#86c98f", "#5fb3e0", "#ffe3a1", "#48b5a8", "#d99a2b", "#a9d98a", "#c5e6f7"];

  // Initials avatar: a disc of canopy green inside a ring of the twin vine, sky and gold strands
  // braiding around it and meeting in one point of light at the top.
  function avatarSvg(ini) {
    var ring = function (sign) {
      var pts = [];
      for (var i = 0; i <= 96; i++) {
        var a = -Math.PI / 2 + (i / 96) * Math.PI * 2;
        var r = 43.5 + sign * 3.6 * Math.sin(6 * (a + Math.PI / 2));
        pts.push((50 + r * Math.cos(a)).toFixed(1) + "," + (50 + r * Math.sin(a)).toFixed(1));
      }
      return pts.join(" ");
    };
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs>' +
      '<radialGradient id="c" cx=".4" cy=".32" r=".9"><stop offset="0" stop-color="#1f4a3f"/><stop offset=".7" stop-color="#143029"/><stop offset="1" stop-color="#0f2420"/></radialGradient>' +
      '<radialGradient id="g"><stop offset="0" stop-color="#ffe3a1" stop-opacity=".95"/><stop offset="1" stop-color="#ffe3a1" stop-opacity="0"/></radialGradient></defs>' +
      '<circle cx="50" cy="50" r="50" fill="#0f2420"/><circle cx="50" cy="50" r="40" fill="url(#c)"/>' +
      '<polyline points="' + ring(1) + '" fill="none" stroke="#8ed1f2" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<polyline points="' + ring(-1) + '" fill="none" stroke="#e9b949" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<circle cx="50" cy="6.5" r="7" fill="url(#g)"/><circle cx="50" cy="6.5" r="2.2" fill="#ffe3a1"/>' +
      '<text x="50" y="53" dy=".35em" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-style="italic" font-size="' + (ini.length > 1 ? 32 : 40) +
      '" font-weight="600" fill="#eaf1e4">' + ini.replace(/[<&]/g, "") + "</text></svg>"
    );
  }

  window.ARRIVAL = {
    org: {
      short: "THEF",
      name: "The Holy Earth Foundation",
      motto: "I am one Self, united with my Creator.",
      about:
        "The Holy Earth Foundation is home to Plants &amp; Miracles, Kenney's teaching that brings A Course in Miracles together with plant medicine traditions, and to the sites built for its teachers: I Am One Self, with Kenney's retreats and spiritual coaching, and David Amaringo's site, for David A's Amazonian visionary art and Chaiconi Bari teaching.",
      mark: { src: ROOT + "/apple-touch-icon.png" }, // the foundation's mark (Kenney's), as iamoneself.com serves it
      home: {
        label: "iamoneself.com",
        href: SITE,
        text: "I Am One Self: Kenney's retreats and spiritual coaching, and where his flyer says to begin, with a free online course.",
      },
      welcomeNote: null,
      welcomePlaceholder:
        "A few words of welcome from Kenney belong here. This space is left empty on purpose until he writes them.",
    },

    // The kit keeps its choices under its own key; the light chosen before the kit ("thef-theme")
    // carries over on a first visit.
    storage: { key: "thef-arrival", legacy: { light: "thef-theme" } },

    modes: [
      { id: "dark", name: "Canopy", note: "The forest before dawn: deep canopy green, fireflies, and the vine's sky and gold strands.", swatch: ["#0f2420", "#e9b949"], dark: true },
      { id: "light", name: "Morning mist", note: "The same forest an hour later: cool mist over leaf green.", swatch: ["#edf5f1", "#0b6a96"], calm: true },
      {
        id: "sun",
        name: "Follow the sun",
        note: "Morning mist from sunrise, the canopy again after dusk.",
        shows: ["light", "dark"],
        // Mist brightening into gold, then down into the canopy.
        ink: "linear-gradient(90deg, #e2eee8 0%, #8ed1f2 26%, #ffe3a1 50%, #e9b949 66%, #143029 88%, #0f2420 100%)",
        follows: function (d) {
          var h = d.getHours();
          return h >= 6 && h < 19 ? "light" : "dark";
        },
      },
    ],
    defaultMode: "dark",

    // Reading mode: one tap for the calmest page (Morning mist, the forest still, more contrast, no
    // vine, shorter lines); another tap goes back to how the visitor had it. Text size steps (the
    // kit's four defaults) sit beside it (kit 1.2).
    reading: { light: "light" },

    // "What's new since your last visit": entries, write-ups and ledger changes newer than the
    // visitor's last visit, read from the AstroLog's latest.json.
    news: { sources: [LOG + "/latest.json"] },

    // Fireflies drift over every page. With cursor effects on, a twin vine grows behind the pointer:
    // a sky strand and a gold strand braiding together and meeting where the pointer is, leaves
    // opening along the way. Bloom thickens the vine and lets seeds drift down from it. The vine is
    // drawn by /starfield.js (THEF's own), so no kit trail is set here.
    motions: [
      { id: "still", name: "Still", icon: "pause", note: "The forest rests: the fireflies hold their light, and nothing follows your pointer." },
      { id: "gentle", name: "Breeze", icon: "leaf", note: "Fireflies drift, and a twin vine of sky and gold grows behind your pointer, leaves opening as it goes." },
      { id: "vivid", name: "Bloom", icon: "flower-lotus", note: "Brighter fireflies, a fuller vine, and seeds that drift down from it." },
    ],
    defaultMotion: "gentle",
    stillMotion: "still",

    wedges: VINE,

    // THEF hasn't published an org-domain role address, so Gravatar is never used: everyone shows a
    // GitHub picture or their initials in the vine ring.
    avatar: { shape: "circle", colors: VINE, roleDomains: [], svg: avatarSvg },

    // ── kit 1.2: the navbar, shared by the portal and the AstroLog ─────────────────────────────
    // Lower `priority` folds into "More" first when the bar runs short (Teachings never does: it's
    // the heart of the AstroLog); below 1100px it all folds into the Menu.
    nav: {
      label: "The Holy Earth Foundation",
      fold: 1100,
      items: [
        { id: "portal", label: "Portal", icon: "house-simple", href: ROOT + "/", hideOn: ["portal"], priority: 1, note: "The foundation's front door on GitHub" },
        { id: "porch", label: "Porch", icon: "door-open", href: LOG + "/", exact: true, priority: 1, note: "The AstroLog's front door" },
        { id: "teachings", label: "Teachings", icon: "flower-lotus", href: TEACH, priority: 3, keep: true, note: "Kenney's Plants & Miracles, page by page" },
        { id: "changelog", label: "Changelog", icon: "clock-counter-clockwise", href: LOG + "/changelog", priority: 3, note: "What's been built, newest first" },
        { id: "library", label: "Library", icon: "books", href: LOG + "/library", priority: 2, note: "How the sites are built, and why" },
        { id: "ledger", label: "Ledger", icon: "scroll", href: LOG + "/ledger", priority: 2, note: "Every public change, in plain words" },
        { id: "map", label: "Map", icon: "map-trifold", href: LOG + "/map", hrefs: { portal: ROOT + "/map/" }, priority: 2, note: "Every place, with a picture of each" },
        // The reading room's public lane: proposals, procedures (SOPs) and decks the foundation has
        // opened to visitors. It links on to the procedures' public twin and the decks in .github.
        { id: "reading", label: "Proposals, procedures & decks", icon: "book-open-text", href: READING, priority: 1, note: "The reading room: what the foundation is ready to show" },
        {
          id: "involved",
          label: "Get involved",
          icon: "hand-heart",
          priority: 3,
          items: [
            { id: "community", label: "Community", icon: "users-three", href: ROOT + "/#community", open: "community", note: "Coming soon, and a sneak peek" },
            { id: "contact", label: "Reach out", icon: "envelope-simple", href: SPEAKER, open: "contact", note: "Every way to reach Kenney and the team" },
            { id: "donate", label: "Donate", icon: "heart", href: ROOT + "/donate/", note: "Ways to give, and thanks by name" },
            { id: "pledge", label: "Pledge", icon: "handshake", href: ROOT + "/pledge/", note: "Sign a pledge of support: free, nothing sent" },
          ],
        },
        {
          id: "sites",
          label: "The sites",
          icon: "globe-hemisphere-west",
          priority: 2,
          items: [
            { id: "home", label: "I Am One Self", icon: "globe", href: SITE, note: "iamoneself.com: Kenney's teaching and coaching" },
            { id: "retreats", label: "I Am One Self Retreats", icon: "butterfly", href: RETREATS, note: "retreats.iamoneself.com: retreats and next steps" },
            { id: "david", label: "David Amaringo", icon: "palette", href: DAVID + "/", note: "David A's visionary art and Chaiconi Bari teaching" },
          ],
        },
        {
          id: "about",
          label: "About",
          icon: "info",
          priority: 1,
          items: [
            { id: "roadmap", label: "Roadmap", icon: "path", href: LOG + "/roadmap", note: "Where these pages are headed" },
            { id: "sustainability", label: "Sustainability", icon: "plant", href: LOG + "/sustainability", note: "What it takes to keep them running" },
            { id: "github", label: "GitHub", icon: "github-logo", href: "https://github.com/theholyearthfoundation", note: "The organization and its code" },
          ],
        },
      ],
    },
    footer: {
      label: "The Holy Earth Foundation, all the ways around",
      groups: [
        { label: "Explore", icon: "compass", items: ["portal", "porch", "teachings", "changelog", "library", "ledger", "map", "reading"] },
        { label: "Get involved", icon: "hand-heart", items: ["community", "contact", "donate", "pledge", { id: "guide", label: "Welcome guide", icon: "signpost", href: "#welcome", open: "guide" }] },
        { label: "The sites", icon: "globe-hemisphere-west", items: ["home", "retreats", "david"] },
        { label: "About this build", icon: "wrench", items: ["roadmap", "sustainability", "github", { id: "source", label: "AstroLog source", icon: "code", href: "https://github.com/theholyearthfoundation/changelog-astro-public" }] },
      ],
      note: 'Code here is MIT licensed and the words are CC BY-SA 4.0; Kenney\'s teaching stays his. The foundation\'s name and marks belong to the foundation. Headings set in PapyrusStd, Chris Costello / ITC (itcfonts.com).',
    },

    // ── kit 1.2: one modal for every way to reach Kenney and the team ──────────────────────────
    // Only paths the foundation's own sites publish. Kenney keeps in touch by WhatsApp. His WhatsApp,
    // phone and Telegram show here directly (Christopher's decision, 2026-10-22: they're already public
    // on iamoneself.com). t.me/iamoneself is his Telegram channel, "I am One Self - Daily Thoughts".
    contact: {
      title: "Reach out",
      intro: "Every way to reach Kenney and the foundation's team, from its own sites. David A and the Chaiconi Bari team are reached the same way: his site sends visitors to Kenney's About the Speaker page.",
      paths: [
        {
          kind: "chat",
          label: "WhatsApp",
          href: WHATSAPP,
          icon: "whatsapp-logo",
          action: "Message on WhatsApp",
          note: "Kenney keeps in touch by WhatsApp. In his words: “Contact me on WhatsApp or Email.”",
        },
        {
          kind: "phone",
          label: PHONE_SHOWN,
          href: PHONE,
          action: "Call or text",
          note: "Kenney's number, for a call or a text.",
        },
        {
          kind: "chat",
          label: "Telegram: @iamoneself",
          href: TELEGRAM,
          icon: "telegram-logo",
          action: "Open on Telegram",
          note: "Kenney's Telegram channel, I am One Self - Daily Thoughts: “Come pray, practice, meditate, purify, and be in Spirit.”",
        },
        {
          kind: "email",
          label: "info@IamOneSelf.com",
          href: "mailto:info@IamOneSelf.com",
          note: "The address iamoneself.com gives for getting in touch: questions about the teaching, coaching, the retreats or these pages.",
        },
        {
          kind: "page",
          label: "About the Speaker, on iamoneself.com",
          href: SPEAKER,
          icon: "chat-circle-text",
          action: "Open the page",
          note: "Kenney's own page: who he is, and his teaching.",
        },
        {
          kind: "page",
          label: "Book a free discovery call",
          href: "https://calendly.com/isaiahkenney",
          icon: "calendar-check",
          action: "Pick a time",
          note: "Still have questions about a retreat? The retreats site offers a free call with Kenney.",
        },
        {
          kind: "form",
          label: "Apply for a retreat",
          href: RETREATS + "/apply/",
          action: "Open the application",
          note: "The retreats site's Next Steps page: the application and medical form, reviewed in confidence.",
        },
        {
          kind: "email",
          label: "An address of the foundation's own",
          placeholder: "The Holy Earth Foundation doesn't have an address of its own yet. Until it does, info@IamOneSelf.com reaches the team.",
        },
        {
          kind: "github",
          label: "A contacts page on GitHub",
          placeholder: "This organization doesn't have a CONTACTS.md yet. The ways above reach the team.",
        },
      ],
    },

    // ── where the community talks: coming soon (approved by Christopher), and a sneak peek at a
    //    network of the community's own. Today Kenney keeps in touch one to one. ─────────────────
    community: {
      name: "the foundation's community",
      icon: "users-three",
      label: "See what's coming",
      title: "Where we gather",
      eyebrow: "Community",
      text: "The foundation's community doesn't have a shared space yet: for now Kenney keeps in touch one to one, by WhatsApp and email. A group and a newsletter are coming, and further out, a network of our own.",
      intro: "The foundation's community doesn't have a shared space yet: for now Kenney keeps in touch one to one, by WhatsApp and email (every way is under Reach out). These are on their way.",
      platforms: [
        {
          id: "whatsapp",
          kind: "whatsapp",
          name: "A community group",
          status: "soon",
          text: "A WhatsApp group for everyone walking with the teaching: news of retreats, teachings and gatherings.",
        },
        {
          id: "substack",
          kind: "substack",
          name: "Letters from the foundation",
          status: "soon",
          text: "Writing from Kenney and the foundation, by email, on Substack.",
        },
      ],
      bespoke: {
        title: "Looking ahead: a network of our own",
        tag: "Sneak peek",
        icon: "graph",
        text: "In time, the foundation hopes to give its community a small social network of its own, owned by the community rather than by one company.",
        points: [
          "Profiles and posts on open protocols like Lens and Farcaster, so what people share stays theirs.",
          "Paired with a DAO, where the community can propose ideas and decide together.",
          "Privacy first: everyone chooses what's public and what stays within the circle.",
        ],
        note: "No dates, and nothing to sign up for yet. This is a direction, not a promise.",
      },
      fine: 'Meanwhile, I Am One Self posts now and then on <a href="' + YOUTUBE + '" rel="noopener">YouTube</a> and <a href="' + X + '" rel="noopener">X</a>, as linked from iamoneself.com.',
    },

    // ── kit 1.2: the donate page (/donate/) ────────────────────────────────────────────────────
    // Only real giving paths. The one that exists is David's own Support David page; its options
    // still say "coming soon" there, and this says so. No wallet address, ever.
    // Give with crypto (kit v1.3, arrival/give/give.js): one Connect button in the donate page's crypto
    // slot. The Reown project (a public client ID, shared by the fleet's portals for now) must list
    // https://theholyearthfoundation.github.io in its allowlist at dashboard.reown.com; until it does, the page
    // calmly says wallet connect isn't switched on for this site yet. No treasury address yet, so every
    // coin reads "Treasury address coming soon" and connecting is a labelled preview. Never put a
    // placeholder or example address here: the page would show it. note: the org's own words, if any.
    give: {
      reownProjectId: "00b6a1cd528ff580f1fd845ed08b0187",
      chains: ["mainnet"],
      addresses: { eth: null, btc: null, sol: null },
      note: "",
    },

    donate: {
      give: [
        {
          label: "Support David, on his own site",
          icon: "palette",
          href: DAVID + "/crowdfunding/",
          action: "Open Support David",
          note: "David A's family is facing financial hardship, and his site has a page for supporting him and his teaching directly. Its ways to give, conventional and crypto, are still marked “coming soon” there.",
        },
        {
          label: "Giving to the foundation",
          icon: "hand-heart",
          placeholder: "The foundation doesn't take gifts of its own yet. When it does, the way to give will be here.",
          note: "A way to support the foundation's work as a whole: the teaching, the retreats and these pages.",
        },
      ],
      disclaimer: {
        placeholder: true,
        title: "About giving",
        text: "The foundation's own words about gifts belong here (what they support, and how they're handled). This is left as a placeholder until the foundation writes them. This GitHub page never takes payments or sees payment details.",
      },
      ledger: {
        src: ROOT + "/donate/contributors.json",
        title: "Contribution ledger",
        intro: "People and groups who have given time, skills or gifts to the foundation's work, and agreed to be thanked by name here.",
      },
      crypto: {
        text: "Giving from a crypto wallet is planned for this page: one button for browser wallets, phone wallets and email sign-in. It isn't open yet.",
      },
      // kit 1.4: "Receipts and taxes", claiming nothing. The foundation hasn't published a legal or
      // tax status (its formal incorporation is still coming together, as its profile says), so the
      // kit's defaults stand: ask us for a receipt; deductibility depends on status; not tax advice.
      tax: {},
    },

    // ── kit 1.4: the dock (the one-row strip at the bottom) shows a fade and a chevron on the side
    //    with more, so a phone visitor can tell it scrolls. The portal's and the AstroLog's dock are
    //    both .universal-footer .footer-inner, the kit's default. ─────────────────────────────────
    dock: { scroll: true },

    // ── kit 1.4: a pledge of support, on its own page (/pledge/). A visitor signs it with a wallet:
    //    a message, not a transaction: free, nothing sent, nothing recorded, and no counts. It uses
    //    the same wallet connection as /donate/ (give.reownProjectId). The words are the
    //    foundation's: giving is receiving (Christopher and Kenney's words, in the changelog). ─────
    pledge: {
      href: ROOT + "/pledge/",
      text: "I support The Holy Earth Foundation and the work it holds: Plants & Miracles, the retreats and coaching of I Am One Self, and David A's visionary art and Chaiconi Bari teaching. Giving is receiving, and I offer my support in that spirit.",
      intro: "If the foundation's work matters to you, you can say so by signing a short pledge with a crypto wallet. It's free: no gas and no money, and for now nothing is recorded.",
      note: 'Signing a pledge isn\'t a gift and asks nothing more of you. To give as well, see <a href="' + ROOT + '/donate/">the ways to give</a>.',
    },

    record: {
      intro: "THEF's AstroLog keeps a changelog and a library for the work on the sites, and gives Kenney's teaching a room of its own, Teachings.",
      share:
        "Sharing one change? Every entry, write-up and teaching has its own preview card, drawn with the foundation's twin vine. Paste its link into WhatsApp, iMessage or Telegram and it arrives with its title and summary. The <strong>Copy a link</strong> button under each one does the copying.",
      changelog: {
        name: "The changelog",
        text: "What's been built across I Am One Self, the retreats, and David Amaringo's site, told plainly, newest first. A short summary up top, the full story folded underneath.",
        href: LOG + "/changelog",
        label: "Read the changelog",
      },
      library: {
        name: "The library",
        text: "Technical write-ups on how the sites are built: the bugs, the fixes, and why. The changelog says what changed; the library explains how it works.",
        href: LOG + "/library",
        label: "Open the library",
      },
      ledger: {
        name: "The ledger",
        icon: "scroll",
        text: "Every public change to the foundation's open repositories on GitHub, in plain words, sorted by kind and grouped by month, day and repository. It gathers itself again every day.",
        href: LOG + "/ledger",
        label: "Open the ledger",
      },
    },

    sites: {
      portal: {
        name: "THEF on GitHub",
        what: "This is The Holy Earth Foundation's front door on GitHub: Kenney's Plants &amp; Miracles teaching, David Amaringo's work, and the way into the AstroLog.",
      },
      astrolog: {
        name: "the THEF AstroLog",
        what: "The AstroLog is the foundation's plain-language record of what's been built across its sites, the technical write-ups behind it, and Kenney's Teachings.",
      },
    },

    guide: {
      order: ["welcome", "record", "teachings", "search", "light", "motion", "people", "community", "home"],
      teachings: {
        icon: "flower-lotus",
        title: "Kenney's Teachings",
        html:
          "<p>Kenney's teaching lives in a room of its own, apart from the technical library.</p>" +
          '<div class="arr-box arr-shape"><h3><i class="ph ph-bird" aria-hidden="true"></i>Plants &amp; Miracles</h3>' +
          "<p>Flight of the Eagle and the Condor, by Isaiah (Kenney): his flyer, taken apart into pages you can read, share, and come back to: the Eagle, the Condor, their union, the Path of Awakening, and where to begin. His words are quoted exactly as printed, and the original is there to download.</p>" +
          '<a class="arr-btn arr-btn-primary arr-shape" href="' + TEACH + '/plants-and-miracles"><i class="ph ph-arrow-right" aria-hidden="true"></i>Open Plants &amp; Miracles</a></div>' +
          '<p class="arr-fine">The teaching is &copy; Isaiah (Kenney), shared here with his permission.</p>',
      },
      light: {
        text: "Two lights from one forest: the canopy before dawn, and the same canopy an hour later under morning mist. Or let it follow the sun. Your choice follows you from the portal to the AstroLog.",
      },
      motion: {
        text: "Fireflies drift over every page, and a twin vine, sky blue for A Course in Miracles and gold for plant medicine, grows behind your pointer until the two strands meet. Choose how much moves, and whether you'd like more contrast for reading.",
      },
      people: {
        text: "Every entry credits whoever did the work, by first name and last initial; the foundation's founder is credited as Isaiah (Kenney). It began with David A's call for help, which was a call for love: he shared himself with a brother, Kenney, and Spirit turned it into a way forward that blesses others. A giving and receiving that started as a mustard seed, and is growing into a large tree.",
        fine: "Pictures come from public GitHub profiles. Anyone without one linked gets their initials inside a ring of the twin vine.",
      },
    },
    guideFinale: "Every petal is open. Welcome to The Holy Earth Foundation.",

    words: {
      enter: "Step in",
      cursorNote: "A twin vine of sky and gold that grows behind your pointer, and fireflies that drift aside as you pass. Switch it off if you'd rather not.",
      pause: "Let the forest rest",
      play: "Let the forest move",
      searchPlaceholder: "Search changes, write-ups, teachings and pages",
      searchTip: "Anywhere on the foundation's GitHub pages, any time: every change, write-up, teaching, person and page, including the AstroLog from the portal.",
      readingNote: "One tap for the calmest page: Morning mist, the forest still, more contrast, shorter lines, and no vine behind your pointer. Tap again to go back to how you had it.",
      nothing: "Nothing matches yet. Try a month, a name, the Eagle, or the word light.",
    },

    search: {
      sources: [{ url: LOG + "/search.json" }],
      items: [
        { t: "THEF entry portal", k: "page", i: "house", h: ROOT + "/", pin: true, x: "home github io root vine" },
        { t: "Teachings: Plants & Miracles", k: "teaching", i: "flower-lotus", h: TEACH + "/plants-and-miracles", pin: true, x: "kenney flyer eagle condor barn owl sufi acim plant medicine" },
        { t: "iamoneself.com", k: "Kenney's site", i: "globe", h: SITE, pin: true, x: "i am one self course begin" },
        { t: "retreats.iamoneself.com", k: "Kenney's site", i: "butterfly", h: "https://retreats.iamoneself.com", x: "retreats peru tarapoto ceremony" },
        { t: "About the Speaker", k: "iamoneself.com", i: "chat-circle-text", h: SPEAKER, x: "kenney contact reach out coaching whatsapp" },
        { t: "Message Kenney on WhatsApp", k: "Reach out", i: "whatsapp-logo", h: WHATSAPP, x: "kenney contact reach phone call text telegram" },
        { t: "Map: every place, with pictures", k: "page", i: "map-trifold", h: ROOT + "/map/", pin: true, x: "sitemap where everything links overview thumbnails" },
        { t: "Donate", k: "page", i: "heart", h: ROOT + "/donate/", x: "give gift support money contribution ledger thanks crypto david" },
        { t: "Roadmap", k: "page", i: "path", h: LOG + "/roadmap", x: "plans next future ideas direction" },
        { t: "Sustainability", k: "page", i: "plant", h: LOG + "/sustainability", x: "maintenance keep running tokens upkeep" },
        { t: "Apply for a retreat", k: "retreats.iamoneself.com", i: "note-pencil", h: RETREATS + "/apply/", x: "application next steps medical form peru" },
        { t: "Support David", k: "David's site", i: "hand-heart", h: DAVID + "/crowdfunding/", x: "donate crowdfunding give amaringo" },
        { t: "Download Kenney's flyer (PDF)", k: "teaching", i: "download-simple", h: ROOT + "/plants-and-miracles/plants-and-miracles-flyer.pdf", x: "plants miracles flyer original pdf" },
        { t: "David Amaringo: preview the site", k: "link", i: "palette", h: DAVID + "/", x: "amazonian visionary art chaiconi bari usko ayar" },
        { t: "THEF on GitHub", k: "link", i: "github-logo", h: "https://github.com/theholyearthfoundation", x: "organization repos source code" },
        { t: "The ledger: every public change", k: "page", i: "scroll", h: LOG + "/ledger", pin: true, x: "commits history github activity record public repositories" },
      ],
    },
  };
})();

/* ── Kit 1.5 (2026-10-26): languages. English first: every visitor starts in English, and the welcome's
   first row ("Your language · Tu idioma") offers Español one tap away. The kit's own
   words come from arrival/i18n/<id>.js; the org's own words below are swapped by exact match
   (`text`). They're AI-written and marked reviewed: false ("translation in review") until someone
   who speaks the language as their own reads them. Names, marks, quotes and the pledge statement
   (the exact message a wallet signs) stay as written. ── */
(function () {
  var A = window.ARRIVAL;
  if (!A) return;
  A.languages = { list: [{ id: "en", name: "English" }, { id: "es", name: "Español" }], start: "en" };
  A.i18n = {
    es: {
      reviewed: false,
      text: {
        "I am one Self, united with my Creator.": "Soy un solo Ser, unido a mi Creador.",
        "The Holy Earth Foundation is home to Plants &amp; Miracles, Kenney's teaching that brings A Course in Miracles together with plant medicine traditions, and to the sites built for its teachers: I Am One Self, with Kenney's retreats and spiritual coaching, and David Amaringo's site, for David A's Amazonian visionary art and Chaiconi Bari teaching.": "The Holy Earth Foundation es la casa de Plants &amp; Miracles, la enseñanza de Kenney que une Un curso de milagros con las tradiciones de la medicina de las plantas, y de los sitios creados para sus maestros: I Am One Self, con los retiros y el acompañamiento espiritual de Kenney, y el sitio de David Amaringo, para el arte visionario amazónico de David A y la enseñanza de Chaiconi Bari.",
        "I Am One Self: Kenney's retreats and spiritual coaching, and where his flyer says to begin, with a free online course.": "I Am One Self: los retiros y el acompañamiento espiritual de Kenney, y donde su folleto dice que hay que empezar, con un curso gratuito en línea.",
        "A few words of welcome from Kenney belong here. This space is left empty on purpose until he writes them.": "Aquí van unas palabras de bienvenida de Kenney. Este espacio queda vacío a propósito hasta que él las escriba.",
        "Canopy": "Dosel",
        "The forest before dawn: deep canopy green, fireflies, and the vine's sky and gold strands.": "El bosque antes del amanecer: verde profundo del dosel, luciérnagas y las hebras celeste y dorada de la liana.",
        "Morning mist": "Bruma de la mañana",
        "The same forest an hour later: cool mist over leaf green.": "El mismo bosque una hora después: bruma fresca sobre el verde de las hojas.",
        "Follow the sun": "Sigue al sol",
        "Morning mist from sunrise, the canopy again after dusk.": "Bruma de la mañana desde el amanecer, y otra vez el dosel después del atardecer.",
        "Still": "Quieto",
        "The forest rests: the fireflies hold their light, and nothing follows your pointer.": "El bosque descansa: las luciérnagas sostienen su luz y nada sigue a tu puntero.",
        "Breeze": "Brisa",
        "Fireflies drift, and a twin vine of sky and gold grows behind your pointer, leaves opening as it goes.": "Las luciérnagas flotan, y una liana doble celeste y dorada crece tras tu puntero, abriendo hojas a su paso.",
        "Bloom": "Floración",
        "Brighter fireflies, a fuller vine, and seeds that drift down from it.": "Luciérnagas más brillantes, una liana más frondosa y semillas que caen flotando de ella.",
        "Portal": "Portal",
        "The foundation's front door on GitHub": "La puerta de entrada de la fundación en GitHub",
        "Porch": "Pórtico",
        "The AstroLog's front door": "La puerta de entrada del AstroLog",
        "Teachings": "Enseñanzas",
        "Kenney's Plants & Miracles, page by page": "Plants & Miracles de Kenney, página por página",
        "Changelog": "Registro de cambios",
        "What's been built, newest first": "Lo que se ha construido, lo más nuevo primero",
        "Library": "Biblioteca",
        "How the sites are built, and why": "Cómo se construyen los sitios, y por qué",
        "Ledger": "Libro de cambios",
        "Every public change, in plain words": "Cada cambio público, en palabras sencillas",
        "Map": "Mapa",
        "Every place, with a picture of each": "Cada lugar, con una imagen de cada uno",
        "Proposals, procedures & decks": "Propuestas, procedimientos y presentaciones",
        "The reading room: what the foundation is ready to show": "La sala de lectura: lo que la fundación está lista para mostrar",
        "Get involved": "Participa",
        "Community": "Comunidad",
        "Coming soon, and a sneak peek": "Muy pronto, y un adelanto",
        "Reach out": "Ponte en contacto",
        "Every way to reach Kenney and the team": "Todas las formas de contactar a Kenney y al equipo",
        "Donate": "Donar",
        "Ways to give, and thanks by name": "Formas de dar, y el agradecimiento por nombre",
        "Pledge": "Compromiso",
        "Sign a pledge of support: free, nothing sent": "Firma un compromiso de apoyo: gratis, no se envía nada",
        "The sites": "Los sitios",
        "iamoneself.com: Kenney's teaching and coaching": "iamoneself.com: la enseñanza y el acompañamiento de Kenney",
        "retreats.iamoneself.com: retreats and next steps": "retreats.iamoneself.com: retiros y próximos pasos",
        "David A's visionary art and Chaiconi Bari teaching": "El arte visionario de David A y la enseñanza de Chaiconi Bari",
        "About": "Acerca de",
        "Roadmap": "Hoja de ruta",
        "Where these pages are headed": "Hacia dónde van estas páginas",
        "Sustainability": "Sostenibilidad",
        "What it takes to keep them running": "Lo que hace falta para que sigan funcionando",
        "The organization and its code": "La organización y su código",
        "The Holy Earth Foundation, all the ways around": "The Holy Earth Foundation, todos los caminos",
        "Explore": "Explora",
        "Welcome guide": "Guía de bienvenida",
        "About this build": "Sobre este sitio",
        "AstroLog source": "Código del AstroLog",
        "Code here is MIT licensed and the words are CC BY-SA 4.0; Kenney's teaching stays his. The foundation's name and marks belong to the foundation. Headings set in PapyrusStd, Chris Costello / ITC (itcfonts.com).": "El código aquí tiene licencia MIT y los textos, CC BY-SA 4.0; la enseñanza de Kenney sigue siendo suya. El nombre y las marcas de la fundación pertenecen a la fundación. Títulos en PapyrusStd, Chris Costello / ITC (itcfonts.com).",
        "Every way to reach Kenney and the foundation's team, from its own sites. David A and the Chaiconi Bari team are reached the same way: his site sends visitors to Kenney's About the Speaker page.": "Todas las formas de contactar a Kenney y al equipo de la fundación, desde sus propios sitios. A David A y al equipo de Chaiconi Bari se les contacta de la misma manera: su sitio envía a los visitantes a la página About the Speaker de Kenney.",
        "Message on WhatsApp": "Escribir por WhatsApp",
        "Kenney keeps in touch by WhatsApp. In his words: “Contact me on WhatsApp or Email.”": "Kenney mantiene el contacto por WhatsApp. En sus palabras (en inglés): “Contact me on WhatsApp or Email.”",
        "Call or text": "Llamar o enviar un mensaje",
        "Kenney's number, for a call or a text.": "El número de Kenney, para una llamada o un mensaje.",
        "Open on Telegram": "Abrir en Telegram",
        "Kenney's Telegram channel, I am One Self - Daily Thoughts: “Come pray, practice, meditate, purify, and be in Spirit.”": "El canal de Telegram de Kenney, I am One Self - Daily Thoughts (en inglés): “Come pray, practice, meditate, purify, and be in Spirit.”",
        "The address iamoneself.com gives for getting in touch: questions about the teaching, coaching, the retreats or these pages.": "La dirección que da iamoneself.com para ponerse en contacto: preguntas sobre la enseñanza, el acompañamiento, los retiros o estas páginas.",
        "About the Speaker, on iamoneself.com": "About the Speaker, en iamoneself.com",
        "Open the page": "Abrir la página",
        "Kenney's own page: who he is, and his teaching.": "La propia página de Kenney: quién es y su enseñanza.",
        "Book a free discovery call": "Reserva una llamada gratuita de descubrimiento",
        "Pick a time": "Elige un horario",
        "Still have questions about a retreat? The retreats site offers a free call with Kenney.": "¿Todavía tienes preguntas sobre un retiro? El sitio de retiros ofrece una llamada gratuita con Kenney.",
        "Apply for a retreat": "Postúlate a un retiro",
        "Open the application": "Abrir la solicitud",
        "The retreats site's Next Steps page: the application and medical form, reviewed in confidence.": "La página Próximos pasos del sitio de retiros: la solicitud y el formulario médico, revisados con confidencialidad.",
        "An address of the foundation's own": "Una dirección propia de la fundación",
        "The Holy Earth Foundation doesn't have an address of its own yet. Until it does, info@IamOneSelf.com reaches the team.": "The Holy Earth Foundation todavía no tiene una dirección propia. Hasta que la tenga, info@IamOneSelf.com llega al equipo.",
        "A contacts page on GitHub": "Una página de contactos en GitHub",
        "This organization doesn't have a CONTACTS.md yet. The ways above reach the team.": "Esta organización todavía no tiene un CONTACTS.md. Las formas de arriba llegan al equipo.",
        "the foundation's community": "la comunidad de la fundación",
        "See what's coming": "Ver lo que viene",
        "Where we gather": "Donde nos reunimos",
        "The foundation's community doesn't have a shared space yet: for now Kenney keeps in touch one to one, by WhatsApp and email. A group and a newsletter are coming, and further out, a network of our own.": "La comunidad de la fundación todavía no tiene un espacio compartido: por ahora Kenney mantiene el contacto uno a uno, por WhatsApp y correo. Vienen un grupo y un boletín, y más adelante, una red propia.",
        "The foundation's community doesn't have a shared space yet: for now Kenney keeps in touch one to one, by WhatsApp and email (every way is under Reach out). These are on their way.": "La comunidad de la fundación todavía no tiene un espacio compartido: por ahora Kenney mantiene el contacto uno a uno, por WhatsApp y correo (todas las formas están en Ponte en contacto). Esto ya viene en camino.",
        "A community group": "Un grupo de la comunidad",
        "A WhatsApp group for everyone walking with the teaching: news of retreats, teachings and gatherings.": "Un grupo de WhatsApp para todos los que caminan con la enseñanza: noticias de retiros, enseñanzas y encuentros.",
        "Letters from the foundation": "Cartas de la fundación",
        "Writing from Kenney and the foundation, by email, on Substack.": "Escritos de Kenney y de la fundación, por correo, en Substack.",
        "Looking ahead: a network of our own": "Mirando hacia adelante: una red propia",
        "Sneak peek": "Un adelanto",
        "In time, the foundation hopes to give its community a small social network of its own, owned by the community rather than by one company.": "Con el tiempo, la fundación espera darle a su comunidad una pequeña red social propia, que sea de la comunidad y no de una empresa.",
        "Profiles and posts on open protocols like Lens and Farcaster, so what people share stays theirs.": "Perfiles y publicaciones en protocolos abiertos como Lens y Farcaster, para que lo que la gente comparte siga siendo suyo.",
        "Paired with a DAO, where the community can propose ideas and decide together.": "Junto con una DAO, donde la comunidad pueda proponer ideas y decidir junta.",
        "Privacy first: everyone chooses what's public and what stays within the circle.": "La privacidad primero: cada persona elige qué es público y qué queda dentro del círculo.",
        "No dates, and nothing to sign up for yet. This is a direction, not a promise.": "Sin fechas, y todavía nada en qué inscribirse. Es una dirección, no una promesa.",
        "Meanwhile, I Am One Self posts now and then on <a href=\"https://www.youtube.com/channel/UCwxGrMD_vgdFGZKVQCPazQw\" rel=\"noopener\">YouTube</a> and <a href=\"https://x.com/TheOneSelfIAM\" rel=\"noopener\">X</a>, as linked from iamoneself.com.": "Mientras tanto, I Am One Self publica de vez en cuando en <a href=\"https://www.youtube.com/channel/UCwxGrMD_vgdFGZKVQCPazQw\" rel=\"noopener\">YouTube</a> y en <a href=\"https://x.com/TheOneSelfIAM\" rel=\"noopener\">X</a>, como enlaza iamoneself.com.",
        "Support David, on his own site": "Apoya a David, en su propio sitio",
        "Open Support David": "Abrir Apoya a David",
        "David A's family is facing financial hardship, and his site has a page for supporting him and his teaching directly. Its ways to give, conventional and crypto, are still marked “coming soon” there.": "La familia de David A atraviesa dificultades económicas, y su sitio tiene una página para apoyarlo a él y a su enseñanza directamente. Sus formas de dar, convencionales y cripto, todavía aparecen ahí como “próximamente”.",
        "Giving to the foundation": "Dar a la fundación",
        "The foundation doesn't take gifts of its own yet. When it does, the way to give will be here.": "La fundación todavía no recibe donaciones propias. Cuando lo haga, la forma de dar estará aquí.",
        "A way to support the foundation's work as a whole: the teaching, the retreats and these pages.": "Una forma de apoyar el trabajo de la fundación en su conjunto: la enseñanza, los retiros y estas páginas.",
        "About giving": "Sobre dar",
        "The foundation's own words about gifts belong here (what they support, and how they're handled). This is left as a placeholder until the foundation writes them. This GitHub page never takes payments or sees payment details.": "Aquí van las propias palabras de la fundación sobre las donaciones (qué apoyan y cómo se manejan). Queda como espacio por completar hasta que la fundación las escriba. Esta página de GitHub nunca recibe pagos ni ve datos de pago.",
        "Contribution ledger": "Registro de contribuciones",
        "People and groups who have given time, skills or gifts to the foundation's work, and agreed to be thanked by name here.": "Personas y grupos que han dado tiempo, habilidades o regalos al trabajo de la fundación, y que aceptaron ser agradecidos por nombre aquí.",
        "Giving from a crypto wallet is planned for this page: one button for browser wallets, phone wallets and email sign-in. It isn't open yet.": "Dar desde una billetera cripto está planeado para esta página: un solo botón para billeteras del navegador, billeteras del teléfono e inicio de sesión con correo. Todavía no está abierto.",
        "If the foundation's work matters to you, you can say so by signing a short pledge with a crypto wallet. It's free: no gas and no money, and for now nothing is recorded.": "Si el trabajo de la fundación te importa, puedes decirlo firmando un breve compromiso con una billetera cripto. Es gratis: sin gas y sin dinero, y por ahora no se registra nada. El texto que se firma queda en inglés.",
        "Signing a pledge isn't a gift and asks nothing more of you. To give as well, see <a href=\"https://theholyearthfoundation.github.io/donate/\">the ways to give</a>.": "Firmar un compromiso no es un regalo y no te pide nada más. Para dar también, mira <a href=\"https://theholyearthfoundation.github.io/donate/\">las formas de dar</a>.",
        "THEF's AstroLog keeps a changelog and a library for the work on the sites, and gives Kenney's teaching a room of its own, Teachings.": "El AstroLog de THEF guarda un registro de cambios y una biblioteca del trabajo en los sitios, y le da a la enseñanza de Kenney una sala propia, Enseñanzas.",
        "Sharing one change? Every entry, write-up and teaching has its own preview card, drawn with the foundation's twin vine. Paste its link into WhatsApp, iMessage or Telegram and it arrives with its title and summary. The <strong>Copy a link</strong> button under each one does the copying.": "¿Vas a compartir un cambio? Cada entrada, texto y enseñanza tiene su propia tarjeta de vista previa, dibujada con la liana doble de la fundación. Pega su enlace en WhatsApp, iMessage o Telegram y llega con su título y su resumen. El botón <strong>Copiar un enlace</strong> debajo de cada uno lo copia por ti.",
        "The changelog": "El registro de cambios",
        "What's been built across I Am One Self, the retreats, and David Amaringo's site, told plainly, newest first. A short summary up top, the full story folded underneath.": "Lo que se ha construido en I Am One Self, los retiros y el sitio de David Amaringo, contado con sencillez, lo más nuevo primero. Un resumen breve arriba y la historia completa plegada debajo.",
        "Read the changelog": "Leer el registro de cambios",
        "The library": "La biblioteca",
        "Technical write-ups on how the sites are built: the bugs, the fixes, and why. The changelog says what changed; the library explains how it works.": "Textos técnicos sobre cómo se construyen los sitios: los errores, las correcciones y por qué. El registro de cambios dice qué cambió; la biblioteca explica cómo funciona.",
        "Open the library": "Abrir la biblioteca",
        "The ledger": "El libro de cambios",
        "Every public change to the foundation's open repositories on GitHub, in plain words, sorted by kind and grouped by month, day and repository. It gathers itself again every day.": "Cada cambio público en los repositorios abiertos de la fundación en GitHub, en palabras sencillas, ordenados por tipo y agrupados por mes, día y repositorio. Se vuelve a reunir cada día.",
        "Open the ledger": "Abrir el libro de cambios",
        "THEF on GitHub": "THEF en GitHub",
        "This is The Holy Earth Foundation's front door on GitHub: Kenney's Plants &amp; Miracles teaching, David Amaringo's work, and the way into the AstroLog.": "Esta es la puerta de entrada de The Holy Earth Foundation en GitHub: la enseñanza Plants &amp; Miracles de Kenney, el trabajo de David Amaringo y el camino al AstroLog.",
        "the THEF AstroLog": "el AstroLog de THEF",
        "The AstroLog is the foundation's plain-language record of what's been built across its sites, the technical write-ups behind it, and Kenney's Teachings.": "El AstroLog es el registro en lenguaje sencillo de lo que se ha construido en los sitios de la fundación, los textos técnicos detrás y las Enseñanzas de Kenney.",
        "Kenney's Teachings": "Las Enseñanzas de Kenney",
        "<p>Kenney's teaching lives in a room of its own, apart from the technical library.</p><div class=\"arr-box arr-shape\"><h3><i class=\"ph ph-bird\" aria-hidden=\"true\"></i>Plants &amp; Miracles</h3><p>Flight of the Eagle and the Condor, by Isaiah (Kenney): his flyer, taken apart into pages you can read, share, and come back to: the Eagle, the Condor, their union, the Path of Awakening, and where to begin. His words are quoted exactly as printed, and the original is there to download.</p><a class=\"arr-btn arr-btn-primary arr-shape\" href=\"https://theholyearthfoundation.github.io/changelog-astro-public/teachings/plants-and-miracles\"><i class=\"ph ph-arrow-right\" aria-hidden=\"true\"></i>Open Plants &amp; Miracles</a></div><p class=\"arr-fine\">The teaching is &copy; Isaiah (Kenney), shared here with his permission.</p>": "<p>La enseñanza de Kenney vive en una sala propia, aparte de la biblioteca técnica.</p><div class=\"arr-box arr-shape\"><h3><i class=\"ph ph-bird\" aria-hidden=\"true\"></i>Plants &amp; Miracles</h3><p>Flight of the Eagle and the Condor, de Isaiah (Kenney): su folleto, separado en páginas que puedes leer, compartir y volver a visitar: el Águila, el Cóndor, su unión, el Camino del Despertar y por dónde empezar. Sus palabras se citan tal como fueron impresas, en inglés, y el original está disponible para descargar.</p><a class=\"arr-btn arr-btn-primary arr-shape\" href=\"https://theholyearthfoundation.github.io/changelog-astro-public/teachings/plants-and-miracles\"><i class=\"ph ph-arrow-right\" aria-hidden=\"true\"></i>Abrir Plants &amp; Miracles</a></div><p class=\"arr-fine\">La enseñanza es &copy; Isaiah (Kenney), compartida aquí con su permiso.</p>",
        "Two lights from one forest: the canopy before dawn, and the same canopy an hour later under morning mist. Or let it follow the sun. Your choice follows you from the portal to the AstroLog.": "Dos luces de un mismo bosque: el dosel antes del amanecer, y el mismo dosel una hora después bajo la bruma de la mañana. O deja que siga al sol. Tu elección te acompaña del portal al AstroLog.",
        "Fireflies drift over every page, and a twin vine, sky blue for A Course in Miracles and gold for plant medicine, grows behind your pointer until the two strands meet. Choose how much moves, and whether you'd like more contrast for reading.": "Las luciérnagas flotan sobre cada página, y una liana doble, celeste por Un curso de milagros y dorada por la medicina de las plantas, crece tras tu puntero hasta que las dos hebras se encuentran. Elige cuánto se mueve y si quieres más contraste para leer.",
        "Every entry credits whoever did the work, by first name and last initial; the foundation's founder is credited as Isaiah (Kenney). It began with David A's call for help, which was a call for love: he shared himself with a brother, Kenney, and Spirit turned it into a way forward that blesses others. A giving and receiving that started as a mustard seed, and is growing into a large tree.": "Cada entrada reconoce a quien hizo el trabajo, por su nombre y la inicial de su apellido; al fundador de la fundación se le reconoce como Isaiah (Kenney). Todo empezó con el pedido de ayuda de David A, que era un pedido de amor: se compartió con un hermano, Kenney, y el Espíritu lo convirtió en un camino que bendice a otros. Un dar y recibir que empezó como una semilla de mostaza y está creciendo hasta ser un gran árbol.",
        "Pictures come from public GitHub profiles. Anyone without one linked gets their initials inside a ring of the twin vine.": "Las imágenes vienen de perfiles públicos de GitHub. Quien no tenga uno enlazado recibe sus iniciales dentro de un anillo de la liana doble.",
        "Every petal is open. Welcome to The Holy Earth Foundation.": "Cada pétalo está abierto. Te damos la bienvenida a The Holy Earth Foundation.",
        "Step in": "Pasa",
        "A twin vine of sky and gold that grows behind your pointer, and fireflies that drift aside as you pass. Switch it off if you'd rather not.": "Una liana doble celeste y dorada que crece tras tu puntero, y luciérnagas que se apartan a tu paso. Apágala si lo prefieres.",
        "Let the forest rest": "Dejar descansar el bosque",
        "Let the forest move": "Dejar que el bosque se mueva",
        "Search changes, write-ups, teachings and pages": "Busca cambios, textos, enseñanzas y páginas",
        "Anywhere on the foundation's GitHub pages, any time: every change, write-up, teaching, person and page, including the AstroLog from the portal.": "En cualquier lugar de las páginas de la fundación en GitHub, en cualquier momento: cada cambio, texto, enseñanza, persona y página, incluido el AstroLog desde el portal.",
        "One tap for the calmest page: Morning mist, the forest still, more contrast, shorter lines, and no vine behind your pointer. Tap again to go back to how you had it.": "Un toque para la página más tranquila: Bruma de la mañana, el bosque quieto, más contraste, líneas más cortas y sin liana tras tu puntero. Toca otra vez para volver a como la tenías.",
        "Nothing matches yet. Try a month, a name, the Eagle, or the word light.": "Todavía no hay coincidencias. Prueba con un mes, un nombre, Eagle o la palabra light.",
        "THEF entry portal": "Portal de entrada de THEF",
        "Teachings: Plants & Miracles": "Enseñanzas: Plants & Miracles",
        "Kenney's site": "el sitio de Kenney",
        "About the Speaker": "About the Speaker",
        "Message Kenney on WhatsApp": "Escríbele a Kenney por WhatsApp",
        "Map: every place, with pictures": "Mapa: cada lugar, con imágenes",
        "Support David": "Apoya a David",
        "David's site": "el sitio de David",
        "Download Kenney's flyer (PDF)": "Descarga el folleto de Kenney (PDF)",
        "David Amaringo: preview the site": "David Amaringo: vista previa del sitio",
        "The ledger: every public change": "El libro de cambios: cada cambio público",
      },
    },
  };
})();
/* ── end of the languages block ── */
