'use strict';



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


// portfolio lightbox
const portfolioItems = document.querySelectorAll(".project-item");
const portfolioModalContainer = document.querySelector("[data-portfolio-modal-container]");
const portfolioModalCloseBtn = document.querySelector("[data-portfolio-modal-close]");
const portfolioOverlay = document.querySelector("[data-portfolio-overlay]");
const portfolioModalImg = document.querySelector("[data-portfolio-modal-img]");
const portfolioModalCaption = document.querySelector("[data-portfolio-modal-caption]");

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

    const img = this.querySelector(".project-img img");
    const title = this.querySelector(".project-title");

    if (img) {
      portfolioModalImg.src = img.src;
      portfolioModalImg.alt = img.alt;
    }

    if (title) {
      portfolioModalCaption.textContent = title.textContent;
    }

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
