const blogPosts = [
  {
    id: 1,
    title: "Getting Started with JavaScript ES6",
    description:
      "Learn the modern features of JavaScript ES6 including arrow functions, destructuring, and modules.",
    category: "tech",
    date: "2025-01-15",
    image: "./public/javascript-code.jpg",
  },
  {
    id: 2,
    title: "My Trip to Tokyo",
    description:
      "Exploring the vibrant culture, amazing food, and beautiful temples of Japan's capital city.",
    category: "travel",
    date: "2025-01-10",
    image: "./public/tokyo-cityscape-travel.jpg",
  },
  {
    id: 3,
    title: "The Perfect Pasta Recipe",
    description:
      "A simple yet delicious homemade pasta recipe that will impress your family and friends.",
    category: "food",
    date: "2025-01-08",
    image: "./public/italian-pasta-cooking.jpg",
  },
  {
    id: 4,
    title: "Building Responsive Web Layouts",
    description:
      "Master CSS Grid and Flexbox to create beautiful, responsive layouts for modern web applications.",
    category: "tech",
    date: "2025-01-05",
    image: "./public/web-development-coding.jpg",
  },
  {
    id: 5,
    title: "Hidden Gems of Paris",
    description:
      "Discover the lesser-known attractions and local favorites in the City of Light.",
    category: "travel",
    date: "2025-01-03",
    image: "./public/paris-eiffel-tower.jpg",
  },
  {
    id: 6,
    title: "Homemade Pizza Secrets",
    description:
      "Tips and tricks for making restaurant-quality pizza at home with simple ingredients.",
    category: "food",
    date: "2025-01-01",
    image: "./public/mexican-tacos-street-food.jpg",
  },
  {
    id: 7,
    title: "React Hooks Deep Dive",
    description:
      "Understanding useState, useEffect, and custom hooks to build powerful React applications.",
    category: "tech",
    date: "2024-12-28",
    image: "./public/react-programming-code.jpg",
  },
  {
    id: 8,
    title: "Backpacking Through Southeast Asia",
    description:
      "A month-long adventure through Thailand, Vietnam, and Cambodia on a budget.",
    category: "travel",
    date: "2024-12-25",
    image: "./public/southeast-asia-backpacking.jpg",
  },
  {
    id: 9,
    title: "Mastering French Pastries",
    description:
      "Learn the art of making croissants, macarons, and other classic French pastries.",
    category: "food",
    date: "2024-12-22",
    image: "./public/sourdough-masterclass.jpg",
  },
  {
    id: 10,
    title: "Node.js Performance Optimization",
    description:
      "Techniques to improve the performance and scalability of your Node.js applications.",
    category: "tech",
    date: "2024-12-20",
    image: "./public/node.jpg",
  },
];

let currentPage = 1;
let postsPerPage = 6;
let filteredPosts = [...blogPosts];
let currentCategory = "all";
let currentSearch = "";

const postsGrid = document.getElementById("postsGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const noResults = document.getElementById("noResults");

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// post card
function createPostCard(post) {
  console.log(post.image);

  return `
                <article class="post-card">
                    <img src="${post.image}" alt="${
    post.title
  }" class="post-image">
                    <div class="post-content">
                        <span class="post-category">${post.category}</span>
                        <h2 class="post-title">${post.title}</h2>
                        <p class="post-description">${post.description}</p>
                        <time class="post-date">${formatDate(post.date)}</time>
                    </div>
                </article>
            `;
}

// Filter posts by category and search
function filterPosts() {
  filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      currentCategory === "all" || post.category === currentCategory;
    const matchesSearch = post.title
      .toLowerCase()
      .includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  currentPage = 1;
  renderPosts();
  updatePagination();
}

// Render posts for current page
function renderPosts() {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToShow = filteredPosts.slice(startIndex, endIndex);

  if (postsToShow.length === 0) {
    postsGrid.style.display = "none";
    noResults.style.display = "block";
  } else {
    postsGrid.style.display = "grid";
    noResults.style.display = "none";
    postsGrid.innerHTML = postsToShow.map(createPostCard).join("");
  }
}

// Update pagination controls
function updatePagination() {
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;

  if (totalPages === 0) {
    pageInfo.textContent = "No pages";
  } else {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  }
}

// Event listeners
searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value;
  filterPosts();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentCategory = button.dataset.category;
    filterPosts();
  });
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
    updatePagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPosts();
    updatePagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Initialize the page
function init() {
  renderPosts();
  updatePagination();
}

init();
