// Z Horror - behaviour for pages/forgot-password.html
// Extracted verbatim from the page's original inline <script> block.
        document.addEventListener('DOMContentLoaded', function () {
            const animatedBg = document.querySelector('.animated-bg');
            const resetForm = document.getElementById('resetForm');
            const successMessage = document.getElementById('successMessage');
            const submitButton = document.getElementById('submitButton');
            const backToLoginBtn = document.getElementById('backToLoginBtn');
            const emailInput = document.getElementById('email');
            const formContainer = document.querySelector('.form-container');

            // Create dynamic blood drips for the form
            function createBloodDrips() {
                const formContainer = document.querySelector('.form-container');

                const existingDrips = formContainer.querySelectorAll('.blood-drip');
                existingDrips.forEach(drip => drip.remove());

                const positions = [10, 30, 50, 70, 90];
                const delays = [0.3, 1.2, 0.7, 1.8, 0.5];

                positions.forEach((pos, index) => {
                    const bloodDrip = document.createElement('div');
                    bloodDrip.className = 'blood-drip';
                    bloodDrip.style.left = `${pos}%`;
                    bloodDrip.style.animationDelay = `${delays[index]}s`;
                    formContainer.appendChild(bloodDrip);
                });
            }
            createBloodDrips();

            window.addEventListener('resize', createBloodDrips);

            document.addEventListener('mousemove', (e) => {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                animatedBg.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(244, 0, 9, 0.3) 0%, transparent 80%)`;
            });

            // Form submission
            submitButton.addEventListener('click', function (e) {
                e.preventDefault();

                if (!emailInput.value || !emailInput.value.includes('@')) {
                    emailInput.style.borderColor = '#F40009';
                    emailInput.classList.add('pulse-animation');

                    setTimeout(() => {
                        emailInput.classList.remove('pulse-animation');
                    }, 1000);

                    return;
                }

                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';

                setTimeout(() => {
                    // Show success message
                    resetForm.style.display = 'none';
                    successMessage.style.display = 'flex';
                }, 1500);
            });

            // Back to login button
            backToLoginBtn.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = '#';
            });

            // Input field focus effects
            emailInput.addEventListener('focus', function () {
                this.parentElement.querySelector('i').style.color = '#F40009';
            });

            emailInput.addEventListener('blur', function () {
                if (!this.value) {
                    this.parentElement.querySelector('i').style.color = '#999';
                }
            });

            // Button ripple effect
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', function (e) {
                    const ripple = document.createElement('span');
                    ripple.className = 'ripple';

                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    this.appendChild(ripple);

                    setTimeout(() => ripple.remove(), 600);
                });
            });

            // Add pulse animation class
            function addPulseAnimation(element) {
                element.style.animation = 'pulse-red 2s infinite';
            }
        });
    