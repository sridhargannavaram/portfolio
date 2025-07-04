document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector('.loader');
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.querySelector('.back-to-top');
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const skillProgressBars = document.querySelectorAll('.skill-progress');

  // Mobile Menu
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navList.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
      });
    });
  }

  // Scroll effects
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('active', window.scrollY > 300);
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

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

  // Toggle certs
  const toggleCertsBtn = document.getElementById('toggleCertsBtn');
  if (toggleCertsBtn) {
    toggleCertsBtn.addEventListener('click', () => {
      const hiddenCerts = document.querySelectorAll('.hidden-cert');
      const isHidden = hiddenCerts[0].style.display === 'none' || hiddenCerts[0].style.display === '';

      hiddenCerts.forEach(cert => {
        cert.style.display = isHidden ? 'block' : 'none';
      });

      toggleCertsBtn.textContent = isHidden ? 'Show Less' : 'Show More';
    });

    document.querySelectorAll('.hidden-cert').forEach(card => card.style.display = 'none');
  }

  // Toggle projects
  const toggleProjectsBtn = document.getElementById('toggleProjectsBtn');
  if (toggleProjectsBtn) {
    toggleProjectsBtn.addEventListener('click', () => {
      const hiddenProjects = document.querySelectorAll('.hidden-project');
      const isHidden = hiddenProjects[0].style.display === 'none' || hiddenProjects[0].style.display === '';

      hiddenProjects.forEach((project, i) => {
        project.style.display = isHidden ? 'block' : 'none';
        if (isHidden) {
          project.style.animationDelay = `${i * 0.1}s`;
        }
      });

      toggleProjectsBtn.textContent = isHidden ? 'Show Less' : 'Show More';
    });
  }

  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      console.log({ name, email, subject, message });
      alert('Thank you for your message!');
      contactForm.reset();
    });
  }

  // Newsletter form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      console.log('Newsletter subscription:', email);
      alert('Thank you for subscribing!');
      newsletterForm.reset();
    });
  }

  // Animate skill bars
  function animateSkillBars() {
    skillProgressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  }

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

  // AOS Init
  AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });

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

  // Set year in footer
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
