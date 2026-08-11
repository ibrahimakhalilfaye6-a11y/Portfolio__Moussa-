/* ════════════════════════════════════════════
   script.js — Portfolio Moussa Sy
   Fonctionnalités :
   1. Toggle dark / light mode
   2. Filtre des projets par catégorie
   3. Animation au scroll (fade-in)
   4. Validation du formulaire de contact
   ════════════════════════════════════════════ */


/* ── 1. TOGGLE DARK / LIGHT MODE ── */
const toggleBtn = document.getElementById('toggleMode');

if (toggleBtn) {
  toggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
      toggleBtn.textContent = '🌙 Mode';
    } else {
      toggleBtn.textContent = '☀ Mode';
    }
  });
}


/* ── 2. FILTRE DES PROJETS PAR CATÉGORIE ── */
const filtres = document.querySelectorAll('.filtre');
const cartes  = document.querySelectorAll('.projet-carte-filtrable');

filtres.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // Mettre à jour le bouton actif
    filtres.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    const categorie = btn.getAttribute('data-filtre');

    cartes.forEach(function (carte) {
      const col = carte.closest('.col-filtrable');
      if (!col) return;

      if (categorie === 'tous' || carte.getAttribute('data-categorie') === categorie) {
        col.style.display = 'block';
      } else {
        col.style.display = 'none';
      }
    });
  });
});


/* ── 3. ANIMATION AU SCROLL (fade-in) ── */
const elementsAAnimer = document.querySelectorAll('.fade-in');

function animerAuScroll() {
  elementsAAnimer.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', animerAuScroll);
animerAuScroll(); // lancer au chargement


/* ── 4. VALIDATION DU FORMULAIRE DE CONTACT ── */
const formulaire = document.getElementById('contactForm');

if (formulaire) {
  formulaire.addEventListener('submit', function (e) {
    e.preventDefault();

    const nom     = document.getElementById('nom');
    const email   = document.getElementById('email');
    const message = document.getElementById('message');
    const alerte  = document.getElementById('alerte');

    let erreur = '';

    // Vérification nom
    if (nom.value.trim() === '') {
      erreur = 'Veuillez entrer votre nom.';
      nom.classList.add('champ-erreur');
    } else {
      nom.classList.remove('champ-erreur');
    }

    // Vérification email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '' || !regexEmail.test(email.value)) {
      erreur = erreur || 'Veuillez entrer un email valide.';
      email.classList.add('champ-erreur');
    } else {
      email.classList.remove('champ-erreur');
    }

    // Vérification message
    if (message.value.trim().length < 10) {
      erreur = erreur || 'Le message doit contenir au moins 10 caractères.';
      message.classList.add('champ-erreur');
    } else {
      message.classList.remove('champ-erreur');
    }

    // Affichage du résultat
    if (erreur) {
      alerte.textContent = erreur;
      alerte.className = 'alert alert-erreur';
      alerte.style.display = 'block';
    } else {
      alerte.textContent = 'Message envoyé avec succès ! Je vous répondrai rapidement.';
      alerte.className = 'alert alert-succes';
      alerte.style.display = 'block';
      formulaire.reset();

      // Cacher l'alerte après 4 secondes
      setTimeout(function () {
        alerte.style.display = 'none';
      }, 4000);
    }
  });
}