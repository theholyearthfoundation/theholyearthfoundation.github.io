/* The Holy Earth Foundation's arrival config, read by arrival.js. Shared by every THEF page that loads
   the kit: the entry portal (this site) and the AstroLog (by full URL).

   Every fact here comes from THEF's own materials: this portal, the AstroLog, Kenney's Plants &
   Miracles flyer (as published in Teachings) and iamoneself.com. Anything the foundation hasn't
   published yet (a community chat, a welcome from Kenney) is marked as a placeholder rather than
   guessed. Strings shown in the welcome guide may hold simple HTML. */
(function () {
  var ROOT = "https://theholyearthfoundation.github.io";
  var LOG = ROOT + "/changelog-astro-public";
  var TEACH = LOG + "/teachings";
  var SITE = "https://www.iamoneself.com";
  var SPEAKER = SITE + "/about-the-speaker";
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
        "The Holy Earth Foundation is home to Plants &amp; Miracles, Isaiah Kenney's teaching that brings A Course in Miracles together with plant medicine traditions, and to the sites built for its teachers: I Am One Self, with Kenney's retreats and spiritual coaching, and David Amaringo's Amazonian visionary art and Chaiconi Bari teaching.",
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
    // vine); another tap goes back to how the visitor had it.
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

    // No community chat has been named in the foundation's materials yet (see guide.community).
    community: null,

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
        text: "Every entry credits whoever did the work, named the way the foundation's own pages name them.",
        fine: "Pictures come from public GitHub profiles. Anyone without one linked gets their initials inside a ring of the twin vine.",
      },
      community: {
        html:
          "<p>The foundation hasn't opened a community space for conversation yet. When it does, the link will be right here.</p>" +
          '<p class="arr-placeholder arr-shape"><i class="ph ph-plant" aria-hidden="true"></i><span><strong>Coming soon.</strong> A place for the foundation\'s community to talk.</span></p>' +
          "<p>Until then, the way to reach Kenney is the About the Speaker page on iamoneself.com.</p>" +
          '<a class="arr-btn arr-btn-quiet arr-shape" href="' + SPEAKER + '"><i class="ph ph-chat-circle-text" aria-hidden="true"></i>About the Speaker</a>',
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
      nothing: "Nothing matches yet. Try a month, a name, the Eagle, or the word light.",
    },

    search: {
      sources: [{ url: LOG + "/search.json" }],
      items: [
        { t: "THEF entry portal", k: "page", i: "house", h: ROOT + "/", pin: true, x: "home github io root vine" },
        { t: "Teachings: Plants & Miracles", k: "teaching", i: "flower-lotus", h: TEACH + "/plants-and-miracles", pin: true, x: "kenney flyer eagle condor barn owl sufi acim plant medicine" },
        { t: "iamoneself.com", k: "Kenney's site", i: "globe", h: SITE, pin: true, x: "i am one self course begin" },
        { t: "retreats.iamoneself.com", k: "Kenney's site", i: "butterfly", h: "https://retreats.iamoneself.com", x: "retreats peru tarapoto ceremony" },
        { t: "About the Speaker", k: "iamoneself.com", i: "chat-circle-text", h: SPEAKER, x: "kenney contact reach out coaching" },
        { t: "Download Kenney's flyer (PDF)", k: "teaching", i: "download-simple", h: ROOT + "/plants-and-miracles/plants-and-miracles-flyer.pdf", x: "plants miracles flyer original pdf" },
        { t: "David Amaringo: preview the site", k: "link", i: "palette", h: "https://drasticstatic.github.io/david-amaringo-public-preview/", x: "amazonian visionary art chaiconi bari" },
        { t: "THEF on GitHub", k: "link", i: "github-logo", h: "https://github.com/theholyearthfoundation", x: "organization repos source code" },
        { t: "The ledger: every public change", k: "page", i: "scroll", h: LOG + "/ledger", pin: true, x: "commits history github activity record public repositories" },
      ],
    },
  };
})();
