// Z Horror - behaviour for pages/edit-profile.html
// Extracted verbatim from the page's original inline <script> block.
        // Variables to store selected images
        let selectedProfilePic = document.getElementById('profile-pic').src;
        let selectedBanner = document.getElementById('banner-img').src;
        let tempSelectedProfilePic = null;
        let tempSelectedBanner = null;

        // Function to disable scrolling
        function disableScroll() {
            document.body.classList.add('modal-open');
        }

        // Function to enable scrolling
        function enableScroll() {
            document.body.classList.remove('modal-open');
        }

        // Profile Picture Modal Functions
        document.getElementById('open-profile-modal').addEventListener('click', function () {
            const modal = document.getElementById('profile-modal');
            modal.style.display = 'block';
            disableScroll();

            setTimeout(() => {
                modal.classList.add('active');
            }, 10);

            tempSelectedProfilePic = selectedProfilePic;

            document.querySelectorAll('.avatar-item').forEach(avatar => {
                if (avatar.getAttribute('data-src') === selectedProfilePic) {
                    avatar.classList.add('selected');
                } else {
                    avatar.classList.remove('selected');
                }
            });
        });

        document.getElementById('close-profile-modal').addEventListener('click', closeProfileModal);
        document.getElementById('cancel-profile-pic').addEventListener('click', closeProfileModal);

        function closeProfileModal() {
            const modal = document.getElementById('profile-modal');
            modal.classList.remove('active');
            enableScroll();

            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }

        document.getElementById('save-profile-pic').addEventListener('click', function () {
            selectedProfilePic = tempSelectedProfilePic;
            document.getElementById('profile-pic').src = selectedProfilePic;
            closeProfileModal();
        });

        // Banner Modal Functions
        document.getElementById('open-banner-modal').addEventListener('click', function () {
            const modal = document.getElementById('banner-modal');
            modal.style.display = 'block';
            disableScroll();

            setTimeout(() => {
                modal.classList.add('active');
            }, 10);

            tempSelectedBanner = selectedBanner;

            document.querySelectorAll('.banner-item').forEach(banner => {
                if (banner.getAttribute('data-src') === selectedBanner) {
                    banner.classList.add('selected');
                } else {
                    banner.classList.remove('selected');
                }
            });
        });

        document.getElementById('close-banner-modal').addEventListener('click', closeBannerModal);
        document.getElementById('cancel-banner').addEventListener('click', closeBannerModal);

        function closeBannerModal() {
            const modal = document.getElementById('banner-modal');
            modal.classList.remove('active');
            enableScroll();

            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }

        document.getElementById('save-banner').addEventListener('click', function () {
            selectedBanner = tempSelectedBanner;
            document.getElementById('banner-img').src = selectedBanner;
            closeBannerModal();
        });

        // Avatar Selection
        document.querySelectorAll('.avatar-item').forEach(avatar => {
            avatar.addEventListener('click', function () {
                document.querySelectorAll('.avatar-item').forEach(a => a.classList.remove('selected'));
                this.classList.add('selected');
                tempSelectedProfilePic = this.getAttribute('data-src');
            });
        });

        // Banner Selection
        document.querySelectorAll('.banner-item').forEach(banner => {
            banner.addEventListener('click', function () {
                document.querySelectorAll('.banner-item').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                tempSelectedBanner = this.getAttribute('data-src');
            });
        });

        // Form Functions
        document.querySelector('.btn-primary').addEventListener('click', function () {
            const username = document.getElementById('username').value;
            const bio = document.getElementById('bio').value;

            if (!username) {
                alert('الرجاء إدخال اسم المستخدم');
                return;
            }

            alert('تم حفظ الملف الشخصي بنجاح!');
        });

        document.querySelector('.btn-outline').addEventListener('click', function () {
            if (confirm('هل أنت متأكد أنك تريد الإلغاء؟ سيتم فقدان أي تغييرات غير محفوظة.')) {
                document.getElementById('username').value = '';
                document.getElementById('bio').value = '';
            }
        });

        // Back Button
        document.querySelector('.back-button').addEventListener('click', function () {
            window.history.back();
        });

        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function (e) {
                if (e.target === this) {
                    if (this.id === 'profile-modal') {
                        closeProfileModal();
                    } else if (this.id === 'banner-modal') {
                        closeBannerModal();
                    }
                }
            });
        });

        // Handle escape key to close modals
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const profileModal = document.getElementById('profile-modal');
                const bannerModal = document.getElementById('banner-modal');

                if (profileModal.classList.contains('active')) {
                    closeProfileModal();
                } else if (bannerModal.classList.contains('active')) {
                    closeBannerModal();
                }
            }
        });
    