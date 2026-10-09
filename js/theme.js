// ===== DARK MODE =====
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const icon = document.getElementById('themeIcon'); // guard : le header est injecté en async
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    if (icon) icon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (icon) icon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}
// Sync de l'icône au chargement (le thème est déjà appliqué par js/theme-init.js dans le <head>).
// Au premier passage le header n'est pas encore injecté : includes.js refait la synchro ensuite.
if (document.documentElement.getAttribute('data-theme') === 'dark') {
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = '☀️';
}
