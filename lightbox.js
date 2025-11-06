/**
 * lightbox.js
 * Lightbox optimizado para la presentación Reveal.js del PMV MALEJA Calzado
 * Autor: William Pérez Muñoz
 * Programa: Tecnología en ADSO — SENA
 */

class PresentationLightbox {
  constructor() {
    this.isOpen = false;
    this.overlay = null;
    this.image = null;
    this.caption = null;
    this.closeBtn = null;
    this.isInitialized = false;
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    this.createOverlay();
    this.attachListeners();
  }

  createOverlay() {
    // Overlay principal
    this.overlay = document.createElement("div");
    Object.assign(this.overlay.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(26, 26, 26, 0.95)",
      backdropFilter: "blur(8px)",
      zIndex: 9999,
      transition: "opacity 0.3s ease",
      opacity: 0,
    });

    // Contenedor central
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "relative",
      maxWidth: "90vw",
      maxHeight: "90vh",
      background: "rgba(255,255,255,0.97)",
      borderRadius: "12px",
      boxShadow: "0 20px 40px rgba(212,170,58,0.18)",
      border: "2px solid #d4aa3a",
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    });

    // Imagen
    this.image = document.createElement("img");
    Object.assign(this.image.style, {
      maxWidth: "100%",
      maxHeight: "75vh",
      objectFit: "contain",
      borderRadius: "8px",
      transition: "transform 0.3s ease",
      boxShadow: "0 8px 25px rgba(212, 170, 58, 0.18)",
      cursor: "zoom-out",
    });

    // Texto descriptivo
    this.caption = document.createElement("div");
    Object.assign(this.caption.style, {
      color: "#d4aa3a",
      textAlign: "center",
      fontFamily: "Segoe UI, sans-serif",
      fontSize: "1.05rem",
      fontWeight: "500",
      marginTop: "1rem",
      textShadow: "0 2px 6px rgba(26,26,26,0.3)",
    });

    // Botón cerrar
    this.closeBtn = document.createElement("button");
    this.closeBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>`;
    Object.assign(this.closeBtn.style, {
      position: "absolute",
      top: "-10px",
      right: "-10px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#25d366",
      color: "white",
      border: "2px solid #d4aa3a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(37,211,102,0.18)",
      transition: "all 0.25s ease",
      zIndex: 10001,
    });

    // Efectos hover
    this.closeBtn.addEventListener("mouseenter", () => {
      this.closeBtn.style.background = "#d4aa3a";
      this.closeBtn.style.color = "#1a1a1a";
      this.closeBtn.style.transform = "scale(1.1)";
      this.closeBtn.style.boxShadow = "0 6px 20px rgba(212,170,58,0.25)";
    });
    this.closeBtn.addEventListener("mouseleave", () => {
      this.closeBtn.style.background = "#25d366";
      this.closeBtn.style.color = "white";
      this.closeBtn.style.transform = "scale(1)";
      this.closeBtn.style.boxShadow = "0 4px 12px rgba(37,211,102,0.18)";
    });

    container.append(this.image, this.caption, this.closeBtn);
    this.overlay.appendChild(container);
    document.body.appendChild(this.overlay);

    // Cerrar al hacer clic fuera
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });
    this.closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.close();
    });
  }

  attachListeners() {
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("zoomable")) {
        e.preventDefault();
        this.open(target);
      }
    });

    // ESC para cerrar
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        e.preventDefault();
        this.close();
      }
    });

    // Bloquear navegación Reveal mientras está abierto
    document.addEventListener(
      "keydown",
      (e) => {
        if (
          this.isOpen &&
          ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"].includes(e.code)
        ) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true
    );
  }

  open(target) {
    if (this.isOpen) return;
    this.isOpen = true;

    const src = target.src;
    const alt = target.alt || "";
    const captionText = target.dataset.caption || alt;

    this.image.src = src;
    this.image.alt = alt;
    this.caption.textContent = captionText;

    // Ajuste especial si es SVG
    if (src.toLowerCase().includes(".svg")) {
      Object.assign(this.image.style, {
        background: "#fff",
        padding: "1rem",
      });
    } else {
      this.image.style.background = "transparent";
      this.image.style.padding = "0";
    }

    // Mostrar animado
    this.overlay.style.display = "flex";
    requestAnimationFrame(() => {
      this.overlay.style.opacity = "1";
    });
    document.body.style.overflow = "hidden";

    // Pausar Reveal
    if (window.Reveal && typeof Reveal.configure === "function") {
      Reveal.configure({ keyboard: false });
    }
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;

    this.overlay.style.opacity = "0";
    setTimeout(() => {
      this.overlay.style.display = "none";
      document.body.style.overflow = "";

      // Reactivar Reveal
      if (window.Reveal && typeof Reveal.configure === "function") {
        Reveal.configure({ keyboard: true });
      }
    }, 300);
  }
}

// ================================
// 🔁 Inicialización global
// ================================
function initLightbox() {
  if (!window.presentationLightbox) {
    window.presentationLightbox = new PresentationLightbox();
  }
}

// Inicialización segura en todos los escenarios
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLightbox);
} else {
  initLightbox();
}

// Integración con Reveal.js
if (window.Reveal && typeof Reveal.addEventListener === "function") {
  Reveal.addEventListener("ready", initLightbox);
} else {
  const checkReveal = setInterval(() => {
    if (window.Reveal) {
      clearInterval(checkReveal);
      if (typeof Reveal.addEventListener === "function") {
        Reveal.addEventListener("ready", initLightbox);
      }
    }
  }, 100);
}