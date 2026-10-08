/* RadarHelp page renderer. Each HTML page sets <body data-page="…">;
 * this file draws the shared header and footer and fills the page from
 * window.RH (content.js). No build step, works from file:// or any server. */
(function () {
  var RH = window.RH;
  var A = RH.ARTICLES;
  var MOD = {};
  RH.MODULES.forEach(function (m) { MOD[m.id] = m; });
  var WF = {};
  RH.WORKFLOWS.forEach(function (w) { WF[w.id] = w; });
  var CATS = {
    'getting-started': { name: 'Getting Started', href: 'feature.html?m=getting-started' },
    features: { name: 'Features', href: 'features.html' },
    configuration: { name: 'Configuration', href: 'features.html#configuration' },
    troubleshooting: { name: 'Troubleshooting', href: 'feature.html?m=troubleshooting' }
  };

  // ---------- helpers ----------
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function $(sel) { return document.querySelector(sel); }
  function param(k) { var m = new RegExp('[?&]' + k + '=([^&#]*)').exec(location.search); return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null; }
  function artUrl(id, wf) {
    // Series guides (Getting Started) are pages of the series
    if (!wf && A[id] && MOD[A[id].module].series) return 'feature.html?m=' + encodeURIComponent(A[id].module) + '&s=' + encodeURIComponent(id);
    return 'article.html?id=' + encodeURIComponent(id) + (wf ? '&wf=' + encodeURIComponent(wf) : '');
  }
  function wfUrl(id) { return 'workflow.html?id=' + encodeURIComponent(id); }
  function modUrl(id) { return 'feature.html?m=' + encodeURIComponent(id); }
  function store(k, v) {
    try {
      if (v === undefined) { var s = localStorage.getItem('rh.' + k); return s ? JSON.parse(s) : null; }
      localStorage.setItem('rh.' + k, JSON.stringify(v));
    } catch (e) { return null; }
  }
  function roleNames(ids) { return ids.map(function (r) { return RH.ROLES[r].name; }).join(', '); }
  function typeChip(t) { var c = t === 'How-to' ? ' how' : t === 'Troubleshooting' ? ' fix' : ''; return '<span class="chip type' + c + '">' + esc(t) + '</span>'; }
  function moduleArticles(mid) { return RH.ORDER.filter(function (id) { return A[id].module === mid; }).map(function (id) { return A[id]; }); }
  function workflowsUsing(aid) {
    var out = [];
    RH.WORKFLOWS.forEach(function (w) { w.steps.forEach(function (s, i) { if (s[0] === aid && !out.some(function (o) { return o.w === w; })) out.push({ w: w, i: i }); }); });
    return out;
  }
  function wfDone(id) { return store('wf.' + id) || []; }
  // Getting Started counts as complete once its last step has been scrolled to
  function gsComplete() { return store('gs.complete') === true; }
  function toast(msg) {
    var t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600);
  }
  var ICON = {
    search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    clock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    user: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };

  // ---------- shell ----------
  function header(active) {
    var nav = [['guides', 'guides.html', 'Help Guides'], ['videos', 'page.html?p=videos', 'Video Library'], ['webinars', 'page.html?p=webinars', 'Webinars'], ['ideas', 'page.html?p=ideas', 'Ideas Forum'], ['new', 'page.html?p=whats-new', 'What’s New']];
    return '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="site-header"><div class="wrap bar">' +
      '<a class="brand" href="index.html"><img src="assets/img/logo.png" alt="RTO Radar"><span>Help</span></a>' +
      '<button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">' + ICON.menu + '</button>' +
      '<nav class="main-nav" id="main-nav" aria-label="Main">' + nav.map(function (n) { return '<a href="' + n[1] + '"' + (n[0] === active ? ' aria-current="page"' : '') + '>' + n[2] + '</a>'; }).join('') + '</nav>' +
      (active === 'home' ? '' : '<form class="header-search" action="search.html" role="search"><label for="hs" class="visually-hidden">Search help</label>' + ICON.search + '<input id="hs" name="q" type="search" placeholder="Search help"></form>') +
      '<a class="btn btn-primary contact" href="page.html?p=contact">Contact us</a>' +
      '</div></header>';
  }
  function footer() {
    return '<footer class="site-footer"><div class="wrap">' +
      '<div class="bottom"><img src="assets/img/logo-white.png" alt="RTO Radar"><span>© RTO Radar · <a href="#" style="color:inherit">Privacy</a> · <a href="#" style="color:inherit">Terms</a> · <a href="#" style="color:inherit">Accessibility</a> · <a href="#" style="color:inherit">Back to RTO Radar ↗</a></span></div>' +
      '</div></footer>';
  }
  function crumbs(parts) {
    return '<nav class="crumbs" aria-label="Breadcrumb">' + parts.map(function (p, i) {
      return (i ? '<span aria-hidden="true">›</span>' : '') + (p[1] ? '<a href="' + p[1] + '">' + esc(p[0]) + '</a>' : '<span aria-current="page">' + esc(p[0]) + '</span>');
    }).join('') + '</nav>';
  }
  // "Updated" date: the newest last-modified time of the page's own scripts (content.js holds the
  // guide text, app.js the layout), as reported by the web server. Opened from disk, servers aren't
  // involved, so it falls back to the `updated` date written in content.js.
  function showUpdated(el, fallback) {
    function show(d) {
      el.dateTime = d.toISOString().slice(0, 10);
      el.textContent = d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    if (fallback) show(new Date(fallback + 'T00:00:00'));
    if (location.protocol === 'file:' || !window.fetch) return;
    var srcs = [].map.call(document.querySelectorAll('script[src]'), function (s) { return s.src; });
    Promise.all(srcs.map(function (u) {
      return fetch(u, { method: 'HEAD', cache: 'no-cache' }).then(function (r) { return Date.parse(r.headers.get('Last-Modified')) || 0; }, function () { return 0; });
    })).then(function (times) {
      var t = Math.max.apply(null, times);
      if (t) show(new Date(t));
    });
  }

  // "Was this guide helpful?" — one vote per signed-in user, shown as "X out of Y found this helpful".
  // Counting across users needs the platform, so the page talks to an adapter the platform provides:
  //   window.RH_FEEDBACK = {
  //     get(guideId)          -> Promise<{ yes, total, mine }>   mine: 'yes' | 'no' | null for the signed-in user
  //     vote(guideId, choice) -> Promise<{ yes, total, mine }>   choice: 'yes' | 'no'; replaces the user's earlier vote
  //   };
  // Without it (this prototype), votes are kept in this browser only, so the count reflects one person.
  var localFeedback = {
    get: function (id) {
      var s = store('fb.' + id) || { yes: 0, no: 0, mine: null };
      return Promise.resolve({ yes: s.yes, total: s.yes + s.no, mine: s.mine });
    },
    vote: function (id, choice) {
      var s = store('fb.' + id) || { yes: 0, no: 0, mine: null };
      if (s.mine) s[s.mine] -= 1;
      s[choice] += 1; s.mine = choice;
      store('fb.' + id, s);
      return this.get(id);
    }
  };
  var THUMB = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z"/><path d="M7 10l4-7a2.5 2.5 0 0 1 3 3l-1 4h6a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 17.6 21H7"/></svg>';
  function feedbackBlock() {
    return '<section class="gs-feedback" aria-labelledby="fb-title"><h2 id="fb-title">Was this guide helpful?</h2>' +
      '<div class="fb-buttons"><button type="button" data-fb="yes" aria-pressed="false">' + THUMB + 'Yes</button>' +
      '<button type="button" data-fb="no" aria-pressed="false"><span class="down">' + THUMB + '</span>No</button></div>' +
      '<p class="fb-count" aria-live="polite"></p></section>';
  }
  function wireFeedback(id) {
    var box = $('.gs-feedback'); if (!box) return;
    var api = window.RH_FEEDBACK || localFeedback, busy = false;
    function show(r) {
      box.querySelectorAll('[data-fb]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-fb') === r.mine)); });
      box.querySelector('.fb-count').textContent = r.total ? r.yes + ' out of ' + r.total + ' found this helpful' : '';
    }
    api.get(id).then(show, function () {});
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-fb]'); if (!b || busy || b.getAttribute('aria-pressed') === 'true') return;
      busy = true;
      api.vote(id, b.getAttribute('data-fb')).then(show, function () {}).then(function () { busy = false; });
    });
  }

  // Screenshot markers. A figure can point at the buttons to press, in order, without editing the image:
  //   <figure class="shot" data-marks="x,y; x,y,w,h; …">
  // Each entry is a position in percent of the picture: "x,y" draws a numbered dot at that point, and
  // "x,y,w,h" marks an area (x,y = its top-left corner) with the number just outside its left edge. Numbers count
  // 1, 2, 3… in the order listed; add "#label" as the last value (e.g. "40,20,#3") to show that instead,
  // such as the number of the step the button belongs to. Add "oval" to circle the area with an oval as well; a bare "#" leaves an oval without a number. Add "right" or "above" to put the number on that side instead, "underline" to underline the area instead, or "zone" to outline a whole area of the screen (number inside its top-right corner).
  // "x,y,arrow" draws an arrow whose tip touches x,y, pointing up; use "arrow-down", "arrow-left" or "arrow-right"
  // for other directions. Arrows stand out on busy or coloured backgrounds where an oval would blend in.
  // An arrow shows a number at its tail only when given one, e.g. "60,40,arrow-left,#4". Add "small" or "tiny" for a shorter arrow in tight gaps.
  function wireMarks() {
    document.querySelectorAll('.shot[data-marks]').forEach(function (f) {
      var img = f.querySelector('img'); if (!img || img.parentNode.classList.contains('shot-frame')) return;
      var frame = document.createElement('span');
      frame.className = 'shot-frame';
      img.parentNode.insertBefore(frame, img);
      frame.appendChild(img);
      f.getAttribute('data-marks').split(';').forEach(function (entry, i) {
        var tokens = entry.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
        var label = String(i + 1), labelled = false, oval = false, right = false, above = false, zone = false, small = false, arrow = null, v = [];
        tokens.forEach(function (t) {
          if (t.charAt(0) === '#') { label = t.slice(1); labelled = true; } else if (t === 'oval') oval = true; else if (t === 'right') right = true;
          else if (t === 'above') above = true; else if (t === 'zone') zone = true; else if (t === 'underline') zone = 'underline'; else if (t === 'small') small = 'small'; else if (t === 'tiny') small = 'tiny';
          else if (/^arrow(-(up|down|left|right))?$/.test(t)) arrow = t.split('-')[1] || 'up';
          else v.push(t);
        });
        if (v.length < 2) return;
        var x = parseFloat(v[0]), y = parseFloat(v[1]), el = document.createElement('span');
        el.setAttribute('aria-hidden', 'true');
        if (arrow) {
          // Arrow with its tip on x,y, pointing the way named (up by default, i.e. coming from below)
          el.className = 'mark-arrow to-' + arrow + (small ? ' ' + small : '');
          el.style.cssText = 'left:' + x + '%;top:' + y + '%';
          el.innerHTML = '<svg viewBox="0 0 40 72" width="40" height="72"><path d="M20 2 L37 26 L26 26 L26 70 L14 70 L14 26 L3 26 Z"/></svg>' +
            (labelled && label ? '<span class="mark">' + esc(label) + '</span>' : ''); // number at the tail, only when one is given
        } else if (v.length >= 4) {
          el.className = 'mark-box' + (oval ? ' oval' : '') + (right ? ' num-right' : '') + (above ? ' num-above' : '') + (zone === 'underline' ? ' underline' : zone ? ' zone' : '');
          el.style.cssText = 'left:' + x + '%;top:' + y + '%;width:' + parseFloat(v[2]) + '%;height:' + parseFloat(v[3]) + '%';
          if (label) el.innerHTML = '<span class="mark">' + esc(label) + '</span>';
        } else {
          el.className = 'mark mark-dot';
          el.style.cssText = 'left:' + x + '%;top:' + y + '%';
          el.textContent = label;
        }
        frame.appendChild(el);
      });
    });
  }

  // Screenshot zoom. Clicking a .shot picture (or Enter/Space on it) opens it full-screen, fitted to the
  // window. Clicking the enlarged picture toggles actual size (scroll to pan).
  // The viewer is created on open and removed on close, so nothing sits over the page in between.
  function wireZoom() {
    document.querySelectorAll('.shot img').forEach(function (img) {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Enlarge image: ' + (img.alt || 'screenshot'));
    });
    document.addEventListener('click', function (e) {
      var img = e.target.closest('.shot img'); if (img) openZoom(img, img);
    });
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.shot img')) { e.preventDefault(); openZoom(e.target, e.target); }
    });
  }
  function openZoom(img, returnTo) {
    var v = document.createElement('div');
    v.className = 'zoom-view';
    v.setAttribute('role', 'dialog'); v.setAttribute('aria-modal', 'true'); v.setAttribute('aria-label', 'Enlarged image');
    v.innerHTML = '<div class="zoom-stage"></div><button type="button" class="zoom-close" aria-label="Close">×</button>';
    var stage = v.querySelector('.zoom-stage');
    // Bring the picture's markers along: copy its marker frame if it has one
    var frame = img.parentNode.classList.contains('shot-frame') ? img.parentNode : null;
    var copy = (frame || img).cloneNode(true);
    stage.appendChild(copy);
    var big = copy.tagName === 'IMG' ? copy : copy.querySelector('img');
    big.removeAttribute('tabindex'); big.removeAttribute('role'); big.removeAttribute('aria-label');
    document.body.appendChild(v);
    document.documentElement.classList.add('zoom-open');
    v.querySelector('.zoom-close').focus();
    function close() {
      v.remove();
      document.documentElement.classList.remove('zoom-open');
      document.removeEventListener('keydown', onKey);
      if (returnTo) returnTo.focus();
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    v.querySelector('.zoom-close').addEventListener('click', close);
    big.addEventListener('click', function () { v.classList.toggle('full'); });
    stage.addEventListener('click', function (e) { if (e.target === stage) close(); });
  }

  // Light page head: breadcrumbs on the left, article search on the right
  function crumbBar(parts) {
    // This bar has its own search, so drop the header's to avoid two search boxes
    var hs = $('.header-search'); if (hs) hs.remove();
    var h = $('#head');
    h.className = 'gs-crumbbar';
    h.innerHTML = '<div class="wrap bar">' + crumbs(parts) +
      '<form class="gs-search" action="search.html" role="search"><label for="gs-q" class="visually-hidden">Search articles</label>' + ICON.search +
      '<input id="gs-q" name="q" type="search" placeholder="Search articles…"></form></div>';
  }
  function workflowCard(w) {
    return '<a class="card" href="' + wfUrl(w.id) + '"><span class="eyebrow goal">' + esc(w.group) + '</span><span class="title">' + esc(w.t) + '</span><span class="foot"><span>⏱ ' + esc(w.time) + '</span><span>' + esc(RH.ROLES[w.role].name) + '</span><span>' + w.steps.length + ' steps</span></span></a>';
  }
  function articleRow(a, side) {
    return '<a href="' + artUrl(a.id) + '">' + typeChip(a.type) + '<span class="grow">' + esc(a.t) + '</span><span class="side">' + esc(side || (a.mins + ' min')) + '</span></a>';
  }
  function flowCards(mid) {
    var outs = RH.LINKS.filter(function (l) { return l[0] === mid; }), ins = RH.LINKS.filter(function (l) { return l[1] === mid; });
    return {
      outs: outs.map(function (l) { return '<a class="flow-card" href="' + modUrl(l[1]) + '"><b>' + esc(MOD[l[1]].name) + '</b><span>' + esc(l[2]) + '</span></a>'; }).join(''),
      ins: ins.map(function (l) { return '<a class="flow-card in" href="' + modUrl(l[0]) + '"><b>' + esc(MOD[l[0]].name) + '</b><span>' + esc(l[2]) + '</span></a>'; }).join('')
    };
  }

  // ---------- pages ----------
  var pages = {};

  pages.home = function () {
    $('#hub-guide-count').textContent = RH.ORDER.length + ' guides';
    $('#home-faqs').innerHTML = RH.FAQS.map(function (f) { return '<a href="' + artUrl(f[1]) + '"><span class="grow">' + esc(f[0]) + '</span><span aria-hidden="true" style="color:#296794">→</span></a>'; }).join('');
    var gs = moduleArticles('getting-started');
    if (gsComplete()) {
      var st = $('#gs-status');
      st.classList.add('done'); st.textContent = '✓'; st.setAttribute('aria-label', 'Completed');
      $('#gs-heading').textContent = 'Setup complete';
      $('#gs-go').textContent = 'Revisit the setup series →';
    }
    $('#gs-chips').innerHTML = gs.slice(1, 4).map(function (a) { return '<a class="chip" href="' + artUrl(a.id) + '">' + esc(a.t) + '</a>'; }).join('') + '<span class="chip">+' + (gs.length - 4) + ' more</span>';
  };

  pages.guides = function () {
    var feats = RH.MODULES.filter(function (m) { return m.cat === 'features'; });
    var cfg = RH.MODULES.filter(function (m) { return m.cat === 'configuration'; });
    var cfgCount = cfg.reduce(function (n, m) { return n + moduleArticles(m.id).length; }, 0);
    var cats = [
      { lens: 'Start here', goal: 1, n: moduleArticles('getting-started').length + ' guides', name: 'Getting Started', href: modUrl('getting-started'), desc: 'A 9-step series from a new account to filling up your dashboard.', items: moduleArticles('getting-started').slice(0, 4).map(function (a) { return [a.t, artUrl(a.id)]; }), cta: 'Start the series' },
      { lens: 'By goal', goal: 1, n: RH.WORKFLOWS.length + ' workflows', name: 'Workflows', href: 'workflows.html', desc: 'Tell us what you’re trying to accomplish. We’ll walk you across every module it touches.', items: ['prepare-for-an-audit', 'prepare-a-trainer-for-delivery', 'validate-a-unit', 'complaint-to-improvement'].map(function (id) { return [WF[id].t, wfUrl(id)]; }), cta: 'See all ' + RH.WORKFLOWS.length + ' workflows' },
      { lens: 'By screen', n: feats.length + ' modules', name: 'Features', href: 'features.html', desc: 'How each part of RTO Radar works, and where its data shows up elsewhere.', items: ['qms', 'cir', 'workforce', 'risk'].map(function (id) { return [MOD[id].name, modUrl(id)]; }), cta: 'See all ' + feats.length + ' modules' },
      { lens: 'By role', n: '4 roles', name: 'Roles', href: 'roles.html', desc: 'Where to start based on what your role can see and do.', items: Object.keys(RH.ROLES).map(function (r) { return [RH.ROLES[r].name, 'roles.html?r=' + r]; }), cta: 'Find your role' },
      { lens: 'Settings', n: cfgCount + ' guides', name: 'Configuration', href: 'features.html#configuration', desc: 'Organisation-wide settings that change how scores, dashboards and reminders behave.', items: ['connect-axcelerate', 'mfa-set-organisation', 'cust-compliance-health', 'cust-frequency-bands'].map(function (id) { return [A[id].t, artUrl(id)]; }), cta: 'See all ' + cfgCount + ' guides' },
      { lens: 'Fix a problem', n: moduleArticles('troubleshooting').length + ' guides', name: 'Troubleshooting', href: modUrl('troubleshooting'), desc: 'Start from what you’re seeing. Each fix points to the setting that resolves it.', items: moduleArticles('troubleshooting').slice(0, 4).map(function (a) { return [a.t, artUrl(a.id)]; }), cta: 'See all fixes' }
    ];
    $('#cats').innerHTML = cats.map(function (c) {
      return '<div class="card cat-card"><div class="top"><div class="row1"><span class="eyebrow' + (c.goal ? ' goal' : '') + '">' + c.lens + '</span><span class="muted" style="font-size:.85rem">' + c.n + '</span></div>' +
        '<h2 style="font-size:1.5rem"><a href="' + c.href + '" style="color:inherit;text-decoration:none">' + esc(c.name) + '</a></h2><p class="muted">' + esc(c.desc) + '</p></div>' +
        '<div class="items">' + c.items.map(function (i) { return '<a href="' + i[1] + '"><span>' + esc(i[0]) + '</span><span aria-hidden="true" style="color:#4793c2">→</span></a>'; }).join('') + '</div>' +
        '<a class="cta" href="' + c.href + '">' + esc(c.cta) + ' →</a></div>';
    }).join('');
  };

  pages.workflows = function () {
    crumbBar([['RadarHelp', 'index.html'], ['Help Guides', 'guides.html'], ['Workflows']]);
    var groups = {};
    RH.WORKFLOWS.forEach(function (w) { (groups[w.group] = groups[w.group] || []).push(w); });
    $('#wf-groups').innerHTML = Object.keys(groups).map(function (g) {
      var info = RH.WF_GROUPS[g] || {}, list = groups[g];
      return groupCard(info.icon, list.length + ' workflow' + (list.length === 1 ? '' : 's'), esc(g), info.desc,
        list.map(function (w) { return [w.t, wfUrl(w.id)]; }));
    }).join('');
  };

  // Card used on the Workflows and Features pages: icon tile, count, heading, description, list of links
  var CHEV = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  function groupCard(icon, count, heading, desc, items, more) {
    return '<section class="wf-group"><div class="top"><span class="ic">' + (TILE_ICON[icon] ? tileIcon(TILE_ICON[icon]) : '') + '</span><span class="n">' + count + '</span></div>' +
      '<h2>' + heading + '</h2>' + (desc ? '<p>' + esc(desc) + '</p>' : '') +
      '<ul>' + items.map(function (i) { return '<li><a href="' + i[1] + '">' + CHEV + '<span>' + esc(i[0]) + '</span></a></li>'; }).join('') + '</ul>' +
      (more ? '<a class="more" href="' + more[1] + '">' + esc(more[0]) + ' →</a>' : '') + '</section>';
  }
  function tileIcon(paths) { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>'; }
  var TILE_ICON = {
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v5"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    grid: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    cycle: '<path d="M20 11a8 8 0 0 0-14.9-3.9L4 9"/><path d="M4 4v5h5"/><path d="M4 13a8 8 0 0 0 14.9 3.9L20 15"/><path d="M20 20v-5h-5"/>',
    userplus: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M19 8v6M16 11h6"/>',
    alert: '<path d="M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
    plug: '<path d="M9 2v6M15 2v6"/><path d="M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'
  };
  var MODULE_ICON = { dashboard: 'grid', qms: 'file', programs: 'cap', cir: 'cycle', workforce: 'users', users: 'userplus', risk: 'alert', feedback: 'chat', events: 'calendar', pd: 'award', integrations: 'plug', security: 'lock', custom: 'sliders' };

  pages.features = function () {
    crumbBar([['RadarHelp', 'index.html'], ['Help Guides', 'guides.html'], ['Features']]);
    function tile(m) {
      var arts = moduleArticles(m.id), n = arts.length;
      return groupCard(MODULE_ICON[m.id], n + ' guide' + (n === 1 ? '' : 's'),
        '<a href="' + modUrl(m.id) + '">' + esc(m.name) + '</a>' + (m.ai ? ' <span class="badge-ai">AI</span>' : ''), m.blurb,
        arts.slice(0, 4).map(function (a) { return [a.t, artUrl(a.id)]; }),
        n > 4 ? ['All ' + n + ' guides', modUrl(m.id)] : null);
    }
    $('#feat-grid').innerHTML = RH.MODULES.filter(function (m) { return m.cat === 'features'; }).map(tile).join('');
    $('#cfg-grid').innerHTML = RH.MODULES.filter(function (m) { return m.cat === 'configuration'; }).map(tile).join('');
  };

  // Getting Started: one page per step (feature.html?m=getting-started&s=<step id>). A fixed, scrollable
  // step list on the left; on each page the step's instructions as numbered steps with screenshots,
  // then previous/next, feedback and the Ideas Forum. The FAQs get a page of their own at the end.
  function seriesUrl(m, s) { return 'feature.html?m=' + encodeURIComponent(m.id) + (s ? '&s=' + encodeURIComponent(s) : ''); }
  function seriesPage(m) {
    var steps = moduleArticles(m.id), faqs = m.faqs || [];
    // Links from the old one-page layout (#gs-…) go to that step's own page
    var hashId = location.hash.slice(1);
    if (!param('s') && A[hashId] && A[hashId].module === m.id) { location.replace(seriesUrl(m, hashId)); return; }

    // An Overview step (How to Use This Guide) is an unnumbered introduction; numbering starts after it
    var total = steps.filter(function (a) { return a.type !== 'Overview'; }).length, k = 0;
    var list = steps.map(function (a) { var intro = a.type === 'Overview'; return { id: a.id, t: a.t, a: a, intro: intro, n: intro ? 0 : ++k }; });
    if (faqs.length) list.push({ id: 'faq', t: 'Frequently asked questions' });
    var idx = 0;
    list.forEach(function (p, i) { if (p.id === param('s')) idx = i; });
    var cur = list[idx], prev = list[idx - 1], next = list[idx + 1];
    document.title = cur.t + ' · ' + m.name + ' · RadarHelp';
    // Reaching the last step's page completes the series (the landing page shows a check)
    if (cur.a && cur.n === total && !gsComplete()) store('gs.complete', true);

    crumbBar([['RadarHelp', 'index.html'], ['Help Guides', 'guides.html'], [m.name, seriesUrl(m)], [cur.t]]);
    $('#body').classList.remove('wrap'); // the step list sits against the left edge of the page

    var nav = '<button type="button" class="gs2-toggle" aria-expanded="false" aria-controls="gs2-nav">' +
        '<span>' + (cur.a && !cur.intro ? 'Step ' + cur.n + ' of ' + total + ': ' : '') + esc(cur.t) + '</span><span class="chev" aria-hidden="true">▾</span></button>' +
      '<nav class="gs2-nav" id="gs2-nav" aria-label="' + esc(m.name) + '"><span class="gs2-group">' + esc(m.name) + '</span><ol>' +
      list.map(function (p, i) {
        return '<li><a href="' + seriesUrl(m, p.id) + '"' + (i === idx ? ' aria-current="page"' : '') + '>' +
          '<span class="n">' + (p.intro ? 'i' : p.a ? p.n : '?') + '</span><span>' + esc(p.t) + '</span></a></li>';
      }).join('') + '</ol></nav>';

    var content, afterPager = ''; // afterPager: shown below Previous/Next (related articles on the FAQ page)
    if (cur.a) {
      var a = cur.a;
      // Ghost sub-headings belonged to the old one-page sidebar; on a page of its own they aren't needed
      var body = a.body ? a.body.replace(/<h2 class="ghost">[\s\S]*?<\/h2>/g, '').replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '<h3>$1</h3>') :
        '<div class="draft"><b>This step is being written.</b><span class="muted">Instructions for “' + esc(a.t) + '” are on their way.</span><a href="page.html?p=contact" style="font-weight:700">Ask the support team →</a></div>';
      // Content under a sub-heading sits one indent further in
      body = body.split(/(?=<h3>)/).map(function (part) {
        var mm = /^(<h3>[\s\S]*?<\/h3>)([\s\S]*)$/.exec(part);
        return mm ? '<div class="gs-sub">' + mm[1] + '<div class="gs-sub-body">' + mm[2] + '</div></div>' : part;
      }).join('');
      content = '<header class="gs2-head"><span class="eyebrow">' + esc(m.name) + (cur.intro ? '' : ' · Step ' + cur.n + ' of ' + total) + '</span>' +
        '<h1>' + esc(a.t) + '</h1>' + (cur.intro ? '<p class="gs2-lede">' + esc(m.blurb) + '</p>' : '') +
        '<div class="gs-meta"><span class="role">' + ICON.user + 'Admin</span><a class="updated" id="gs-updated" href="page.html?p=whats-new">Updated <time></time></a></div></header>' +
        '<section class="gs-step gs2-body"><div class="prose">' + body + '</div></section>';
    } else {
      var related = (m.related || []).filter(function (id) { return A[id]; }).map(function (id) {
        var r = A[id];
        return '<a class="card" href="' + artUrl(id) + '"><span class="eyebrow">' + esc(MOD[r.module].name) + '</span><span class="title" style="font-size:1.1rem">' + esc(r.t) + '</span><span class="foot"><span>' + esc(r.type) + '</span><span>' + r.mins + ' min</span></span></a>';
      }).join('');
      content = '<header class="gs2-head"><span class="eyebrow">' + esc(m.name) + '</span><h1>Frequently asked questions</h1></header>' +
        '<section class="gs-faq">' + faqs.map(function (f) {
          return '<details><summary>' + esc(f[0]) + '</summary><div class="prose">' + f[1] + '</div></details>';
        }).join('') + '</section>' + feedbackBlock(); // rates the whole guide, so it appears once, on the last page
      afterPager = (related ? '<section class="gs2-related"><h2>Related articles</h2><div class="grid grid-2">' + related + '</div></section>' : '');
    }

    var pager = '<nav class="pager gs2-pager" aria-label="Previous and next">' +
      (prev ? '<a href="' + seriesUrl(m, prev.id) + '"><small>← Previous</small><b>' + esc(prev.t) + '</b></a>' : '<span></span>') +
      (next ? '<a class="next" href="' + seriesUrl(m, next.id) + '"><small>Next →</small><b>' + esc(next.t) + '</b></a>' :
        '<a class="next" href="index.html"><small>All done →</small><b>Back to RadarHelp</b></a>') + '</nav>';
    var ideasBox = '<div class="gs-help"><b>Have an idea?</b><span>Suggest improvements and vote on what we build next.</span><a class="btn btn-primary" href="page.html?p=ideas">Discuss in the Ideas Forum</a></div>';

    $('#body').innerHTML = '<div class="gs2"><aside class="gs2-side">' + nav + ideasBox.replace('gs-help', 'gs-help gs2-side-help') + '</aside>' +
      '<div class="gs2-main">' + content + pager + afterPager + ideasBox.replace('gs-help', 'gs-help gs2-main-help') + '</div></div>';

    if ($('#gs-updated')) showUpdated($('#gs-updated time'), m.updated);
    wireMarks();
    wireZoom();
    wireFeedback(m.id);

    // Small screens: the step list folds into a "Step 3 of 10" button above the page
    var tg = $('.gs2-toggle');
    tg.addEventListener('click', function () { var o = $('.gs2-side').classList.toggle('open'); tg.setAttribute('aria-expanded', String(o)); });
    // Ideas Forum box: under the step list when the list still fits the screen with it (no scrolling),
    // otherwise at the end of the page. Rechecked when the window is resized.
    var grid = $('.gs2');
    function placeIdeas() {
      grid.classList.add('ideas-side');
      var sideEl = $('.gs2-side');
      if (window.innerWidth <= 1000 || sideEl.scrollHeight > sideEl.clientHeight + 1) grid.classList.remove('ideas-side');
    }
    placeIdeas();
    window.addEventListener('resize', placeIdeas);

    // Keep the current step in view in the step list
    var on = $('.gs2-nav [aria-current]'), side = $('.gs2-side');
    if (on && side.scrollHeight > side.clientHeight) side.scrollTop = on.offsetTop - side.clientHeight / 3;

    // FAQs slide open and closed. <details> can't animate on its own in every browser, so the
    // answer's height is animated here; with reduced motion the default instant toggle is kept.
    var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.gs-faq details').forEach(function (d) {
      var fb = d.querySelector('.prose'), busy = false;
      d.querySelector('summary').addEventListener('click', function (e) {
        if (still || !fb.animate) return;
        e.preventDefault();
        if (busy) return;
        busy = true;
        var opening = !d.open;
        if (opening) d.open = true; else d.classList.add('closing');
        var shut = { height: '0px', paddingBottom: '0px', opacity: 0 }, full = { height: fb.offsetHeight + 'px', paddingBottom: '16px', opacity: 1 };
        fb.style.overflow = 'hidden';
        var an = fb.animate(opening ? [shut, full] : [full, shut], { duration: 260, easing: 'cubic-bezier(.2,.7,.3,1)' });
        an.onfinish = function () {
          if (!opening) { d.open = false; d.classList.remove('closing'); }
          fb.style.overflow = ''; busy = false;
        };
      });
    });
  }

  pages.feature = function () {
    var m = MOD[param('m')] || MOD.qms;
    document.title = m.name + ' · RadarHelp';
    if (m.series) return seriesPage(m);
    var cat = CATS[m.cat], arts = moduleArticles(m.id), fc = flowCards(m.id);
    var usedIn = RH.WORKFLOWS.filter(function (w) { return w.steps.some(function (s) { return A[s[0]].module === m.id; }); });
    $('#head').innerHTML = '<div class="wrap">' + crumbs([['RadarHelp', 'index.html'], ['Help Guides', 'guides.html']].concat(m.cat === 'features' || m.cat === 'configuration' ? [[cat.name, cat.href], [m.name]] : [[m.name]])) +
      '<h1>' + esc(m.name) + (m.ai ? ' <span class="badge-ai" style="vertical-align:middle;font-size:.9rem">AI</span>' : '') + '</h1><p>' + esc(m.blurb) + '</p></div>';
    var list = '<div class="list">' + arts.map(function (a) { return articleRow(a); }).join('') + '</div>';
    var rail = '';
    if (fc.outs) rail += '<div class="box"><h3>Feeds into</h3>' + fc.outs + '</div>';
    if (fc.ins) rail += '<div class="box"><h3>Fed by</h3>' + fc.ins + '</div>';
    if (usedIn.length) rail += '<div class="box"><h3>Workflows that use this</h3>' + usedIn.map(function (w) { return '<a href="' + wfUrl(w.id) + '">' + esc(w.t) + '</a>'; }).join('') + '</div>';
    if (m.cfg) rail += '<div class="box"><h3>Configured in</h3>' + m.cfg.map(function (id) { return '<a href="' + artUrl(id) + '">' + esc(A[id].t) + '</a>'; }).join('') + '</div>';
    $('#body').innerHTML = '<div class="layout"><div style="display:grid;gap:18px;min-width:0"><h2>Guides in this module</h2>' + list +
      '<div class="band" style="margin-top:12px"><div class="txt"><b>Have an idea for ' + esc(m.name) + '?</b><span class="muted">Suggest it in the Ideas Forum and vote on what we build next.</span></div><a class="btn btn-outline" href="page.html?p=ideas">Ideas Forum</a></div>' +
      '</div><aside class="rail">' + (rail || '<div class="box"><h3>Need a hand?</h3><a href="page.html?p=request">Submit a request</a></div>') + '</aside></div>';
  };

  pages.article = function () {
    var a = A[param('id')] || A['upload-and-map-a-document'];
    var m = MOD[a.module], cat = CATS[m.cat];
    // Old links to a Getting Started guide go to its section on the series page
    if (m.series) { location.replace(artUrl(a.id)); return; }
    document.title = a.t + ' · RadarHelp';
    var w = WF[param('wf')], stepIdx = -1;
    if (w) w.steps.forEach(function (s, i) { if (stepIdx < 0 && s[0] === a.id) stepIdx = i; });
    if (w && stepIdx >= 0) {
      var nxt = w.steps[stepIdx + 1];
      $('#wf-banner').innerHTML = '<div class="wf-banner wrap"><b>Step ' + (stepIdx + 1) + ' of ' + w.steps.length + ' in ' + esc(w.t) + '</b>' +
        '<span class="dots" aria-hidden="true">' + w.steps.map(function (s, i) { return '<i class="' + (i <= stepIdx ? 'on' : '') + '"></i>'; }).join('') + '</span>' +
        '<a href="' + wfUrl(w.id) + '">Back to workflow</a>' +
        (nxt ? '<a class="next" href="' + artUrl(nxt[0], w.id) + '">Next step: ' + esc(nxt[1]) + ' →</a>' : '<a class="next" href="' + wfUrl(w.id) + '">Finish the workflow →</a>') + '</div>';
    }
    var trail = [['RadarHelp', 'index.html'], ['Help Guides', 'guides.html']];
    if (m.cat === 'features' || m.cat === 'configuration') trail.push([cat.name, cat.href]);
    trail.push([m.name, modUrl(m.id)]);
    $('#head').innerHTML = '<div class="wrap">' + crumbs(trail) +
      '<div class="eyebrow" style="margin-top:14px">' + esc(a.type) + ' · ' + esc(m.name) + '</div><h1>' + esc(a.t) + '</h1>' +
      '<div class="meta muted"><span>' + ICON.clock + a.mins + ' min</span><span>' + ICON.user + 'For ' + esc(roleNames(a.roles)) + '</span>' + (m.ai ? '<span class="badge-ai">AI-assisted</span>' : '') + '<span>Updated [DATE]</span></div></div>';

    var arts = moduleArticles(m.id), idx = arts.indexOf(a), prev = arts[idx - 1], next = arts[idx + 1];
    var body = a.body || '<div class="draft"><b>This guide is being written.</b><span class="muted">The steps for “' + esc(a.t) + '” are on their way. Everything around it already works: see where it fits below, or ask us directly.</span><a href="page.html?p=request&amp;from=' + encodeURIComponent(a.id) + '" style="font-weight:700">Ask the support team →</a></div>';
    var fixes = a.fixes ? '<h2 id="fix">How to fix it</h2><div class="list">' + a.fixes.map(function (id) { return articleRow(A[id], MOD[A[id].module].name); }).join('') + '</div>' : '';
    var fc = flowCards(m.id);
    var shows = fc.outs ? '<h2 id="where">Where this shows up</h2><div class="grid grid-2" style="gap:12px">' + fc.outs + '</div>' : '';
    var cfg = (m.cfg || []).filter(function (id) { return id !== a.id; });
    var cfgHtml = cfg.length ? '<div class="chips" style="align-items:center"><b style="margin-right:4px">Configured in</b>' + cfg.map(function (id) { return '<a class="chip" href="' + artUrl(id) + '">' + esc(A[id].t) + '</a>'; }).join('') + '</div>' : '';
    var used = workflowsUsing(a.id);
    var pager = '<div class="pager">' + (prev ? '<a href="' + artUrl(prev.id) + '"><small>← Previous in ' + esc(m.name) + '</small><b>' + esc(prev.t) + '</b></a>' : '<span></span>') +
      (next ? '<a class="next" href="' + artUrl(next.id) + '"><small>Next in ' + esc(m.name) + ' →</small><b>' + esc(next.t) + '</b></a>' : '<a class="next" href="' + modUrl(m.id) + '"><small>Back to →</small><b>' + esc(m.name) + '</b></a>') + '</div>';

    var toc = [];
    var tmp = document.createElement('div'); tmp.innerHTML = body;
    tmp.querySelectorAll('h2[id]').forEach(function (h) { toc.push([h.id, h.textContent]); });
    if (a.fixes) toc.push(['fix', 'How to fix it']);
    if (fc.outs) toc.push(['where', 'Where this shows up']);
    var rail = (toc.length ? '<nav class="toc" aria-label="On this page"><span class="panel-label">On this page</span>' + toc.map(function (t) { return '<a href="#' + t[0] + '">' + esc(t[1]) + '</a>'; }).join('') + '</nav>' : '') +
      (used.length ? '<div class="box"><h3>Part of these workflows</h3>' + used.map(function (u) { return '<a href="' + artUrl(a.id, u.w.id) + '">' + esc(u.w.t) + ' · step ' + (u.i + 1) + '</a>'; }).join('') + '</div>' : '') +
      '<div class="box"><h3>Related guides</h3>' + arts.filter(function (x) { return x !== a; }).slice(0, 4).map(function (x) { return '<a href="' + artUrl(x.id) + '">' + esc(x.t) + '</a>'; }).join('') + '</div>' +
      '<a href="page.html?p=ideas" style="font-weight:700;text-decoration:none">Discuss this in the Ideas Forum →</a>';

    $('#body').innerHTML = '<div class="layout"><article class="prose">' + body + fixes + shows + cfgHtml +
      pager + '</article><aside class="rail">' + rail + '</aside></div>';
  };

  pages.workflow = function () {
    var w = WF[param('id')] || WF['prepare-a-trainer-for-delivery'];
    document.title = w.t + ' · RadarHelp';
    var mods = [];
    w.steps.forEach(function (s) { var mm = A[s[0]].module; if (mods.indexOf(mm) < 0) mods.push(mm); });
    function render() {
      var done = wfDone(w.id), cur = -1;
      w.steps.forEach(function (s, i) { if (cur < 0 && done.indexOf(i) < 0) cur = i; });
      var pct = Math.round(done.length / w.steps.length * 100);
      $('#head').innerHTML = '<div class="wrap">' + crumbs([['RadarHelp', 'index.html'], ['Help Guides', 'guides.html'], ['Workflows', 'workflows.html'], [w.group]]) +
        '<div class="eyebrow goal" style="margin-top:14px">Workflow · ' + esc(w.group) + '</div><h1>' + esc(w.t) + '</h1>' +
        '<div class="meta"><span>' + ICON.clock + '<b>Est. time</b> ' + esc(w.time) + '</span><span>' + ICON.user + '<b>Recommended</b> ' + esc(RH.ROLES[w.role].name) + '</span><span>' + ICON.pin + '<b>Applies to</b> ' + esc(mods.map(function (x) { return MOD[x].name; }).join(' · ')) + '</span></div>' +
        '<div class="progress"><div class="track" role="progressbar" aria-valuemin="0" aria-valuemax="' + w.steps.length + '" aria-valuenow="' + done.length + '" aria-label="Workflow progress"><div class="fill" style="width:' + pct + '%"></div></div><b>' + done.length + ' of ' + w.steps.length + ' done</b></div></div>';
      var steps = w.steps.map(function (s, i) {
        var a = A[s[0]], st = done.indexOf(i) >= 0 ? 'done' : i === cur ? 'current' : '';
        return '<div class="step ' + st + '" id="step-' + (i + 1) + '"><span class="num">' + (st === 'done' ? '✓' : i + 1) + '</span><div class="body">' +
          '<div class="head"><b>' + esc(s[1]) + '</b><span class="mod">' + esc(MOD[a.module].name) + '</span></div>' +
          '<span class="muted">Guide: ' + esc(a.t) + ' · ' + a.mins + ' min</span>' +
          (st === 'current' && a.body ? '<div class="prose" style="font-size:1rem;margin-top:8px">' + a.body + '</div>' : '') +
          '<div class="actions">' + (st === 'done' ? '<button class="btn btn-outline" type="button" data-undo="' + i + '">Undo</button>' : '<button class="btn ' + (st === 'current' ? 'btn-primary' : 'btn-outline') + '" type="button" data-done="' + i + '">Mark step as done</button>') +
          '<a href="' + artUrl(a.id, w.id) + '">Open the full guide →</a></div></div></div>';
      }).join('');
      var idx = RH.WORKFLOWS.indexOf(w), nextW = RH.WORKFLOWS[(idx + 1) % RH.WORKFLOWS.length];
      var related = RH.WORKFLOWS.filter(function (x) { return x.group === w.group && x !== w; }).slice(0, 1)[0] || RH.WORKFLOWS[(idx + 2) % RH.WORKFLOWS.length];
      $('#body').innerHTML = '<div class="layout"><div style="display:grid;gap:14px;min-width:0">' +
        '<div class="req"><h3>Before you start</h3><ul>' + w.req.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></div>' + steps +
        (done.length === w.steps.length ? '<div class="callout tip"><b>Done</b><span>You’ve completed every step. Nice work.</span></div>' : '') +
        '<div class="pager"><a href="' + wfUrl(related.id) + '"><small>Related workflow</small><b>' + esc(related.t) + '</b></a><a class="next" href="' + wfUrl(nextW.id) + '"><small>Next workflow →</small><b>' + esc(nextW.t) + '</b></a></div></div>' +
        '<aside class="rail"><div class="box"><h3>In this workflow</h3>' + w.steps.map(function (s, i) { var d = done.indexOf(i) >= 0; return '<a href="#step-' + (i + 1) + '" style="' + (i === cur ? 'color:#002e5c;font-weight:700' : d ? 'color:#64748b' : '') + '">' + (d ? '✓ ' : i === cur ? '● ' : '○ ') + esc(s[1]) + '</a>'; }).join('') + '</div>' +
        '<div class="box"><h3>Modules in this workflow</h3><div class="chips">' + mods.map(function (x) { return '<a class="chip" href="' + modUrl(x) + '">' + esc(MOD[x].name) + '</a>'; }).join('') + '</div></div>' +
        '<div class="card dark" style="padding:18px"><span class="badge-live" style="align-self:flex-start">WEBINAR</span><b style="font-family:var(--font-display)">[WEBINAR ON THIS TOPIC]</b><a class="go" href="page.html?p=webinars" style="text-decoration:none">See webinars →</a></div></aside></div>';
    }
    render();
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-done],[data-undo]'); if (!b) return;
      var d = wfDone(w.id);
      if (b.hasAttribute('data-done')) { var i = +b.getAttribute('data-done'); if (d.indexOf(i) < 0) d.push(i); }
      else { var j = +b.getAttribute('data-undo'); d = d.filter(function (x) { return x !== j; }); }
      store('wf.' + w.id, d); render();
    });
  };

  pages.roles = function () {
    var cur = RH.ROLES[param('r')] ? param('r') : 'coord';
    function render() {
      var r = RH.ROLES[cur], hub = RH.ROLE_HUBS[cur];
      var all = RH.ORDER.filter(function (id) { return A[id].roles.indexOf(cur) >= 0; }).length;
      $('#role-switch').innerHTML = Object.keys(RH.ROLES).map(function (k) { return '<button type="button" data-role="' + k + '" aria-pressed="' + (k === cur) + '">' + esc(RH.ROLES[k].name) + '</button>'; }).join('');
      $('#role-body').innerHTML = '<p class="muted" style="font-size:1.1rem">' + esc(r.desc) + '</p>' +
        '<section class="section" style="padding-top:28px"><div class="section-head"><h2>Recommended workflows</h2></div><div class="grid grid-4">' + hub.workflows.map(function (id) { return workflowCard(WF[id]); }).join('') + '</div></section>' +
        '<section class="section"><div class="section-head"><h2>Start with these guides</h2><a href="search.html?role=' + cur + '">All ' + all + ' guides for ' + esc(r.name) + 's →</a></div><div class="list">' + hub.start.map(function (id) { return articleRow(A[id], MOD[A[id].module].name); }).join('') + '</div></section>';
      try { history.replaceState(null, '', 'roles.html?r=' + cur); } catch (e) {}
    }
    render();
    $('#role-switch').addEventListener('click', function (e) { var b = e.target.closest('[data-role]'); if (b) { cur = b.getAttribute('data-role'); render(); } });
  };

  pages.search = function () {
    var q = (param('q') || '').trim(), role = param('role');
    var input = $('#q'); input.value = q;
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    function score(text) { var t = text.toLowerCase(), s = 0; words.forEach(function (w) { if (t.indexOf(w) >= 0) s += 1; }); return s; }
    function hi(text) { var h = esc(text); words.forEach(function (w) { h = h.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); }); return h; }
    var results = [];
    if (role && RH.ROLES[role]) {
      $('#s-title').textContent = 'Guides for ' + RH.ROLES[role].name + 's';
      RH.ORDER.forEach(function (id) { if (A[id].roles.indexOf(role) >= 0) results.push({ kind: 'a', a: A[id], s: 1 }); });
    } else if (words.length) {
      RH.WORKFLOWS.forEach(function (w) { var s = score(w.t + ' ' + w.group) * 2; if (s) results.push({ kind: 'w', w: w, s: s + 1 }); });
      RH.MODULES.forEach(function (m) { var s = score(m.name + ' ' + m.blurb); if (s) results.push({ kind: 'm', m: m, s: s }); });
      RH.ORDER.forEach(function (id) { var a = A[id]; var s = score(a.t) * 2 + score(MOD[a.module].name); if (s) results.push({ kind: 'a', a: a, s: s }); });
      results.sort(function (x, y) { return y.s - x.s; });
      $('#s-title').textContent = results.length + ' result' + (results.length === 1 ? '' : 's') + ' for “' + q + '”';
    } else { $('#s-title').textContent = 'Search RadarHelp'; }
    $('#results').innerHTML = results.length ? '<div class="list">' + results.slice(0, 40).map(function (r) {
      if (r.kind === 'w') return '<a href="' + wfUrl(r.w.id) + '"><span class="chip type fix">Workflow</span><span class="grow">' + hi(r.w.t) + '</span><span class="side">' + r.w.steps.length + ' steps</span></a>';
      if (r.kind === 'm') return '<a href="' + modUrl(r.m.id) + '"><span class="chip type">Module</span><span class="grow">' + hi(r.m.name) + '</span><span class="side">' + moduleArticles(r.m.id).length + ' guides</span></a>';
      return '<a href="' + artUrl(r.a.id) + '">' + typeChip(r.a.type) + '<span class="grow">' + hi(r.a.t) + '</span><span class="side">' + esc(MOD[r.a.module].name) + '</span></a>';
    }).join('') + '</div>' : (words.length ? '<div class="band" style="margin-top:0"><div class="txt"><b>No guides match “' + esc(q) + '” yet.</b><span class="muted">Try fewer words, browse the Help Guides, or ask us directly.</span></div><a class="btn btn-outline" href="guides.html">Help Guides</a><a class="btn btn-primary" href="page.html?p=request">Submit a request</a></div>' : '');
  };

  pages.page = function () {
    var P = {
      videos: ['Video Library', 'Short walkthroughs of every screen, in playlists by module and by workflow.'],
      webinars: ['Webinars', 'Live sessions with the RTO Radar team, and recordings linked to the guides they cover.'],
      ideas: ['Ideas Forum', 'Suggest features and vote on what we build next.'],
      'whats-new': ['What’s New', 'Release notes. Each entry links to the guides it changed.'],
      newsletter: ['Newsletter', 'A monthly round-up of new features, guides and webinars.'],
      socials: ['Socials', 'Follow RTO Radar for tips and updates.'],
      contact: ['Contact us', 'Talk to the RTO Radar support team.'],
      request: ['Submit a request', 'Tell us what you were trying to do and we’ll get back to you.']
    };
    var key = P[param('p')] ? param('p') : 'webinars', p = P[key];
    document.title = p[0] + ' · RadarHelp';
    $('#head').innerHTML = '<div class="wrap">' + crumbs([['RadarHelp', 'index.html'], [p[0]]]) + '<h1>' + esc(p[0]) + '</h1><p>' + esc(p[1]) + '</p></div>';
    var body;
    if (key === 'request' || key === 'contact') {
      var from = A[param('from')];
      body = '<form id="req-form" class="card" style="max-width:720px;gap:16px" novalidate>' +
        (from ? '<div class="callout note"><b>About</b><span>' + esc(from.t) + '</span></div>' : '') +
        '<label for="rq-name"><b>Your name</b></label><input id="rq-name" required style="font:inherit;padding:12px;border:1px solid #64748b;border-radius:8px">' +
        '<label for="rq-email"><b>Work email</b></label><input id="rq-email" type="email" required style="font:inherit;padding:12px;border:1px solid #64748b;border-radius:8px">' +
        '<label for="rq-what"><b>What were you trying to do?</b></label><textarea id="rq-what" rows="5" required style="font:inherit;padding:12px;border:1px solid #64748b;border-radius:8px"></textarea>' +
        '<button class="btn btn-primary" type="submit" style="justify-self:start">Send request</button>' +
        '<p class="muted" id="rq-msg" role="status"></p></form>';
    } else if (key === 'webinars') {
      body = '<div class="grid grid-2"><div class="card dark"><span class="badge-live" style="align-self:flex-start">NEXT LIVE</span><span class="title">[WEBINAR TOPIC]</span><span class="muted">[DATE] · [TIME] AEST · 45 min</span><a class="btn btn-accent" href="#" style="align-self:flex-start">Save my seat</a></div>' +
        '<div class="card"><span class="eyebrow">Recordings</span><span class="title">Past sessions</span><span class="muted">Each recording will link to the guides and workflows it covers.</span></div></div>';
    } else {
      body = '<div class="draft"><b>' + esc(p[0]) + ' is coming soon.</b><span class="muted">This page is a placeholder in the prototype.</span><a href="guides.html" style="font-weight:700">Browse the Help Guides →</a></div>';
    }
    $('#body').innerHTML = '<div style="padding-top:32px">' + body + '</div>';
    var f = $('#req-form');
    if (f) f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { $('#rq-msg').textContent = 'Please fill in your name, a valid email and what you were trying to do.'; return; }
      $('#rq-msg').textContent = 'Prototype: this form isn’t connected to the support desk yet, so nothing was sent.';
    });
  };

  // ---------- boot ----------
  document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.getAttribute('data-page');
    var nav = { guides: 'guides', workflows: 'guides', workflow: 'guides', features: 'guides', feature: 'guides', article: 'guides', roles: 'guides', home: 'home' }[page];
    if (page === 'page') nav = { videos: 'videos', webinars: 'webinars', ideas: 'ideas', 'whats-new': 'new' }[param('p')] || '';
    $('#site-header').outerHTML = header(nav);
    $('#site-footer').outerHTML = footer();
    var mb = $('.menu-btn');
    mb.addEventListener('click', function () { var n = $('#main-nav'); var o = n.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); });
    if ($('#news-form')) $('#news-form').addEventListener('submit', function (e) { e.preventDefault(); toast('Prototype: newsletter sign-up isn’t connected yet.'); });
    if (pages[page]) pages[page]();
    if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
  });
})();
