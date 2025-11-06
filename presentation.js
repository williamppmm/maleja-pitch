/**
 * presentation.js
 * Configuración Reveal.js personalizada para el video pitch del PMV MALEJA Calzado
 * Autor: William Pérez Muñoz
 * Programa: Tecnología en ADSO — SENA
 */

// Paleta de colores corporativos MALEJA
const MALEJA_COLORS = {
  primary: "#d4aa3a", // Dorado
  secondary: "#25d366", // Verde WhatsApp
  dark: "#1a1a1a", // Negro principal
  light: "#ffffff", // Blanco
  shadow: "rgba(212,170,58,0.3)",
};

// ================================
// 🚀 CONFIGURACIÓN DE REVEAL.JS
// ================================
Reveal.initialize({
  hash: true,
  progress: true,
  center: true,
  history: true,
  controls: true,
  touch: true,
  keyboard: true,
  overview: true,

  // Navegación y transiciones
  controlsLayout: "bottom-right",
  controlsBackArrows: "faded",
  transition: "fade",
  transitionSpeed: "default",
  backgroundTransition: "slide",

  // Escalado y márgenes
  width: "100%",
  height: "100%",
  margin: 0.05,
  minScale: 0.2,
  maxScale: 2.0,

  // Opciones adicionales
  showSlideNumber: "c/t",
  hideInactiveCursor: true,
  hideCursorTime: 3000,
  autoSlide: 0,
});

// ================================
// 🎨 APLICAR ESTILO CORPORATIVO
// ================================
function applyBranding() {
  const controls = document.querySelector(".reveal .controls");
  const progress = document.querySelector(".reveal .progress");
  const slideNumber = document.querySelector(".reveal .slide-number");

  // Navegación
  if (controls) {
    controls.querySelectorAll("button").forEach((btn) => {
      Object.assign(btn.style, {
        background: MALEJA_COLORS.dark,
        border: `2px solid ${MALEJA_COLORS.primary}`,
        color: MALEJA_COLORS.light,
        borderRadius: "8px",
        padding: "8px",
        transition: "all 0.3s ease",
        boxShadow: `0 3px 8px ${MALEJA_COLORS.shadow}`,
      });

      btn.addEventListener("mouseenter", () => {
        Object.assign(btn.style, {
          background: MALEJA_COLORS.primary,
          color: MALEJA_COLORS.dark,
          transform: "translateY(-2px)",
        });
      });

      btn.addEventListener("mouseleave", () => {
        Object.assign(btn.style, {
          background: MALEJA_COLORS.dark,
          color: MALEJA_COLORS.light,
          transform: "translateY(0)",
        });
      });
    });
  }

  // Progreso
  if (progress) {
    progress.style.height = "4px";
    progress.style.background = MALEJA_COLORS.dark;
    const bar = progress.querySelector("span");
    if (bar) {
      bar.style.background = `linear-gradient(90deg, ${MALEJA_COLORS.primary}, ${MALEJA_COLORS.secondary})`;
      bar.style.boxShadow = `0 0 10px ${MALEJA_COLORS.shadow}`;
    }
  }

  // Número de slide
  if (slideNumber) {
    Object.assign(slideNumber.style, {
      background: MALEJA_COLORS.dark,
      color: MALEJA_COLORS.primary,
      border: `1px solid ${MALEJA_COLORS.primary}`,
      borderRadius: "6px",
      padding: "4px 8px",
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: `0 2px 8px ${MALEJA_COLORS.shadow}`,
    });
  }
}

// ================================
// 📱 OPTIMIZACIÓN MÓVIL
// ================================
function optimizeMobile() {
  if (window.innerWidth <= 768) {
    Reveal.configure({
      controls: true,
      touch: true,
      embedded: false,
      controlsLayout: "bottom-right",
    });

    const controls = document.querySelector(".reveal .controls");
    if (controls) {
      controls.style.transform = "scale(1.2)";
      controls.style.bottom = "20px";
      controls.style.right = "20px";
    }

    const progress = document.querySelector(".reveal .progress");
    if (progress) progress.style.height = "6px";
  }
}

// ================================
// 🧠 LOGGING Y ANALYTICS
// ================================
function logSlide(event) {
  const current = event.indexh + 1;
  const total = Reveal.getTotalSlides();
  console.log(`🎬 MALEJA Pitch — Slide ${current}/${total}`);
}

// ================================
// 🧭 SHORTCUTS DE UTILIDAD
// ================================
function toggleOverview() {
  Reveal.toggleOverview();
}

// ================================
// ⚡ EVENTOS PRINCIPALES
// ================================
Reveal.on("ready", (event) => {
  console.log("✅ Presentación MALEJA Calzado lista");
  applyBranding();
  optimizeMobile();
  logSlide(event);

  // Inicializar Mermaid si existe
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
      theme: "base",
    });
  }

  // Inicializar Lightbox (por si no lo hace index.html)
  if (typeof initLightbox === "function") {
    initLightbox();
  } else if (typeof PresentationLightbox === "function") {
    window.presentationLightbox = new PresentationLightbox();
  }
});

Reveal.on("slidechanged", (event) => {
  applyBranding();
  logSlide(event);
});

// ================================
// 🪄 EVENTOS DE VENTANA
// ================================
window.addEventListener("resize", () => {
  optimizeMobile();
  applyBranding();
});

// Tecla “O” = vista general
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "o" && !e.ctrlKey && !e.metaKey) {
    toggleOverview();
  }
});

// ================================
// 🌐 EXPORTAR FUNCIONES GLOBALES
// ================================
window.MALEJA_Presentation = {
  colors: MALEJA_COLORS,
  applyBranding,
  optimizeMobile,
  toggleOverview,
  getCurrentSlide: () => Reveal.getIndices().h + 1,
  getTotalSlides: () => Reveal.getTotalSlides(),
};