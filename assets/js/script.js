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

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}