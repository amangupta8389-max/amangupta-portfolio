/* ===============================
   GLOBAL SCRIPT – Aman Portfolio
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ===== THEME TOGGLE ===== */
  const initTheme = () => {
    // Check localStorage first
    let savedTheme = localStorage.getItem("theme");

    // If no saved theme, check system preference
    if (!savedTheme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      savedTheme = prefersDark ? "dark" : "light";
    }

    // Set theme on root element
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeToggleButton(savedTheme);
  };

  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Update DOM
    document.documentElement.setAttribute("data-theme", newTheme);

    // Save to localStorage
    localStorage.setItem("theme", newTheme);

    // Update button icon
    updateThemeToggleButton(newTheme);
  };

  const updateThemeToggleButton = (theme) => {
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
      themeToggle.innerHTML = theme === "dark" ? "☀️" : "🌙";
    }
  };

  // Initialize theme on page load
  initTheme();

  // Add click listener to theme toggle button
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  /* ===== HAMBURGER MENU ===== */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open"); // matches CSS
      navLinks.classList.toggle("active"); // matches CSS
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("active");
      });
    });
  }

  /* ===== NAVBAR SCROLL EFFECT ===== */
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  /* ===== ACTIVE NAV LINK ===== */
  const navItems = document.querySelectorAll(".nav-links a");

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navItems.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  /* ===== HERO TYPING EFFECT ===== */
  const typingElement = document.getElementById("typing");

  if (typingElement) {
    const texts = [
      "Java Full Stack Developer",
      "Spring Boot & REST APIs",
      "Clean Code & Scalable Systems",
      "Building Meaningful Software",
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentText = texts[textIndex];

      if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1200);
          return;
        }
      } else {
        typingElement.textContent = currentText.substring(0, charIndex--);
        if (charIndex < 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }

      setTimeout(typeEffect, isDeleting ? 60 : 100);
    }

    typeEffect();
  }
});
