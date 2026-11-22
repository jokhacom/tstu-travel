/* THE LEGACY OF TEMUR — site engine.
 * First visit: a fullscreen documentary player. When the film ends (or is skipped),
 * its last frame "opens up" into the site: THE LEGACY OF TEMUR → «По следам Тамерлана» →
 * the tour, step by step → booking. The tour is never shown while the film plays.
 * Repeat visits open straight onto the site, with «Смотреть фильм снова».
 * The film itself is one setting: S.film.src in content/site.js. */
(function () {
  'use strict';
  var C = window.LEGACY || {};
  var S = C.site, TOUR = C.tour || {}, PH = C.photos || {}, F = S.film || {};
  var LANGS = S.languages;
  var lang = pickLang();
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var main = document.getElementById('main');
  var root = document.documentElement;
  var SEEN = 'lot-film-seen';
  var HAS_FILM = !!F.src;

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
  function store(k, v) { try { if (v == null) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  function pic(key, opt) {
    opt = opt || {};
    var p = PH[key];
    if (!p) return '<div class="media-missing"><span>' + esc(t(S.ui.placeholder)) + '</span></div>';
    var srcset = p.w.map(function (w) { return 'img/' + key + '-' + w + '.webp ' + w + 'w'; }).join(', ');
    return '<img src="img/' + key + '-' + p.w[0] + '.webp" srcset="' + srcset + '" sizes="' + (opt.sizes || '100vw') + '" alt="' + esc(plain(p.alt)) + '"' +
      ' loading="lazy" decoding="async" style="object-position:' + (p.pos || '50% 50%') + '">';
  }
  /* split text into words / letters for staggered reveals */
  function words(txt) {
    return String(txt).split(/\s+/).filter(Boolean).map(function (w, i) {
      return '<span class="w"><span style="--i:' + i + '">' + esc(w) + '</span></span>';
    }).join(' ');
  }
  function letters(txt) {
    return Array.prototype.map.call(String(txt), function (ch, i) {
      return ch === ' ' ? ' ' : '<span class="ch" style="--i:' + i + '">' + esc(ch) + '</span>';
    }).join('');
  }
  function bookingLink(cls, label) {
    if (S.booking && S.booking.to) return '<a class="' + cls + '" href="#book" data-book role="button"><span>' + esc(t(label)) + '</span><i aria-hidden="true"></i></a>';
    return '<a class="' + cls + '" href="' + esc(TOUR.bookingUrl || '#') + '" target="_blank" rel="noopener"><span>' + esc(t(label)) + '</span><i aria-hidden="true"></i></a>';
  }

  /* the film may be one file (string) or a landscape + portrait pair */
  function portrait() { return window.innerHeight > window.innerWidth * 1.1; }
  function pick(v) { return !v ? '' : typeof v === 'string' ? v : (portrait() ? v.portrait || v.landscape : v.landscape || v.portrait); }
  // the landscape stand-in has black bars; the opened site crops them away (the frame "opens up")
  function openScale() { var lb = +F.letterbox || 0; return portrait() || !lb ? 1.06 : +(1 / (1 - 2 * lb)).toFixed(3); }

  /* ---------- the opened site: hero (the film's last frame) ---------- */
  function heroInner(inFilm) {
    var route = PKGS.length ? PKGS.map(function (p) { return uniq(p.route).map(function (d) { return esc(t(d)); }).join(' <i>—</i> '); }).join(' <b>·</b> ')
      : (TOUR.destinations || []).map(function (d) { return esc(t(d)); }).join(' <i>—</i> ');
    return '<div class="uh-in">' +
      '<' + (inFilm ? 'p' : 'h1') + ' class="uh-t"><span class="h-legacy">' + esc(t(S.intro.title)) + '</span>' +
      '<span class="h-tour">' + esc(t(TOUR.title)) + '</span></' + (inFilm ? 'p' : 'h1') + '>' +
      '<p class="uh-s s1 uh-dur">' + esc(t(TOUR.duration)) + '</p>' +
      (route ? '<p class="uh-s s2 uh-route">' + route + '</p>' : '') +
      '<p class="uh-s s3 uh-lead">' + esc(t(F.unlockLead)) + '</p>' +
      '<div class="uh-s s4 uh-actions"><a class="cta" href="#program" data-jump="program"><span>' + esc(t(S.ui.toTourShort)) + '</span><i aria-hidden="true"></i></a>' +
      (HAS_FILM ? '<button type="button" class="watch-again" data-film><span class="wa-i" aria-hidden="true">▶</span>' + esc(t(S.ui.watchAgain)) + '</button>' : '') +
      '</div></div>';
  }
  /* modern hero: a huge thin city name over the photo, round city thumbnails that switch the photo,
     a rotating "watch the film" badge and a floating bar to pick a package */
  var heroI = 0, heroTimer = 0, heroPkg = 0;
  function heroSlides() { return (S.heroSlides || []).filter(function (h) { return PH[h.image]; }); }
  function renderHero() {
    var E = F.endFrame || F.poster || {}, SL = heroSlides(), L = S.journey.labels, H = S.hero || {};
    var land = typeof E === 'string' ? E : E.landscape, port = typeof E === 'string' ? E : E.portrait;
    var night = land || port ? '<picture class="hx-night">' + (port ? '<source media="(max-aspect-ratio: 10/11)" srcset="' + esc(port) + '">' : '') +
      '<img src="' + esc(land || port) + '" alt="" decoding="async"></picture>' : '';
    var slides = SL.map(function (h, i) {
      var im = pic(h.image, { sizes: '100vw' }); if (!i) im = im.replace(' loading="lazy"', '');
      return '<div class="hx-slide' + (i === heroI ? ' on' : '') + (h.night ? ' has-night' : '') + '" data-hx="' + i + '">' + im + (h.night ? night : '') + '</div>';
    }).join('');
    var name = SL[heroI] ? t(SL[heroI].name) : t(S.intro.title);
    var thumbs = SL.map(function (h, i) {
      return '<button type="button" class="hx-th' + (i === heroI ? ' on' : '') + '" data-hx-go="' + i + '" aria-label="' + esc(t(h.name)) + '">' + pic(h.image, { sizes: '120px' }) + '</button>';
    }).join('');
    var bt = t(H.badge || S.ui.watchAgain), ring = esc(bt + ' ✦ ' + bt + ' ✦ ');
    var badge = HAS_FILM ? '<button type="button" class="hx-badge uh-s s3" data-film aria-label="' + esc(t(S.ui.watchAgain)) + '">' +
      '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="hxRing" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"/></defs>' +
      '<text><textPath href="#hxRing" textLength="286">' + ring + '</textPath></text></svg><span class="hx-play" aria-hidden="true">▶</span></button>' : '';
    return '<header class="uh hx" id="top">' +
      '<div class="uh-bg" aria-hidden="true">' + slides + '</div><div class="uh-shade" aria-hidden="true"></div>' +
      '<div class="uh-in hx-in">' +
        '<p class="hx-kicker uh-s s1">' + esc(t(H.kicker)) + '</p>' +
        '<p class="hx-word" aria-hidden="true" style="--n:' + name.length + '">' + letters(name) + '</p>' +
        '<h1 class="hx-title uh-s s2"><span>' + esc(t(S.intro.title)) + '</span> <i>·</i> <em>' + esc(t(TOUR.title)) + '</em></h1>' +
        '<p class="hx-stars uh-s s2" aria-hidden="true">✦ ✦ ✦</p>' +
        '<p class="hx-motto uh-s s3">' + esc(t(F.unlockLead)) + '</p>' +
        (SL.length > 1 ? '<div class="hx-thumbs uh-s s3" role="group" aria-label="' + esc(t(L.cities)) + '">' + thumbs + '</div>' : '') +
        badge +
        '<div class="hx-bar uh-s s4">' + heroBar() + '</div>' +
      '</div></header>';
  }
  function heroBar() {
    var L = S.journey.labels, H = S.hero || {}, P = PKGS[heroPkg] || TOUR;
    var tabs = PKGS.length > 1 ? '<div class="hx-tabs" role="tablist">' + PKGS.map(function (p, i) {
      return '<button type="button" role="tab" data-hx-pkg="' + i + '" aria-selected="' + (i === heroPkg) + '">' + esc(t(L.pkgShort)) + ' ' + (i + 1) + '</button>';
    }).join('') + '</div>' : '';
    var f = function (ic, label, val) { return '<div class="hx-f"><span class="hx-ic" aria-hidden="true">' + ic + '</span><span class="hx-fv"><b>' + esc(t(label)) + '</b><small>' + esc(t(val != null ? val : L.tbd)) + '</small></span></div>'; };
    return tabs + '<div class="hx-pill">' +
      f('◎', L.destinations, P.tab || TOUR.duration) + f('◷', L.duration, P.duration) + f('▦', L.dates, P.dates) + f('☺', H.group, TOUR.travelers) +
      '<button type="button" class="hx-go" data-hx-open><span>' + esc(t(S.ui.toTourShort)) + '</span><i aria-hidden="true">→</i></button></div>';
  }
  function heroGo(i, user) {
    var SL = heroSlides(); if (!SL.length) return;
    heroI = (i + SL.length) % SL.length;
    $$('.hx-slide', main).forEach(function (el) { el.classList.toggle('on', +el.getAttribute('data-hx') === heroI); });
    $$('.hx-th', main).forEach(function (el) { el.classList.toggle('on', +el.getAttribute('data-hx-go') === heroI); });
    var w = $('.hx-word', main);
    if (w) { w.classList.toggle('swap', false); void w.offsetWidth; var nm = t(SL[heroI].name); w.style.setProperty('--n', nm.length); w.innerHTML = letters(nm); w.classList.toggle('swap', true); }
    if (user) heroAuto();
  }
  function heroAuto() {
    clearInterval(heroTimer);
    if (reduce || heroSlides().length < 2) return;
    heroTimer = setInterval(function () { if (!document.hidden && window.scrollY < window.innerHeight * .8 && !film.open) heroGo(heroI + 1); }, 6500);
  }

  /* ---------- the tour (revealed step by step as you scroll) ---------- */
  function renderStar() {
    var Z = S.star; if (!Z) return '';
    var cx = 60, cy = 60, R = 56, r = R * 0.42, rays = '', k = 0;
    function pt(i, rad) { var a = Math.PI / 8 * i - Math.PI / 2; return (cx + rad * Math.cos(a)).toFixed(2) + ' ' + (cy + rad * Math.sin(a)).toFixed(2); }
    Z.groups.forEach(function (g) {
      for (var n = 0; n < g.n; n++, k++) {
        rays += '<path class="zs-ray zs-' + g.id + '" d="M' + cx + ' ' + cy + 'L' + pt(2 * k - 1, r) + 'L' + pt(2 * k, R) + 'L' + pt(2 * k + 1, r) + 'Z"/>';
      }
    });
    var legend = Z.groups.map(function (g) {
      return '<li class="zs-' + g.id + '"><i aria-hidden="true"></i><div><strong>' + esc(t(g.head)) + '</strong><p>' + esc(t(g.text)) + '</p></div></li>';
    }).join('');
    var rewards = Z.rewards.map(function (w) { return '<li><b>' + w.at + '/8</b>' + esc(t(w.text)) + '</li>'; }).join('');
    return '<div class="zs rv"><div class="zs-art"><svg viewBox="0 0 120 120" role="img" aria-label="' + esc(t(Z.title)) + '">' + rays +
      '<circle cx="60" cy="60" r="7" class="zs-core"/></svg></div>' +
      '<div class="zs-body"><p class="jd-l">' + esc(t(Z.kicker)) + '</p><h4 class="zs-title">' + esc(t(Z.title)) + '</h4><p class="zs-lead">' + esc(t(Z.lead)) + '</p>' +
      '<ul class="zs-legend">' + legend + '</ul><ul class="zs-rewards">' + rewards + '</ul><p class="note">' + esc(t(Z.note)) + '</p></div></div>';
  }

  function tbd() { return '<span class="tbd">' + esc(t(S.journey.labels.tbd)) + '</span>'; }
  /* two student packages; the chosen one is shown below the tabs */
  var PKGS = TOUR.packages || [], pkgI = 0;
  (function () { var k = +store('lot-pkg'); if (PKGS[k]) pkgI = k; })();
  function PKG() { return pkJoined && PKGS.length > 1 ? bothPkg() : PKGS[pkgI] || TOUR; }
  /* both packages as one programme: days, legs and lists one after the other; a fact that differs shows both values */
  var BOTHP = null;
  function bothPkg() {
    if (BOTHP) return BOTHP;
    var A = PKGS[0], Z = PKGS[1], X = TOUR.both || {}, SH = S.journey.labels.pkgShort || {};
    var val = function (v, l) { return v == null ? null : typeof v === 'object' ? (v[l] || v.ru) : String(v); };
    var mg = function (a, b) {
      if (a == null && b == null) return null;
      if (JSON.stringify(a) === JSON.stringify(b)) return a;
      var r = {}; ['ru', 'uz', 'en'].forEach(function (l) {
        var x = val(a, l), y = val(b, l), k = val(SH, l) || '';
        r[l] = [x != null ? k + ' 1: ' + x : '', y != null ? k + ' 2: ' + y : ''].filter(Boolean).join(' · ');
      });
      return r;
    };
    var mo = function (a, b) { a = a || {}; b = b || {}; var r = {}; Object.keys(Object.assign({}, a, b)).forEach(function (k) { r[k] = mg(a[k], b[k]); }); return r; };
    var cat = function (k) { return (A[k] || []).concat(Z[k] || []); };
    var uniq = function (l) { var seen = {}; return l.filter(function (x) { var j = JSON.stringify(x); if (seen[j]) return false; seen[j] = 1; return true; }); };
    BOTHP = {
      both: true, tab: X.tab, name: X.name, lead: X.lead, duration: X.duration || mg(A.duration, Z.duration),
      dates: mg(A.dates, Z.dates), start: mg(A.start, Z.start), route: cat('route'), brief: mo(A.brief, Z.brief),
      legs: cat('legs'), hotel: mo(A.hotel, Z.hotel), transport: mo(A.transport, Z.transport),
      meals: mg(A.meals, Z.meals), guides: mg(A.guides, Z.guides), tickets: mg(A.tickets, Z.tickets),
      excursions: uniq(cat('excursions')), included: uniq(cat('included')),
      excluded: (X.tripExcluded ? [X.tripExcluded] : []).concat(uniq((A.excluded || []).slice(1).concat((Z.excluded || []).slice(1)))),
      days: cat('days')
    };
    var n1 = (A.hotel || {}).nights, n2 = (Z.hotel || {}).nights;   // nights add up across the two packages
    if (typeof n1 === 'number' && typeof n2 === 'number') BOTHP.hotel.nights = n1 + n2;
    return BOTHP;
  }
  function uniq(arr) { var o = []; (arr || []).forEach(function (x) { if (!o.some(function (y) { return t(y) === t(x); })) o.push(x); }); return o; }
  function two(n) { return (n < 10 ? '0' : '') + n; }
  function fact(label, v, cls) { return '<div class="jf' + (cls ? ' ' + cls : '') + '"><dt>' + esc(t(label)) + '</dt><dd>' + (v != null && v !== '' ? esc(typeof v === 'object' ? t(v) : String(v)) : tbd()) + '</dd></div>'; }
  function list(arr) { return arr && arr.length ? '<ul>' + arr.map(function (x) { return '<li>' + esc(t(x)) + '</li>'; }).join('') + '</ul>' : tbd(); }

  /* the package on the page stays short: key facts, days, what's included.
     Hours, hotel, transport, meals and tours open in a separate full-screen panel. */
  function renderPkg() {
    var L = S.journey.labels, P = PKG(), DAYS = P.days || [], B = P.brief || {};
    var stage = DAYS.map(function (d, i) {
      return '<figure class="tl-pic' + (i ? '' : ' on') + '" data-d="' + i + '">' + (PH[d.image] ? pic(d.image, { sizes: '(max-width:900px) 100vw, 45vw' }) : '') + '</figure>';
    }).join('');
    var days = DAYS.map(function (d, i) {
      return '<li class="jd' + (i ? '' : ' on') + '" data-d="' + i + '">' +
        '<div class="jd-img ir' + (PH[d.image] ? '' : ' jd-noimg') + '">' + (PH[d.image] ? pic(d.image, { sizes: '100vw' }) : '<span class="jd-place">' + esc(t(d.place)) + '</span>') + '</div>' +
        '<div class="jd-body"><p class="jd-n"><b>' + two(i + 1) + '</b>' + esc(t(L.day)) + ' ' + (i + 1) + '</p><h4 class="tr">' + words(t(d.place)) + '</h4><p class="jd-text">' + esc(t(d.text)) + '</p>' +
        (d.activities && d.activities.length ? '<ul>' + d.activities.map(function (a, k) { return '<li style="--k:' + k + '">' + esc(t(a)) + '</li>'; }).join('') + '</ul>' : '') +
        (d.practical ? '<p class="jd-prac">' + esc(t(d.practical)) + '</p>' : '') +
        (d.schedule ? '<button type="button" class="pk-more pk-more-s" data-details="hours" data-details-day="' + i + '"><span>' + esc(t(L.dayHours)) + '</span><i aria-hidden="true">→</i></button>' : '') +
        '</div></li>';
    }).join('');
    var sum = [[L.duration, P.duration], [L.dates, P.dates], [L.stay, B.hotel], [L.transport, B.transport], [L.meals, B.meals]]
      .map(function (f) { return fact(f[0], f[1]); }).join('');

    return (PKGS.length ? '<div class="pk-head rv"><h3 class="pk-name">' + esc(t(P.name)) + '</h3>' + (P.lead ? '<p class="pk-lead">' + esc(t(P.lead)) + '</p>' : '') + '</div>' : '') +
      '<dl class="jt-facts pk-sum rv">' + sum + '</dl>' +
      '<div class="pk-cta rv"><button type="button" class="pk-more" data-details="hours" data-mag><span>' + esc(t(L.details)) + '</span><i aria-hidden="true">→</i></button>' +
      '<p class="note">' + esc(t(L.detailsNote)) + '</p></div>' +
      '<h3 class="jt-sub tr">' + words(t(L.itinerary)) + '</h3>' +
      '<div class="tl"><div class="tl-stage" aria-hidden="true"><div class="tl-frame">' + stage + '</div>' +
      '<p class="tl-count"><b>01</b> / ' + two(DAYS.length) + '</p><p class="tl-place">' + esc(t(DAYS[0] && DAYS[0].place)) + '</p></div>' +
      '<div class="tl-list"><span class="tl-line" aria-hidden="true"><i></i></span><ol class="jt-days">' + days + '</ol></div></div>' +
      '<div class="jt-price rv' + (TOUR.price ? '' : ' no-price') + '" id="price">' + (TOUR.price ? '<div class="jp-main"><p class="jd-l">' + esc(t(L.price)) + '</p><p class="jp-v tr">' + words(t(TOUR.price)) + '</p></div>' : '') +
      '<div class="jt-incl"><div><h4 class="jt-sub">' + esc(t(L.included)) + '</h4>' + list(P.included) + '</div><div><h4 class="jt-sub">' + esc(t(L.excluded)) + '</h4>' + list(P.excluded) + '</div></div></div>';
  }

  /* ---------- package details: a full-screen panel with its own tabs ---------- */
  var details = null;   // { tab, day } while open
  function detailsHTML() {
    var L = S.journey.labels, P = PKG(), H = P.hotel || {}, TR = P.transport || {}, DAYS = P.days || [];
    var yesNo = function (v) { return v == null ? null : v ? L.yes : L.no; };
    var dl = function (rows) { return '<dl class="jt-facts pd-facts">' + rows.map(function (r) { return fact(r[0], r[1]); }).join('') + '</dl>'; };
    var legs = (P.legs || []).map(function (g) {
      return '<li><span class="pl-r">' + esc(t(g.from)) + ' <i>→</i> ' + esc(t(g.to)) + '</span><span class="pl-km">' + esc(g.km || '') + ' ' + esc(t(L.km)) + '</span>' +
        '<span class="pl-t">' + esc(t(g.time)) + (g.note ? '<small>' + esc(t(g.note)) + '</small>' : '') + '</span></li>';
    }).join('');
    var hours = '<div class="pd-days">' + DAYS.map(function (d, i) {
      return '<section class="pd-day" id="pd-day-' + i + '"><h4 class="pd-dh"><b>' + two(i + 1) + '</b>' + esc(t(L.day)) + ' ' + (i + 1) + ' · ' + esc(t(d.place)) + '</h4>' +
        '<ol class="pd-sch">' + (d.schedule || []).map(function (r) { return '<li><time>' + esc(r[0]) + '</time><span>' + esc(t(r[1])) + '</span></li>'; }).join('') + '</ol></section>';
    }).join('') + '</div><p class="note">' + esc(t(TOUR.note)) + '</p>';
    var panes = {
      hours: hours,
      route: dl([[L.dates, P.dates], [L.duration, P.duration], [L.start, P.start], [L.destinations, P.route ? P.route.map(function (r) { return t(r); }).join(' → ') : null]]) +
        (legs ? '<h4 class="jt-sub">' + esc(t(L.legs)) + '</h4><ul class="pl">' + legs + '</ul><p class="note">' + esc(t(L.approx)) + '</p>' : ''),
      stay: dl([[L.hotel, H.name], [L.stars, H.stars], [L.address, H.address], [L.location, H.city], [L.room, H.room], [L.nights, H.nights], [L.breakfast, yesNo(H.breakfast)]]),
      transport: dl([[L.vehicle, TR.type], [L.model, TR.model], [L.transferIn, TR.transferIn], [L.transferOut, TR.transferOut], [L.driver, TR.driver]]) + '<p class="note">' + esc(t(L.modelNote)) + '</p>',
      tours: dl([[L.meals, P.meals], [L.guides, P.guides], [L.tickets, P.tickets]]) +
        (P.excursions ? '<h4 class="jt-sub">' + esc(t(L.excursions)) + '</h4>' + list(P.excursions) : ''),
      incl: '<div class="jt-incl"><div><h4 class="jt-sub">' + esc(t(L.included)) + '</h4>' + list(P.included) + '</div><div><h4 class="jt-sub">' + esc(t(L.excluded)) + '</h4>' + list(P.excluded) + '</div></div>'
    };
    var names = { hours: L.hours, route: L.whenWhere, stay: L.stay, transport: L.transport, tours: L.mealsTours, incl: L.included };
    var tab = panes[details.tab] ? details.tab : 'hours';
    return '<div class="pd"><p class="jd-l">' + esc(t(L.details)) + '</p><h3 class="lb-title pd-title">' + esc(t(P.name)) + '</h3>' +
      '<p class="pd-meta">' + esc(t(P.duration)) + (P.lead ? ' · ' + esc(t(P.lead)) : '') + '</p>' +
      '<div class="pd-tabs" role="tablist">' + Object.keys(panes).map(function (k) {
        return '<button type="button" role="tab" data-pdt="' + k + '" aria-selected="' + (k === tab) + '">' + esc(t(names[k])) + '</button>';
      }).join('') + '</div>' +
      '<div class="pd-pane" role="tabpanel">' + panes[tab] + '</div>' +
      '<div class="pd-book">' + bookingLink('cta', S.journey.cta) + '</div></div>';
  }
  function openDetails(tab, day) {
    details = { tab: tab || 'hours', day: day == null ? null : day };
    openLightbox(detailsHTML());
    $('#lightbox').classList.add('lb-pd'); atlasInto($('#lightbox'));
    if (day != null) { var d = document.getElementById('pd-day-' + day); if (d) { d.classList.add('hl'); $('#lightbox').scrollTop = d.getBoundingClientRect().top - 150; } }
  }
  function detailsTab(k) {
    details.tab = k; details.day = null;
    $('#lbBody').innerHTML = detailsHTML();
    var b = $('[data-pdt="' + k + '"]', $('#lbBody')); if (b) { b.focus({ preventScroll: true }); b.scrollIntoView({ block: 'nearest', inline: 'center' }); }
    var tb = $('.pd-tabs', $('#lbBody')), lb = $('#lightbox'); if (tb && lb.scrollTop > tb.offsetTop) lb.scrollTop = tb.offsetTop - 10;
  }

  function renderJourney() {
    var J = S.journey, L = J.labels, I = TOUR.intro;

    /* the four cities, each opening onto its first day in its package */
    var seen = {}, cities = [];
    (PKGS.length ? PKGS : [TOUR]).forEach(function (p, pi) {
      (p.days || []).forEach(function (d, i) {
        var k = t(d.place);
        if (!seen[k]) { seen[k] = { name: d.place, image: d.image, pkg: pi, days: [] }; cities.push(seen[k]); }
        if (seen[k].pkg === pi) seen[k].days.push(i + 1);
      });
    });
    var cityCards = cities.map(function (c, i) {
      var tag = PKGS.length ? t(L.pkgShort) + ' ' + (c.pkg + 1) + ' · ' : '';
      return '<button type="button" class="city ir" data-tilt data-city-pkg="' + c.pkg + '" data-city-day="' + c.days[0] + '" style="--d:' + (i * 0.12) + 's" aria-label="' + esc(t(c.name)) + ' · ' + esc(tag + t(L.day)) + ' ' + c.days.join(', ') + '">' +
        '<span class="city-img">' + pic(c.image, { sizes: '(max-width:760px) 78vw, 25vw' }) + '</span>' +
        '<span class="city-n">' + two(i + 1) + '</span>' +
        '<span class="city-name">' + letters(t(c.name)) + '</span>' +
        '<span class="city-days">' + esc(tag + t(L.day)) + ' ' + c.days.join(' · ') + '</span></button>';
    }).join('');

    var tabs = PKGS.length > 1 ? '<div class="pk-tabs rv' + (TOUR.both ? ' has-both' : '') + '" role="tablist" aria-label="' + esc(t(L.packages)) + '">' + PKGS.map(function (p, i) {
      return '<button type="button" role="tab" data-pkg="' + i + '" aria-selected="' + (i === pkgI && !pkJoined) + '"><span class="pk-n">' + esc(t(L.pkgShort)) + ' ' + (i + 1) + '</span>' +
        '<span class="pk-t">' + esc(t(p.tab || p.name)) + '</span><span class="pk-d">' + esc(t(p.duration)) + '</span></button>';
    }).join('') + (TOUR.both ? '<button type="button" role="tab" class="pk-both" data-pkg-both aria-selected="' + pkJoined + '"><span class="pk-n">' + esc(t(TOUR.both.tab)) + ' <i aria-hidden="true">✦</i></span>' +
        '<span class="pk-t">' + esc(PKGS.map(function (p) { return t(p.tab); }).join(' + ')) + '</span><span class="pk-d">' + esc(t(S.booking && S.booking.bothNote)) + '</span></button>' : '') + '</div>' : '';

    var hl = (TOUR.highlights || []).filter(function (h) { return PH[h.image]; }).map(function (h, i) {
      return '<figure class="jh ir" data-tilt data-photo tabindex="0" style="--d:' + (i * 0.1) + 's">' + pic(h.image, { sizes: '(max-width:760px) 78vw, 40vw' }) +
        '<figcaption><strong>' + esc(t(h.name)) + '</strong><span>' + esc(t(h.place)) + '</span></figcaption></figure>';
    }).join('');

    return '<div class="jt" id="program">' +
      '<div class="rv"><p class="kicker"><span class="kl">' + esc(t(J.kicker)) + '</span></p>' +
      (I ? '<h3 class="ji-hook tr">' + words(t(I.hook)) + '</h3><p class="ji-sub">' + esc(t(I.sub)) + '</p>' +
        '<div class="ji-tix' + (pkJoined ? ' joined' : '') + '">' + (I.tickets || []).map(function (k, i) {
          var P = PKGS[k.pkg]; if (!P) return '';
          return '<button type="button" class="ji-t ir" data-pkg-go="' + k.pkg + '" style="--d:' + (i * 0.12 + 0.1) + 's">' +
            '<span class="ji-n">' + esc(t(L.pkgShort)) + ' ' + (k.pkg + 1) + '</span><span class="ji-r">' + esc(t(P.tab)) + '</span>' +
            '<span class="ji-l">' + esc(t(k.line)) + '</span><span class="ji-go" aria-hidden="true">→</span></button>';
        }).join('') + '<span class="ji-seam" aria-hidden="true">✦</span></div>' + joinBar() +
        '<ul class="ji-perks">' + (I.perks || []).map(function (x) { return '<li>' + esc(t(x)) + '</li>'; }).join('') + '</ul>'
      : '<p class="jt-desc tr">' + (TOUR.description ? words(t(TOUR.description)) : tbd()) + '</p>') +
      (TOUR.note ? '<p class="jt-note">' + esc(t(TOUR.note)) + '</p>' : '') + '</div>' +
      '<dl class="jt-facts rv">' + fact(L.audience, TOUR.audience) + fact(L.tourismType, TOUR.tourismType, 'jf-wide') + fact(L.duration, TOUR.duration) +
      fact(L.travelers, TOUR.travelers) + fact(L.season, TOUR.season) + fact(L.level, TOUR.level) + '</dl>' +
      (cities.length ? '<h3 class="jt-sub tr">' + words(t(L.cities)) + '</h3><div class="cities" data-snap>' + cityCards + '</div>' : '') +
      (PKGS.length > 1 ? '<h3 class="jt-sub tr" id="packages">' + words(t(L.chooseTab)) + '</h3>' : '') + tabs +
      '<div class="pk" id="pkg" role="tabpanel">' + renderPkg() + '</div>' +
      (hl ? '<h3 class="jt-sub tr">' + words(t(L.highlights)) + '</h3><div class="jt-hl" data-snap>' + hl + '</div>' : '') +
      '<div class="jt-book rv" id="book">' + bookingLink('cta', J.cta).replace('<a ', '<a data-mag ') + '<p class="note">' + esc(t(J.ctaNote)) + '</p></div>' +
      renderStar() +
      (TOUR.updated ? '<p class="note">' + esc(t(L.updated)) + ': ' + esc(TOUR.updated) + '</p>' : '') +
      '</div>';
  }
  /* switch package: only the package block is redrawn, the page stays where it is */
  function setPkg(i) {
    if (!PKGS[i]) return;
    pkgI = i; store('lot-pkg', String(i));
    if (pkJoined) { setJoined(false); return; }   // picking one package separates the tickets (and redraws this block)
    refreshPkg();
  }
  function refreshPkg() {
    $$('[data-pkg]', main).forEach(function (b) { b.setAttribute('aria-selected', String(+b.getAttribute('data-pkg') === pkgI && !pkJoined)); });
    var bb = $('[data-pkg-both]', main); if (bb) bb.setAttribute('aria-selected', String(pkJoined));
    var box_ = $('#pkg', main); if (!box_) return;
    box_.innerHTML = renderPkg(); curDay = -1; setDay(0);
    observeReveals();
  }

  function renderFooter() {
    var Fo = S.footer;
    return '<footer class="foot"><div class="foot-a"><strong>' + esc(Fo.event) + '</strong><span>' + esc(t(Fo.cities)) + '</span></div>' +
      '<div class="foot-b"><span>' + esc(t(Fo.by)) + '</span><button type="button" class="linkish" id="creditsBtn">' + esc(t(S.ui.credits)) + '</button></div></footer>';
  }

  function renderChrome() {
    root.lang = lang;
    $$('[data-t]').forEach(function (el) { el.textContent = plain(get(el.getAttribute('data-t'))); });
    $$('.langs').forEach(function (box) {
      box.innerHTML = LANGS.map(function (l) {
        return '<button type="button" data-lang="' + l + '" aria-pressed="' + (l === lang) + '">' + l.toUpperCase() + '</button>';
      }).join('');
    });
    $('#menuList').innerHTML = S.chapters.filter(function (c) { return c.id !== 'prologue' || HAS_FILM; }).map(function (c, i) {
      var act = c.id === 'prologue' ? 'data-film' : 'data-jump="' + c.id + '"';
      return '<li><a href="#' + c.id + '" ' + act + '><span class="ml-n">' + (i + 1) + '</span><span class="ml-t">' + esc(t(c.title)) + '</span></a></li>';
    }).join('');
  }

  /* ---------- the two tickets can be joined: hold one, drag it onto the other ---------- */
  var pkJoined = false, tixDrag = null, tixNoClick = 0;
  function joinBar() {
    var B = S.booking || {}, L = S.journey.labels;
    if (PKGS.length < 2 || !B.join) return '';
    return '<div class="ji-join" aria-live="polite">' + (pkJoined
      ? '<p class="ji-both"><b>' + esc(t(B.both)) + '</b><span>' + esc(PKGS.map(function (p) { return t(p.tab); }).join(' + ')) + ' · ' + esc(t(B.bothNote)) + '</span></p>' +
        (B.to ? '<button type="button" class="ji-bk" data-book data-book-pkg="both">' + esc(t(B.bookBoth)) + ' <i aria-hidden="true">→</i></button>' : '') +
        '<button type="button" class="ji-un" data-unjoin>✕ ' + esc(t(B.unjoin)) + '</button>'
      : '<p class="ji-hint"><span aria-hidden="true">⇄</span> ' + esc(t(B.joinHint)) + '</p><button type="button" class="ji-jb" data-join>' + esc(t(B.join)) + '</button>') + '</div>';
  }
  function setJoined(on) {
    var box = $('.ji-tix', main); if (!box) { pkJoined = on; refreshPkg(); return; }
    var tix = $$('.ji-t', box), before = tix.map(function (el) { return el.getBoundingClientRect(); });
    pkJoined = on;
    tix.forEach(function (el) { el.style.transition = 'none'; el.style.transform = ''; el.classList.remove('lift', 'near'); });
    box.classList.toggle('joined', on);
    var bar = $('.ji-join', main); if (bar) bar.outerHTML = joinBar();
    refreshPkg();
    if (reduce) { tix.forEach(function (el) { el.style.transition = ''; }); return; }
    tix.forEach(function (el, i) {   // FLIP: from where each ticket was to where it now sits
      var r = el.getBoundingClientRect(), b = before[i];
      el.style.transform = 'translate(' + (b.left - r.left) + 'px,' + (b.top - r.top) + 'px)';
    });
    void box.offsetWidth;
    tix.forEach(function (el) { el.style.transition = 'transform .55s cubic-bezier(.3,1.4,.4,1)'; el.style.transform = ''; });
    box.classList.add(on ? 'snap' : 'unsnap');
    setTimeout(function () { box.classList.remove('snap', 'unsnap'); tix.forEach(function (el) { el.style.transition = ''; }); }, 700);
  }
  function tixDown(e) {
    var el = e.target.closest && e.target.closest('.ji-t'); if (!el || e.button > 0 || PKGS.length < 2) return;
    var other = $$('.ji-t', main).filter(function (x) { return x !== el; })[0]; if (!other) return;
    tixDrag = { el: el, other: other, id: e.pointerId, x: e.clientX, y: e.clientY, on: false, near: false, apart: false,
      timer: setTimeout(function () {
        if (!tixDrag) return;
        tixDrag.on = true; el.classList.add('lift'); el.style.transition = 'none';
        try { el.setPointerCapture(tixDrag.id); } catch (er) {}
        if (navigator.vibrate) try { navigator.vibrate(12); } catch (er) {}
      }, e.pointerType === 'mouse' ? 160 : 280) };
  }
  function tixMove(e) {
    var d = tixDrag; if (!d || e.pointerId !== d.id) return;
    var dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.on) { if (Math.abs(dx) + Math.abs(dy) > 10) { clearTimeout(d.timer); tixDrag = null; } return; }   // moved before the hold: a scroll
    d.el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + (dx * .012).toFixed(2) + 'deg)';
    var a = d.el.getBoundingClientRect(), b = d.other.getBoundingClientRect();
    if (pkJoined) { d.apart = Math.hypot(dx, dy) > Math.min(a.width, 260) * .45; d.el.classList.toggle('pulling', d.apart); }
    else {
      var ax = a.left + a.width / 2, ay = a.top + a.height / 2, bx = b.left + b.width / 2, by = b.top + b.height / 2;
      d.near = Math.abs(ax - bx) < b.width * .9 && Math.abs(ay - by) < b.height * .9;
      d.other.classList.toggle('near', d.near);
    }
  }
  function tixUp(e) {
    var d = tixDrag; if (!d || e.pointerId !== d.id) return;
    clearTimeout(d.timer); tixDrag = null;
    if (!d.on) return;
    tixNoClick = Date.now();
    d.el.classList.remove('lift', 'pulling'); d.other.classList.remove('near');
    if (!pkJoined && d.near) return setJoined(true);
    if (pkJoined && d.apart) return setJoined(false);
    d.el.style.transition = ''; d.el.style.transform = '';   // not close enough: fly back
  }
  main.addEventListener('pointerdown', tixDown);
  window.addEventListener('pointermove', tixMove, { passive: true });
  window.addEventListener('pointerup', tixUp);
  window.addEventListener('pointercancel', tixUp);
  // while a ticket is held, the finger drags it instead of scrolling the page
  main.addEventListener('touchmove', function (e) { if (tixDrag && tixDrag.on) e.preventDefault(); }, { passive: false });
  main.addEventListener('contextmenu', function (e) { if (e.target.closest && e.target.closest('.ji-t')) e.preventDefault(); });

  function renderSite() {
    main.innerHTML = '<section id="journey" class="journey" aria-label="' + esc(plain(TOUR.title)) + '">' + renderHero() + renderJourney() + '</section>' + renderFooter();
    main.style.setProperty('--open', openScale());
    renderChrome();
    observeReveals();
    heroAuto();
  }

  /* ================= INTERACTION: reveals, programme, parallax, tilt, magnetic, photos ================= */
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var io = null, dayIO = null;
  function observeReveals() {
    if (io) io.disconnect();
    if (dayIO) dayIO.disconnect();
    var els = $$('.rv, .tr, .ir', main);
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); }
    else {
      io = new IntersectionObserver(function (list) {
        list.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
      els.forEach(function (el) { io.observe(el); });
    }
    // the programme: the day crossing the middle of the screen becomes the active one
    if ('IntersectionObserver' in window) {
      dayIO = new IntersectionObserver(function (list) {
        list.forEach(function (en) { if (en.isIntersecting) setDay(+en.target.getAttribute('data-d')); });
      }, { rootMargin: '-45% 0px -45% 0px' });
      $$('.jd', main).forEach(function (el) { dayIO.observe(el); });
    }
    if (!fine) $$('[data-snap]', main).forEach(function (row) { row.addEventListener('scroll', function () { snapActive(row); }, { passive: true }); snapActive(row); });
    $$('.uh .cta, .watch-again, .hx-go', main).forEach(function (el) { el.setAttribute('data-mag', ''); });
    onScroll();
  }
  var curDay = 0;
  function setDay(i) {
    if (i === curDay && $('.jd.on', main)) return;
    curDay = i;
    $$('.jd', main).forEach(function (el) { el.classList.toggle('on', +el.getAttribute('data-d') === i); });
    $$('.tl-pic', main).forEach(function (el) { el.classList.toggle('on', +el.getAttribute('data-d') === i); });
    var d = (PKG().days || [])[i], c = $('.tl-count b', main), pl = $('.tl-place', main);
    if (c) c.textContent = (i < 9 ? '0' : '') + (i + 1);
    if (pl && d) { pl.classList.remove('swap'); void pl.offsetWidth; pl.textContent = t(d.place); pl.classList.add('swap'); }
  }
  /* phones: the card in the middle of a swipe row is the "hovered" one */
  function snapActive(row) {
    var mid = row.getBoundingClientRect().left + row.clientWidth / 2, best = null, bd = 1e9;
    Array.prototype.forEach.call(row.children, function (c) {
      var r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bd) { bd = d; best = c; }
    });
    Array.prototype.forEach.call(row.children, function (c) { c.classList.toggle('act', c === best); });
  }

  /* scroll: parallax of big photos and the programme's progress line */
  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; scrollFx(); }); } }
  function scrollFx() {
    var vh = window.innerHeight, y = window.scrollY;
    var uh = $('.uh', main); document.body.classList.toggle('on-light', isLight() && !!uh && y > uh.offsetHeight - 40);
    var bg = $('.uh-bg', main);
    if (bg && !reduce && y < vh * 1.2) { bg.style.transform = 'translate3d(0,' + (y * 0.35).toFixed(1) + 'px,0)'; var ui_ = $('.uh-in', main); if (ui_) { ui_.style.transform = 'translate3d(0,' + (y * 0.15).toFixed(1) + 'px,0)'; ui_.style.opacity = Math.max(0, 1 - y / (vh * 0.75)).toFixed(3); } }
    if (!reduce) $$('.city-img img, .jd-img img, .tl-pic.on img', main).forEach(function (im) {
      var r = im.parentNode.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      var k = ((r.top + r.height / 2) - vh / 2) / vh;   // -1 … 1
      im.style.setProperty('--py', (k * -28).toFixed(1) + 'px');
    });
    var list = $('.tl-list', main), line = $('.tl-line i', main);
    if (list && line) {
      // the line ends at the last day's marker (the top of its photo), not at the bottom of the list
      var last = $('.jt-days > li:last-child', list), end = list.offsetHeight;
      if (last) end = last.offsetTop + (parseFloat(getComputedStyle(last, '::before').top) || 0) + 6;
      line.parentNode.style.height = end + 'px';
      var r = list.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh * 0.5 - r.top) / end));
      line.style.transform = 'scaleY(' + p.toFixed(4) + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  // hovering a day of the programme brings its photo forward
  if (fine) main.addEventListener('pointerover', function (e) { var d = e.target.closest && e.target.closest('.jd'); if (d) setDay(+d.getAttribute('data-d')); });

  /* pointer: subtle 3D tilt on photos and cards, magnetic buttons */
  if (fine && !reduce) {
    document.addEventListener('pointermove', function (e) {
      var tl = e.target.closest && e.target.closest('[data-tilt]');
      $$('[data-tilt].tilting').forEach(function (el) { if (el !== tl) untilt(el); });
      if (tl) {
        var r = tl.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, yy = (e.clientY - r.top) / r.height - .5;
        tl.classList.add('tilting');
        tl.style.setProperty('--rx', (-yy * 7).toFixed(2) + 'deg');
        tl.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg');
        tl.style.setProperty('--mx', (x * 100 + 50).toFixed(1) + '%');
        tl.style.setProperty('--my', (yy * 100 + 50).toFixed(1) + '%');
      }
      var mg = e.target.closest && e.target.closest('[data-mag]');
      $$('[data-mag].pull').forEach(function (el) { if (el !== mg) { el.classList.remove('pull'); el.style.transform = ''; } });
      if (mg) {
        var m = mg.getBoundingClientRect(), dx = e.clientX - (m.left + m.width / 2), dy = e.clientY - (m.top + m.height / 2);
        mg.classList.add('pull');
        mg.style.transform = 'translate(' + (dx * .22).toFixed(1) + 'px,' + (dy * .32).toFixed(1) + 'px)';
      }
    }, { passive: true });
    document.addEventListener('pointerleave', function () { $$('[data-tilt].tilting').forEach(untilt); }, true);
  }
  function untilt(el) { el.classList.remove('tilting'); el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); }

  /* photos open to full screen from where they are, and close back into place */
  var viewer = null;
  function flipRect(el) { var r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }
  function openPhoto(fig) {
    var img = $('img', fig); if (!img || viewer) return;
    var r = flipRect(img), cap = $('figcaption', fig);
    var v = document.createElement('div'); v.className = 'pv'; v.setAttribute('role', 'dialog'); v.setAttribute('aria-modal', 'true');
    v.innerHTML = '<div class="pv-bg"></div><img alt="" src="' + (img.currentSrc || img.src) + '"><div class="pv-cap">' + (cap ? cap.innerHTML : '') + '</div><button type="button" class="pv-x" aria-label="' + esc(t(S.ui.close)) + '">×</button>';
    var big = img.getAttribute('srcset'); if (big) { var last = big.split(',').pop().trim().split(' ')[0]; var hi = new Image(); hi.onload = function () { var el = $('img', v); if (el) el.src = last; }; hi.src = last; }
    document.body.appendChild(v); root.classList.add('lock');
    var pi = $('img', v), vw = window.innerWidth, vh = window.innerHeight;
    var ar = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : r.w / r.h;
    var w = Math.min(vw * .92, vh * .84 * ar), h = w / ar, x = (vw - w) / 2, y = (vh - h) / 2;
    pi.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px';
    viewer = { el: v, from: fig, to: { x: x, y: y, w: w, h: h } };
    if (!reduce && pi.animate) pi.animate([{ transform: 'translate(' + (r.x - x) + 'px,' + (r.y - y) + 'px) scale(' + (r.w / w) + ',' + (r.h / h) + ')', borderRadius: '0' }, { transform: 'none' }], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' });
    requestAnimationFrame(function () { v.classList.add('open'); });
    $('.pv-x', v).focus();
  }
  function closePhoto() {
    if (!viewer) return;
    var v = viewer.el, pi = $('img', v), from = $('img', viewer.from), to = viewer.to, done = function () { v.remove(); if (!film.open) root.classList.remove('lock'); };
    v.classList.remove('open');
    var vf = viewer.from; viewer = null;
    if (reduce || !pi.animate || !from) { done(); vf.focus && vf.focus({ preventScroll: true }); return; }
    var r = flipRect(from);
    var an = pi.animate([{ transform: 'none' }, { transform: 'translate(' + (r.x - to.x) + 'px,' + (r.y - to.y) + 'px) scale(' + (r.w / to.w) + ',' + (r.h / to.h) + ')' }], { duration: 520, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    an.onfinish = done;
    vf.focus && vf.focus({ preventScroll: true });
  }

  /* a city card grows into a full-screen photo, then the page lands on that city's day */
  function openCity(card) {
    var day = +card.getAttribute('data-city-day') - 1, pk = +card.getAttribute('data-city-pkg') || 0;
    var land = function () {
      if (pk !== pkgI) setPkg(pk);
      var target = $('.jd[data-d="' + day + '"]', main); if (!target) return;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3, behavior: 'auto' }); setDay(day);
    };
    var img = $('img', card);
    if (reduce || !img || !document.body.animate) { land(); return; }
    var r = flipRect(card), z = document.createElement('div');
    z.className = 'cz'; z.innerHTML = '<img alt="" src="' + (img.currentSrc || img.src) + '"><p>' + esc(card.getAttribute('aria-label').split(' · ')[0]) + '</p>';
    document.body.appendChild(z);
    var vw = window.innerWidth, vh = window.innerHeight;
    var a = z.animate([{ clipPath: 'inset(' + r.y + 'px ' + (vw - r.x - r.w) + 'px ' + (vh - r.y - r.h) + 'px ' + r.x + 'px)' }, { clipPath: 'inset(0px 0px 0px 0px)' }], { duration: 750, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' });
    a.onfinish = function () {
      z.classList.add('full');
      setTimeout(function () {
        land();
        z.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, delay: 250, easing: 'ease', fill: 'forwards' }).onfinish = function () { z.remove(); };
      }, 650);
    };
  }

  /* ================= THE FILM PLAYER (fullscreen overlay) ================= */
  var box = null, vid = null, ui = null;
  var film = { open: false, raf: 0, cur: -2, phase: 'idle', idle: 0, timers: [] };

  /* ---------- background music: a separate MP3 that follows the film ----------
   * F.music: path to the MP3 (null = no music). It plays only while the film sound is on,
   * stays in sync with the picture, dips under the narrator's voice (F.voice: the video has its own
   * narration; detected automatically, or listed by hand in F.duck) and rises to its peak at the finale. */
  var mus = { el: null, ctx: null, gain: null, an: null, buf: null, talk: 0 };
  function hasSound() { return !!(F.voice || F.music); }
  function ensureAudio() {
    if (!F.music && !F.voice) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (F.music && !mus.el) { mus.el = new Audio(F.music); mus.el.preload = 'auto'; mus.el.loop = false; }
    if (AC && !mus.ctx) {
      try {
        mus.ctx = new AC();
        if (mus.el) { mus.gain = mus.ctx.createGain(); mus.gain.gain.value = 0; mus.ctx.createMediaElementSource(mus.el).connect(mus.gain); mus.gain.connect(mus.ctx.destination); }
        if (F.voice && F.music) {   // listen to the film's own sound to find the narrator
          var src = mus.ctx.createMediaElementSource(vid); mus.an = mus.ctx.createAnalyser(); mus.an.fftSize = 1024;
          src.connect(mus.an); mus.an.connect(mus.ctx.destination); mus.buf = new Float32Array(mus.an.fftSize);
        }
      } catch (e) { mus.ctx = null; }
    }
    if (mus.ctx && mus.ctx.state === 'suspended') mus.ctx.resume();
  }
  function musicFollow() {
    var m = mus.el; if (!m) return;
    if (film.phase === 'unlock') return;   // the finale: the music carries on under the title, then fades
    var on = film.phase === 'film' && !vid.muted && !vid.paused && !vid.ended;
    if (!on) { if (!m.paused) m.pause(); return; }
    if (m.duration && vid.currentTime < m.duration && Math.abs(m.currentTime - vid.currentTime) > 0.35) { try { m.currentTime = vid.currentTime; } catch (e) {} }
    if (m.paused && (!m.duration || vid.currentTime < m.duration)) m.play().catch(function () {});
  }
  function musicLevel() {
    var m = mus.el; if (!m) return;
    var tm = vid.currentTime, base = F.musicVolume != null ? +F.musicVolume : 0.75, peak = 1;
    var swell = F.swellAt != null ? +F.swellAt : ((F.cues || []).filter(function (c) { return c.motto; })[0] || { from: (vid.duration || 60) - 10 }).from;
    var target = tm >= swell ? peak : base;
    // the narrator is speaking: listed by hand, or heard in the film's own sound
    var talking = (F.duck || []).some(function (r) { return tm >= r[0] && tm < r[1]; });
    if (!talking && mus.an) {
      mus.an.getFloatTimeDomainData(mus.buf);
      var sum = 0; for (var i = 0; i < mus.buf.length; i++) sum += mus.buf[i] * mus.buf[i];
      if (Math.sqrt(sum / mus.buf.length) > 0.02) mus.talk = performance.now();
      talking = performance.now() - mus.talk < 450;
    }
    if (talking && tm < swell) target = base * (F.duckTo != null ? +F.duckTo : 0.3);
    if (mus.gain) { mus.gain.gain.cancelScheduledValues(mus.ctx.currentTime + 0.05); mus.gain.gain.setTargetAtTime(target, mus.ctx.currentTime, talking ? 0.12 : 0.6); }
    else m.volume = Math.max(0, Math.min(1, target));
  }

  function buildPlayer() {
    box = document.createElement('div');
    box.id = 'film'; box.className = 'film'; box.hidden = true;
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<video class="fm-video" playsinline preload="none"></video><div class="fm-shade" aria-hidden="true"></div><div class="fm-ui"></div>';
    document.body.appendChild(box);
    vid = $('.fm-video', box); ui = $('.fm-ui', box);
    vid.addEventListener('play', function () { musicFollow(); box.classList.add('playing'); box.classList.remove('paused', 'waiting'); controls(); tick(); });
    vid.addEventListener('pause', function () { musicFollow(); box.classList.remove('playing'); if (film.phase === 'film') box.classList.add('paused'); controls(); wake(); });
    vid.addEventListener('ended', function () { if (film.phase === 'film') unlock(false); });
    vid.addEventListener('error', function () { if (film.open && film.phase === 'film') unlock(true); });
    vid.addEventListener('volumechange', function () { controls(); musicFollow(); });
    vid.addEventListener('seeked', musicFollow);
    ['mousemove', 'touchstart', 'keydown'].forEach(function (ev) { box.addEventListener(ev, wake, { passive: true }); });
    // a tap on the picture itself turns the sound on (the film starts muted: browsers block autoplay with sound)
    ui.addEventListener('click', function (e) {
      if (e.target.closest('button, a') || film.phase !== 'film' || box.classList.contains('waiting')) return;
      if (vid.muted && hasSound()) { ensureAudio(); vid.muted = false; vid.volume = 1; }
    });
  }
  function renderPlayer() {
    var cues = (F.cues || []).map(function (c, i) {
      if (c.motto) {
        var m = t(F.motto) || [];
        if (typeof m === 'string') m = [m, ''];
        return '<div class="fm-cue fm-motto" data-i="' + i + '"><p class="fm-m1">' + esc(m[0] || '') + '</p><p class="fm-m2">' + esc(m[1] || '') + '</p><small>' + esc(t(S.intro.mottoNote)) + '</small></div>';
      }
      if (c.invite) return '<div class="fm-cue fm-invite" data-i="' + i + '"><p>' + esc(t(F.invite)) + '</p></div>';
      var cls = 'fm-cue p-' + (c.pos || 'bl') + (c.look ? ' l-' + c.look : ''), inner;
      if (c.look === 'year') inner = '<span class="fm-n" aria-hidden="true">' + esc(c.n || '') + '</span><div class="fm-cw"><p class="fm-k">' + esc(c.n ? c.n + ' · ' : '') + esc(t(c.k)) + '</p><p class="fm-t">' + words(t(c.text)) + '</p></div>';
      else if (c.look === 'place') inner = '<p class="fm-big">' + letters(t(c.k)) + '</p><p class="fm-s">' + words(t(c.text)) + '</p>';
      else if (c.look === 'quote') inner = '<p class="fm-k">' + esc(t(c.k)) + '</p><p class="fm-q">' + words(t(c.text)) + '</p>';
      else inner = '<p class="fm-k">' + esc(t(c.k)) + '</p><p class="fm-t">' + words(t(c.text)) + '</p>';
      return '<div class="' + cls + '" data-i="' + i + '">' + inner + '</div>';
    }).join('');
    box.setAttribute('aria-label', t(S.ui.watch));
    ui.innerHTML =
      '<div class="fm-caps" aria-live="polite">' + cues + '</div>' +
      (F.ownTitle ? '' : '<div class="fm-unlock" aria-hidden="true">' + heroInner(true) + '</div>') +
      '<button type="button" class="fm-start" data-act="start"><span class="fs-i" aria-hidden="true">▶</span><span class="fs-l">' + esc(t(S.ui.watch)) + '</span></button>' +
      '<div class="fm-top">' + (F.standIn ? '<p class="fm-note">' + esc(t(F.standInNote)) + '</p>' : '<span></span>') +
      '<div class="langs" role="group" aria-label="Language"></div></div>' +
      '<div class="fm-bar">' +
      '<button type="button" class="fm-btn fm-play" data-act="play"></button>' +
      '<button type="button" class="fm-btn fm-replay" data-act="replay" aria-label="' + esc(t(S.ui.replay)) + '" title="' + esc(t(S.ui.replay)) + '">↺</button>' +
      '<div class="fm-progress" aria-hidden="true"><i></i></div>' +
      '<button type="button" class="fm-sound" data-act="sound"><span class="fm-sound-i" aria-hidden="true"></span><span class="fm-sound-l"></span></button>' +
      '<button type="button" class="fm-skip" data-act="skip">' + esc(t(S.ui.skip)) + '</button>' +
      '</div>';
    $$('.langs', ui).forEach(function (b) {
      b.innerHTML = LANGS.map(function (l) { return '<button type="button" data-lang="' + l + '" aria-pressed="' + (l === lang) + '">' + l.toUpperCase() + '</button>'; }).join('');
    });
    ui.classList.toggle('no-sound', !hasSound());
    film.cur = -2; controls(); if (vid.src) tick(true);
  }
  function controls() {
    if (!ui) return;
    var playing = !vid.paused && !vid.ended, b = $('.fm-play', ui), s = $('.fm-sound', ui);
    if (b) { b.textContent = playing ? '❚❚' : '▶'; b.setAttribute('aria-label', t(playing ? S.ui.pause : S.ui.play)); b.title = t(playing ? S.ui.pause : S.ui.play); }
    if (s) {
      s.classList.toggle('on', !vid.muted);
      $('.fm-sound-l', s).textContent = t(vid.muted ? S.ui.filmSoundOn : S.ui.filmSoundOff);
    }
  }
  function wake() {
    if (!box) return;
    box.classList.remove('idle');
    clearTimeout(film.idle);
    film.idle = setTimeout(function () { if (!vid.paused) box.classList.add('idle'); }, 2600);
  }
  function tick(once) {
    var tm = vid.currentTime, cues = F.cues || [], on = -1;
    for (var i = 0; i < cues.length; i++) if (tm >= cues[i].from && tm < cues[i].to) on = i;
    if (on !== film.cur) {
      film.cur = on;
      $$('.fm-cue', ui).forEach(function (el) { el.classList.toggle('on', +el.getAttribute('data-i') === on); });
    }
    var bar = $('.fm-progress i', ui); if (bar && vid.duration) bar.style.transform = 'scaleX(' + (tm / vid.duration) + ')';
    if (mus.el) { musicFollow(); musicLevel(); }
    cancelAnimationFrame(film.raf);
    if (!once && !vid.paused && !vid.ended) film.raf = requestAnimationFrame(function () { tick(); });
  }
  function later(fn, ms) { film.timers.push(setTimeout(fn, ms)); }
  function clearLater() { film.timers.forEach(clearTimeout); film.timers = []; }

  /* open the player; `gesture` = the viewer clicked, so sound may start */
  function openFilm(gesture) {
    if (!HAS_FILM) return;
    if (!box) buildPlayer();
    clearLater(); toggleMenu(false); closeLightbox();
    renderPlayer();
    film.open = true; film.phase = 'film'; film.cur = -2;
    box.className = 'film'; box.hidden = false;
    root.classList.add('lock'); document.body.classList.add('film-on');
    main.setAttribute('inert', ''); main.setAttribute('aria-hidden', 'true');
    var src = pick(F.src);
    if (vid.getAttribute('src') !== src) { vid.setAttribute('src', src); }
    vid.poster = pick(F.poster);
    if (F.portraitFit) vid.setAttribute('data-fit', F.portraitFit); else vid.removeAttribute('data-fit');
    vid.preload = 'auto';
    try { vid.currentTime = 0; } catch (e) {}
    vid.muted = !(gesture && hasSound());
    if (reduce && !gesture) { box.classList.add('waiting'); controls(); $('.fm-start', ui).focus(); return; }
    start(gesture);
  }
  function start(withSound) {
    box.classList.remove('waiting');
    withSound = withSound && hasSound();
    if (withSound) ensureAudio();
    vid.muted = !withSound;
    var p = vid.play();
    if (p && p.catch) p.catch(function () {
      if (!vid.muted) { vid.muted = true; return start(false); }
      box.classList.add('waiting'); controls();   // autoplay blocked: wait for a tap
    });
    wake();
    setTimeout(function () { var b = $(hasSound() ? '.fm-sound' : '.fm-play', ui); if (b && film.phase === 'film') b.focus({ preventScroll: true }); }, 50);
  }
  function togglePlay() {
    if (vid.paused || vid.ended) { if (vid.ended) replay(); else start(!vid.muted); }
    else vid.pause();
  }
  function replay() {
    clearLater(); film.phase = 'film'; box.className = 'film';
    try { vid.currentTime = 0; } catch (e) {}
    start(!vid.muted);
  }

  /* ---------- the level-unlock transition: film → site ---------- */
  function unlock(skipped) {
    if (film.phase !== 'film') return;
    film.phase = 'unlock';
    store(SEEN, '1');
    if (!vid.ended) vid.pause();
    cancelAnimationFrame(film.raf);
    if (mus.el && !mus.el.paused) {   // the music peaks under the title, then fades away as the site opens
      if (mus.gain) { mus.gain.gain.cancelScheduledValues(mus.ctx.currentTime); mus.gain.gain.setTargetAtTime(1, mus.ctx.currentTime, 0.3); mus.gain.gain.setTargetAtTime(0, mus.ctx.currentTime + (skipped ? 0.8 : 2.4), 0.6); }
      later(function () { if (mus.el) { if (!mus.gain) mus.el.volume = 0; } }, skipped ? 1800 : 3400);
      later(function () { if (mus.el) mus.el.pause(); }, skipped ? 3000 : 5600);
    }
    $$('.fm-cue', ui).forEach(function (el) { el.classList.remove('on'); });
    // the site is built underneath, already "opened", so the overlay can dissolve into it
    renderSite();
    window.scrollTo(0, 0);
    document.body.classList.remove('unlocked');
    box.style.setProperty('--open', openScale());
    box.classList.remove('idle', 'paused', 'waiting');
    box.classList.add('unlocking');                       // frame opens up, the title arrives
    var slow = reduce ? 0.2 : skipped ? 0.65 : 1;
    later(function () { box.classList.add('titled'); }, 300 * slow);
    later(function () {
      main.removeAttribute('inert'); main.removeAttribute('aria-hidden');
      document.body.classList.remove('film-on');
      document.body.classList.add('unlocked', 'arriving');
      root.classList.remove('lock');
      box.classList.add('gone');                          // dissolve into the hero
    }, 2900 * slow);
    later(function () {
      box.hidden = true; box.className = 'film'; film.open = false; film.phase = 'idle';
      vid.preload = 'none';
      var c = $('.uh .cta, .hx-go'); c && c.focus({ preventScroll: true });
    }, 4100 * slow);
  }

  /* skip / close without having finished = same unlock, a little faster */
  function skip() { if (film.phase === 'film') unlock(true); }

  /* ---------- booking form: package 1, 2 or both, a date and a message, sent by email ---------- */
  var bookDraft = null;
  function bookHTML() {
    var B = S.booking, L = S.journey.labels, d = bookDraft || {};
    var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    var min = today.toISOString().slice(0, 10);
    var opts = PKGS.map(function (p, i) { return { v: String(i + 1), k: t(L.pkgShort) + ' ' + (i + 1), n: t(p.tab), s: t(p.duration) }; });
    if (PKGS.length > 1) opts.push({ v: 'both', k: t(B.both), n: PKGS.map(function (p) { return t(p.tab); }).join(' + '), s: t(B.bothNote) });
    var sel = d.pkg || String((pkgI || 0) + 1);
    var field = function (id, label, input) { return '<label class="bk-f" for="' + id + '"><span>' + esc(t(label)) + ' <b aria-hidden="true">*</b></span>' + input + '</label>'; };
    return '<form class="bk" novalidate>' +
      '<p class="jd-l">' + esc(t(TOUR.title)) + '</p><h3 class="lb-title bk-title">' + esc(t(B.title)) + '</h3>' +
      '<p class="bk-lead">' + esc(t(B.lead)) + '</p>' +
      '<fieldset class="bk-pk"><legend>' + esc(t(B.pkg)) + ' <b aria-hidden="true">*</b></legend>' + opts.map(function (o) {
        return '<label class="bk-o"><input type="radio" name="pkg" value="' + o.v + '"' + (o.v === sel ? ' checked' : '') + '>' +
          '<span class="bk-oc"><small>' + esc(o.k) + '</small><strong>' + esc(o.n) + '</strong><em>' + esc(o.s) + '</em></span></label>';
      }).join('') + '</fieldset>' +
      '<div class="bk-row">' +
        field('bkDate', B.date, '<input id="bkDate" name="date" type="date" required min="' + min + '" value="' + esc(d.date || '') + '">') +
        field('bkName', B.name, '<input id="bkName" name="name" type="text" required autocomplete="name" maxlength="80" value="' + esc(d.name || '') + '">') +
        field('bkContact', B.contact, '<input id="bkContact" name="contact" type="text" required autocomplete="tel" maxlength="80" placeholder="' + esc(t(B.contactPh)) + '" value="' + esc(d.contact || '') + '">') +
      '</div>' +
      '<label class="bk-f bk-msg" for="bkMsg"><span>' + esc(t(B.message)) + '</span><textarea id="bkMsg" name="message" rows="4" maxlength="2000" placeholder="' + esc(t(B.messagePh)) + '">' + esc(d.message || '') + '</textarea></label>' +
      '<input class="bk-hp" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<p class="bk-err" role="alert" hidden></p>' +
      '<div class="bk-go"><button type="submit" class="cta"><span>' + esc(t(B.send)) + '</span><i aria-hidden="true"></i></button>' +
      '<a class="bk-tg" href="' + esc(B.telegram || TOUR.bookingUrl || '#') + '" target="_blank" rel="noopener">' + esc(t(B.tg)) + ' →</a></div>' +
      '</form>';
  }
  function bookRead(f) {
    var g = function (n) { var el = f.elements[n]; return el ? String(el.value || '').trim() : ''; };
    var pk = f.querySelector('input[name="pkg"]:checked');
    return { pkg: pk ? pk.value : '', date: g('date'), name: g('name'), contact: g('contact'), message: g('message') };
  }
  function openBook(pref) {
    if (pref || pkJoined) bookDraft = Object.assign({}, bookDraft || {}, { pkg: pref || 'both' });
    closeLightbox();
    openLightbox(bookHTML());
    $('#lightbox').classList.add('lb-pd', 'lb-bk'); atlasInto($('#lightbox'));
    var f = $('#lbBody .bk'); if (f) f.addEventListener('submit', sendBook);
    f.addEventListener('input', function () { bookDraft = bookRead(f); });
    f.addEventListener('change', function () { bookDraft = bookRead(f); });
  }
  function sendBook(e) {
    e.preventDefault();
    var f = e.currentTarget, B = S.booking, L = S.journey.labels, v = bookRead(f), err = $('.bk-err', f), btn = $('button[type="submit"]', f);
    bookDraft = v;
    $$('.bk-f', f).forEach(function (el) { el.classList.remove('bad'); });
    var miss = ['date', 'name', 'contact'].filter(function (k) { return !v[k]; });
    miss.forEach(function (k) { var el = f.elements[k]; if (el) el.closest('.bk-f').classList.add('bad'); });
    if (miss.length || !v.pkg) { err.textContent = t(B.required); err.hidden = false; var first = f.elements[miss[0]]; first && first.focus(); return; }
    if (f.elements._honey.value) return;
    var pkgName = v.pkg === 'both' ? 'Оба пакета: ' + PKGS.map(function (p) { return p.tab.ru || t(p.tab); }).join(' + ')
      : 'Пакет ' + v.pkg + ': ' + ((PKGS[+v.pkg - 1] || {}).tab || {}).ru;
    var body = {
      'Пакет': pkgName, 'Дата': v.date.split('-').reverse().join('.'), 'Имя': v.name, 'Контакт': v.contact,
      'Сообщение': v.message || '—', 'Язык сайта': lang.toUpperCase(),
      _subject: t(B.subject) + ' · ' + v.name, _template: 'table', _captcha: 'false'
    };
    err.hidden = true; btn.disabled = true; $('span', btn).textContent = t(B.sending);
    // Web3Forms when an access key is set (no activation step), otherwise FormSubmit
    var w3 = B.web3formsKey, svc = w3 ? 'Web3Forms' : 'FormSubmit', payload = body;
    if (w3) {
      payload = {};
      Object.keys(body).forEach(function (k) { if (k.charAt(0) !== '_') payload[k] = body[k]; });
      payload.access_key = w3; payload.subject = body._subject; payload.from_name = 'TSTU Travel · сайт';
    }
    fetch(w3 ? 'https://api.web3forms.com/submit' : 'https://formsubmit.co/ajax/' + encodeURIComponent(B.to), {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || String(j.success) !== 'true') throw new Error(j.message || String(r.status)); }); })
      .then(function () {
        bookDraft = null;
        f.innerHTML = '<p class="jd-l">' + esc(t(TOUR.title)) + '</p><h3 class="lb-title bk-title">' + esc(t(B.okTitle)) + '</h3><p class="bk-lead" role="status">' + esc(t(B.ok)) + '</p>' +
          '<ul class="bk-sum"><li><b>' + esc(t(B.pkg)) + '</b>' + esc(v.pkg === 'both' ? t(B.both) : t(L.pkgShort) + ' ' + v.pkg) + '</li><li><b>' + esc(t(B.date)) + '</b>' + esc(body['Дата']) + '</li></ul><div class="bk-guyw">' + rahmatVideo() + '</div>' +
          '<div class="bk-backw"><button type="button" class="cta bk-back" data-close><span>' + esc(t(B.back)) + '</span><i aria-hidden="true"></i></button></div>';
        f.insertAdjacentHTML('afterbegin', rosetteSVG() + (B.okNational ? '<p class="bk-nat">' + esc(t(B.okNational)) + '</p>' : ''));
        var lb = $('#lightbox'); lb.classList.add('lb-ok'); atlasInto(lb); lb.scrollTop = 0;
        confetti($('.bk-ros', f));
      })
      .catch(function (x) {
        var m = String((x && x.message) || '');
        if (window.console) console.warn('[booking] ' + svc + ':', m);
        btn.disabled = false; $('span', btn).textContent = t(B.send);
        // FormSubmit answers "This form needs Activation…" until the owner confirms the address once
        err.textContent = t(/activat/i.test(m) && B.notActive ? B.notActive : B.err); err.hidden = false;
        // a way that always works: the same request as a ready email in the visitor's own mail app
        var mail = 'mailto:' + B.to + '?subject=' + encodeURIComponent(body._subject) + '&body=' + encodeURIComponent(
          ['Пакет', 'Дата', 'Имя', 'Контакт', 'Сообщение'].map(function (k) { return k + ': ' + body[k]; }).join('\n'));
        err.insertAdjacentHTML('beforeend', ' <a class="bk-mail" href="' + esc(mail) + '">' + esc(t(B.mail)) + ' →</a>' +
          '<small class="bk-why">' + esc(m ? svc + ': ' + m.slice(0, 160) : t(B.offline)) + '</small>');
      });
  }

  // the atlas edge on the left of the page (decorative, under the menu and the film)
  setTimeout(function () { atlasSVG(); var d = document.createElement('div'); d.className = 'site-atlas'; d.setAttribute('aria-hidden', 'true');
    if (ikatTile) { d.style.backgroundImage = 'url(' + ikatTile + ')'; root.style.setProperty('--ikat', 'url(' + ikatTile + ')'); } document.body.appendChild(d); }, 0);
  /* ---------- «thank you» screen: atlas (ikat) band and a rosette ---------- */
  // stepped lozenge, the way ikat threads draw a diamond
  function stepD(cx, cy, rx, ry, n) {
    var pts = [], i, sx = rx / n, sy = ry / n;
    for (i = 0; i < n; i++) pts.push([cx + i * sx, cy - ry + i * sy], [cx + (i + 1) * sx, cy - ry + i * sy]);
    for (i = 0; i < n; i++) pts.push([cx + rx - i * sx, cy + i * sy], [cx + rx - i * sx, cy + (i + 1) * sy]);
    for (i = 0; i < n; i++) pts.push([cx - i * sx, cy + ry - i * sy], [cx - (i + 1) * sx, cy + ry - i * sy]);
    for (i = 0; i < n; i++) pts.push([cx - rx + i * sx, cy - i * sy], [cx - rx + i * sx, cy - (i + 1) * sy]);
    return pts.map(function (q) { return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ');
  }
  /* ikat (atlas) colours, worked out per pixel so that every browser draws the same thing:
     stepped lozenges in columns, each thread row shifted a little — the «bleed» of real abr fabric */
  var IKAT = [[17, 28, 50], [230, 106, 50], [242, 233, 218], [36, 87, 216], [233, 185, 73], [158, 31, 63], [24, 166, 160]];
  function ikatAt(u, v) {
    var vv = ((v % 160) + 160) % 160, row = Math.floor(vv / 2);
    // each 2 px thread row shifts sideways a little; periodic over the 160 px tile so the repeat is seamless
    var jit = Math.sin(row * Math.PI * 2 * 9 / 80) * 2.2 + ((row * 7919 + 13) % 7) / 6 * 3.4 - 1.7;
    var uu = u + jit, col = Math.floor(uu / 80), odd = ((col % 2) + 2) % 2;
    var dx = Math.abs(uu - col * 80 - 40), dy = Math.abs(((vv + odd * 80) % 160) - 80);
    dx = Math.floor(dx / 2) * 2; dy = Math.floor(dy / 3) * 3;     // fine stair steps
    var d = dx / 36 + dy / 72;
    if (d < .16) return 5; if (d < .36) return 4; if (d < .56) return 3; if (d < .76) return 2; if (d < 1) return 1;
    var zz = ((u % 80) + 80) % 80, tri = Math.abs((vv % 20) - 10) / 10 * 5;   // turquoise zigzag thread between columns
    return Math.abs(zz - 2 - tri) < 1.6 ? 6 : 0;
  }
  function ikatPaint(ctx, w, h, k) {   // k = device pixels per css pixel
    var img = ctx.createImageData(w, h), px = img.data, i = 0;
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++, i += 4) {
      var c = IKAT[ikatAt(x / k, y / k)]; px[i] = c[0]; px[i + 1] = c[1]; px[i + 2] = c[2]; px[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }
  var ikatTile = null;
  function atlasSVG() {
    if (!ikatTile) { try { var c = document.createElement('canvas'); c.width = c.height = 320; ikatPaint(c.getContext('2d'), 320, 320, 2); ikatTile = c.toDataURL('image/png'); } catch (x) { ikatTile = ''; } }
    return '<div class="bk-atlas" aria-hidden="true"' + (ikatTile ? ' style="background-image:url(' + ikatTile + ')"' : '') + '></div>';
  }
  function atlasInto(lb) { if (lb && !$('.bk-atlas', lb)) lb.insertAdjacentHTML('afterbegin', atlasSVG()); }
  /* Jokha's own animation: a young man in a chapan bows with his hand on his heart and says «Rahmat!» */
  function rahmatVideo() {
    return '<video class="bk-rah" autoplay muted loop playsinline preload="auto" poster="img/rahmat-poster.webp?v=2" aria-label="Rahmat!">' +
      '<source src="video/rahmat.webm?v=3" type="video/webm"><source src="video/rahmat.mp4?v=3" type="video/mp4"></video>';
  }
  // eight-pointed star with petals, like the medallions on suzani and tiles
  function rosetteSVG() {
    var petals = '', i;
    for (i = 0; i < 8; i++) petals += '<path class="r-p" d="M60 60 C52 44 52 26 60 12 C68 26 68 44 60 60Z" transform="rotate(' + (i * 45) + ' 60 60)"/>';
    var star = stepStar(60, 60, 34, 24);
    return '<svg class="bk-ros" viewBox="0 0 120 120" aria-hidden="true">' +
      '<circle class="r-c" cx="60" cy="60" r="56"/>' + petals +
      '<polygon class="r-s" points="' + star + '"/><circle class="r-d" cx="60" cy="60" r="9"/></svg>';
  }
  function stepStar(cx, cy, R, r) {
    var pts = [], i, a;
    for (i = 0; i < 16; i++) { a = Math.PI / 8 * i - Math.PI / 2; var d = i % 2 ? r : R; pts.push((cx + d * Math.cos(a)).toFixed(1) + ',' + (cy + d * Math.sin(a)).toFixed(1)); }
    return pts.join(' ');
  }
  // small ikat diamonds scatter from the rosette and fall
  function confetti(from) {
    if (!from || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var cols = ['#E66A32', '#2457D8', '#18A6A0', '#E9B949', '#9E1F3F'], box = document.createElement('div');
    box.className = 'bk-conf'; box.setAttribute('aria-hidden', 'true');
    var r = from.getBoundingClientRect(), x0 = r.left + r.width / 2, y0 = r.top + r.height / 2, html = '';
    for (var i = 0; i < 28; i++) {
      var ang = Math.random() * Math.PI * 2, dist = 80 + Math.random() * 220;
      html += '<i style="left:' + x0 + 'px;top:' + y0 + 'px;--dx:' + (Math.cos(ang) * dist).toFixed(0) + 'px;--dy:' + (Math.sin(ang) * dist * .6 - 60).toFixed(0) +
        'px;--fall:' + (260 + Math.random() * 260).toFixed(0) + 'px;--rot:' + (Math.random() * 540 - 270).toFixed(0) + 'deg;--d:' + (Math.random() * .25).toFixed(2) +
        's;--s:' + (6 + Math.random() * 7).toFixed(0) + 'px;background:' + cols[i % cols.length] + '"></i>';
    }
    box.innerHTML = html; $('#lightbox').appendChild(box);
    setTimeout(function () { box.remove(); }, 3200);
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
    lb.hidden = true; $('#lbBody').innerHTML = ''; lb.classList.remove('lb-pd', 'lb-bk', 'lb-ok'); $$('.bk-atlas, .bk-conf', lb).forEach(function (x) { x.remove(); }); details = null;
    if (!film.open) root.classList.remove('lock');
  }
  function credits() {
    var rows = Object.keys(PH).filter(function (k) { return !/^temur/.test(k); }).map(function (k) {
      var p = PH[k];
      return '<li><span class="cr-t">' + esc(plain(p.alt)) + '</span><span class="cr-a">' + esc(p.by) + ' · ' +
        (p.url ? '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.lic) + ', ' + esc(p.src) + '</a>' : esc(p.lic)) + '</span></li>';
    }).join('');
    openLightbox('<h3 class="lb-title">' + esc(t(S.ui.credits)) + '</h3><p class="lb-text">' + esc(t(S.ui.creditsIntro)) + '</p>' +
      '<p class="lb-text">' + esc(t(S.intro.portraitNote)) + '</p><ul class="cr-list">' + rows + '</ul>');
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
    var el = document.getElementById(id); if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - (id === 'top' ? 0 : 40), behavior: reduce ? 'auto' : 'smooth' });
  }

  /* ---------- language: re-render text; the film keeps playing where it is ---------- */
  function setLang(l) {
    if (l === lang) return;
    var y = window.scrollY;
    lang = l;
    store('lot-lang', l);
    renderSite();
    if (details) $('#lbBody').innerHTML = detailsHTML();
    else if ($('#lightbox').classList.contains('lb-bk') && $('#lbBody .bk input')) openBook();
    if (film.open && film.phase === 'film') renderPlayer();
    else if (film.open) { var u = $('.fm-unlock', ui); if (u) u.innerHTML = heroInner(true); }
    document.body.classList.add('unlocked');
    window.scrollTo(0, y);
  }

  /* ---------- theme: dark (default for dark systems) or light, one tap, remembered ---------- */
  function isLight() { return root.getAttribute('data-theme') === 'light'; }
  function setTheme(th) {
    root.classList.add('theme-swap');
    root.setAttribute('data-theme', th); store('lot-theme', th);
    var b = $('#themeBtn'); if (b) b.setAttribute('aria-pressed', String(th === 'light'));
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', th === 'light' ? '#F6F0E6' : '#080A0F');
    setTimeout(function () { root.classList.remove('theme-swap'); }, 600);
    onScroll();
  }
  (function () { var b = $('#themeBtn'); if (b) b.setAttribute('aria-pressed', String(isLight())); if (isLight()) { var m = $('meta[name="theme-color"]'); if (m) m.setAttribute('content', '#F6F0E6'); } })();

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    if (viewer) { if (!e.target.closest('.pv-cap')) closePhoto(); return; }
    var ph = e.target.closest('[data-photo]'); if (ph) { openPhoto(ph); return; }
    var cc = e.target.closest('[data-city-day]'); if (cc) { openCity(cc); return; }
    if (e.target.closest('[data-pkg-both]')) { if (!pkJoined) setJoined(true); return; }
    var pb = e.target.closest('[data-pkg]'); if (pb) { setPkg(+pb.getAttribute('data-pkg')); return; }
    var hg = e.target.closest('[data-hx-go]'); if (hg) { heroGo(+hg.getAttribute('data-hx-go'), true); return; }
    var hp = e.target.closest('[data-hx-pkg]'); if (hp) { heroPkg = +hp.getAttribute('data-hx-pkg'); var bar = $('.hx-bar', main); if (bar) bar.innerHTML = heroBar(); return; }
    if (e.target.closest('[data-hx-open]')) { setPkg(heroPkg); jump('packages'); return; }
    if (e.target.closest('[data-join]')) { setJoined(true); return; }
    if (e.target.closest('[data-unjoin]')) { setJoined(false); return; }
    if (e.target.closest('.ji-t') && Date.now() - tixNoClick < 400) return;
    var pg = e.target.closest('[data-pkg-go]'); if (pg) { setPkg(+pg.getAttribute('data-pkg-go')); jump('packages'); return; }
    var bk = e.target.closest('[data-book]'); if (bk) { e.preventDefault(); openBook(bk.getAttribute('data-book-pkg')); return; }
    var db = e.target.closest('[data-details]'); if (db) { var dd = db.getAttribute('data-details-day'); openDetails(db.getAttribute('data-details'), dd == null ? null : +dd); return; }
    var pt = e.target.closest('[data-pdt]'); if (pt) { detailsTab(pt.getAttribute('data-pdt')); return; }
    var el = e.target.closest('[data-lang],[data-jump],[data-film],[data-act],#menuBtn,#themeBtn,#creditsBtn,[data-close],.wordmark');
    if (!el) { if (e.target.id === 'lightbox') closeLightbox(); return; }
    if (el.hasAttribute('data-lang')) { setLang(el.getAttribute('data-lang')); return; }
    if (el.hasAttribute('data-film')) { e.preventDefault(); openFilm(true); return; }
    if (el.hasAttribute('data-jump')) { e.preventDefault(); jump(el.getAttribute('data-jump')); return; }
    if (el.hasAttribute('data-act')) {
      var a = el.getAttribute('data-act');
      if (a === 'start') start(true);
      else if (a === 'play') togglePlay();
      else if (a === 'replay') replay();
      else if (a === 'sound') { ensureAudio(); vid.muted = !vid.muted; vid.volume = 1; if (vid.paused && film.phase === 'film' && !box.classList.contains('waiting')) controls(); }
      else if (a === 'skip') skip();
      return;
    }
    if (el.id === 'themeBtn') { setTheme(isLight() ? 'dark' : 'light'); return; }
    if (el.id === 'menuBtn') { toggleMenu(); return; }
    if (el.id === 'creditsBtn') { credits(); return; }
    if (el.hasAttribute('data-close')) { closeLightbox(); return; }
    if (el.classList.contains('wordmark')) { e.preventDefault(); jump('top'); }
  });
  document.addEventListener('keydown', function (e) {
    if (film.open && film.phase === 'film') {
      var tag = (e.target.tagName || '').toLowerCase();
      if ((e.key === ' ' || e.key === 'k') && tag !== 'button') { e.preventDefault(); togglePlay(); }
      else if (e.key === 'm' && hasSound()) { ensureAudio(); vid.muted = !vid.muted; }
      else if (e.key === 'Escape') skip();
      return;
    }
    if (viewer) { if (e.key === 'Escape') closePhoto(); return; }
    if (e.key === 'Enter' && e.target.hasAttribute && e.target.hasAttribute('data-photo')) { openPhoto(e.target); return; }
    if (e.key === 'Escape') { closeLightbox(); toggleMenu(false); }
  });
  var wasPortrait = portrait();
  window.addEventListener('resize', function () {
    if (portrait() === wasPortrait) return;
    wasPortrait = portrait();
    main.style.setProperty('--open', openScale());
    // phone rotated during the film: switch to the matching cut, same moment
    if (film.open && film.phase === 'film' && typeof F.src !== 'string') {
      var at = vid.currentTime, playing = !vid.paused;
      vid.setAttribute('src', pick(F.src)); vid.poster = pick(F.poster);
      vid.addEventListener('loadedmetadata', function once() {
        vid.removeEventListener('loadedmetadata', once);
        try { vid.currentTime = at; } catch (e) {}
        if (playing) vid.play().catch(function () {});
      });
    }
  });

  /* ---------- boot ---------- */
  var force = /[?&]film\b/.test(location.search);
  var firstVisit = HAS_FILM && (force || store(SEEN) !== '1');
  renderSite();
  document.body.classList.remove('is-loading');
  if (firstVisit) openFilm(false);
  else {
    document.body.classList.add('unlocked', 'arriving');
    if (location.hash && location.hash.length > 1) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) setTimeout(function () { window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY); }, 60);
    }
  }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
