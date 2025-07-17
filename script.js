
document.addEventListener("DOMContentLoaded", function () {
  // Typing effect
  const words = ["Cloud Engineer", "Devops Engineer", "Cloud Support Engineer", "SQL Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let currentWord = '';
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newWordDelay = 2000;

  function type() {
    if (charIndex < words[wordIndex].length) {
      currentWord += words[wordIndex].charAt(charIndex);
      document.querySelector('.typing-animation').textContent = currentWord;
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newWordDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      currentWord = currentWord.slice(0, -1);
      document.querySelector('.typing-animation').textContent = currentWord;
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed + 1100);
    }
  }

  type();

  // Animate progress bars
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-done');
    progressBars.forEach(bar => {
      bar.style.transition = 'none';
      bar.style.width = '0';
      bar.style.opacity = 0;

      setTimeout(() => {
        bar.style.transition = 'width 2s ease-in-out, opacity 1s';
        bar.style.width = bar.getAttribute('data-done') + '%';
        bar.style.opacity = 1;
      }, 100);
    });
  }

  // Animate circular progress
  function animateCircularSkill(circle, targetPercent, duration = 2000) {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const currentPercent = Math.floor(progress * targetPercent);
      circle.style.setProperty('--percent', currentPercent);
      circle.querySelector('.inner-circle').textContent = `${currentPercent}%`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  function animateCircles() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {
      const percent = parseInt(circle.getAttribute('data-percent'));
      animateCircularSkill(circle, percent);
    });
  }

  // Scroll observer for skills section
  const skillsSection = document.getElementById('skills');
  let hasAnimated = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        animateProgressBars();
        animateCircles();
        hasAnimated = true;
      } else if (!entry.isIntersecting) {
        hasAnimated = false;
      }
    });
  }, {
    threshold: 0.4
  });

  observer.observe(skillsSection);

  // Back to Top Button
  const backToTopButton = document.getElementById("backToTop");
  window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  };
  backToTopButton.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Navigation link's in Mobile View
  const menuIcon = document.getElementById("menu-icon");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const closeIcon = document.getElementById("close-icon");
  const welcomeText = document.getElementById("welcome-text");


// Close dropdown when clicking close icon
  closeIcon.addEventListener("click", closeDropdown);

// Close dropdown when clicking anywhere outside the menu
  document.addEventListener("click", function (e) {
  const isClickInside = dropdownMenu.contains(e.target) || menuIcon.contains(e.target);
  if (!isClickInside) {
    closeDropdown();
  }
  });

// Close dropdown on scroll
window.addEventListener("scroll", closeDropdown);

// Show dropdown
menuIcon.addEventListener("click", () => {
  dropdownMenu.classList.add("show");
  menuIcon.style.display = "none";
  closeIcon.style.display = "block";
  // ✅ Change welcome text when menu opens
  if (welcomeText) {
    welcomeText.textContent = "Start Small, Stay Consistent, Think Big";
  }
});

// Close dropdown when clicking close icon
closeIcon.addEventListener("click", closeDropdown);

// Close dropdown function
function closeDropdown() {
  dropdownMenu.classList.remove("show");

  setTimeout(() => {
    if (window.innerWidth <= 768) {
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
      // ✅ Restore welcome text when menu closes
      if (welcomeText) {
        welcomeText.textContent = "Welcome To My Profile";
      }
    }
  }, 400); // Matches max-height transition time
}


  // Close dropdown when clicking a nav link
  document.querySelectorAll("#dropdown-menu a").forEach(link => {
    link.addEventListener("click", () => {
      closeDropdown();
    });
  });

});
