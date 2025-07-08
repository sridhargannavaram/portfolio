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

    // Back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Back to top button
backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// Smooth scrolling for anchor links
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

//Certifications
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
//project-ex
function toggleRead(el) {
    const details = el.nextElementSibling;
    details.classList.toggle("open");
    el.textContent = details.classList.contains("open") ? "Read Less" : "Read More";
  }

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

 //CERTIFICATION
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



// Animate skill progress bars when section is in view
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate elements on scroll
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

// Settings Tabs
settingsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons
        settingsTabBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Hide all settings tabs
        settingsTabs.forEach(tab => tab.classList.remove('active'));
        // Show selected settings tab
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// Project Modal
if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => {
        projectModal.classList.add('active');
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        projectModal.classList.remove('active');
    });
}

if (modalCancel) {
    modalCancel.addEventListener('click', () => {
        projectModal.classList.remove('active');
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
    }
});

// Check auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('User is signed in:', user);
        if (loginSection && dashboardSection) {
            loginSection.style.display = 'none';
            dashboardSection.style.display = 'block';
        }
    } else {
        // User is signed out
        console.log('User is signed out');
        if (loginSection && dashboardSection) {
            loginSection.style.display = 'flex';
            dashboardSection.style.display = 'none';
        }
    }
});

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate skill bars when skills section is in view
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
    
    // Set active tab based on hash
    if (window.location.hash) {
        const tabId = window.location.hash.substring(1);
        const tabElement = document.getElementById(`${tabId}-tab`);
        if (tabElement) {
            // Remove active class from all tabs
            tabContents.forEach(content => content.classList.remove('active'));
            // Add active class to target tab
            tabElement.classList.add('active');
            
            // Update sidebar nav
            sidebarNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-tab') === tabId) {
                    item.classList.add('active');
                }
            });
        }
    }
});
//Conctact connection
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("success");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent default form submission

    const scriptURL = "https://script.google.com/macros/s/AKfycbzgk-wv3hYZDSHEPF8HcG5nyRcWTr0xNmaISzCPTlJkhdhR4TzTIRjrzBqM1aQ9tjGZlg/exec";
    const formData = new FormData(form);

    fetch(scriptURL, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        success.style.display = "block";
        success.style.opacity = "1";
        form.reset();

        setTimeout(() => {
          success.style.opacity = "0";
          success.style.display = "none";
        }, 5000);
      })
      .catch((error) => {
        alert("Something went wrong. Try again.");
        console.error("Error!", error.message);
      });
  });
});




