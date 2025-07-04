// DOM Elements
const loader = document.querySelector('.loader');
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('mobile-menu'); 
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navList.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navList.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 300) {
    backToTopBtn.classList.add('active');
  } else {
    backToTopBtn.classList.remove('active');
  }
});

// Back to top
backToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Certifications - Show more
document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const hiddenCards = document.querySelectorAll(".cert-card.hidden");
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function () {
      hiddenCards.forEach(card => {
        card.classList.remove("hidden");
      });
      showMoreBtn.style.display = "none";
    });
  }
});

// Project "Read More"
function toggleRead(el) {
  const details = el.nextElementSibling;
  details.classList.toggle("open");
  el.textContent = details.classList.contains("open") ? "Read Less" : "Read More";
}

// Toggle hidden projects
function toggleProjects() {
  const hiddenProjects = document.querySelectorAll(".hidden-project");
  const btn = document.getElementById("toggleProjectsBtn");
  const isHidden = hiddenProjects[0].style.display === "none" || hiddenProjects[0].style.display === "";
  hiddenProjects.forEach((project, i) => {
    if (isHidden) {
      project.style.display = "block";
      project.style.animationDelay = `${i * 0.1}s`;
    } else {
      project.style.display = "none";
    }
  });
  btn.textContent = isHidden ? "Show Less" : "Show More";
}

// Toggle certifications
function toggleCerts() {
  const hiddenCerts = document.querySelectorAll('.hidden-cert');
  const btn = document.getElementById('toggleCertsBtn');
  const isHidden = hiddenCerts[0].style.display === 'none' || hiddenCerts[0].style.display === '';
  hiddenCerts.forEach(card => {
    card.style.display = isHidden ? 'block' : 'none';
  });
  btn.textContent = isHidden ? 'Show Less' : 'Show More';
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hidden-cert').forEach(card => card.style.display = 'none');
});

// Animate skill bars
function animateSkillBars() {
  skillProgressBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

// AOS Init
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.fade-in').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});

// Contact form
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    console.log({ name, email, subject, message });
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// Newsletter form
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to my newsletter!');
    newsletterForm.reset();
  });
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animate skill bars on scroll
document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(skillsSection);
  }
});
