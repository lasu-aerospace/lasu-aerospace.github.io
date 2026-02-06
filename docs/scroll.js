// Scroll Animation System with Fade In/Out
// This creates smooth fade effects as elements enter and leave the viewport

class ScrollAnimator {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    // Create intersection observer for fade-in when entering viewport
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element is entering viewport - fade in
            entry.target.classList.add('fade-in-active');
            entry.target.classList.remove('fade-out-active');
          } else {
            // Element is leaving viewport - fade out
            entry.target.classList.remove('fade-in-active');
            entry.target.classList.add('fade-out-active');
          }
        });
      },
      {
        threshold: [0, 0.1, 0.5],
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    // Find all elements that should animate
    const animatedElements = document.querySelectorAll(
      '.article, .launch-card, .contact-form-wrapper, .contact-info, .info-section, .container'
    );

    // Observe each element
    animatedElements.forEach(element => {
      // Add initial state
      element.classList.add('scroll-animate');
      fadeInObserver.observe(element);
    });

    this.observers.set('fadeIn', fadeInObserver);
  }

  // Method to refresh observers (useful for dynamically added content)
  refresh() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.init();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const scrollAnimator = new ScrollAnimator();
  
  // Make it globally accessible for debugging/refreshing
  window.scrollAnimator = scrollAnimator;
});

// Optional: Refresh on page resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.scrollAnimator) {
      window.scrollAnimator.refresh();
    }
  }, 250);
});