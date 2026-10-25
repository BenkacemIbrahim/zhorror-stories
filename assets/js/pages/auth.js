// Z Horror - behaviour for pages/auth.html
// Extracted verbatim from the page's original inline <script> block.
        document.addEventListener('DOMContentLoaded', function () {
            const container = document.getElementById('container');
            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const mobileSignUpButton = document.getElementById('mobileSignUp');
            const mobileSignInButton = document.getElementById('mobileSignIn');
            const signUpContainer = document.querySelector('.sign-up-container');
            const signInContainer = document.querySelector('.sign-in-container');
            const backToHomeButton = document.querySelector('.back-to-home');
            const signinPassword = document.getElementById('signinPassword');
            const signupPassword = document.getElementById('signupPassword');
            const signinPasswordToggle = document.getElementById('signinPasswordToggle');
            const signupPasswordToggle = document.getElementById('signupPasswordToggle');
            const signinForm = document.getElementById('signinForm');
            const signupForm = document.getElementById('signupForm');
            const lengthRequirement = document.getElementById('lengthReq');
            const specialRequirement = document.getElementById('specialReq');

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            signupPassword.addEventListener('input', function () {
                const password = this.value;

                // Check length requirement
                if (password.length >= 8) {
                    lengthRequirement.classList.remove('text-red-500');
                    lengthRequirement.classList.add('valid', 'text-green-500');
                } else {
                    lengthRequirement.classList.add('text-red-500');
                    lengthRequirement.classList.remove('valid', 'text-green-500');
                }

                // Check special character requirement
                const hasSpecialChar = /[@#$%^&*]/.test(password);
                if (hasSpecialChar) {
                    specialRequirement.classList.remove('text-red-500');
                    specialRequirement.classList.add('valid', 'text-green-500');
                } else {
                    specialRequirement.classList.add('text-red-500');
                    specialRequirement.classList.remove('valid', 'text-green-500');
                }
            });

            function resetFormFields() {
                document.querySelectorAll('.sign-in-container input, .sign-up-container input').forEach(input => {
                    input.value = '';
                    const event = new Event('input', { bubbles: true });
                    input.dispatchEvent(event);
                });
                clearAllErrors();
            }

            function clearAllErrors() {
                document.querySelectorAll('.input-field').forEach(field => {
                    field.classList.remove('error');
                    const errorMsg = field.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.style.display = 'none';
                    }
                });
            }

            function showError(input, message) {
                const inputField = input.closest('.input-field');
                inputField.classList.add('error');
                const errorElement = inputField.querySelector('.error-message');
                if (errorElement) {
                    errorElement.textContent = message;
                    errorElement.style.display = 'block';
                }
                input.focus();
            }

            function validateEmail(email) {
                return emailRegex.test(email);
            }

            function validateForm(form) {
                clearAllErrors();

                const inputs = form.querySelectorAll('input[required]');
                let isValid = true;
                let firstEmptyInput = null;

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        if (!firstEmptyInput) {
                            firstEmptyInput = input;
                        }
                    }
                });

                if (firstEmptyInput) {
                    let errorMessage = firstEmptyInput.getAttribute('placeholder') + ' مطلوب';
                    if (firstEmptyInput.type === 'password') {
                        errorMessage = 'كلمة المرور مطلوبة';
                    }
                    showError(firstEmptyInput, errorMessage);
                    return false;
                }

                const emailInput = form.querySelector('input[type="email"]');
                if (emailInput && !validateEmail(emailInput.value.trim())) {
                    showError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح (مثال: example@domain.com)');
                    return false;
                }

                return isValid;
            }

            const animatedBg = document.querySelector('.animated-bg');
            document.addEventListener('mousemove', (e) => {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                animatedBg.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(244, 0, 9, 0.3) 0%, transparent 80%)`;
            });

            function checkMobileView() {
                if (window.innerWidth <= 768) {
                    document.querySelectorAll('.mobile-toggle').forEach(toggle => {
                        toggle.style.display = 'block';
                    });

                    if (container.classList.contains('right-panel-active')) {
                        signInContainer.style.display = 'none';
                        signUpContainer.style.display = 'block';
                    } else {
                        signInContainer.style.display = 'block';
                        signUpContainer.style.display = 'none';
                    }

                    if (backToHomeButton) {
                        backToHomeButton.style.position = 'fixed';
                    }
                } else {
                    document.querySelectorAll('.mobile-toggle').forEach(toggle => {
                        toggle.style.display = 'none';
                    });

                    signInContainer.style.display = 'block';
                    signUpContainer.style.display = 'block';

                    if (backToHomeButton) {
                        backToHomeButton.style.position = 'absolute';
                    }
                }
            }

            checkMobileView();

            signUpButton.addEventListener('click', () => {
                container.classList.add('right-panel-active');
                checkMobileView();
                resetFormFields();
            });

            signInButton.addEventListener('click', () => {
                container.classList.remove('right-panel-active');
                checkMobileView();
                resetFormFields();
            });

            if (mobileSignUpButton) {
                mobileSignUpButton.addEventListener('click', () => {
                    container.classList.add('right-panel-active');
                    signInContainer.style.display = 'none';
                    signUpContainer.style.display = 'block';
                    resetFormFields();
                });
            }

            if (mobileSignInButton) {
                mobileSignInButton.addEventListener('click', () => {
                    container.classList.remove('right-panel-active');
                    signUpContainer.style.display = 'none';
                    signInContainer.style.display = 'block';
                    resetFormFields();
                });
            }

            window.addEventListener('resize', checkMobileView);

            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', function (e) {
                    if (this.type !== 'submit') {
                        e.preventDefault();
                    }
                    const x = e.clientX - e.target.getBoundingClientRect().left;
                    const y = e.clientY - e.target.getBoundingClientRect().top;
                    const ripple = document.createElement('span');
                    ripple.className = 'ripple';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                });
            });

            const inputFields = document.querySelectorAll('input');
            inputFields.forEach(input => {
                input.addEventListener('focus', function () {
                    this.parentElement.classList.add('focused');
                    const icon = this.parentElement.querySelector('i:not(.password-toggle)');
                    if (icon) icon.classList.add('text-accent');
                });

                input.addEventListener('blur', function () {
                    this.parentElement.classList.remove('focused');
                    const icon = this.parentElement.querySelector('i:not(.password-toggle)');
                    if (icon && !this.value) icon.classList.remove('text-accent');

                    if (this.type === 'email' && this.value.trim() !== '') {
                        if (!validateEmail(this.value.trim())) {
                            showError(this, 'يرجى إدخال بريد إلكتروني صحيح (مثال: example@domain.com)');
                        } else {
                            this.closest('.input-field').classList.remove('error');
                            const errorMsg = this.closest('.input-field').querySelector('.error-message');
                            if (errorMsg) {
                                errorMsg.style.display = 'none';
                            }
                        }
                    }
                });

                if (input.type === 'email') {
                    input.addEventListener('input', function () {
                        if (this.value.trim() !== '') {
                            if (!validateEmail(this.value.trim())) {
                                showError(this, 'يرجى إدخال بريد إلكتروني صحيح (مثال: example@domain.com)');
                            } else {
                                this.closest('.input-field').classList.remove('error');
                                const errorMsg = this.closest('.input-field').querySelector('.error-message');
                                if (errorMsg) {
                                    errorMsg.style.display = 'none';
                                }
                            }
                        }
                    });
                }

                if (input.type === 'password') {
                    input.addEventListener('input', function () {
                        const toggle = this.parentElement.querySelector('.password-toggle');
                        if (this.value.length > 0) {
                            toggle.classList.remove('hidden');
                        } else {
                            toggle.classList.add('hidden');
                        }
                    });
                }
            });

            function setupPasswordToggle(passwordInput, toggleIcon) {
                toggleIcon.addEventListener('click', function () {
                    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    passwordInput.setAttribute('type', type);
                    this.classList.toggle('fa-eye');
                    this.classList.toggle('fa-eye-slash');
                });
            }

            setupPasswordToggle(signinPassword, signinPasswordToggle);
            setupPasswordToggle(signupPassword, signupPasswordToggle);

            signinForm.addEventListener('submit', function (e) {
                e.preventDefault();
                if (validateForm(this)) {
                    console.log('Login form submitted successfully');
                }
            });

            signupForm.addEventListener('submit', function (e) {
                e.preventDefault();
                if (validateForm(this)) {
                    console.log('Signup form submitted successfully');
                }
            });
        });
    