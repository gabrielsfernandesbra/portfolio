document.addEventListener("DOMContentLoaded", () => {
  const basePath = getBasePath();

  loadComponent("#navbar", basePath + "components/navbar.html");
  loadComponent("#footer", basePath + "components/footer.html");
  loadComponent("#theme-toggle", basePath + "components/theme-toggle.html", initTheme);
});

/* PAGINAS */
function getBasePath() {
  const path = window.location.pathname;

  // se estiver dentro de /pages/
  if (path.includes("/pages/")) {
    return "../";
  }


  return "./";
}

/* COMPONENTES */
function loadComponent(selector, url, callback) {
  const el = document.querySelector(selector);

  if (!el) return;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(url);
      return res.text();
    })
    .then(html => {
      el.innerHTML = html;
      if (callback) callback();
    })
    .catch(err => console.error("Erro:", err));
}

/* TEMA */
function initTheme() {
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    const isDark = toggle.checked;

    document.body.classList.toggle("dark", isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}