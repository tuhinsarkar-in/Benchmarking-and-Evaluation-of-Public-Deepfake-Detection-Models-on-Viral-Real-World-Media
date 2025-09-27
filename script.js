function copyBibTeX() {
    var bibTexElement = document.querySelector(".bibtex-section pre code");
    var bibTexText = bibTexElement.innerText;
    navigator.clipboard.writeText(bibTexText);
    alert("BibTeX citation copied to clipboard!");
  }
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const nav = document.querySelector(".nav");
    if (nav) {
      nav.classList.toggle("dark-mode");
    }
    
    // Save theme preference (this overrides system auto-detection)
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
  }

  // Function to reset to system theme (optional - can be called from console)
  function resetToSystemTheme() {
    localStorage.removeItem("darkMode");
    initializeTheme();
  }

  // Mobile menu functionality
  function toggleMobileMenu() {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileNavLinks = document.querySelector(".mobile-nav-links");
    
    if (mobileMenuBtn && mobileNavLinks) {
      mobileMenuBtn.classList.toggle("active");
      mobileNavLinks.classList.toggle("active");
    }
  }

  // Initialize theme based on system preference or saved preference
  function initializeTheme() {
    const savedTheme = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let shouldUseDarkMode = false;
    
    if (savedTheme !== null) {
      // User has manually set a preference
      shouldUseDarkMode = savedTheme === "true";
    } else {
      // Use system preference
      shouldUseDarkMode = systemPrefersDark;
    }
    
    if (shouldUseDarkMode) {
      document.body.classList.add("dark-mode");
      const nav = document.querySelector(".nav");
      if (nav) {
        nav.classList.add("dark-mode");
      }
    }
  }

  // Listen for system theme changes
  function setupSystemThemeListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', function(e) {
        // Only auto-switch if user hasn't manually set a preference
        const savedTheme = localStorage.getItem("darkMode");
        if (savedTheme === null) {
          const nav = document.querySelector(".nav");
          
          if (e.matches) {
            // System switched to dark mode
            document.body.classList.add("dark-mode");
            if (nav) nav.classList.add("dark-mode");
          } else {
            // System switched to light mode
            document.body.classList.remove("dark-mode");
            if (nav) nav.classList.remove("dark-mode");
          }
        }
      });
    }
  }

  // Active navigation link highlighting
  function highlightActiveSection() {
    const sections = document.querySelectorAll("[id]");
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    const scrollY = window.scrollY;
    // Batch DOM reads
    const sectionInfo = Array.from(sections).map(section => ({
      id: section.getAttribute("id"),
      top: section.offsetTop,
      height: section.clientHeight
    }));
    let current = "";
    for (let i = 0; i < sectionInfo.length; i++) {
      if (scrollY >= sectionInfo[i].top - 100) {
        current = sectionInfo[i].id;
      }
    }
    // Batch DOM writes
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    if (current) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    }
  }

  // Initialize everything when DOM is loaded
  document.addEventListener("DOMContentLoaded", function() {
    initializeTheme();
    setupSystemThemeListener();
    
    // Setup mobile menu button
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", toggleMobileMenu);
    }

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", () => {
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
        const mobileNavLinks = document.querySelector(".mobile-nav-links");
        if (mobileMenuBtn && mobileNavLinks) {
          mobileMenuBtn.classList.remove("active");
          mobileNavLinks.classList.remove("active");
        }
      });
    });

    // Highlight active section on scroll
    window.addEventListener("scroll", highlightActiveSection);
    highlightActiveSection(); // Initial call

    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .nav a[href^="#"]');
    allNavLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 20; // Small offset for better visual positioning
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  });

  // ===============================================
  // PREMIUM ANIMATIONS & EFFECTS
  // ===============================================

  // Scroll-triggered animations
  function initScrollAnimations() {
    // Only animate the main title (h1 with .animate-fade-in)
    const mainTitle = document.querySelector('h1.animate-fade-in');
    if (mainTitle) {
      mainTitle.classList.add('animate');
    }
  }

  // Magnetic hover effects
  function initMagneticHover() {
    const magneticElements = document.querySelectorAll('.hover-magnetic');
    
    magneticElements.forEach(element => {
      let rect = element.getBoundingClientRect();
      
      element.addEventListener('mouseenter', () => {
        rect = element.getBoundingClientRect();
      });
      
      element.addEventListener('mousemove', (e) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const intensity = 0.3;
        const moveX = deltaX * intensity * 10;
        const moveY = deltaY * intensity * 10;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0px, 0px) scale(1)';
      });
    });
  }

  // Parallax scrolling effect
  function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    function updateParallax() {
      const scrollTop = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }
    
    window.addEventListener('scroll', updateParallax);
  }

  // Smooth page transitions (removed page fade-in for better performance)
  function initPageTransitions() {
    // Page transitions for navigation can be added here if needed
    // Removed the slow page fade-in effect
  }

  // Enhanced button animations
  function initButtonAnimations() {
    const buttons = document.querySelectorAll('.buttons a, button, .nav-link');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        if (!button.classList.contains('animating')) {
          button.classList.add('animating');
          
          // Create ripple effect
          const ripple = document.createElement('span');
          ripple.className = 'ripple-effect';
          ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
          `;
          
          button.style.position = 'relative';
          button.style.overflow = 'hidden';
          button.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
            button.classList.remove('animating');
          }, 600);
        }
      });
    });
  }

  // Text reveal animations
  function initTextRevealAnimations() {
    // Disable text reveal animations for all except main title
  }

  // Initialize all premium animations
  function initPremiumAnimations() {
    initScrollAnimations();
    initMagneticHover();
    initParallaxEffect();
    initPageTransitions();
    initButtonAnimations();
    initTextRevealAnimations();
  }

  // Initialize animations when DOM is loaded
  document.addEventListener('DOMContentLoaded', initPremiumAnimations);
  window.onscroll = function () {
    const scrollUpBtn = document.getElementById("scrollUpBtn");
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      scrollUpBtn.style.display = "block";
    } else {
      scrollUpBtn.style.display = "none";
    }
  };
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

// FAQ Toggle Functionality
function toggleFAQ(button) {
  const faqItem = button.closest('.faq-item');
  const faqAnswer = faqItem.querySelector('.faq-answer');
  const faqToggle = faqItem.querySelector('.faq-toggle');
  
  // Close other FAQ items
  const allFaqItems = document.querySelectorAll('.faq-item');
  allFaqItems.forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('active');
      const otherToggle = item.querySelector('.faq-toggle');
      if (otherToggle) {
        otherToggle.textContent = '+';
      }
    }
  });
  
  // Toggle current FAQ item
  faqItem.classList.toggle('active');
  
  // Update toggle text with proper minus symbol
  if (faqItem.classList.contains('active')) {
    faqToggle.textContent = '−'; // Using proper minus sign (U+2212)
  } else {
    faqToggle.textContent = '+';
  }
}