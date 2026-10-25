// Z Horror - behaviour for pages/reset-password.html
// Extracted verbatim from the page's original inline <script> block.
        document.addEventListener('DOMContentLoaded', function () {
            // Elements
            const animatedBg = document.querySelector('.animated-bg');
            const resetForm = document.getElementById('resetForm');
            const successMessage = document.getElementById('successMessage');
            const submitButton = document.getElementById('submitButton');
            const backToLoginBtn = document.getElementById('backToLoginBtn');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const passwordToggle = document.getElementById('passwordToggle');
            const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
            const passwordStrengthBar = document.getElementById('passwordStrengthBar');
            const passwordStrengthText = document.getElementById('passwordStrengthText');
            const passwordError = document.getElementById('passwordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
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

            function setupPasswordToggle(passwordInput, toggleIcon) {
                toggleIcon.addEventListener('click', function () {
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                });
            }

            setupPasswordToggle(passwordInput, passwordToggle);
            setupPasswordToggle(confirmPasswordInput, confirmPasswordToggle);

            passwordInput.addEventListener('input', function () {
                const password = this.value;

                if (password === '') {
                    passwordStrengthBar.style.width = '0%';
                    passwordStrengthText.textContent = 'قوة كلمة المرور';
                    passwordError.style.display = 'none';
                    submitButton.disabled = true;
                    return;
                }

                let strength = 0;
                let strengthText = 'ضعيفة';
                let color = '#F40009';

                if (password.length >= 8) {
                    strength += 25;
                } else {
                    passwordError.style.display = 'block';
                    submitButton.disabled = true;
                    passwordStrengthBar.style.width = `${strength}%`;
                    passwordStrengthBar.style.backgroundColor = color;
                    passwordStrengthText.textContent = `قوة كلمة المرور: ${strengthText}`;
                    return;
                }

                passwordError.style.display = 'none';

                if (password.match(/[a-z]/)) {
                    strength += 25;
                }

                if (password.match(/[A-Z]/)) {
                    strength += 25;
                }
                
                if (password.match(/[0-9]/) || password.match(/[^a-zA-Z0-9]/)) {
                    strength += 25;
                }

                // Update strength bar
                passwordStrengthBar.style.width = `${strength}%`;

                // Update strength text and color
                if (strength <= 25) {
                    strengthText = 'ضعيفة جداً';
                    color = '#F40009';
                } else if (strength <= 50) {
                    strengthText = 'ضعيفة';
                    color = '#ff6b00';
                } else if (strength <= 75) {
                    strengthText = 'متوسطة';
                    color = '#ffd600';
                } else {
                    strengthText = 'قوية';
                    color = '#00b300';
                }

                passwordStrengthBar.style.backgroundColor = color;
                passwordStrengthText.textContent = `قوة كلمة المرور: ${strengthText}`;

                // Check if passwords match
                validatePasswords();
            });

            // Confirm password validation
            confirmPasswordInput.addEventListener('input', validatePasswords);

            function validatePasswords() {
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;

                if (confirmPassword === '') {
                    confirmPasswordError.style.display = 'none';
                    submitButton.disabled = true;
                    return;
                }

                if (password !== confirmPassword) {
                    confirmPasswordError.style.display = 'block';
                    submitButton.disabled = true;
                } else {
                    confirmPasswordError.style.display = 'none';

                    // Only enable button if password is at least 8 characters
                    if (password.length >= 8) {
                        submitButton.disabled = false;
                    }
                }
            }

            // Form submission
            submitButton.addEventListener('click', function (e) {
                e.preventDefault();

                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري التغيير...';

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
        });
    