/* THE LEGACY OF TEMUR — site engine.
 * Renders every section from content/*.js, then adds scroll choreography.
 * Content stays readable without animation: with reduced motion or if GSAP
 * fails to load, sections fall back to a calm stacked layout. */
(function () {
  'use strict';
  var C = window.LEGACY || {};
  var S = C.site, TOUR = C.tour || {}, PH = C.photos || {};
  var LANGS = S.languages;
  var lang = pickLang();
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = false;
  var introDone = false, introTl = null;
  var main = document.getElementById('main');
  var root = document.documentElement;

  /* ---------- helpers ---------- */
  function pickLang() {
    var q = (location.search.match(/[?&]lang=(\w+)/) || [])[1];
    if (q && S.languages.indexOf(q) > -1) return q;
    try { var s = localStorage.getItem('lot-lang'); if (s && S.languages.indexOf(s) > -1) return s; } catch (e) {}
    return S.defaultLang;
  }
  function t(v) {
    if (v == null) return '';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    return v[lang] != null ? v[lang] : (v.ru != null ? v.ru : '');
  }
  function plain(v) { return t(v).replace(/<br\s*\/?>/g, ' '); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function get(path) { return path.split('.').reduce(function (o, k) { return o && o[k]; }, S); }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* Photo keys that may be missing fall back to a related real photo. */
  /* Only same-subject fallbacks: never show one monument under another's name. */
  var FALLBACK = {
    gur_eve: ['gur_day', 'gur_dome'], gur_day: ['gur_eve', 'gur_dome'], gur_in: [],
    ulug: ['samarqand_0'], shah_wide: ['shah_street', 'shah_dusk'], ppl_plov: ['ppl_palov']
  };
  /* The opening image: Gur-e Amir when available, otherwise a real Samarkand view. */
  var INTRO_KEYS = ['gur_eve', 'gur_day', 'samarqand_7'];
  function introKey() { for (var i = 0; i < INTRO_KEYS.length; i++) if (PH[INTRO_KEYS[i]]) return INTRO_KEYS[i]; return 'gur_eve'; }
  function resolve(key) {
    if (PH[key]) return key;
    var f = FALLBACK[key] || [];
    for (var i = 0; i < f.length; i++) if (PH[f[i]]) return f[i];
    return null;
  }
  function pic(key, opt) {
    opt = opt || {};
    var k = resolve(key);
    if (!k) return '<div class="media-missing"><span>' + esc(t(S.ui.placeholder)) + '</span></div>';
    var p = PH[k];
    var srcset = p.w.map(function (w) { return 'img/' + k + '-' + w + '.webp ' + w + 'w'; }).join(', ');
    var big = p.w[p.w.length - 1] > p.w[0] ? p.w[0] : p.w[0];
    var src = 'img/' + k + '-' + p.w[0] + '.webp';
    return '<img src="' + src + '" srcset="' + srcset + '" sizes="' + (opt.sizes || '100vw') + '" alt="' + esc(plain(p.alt)) + '"' +
      (opt.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"' +
      (opt.cls ? ' class="' + opt.cls + '"' : '') + ' style="object-position:' + (p.pos || '50% 50%') + '">';
  }
  function credit(key) {
    var k = resolve(key); if (!k) return '';
    var p = PH[k];
    return '<span class="credit">' + esc(p.by) + ' · ' + esc(p.lic) + '</span>';
  }
  function chapterNum(id) {
    var c = S.chapters.filter(function (x) { return x.id === id; })[0];
    return c && c.num ? t(S.ui.chapter) + ' ' + c.num : '';
  }
  function kicker(id, txt) {
    return '<p class="kicker"><span class="kn">' + esc(chapterNum(id)) + '</span><span class="kl">' + t(txt) + '</span></p>';
  }

  /* ---------- lattice geometry (8-point star and cross, Timurid girih) ---------- */
  function starPath(cx, cy, R) {
    var r = R * 0.765, d = '';
    for (var i = 0; i < 16; i++) {
      var a = Math.PI / 8 * i - Math.PI / 2, rr = i % 2 ? r : R;
      d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(2) + ' ' + (cy + rr * Math.sin(a)).toFixed(2);
    }
    return d + 'Z';
  }
  var STAR = starPath(60, 60, 54);
  function latticeSVG(id) {
    return '<svg class="lattice ' + id + '" aria-hidden="true" preserveAspectRatio="none">' +
      '<defs>' +
      '<pattern id="' + id + '-lines" patternUnits="userSpaceOnUse" width="120" height="120">' +
      '<path d="' + STAR + '" fill="none" stroke="#2457D8" stroke-width="2.2"/>' +
      '<path d="' + starPath(60, 60, 30) + '" fill="none" stroke="#E66A32" stroke-width="1.2" opacity=".8"/>' +
      '<path d="' + starPath(0, 0, 54) + starPath(120, 0, 54) + starPath(0, 120, 54) + starPath(120, 120, 54) + '" fill="none" stroke="#18A6A0" stroke-width="1.2" opacity=".6"/>' +
      '</pattern>' +
      '<pattern id="' + id + '-solid" patternUnits="userSpaceOnUse" width="120" height="120">' +
      '<path d="M-1 -1H121V121H-1Z' + STAR + '" fill="#080A0F" fill-rule="evenodd"/>' +
      '<path d="' + STAR + '" fill="none" stroke="#2457D8" stroke-width="1.6"/>' +
      '</pattern>' +
      '<radialGradient id="' + id + '-fade"><stop offset=".6" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
      '<mask id="' + id + '-mask" maskUnits="userSpaceOnUse"><circle class="lmask" r="0" fill="url(#' + id + '-fade)"/></mask>' +
      '</defs>' +
      '<rect class="llines" width="100%" height="100%" fill="url(#' + id + '-lines)" mask="url(#' + id + '-mask)"/>' +
      '<rect class="lsolid" width="100%" height="100%" fill="url(#' + id + '-solid)"/>' +
      '</svg>';
  }

  /* ---------- sections ---------- */
  function renderPrologue() {
    var I = S.intro, ik = introKey();
    var place = /^gur/.test(ik) ? t(I.place) : (PH[ik] ? t(PH[ik].alt) : '');
    return '<section id="prologue" class="ch prologue" data-ch="prologue" aria-label="' + esc(plain(I.title)) + '">' +
      '<div class="pro-stage">' +
      '<div class="pro-portrait"><img src="img/temur-1122.webp" srcset="img/temur-700.webp 700w, img/temur-1122.webp 1122w" sizes="(max-width:760px) 100vw, 60vw" alt="' + esc(t(S.man.portraitNote)) + '" fetchpriority="high">' +
      '<div class="pro-glow" aria-hidden="true"><img src="img/temur-1122.webp" alt=""></div><div class="pro-wash" aria-hidden="true"></div></div>' +
      '<div class="pro-gur">' + pic(ik, { eager: true, cls: 'pro-gur-img' }) + '</div>' +
      latticeSVG('lt') +
      '<p class="pro-line l1">' + esc(t(I.line1)) + '</p>' +
      '<p class="pro-line l2">' + esc(t(I.line2)) + '</p>' +
      '<p class="pro-line l3">' + esc(t(I.line3)) + '</p>' +
      '<div class="pro-title">' +
      '<p class="pro-place">' + esc(place) + '</p>' +
      '<h1><span class="h-legacy">' + esc(t(I.title)) + '</span><span class="h-country">' + esc(t(I.country)) + '</span></h1>' +
      '<p class="pro-motto">' + esc(t(I.motto)) + '<small>' + esc(t(I.mottoNote)) + '</small></p>' +
      '</div>' +
      '<a class="scroll-cue" href="#man"><span>' + esc(t(S.ui.scroll)) + '</span><i aria-hidden="true"></i></a>' +
      '<button class="skip" type="button">' + esc(t(S.ui.skip)) + '</button>' +
      '<span class="pro-credit">' + credit(ik) + '</span>' +
      '</div></section>';
  }

  function renderMan() {
    var M = S.man;
    var moments = M.moments.filter(function (m) { return resolve(m.image) || m.fit !== 'contain'; });
    var n = moments.length;
    var bgs = '<div class="mn-bg is-on" data-i="0"><div class="mn-portrait">' + pic('temur_think', { sizes: '50vw' }) + '</div></div>';
    var txt = '<div class="mn-step is-on" data-i="0"><span class="mn-mark mn-mark-title">' + kicker('man', S.chapters[1].title) + '</span>' +
      '<h2 class="display">' + t(M.title) + '</h2><p class="lead">' + esc(t(M.lead)) + '</p><p class="note">' + esc(t(M.portraitNote)) + '</p></div>';
    moments.forEach(function (m, i) {
      var isPortrait = /^temur/.test(m.image), has = !!resolve(m.image);
      bgs += '<div class="mn-bg' + (isPortrait ? ' portrait' : '') + (m.fit === 'contain' ? ' contain' : '') + (has ? '' : ' void') + '" data-i="' + (i + 1) + '">' +
        (has ? (isPortrait ? '<div class="mn-portrait">' + pic(m.image, { sizes: '50vw' }) + '</div>' : pic(m.image)) : '') + '</div>';
      var mark = t(m.mark);
      txt += '<div class="mn-step" data-i="' + (i + 1) + '">' +
        '<span class="mn-mark' + (/^\d+$/.test(mark) ? ' num' : ' word') + '">' + esc(mark) + '</span>' +
        '<h3 class="mn-head">' + esc(t(m.head)) + '</h3><p class="mn-text">' + esc(t(m.text)) + '</p>' +
        (has && !isPortrait ? '<p class="mn-credit">' + credit(m.image) + '</p>' : '') + '</div>';
    });
    var ticks = '';
    for (var i = 0; i <= n; i++) ticks += '<i data-i="' + i + '"></i>';
    return '<section id="man" class="ch man dark" data-ch="man">' +
      '<div class="mn-track" style="--steps:' + (n + 1) + '"><div class="mn-sticky">' +
      '<div class="mn-bgs">' + bgs + '</div><div class="mn-shade" aria-hidden="true"></div>' +
      '<div class="mn-steps">' + txt + '</div><div class="mn-ticks" aria-hidden="true">' + ticks + '</div>' +
      '</div></div></section>';
  }

  function renderWalls() {
    var W = S.walls;
    var mons = W.monuments;
    var layers = mons.map(function (m, i) {
      return '<article class="ws-layer" data-i="' + i + '" aria-label="' + esc(t(m.name)) + '">' +
        '<div class="ws-img' + (resolve(m.image) ? '' : ' ws-missing') + '">' + (resolve(m.image) ? pic(m.image) : '<span class="ph-tag">' + esc(t(S.ui.photoSoon)) + '</span>') + '</div><div class="ws-shade" aria-hidden="true"></div>' +
        '<div class="ws-text">' +
        '<p class="loc">' + esc(t(m.label)) + '</p>' +
        '<h3 class="ws-name">' + esc(t(m.name)) + '</h3>' +
        '<p class="ws-head">' + esc(t(m.head)) + '</p>' +
        '<p class="ws-desc">' + esc(t(m.text)) + '</p>' +
        '<button class="explore" type="button" data-explore="' + esc(m.id) + '"><span>' + esc(t(S.ui.explore)) + '</span><i aria-hidden="true"></i></button>' +
        '</div><p class="ws-credit">' + credit(m.image) + '</p></article>';
    }).join('');
    return '<section id="walls" class="ch walls dark" data-ch="walls">' +
      '<header class="ch-open walls-open">' +
      '<div class="wo-portrait">' + pic('temur_portal', { sizes: '(max-width:760px) 90vw, 42vw' }) + '</div>' +
      '<div class="wo-text">' + kicker('walls', W.kicker) + '<h2 class="display">' + t(W.title) + '</h2><p class="lead">' + esc(t(W.lead)) + '</p></div>' +
      '</header>' +
      '<div class="ws-track" style="--n:' + mons.length + '"><div class="ws-sticky">' + layers + '</div></div>' +
      '</section>';
  }

  function renderDetail() {
    var D = S.detail;
    var items = D.items.filter(function (d) { return resolve(d.image); });
    var layers = items.map(function (d, i) {
      return '<figure class="dt-layer" data-i="' + i + '"><div class="dt-img">' + pic(d.image) + '</div>' +
        '<figcaption><span class="dt-n">' + String(i + 1).padStart(2, '0') + '</span><strong>' + esc(t(d.head)) + '</strong><span class="dt-t">' + esc(t(d.text)) + '</span>' + credit(d.image) + '</figcaption></figure>';
    }).join('');
    return '<section id="detail" class="ch detail dark" data-ch="detail">' +
      '<header class="ch-open detail-open">' + kicker('detail', D.kicker) + '<h2 class="display">' + t(D.title) + '</h2></header>' +
      '<div class="dt-track" style="--n:' + items.length + '"><div class="dt-sticky">' + layers +
      '<div class="dt-bridge"><svg class="dt-girih" viewBox="0 0 600 600" aria-hidden="true"><defs><pattern id="dtp" patternUnits="userSpaceOnUse" width="120" height="120">' +
      '<path d="' + STAR + '" fill="none" stroke="#F2E9DA" stroke-width="1.4"/><path d="' + starPath(60, 60, 30) + '" fill="none" stroke="#18A6A0" stroke-width="1"/></pattern></defs>' +
      '<rect width="600" height="600" fill="url(#dtp)"/></svg><p class="dt-bridge-text">' + esc(t(D.bridge)) + '</p></div>' +
      '</div></div></section>';
  }

  function renderCountry() {
    var K = S.country;
    var index = K.places.map(function (p, i) {
      return '<li><a href="#place-' + p.id + '" data-place="' + p.id + '"><span>' + String(i + 1).padStart(2, '0') + '</span>' + esc(t(p.name)) + '</a></li>';
    }).join('');
    var places = K.places.map(function (p, i) {
      var head = '<p class="pl-n">' + String(i + 1).padStart(2, '0') + ' · ' + esc(t(p.tag)) + '</p><h3 class="pl-name">' + esc(t(p.name)) + '</h3><p class="pl-text">' + esc(t(p.text)) + '</p>';
      var a = p.images[0], b = p.images[1];
      if (p.style === 'monument') {
        return '<article id="place-' + p.id + '" class="place pl-monument" data-place="' + p.id + '"><div class="pl-bg">' + pic(a) + '</div><div class="pl-shade"></div>' +
          '<div class="pl-copy">' + head + '</div><p class="pl-credit">' + credit(a) + '</p></article>';
      }
      if (p.style === 'golden') {
        return '<article id="place-' + p.id + '" class="place pl-golden" data-place="' + p.id + '">' +
          '<figure class="pg-a">' + pic(a, { sizes: '(max-width:760px) 100vw, 58vw' }) + '<figcaption>' + credit(a) + '</figcaption></figure>' +
          '<figure class="pg-b">' + pic(b, { sizes: '(max-width:760px) 70vw, 30vw' }) + '<figcaption>' + credit(b) + '</figcaption></figure>' +
          '<div class="pl-copy">' + head + '</div></article>';
      }
      if (p.style === 'walls') {
        return '<article id="place-' + p.id + '" class="place pl-walls" data-place="' + p.id + '"><div class="pw-track"><div class="pw-sticky">' +
          '<div class="pw-slit">' + pic(a) + '</div><div class="pw-open">' + pic(b) + '</div>' +
          '<div class="pl-copy">' + head + '</div><p class="pl-credit">' + credit(a) + ' / ' + credit(b) + '</p></div></div></article>';
      }
      return '<article id="place-' + p.id + '" class="place pl-shift" data-place="' + p.id + '"><div class="ps-track"><div class="ps-sticky">' +
        '<div class="ps-old">' + pic(a) + '</div><div class="ps-new">' + pic(b) + '</div><div class="pl-shade"></div>' +
        '<div class="pl-copy">' + head + '</div><p class="pl-credit">' + credit(a) + ' / ' + credit(b) + '</p></div></div></article>';
    }).join('');
    return '<section id="country" class="ch country" data-ch="country">' +
      '<header class="ch-open country-open">' + kicker('country', K.kicker) + '<h2 class="display">' + t(K.title) + '</h2></header>' +
      renderAtlas() +
      '<nav class="pl-index" aria-label="' + esc(t(S.chapters[4].title)) + '"><ol>' + index + '</ol></nav>' +
      places + '</section>';
  }

  /* ---------- map of the legacy ---------- */
  var atlasTheme = 'all', atlasCity = null;
  function renderAtlas() {
    var A = S.atlas, M = C.mapData; if (!A || !M) return '';
    var chips = '<button type="button" class="chip" data-theme="all" aria-pressed="' + (atlasTheme === 'all') + '">' + esc(t(A.all)) + '</button>' +
      A.themes.map(function (th) { return '<button type="button" class="chip" data-theme="' + th.id + '" aria-pressed="' + (atlasTheme === th.id) + '">' + esc(t(th.name)) + '</button>'; }).join('');
    var nb = ['Kazakhstan', 'Turkmenistan', 'Tajikistan', 'Kyrgyzstan', 'Afghanistan'].map(function (n) { return '<path class="am-nb" d="' + M.paths[n] + '"/>'; }).join('');
    var route = ['khiva', 'bukhara', 'samarkand', 'tashkent'].map(function (k) { return M.cities[k].join(' '); }).join(' L');
    var pins = A.cities.map(function (c) {
      var xy = M.cities[c.id];
      var lx = c.id === 'shahrisabz' ? xy[0] + 16 : xy[0] + (c.id === 'khiva' ? 16 : 0), anchor = (c.id === 'shahrisabz' || c.id === 'khiva') ? 'start' : 'middle';
      var ly = c.id === 'shahrisabz' ? xy[1] + 6 : (c.id === 'khiva' ? xy[1] + 6 : xy[1] - 20);
      return '<g class="am-pin" data-city="' + c.id + '" tabindex="0" role="button" aria-label="' + esc(t(c.name)) + '" transform="translate(0 0)">' +
        '<circle class="am-hit" cx="' + xy[0] + '" cy="' + xy[1] + '" r="26"/>' +
        '<rect class="am-dot" x="' + (xy[0] - 7) + '" y="' + (xy[1] - 7) + '" width="14" height="14" transform="rotate(45 ' + xy[0] + ' ' + xy[1] + ')"/>' +
        (c.capital ? '<circle class="am-cap" cx="' + xy[0] + '" cy="' + xy[1] + '" r="15"/>' : '') +
        '<text x="' + lx + '" y="' + ly + '" text-anchor="' + anchor + '">' + esc(t(c.name)) + '</text></g>';
    }).join('');
    return '<div class="atlas" id="atlas">' +
      '<div class="at-head"><p class="kicker"><span class="kl">' + esc(t(A.kicker)) + '</span></p><h3 class="at-title">' + esc(t(A.title)) + '</h3><p class="at-lead">' + esc(t(A.lead)) + '</p>' +
      '<div class="chips" role="group">' + chips + '</div></div>' +
      '<div class="at-body"><div class="at-map"><svg viewBox="0 0 ' + M.w + ' ' + M.h + '" role="img" aria-label="' + esc(t(A.kicker)) + '">' +
      '<g class="am-nbs">' + nb + '</g><path class="am-uz" d="' + M.paths.Uzbekistan + '"/>' +
      '<path class="am-route" d="M' + route + '"/>' + pins + '</svg>' +
      '<p class="at-legend"><i></i>' + esc(t(A.route)) + '</p></div>' +
      '<div class="at-card" id="atCard" aria-live="polite">' + atlasCard() + '</div></div></div>';
  }
  function atlasCard() {
    var A = S.atlas;
    var c = A.cities.filter(function (x) { return x.id === atlasCity; })[0];
    if (!c) return '<p class="at-pick">' + esc(t(A.pick)) + '</p>';
    var th = A.themes.filter(function (x) { return c.themes.indexOf(x.id) > -1; }).map(function (x) { return '<span>' + esc(t(x.name)) + '</span>'; }).join('');
    return (c.image && resolve(c.image) ? '<div class="at-img">' + pic(c.image, { sizes: '(max-width:760px) 100vw, 30vw' }) + '</div>' : '') +
      '<p class="at-km">' + (c.capital ? esc(t(A.capital)) : '≈ ' + c.km + ' ' + esc(t(A.fromTashkent))) + '</p>' +
      '<h4 class="at-name">' + esc(t(c.name)) + '</h4><p class="at-text">' + esc(t(c.text)) + '</p><p class="at-tags">' + th + '</p>' +
      (c.place ? '<a class="explore" href="#place-' + c.place + '" data-goplace="' + c.place + '"><span>' + esc(t(A.more)) + '</span><i aria-hidden="true"></i></a>' : '');
  }
  function applyAtlas() {
    var A = S.atlas; if (!A) return;
    $$('.chip').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-theme') === atlasTheme); });
    $$('.am-pin').forEach(function (g) {
      var c = A.cities.filter(function (x) { return x.id === g.getAttribute('data-city'); })[0];
      g.classList.toggle('dim', atlasTheme !== 'all' && c.themes.indexOf(atlasTheme) < 0);
      g.classList.toggle('on', c.id === atlasCity);
    });
    var card = $('#atCard'); if (card) card.innerHTML = atlasCard();
  }
  function pickCity(id) { atlasCity = id; applyAtlas(); stamp(id); }

  /* ---------- heritage passport ---------- */
  var pass = {};
  try { pass = JSON.parse(localStorage.getItem('lot-pass') || '{}') || {}; } catch (e) { pass = {}; }
  function passTotal() { return S.passport.stamps.length; }
  function passCount() { return S.passport.stamps.filter(function (x) { return pass[x.id]; }).length; }
  function updatePassBtn() {
    var el = $('#passCount'); if (el) el.textContent = passCount() + '/' + passTotal();
    var b = $('#passBtn'); if (b) b.setAttribute('aria-label', t(S.passport.title) + ' ' + passCount() + '/' + passTotal());
  }
  var toastTimer = null;
  function toast(msg) {
    var el = $('#toast'); if (!el) return;
    el.innerHTML = msg; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }
  function stamp(id) {
    var st = S.passport.stamps.filter(function (x) { return x.id === id; })[0];
    if (!st || pass[id]) return;
    pass[id] = new Date().toISOString().slice(0, 10);
    try { localStorage.setItem('lot-pass', JSON.stringify(pass)); } catch (e) {}
    updatePassBtn();
    var b = $('#passBtn'); if (b) { b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse'); }
    toast('<span>' + esc(t(S.passport.got)) + '</span><strong>' + esc(t(st.name)) + '</strong><em>' + passCount() + '/' + passTotal() + '</em>');
  }
  function sealSVG(st, on) {
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="' + starPath(60, 60, 52) + '" class="sl-star"/><circle cx="60" cy="60" r="34" class="sl-ring"/>' +
      '<text x="60" y="63" text-anchor="middle" class="sl-t" style="font-size:' + Math.min(10, Math.floor(52 / Math.max(1, t(st.name).length) * 1.45)) + 'px">' + esc(t(st.name).toUpperCase()) + '</text></svg>';
  }
  function openPassport() {
    var P = S.passport, done = passCount() === passTotal();
    var grid = P.stamps.map(function (st) {
      var on = !!pass[st.id];
      return '<li class="seal' + (on ? ' on' : '') + '">' + sealSVG(st, on) + '<span>' + esc(t(st.name)) + (on ? '<small>' + esc(pass[st.id]) + '</small>' : '') + '</span></li>';
    }).join('');
    openLightbox('<div class="passport"><p class="loc">' + passCount() + ' / ' + passTotal() + '</p><h3 class="lb-title">' + esc(t(P.title)) + '</h3>' +
      '<p class="lb-text">' + esc(t(P.rules)) + '</p>' + (done ? '<p class="pass-done">' + esc(t(P.done)) + '</p>' : '') +
      '<ul class="seals">' + grid + '</ul><div class="pass-actions"><button type="button" class="cta ghost" id="passShare"><span>' + esc(t(P.share)) + '</span><i aria-hidden="true"></i></button>' +
      '<button type="button" class="linkish" id="passReset">' + esc(t(P.reset)) + '</button></div></div>');
  }
  function sharePass() {
    var url = location.origin + location.pathname, text = t(S.passport.title) + ': ' + passCount() + '/' + passTotal() + ' · The Legacy of Temur';
    if (navigator.share) { navigator.share({ title: 'The Legacy of Temur', text: text, url: url }).catch(function () {}); return; }
    try { navigator.clipboard.writeText(text + ' ' + url).then(function () { toast('<strong>' + esc(t(S.passport.copied)) + '</strong>'); }); } catch (e) {}
  }

  function renderPeople() {
    var P = S.people;
    var items = P.photos.map(function (ph, i) {
      if (ph.placeholder) {
        return '<figure class="pp pp-' + ph.size + ' pp-ph"><div class="pp-frame"><span class="ph-tag">' + esc(t(S.ui.placeholder)) + '</span><p>' + esc(t(ph.note)) + '</p></div>' +
          '<figcaption>' + esc(t(ph.cap)) + '</figcaption></figure>';
      }
      if (!resolve(ph.image)) return '';
      return '<figure class="pp pp-' + ph.size + '"><div class="pp-frame">' + pic(ph.image, { sizes: '(max-width:760px) 100vw, 50vw' }) + '</div>' +
        '<figcaption>' + esc(t(ph.cap)) + credit(ph.image) + '</figcaption></figure>';
    }).join('');
    return '<section id="people" class="ch people light" data-ch="people">' +
      '<header class="ch-open people-open">' + kicker('people', P.kicker) + '<h2 class="display">' + t(P.title) + '</h2></header>' +
      '<div class="pp-grid">' + items + '</div>' +
      '<p class="pp-statement">' + esc(t(P.statement)) + '</p>' +
      '</section>';
  }

  function tbd() { return '<span class="tbd"><em>' + esc(t(S.ui.placeholder)) + '</em>' + esc(t(S.journey.labels.tbd)) + '</span>'; }
  function renderJourney() {
    var J = S.journey, L = J.labels;
    function fact(label, v) { return '<div class="jf"><dt>' + esc(t(label)) + '</dt><dd>' + (v ? esc(t(v)) : tbd()) + '</dd></div>'; }
    function list(arr) { return arr && arr.length ? '<ul>' + arr.map(function (x) { return '<li>' + esc(t(x)) + '</li>'; }).join('') + '</ul>' : tbd(); }
    var days = '';
    if (TOUR.days && TOUR.days.length) {
      days = TOUR.days.map(function (d, i) {
        return (d.image ? '<li class="jd"><div class="jd-img">' + pic(d.image, { sizes: '(max-width:760px) 100vw, 40vw' }) : '<li class="jd"><div class="jd-img jd-noimg"><span class="jd-place">' + esc(t(d.place)) + '</span>') + '</div><div class="jd-body">' +
          '<p class="jd-n">' + esc(t(L.day)) + ' ' + (i + 1) + '</p><h4>' + esc(t(d.place)) + '</h4><p class="jd-text">' + esc(t(d.text)) + '</p>' +
          (d.activities && d.activities.length ? '<p class="jd-l">' + esc(t(L.activities)) + '</p><ul>' + d.activities.map(function (a) { return '<li>' + esc(t(a)) + '</li>'; }).join('') + '</ul>' : '') +
          (d.practical ? '<p class="jd-l">' + esc(t(L.practical)) + '</p><p>' + esc(t(d.practical)) + '</p>' : '') + '</div></li>';
      }).join('');
    } else {
      for (var i = 0; i < (TOUR.placeholderDays || 3); i++) {
        days += '<li class="jd jd-ph"><div class="jd-img"><span class="ph-tag">' + esc(t(S.ui.placeholder)) + '</span></div><div class="jd-body"><p class="jd-n">' + esc(t(L.day)) + ' ' + (i + 1) + '</p>' +
          '<h4>' + esc(t(L.tbd)) + '</h4><p class="jd-text">' + esc(t(L.dayPlaceholder)) + '</p></div></li>';
      }
    }
    var route = TOUR.destinations && TOUR.destinations.length ? TOUR.destinations.map(function (d) { return esc(t(d)); }).join(' <i>→</i> ') : null;
    return '<section id="journey" class="ch journey dark" data-ch="journey">' +
      '<header class="ch-open journey-open">' +
      '<div class="jo-text">' + kicker('journey', J.kicker) + '<h2 class="display">' + t(J.title) + '</h2><p class="lead">' + esc(t(J.lead)) + '</p></div>' +
      '<div class="jo-portrait">' + pic('temur_front', { sizes: '(max-width:760px) 80vw, 30vw' }) + '</div>' +
      '</header>' +
      '<div class="jt">' +
      (TOUR.note ? '<p class="jt-note"><em>' + esc(t(S.ui.draft)) + '</em>' + esc(t(TOUR.note)) + '</p>' : '') +
      '<h3 class="jt-title">' + esc(t(TOUR.title)) + '</h3>' +
      '<p class="jt-desc">' + (TOUR.description ? esc(t(TOUR.description)) : tbd()) + '</p>' +
      '<dl class="jt-facts">' + fact(L.duration, TOUR.duration) + fact(L.travelers, TOUR.travelers) + fact(L.price, TOUR.price) +
      fact(L.season, TOUR.season) + fact(L.level, TOUR.level) + fact(L.transport, TOUR.transport) + '</dl>' +
      '<div class="jt-route"><p class="jd-l">' + esc(t(L.destinations)) + '</p><p class="jt-route-v">' + (route || tbd()) + '</p></div>' +
      '<h4 class="jt-sub">' + esc(t(L.itinerary)) + '</h4><ol class="jt-days">' + days + '</ol>' +
      '<div class="jt-incl"><div><h4 class="jt-sub">' + esc(t(L.included)) + '</h4>' + list(TOUR.included) + '</div><div><h4 class="jt-sub">' + esc(t(L.excluded)) + '</h4>' + list(TOUR.excluded) + '</div></div>' +
      '<h4 class="jt-sub">' + esc(t(L.outcomes)) + '</h4>' + list(TOUR.outcomes) +
      (TOUR.updated ? '<p class="note">' + esc(t(L.updated)) + ': ' + esc(TOUR.updated) + '</p>' : '') +
      '<div class="jt-cta"><a class="cta" href="' + esc(TOUR.bookingUrl || '#') + '" target="_blank" rel="noopener"><span>' + esc(t(J.cta)) + '</span><i aria-hidden="true"></i></a><p class="note">' + esc(t(J.ctaNote)) + '</p></div>' +
      '</div></section>';
  }

  function renderFinale() {
    var F = S.finale, Fo = S.footer;
    return '<section id="finale" class="ch finale dark" data-ch="finale">' +
      '<div class="fn-track"><div class="fn-sticky">' +
      '<div class="fn-img">' + pic(F.image) + '</div><div class="fn-dark" aria-hidden="true"></div>' +
      '<p class="fn-line f1">' + esc(t(F.l1)) + '</p><p class="fn-line f2">' + esc(t(F.l2)) + '</p>' +
      '<div class="fn-end"><p class="fn-country">' + esc(t(F.country)) + '</p><h2 class="fn-title">' + esc(t(F.title)) + '</h2>' +
      '<p class="fn-l3">' + esc(t(F.l3)) + '</p><a class="cta ghost" href="#journey"><span>' + esc(t(F.cta)) + '</span><i aria-hidden="true"></i></a></div>' +
      '<p class="fn-credit">' + credit(F.image) + '</p>' +
      '</div></div></section>' +
      '<footer class="foot"><div class="foot-a"><strong>' + esc(Fo.event) + '</strong><span>' + esc(t(Fo.cities)) + '</span></div>' +
      '<div class="foot-b"><span>' + esc(t(Fo.by)) + '</span><button type="button" class="linkish" id="creditsBtn">' + esc(t(S.ui.credits)) + '</button></div></footer>';
  }

  /* ---------- chrome: hud, menu, progress ---------- */
  function renderChrome() {
    root.lang = lang;
    $$('[data-t]').forEach(function (el) { el.textContent = plain(get(el.getAttribute('data-t'))); });
    $$('.langs').forEach(function (box) {
      box.innerHTML = LANGS.map(function (l) {
        return '<button type="button" data-lang="' + l + '" aria-pressed="' + (l === lang) + '">' + l.toUpperCase() + '</button>';
      }).join('');
    });
    $('#menuList').innerHTML = S.chapters.map(function (c) {
      return '<li><a href="#' + c.id + '" data-jump="' + c.id + '"><span class="ml-n">' + (c.num || '·') + '</span><span class="ml-t">' + esc(t(c.title)) + '</span></a></li>';
    }).join('');
    $('#progress').innerHTML = '<ol>' + S.chapters.map(function (c) {
      return '<li><a href="#' + c.id + '" data-jump="' + c.id + '" aria-label="' + esc(t(c.title)) + '"><span>' + esc(t(c.title)) + '</span></a></li>';
    }).join('') + '</ol>';
    $('#soundBtn .sr').textContent = t(sound.on ? S.ui.soundOff : S.ui.soundOn);
    updatePassBtn();
  }

  function renderAll() {
    main.innerHTML = renderPrologue() + renderMan() + renderWalls() + renderDetail() + renderCountry() + renderPeople() + renderJourney() + renderFinale();
    renderChrome();
  }

  /* ---------- step-based scenes (no GSAP needed) ---------- */
  var scenes = [];
  function stepScene(track, n, onStep) { scenes.push({ el: track, n: n, cb: onStep, cur: -1 }); }
  function updateScenes() {
    var vh = window.innerHeight;
    scenes.forEach(function (s) {
      var r = s.el.getBoundingClientRect();
      var p = Math.min(0.9999, Math.max(0, (-r.top + vh * 0.35) / Math.max(1, r.height - vh * 0.3)));
      var i = Math.floor(p * s.n);
      if (i !== s.cur) { s.cur = i; s.cb(i); }
    });
    // progress nav + place index
    var active = null;
    $$('.ch', main).forEach(function (sec) { var r = sec.getBoundingClientRect(); if (r.top < vh * 0.5) active = sec.id; });
    $$('#progress a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-jump') === active); });
    document.body.classList.toggle('on-light', active === 'people');
    // passport: a chapter counts once its end has been reached
    ['man', 'walls', 'detail'].forEach(function (id) {
      var sec = document.getElementById(id); if (!sec || pass[id]) return;
      var r = sec.getBoundingClientRect(); if (r.bottom < vh * 0.9 && r.bottom > -vh) stamp(id);
    });
    var place = null;
    $$('.place', main).forEach(function (pl) { var r = pl.getBoundingClientRect(); if (r.top < vh * 0.6 && r.bottom > vh * 0.4) place = pl.getAttribute('data-place'); });
    var idx = $('.pl-index', main);
    if (idx) {
      var cr = $('#country').getBoundingClientRect();
      idx.classList.toggle('show', !!place && cr.top < 0 && cr.bottom > vh);
      $$('a', idx).forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-place') === place); });
    }
    if (place && introDone) {
      var pl = document.getElementById('place-' + place);
      if (pl && pl.getBoundingClientRect().top < vh * 0.2) stamp(place);
    }
  }
  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; updateScenes(); }); } }

  function setupSteps() {
    scenes = [];
    var mt = $('.mn-track');
    if (mt) {
      var n = $$('.mn-step', mt).length;
      stepScene(mt, n, function (i) {
        $$('.mn-step,.mn-bg,.mn-ticks i', mt).forEach(function (el) { el.classList.toggle('is-on', +el.getAttribute('data-i') === i); });
      });
    }
  }

  /* ---------- GSAP choreography ---------- */
  function setupMotion() {
    if (!hasGsap) return;
    var ST = window.ScrollTrigger;
    ST.getAll().forEach(function (s) { s.kill(); });
    if (reduce) return;
    var mobile = window.matchMedia('(max-width: 760px)').matches;

    // II. walk through portals
    var wt = $('.ws-track');
    if (wt) {
      var layers = $$('.ws-layer', wt);
      var tl = gsap.timeline({ scrollTrigger: { trigger: wt, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
      layers.forEach(function (ly, i) {
        var img = $('.ws-img img', ly), txt = $('.ws-text', ly), at = i * 10;
        if (i > 0) {
          tl.fromTo(ly, { '--arch': 6 }, { '--arch': 640, duration: 4, ease: 'power2.in' }, at - 4);
          tl.to($('.ws-shade', layers[i - 1]), { opacity: 0.85, duration: 4 }, at - 4);
        }
        if (img) tl.fromTo(img, { scale: i ? 1.25 : 1.04 }, { scale: mobile ? 1.06 : 1.14, duration: i ? 10 : 10, ease: 'none' }, i ? at - 4 : at);
        tl.fromTo(txt, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.6 }, at + 0.6);
        if (i < layers.length - 1) tl.to(txt, { autoAlpha: 0, y: -30, duration: 1.4 }, at + 5.4);
      });
    }

    // III. macro to monument, then pattern becomes graphic
    var dt = $('.dt-track');
    if (dt) {
      var dl = $$('.dt-layer', dt);
      var tl3 = gsap.timeline({ scrollTrigger: { trigger: dt, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
      dl.forEach(function (ly, i) {
        var at = i * 6;
        tl3.fromTo(ly, { autoAlpha: i ? 0 : 1 }, { autoAlpha: 1, duration: 1.2 }, at - (i ? 1.2 : 0));
        tl3.fromTo($('img', ly), { scale: 1.8 }, { scale: 1, duration: 6, ease: 'power1.out' }, at - (i ? 1.2 : 0));
        tl3.fromTo($('figcaption', ly), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 }, at + 0.8);
        if (i < dl.length - 1) tl3.to($('figcaption', ly), { autoAlpha: 0, duration: 0.8 }, at + 4.2);
      });
      var end = dl.length * 6;
      var paths = $$('.dt-girih path', dt);
      tl3.to($('figcaption', dl[dl.length - 1]), { autoAlpha: 0, duration: 0.8 }, end - 1.6)
        .fromTo('.dt-bridge', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, end - 1.2)
        .to(dl[dl.length - 1], { autoAlpha: 0, duration: 2 }, end)
        .fromTo('.dt-girih', { scale: 3.2, rotate: 0 }, { scale: 1, rotate: 22.5, duration: 4, ease: 'power2.out' }, end - 1.2)
        .fromTo('.dt-bridge', { backgroundColor: 'rgba(36,87,216,0)' }, { backgroundColor: 'rgba(36,87,216,1)', duration: 2 }, end)
        .to('.dt-bridge', { backgroundColor: 'rgba(17,28,50,1)', duration: 2 }, end + 2)
        .fromTo('.dt-bridge-text', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.5 }, end + 1.6);
    }

    // IV. Khiva: a narrow lane widens into the walled city
    $$('.pw-track').forEach(function (tr) {
      gsap.timeline({ scrollTrigger: { trigger: tr, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
        .fromTo($('.pw-slit', tr), { clipPath: mobile ? 'inset(8% 22% 8% 22%)' : 'inset(6% 38% 6% 38%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 5, ease: 'power1.inOut' })
        .fromTo($('.pw-open', tr), { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 }, 5.5)
        .fromTo($('.pl-copy', tr), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.5 }, 2);
    });
    // IV. Tashkent: historic detail gives way to the modern city
    $$('.ps-track').forEach(function (tr) {
      gsap.timeline({ scrollTrigger: { trigger: tr, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
        .fromTo($('.ps-new', tr), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 4, ease: 'power2.inOut' }, 1.5)
        .fromTo($('.ps-old img', tr), { scale: 1 }, { scale: 1.15, duration: 5.5, ease: 'none' }, 0)
        .fromTo($('.pl-copy', tr), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 0.5);
    });
    // IV. Bukhara: gentle depth
    $$('.pl-golden').forEach(function (pl) {
      gsap.fromTo($('.pg-b', pl), { y: 80 }, { y: -80, ease: 'none', scrollTrigger: { trigger: pl, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('.pl-monument').forEach(function (pl) {
      gsap.fromTo($('.pl-bg img', pl), { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: pl, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // V. people collage settles in
    $$('.pp').forEach(function (f) {
      gsap.fromTo(f, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: f, start: 'top 88%' } });
    });

    // Chapter openings
    $$('.ch-open .display').forEach(function (h) {
      gsap.fromTo(h, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.3, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
    });

    // Finale: pull back, darken, speak
    var ft = $('.fn-track');
    if (ft) {
      gsap.timeline({ scrollTrigger: { trigger: ft, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
        .fromTo('.fn-img img', { scale: 1.45 }, { scale: 1, duration: 6, ease: 'power1.out' }, 0)
        .fromTo('.fn-dark', { opacity: 0.1 }, { opacity: 0.9, duration: 3 }, 3.5)
        .fromTo('.f1', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1 }, 4)
        .fromTo('.f2', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1 }, 5.4)
        .to('.f1,.f2', { autoAlpha: 0, duration: 0.8 }, 7)
        .fromTo('.fn-end', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.2 }, 7.8)
        .to({}, { duration: 1 });
    }
    ST.refresh();
  }

  /* ---------- opening sequence ---------- */
  function sizeLattice() {
    var svg = $('.lattice.lt'); if (!svg) return null;
    var w = window.innerWidth, h = window.innerHeight;
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var portrait = $('.pro-portrait img');
    var r = portrait.getBoundingClientRect();
    // face sits around 46% across and 40% down the portrait
    var cx = r.left + r.width * 0.46, cy = r.top + r.height * 0.4;
    return { svg: svg, w: w, h: h, cx: cx, cy: cy, R: Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) };
  }
  function setPattern(g, s) {
    var tf = 'translate(' + g.cx + ' ' + g.cy + ') scale(' + s + ') translate(-60 -60)';
    $('#lt-lines').setAttribute('patternTransform', tf);
    $('#lt-solid').setAttribute('patternTransform', tf);
  }
  function endIntroState() {
    var pro = $('#prologue');
    pro.classList.add('intro-done');
    root.classList.remove('lock');
    document.body.classList.remove('intro-running');
    introDone = true;
    try { sessionStorage.setItem('lot-intro', '1'); } catch (e) {}
    window.removeEventListener('wheel', skipIntro, { passive: true });
    window.removeEventListener('touchmove', skipIntro, { passive: true });
    window.removeEventListener('keydown', keySkip);
  }
  function skipIntro() {
    if (introDone) return;
    if (introTl) introTl.progress(1); else endIntroState();
  }
  function keySkip(e) { if (['ArrowDown', 'PageDown', ' ', 'Spacebar', 'Enter', 'Escape', 'End'].indexOf(e.key) > -1) { e.preventDefault(); skipIntro(); } }

  function runIntro() {
    var pro = $('#prologue');
    var seen = false; try { seen = sessionStorage.getItem('lot-intro') === '1'; } catch (e) {}
    var deep = location.hash && location.hash !== '#prologue';
    if (!hasGsap || reduce || seen || deep) { endIntroState(); return; }
    root.classList.add('lock');
    document.body.classList.add('intro-running');
    pro.classList.add('intro-on');
    window.addEventListener('wheel', skipIntro, { passive: true });
    window.addEventListener('touchmove', skipIntro, { passive: true });
    window.addEventListener('keydown', keySkip);
    var g = sizeLattice();
    var mask = $('.lmask');
    mask.setAttribute('cx', g.cx); mask.setAttribute('cy', g.cy);
    var pat = { s: 0.42 };
    setPattern(g, pat.s);
    var tl = gsap.timeline({ onComplete: endIntroState, defaults: { ease: 'power2.out' } });
    introTl = tl;
    tl.set('.pro-title > *, .scroll-cue', { autoAlpha: 0, y: 24 })
      .set('.pro-gur', { autoAlpha: 0 })
      .set('.lattice.lt', { autoAlpha: 1 })
      .set('.lsolid', { opacity: 0 })
      .set('.pro-portrait', { autoAlpha: 1, '--reveal': '0%' })
      .set('.pro-glow', { opacity: 0 })
      .fromTo('.l1', { autoAlpha: 0, letterSpacing: '0.32em' }, { autoAlpha: 1, letterSpacing: '0.12em', duration: 1.8 }, 0.4)
      .to('.l1', { autoAlpha: 0, duration: 0.8 }, 2.8)
      .fromTo('.l2', { autoAlpha: 0, letterSpacing: '0.32em' }, { autoAlpha: 1, letterSpacing: '0.12em', duration: 1.8 }, 3.5)
      .to('.l2', { autoAlpha: 0, duration: 0.8 }, 5.7)
      .to('.pro-portrait', { '--reveal': '78%', duration: 3.2, ease: 'power1.inOut' }, 5.2)
      .fromTo('.pro-wash', { opacity: 0.85 }, { opacity: 0.18, duration: 3.6, ease: 'power1.inOut' }, 5.2)
      .to('.pro-glow', { opacity: 0.6, duration: 1.4, ease: 'sine.inOut' }, 6.8)
      .to('.pro-glow', { opacity: 0.25, duration: 1.2, ease: 'sine.inOut' }, 8.2)
      .fromTo('.l3', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.4 }, 7.6)
      .to(mask, { attr: { r: g.R * 1.15 }, duration: 1.8, ease: 'power2.in' }, 9.3)
      .to('.l3', { autoAlpha: 0, duration: 0.6 }, 10.6)
      .to('.lsolid', { opacity: 1, duration: 0.6, ease: 'none' }, 10.8)
      .to('.pro-gur', { autoAlpha: 1, duration: 0.4 }, 11.0)
      .to('.pro-portrait', { autoAlpha: 0, duration: 0.4 }, 11.1)
      .to(pat, { s: 34, duration: 2.6, ease: 'power3.in', onUpdate: function () { setPattern(g, pat.s); } }, 11.1)
      .to('.llines', { opacity: 0, duration: 1.2 }, 11.4)
      .to('.lattice.lt', { autoAlpha: 0, duration: 0.5 }, 13.4)
      .fromTo('.pro-gur-img', { scale: 1.18 }, { scale: 1, duration: 3.2, ease: 'power2.out' }, 12.0)
      .to('.pro-title > *', { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.25 }, 13.4)
      .to('.scroll-cue', { autoAlpha: 1, y: 0, duration: 1 }, 14.6)
      .add(function () { pro.classList.add('intro-done'); }, 13.4);
  }

  /* ---------- lightbox / credits ---------- */
  function openLightbox(html) {
    var lb = $('#lightbox');
    $('#lbBody').innerHTML = html;
    lb.hidden = false;
    root.classList.add('lock');
    $('.lb-close', lb).focus();
  }
  function closeLightbox() {
    var lb = $('#lightbox'); if (lb.hidden) return;
    lb.hidden = true; $('#lbBody').innerHTML = '';
    if (introDone) root.classList.remove('lock');
  }
  function explore(id) {
    var m = S.walls.monuments.filter(function (x) { return x.id === id; })[0]; if (!m) return;
    var keys = [m.image].concat(m.more || []).filter(resolve);
    var seen = {};
    keys = keys.filter(function (k) { var r = resolve(k); if (seen[r]) return false; seen[r] = 1; return true; });
    openLightbox('<p class="loc">' + esc(t(m.label)) + '</p><h3 class="lb-title">' + esc(t(m.name)) + '</h3><p class="lb-text">' + esc(t(m.text)) + '</p>' +
      '<div class="lb-gallery">' + keys.map(function (k) { return '<figure>' + pic(k, { sizes: '90vw' }) + '<figcaption>' + esc(plain(PH[resolve(k)].alt)) + ' · ' + credit(k) + '</figcaption></figure>'; }).join('') + '</div>');
  }
  function credits() {
    var rows = Object.keys(PH).filter(function (k) { return !/^temur/.test(k); }).map(function (k) {
      var p = PH[k];
      return '<li><span class="cr-t">' + esc(plain(p.alt)) + '</span><span class="cr-a">' + esc(p.by) + ' · ' +
        (p.url ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.lic) + ', ' + esc(p.src) + '</a>' : esc(p.lic)) + '</span></li>';
    }).join('');
    openLightbox('<h3 class="lb-title">' + esc(t(S.ui.credits)) + '</h3><p class="lb-text">' + esc(t(S.ui.creditsIntro)) + '</p>' +
      '<p class="lb-text">' + esc(t(S.man.portraitNote)) + '</p><ul class="cr-list">' + rows + '</ul>');
  }

  /* ---------- menu ---------- */
  function toggleMenu(open) {
    var m = $('#menu'), b = $('#menuBtn');
    open = open == null ? m.hidden : open;
    m.hidden = !open; b.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open);
    if (open) { var a = $('#menuList a'); a && a.focus(); }
  }
  function jump(id) {
    toggleMenu(false);
    if (!introDone) skipIntro();
    var el = document.getElementById(id); if (!el) return;
    var top = el.getBoundingClientRect().top + window.scrollY;
    if (id === 'journey' || id === 'finale') top += 0;
    window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', '#' + id);
  }

  /* ---------- sound: a quiet synthesized drone, only after consent ---------- */
  var sound = { on: false, ctx: null, gain: null };
  function toggleSound() {
    var btn = $('#soundBtn');
    try {
      if (!sound.ctx) {
        var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        var ctx = new AC(), g = ctx.createGain(); g.gain.value = 0; g.connect(ctx.destination);
        [55, 82.41, 110.0].forEach(function (f, i) {
          var o = ctx.createOscillator(), og = ctx.createGain();
          o.type = i === 2 ? 'triangle' : 'sine'; o.frequency.value = f; og.gain.value = [0.5, 0.32, 0.06][i];
          var lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.05 + i * 0.03; lg.gain.value = og.gain.value * 0.5;
          lfo.connect(lg); lg.connect(og.gain); lfo.start();
          o.connect(og); og.connect(g); o.start();
        });
        var len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
        for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
        var nz = ctx.createBufferSource(); nz.buffer = buf; nz.loop = true;
        var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 320;
        var ng = ctx.createGain(); ng.gain.value = 0.12; nz.connect(lp); lp.connect(ng); ng.connect(g); nz.start();
        sound.ctx = ctx; sound.gain = g;
      }
      sound.on = !sound.on;
      if (sound.ctx.state === 'suspended') sound.ctx.resume();
      var now = sound.ctx.currentTime;
      sound.gain.gain.cancelScheduledValues(now);
      sound.gain.gain.setTargetAtTime(sound.on ? 0.06 : 0, now, sound.on ? 1.2 : 0.4);
      btn.setAttribute('aria-pressed', sound.on);
      btn.classList.toggle('on', sound.on);
      $('.sr', btn).textContent = t(sound.on ? S.ui.soundOff : S.ui.soundOn);
    } catch (e) {}
  }

  /* ---------- language ---------- */
  function setLang(l) {
    if (l === lang) return;
    var cur = null, off = 0;
    $$('.ch', main).forEach(function (sec) { var r = sec.getBoundingClientRect(); if (r.top <= 1) { cur = sec.id; off = -r.top / Math.max(1, r.height); } });
    lang = l;
    try { localStorage.setItem('lot-lang', l); } catch (e) {}
    renderAll();
    $('#prologue').classList.add('intro-done');
    setupSteps(); setupMotion(); applyAtlas();
    if (cur) { var el = document.getElementById(cur); window.scrollTo(0, el.offsetTop + off * el.offsetHeight); }
    updateScenes();
  }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-lang],[data-jump],[data-explore],#menuBtn,#soundBtn,.skip,#creditsBtn,[data-close],.scroll-cue,.wordmark,a[href="#journey"],[data-theme],.am-pin,[data-goplace],#passBtn,#passShare,#passReset');
    if (!el) { if (e.target.id === 'lightbox') closeLightbox(); return; }
    if (el.hasAttribute('data-lang')) { setLang(el.getAttribute('data-lang')); return; }
    if (el.hasAttribute('data-theme')) { atlasTheme = el.getAttribute('data-theme'); applyAtlas(); return; }
    if (el.classList.contains('am-pin')) { pickCity(el.getAttribute('data-city')); return; }
    if (el.hasAttribute('data-goplace')) { e.preventDefault(); jump('place-' + el.getAttribute('data-goplace')); return; }
    if (el.id === 'passBtn') { openPassport(); return; }
    if (el.id === 'passShare') { sharePass(); return; }
    if (el.id === 'passReset') { pass = {}; try { localStorage.removeItem('lot-pass'); } catch (e2) {} updatePassBtn(); openPassport(); return; }
    if (el.hasAttribute('data-jump')) { e.preventDefault(); jump(el.getAttribute('data-jump')); return; }
    if (el.hasAttribute('data-explore')) { explore(el.getAttribute('data-explore')); return; }
    if (el.id === 'menuBtn') { toggleMenu(); return; }
    if (el.id === 'soundBtn') { toggleSound(); return; }
    if (el.id === 'creditsBtn') { credits(); return; }
    if (el.hasAttribute('data-close')) { closeLightbox(); return; }
    if (el.classList.contains('skip')) { skipIntro(); return; }
    if (el.classList.contains('scroll-cue')) { e.preventDefault(); jump('man'); return; }
    if (el.classList.contains('wordmark')) { e.preventDefault(); jump('prologue'); return; }
    if (el.matches('a[href="#journey"]')) { e.preventDefault(); jump('journey'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLightbox(); toggleMenu(false); }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('am-pin')) { e.preventDefault(); pickCity(e.target.getAttribute('data-city')); }
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { onScroll(); if (!introDone && introTl) { /* keep intro geometry simple */ } });

  /* ---------- boot ---------- */
  renderAll();
  document.body.classList.remove('is-loading');
  function boot() {
    hasGsap = !!(window.gsap && window.ScrollTrigger);
    if (hasGsap) gsap.registerPlugin(ScrollTrigger);
    document.body.classList.toggle('static', !hasGsap || reduce);
    setupSteps();
    runIntro();
    setupMotion();
    updateScenes();
    if (location.hash && location.hash.length > 1) {
      var el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(function () { window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY); }, 60);
    }
  }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
  if (document.readyState === 'complete' || window.gsap) boot(); else window.addEventListener('load', boot);
})();
