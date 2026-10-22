/* Mode d'affichage : Auto (suit l'appareil), Clair ou Sombre. Le choix reste sur l'appareil du visiteur
   (localStorage, jamais envoyé nulle part). Le script s'exécute avant l'affichage pour éviter un clignotement. */
(function () {
  var KEY = 'muskadia-theme';
  var root = document.documentElement;
  function read() {
    try { var v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : 'auto'; } catch (e) { return 'auto'; }
  }
  function apply(mode) {
    if (mode === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', mode);
  }
  apply(read());

  var L = {
    fr: { auto: 'Auto', light: 'Clair', dark: 'Sombre', label: 'Mode d’affichage' },
    en: { auto: 'Auto', light: 'Light', dark: 'Dark', label: 'Display mode' },
    it: { auto: 'Auto', light: 'Chiaro', dark: 'Scuro', label: 'Aspetto' },
    es: { auto: 'Auto', light: 'Claro', dark: 'Oscuro', label: 'Apariencia' },
    'pt-BR': { auto: 'Auto', light: 'Claro', dark: 'Escuro', label: 'Aparência' },
    de: { auto: 'Auto', light: 'Hell', dark: 'Dunkel', label: 'Darstellung' }
  };
  function lang() {
    var h = (location.hash || '').slice(1);
    if (L[h]) return h;
    var d = (root.getAttribute('lang') || '').replace('_', '-');
    if (L[d]) return d;
    var n = (navigator.language || 'en');
    return L[n] ? n : (L[n.slice(0, 2)] ? n.slice(0, 2) : 'en');
  }
  var ICON = { auto: '◐', light: '☀', dark: '☾' };
  var ORDER = ['auto', 'light', 'dark'];

  document.addEventListener('DOMContentLoaded', function () {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'mode-toggle';
    function paint() {
      var m = read(), t = L[lang()];
      b.textContent = ICON[m] + ' ' + t[m];
      b.setAttribute('aria-label', t.label + ' : ' + t[m]);
      b.title = t.label;
    }
    b.addEventListener('click', function () {
      var next = ORDER[(ORDER.indexOf(read()) + 1) % 3];
      try { if (next === 'auto') localStorage.removeItem(KEY); else localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
      paint();
    });
    window.addEventListener('hashchange', paint);
    paint();
    document.body.appendChild(b);
  });
})();
