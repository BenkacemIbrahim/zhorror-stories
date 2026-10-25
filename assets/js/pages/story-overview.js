// Z Horror - behaviour for pages/story-overview.html
// Extracted verbatim from the page's original inline <script> block.
        // Rating System
        const ratingStars = document.querySelectorAll('.rating-star');
        let selectedRating = 0;

        ratingStars.forEach(star => {
            star.addEventListener('mouseover', function () {
                const rating = this.getAttribute('data-rating');
                highlightStars(rating);
            });

            star.addEventListener('mouseout', function () {
                if (selectedRating > 0) {
                    highlightStars(selectedRating);
                } else {
                    resetStars();
                }
            });

            star.addEventListener('click', function () {
                const rating = this.getAttribute('data-rating');
                selectedRating = rating;

                // Remove active class from all stars
                ratingStars.forEach(s => s.classList.remove('active'));

                // Add active class to selected stars
                highlightStars(rating, true);

                // You can send the rating to the server here
                console.log(`User rated: ${rating}/5`);
            });
        });

        function highlightStars(rating, setActive = false) {
            ratingStars.forEach(star => {
                const starRating = star.getAttribute('data-rating');
                if (starRating <= rating) {
                    star.style.color = '#F40009';
                    if (setActive) {
                        star.classList.add('active');
                    }
                } else {
                    star.style.color = '#555';
                    if (setActive) {
                        star.classList.remove('active');
                    }
                }
            });
        }

        function resetStars() {
            ratingStars.forEach(star => {
                star.style.color = '#555';
                star.classList.remove('active');
            });
            selectedRating = 0;
        }

        // Add Review Form
        const reviewForm = document.querySelector('.add-review-form');
        const reviewTextarea = document.querySelector('.review-textarea');
        const submitReviewBtn = document.querySelector('.submit-review');
        const reviewsList = document.querySelector('.reviews-list');

        submitReviewBtn.addEventListener('click', function () {
            const reviewText = reviewTextarea.value.trim();

            if (reviewText && selectedRating > 0) {
                // Create new review
                addNewReview(reviewText, selectedRating);

                // Reset form
                reviewTextarea.value = '';
                resetStars();

                // Show success message
                alert('تم إضافة رأيك بنجاح!');
            } else {
                // Show error message
                alert('الرجاء تقييم القصة وكتابة رأيك قبل الإرسال');
            }
        });

        function addNewReview(reviewText, rating) {
            // Create review element
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review animate-fade-in';

            // Get current date
            const now = new Date();

            // Create stars HTML based on rating
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    starsHTML += '<i class="fas fa-star"></i>';
                } else if (i - 0.5 <= rating) {
                    starsHTML += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    starsHTML += '<i class="far fa-star"></i>';
                }
            }

            // Set review HTML
            reviewElement.innerHTML = `
            <div class="review-header">
                <div class="review-user">
                    <div class="review-avatar">
                        <img src="https://i.pinimg.com/736x/5a/e5/8f/5ae58f5236a0a1d695a34c9af5d4c1a0.jpg" alt="صورة المستخدم">
                    </div>
                    <div class="review-user-info">
                        <h4>أنت</h4>
                        <span>قارئ</span>
                    </div>
                </div>
                <div class="review-rating">
                    ${starsHTML}
                </div>
            </div>
            <div class="review-content">
                <p>${reviewText}</p>
            </div>
            <div class="review-date">الآن</div>
        `;

            // Add to reviews list at the top
            reviewsList.insertBefore(reviewElement, reviewsList.firstChild);
        }

        // Follow Button
        const followButton = document.querySelector('.follow-button');

        followButton.addEventListener('click', function () {
            this.classList.toggle('following');

            if (this.classList.contains('following')) {
                this.textContent = 'تمت المتابعة';
                this.style.background = '#F40009';
                this.style.color = 'white';
            } else {
                this.textContent = 'متابعة';
                this.style.background = 'transparent';
                this.style.color = '#F40009';
            }
        });

        // Chapter Cards
        const chapterCards = document.querySelectorAll('.chapter-card');

        chapterCards.forEach(card => {
            card.addEventListener('click', function () {
                const chapterNumber = this.querySelector('.chapter-number').textContent;
                const chapterTitle = this.querySelector('.chapter-title').textContent;

                alert(`الانتقال إلى ${chapterNumber}: ${chapterTitle}`);
                // Here you would navigate to the chapter page
            });
        });

        // Similar Stories
        const similarStories = document.querySelectorAll('.similar-story');

        similarStories.forEach(story => {
            story.addEventListener('click', function () {
                const storyTitle = this.querySelector('.similar-story-title').textContent;

                alert(`الانتقال إلى قصة: ${storyTitle}`);
                // Here you would navigate to the story page
            });
        });
    