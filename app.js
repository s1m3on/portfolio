const text = document.getElementById('scroll-text');
const rotate = new CircleType(text).radius(50)
const icons = document.querySelectorAll('.effex');

window.addEventListener('scroll', () => {
    text.style.transform = 'rotate(' + (window.scrollY * 0.3) + 'deg)'
})
window.addEventListener('scroll', () => {
  icons.forEach(icon => {
    icon.style.transform = 'rotate(' + (window.scrollY * 0.3) + 'deg)';
  });
})

// Get all elements with the class 'js-scroll'
const scrollElements = document.querySelectorAll('.js-scroll');

// Configure the options for the Intersection Observer
const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin
  threshold: 0.1 // Trigger when 50% of the element is visible
};

// Callback function to be executed when the observed elements intersect
const intersectionCallback = (entries, observer) => {
  entries.forEach(entry => {
    // If the element is intersecting
    if (entry.isIntersecting) {
      // Add the 'scrolled' class to trigger the animation
      entry.target.classList.add('scrolled');
    } 
  });
};

// Create an Intersection Observer instance
const observer = new IntersectionObserver(intersectionCallback, observerOptions);

// Observe each scroll element
scrollElements.forEach(element => {
  observer.observe(element);
});

// side menu 

const nav = document.querySelector(".navlist");
const navToggle = document.querySelector(".navicon");
const navIcon = navToggle.querySelector("img");

// when someone clicks on the hamburger buttons
navToggle.addEventListener("click", () => {
    const visibility = nav.getAttribute("data-visible");
    
    // if the nav is closed, open it
    if (visibility === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
        navIcon.src = "/icons/close.svg"; // Change src to close icon
    }
    // if the nav is open, close it
    else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
        navIcon.src = "/icons/menu.svg"; // Change src to hamburger icon
    }

    console.log(visibility);
});


// side menu close when an option is clicked 
nav.addEventListener("click", e => {
    console.log(e.target.parentElement.className);
    const visibility = nav.getAttribute("data-visible");


    if (e.target.parentElement.className == "listItem") {
        nav.setAttribute("data-visible", false)
        navToggle.setAttribute("aria-expanded", false)
        navIcon.src = "/icons/menu.svg";
    }
})