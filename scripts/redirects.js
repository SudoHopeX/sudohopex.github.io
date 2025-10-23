(function() {
  // ===== Configuration =====
  const allowedDomain = "hope.is-a.dev";

  function sendE() {
      const a = "sud0hope";
      const h = "techie";
      const at = "@";
      const m = "gmail.com";

      window.location.href = `mailto:${a}.${h}${at}${m}`;
  }

  // Internal shortcuts
  const internalPaths = {

    // full relative paths
    kaligpt_doc: "/pages/project-docs/kaligpt.kjiodjfianjfkjnsifoifsidfh.html",
    hashstorm_doc: "/pages/project-docs/hs.nksdnifadnifad.html",
    isc2_cc_quiz_doc: "/pages/project-docs/cc.jodsifosdijfosd.html",
    master_xss_in_30days: "/pages/articles/30days2master_xss.cyberxsociety.html",
    openpuffi_doc: "/pages/project-docs/openpuff.ioahdfaisdnfkandf.html",
    sqli_research_paper: "/pages/articles/sql.kdhahiduahdnfkdjiaudfn.html",
    writeup_doc_gen: "/pages/catalogue/document-writeups.html",
    payload_encoding_guide: "/pages/catalogue/xss-payload-encodings.html",

    // directories
    isc2_cc_quiz: "/cc-practice-quiz/",
    cli: "/cli-mode/",
    labs: "/labs/",
    xss_labs: "/labs/xss/",
    catalogue: "/pages/catalogue/",
    articles: "/pages/articles/",
    project_docs: "/pages/project-docs/",
    writeups: "/pages/writeups/",
    link_tree: "/Link-tree/",

    // coming soon
    smrtilog_doc: "/pages/comingsoon.html"

  };


  // External shortcuts
  const externalLinks = {

    // external socials to connect
    github: "https://github.com/SudoHopeX",
    linkedin: "https://www.linkedin.com/in/dkrishna0124",
    credly: "https://www.credly.com/users/krishna-dwivedi.a2ae4587",
    youtube: "https://www.youtube.com/@SudoHopeX",
    medium: "https://sudohopex.medium.com/",
    email: sendE(),
    discord: "https://discord.com/users/1239239011214688437",

    // Tools GitHub repo's path
    kaligpt: "https://github.com/SudoHopeX/KaliGPT",
    hashstorm: "https://github.com/SudoHopeX/HashStorm",
    xss_dumps: "https://github.com/SudoHopeX/XSS-Dumps",
    openpuffi: "https://github.com/SudoHopeX/OpenPuffi",
    smrti_log: "https://github.com/SudoHopeX/SmrtiLog",

    // Vercel Projects path
    smrti_log_server: ""
  };

  // ===== Core Logic =====
  const params = new URLSearchParams(window.location.search);
  const query = params.get("to") || params.get("path");
  if (!query) return; // nothing to do

  const key = query.trim().toLowerCase();

  // 1️⃣ Internal redirect
  if (internalPaths[key]) {
    const safePath = internalPaths[key];
    if (safePath.startsWith("/")) {
      window.location.replace(`https://${allowedDomain}${safePath}`);
    } else {
      window.location.replace(`https://${allowedDomain}`);
    }
    return;
  }

  // 2️⃣ External shortcut redirect
  if (externalLinks[key]) {
    window.location.replace(externalLinks[key]);
    return;
  } else {
    window.location.replace(`https://${allowedDomain}`);
  }

//  // 3️⃣ If a full path or URL is given, validate it strictly
//  try {
//    const targetUrl = new URL(query, `https://${allowedDomain}`);
//    if (targetUrl.hostname === allowedDomain) {
//      window.location.replace(targetUrl.toString());
//    } else {
//      console.warn("Blocked redirect: domain not allowed.");
//    }
//  } catch (err) {
//    console.warn("Invalid redirect target.");
//  }

})();
