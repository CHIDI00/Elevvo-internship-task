const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const navLinks = document.querySelectorAll(".nav-link");
const closeBtn = document.getElementById("closeBtn");

function isMobile() {
  return window.innerWidth < 768;
}

function toggleSidebar() {
  if (isMobile()) {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");

    if (sidebar.classList.contains("open")) {
      toggleBtn.textContent = "✕";
    } else {
      toggleBtn.textContent = "☰";
    }
  } else {
    sidebar.classList.toggle("collapsed");
  }
}

function closeSidebar() {
  if (isMobile()) {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    toggleBtn.textContent = "☰";
  }
}

function handleNavClick(e) {
  e.preventDefault();

  navLinks.forEach((link) => link.classList.remove("active"));

  e.currentTarget.classList.add("active");

  if (isMobile()) {
    closeSidebar();
  }
}

function handleResize() {
  if (isMobile()) {
    sidebar.classList.remove("collapsed");
    if (!sidebar.classList.contains("open")) {
      toggleBtn.textContent = "☰";
    }
  } else {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    toggleBtn.textContent = "☰";
  }
}

toggleBtn.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", closeSidebar);
navLinks.forEach((link) => link.addEventListener("click", handleNavClick));
window.addEventListener("resize", handleResize);
closeBtn.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isMobile() && sidebar.classList.contains("open")) {
    closeSidebar();
  }
});

handleResize();
