// Z Horror - behaviour for index.html
// Extracted verbatim from the page's original inline <script> block.
    // Add hover sound effect (subtle)
    document.querySelectorAll('.story-card, .card').forEach(card => {
      card.addEventListener('mouseenter', function () {
        // Create a subtle hover sound (empty for now, can be implemented if needed)
      });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('button, .btn').forEach(button => {
      button.addEventListener('click', function (e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '1px';
        ripple.style.height = '1px';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.animation = 'ripple 0.6s linear';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add keyframe animation for ripple effect
    if (!document.querySelector('#ripple-animation')) {
      const style = document.createElement('style');
      style.id = 'ripple-animation';
      style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(100);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }

    // Animated background effect
    const animatedBg = document.querySelector('.animated-bg');
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      animatedBg.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(244, 0, 9, 0.3) 0%, transparent 80%)`;
    });

    // NEW: Scroll functionality for all sliders
    document.querySelectorAll('.scroll-right').forEach(button => {
      button.addEventListener('click', function () {
        const sliderId = this.getAttribute('data-slider');
        const slider = document.getElementById(sliderId);
        slider.scrollBy({ left: 300, behavior: 'smooth' });
      });
    });

    document.querySelectorAll('.scroll-left').forEach(button => {
      button.addEventListener('click', function () {
        const sliderId = this.getAttribute('data-slider');
        const slider = document.getElementById(sliderId);
        slider.scrollBy({ left: -300, behavior: 'smooth' });
      });
    });
  