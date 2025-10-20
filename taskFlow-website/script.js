// Mobile Menu Functionality
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
const hamburger = document.querySelector(".hamburger");
const body = document.body;

function openMobileMenu() {
  mobileMenu.classList.add("open");
  hamburger.classList.add("open");
  body.classList.add("menu-open");
}

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  hamburger.classList.remove("open");
  body.classList.remove("menu-open");
}

mobileMenuButton.addEventListener("click", openMobileMenu);
mobileMenuClose.addEventListener("click", closeMobileMenu);

// Close menu when clicking on navigation links
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
    // Smooth scroll to section
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
    closeMobileMenu();
  }
});

// Scroll Animation Functionality
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all animation elements
document
  .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
  .forEach((el) => {
    observer.observe(el);
  });

// Smooth scrolling for desktop navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
