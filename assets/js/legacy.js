/* THE LEGACY OF TEMUR — site engine.
 * First visit: a fullscreen documentary player. When the film ends (or is skipped),
 * its last frame "opens up" into the site: THE LEGACY OF TEMUR → «По следам Темура» →
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
    return '<a class="' + cls + '" href="' + esc(TOUR.bookingUrl || '#') + '" target="_blank" rel="noopener"><span>' + esc(t(label)) + '</span><i aria-hidden="true"></i></a>';
  }

  /* the film may be one file (string) or a landscape + portrait pair */
  function portrait() { return window.innerHeight > window.innerWidth * 1.1; }
  function pick(v) { return !v ? '' : typeof v === 'string' ? v : (portrait() ? v.portrait || v.landscape : v.landscape || v.portrait); }
  // the landscape stand-in has black bars; the opened site crops them away (the frame "opens up")
  function openScale() { var lb = +F.letterbox || 0; return portrait() || !lb ? 1.06 : +(1 / (1 - 2 * lb)).toFixed(3); }

  /* ---------- the opened site: hero (the film's last frame) ---------- */
  function heroInner(inFilm) {
    var route = (TOUR.destinations || []).map(function (d) { return esc(t(d)); }).join(' <i>—</i> ');
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
  function renderHero() {
    var E = F.endFrame || F.poster || {};
    var land = typeof E === 'string' ? E : E.landscape, port = typeof E === 'string' ? E : E.portrait;
    var bg = land || port ? '<picture>' + (port ? '<source media="(max-aspect-ratio: 10/11)" srcset="' + esc(port) + '">' : '') +
      '<img src="' + esc(land || port) + '" alt="" decoding="async"></picture>' : '';
    return '<header class="uh" id="top"><div class="uh-bg" aria-hidden="true">' + bg + '</div><div class="uh-shade" aria-hidden="true"></div>' +
      heroInner(false) + '<span class="uh-scroll" aria-hidden="true"></span></header>';
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

  function tbd() { return '<span class="tbd"><em>' + esc(t(S.ui.placeholder)) + '</em>' + esc(t(S.journey.labels.tbd)) + '</span>'; }
  function renderJourney() {
    var J = S.journey, L = J.labels, DAYS = TOUR.days || [];
    function fact(label, v) { return '<div class="jf"><dt>' + esc(t(label)) + '</dt><dd>' + (v ? esc(t(v)) : tbd()) + '</dd></div>'; }
    function list(arr) { return arr && arr.length ? '<ul>' + arr.map(function (x) { return '<li>' + esc(t(x)) + '</li>'; }).join('') + '</ul>' : tbd(); }
    function two(n) { return (n < 10 ? '0' : '') + n; }

    /* the four cities of the route, each opening onto its first day */
    var seen = {}, cities = [];
    DAYS.forEach(function (d, i) {
      var k = t(d.place);
      if (!seen[k]) { seen[k] = { name: d.place, image: d.image, days: [] }; cities.push(seen[k]); }
      seen[k].days.push(i + 1);
    });
    var cityCards = cities.map(function (c, i) {
      return '<button type="button" class="city ir" data-tilt data-city-day="' + c.days[0] + '" style="--d:' + (i * 0.12) + 's" aria-label="' + esc(t(c.name)) + ' · ' + esc(t(L.day)) + ' ' + c.days.join(', ') + '">' +
        '<span class="city-img">' + pic(c.image, { sizes: '(max-width:760px) 78vw, 25vw' }) + '</span>' +
        '<span class="city-n">' + two(i + 1) + '</span>' +
        '<span class="city-name">' + letters(t(c.name)) + '</span>' +
        '<span class="city-days">' + esc(t(L.day)) + ' ' + c.days.join(' · ') + '</span></button>';
    }).join('');

    /* the programme: a sticky photo stage + days that open one by one */
    var stage = DAYS.map(function (d, i) {
      return '<figure class="tl-pic' + (i ? '' : ' on') + '" data-d="' + i + '">' + (PH[d.image] ? pic(d.image, { sizes: '(max-width:900px) 100vw, 45vw' }) : '') + '</figure>';
    }).join('');
    var days = DAYS.map(function (d, i) {
      return '<li class="jd' + (i ? '' : ' on') + '" data-d="' + i + '">' +
        '<div class="jd-img ir' + (PH[d.image] ? '' : ' jd-noimg') + '">' + (PH[d.image] ? pic(d.image, { sizes: '100vw' }) : '<span class="jd-place">' + esc(t(d.place)) + '</span>') + '</div>' +
        '<div class="jd-body"><p class="jd-n"><b>' + two(i + 1) + '</b>' + esc(t(L.day)) + ' ' + (i + 1) + '</p><h4 class="tr">' + words(t(d.place)) + '</h4><p class="jd-text">' + esc(t(d.text)) + '</p>' +
        (d.activities && d.activities.length ? '<ul>' + d.activities.map(function (a, k) { return '<li style="--k:' + k + '">' + esc(t(a)) + '</li>'; }).join('') + '</ul>' : '') +
        (d.practical ? '<p class="jd-prac">' + esc(t(d.practical)) + '</p>' : '') + '</div></li>';
    }).join('');

    var hl = (TOUR.highlights || []).filter(function (h) { return PH[h.image]; }).map(function (h, i) {
      return '<figure class="jh ir" data-tilt data-photo tabindex="0" style="--d:' + (i * 0.1) + 's">' + pic(h.image, { sizes: '(max-width:760px) 78vw, 40vw' }) +
        '<figcaption><strong>' + esc(t(h.name)) + '</strong><span>' + esc(t(h.place)) + '</span></figcaption></figure>';
    }).join('');

    return '<div class="jt" id="program">' +
      '<div class="rv"><p class="kicker"><span class="kl">' + esc(t(J.kicker)) + '</span></p>' +
      '<p class="jt-desc tr">' + (TOUR.description ? words(t(TOUR.description)) : tbd()) + '</p>' +
      (TOUR.note ? '<p class="jt-note"><em>' + esc(t(S.ui.draft)) + '</em>' + esc(t(TOUR.note)) + '</p>' : '') + '</div>' +
      '<dl class="jt-facts rv">' + fact(L.duration, TOUR.duration) + fact(L.travelers, TOUR.travelers) +
      fact(L.season, TOUR.season) + fact(L.level, TOUR.level) + fact(L.transport, TOUR.transport) + '</dl>' +
      (cities.length ? '<h3 class="jt-sub tr">' + words(t(L.destinations)) + '</h3><div class="cities" data-snap>' + cityCards + '</div>' : '') +
      '<h3 class="jt-sub tr">' + words(t(L.itinerary)) + '</h3>' +
      '<div class="tl"><div class="tl-stage" aria-hidden="true"><div class="tl-frame">' + stage + '</div>' +
      '<p class="tl-count"><b>01</b> / ' + two(DAYS.length) + '</p><p class="tl-place">' + esc(t(DAYS[0] && DAYS[0].place)) + '</p></div>' +
      '<div class="tl-list"><span class="tl-line" aria-hidden="true"><i></i></span><ol class="jt-days">' + days + '</ol></div></div>' +
      (hl ? '<h3 class="jt-sub tr">' + words(t(L.highlights)) + '</h3><div class="jt-hl" data-snap>' + hl + '</div>' : '') +
      '<div class="jt-price rv' + (TOUR.price ? '' : ' no-price') + '" id="price">' + (TOUR.price ? '<div class="jp-main"><p class="jd-l">' + esc(t(L.price)) + '</p><p class="jp-v tr">' + words(t(TOUR.price)) + '</p></div>' : '') +
      '<div class="jt-incl"><div><h4 class="jt-sub">' + esc(t(L.included)) + '</h4>' + list(TOUR.included) + '</div><div><h4 class="jt-sub">' + esc(t(L.excluded)) + '</h4>' + list(TOUR.excluded) + '</div></div></div>' +
      '<div class="jt-book rv" id="book">' + bookingLink('cta', J.cta).replace('<a ', '<a data-mag ') + '<p class="note">' + esc(t(J.ctaNote)) + '</p></div>' +
      renderStar() +
      (TOUR.updated ? '<p class="note">' + esc(t(L.updated)) + ': ' + esc(TOUR.updated) + '</p>' : '') +
      '</div>';
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

  function renderSite() {
    main.innerHTML = '<section id="journey" class="journey" aria-label="' + esc(plain(TOUR.title)) + '">' + renderHero() + renderJourney() + '</section>' + renderFooter();
    main.style.setProperty('--open', openScale());
    renderChrome();
    observeReveals();
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
    $$('.uh .cta, .watch-again', main).forEach(function (el) { el.setAttribute('data-mag', ''); });
    onScroll();
  }
  var curDay = 0;
  function setDay(i) {
    if (i === curDay && $('.jd.on', main)) return;
    curDay = i;
    $$('.jd', main).forEach(function (el) { el.classList.toggle('on', +el.getAttribute('data-d') === i); });
    $$('.tl-pic', main).forEach(function (el) { el.classList.toggle('on', +el.getAttribute('data-d') === i); });
    var d = (TOUR.days || [])[i], c = $('.tl-count b', main), pl = $('.tl-place', main);
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
    var bg = $('.uh-bg', main);
    if (bg && !reduce && y < vh * 1.2) { bg.style.transform = 'translate3d(0,' + (y * 0.35).toFixed(1) + 'px,0)'; var ui_ = $('.uh-in', main); if (ui_) { ui_.style.transform = 'translate3d(0,' + (y * 0.15).toFixed(1) + 'px,0)'; ui_.style.opacity = Math.max(0, 1 - y / (vh * 0.75)).toFixed(3); } }
    if (!reduce) $$('.city-img img, .jd-img img, .tl-pic.on img', main).forEach(function (im) {
      var r = im.parentNode.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      var k = ((r.top + r.height / 2) - vh / 2) / vh;   // -1 … 1
      im.style.setProperty('--py', (k * -28).toFixed(1) + 'px');
    });
    var list = $('.tl-list', main), line = $('.tl-line i', main);
    if (list && line) {
      var r = list.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (vh * 0.5 - r.top) / r.height));
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
    var day = +card.getAttribute('data-city-day') - 1, target = $('.jd[data-d="' + day + '"]', main);
    if (!target) return;
    var land = function () { window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3, behavior: 'auto' }); setDay(day); };
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
      '<div class="fm-unlock" aria-hidden="true">' + heroInner(true) + '</div>' +
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
      var c = $('.uh .cta'); c && c.focus({ preventScroll: true });
    }, 4100 * slow);
  }

  /* skip / close without having finished = same unlock, a little faster */
  function skip() { if (film.phase === 'film') unlock(true); }

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
    if (film.open && film.phase === 'film') renderPlayer();
    else if (film.open) { var u = $('.fm-unlock', ui); if (u) u.innerHTML = heroInner(true); }
    document.body.classList.add('unlocked');
    window.scrollTo(0, y);
  }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    if (viewer) { if (!e.target.closest('.pv-cap')) closePhoto(); return; }
    var ph = e.target.closest('[data-photo]'); if (ph) { openPhoto(ph); return; }
    var cc = e.target.closest('[data-city-day]'); if (cc) { openCity(cc); return; }
    var el = e.target.closest('[data-lang],[data-jump],[data-film],[data-act],#menuBtn,#creditsBtn,[data-close],.wordmark');
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
