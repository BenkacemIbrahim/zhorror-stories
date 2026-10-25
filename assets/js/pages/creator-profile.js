// Z Horror - behaviour for pages/creator-profile.html
// Extracted verbatim from the page's original inline <script> block.
        // Bio show more/less functionality
        document.getElementById('show-more').addEventListener('click', function (e) {
            e.preventDefault();
            const bioText = document.getElementById('bio-text');
            if (bioText.style.webkitLineClamp === 'unset') {
                bioText.style.webkitLineClamp = '2';
                bioText.style.overflow = 'hidden';
                this.textContent = 'أظهر المزيد';
            } else {
                bioText.style.webkitLineClamp = 'unset';
                bioText.style.overflow = 'visible';
                this.textContent = 'إخفاء النص';
            }
        });

        // Stats counter animation
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Stats hover effects and interaction
        const statItems = document.querySelectorAll('.stat-item');

        statItems.forEach(item => {
            item.addEventListener('click', function () {
                // Demo functionality - increment the counter on click
                const countElement = this.querySelector('.stat-value');
                const currentValue = parseInt(countElement.textContent);

                // Animate the counter
                animateValue(countElement, currentValue, currentValue + 1, 500);

                // Remove empty-stat class if value becomes > 0
                if (currentValue + 1 > 0) {
                    this.classList.remove('empty-stat');
                }

                // Add a ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('absolute', 'inset-0', 'bg-white', 'opacity-20', 'rounded-lg', 'scale-0');
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple-stat 0.6s linear forwards';

                // Add keyframe animation for ripple effect
                if (!document.querySelector('#ripple-animation')) {
                    const style = document.createElement('style');
                    style.id = 'ripple-animation';
                    style.textContent = `
                        @keyframes ripple-stat {
                            to {
                                transform: scale(1.5);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });

            // Add hover sound effect (subtle)
            item.addEventListener('mouseenter', function () {
                // Create a subtle hover sound
                const hoverSound = new Audio();
                hoverSound.volume = 0.1; // Very quiet
                hoverSound.src = 'data:audio/wav;base64,UklGRpYWAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXIWAAAAAElJREQ='; // Empty sound
                hoverSound.play().catch(e => { }); // Catch errors if browser blocks autoplay
            });
        });

        // Add ripple effect to buttons (EXCEPT the back button)
        const buttons = document.querySelectorAll('button:not(#back-button)');
        buttons.forEach(button => {
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
        if (!document.querySelector('#button-ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'button-ripple-animation';
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

        // Initialize with a subtle entrance animation for stats
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        item.style.transition = 'all 0.5s ease';

                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 150);
                });
            }, 500);
        });

        // Back button functionality - Fixed to prevent layout issues
        document.getElementById('back-button').addEventListener('click', function (e) {
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();

            // Show alert without affecting layout
            setTimeout(function () {
                alert('العودة إلى الصفحة السابقة');
                // You can replace this with actual navigation code
                // window.location.href = 'previous-page.html';
            }, 10);

            // Prevent any ripple or layout changes
            return false;
        });
    