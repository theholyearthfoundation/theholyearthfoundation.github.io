/* The Holy Earth Foundation's arrival config, read by arrival.js (kit v1.3). Shared by every THEF page
   that loads the kit: the entry portal (/, /donate/, /map/, the 404) and, by full URL, the AstroLog.

   Every fact here comes from THEF's own public materials: this portal, the AstroLog, Kenney's Plants &
   Miracles flyer (as published in Teachings), iamoneself.com, retreats.iamoneself.com and David
   Amaringo's site. Anything the foundation hasn't published yet (a community space, a contacts page,
   a welcome from Kenney, wording about gifts) is marked as a placeholder or "coming soon" rather than
   guessed, and no link or address is ever made up. No phone number or WhatsApp link is published
   here: the contact window points at iamoneself.com's own contact page instead. People are named by
   first name and last initial. Strings shown in the guide and the modals may hold simple HTML. */
(function () {
  var ROOT = "https://theholyearthfoundation.github.io";
  var LOG = ROOT + "/changelog-astro-public";
  var TEACH = LOG + "/teachings";
  var SITE = "https://www.iamoneself.com";
  var SPEAKER = SITE + "/about-the-speaker";
  var CONTACT = SITE + "/contact";
  var RETREATS = "https://retreats.iamoneself.com";
  // David's site (a public preview on drasticstatic.github.io). Its own Contact page sends visitors
  // to Kenney's About the Speaker page; its Support David page is the one giving path that exists.
  var DAVID = "https://drasticstatic.github.io/david-amaringo-public-preview";
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
      mark: { src: ROOT + "/favicon.svg" },
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
        {
          id: "involved",
          label: "Get involved",
          icon: "hand-heart",
          priority: 3,
          items: [
            { id: "community", label: "Community", icon: "users-three", href: ROOT + "/#community", open: "community", note: "Coming soon, and a sneak peek" },
            { id: "contact", label: "Reach out", icon: "envelope-simple", href: SPEAKER, open: "contact", note: "Every way to reach Kenney and the team" },
            { id: "donate", label: "Donate", icon: "heart", href: ROOT + "/donate/", note: "Ways to give, and thanks by name" },
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
        { label: "Explore", icon: "compass", items: ["portal", "porch", "teachings", "changelog", "library", "ledger", "map"] },
        { label: "Get involved", icon: "hand-heart", items: ["community", "contact", "donate", { id: "guide", label: "Welcome guide", icon: "signpost", href: "#welcome", open: "guide" }] },
        { label: "The sites", icon: "globe-hemisphere-west", items: ["home", "retreats", "david"] },
        { label: "About this build", icon: "wrench", items: ["roadmap", "sustainability", "github", { id: "source", label: "AstroLog source", icon: "code", href: "https://github.com/theholyearthfoundation/changelog-astro-public" }] },
      ],
      note: 'Code here is MIT licensed and the words are CC BY-SA 4.0; Kenney\'s teaching stays his. The foundation\'s name and marks belong to the foundation. Headings set in PapyrusStd, Chris Costello / ITC (itcfonts.com).',
    },

    // ── kit 1.2: one modal for every way to reach Kenney and the team ──────────────────────────
    // Only paths the foundation's own sites publish. Kenney keeps in touch by WhatsApp; his number is
    // on iamoneself.com's contact page, so this points there rather than repeating it.
    contact: {
      title: "Reach out",
      intro: "Every way to reach Kenney and the foundation's team, from its own sites. David A and the Chaiconi Bari team are reached the same way: his site sends visitors to Kenney's About the Speaker page.",
      paths: [
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
          note: "Kenney's own page. In his words: “Contact me on WhatsApp or Email.”",
        },
        {
          kind: "chat",
          label: "WhatsApp, Telegram, a call or a text",
          href: CONTACT,
          action: "See the contact page",
          note: "I Am One Self's contact page lists the number to use for each, and suggests Telegram from outside the USA.",
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
          "<p>Flight of the Eagle and the Condor: Isaiah Kenney's flyer, taken apart into pages you can read, share, and come back to: the Eagle, the Condor, their union, the Path of Awakening, and where to begin. His words are quoted exactly as printed, and the original is there to download.</p>" +
          '<a class="arr-btn arr-btn-primary arr-shape" href="' + TEACH + '/plants-and-miracles"><i class="ph ph-arrow-right" aria-hidden="true"></i>Open Plants &amp; Miracles</a></div>' +
          '<p class="arr-fine">The teaching is &copy; Isaiah Kenney, shared here with his permission.</p>',
      },
      light: {
        text: "Two lights from one forest: the canopy before dawn, and the same canopy an hour later under morning mist. Or let it follow the sun. Your choice follows you from the portal to the AstroLog.",
      },
      motion: {
        text: "Fireflies drift over every page, and a twin vine, sky blue for A Course in Miracles and gold for plant medicine, grows behind your pointer until the two strands meet. Choose how much moves, and whether you'd like more contrast for reading.",
      },
      people: {
        text: "Every entry credits whoever did the work, by first name and last initial. David A's call for help is what first reached us; Kenney, the foundation's founder, carried it.",
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
