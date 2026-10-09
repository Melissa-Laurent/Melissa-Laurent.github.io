// ===== LIGHTBOX — visionneuse des planches de projets =====
// Ajout par rapport au site de Raphaël : dans un portfolio d'architecture intérieure,
// les plans, coupes et maquettes doivent pouvoir être regardés en grand.
//
// Utilisation dans le HTML (voir index.html et html/projects.html) :
//   <div class="project-card">
//     <div class="project-img-wrap" data-gallery-open> <img class="project-img" …> </div>
//     <button class="project-link" data-gallery-open>…</button>
//     <ul class="project-gallery" hidden>
//       <li><a href="assets/projets/plan.jpg" data-fr="Plan aménagé" data-en="Furnished plan">Plan aménagé</a></li>
//     </ul>
//   </div>
// Tout élément [data-gallery-open] d'une carte ouvre la visionneuse sur ses planches.
// Sans liste .project-gallery, la visionneuse affiche simplement l'image de couverture.
(function () {
  'use strict';

  let box, imgEl, textEl, counterEl, closeBtn;
  let items = [];   // liens <a> de la galerie courante
  let index = 0;    // planche affichée
  let lastFocus = null; // élément à re-focaliser à la fermeture (accessibilité clavier)
  let touchX = null;    // position de départ du swipe sur mobile

  // currentLang est défini dans js/lang.js ; fallback français
  const lang = () => (typeof currentLang !== 'undefined' ? currentLang : 'fr');
  const t = (fr, en) => (lang() === 'en' ? en : fr);
  const captionOf = a => a.getAttribute('data-' + lang()) || a.textContent.trim();

  // Construit le DOM de la visionneuse une seule fois, au premier besoin
  function build() {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML =
      '<button type="button" class="lightbox-btn lightbox-close">✕</button>' +
      '<button type="button" class="lightbox-btn lightbox-prev">‹</button>' +
      '<figure class="lightbox-figure">' +
        '<img class="lightbox-img" alt="">' +
        '<figcaption class="lightbox-caption"><span class="lightbox-text"></span><span class="lightbox-counter"></span></figcaption>' +
      '</figure>' +
      '<button type="button" class="lightbox-btn lightbox-next">›</button>';
    document.body.appendChild(box);

    imgEl     = box.querySelector('.lightbox-img');
    textEl    = box.querySelector('.lightbox-text');
    counterEl = box.querySelector('.lightbox-counter');
    closeBtn  = box.querySelector('.lightbox-close');

    closeBtn.addEventListener('click', close);
    box.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
    box.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
    // Clic sur le fond sombre (pas sur l'image ni les boutons) → ferme
    box.addEventListener('click', e => { if (e.target === box || e.target.classList.contains('lightbox-figure')) close(); });
    imgEl.addEventListener('load', () => imgEl.classList.remove('loading'));

    // Swipe gauche / droite sur mobile
    box.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', e => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1));
      touchX = null;
    }, { passive: true });

    document.addEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (!box || !box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(index + 1);
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'Tab') {
      // Garde le focus à l'intérieur de la visionneuse
      const focusables = [...box.querySelectorAll('button')].filter(b => b.offsetParent !== null);
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function show(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length; // boucle : après la dernière planche, retour à la première
    const a = items[index];
    imgEl.classList.add('loading');
    imgEl.src = a.getAttribute('href');
    imgEl.alt = captionOf(a);
    textEl.textContent = captionOf(a);
    counterEl.textContent = items.length > 1 ? (index + 1) + ' / ' + items.length : '';
    // Précharge la planche suivante pour une navigation fluide
    if (items.length > 1) new Image().src = items[(index + 1) % items.length].getAttribute('href');
  }

  function open(card) {
    if (!box) build();
    items = [...card.querySelectorAll('.project-gallery a[href]')];
    if (!items.length) {
      // Pas de galerie : on montre l'image de couverture seule
      const cover = card.querySelector('.project-img');
      if (!cover) return;
      const a = document.createElement('a');
      a.setAttribute('href', cover.getAttribute('src'));
      a.textContent = cover.alt;
      items = [a];
    }
    // Libellés des boutons dans la langue courante
    closeBtn.setAttribute('aria-label', t('Fermer', 'Close'));
    box.querySelector('.lightbox-prev').setAttribute('aria-label', t('Planche précédente', 'Previous board'));
    box.querySelector('.lightbox-next').setAttribute('aria-label', t('Planche suivante', 'Next board'));
    const name = card.querySelector('.project-name');
    box.setAttribute('aria-label', name ? name.textContent.trim() : t('Planches', 'Boards'));
    box.classList.toggle('single', items.length < 2);

    lastFocus = document.activeElement;
    show(0);
    box.classList.add('open');
    document.body.classList.add('lightbox-lock');
    closeBtn.focus();
  }

  function close() {
    box.classList.remove('open');
    document.body.classList.remove('lightbox-lock');
    if (lastFocus) lastFocus.focus();
  }

  function init() {
    document.querySelectorAll('.project-card').forEach(card => {
      const triggers = card.querySelectorAll('[data-gallery-open]');
      if (!triggers.length) return;

      triggers.forEach(el => {
        el.addEventListener('click', e => { e.preventDefault(); open(card); });
        // La zone image n'est pas un bouton natif : on la rend accessible au clavier
        if (el.tagName !== 'BUTTON') {
          el.setAttribute('role', 'button');
          el.setAttribute('tabindex', '0');
          el.setAttribute('aria-label', t('Agrandir les planches', 'Enlarge the boards'));
          el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
          });
        }
      });

      // Pastille « ⤢ N images » sur la couverture quand il y a plusieurs planches
      const count = card.querySelectorAll('.project-gallery a[href]').length;
      const wrap = card.querySelector('.project-img-wrap');
      if (wrap && count > 1) {
        const badge = document.createElement('span');
        badge.className = 'project-img-count';
        badge.setAttribute('aria-hidden', 'true');
        badge.textContent = '⤢ ' + count + ' images';
        wrap.appendChild(badge);
      }
    });
  }

  // Gère les deux cas de chargement (script defer ou non)
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
