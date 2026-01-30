const text = document.getElementById('scroll-text');
const icons = document.querySelectorAll('.effex');

if (text) {
  new CircleType(text).radius(50);
  window.addEventListener('scroll', () => {
    text.style.transform = 'rotate(' + (window.scrollY * 0.3) + 'deg)';
  });
}

if (icons.length) {
  window.addEventListener('scroll', () => {
    icons.forEach(icon => {
      icon.style.transform = 'rotate(' + (window.scrollY * 0.3) + 'deg)';
    });
  });
}

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

// cursor label
const cursorLabel = document.querySelector('.cursor-label');
const cursorText = cursorLabel ? cursorLabel.querySelector('span') : null;
const header = document.querySelector('header');
let cursorTargetX = 0;
let cursorTargetY = 0;
let cursorCurrentX = 0;
let cursorCurrentY = 0;
const cursorOffset = 100;
let cursorIdleTimer;

const animateCursor = () => {
  if (cursorLabel) {
    const isIdle = cursorLabel.classList.contains('is-idle');
    const scale = isIdle ? 0.1 : 1;
    cursorCurrentX += (cursorTargetX - cursorCurrentX) * 0.15;
    cursorCurrentY += (cursorTargetY - cursorCurrentY) * 0.15;
    cursorLabel.style.transform = `translate3d(${cursorCurrentX - cursorOffset}px, ${cursorCurrentY - cursorOffset}px, 0) scale(${scale})`;
  }
  requestAnimationFrame(animateCursor);
};

if (cursorLabel) {
  animateCursor();

  document.addEventListener('mousemove', (event) => {
    const overHeader = header && header.contains(event.target);
    cursorLabel.classList.toggle('is-hidden', overHeader);
    if (overHeader) {
      return;
    }
    cursorTargetX = event.clientX;
    cursorTargetY = event.clientY;
    cursorLabel.classList.add('is-active');
    cursorLabel.classList.remove('is-idle');
    clearTimeout(cursorIdleTimer);
    cursorIdleTimer = setTimeout(() => {
      cursorLabel.classList.add('is-idle');
    }, 2000);
  });

  document.addEventListener('mouseout', (event) => {
    if (!event.relatedTarget) {
      cursorLabel.classList.remove('is-active');
    }
  });
}

const navLinks = document.querySelectorAll('.navlist a[href*="#"]');
const labelMap = new Map();

navLinks.forEach((link) => {
  const hash = link.getAttribute('href').split('#')[1];
  if (hash) {
    labelMap.set(hash, link.textContent.trim());
  }
});

labelMap.set('skills-section', 'SKILLS');
labelMap.set('projects-section', 'FEATURED');

const updateCursorLabel = (label) => {
  if (cursorText && label) {
    cursorText.textContent = label;
  }
};

const observedSections = Array.from(labelMap.keys())
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if (observedSections.length && cursorLabel) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const label = labelMap.get(entry.target.id);
        if (label) {
          updateCursorLabel(label);
        }
        cursorLabel.classList.toggle('is-inverted', entry.target.id === 'experience-section');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

  observedSections.forEach((section) => sectionObserver.observe(section));
}
