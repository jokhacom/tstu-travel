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
    var J = S.journey, L = J.labels;
    function fact(label, v) { return '<div class="jf"><dt>' + esc(t(label)) + '</dt><dd>' + (v ? esc(t(v)) : tbd()) + '</dd></div>'; }
    function list(arr) { return arr && arr.length ? '<ul>' + arr.map(function (x) { return '<li>' + esc(t(x)) + '</li>'; }).join('') + '</ul>' : tbd(); }
    var days = (TOUR.days || []).map(function (d, i) {
      return '<li class="jd rv"><div class="jd-img' + (PH[d.image] ? '' : ' jd-noimg') + '">' + (PH[d.image] ? pic(d.image, { sizes: '(max-width:760px) 100vw, 40vw' }) : '<span class="jd-place">' + esc(t(d.place)) + '</span>') + '</div><div class="jd-body">' +
        '<p class="jd-n">' + esc(t(L.day)) + ' ' + (i + 1) + '</p><h4>' + esc(t(d.place)) + '</h4><p class="jd-text">' + esc(t(d.text)) + '</p>' +
        (d.activities && d.activities.length ? '<ul>' + d.activities.map(function (a) { return '<li>' + esc(t(a)) + '</li>'; }).join('') + '</ul>' : '') +
        (d.practical ? '<p class="jd-prac">' + esc(t(d.practical)) + '</p>' : '') + '</div></li>';
    }).join('');
    var hl = (TOUR.highlights || []).filter(function (h) { return PH[h.image]; }).map(function (h, i) {
      return '<figure class="jh rv" style="--d:' + (i * 0.09) + 's">' + pic(h.image, { sizes: '(max-width:760px) 70vw, 20vw' }) + '<figcaption><strong>' + esc(t(h.name)) + '</strong><span>' + esc(t(h.place)) + '</span></figcaption></figure>';
    }).join('');
    return '<div class="jt" id="program">' +
      '<div class="rv"><p class="kicker"><span class="kl">' + esc(t(J.kicker)) + '</span></p>' +
      '<p class="jt-desc">' + (TOUR.description ? esc(t(TOUR.description)) : tbd()) + '</p>' +
      (TOUR.note ? '<p class="jt-note"><em>' + esc(t(S.ui.draft)) + '</em>' + esc(t(TOUR.note)) + '</p>' : '') + '</div>' +
      '<dl class="jt-facts rv">' + fact(L.duration, TOUR.duration) + fact(L.travelers, TOUR.travelers) +
      fact(L.season, TOUR.season) + fact(L.level, TOUR.level) + fact(L.transport, TOUR.transport) + '</dl>' +
      '<h3 class="jt-sub rv">' + esc(t(L.itinerary)) + '</h3><ol class="jt-days">' + days + '</ol>' +
      (hl ? '<h3 class="jt-sub rv">' + esc(t(L.highlights)) + '</h3><div class="jt-hl">' + hl + '</div>' : '') +
      '<div class="jt-price rv" id="price"><div class="jp-main"><p class="jd-l">' + esc(t(L.price)) + '</p><p class="jp-v">' + (TOUR.price ? esc(t(TOUR.price)) : tbd()) + '</p></div>' +
      '<div class="jt-incl"><div><h4 class="jt-sub">' + esc(t(L.included)) + '</h4>' + list(TOUR.included) + '</div><div><h4 class="jt-sub">' + esc(t(L.excluded)) + '</h4>' + list(TOUR.excluded) + '</div></div></div>' +
      '<div class="jt-book rv" id="book">' + bookingLink('cta', J.cta) + '<p class="note">' + esc(t(J.ctaNote)) + '</p></div>' +
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

  /* scroll reveals: each block of the tour arrives on its own */
  var io = null;
  function observeReveals() {
    if (io) io.disconnect();
    var els = $$('.rv', main);
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    io = new IntersectionObserver(function (list) {
      list.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ================= THE FILM PLAYER (fullscreen overlay) ================= */
  var box = null, vid = null, ui = null;
  var film = { open: false, raf: 0, cur: -2, phase: 'idle', idle: 0, timers: [] };

  function buildPlayer() {
    box = document.createElement('div');
    box.id = 'film'; box.className = 'film'; box.hidden = true;
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<video class="fm-video" playsinline preload="none"></video><div class="fm-shade" aria-hidden="true"></div><div class="fm-ui"></div>';
    document.body.appendChild(box);
    vid = $('.fm-video', box); ui = $('.fm-ui', box);
    vid.addEventListener('play', function () { box.classList.add('playing'); box.classList.remove('paused', 'waiting'); controls(); tick(); });
    vid.addEventListener('pause', function () { box.classList.remove('playing'); if (film.phase === 'film') box.classList.add('paused'); controls(); wake(); });
    vid.addEventListener('ended', function () { if (film.phase === 'film') unlock(false); });
    vid.addEventListener('error', function () { if (film.open && film.phase === 'film') unlock(true); });
    vid.addEventListener('volumechange', controls);
    ['mousemove', 'touchstart', 'keydown'].forEach(function (ev) { box.addEventListener(ev, wake, { passive: true }); });
    // a tap on the picture itself turns the sound on (the film starts muted: browsers block autoplay with sound)
    ui.addEventListener('click', function (e) {
      if (e.target.closest('button, a') || film.phase !== 'film' || box.classList.contains('waiting')) return;
      if (vid.muted) { vid.muted = false; vid.volume = 1; }
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
      return '<div class="fm-cue" data-i="' + i + '"><p class="fm-k">' + esc(t(c.k)) + '</p><p class="fm-t">' + esc(t(c.text)) + '</p></div>';
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
    vid.muted = !gesture;
    if (reduce && !gesture) { box.classList.add('waiting'); controls(); $('.fm-start', ui).focus(); return; }
    start(gesture);
  }
  function start(withSound) {
    box.classList.remove('waiting');
    vid.muted = !withSound;
    var p = vid.play();
    if (p && p.catch) p.catch(function () {
      if (!vid.muted) { vid.muted = true; return start(false); }
      box.classList.add('waiting'); controls();   // autoplay blocked: wait for a tap
    });
    wake();
    setTimeout(function () { var b = $('.fm-sound', ui); if (b && film.phase === 'film') b.focus({ preventScroll: true }); }, 50);
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
      else if (a === 'sound') { vid.muted = !vid.muted; vid.volume = 1; if (vid.paused && film.phase === 'film' && !box.classList.contains('waiting')) controls(); }
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
      else if (e.key === 'm') { vid.muted = !vid.muted; }
      else if (e.key === 'Escape') skip();
      return;
    }
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
