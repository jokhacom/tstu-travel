/* THE LEGACY OF TEMUR — site engine.
 * The page is: a short film about Amir Temur (first screen) → the tour package → booking.
 * Everything is rendered from content/*.js. The film's captions are timed HTML,
 * so they follow the chosen language. With reduced motion the film does not autoplay. */
(function () {
  'use strict';
  var C = window.LEGACY || {};
  var S = C.site, TOUR = C.tour || {}, PH = C.photos || {};
  var LANGS = S.languages;
  var lang = pickLang();
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  function pic(key, opt) {
    opt = opt || {};
    var p = PH[key];
    if (!p) return '<div class="media-missing"><span>' + esc(t(S.ui.placeholder)) + '</span></div>';
    var srcset = p.w.map(function (w) { return 'img/' + key + '-' + w + '.webp ' + w + 'w'; }).join(', ');
    return '<img src="img/' + key + '-' + p.w[0] + '.webp" srcset="' + srcset + '" sizes="' + (opt.sizes || '100vw') + '" alt="' + esc(plain(p.alt)) + '"' +
      ' loading="lazy" decoding="async" style="object-position:' + (p.pos || '50% 50%') + '">';
  }
  function credit(key) {
    var p = PH[key]; if (!p) return '';
    return '<span class="credit">' + esc(p.by) + ' · ' + esc(p.lic) + '</span>';
  }
  function bookingLink(cls, label) {
    return '<a class="' + cls + '" href="' + esc(TOUR.bookingUrl || '#') + '" target="_blank" rel="noopener"><span>' + esc(t(label)) + '</span><i aria-hidden="true"></i></a>';
  }

  /* ---------- 1. the film ---------- */
  var FILM = { land: 'video/temur-film-1080.mp4', port: 'video/temur-film-720v.mp4' };
  function portrait() { return window.innerHeight > window.innerWidth * 1.1; }
  function renderFilm() {
    var F = S.film, I = S.intro, v = portrait();
    var cues = F.cues.map(function (c, i) {
      if (c.motto) {
        return '<div class="fm-cue fm-motto" data-i="' + i + '"><p class="fm-m1">' + esc(t(I.line1)) + '</p><p class="fm-m2">' + esc(t(I.line2)) + '</p><small>' + esc(t(I.mottoNote)) + '</small></div>';
      }
      return '<div class="fm-cue" data-i="' + i + '"><p class="fm-k">' + esc(t(c.k)) + '</p><p class="fm-t">' + esc(t(c.text)) + '</p></div>';
    }).join('');
    var route = (TOUR.destinations || []).map(function (d) { return esc(t(d)); }).join(' · ');
    return '<section id="prologue" class="ch film" data-ch="prologue" aria-label="' + esc(plain(I.title)) + '">' +
      '<video class="fm-video" muted playsinline preload="auto" aria-hidden="true" poster="img/film-poster' + (v ? '-v' : '') + '.webp"></video>' +
      '<div class="fm-shade" aria-hidden="true"></div>' +
      '<div class="fm-caps" aria-live="off">' + cues + '</div>' +
      '<div class="fm-end">' +
      '<h1><span class="h-legacy">' + esc(t(I.title)) + '</span><span class="h-country">' + esc(t(I.country)) + '</span></h1>' +
      '<p class="fm-tour"><strong>' + esc(t(TOUR.title)) + '</strong>' + (TOUR.duration ? ' · ' + esc(t(TOUR.duration)) : '') + '</p>' +
      (route ? '<p class="fm-route">' + route + '</p>' : '') +
      '<div class="fm-actions"><a class="cta" href="#journey"><span>' + esc(t(F.invite)) + '</span><i aria-hidden="true"></i></a>' +
      '<button type="button" class="linkish fm-replay">' + esc(t(S.ui.replay)) + '</button></div>' +
      '</div>' +
      '<div class="fm-bar"><button type="button" class="fm-play" aria-pressed="false"></button>' +
      '<div class="fm-progress" aria-hidden="true"><i></i></div>' +
      '<button type="button" class="fm-skip">' + esc(t(S.ui.skip)) + ' <span aria-hidden="true">↓</span></button></div>' +
      '<p class="fm-note">' + esc(t(I.portraitNote)) + '</p>' +
      '</section>';
  }

  var film = { el: null, raf: 0, cur: -2, ended: false };
  function bindFilm(ended) {
    var sec = $('#prologue'), vid = $('.fm-video', sec);
    cancelAnimationFrame(film.raf);
    film.el = vid; film.cur = -2; film.ended = !!ended;
    vid.src = portrait() ? FILM.port : FILM.land;
    vid.addEventListener('ended', function () { showEnd(true); });
    vid.addEventListener('error', function () { showEnd(true); });
    vid.addEventListener('play', function () { sec.classList.add('playing'); sec.classList.remove('paused', 'still'); playBtn(); tick(); });
    vid.addEventListener('pause', function () { sec.classList.remove('playing'); if (!film.ended) sec.classList.add('paused'); playBtn(); });
    return vid;
  }
  function setupFilm() {
    var vid = bindFilm(false);
    if (reduce) { vid.poster = 'img/film-end' + (portrait() ? '-v' : '') + '.webp'; showEnd(false); playBtn(); return; }
    var p = vid.play();
    if (p && p.catch) p.catch(function () { showEnd(false); playBtn(); });
  }
  function playBtn() {
    var b = $('.fm-play'), v = film.el; if (!b || !v) return;
    var playing = !v.paused && !v.ended;
    b.setAttribute('aria-pressed', playing);
    b.textContent = playing ? '❚❚' : '▶';
    b.setAttribute('aria-label', t(playing ? S.ui.pause : S.ui.play));
  }
  function tick() {
    var v = film.el; if (!v) return;
    var tm = v.currentTime, cues = S.film.cues, on = -1;
    for (var i = 0; i < cues.length; i++) if (tm >= cues[i].from && tm < cues[i].to) on = i;
    if (on !== film.cur) {
      film.cur = on;
      $$('.fm-cue').forEach(function (el) { el.classList.toggle('on', +el.getAttribute('data-i') === on); });
    }
    if (tm >= S.film.endAt) showEnd(true);
    var bar = $('.fm-progress i'); if (bar && v.duration) bar.style.transform = 'scaleX(' + (tm / v.duration) + ')';
    if (!v.paused && !v.ended) film.raf = requestAnimationFrame(tick);
  }
  function showEnd(done) {
    var sec = $('#prologue'); if (!sec) return;
    if (done) film.ended = true;
    sec.classList.add('ended');
    $$('.fm-cue').forEach(function (el) { el.classList.remove('on'); });
    if (!done || (film.el && film.el.paused)) sec.classList.add('still');
  }
  function replay() {
    var sec = $('#prologue'), v = film.el; if (!v) return;
    sec.classList.remove('ended', 'still'); film.ended = false; film.cur = -2;
    v.currentTime = 0; v.play().catch(function () {});
  }
  function togglePlay() {
    var v = film.el; if (!v) return;
    if (v.paused || v.ended) { if (v.ended || film.ended) replay(); else { $('#prologue').classList.remove('still'); v.play().catch(function () {}); } }
    else v.pause();
  }

  /* ---------- 2. the tour ---------- */
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
    return '<div class="zs"><div class="zs-art"><svg viewBox="0 0 120 120" role="img" aria-label="' + esc(t(Z.title)) + '">' + rays +
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
      return '<li class="jd"><div class="jd-img' + (PH[d.image] ? '' : ' jd-noimg') + '">' + (PH[d.image] ? pic(d.image, { sizes: '(max-width:760px) 100vw, 40vw' }) : '<span class="jd-place">' + esc(t(d.place)) + '</span>') + '</div><div class="jd-body">' +
        '<p class="jd-n">' + esc(t(L.day)) + ' ' + (i + 1) + '</p><h4>' + esc(t(d.place)) + '</h4><p class="jd-text">' + esc(t(d.text)) + '</p>' +
        (d.activities && d.activities.length ? '<ul>' + d.activities.map(function (a) { return '<li>' + esc(t(a)) + '</li>'; }).join('') + '</ul>' : '') +
        (d.practical ? '<p class="jd-prac">' + esc(t(d.practical)) + '</p>' : '') + '</div></li>';
    }).join('');
    var route = TOUR.destinations && TOUR.destinations.length ? TOUR.destinations.map(function (d) { return esc(t(d)); }).join(' <i>→</i> ') : null;
    var hl = (TOUR.highlights || []).filter(function (h) { return PH[h.image]; }).map(function (h) {
      return '<figure class="jh">' + pic(h.image, { sizes: '(max-width:760px) 70vw, 20vw' }) + '<figcaption><strong>' + esc(t(h.name)) + '</strong><span>' + esc(t(h.place)) + '</span></figcaption></figure>';
    }).join('');
    return '<section id="journey" class="ch journey dark" data-ch="journey">' +
      '<div class="jt">' +
      '<p class="kicker"><span class="kl">' + esc(t(J.kicker)) + '</span></p>' +
      '<h2 class="display jt-title">' + esc(t(TOUR.title)) + '</h2>' +
      '<p class="jt-desc">' + (TOUR.description ? esc(t(TOUR.description)) : tbd()) + '</p>' +
      (TOUR.note ? '<p class="jt-note"><em>' + esc(t(S.ui.draft)) + '</em>' + esc(t(TOUR.note)) + '</p>' : '') +
      '<div class="jt-route"><p class="jd-l">' + esc(t(L.destinations)) + '</p><p class="jt-route-v">' + (route || tbd()) + '</p></div>' +
      '<dl class="jt-facts">' + fact(L.duration, TOUR.duration) + fact(L.travelers, TOUR.travelers) +
      fact(L.season, TOUR.season) + fact(L.level, TOUR.level) + fact(L.transport, TOUR.transport) + '</dl>' +
      (hl ? '<h3 class="jt-sub">' + esc(t(L.highlights)) + '</h3><div class="jt-hl">' + hl + '</div>' : '') +
      '<h3 class="jt-sub">' + esc(t(L.itinerary)) + '</h3><ol class="jt-days">' + days + '</ol>' +
      '<div class="jt-price"><div class="jp-main"><p class="jd-l">' + esc(t(L.price)) + '</p><p class="jp-v">' + (TOUR.price ? esc(t(TOUR.price)) : tbd()) + '</p>' +
      bookingLink('cta', J.cta) + '<p class="note">' + esc(t(J.ctaNote)) + '</p></div>' +
      '<div class="jt-incl"><div><h4 class="jt-sub">' + esc(t(L.included)) + '</h4>' + list(TOUR.included) + '</div><div><h4 class="jt-sub">' + esc(t(L.excluded)) + '</h4>' + list(TOUR.excluded) + '</div></div></div>' +
      renderStar() +
      (TOUR.updated ? '<p class="note">' + esc(t(L.updated)) + ': ' + esc(TOUR.updated) + '</p>' : '') +
      '</div></section>';
  }

  function renderFooter() {
    var Fo = S.footer;
    return '<footer class="foot"><div class="foot-a"><strong>' + esc(Fo.event) + '</strong><span>' + esc(t(Fo.cities)) + '</span></div>' +
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
    $('#menuList').innerHTML = S.chapters.map(function (c, i) {
      return '<li><a href="#' + c.id + '" data-jump="' + c.id + '"><span class="ml-n">' + (i + 1) + '</span><span class="ml-t">' + esc(t(c.title)) + '</span></a></li>';
    }).join('');
    $('#progress').innerHTML = '<ol>' + S.chapters.map(function (c) {
      return '<li><a href="#' + c.id + '" data-jump="' + c.id + '" aria-label="' + esc(t(c.title)) + '"><span>' + esc(t(c.title)) + '</span></a></li>';
    }).join('') + '</ol>';
    $('#soundBtn .sr').textContent = t(sound.on ? S.ui.soundOff : S.ui.soundOn);
  }

  function renderAll() {
    main.innerHTML = renderFilm() + renderJourney() + renderFooter();
    renderChrome();
  }

  /* ---------- scroll: progress nav ---------- */
  function updateScroll() {
    var vh = window.innerHeight, active = null;
    $$('.ch', main).forEach(function (sec) { if (sec.getBoundingClientRect().top < vh * 0.5) active = sec.id; });
    $$('#progress a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-jump') === active); });
    // pause the film while it is out of view, resume when it comes back (unless the viewer paused it)
    var v = film.el, sec = $('#prologue');
    if (v && sec) {
      var visible = sec.getBoundingClientRect().bottom > vh * 0.25;
      if (!visible && !v.paused) { v.pause(); film.autoPaused = true; }
      else if (visible && film.autoPaused && v.paused && !film.ended) { film.autoPaused = false; v.play().catch(function () {}); }
    }
  }
  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; updateScroll(); }); } }

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
    root.classList.remove('lock');
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
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: reduce ? 'auto' : 'smooth' });
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

  /* ---------- language: re-render text, keep the film where it is ---------- */
  function setLang(l) {
    if (l === lang) return;
    var v = film.el, at = v ? v.currentTime : 0, wasPlaying = v && !v.paused, ended = film.ended, y = window.scrollY;
    lang = l;
    try { localStorage.setItem('lot-lang', l); } catch (e) {}
    renderAll();
    setupFilmAt(at, wasPlaying, ended);
    window.scrollTo(0, y);
    updateScroll();
  }
  function setupFilmAt(at, playing, ended) {
    var vid = bindFilm(ended);
    if (reduce && !playing && !at) vid.poster = 'img/film-end' + (portrait() ? '-v' : '') + '.webp';
    vid.addEventListener('loadedmetadata', function once() {
      vid.removeEventListener('loadedmetadata', once);
      try { vid.currentTime = at; } catch (e) {}
      if (ended || !playing) { showEnd(ended); playBtn(); if (!ended) tick(); } else vid.play().catch(function () { showEnd(false); });
    });
  }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-lang],[data-jump],#menuBtn,#soundBtn,#creditsBtn,[data-close],.wordmark,a[href="#journey"],.fm-play,.fm-skip,.fm-replay');
    if (!el) { if (e.target.id === 'lightbox') closeLightbox(); return; }
    if (el.hasAttribute('data-lang')) { setLang(el.getAttribute('data-lang')); return; }
    if (el.hasAttribute('data-jump')) { e.preventDefault(); jump(el.getAttribute('data-jump')); return; }
    if (el.id === 'menuBtn') { toggleMenu(); return; }
    if (el.id === 'soundBtn') { toggleSound(); return; }
    if (el.id === 'creditsBtn') { credits(); return; }
    if (el.hasAttribute('data-close')) { closeLightbox(); return; }
    if (el.classList.contains('fm-play')) { togglePlay(); return; }
    if (el.classList.contains('fm-replay')) { replay(); return; }
    if (el.classList.contains('fm-skip')) { jump('journey'); return; }
    if (el.classList.contains('wordmark')) { e.preventDefault(); jump('prologue'); return; }
    if (el.matches('a[href="#journey"]')) { e.preventDefault(); jump('journey'); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLightbox(); toggleMenu(false); }
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  var wasPortrait = portrait();
  window.addEventListener('resize', function () {
    onScroll();
    if (portrait() !== wasPortrait && film.el) {   // phone rotated: switch to the matching cut
      wasPortrait = portrait();
      var v = film.el; setupFilmAt(v.currentTime, !v.paused, film.ended);
    }
  });

  /* ---------- boot ---------- */
  renderAll();
  document.body.classList.remove('is-loading');
  document.body.classList.toggle('static', reduce);
  setupFilm();
  updateScroll();
  if (location.hash && location.hash.length > 1) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(function () { window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY); }, 60);
  }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
