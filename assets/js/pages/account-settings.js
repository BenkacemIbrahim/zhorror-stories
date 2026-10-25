// Z Horror - behaviour for pages/account-settings.html
// Extracted verbatim from the page's original inline <script> block.
        // Forgot Password Functionality
        document.querySelector('.forgot-password').addEventListener('click', function () {
            alert('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
        });

        // Badge Toggle Functionality
        document.getElementById('badge-toggle').addEventListener('change', function () {
            const verificationBadge = document.getElementById('verification-badge');
            if (this.checked) {
                verificationBadge.style.display = 'flex';
            } else {
                verificationBadge.style.display = 'none';
            }
        });

        // Custom Dropdown for Badge Type and Language
        function setupCustomDropdown(dropdownId, selectId, badgeUpdate = null) {
            const dropdown = document.getElementById(dropdownId);
            const select = document.getElementById(selectId);
            const selected = dropdown.querySelector('.custom-dropdown-selected');
            const options = dropdown.querySelectorAll('.custom-dropdown-option');

            // Toggle dropdown
            selected.addEventListener('click', function () {
                dropdown.classList.toggle('active');
                // Close other dropdowns
                document.querySelectorAll('.custom-dropdown').forEach(el => {
                    if (el.id !== dropdownId && el.classList.contains('active')) {
                        el.classList.remove('active');
                    }
                });
            });

            // Select option
            options.forEach(option => {
                option.addEventListener('click', function () {
                    const value = this.dataset.value;

                    // Update selected text and HTML content
                    if (this.querySelector('span').classList.contains('language-option')) {
                        // For language options
                        selected.querySelector('span').innerHTML = this.querySelector('span').innerHTML;
                    } else if (value === 'none') {
                        // For "بدون شارة" option
                        selected.querySelector('span').innerHTML = '<span>بدون شارة</span>';
                    } else {
                        // For badge options
                        selected.querySelector('span').innerHTML = this.querySelector('span').innerHTML;
                    }

                    // Update hidden select
                    select.value = value;

                    // Remove selected class and check icons from all options
                    options.forEach(opt => {
                        opt.classList.remove('selected');
                        const existingCheck = opt.querySelector('.check-icon');
                        if (existingCheck) existingCheck.remove();
                    });

                    // Add selected class and check icon to the clicked option
                    this.classList.add('selected');
                    const checkIcon = document.createElement('i');
                    checkIcon.className = 'fas fa-check text-accent check-icon';
                    this.appendChild(checkIcon);

                    // Close dropdown
                    dropdown.classList.remove('active');

                    // Trigger change event on select
                    const event = new Event('change');
                    select.dispatchEvent(event);

                    // Call badge update function if provided
                    if (badgeUpdate && typeof badgeUpdate === 'function') {
                        badgeUpdate(value);
                    }
                });
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function (e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });

            // Initialize - ensure the selected option has a checkmark
            const initialSelectedOption = dropdown.querySelector('.custom-dropdown-option.selected');
            if (initialSelectedOption) {
                // Remove any existing check icons to avoid duplicates
                const existingCheck = initialSelectedOption.querySelector('.check-icon');
                if (existingCheck) existingCheck.remove();
                // Add a fresh check icon
                const checkIcon = document.createElement('i');
                checkIcon.className = 'fas fa-check text-accent check-icon';
                initialSelectedOption.appendChild(checkIcon);
            }
        }

        // Badge Type Selection (Updated Function)
        function updateBadge(badgeType) {
            const verificationBadge = document.getElementById('verification-badge');
            const badgeToggle = document.getElementById('badge-toggle');

            // Reset badge styles first
            verificationBadge.className = '';
            verificationBadge.style.backgroundColor = '';
            verificationBadge.style.color = '';

            // Update badge based on selection
            if (badgeType === 'verified') {
                verificationBadge.className = 'verification-badge';
                verificationBadge.innerHTML = '<i class="fas fa-check"></i>';
                verificationBadge.style.display = 'flex'; // Always show when selected
                badgeToggle.checked = true; // Sync toggle state
            } else if (badgeType === 'police') {
                verificationBadge.className = 'police-badge';
                verificationBadge.innerHTML = '<i class="fas fa-shield-alt"></i>';
                verificationBadge.style.display = 'flex'; // Always show when selected
                badgeToggle.checked = true; // Sync toggle state
            } else if (badgeType === 'vip') {
                verificationBadge.className = 'verification-badge';
                verificationBadge.style.backgroundColor = '#FFD700';
                verificationBadge.style.color = '#000';
                verificationBadge.innerHTML = '<i class="fas fa-crown"></i>';
                verificationBadge.style.display = 'flex'; // Always show when selected
                badgeToggle.checked = true; // Sync toggle state
            } else if (badgeType === 'none') {
                verificationBadge.style.display = 'none';
                badgeToggle.checked = false; // Disable toggle when no badge is selected
            }
        }

        // Initialize custom dropdowns
        document.addEventListener('DOMContentLoaded', function () {
            setupCustomDropdown('badge-dropdown', 'badge-type', updateBadge);
            setupCustomDropdown('language-dropdown', 'language-select');

            // Add animation to dropdowns on hover
            document.querySelectorAll('.custom-dropdown-selected').forEach(el => {
                el.addEventListener('mouseenter', function () {
                    this.style.borderColor = '#F40009';
                });

                el.addEventListener('mouseleave', function () {
                    if (!this.parentElement.classList.contains('active')) {
                        this.style.borderColor = '#444';
                    }
                });
            });
        });

        // Save Changes Button
        document.querySelector('.btn-primary').addEventListener('click', function () {
            // Collect all toggle states
            const settings = {
                badgeEnabled: document.getElementById('badge-toggle').checked,
                badgeType: document.getElementById('badge-type').value,
                language: document.getElementById('language-select').value,
                emailNotifications: document.getElementById('email-toggle').checked,
                pushNotifications: document.getElementById('push-toggle').checked,
                privateAccount: document.getElementById('private-toggle').checked,
                twoFactorAuth: document.getElementById('2fa-toggle').checked,
                locationServices: document.getElementById('location-toggle').checked,
                darkMode: document.getElementById('dark-mode-toggle').checked
            };

            console.log('Settings saved:', settings);
            alert('تم حفظ الإعدادات بنجاح!');
        });

        // Logout Button
        document.querySelector('.btn-outline').addEventListener('click', function () {
            if (confirm('هل أنت متأكد أنك تريد تسجيل الخروج؟')) {
                alert('تم تسجيل الخروج بنجاح');
                // Redirect to login page in a real application
                // window.location.href = 'login.html';
            }
        });

        // Back Button
        document.querySelector('.back-button').addEventListener('click', function () {
            // In a real application, this would navigate back
            // window.history.back();
            alert('العودة إلى الصفحة السابقة');
        });

        // Dark Mode Toggle
        document.getElementById('dark-mode-toggle').addEventListener('change', function () {
            // This is just a visual indicator since the page is already dark
            if (this.checked) {
                document.body.style.backgroundColor = '#111';
            } else {
                document.body.style.backgroundColor = '#333';
            }
        });

        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn');
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
        const style = document.createElement('style');
        style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(100);
            opacity: 0;
        }
    }
`;
        document.head.appendChild(style);
    