const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const themeBtn = $("#themeBtn");
const savedTheme = localStorage.getItem("lc-theme");
if (savedTheme === "light") document.body.classList.add("light");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("lc-theme", document.body.classList.contains("light") ? "light" : "dark");
});

const menuBtn = $("#menuBtn");
const nav = $("#nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  if (open) {
    nav.style.display = "flex";
    nav.style.position = "absolute";
    nav.style.top = "76px";
    nav.style.left = "0";
    nav.style.right = "0";
    nav.style.padding = "18px";
    nav.style.background = "var(--bg)";
    nav.style.borderBottom = "1px solid var(--line)";
    nav.style.flexDirection = "column";
  } else {
    nav.removeAttribute("style");
  }
});

const toast = $("#toast");
let toastTimer;
$$("[data-copy]").forEach(btn => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "Copiado ✓";
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 1200);
      setTimeout(() => btn.textContent = "Copiar", 1200);
    } catch {
      btn.textContent = "Selecione";
      setTimeout(() => btn.textContent = "Copiar", 1200);
    }
  });
});

$$('a[href^="#"]').forEach(a => a.addEventListener("click", () => {
  if (nav.classList.contains("open")) {
    nav.classList.remove("open");
    nav.removeAttribute("style");
  }
}));

// Small entrance effect without a framework.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [{opacity: 0, transform: "translateY(18px)"}, {opacity: 1, transform: "translateY(0)"}],
        {duration: 500, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards"}
      );
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .08});

$$(".feature-card,.doc-card,.editor-card,.arch-node,.command").forEach(el => observer.observe(el));
