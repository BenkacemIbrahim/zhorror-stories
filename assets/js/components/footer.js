// Z Horror - behaviour for components/footer.html
// Extracted verbatim from the page's original inline <script> block.
        // Back to Top Button Functionality
        const backToTopButton = document.getElementById('backToTop');

        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Premium Button Animation
        const premiumBtn = document.querySelector('.premium-btn');

        premiumBtn.addEventListener('mouseenter', function () {
            this.querySelector('i').classList.add('animate-bounce');
        });

        premiumBtn.addEventListener('mouseleave', function () {
            this.querySelector('i').classList.remove('animate-bounce');
        });

        premiumBtn.addEventListener('click', function () {
            // Premium subscription logic would go here
            alert('سيتم تحويلك إلى صفحة الاشتراك المميز');
        });

        // Add animation for premium features
        document.querySelectorAll('.premium-feature').forEach(feature => {
            feature.addEventListener('mouseenter', function () {
                this.querySelector('i').classList.add('animate-pulse');
            });

            feature.addEventListener('mouseleave', function () {
                this.querySelector('i').classList.remove('animate-pulse');
            });
        });
    