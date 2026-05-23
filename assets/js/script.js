'use strict';



// ========== PRELOADER ==========

var preloader = document.querySelector('[data-preloader]');

if (preloader) {
  function hidePreloader() {
    preloader.classList.add('fade-out');
    setTimeout(function () {
      preloader.style.display = 'none';
    }, 700);
  }

  // Fallback: hide after 3 seconds even if page hasn't fully loaded
  var preloaderTimer = setTimeout(hidePreloader, 3000);

  window.addEventListener('load', function () {
    clearTimeout(preloaderTimer);
    // Small delay ensures smooth transition after everything renders
    setTimeout(hidePreloader, 300);
  });
}



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// handle form submission with AJAX for inline feedback
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  formBtn.setAttribute("disabled", "");
  formStatus.textContent = "Sending...";
  formStatus.className = "form-status form-status--sending";
  formStatus.style.display = "block";

  if (!form.checkValidity()) return;

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      formStatus.textContent = "✓ Message sent! I'll get back to you soon.";
      formStatus.className = "form-status form-status--success";
      form.reset();
    } else {
      formStatus.textContent = "✗ Something went wrong. Please try again or email me directly.";
      formStatus.className = "form-status form-status--error";
    }
  } catch (error) {
    formStatus.textContent = "✗ Network error. Please check your connection and try again.";
    formStatus.className = "form-status form-status--error";
  }

  formBtn.removeAttribute("disabled");
});



// fitness gallery lightbox variables
const fitnessItems = document.querySelectorAll("[data-fitness-item]");
const fitnessModalContainer = document.querySelector("[data-fitness-modal-container]");
const fitnessModalCloseBtn = document.querySelector("[data-fitness-modal-close]");
const fitnessOverlay = document.querySelector("[data-fitness-overlay]");
const fitnessModalImg = document.querySelector("[data-fitness-modal-img]");
const fitnessModalVideo = document.querySelector("[data-fitness-modal-video]");

// fitness modal toggle function
const fitnessModalFunc = function () {
  fitnessModalContainer.classList.toggle("active");
  fitnessOverlay.classList.toggle("active");
  
  // pause video when closing
  if (!fitnessModalContainer.classList.contains("active")) {
    fitnessModalVideo.pause();
  }
}

// add click event to all fitness gallery items
for (let i = 0; i < fitnessItems.length; i++) {
  fitnessItems[i].addEventListener("click", function () {
    // check if this item has a video
    const videoSrc = this.getAttribute("data-fitness-video-src");
    
    if (videoSrc) {
      // show video, hide img
      fitnessModalImg.style.display = "none";
      fitnessModalVideo.style.display = "block";
      fitnessModalVideo.src = videoSrc;
      fitnessModalVideo.play();
    } else {
      // show img, hide video
      const img = this.querySelector("[data-fitness-img]");
      fitnessModalImg.src = img.src;
      fitnessModalImg.alt = img.alt;
      fitnessModalImg.style.display = "block";
      fitnessModalVideo.style.display = "none";
      fitnessModalVideo.pause();
      fitnessModalVideo.src = "";
    }
    
    fitnessModalFunc();
  });
}

// add click event to modal close button and overlay
fitnessModalCloseBtn.addEventListener("click", fitnessModalFunc);
fitnessOverlay.addEventListener("click", fitnessModalFunc);

// close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && fitnessModalContainer.classList.contains("active")) {
    fitnessModalFunc();
  }
});


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const targetPage = this.innerHTML.toLowerCase();

    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}


// typewriter effect for the title
const typingTarget = document.querySelector("[data-typing-target]");
if (typingTarget) {
  const fullText = typingTarget.textContent;

  // Skip animation for users who prefer reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typingTarget.textContent = fullText;
  } else {
    typingTarget.textContent = "";

    const textSpan = document.createElement("span");
    textSpan.style.display = "inline";
    const cursorSpan = document.createElement("span");
    cursorSpan.className = "typing-cursor";
    // cursor is styled via CSS as a thin block, not a text character

    typingTarget.appendChild(textSpan);
    typingTarget.appendChild(cursorSpan);

    let charIndex = 0;
    let isDeleting = false;
    let pauseDelay = 2000;

    function typeEffect() {
      if (isDeleting) {
        if (charIndex > 0) {
          textSpan.textContent = fullText.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(typeEffect, 30);
        } else {
          isDeleting = false;
          setTimeout(typeEffect, 300);
        }
      } else {
        if (charIndex < fullText.length) {
          textSpan.textContent += fullText.charAt(charIndex);
          charIndex++;
          setTimeout(typeEffect, 60);
        } else {
          setTimeout(() => {
            isDeleting = true;
            setTimeout(typeEffect, 300);
          }, pauseDelay);
        }
      }
    }

    setTimeout(typeEffect, 400);
  }
}


// theme toggle
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = themeToggle?.querySelector("ion-icon");

function setTheme(isLight) {
  document.body.classList.toggle("light-mode", isLight);
  if (themeIcon) {
    themeIcon.name = isLight ? "sunny-outline" : "moon-outline";
  }
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Initialize theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme === "light");
} else {
  // Respect system preference
  setTheme(window.matchMedia("(prefers-color-scheme: light)").matches);
}

// Toggle on click
themeToggle?.addEventListener("click", function () {
  setTheme(!document.body.classList.contains("light-mode"));
});


// skill bar animation on scroll
const skillFills = document.querySelectorAll(".skill-progress-fill");
const skillsSection = document.querySelector(".skills-list");

if (skillFills.length && skillsSection) {
  // Store target widths from data-percent, then reset to 0
  skillFills.forEach(function (bar) {
    bar.dataset.targetWidth = bar.getAttribute("data-percent") || 0;
    bar.style.width = "0";
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          skillFills.forEach(function (bar) {
            bar.style.width = bar.dataset.targetWidth + "%";
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillsSection);
}


// ========== PORTFOLIO PROJECT DATA ==========
const projectData = {
  "finance": {
    title: "Finance",
    category: "Web development",
    description: "A comprehensive financial dashboard web app for tracking stock market data, portfolio performance, and analytics. Features real-time data visualization with interactive charts, customizable watchlists, and historical trend analysis to help users make informed investment decisions.",
    tech: ["React", "TypeScript", "Chart.js", "Node.js", "CSS3"],
    link: "https://github.com/RaidenGH"
  },
  "orizon": {
    title: "Orizon",
    category: "Web development",
    description: "A travel and landscape brand website that immerses visitors in breathtaking destinations through stunning visuals and curated travel guides. Features interactive maps, destination showcases, and a seamless booking experience designed to inspire wanderlust.",
    tech: ["HTML5", "CSS3", "JavaScript", "Figma", "React"],
    link: "https://github.com/RaidenGH"
  },
  "fundo": {
    title: "Fundo",
    category: "Web design",
    description: "An investment and finance platform UI design that balances modern aesthetics with intuitive usability. Clean typography, data-rich dashboards, and a sophisticated color palette create a trustworthy and engaging user experience for investors.",
    tech: ["Figma", "HTML5", "CSS3", "JavaScript"],
    link: "https://github.com/RaidenGH"
  },
  "brawlhalla": {
    title: "Brawlhalla",
    category: "Applications",
    description: "A gaming companion app built for battle arena enthusiasts. Provides real-time match stats, character guides, combo libraries, and match history tracking. Designed with a dynamic, energetic UI that captures the thrill of competitive gaming.",
    tech: ["JavaScript", "React", "Node.js", "CSS3", "Git"],
    link: "https://github.com/RaidenGH"
  },
  "dsm.": {
    title: "DSM.",
    category: "Web design",
    description: "A modern architecture and design brand website that embodies minimalist sophistication. Clean lines, generous whitespace, and curated project galleries showcase the beauty of contemporary architectural design with a focus on visual storytelling.",
    tech: ["Figma", "HTML5", "CSS3", "JavaScript", "React"],
    link: "https://github.com/RaidenGH"
  },
  "metaspark": {
    title: "MetaSpark",
    category: "Web design",
    description: "A futuristic tech brand landing page that explores metaverse and digital innovation concepts. Features immersive 3D visual elements, dynamic particle animations, and a bold cyberpunk-inspired aesthetic that positions the brand at the cutting edge of technology.",
    tech: ["Figma", "HTML5", "CSS3", "JavaScript", "React"],
    link: "https://github.com/RaidenGH"
  },
  "summary": {
    title: "Summary",
    category: "Web development",
    description: "A business analytics tool that transforms raw data into actionable insights through interactive summary reports and visualizations. Features custom report generation, export capabilities, and real-time data syncing for teams.",
    tech: ["React", "TypeScript", "Chart.js", "Node.js", "Python"],
    link: "https://github.com/RaidenGH"
  },
  "task manager": {
    title: "Task Manager",
    category: "Applications",
    description: "A productivity web app designed for efficient task management and workflow organization. Features drag-and-drop kanban boards, priority tagging, deadline tracking, and team collaboration tools to keep projects moving forward.",
    tech: ["JavaScript", "React", "HTML5", "CSS3", "Node.js", "Git"],
    link: "https://github.com/RaidenGH"
  },
  "arrival": {
    title: "Arrival",
    category: "Web development",
    description: "A travel arrival and departure tracking app that simplifies airport journey management. Provides real-time flight status updates, gate change notifications, itinerary organization, and travel document checklists for stress-free travel.",
    tech: ["React", "TypeScript", "Node.js", "HTML5", "CSS3", "Git"],
    link: "https://github.com/RaidenGH"
  }
};


// ========== PORTFOLIO DETAIL MODAL ==========
const portfolioItems = document.querySelectorAll(".project-item");
const portfolioModalContainer = document.querySelector("[data-portfolio-modal-container]");
const portfolioModalCloseBtn = document.querySelector("[data-portfolio-modal-close]");
const portfolioOverlay = document.querySelector("[data-portfolio-overlay]");
const portfolioModalImg = document.querySelector("[data-portfolio-modal-img]");
const portfolioModalTitle = document.querySelector("[data-portfolio-modal-title]");
const portfolioModalCategory = document.querySelector("[data-portfolio-modal-category]");
const portfolioModalDesc = document.querySelector("[data-portfolio-modal-desc]");
const portfolioModalTechList = document.querySelector("[data-portfolio-modal-tech]");
const portfolioModalLink = document.querySelector("[data-portfolio-modal-link]");

// portfolio modal toggle function
const portfolioModalFunc = function () {
  portfolioModalContainer.classList.toggle("active");
  portfolioOverlay.classList.toggle("active");
}

// add click event to all portfolio project links
for (let i = 0; i < portfolioItems.length; i++) {
  const link = portfolioItems[i].querySelector("a");
  if (!link) continue;

  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Get project key from alt text or title
    const img = this.querySelector(".project-img img");
    const titleEl = this.querySelector(".project-title");
    const categoryEl = this.querySelector(".project-category");

    if (!img || !titleEl) return;

    const projectKey = titleEl.textContent.trim().toLowerCase();
    const data = projectData[projectKey];

    if (!data) return;

    // Populate image
    portfolioModalImg.src = img.src;
    portfolioModalImg.alt = img.alt;

    // Populate title
    portfolioModalTitle.textContent = data.title;

    // Populate category
    portfolioModalCategory.textContent = data.category;

    // Populate description
    portfolioModalDesc.textContent = data.description;

    // Populate tech badges
    portfolioModalTechList.innerHTML = "";
    for (var t = 0; t < data.tech.length; t++) {
      var li = document.createElement("li");
      li.textContent = data.tech[t];
      portfolioModalTechList.appendChild(li);
    }

    // Set project link
    portfolioModalLink.href = data.link;

    portfolioModalFunc();
  });
}

// close portfolio modal on close button click
portfolioModalCloseBtn.addEventListener("click", portfolioModalFunc);
portfolioOverlay.addEventListener("click", portfolioModalFunc);

// close portfolio modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && portfolioModalContainer.classList.contains("active")) {
    portfolioModalFunc();
  }
});


// ========== SCROLL REVEAL ANIMATIONS ==========
const revealSelectors = [
  '.service-item', '.testimonials-item', '.project-item',
  '.blog-post-item', '.timeline-item', '.skills-item',
  '.fitness-gallery-item', '.counter-stats-item', '.badge-item'
];

const revealElements = document.querySelectorAll(revealSelectors.join(', '));

if (revealElements.length) {
  // Group children by parent for stagger class
  const parentMap = new Map();

  revealElements.forEach(function (el) {
    var parent = el.parentElement;
    if (!parentMap.has(parent)) {
      parentMap.set(parent, []);
    }
    parentMap.get(parent).push(el);
  });

  parentMap.forEach(function (children, parent) {
    parent.classList.add('reveal-stagger');
    children.forEach(function (child) { child.classList.add('reveal'); });
  });

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach(function (el) { revealObserver.observe(el); });
}


// ========== ANIMATED COUNTER STATS ==========
var counters = document.querySelectorAll('.counter');
var counterSection = document.querySelector('.counter-stats');

if (counters.length && counterSection) {
  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            if (isNaN(target)) return;

            var increment = Math.ceil(target / 50);
            var current = 0;

            function updateCounter() {
              current += increment;
              if (current < target) {
                counter.textContent = current;
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            }

            updateCounter();
          });
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counterObserver.observe(counterSection);
}


// ========== BACK TO TOP BUTTON ==========
var backToTopBtn = document.querySelector('[data-back-to-top]');

if (backToTopBtn) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// ========== FLOATING SOCIAL BAR ==========
var floatingSocial = document.querySelector('[data-floating-social]');

if (floatingSocial) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      floatingSocial.classList.add('visible');
    } else {
      floatingSocial.classList.remove('visible');
    }
  });
}
