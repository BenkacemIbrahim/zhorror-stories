// Z Horror - behaviour for pages/welcome.html
// Extracted verbatim from the page's original inline <script> block.
        // Preloader
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                document.querySelector('.welcome-container')?.classList.add('visible');
            }, 500);
        });

        // Skip Button
        document.getElementById('skipButton')?.addEventListener('click', () => {
            window.scrollTo({ top: document.getElementById('categories').offsetTop, behavior: 'smooth' });
        });

        // Scroll Down Button
        document.getElementById('scrollDown')?.addEventListener('click', () => {
            window.scrollTo({ top: document.getElementById('features').offsetTop, behavior: 'smooth' });
        });

        // Scroll Progress Bar
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById('scrollProgressBar').style.width = scrollPercent + '%';

            // Update custom scrollbar thumb position and height
            const scrollThumbHeight = (window.innerHeight / docHeight) * 100;
            const scrollThumbTop = (scrollTop / docHeight) * (100 - scrollThumbHeight);
            document.documentElement.style.setProperty('--scroll-thumb-height', scrollThumbHeight + 'vh');
            document.documentElement.style.setProperty('--scroll-thumb-top', scrollThumbTop + 'vh');
        });

        // Back to Top Button
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Intersection Observer for Sections
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        sections.forEach(section => observer.observe(section));

        // Scroll Animation Observer
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });

        // Stats Counter Animation
        const counters = document.querySelectorAll('.stats-counter');
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200;
                const increment = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            const section = counter.closest('.section');
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                    observer.unobserve(section);
                }
            }, { threshold: 0.5 });
            observer.observe(section);
        });

        // Interactive Horror Element
        document.getElementById('enterRoomBtn')?.addEventListener('click', () => {
            const bloodSpread = document.getElementById('bloodSpread');
            bloodSpread.style.animation = 'bloodSpread 8s ease-in-out forwards';
            setTimeout(() => {
                alert('دخلت الغرفة... فجأة، سمعت صوتاً غريباً يقترب منك!');
            }, 2000);
        });

        document.getElementById('leaveHouseBtn')?.addEventListener('click', () => {
            alert('اخترت المغادرة... لكن هل ستتمكن من النسيان؟');
        });

        // Particles Effect
        const particlesContainer = document.getElementById('particles');
        function createParticle() {
            const particle = document.createElement('span');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = Math.random() * 10 + 10 + 's';
            particlesContainer.appendChild(particle);
            setTimeout(() => particle.remove(), 15000);
        }
        setInterval(createParticle, 500);

        function updateCountdown() {
            const halloween = new Date('October 31, 2025 00:00:00');
            const now = new Date();
            const diff = halloween - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            document.getElementById('countdown-days').innerText = days;
            document.getElementById('countdown-hours').innerText = hours;
            document.getElementById('countdown-minutes').innerText = minutes;
            document.getElementById('countdown-seconds').innerText = seconds;
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Initialize custom scrollbar on load
        window.addEventListener('load', () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollThumbHeight = (window.innerHeight / docHeight) * 100;
            document.documentElement.style.setProperty('--scroll-thumb-height', scrollThumbHeight + 'vh');
            document.documentElement.style.setProperty('--scroll-thumb-top', '0vh');
        });

        // Animated background effect
        const animatedBg = document.querySelector('.animated-bg');
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            animatedBg.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(244, 0, 9, 0.3) 0%, transparent 80%)`;
        });
    