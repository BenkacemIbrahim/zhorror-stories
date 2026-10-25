// Z Horror - behaviour for pages/story-reader.html
// Extracted verbatim from the page's original inline <script> block.
        // Progress Bar
        window.addEventListener('scroll', function () {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('progressBar').style.width = scrolled + '%';
        });

        // Font Size Controls
        const storyContent = document.querySelector('.story-content');
        const increaseFontBtn = document.getElementById('increaseFontBtn');
        const decreaseFontBtn = document.getElementById('decreaseFontBtn');
        const resetFontBtn = document.getElementById('resetFontBtn');

        let currentFontSize = 1.125; // Default font size in rem

        increaseFontBtn.addEventListener('click', function () {
            if (currentFontSize < 1.5) {
                currentFontSize += 0.0625;
                storyContent.style.fontSize = currentFontSize + 'rem';
            }
        });

        decreaseFontBtn.addEventListener('click', function () {
            if (currentFontSize > 0.875) {
                currentFontSize -= 0.0625;
                storyContent.style.fontSize = currentFontSize + 'rem';
            }
        });

        resetFontBtn.addEventListener('click', function () {
            currentFontSize = 1.125;
            storyContent.style.fontSize = currentFontSize + 'rem';
        });

        // Reading Controls
        const bookmarkBtn = document.getElementById('bookmarkBtn');
        const shareBtn = document.getElementById('shareBtn');
        const likeBtn = document.getElementById('likeBtn');
        const commentBtn = document.getElementById('commentBtn');

        bookmarkBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.style.color = '#F40009';
                alert('تم حفظ القصة للقراءة لاحقًا');
            } else {
                this.style.color = 'white';
                alert('تم إلغاء حفظ القصة');
            }
        });

        shareBtn.addEventListener('click', function () {
            alert('مشاركة القصة');
        });

        likeBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.style.color = '#F40009';
                alert('تم الإعجاب بالقصة');
            } else {
                this.style.color = 'white';
                alert('تم إلغاء الإعجاب');
            }
        });

        commentBtn.addEventListener('click', function () {
            document.querySelector('.add-comment').scrollIntoView({ behavior: 'smooth' });
            document.querySelector('.comment-textarea').focus();
        });

        // Chapter Navigation
        const prevChapterBtn = document.querySelector('.chapter-nav-button.prev');
        const nextChapterBtn = document.querySelector('.chapter-nav-button.next');

        prevChapterBtn.addEventListener('click', function () {
            alert('الانتقال إلى الفصل السابق');
        });

        nextChapterBtn.addEventListener('click', function () {
            alert('الانتقال إلى الفصل التالي');
        });

        // Comment Form
        const commentForm = document.getElementById('commentForm');
        const newCommentText = document.getElementById('newCommentText');
        const commentCount = document.getElementById('commentCount');

        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const commentText = newCommentText.value;

            if (commentText.trim() !== '') {
                // Create new comment
                const newComment = createComment({
                    id: Date.now(),
                    user: {
                        name: 'أنت',
                        avatar: 'https://i.pinimg.com/736x/5a/e5/8f/5ae58f5236a0a1d695a34c9af5d4c1a0.jpg',
                        title: 'قارئ'
                    },
                    date: 'الآن',
                    content: commentText,
                    likes: 0
                });

                // Add to comments section
                const commentsSection = document.querySelector('.comments-section');
                commentsSection.insertBefore(newComment, document.querySelector('.add-comment'));

                // Update comment count
                const currentCount = parseInt(commentCount.textContent);
                commentCount.textContent = currentCount + 1;

                // Clear form
                newCommentText.value = '';

                // Scroll to new comment
                newComment.scrollIntoView({ behavior: 'smooth' });

                // Add event listeners to the new comment
                setupCommentEventListeners(newComment);
            } else {
                alert('الرجاء كتابة تعليق قبل الإرسال');
            }
        });

        // Create comment element
        function createComment(comment) {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.id = 'comment' + comment.id;

            commentElement.innerHTML = `
                <div class="comment-menu-toggle">
                    <i class="fas fa-ellipsis-v"></i>
                </div>
                <div class="comment-menu" id="commentMenu${comment.id}">
                    <div class="comment-menu-item">
                        <i class="fas fa-flag"></i>
                        <span>إبلاغ</span>
                    </div>
                    <div class="comment-menu-item">
                        <i class="fas fa-ban"></i>
                        <span>حظر المستخدم</span>
                    </div>
                    <div class="comment-menu-item">
                        <i class="fas fa-share-alt"></i>
                        <span>مشاركة</span>
                    </div>
                    <div class="comment-menu-item">
                        <i class="fas fa-copy"></i>
                        <span>نسخ النص</span>
                    </div>
                </div>
                <div class="comment-header">
                    <div class="comment-user">
                        <div class="comment-avatar">
                            <img src="${comment.user.avatar}" alt="صورة المستخدم">
                        </div>
                        <div class="comment-user-info">
                            <h4>${comment.user.name}</h4>
                            <span>${comment.user.title}</span>
                        </div>
                    </div>
                    <div class="comment-date">${comment.date}</div>
                </div>
                <div class="comment-content">
                    <p>${comment.content}</p>
                </div>
                <div class="comment-actions">
                    <div class="comment-action like-action">
                        <i class="fas fa-heart"></i>
                        <span>${comment.likes} إعجاب</span>
                    </div>
                    <div class="comment-action reply-action" data-comment-id="${comment.id}">
                        <i class="fas fa-reply"></i>
                        <span>رد</span>
                    </div>
                </div>
                <div class="reply-form" id="replyForm${comment.id}">
                    <textarea class="reply-textarea" placeholder="اكتب ردك هنا..."></textarea>
                    <div class="clearfix">
                        <button class="reply-cancel">إلغاء</button>
                        <button class="reply-submit" data-comment-id="${comment.id}">إرسال</button>
                    </div>
                </div>
                <div class="comment-replies" id="replies${comment.id}">
                    <!-- Replies will be added here -->
                </div>
            `;

            return commentElement;
        }

        // Setup event listeners for comments
        function setupCommentEventListeners(commentElement) {
            // Like action
            const likeAction = commentElement.querySelector('.like-action');
            likeAction.addEventListener('click', function () {
                const likesSpan = this.querySelector('span');
                const currentLikes = parseInt(likesSpan.textContent);
                likesSpan.textContent = (currentLikes + 1) + ' إعجاب';
                this.style.color = '#F40009';
            });

            // Reply action
            const replyAction = commentElement.querySelector('.reply-action');
            const commentId = replyAction.getAttribute('data-comment-id');
            const replyForm = document.getElementById('replyForm' + commentId);

            replyAction.addEventListener('click', function () {
                // Close all other reply forms
                document.querySelectorAll('.reply-form.active').forEach(form => {
                    if (form.id !== 'replyForm' + commentId) {
                        form.classList.remove('active');
                    }
                });

                // Toggle this reply form
                replyForm.classList.toggle('active');
                if (replyForm.classList.contains('active')) {
                    replyForm.querySelector('textarea').focus();
                }
            });

            // Cancel reply
            const cancelReply = replyForm.querySelector('.reply-cancel');
            cancelReply.addEventListener('click', function () {
                replyForm.classList.remove('active');
                replyForm.querySelector('textarea').value = '';
            });

            // Submit reply
            const submitReply = replyForm.querySelector('.reply-submit');
            submitReply.addEventListener('click', function () {
                const replyText = replyForm.querySelector('textarea').value;
                if (replyText.trim() !== '') {
                    addReply(commentId, replyText);
                    replyForm.classList.remove('active');
                    replyForm.querySelector('textarea').value = '';
                } else {
                    alert('الرجاء كتابة رد قبل الإرسال');
                }
            });

            // Comment menu toggle
            const menuToggle = commentElement.querySelector('.comment-menu-toggle');
            const commentMenu = commentElement.querySelector('.comment-menu');

            menuToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                // Close all other menus
                document.querySelectorAll('.comment-menu.active, .reply-menu.active').forEach(menu => {
                    if (menu !== commentMenu) {
                        menu.classList.remove('active');
                    }
                });

                // Toggle this menu
                commentMenu.classList.toggle('active');
            });
        }

        // Add reply to comment
        function addReply(commentId, replyText) {
            const repliesContainer = document.getElementById('replies' + commentId);

            const replyElement = document.createElement('div');
            replyElement.className = 'reply';

            replyElement.innerHTML = `
                <div class="reply-menu-toggle">
                    <i class="fas fa-ellipsis-v"></i>
                </div>
                <div class="reply-menu">
                    <div class="reply-menu-item">
                        <i class="fas fa-flag"></i>
                        <span>إبلاغ</span>
                    </div>
                    <div class="reply-menu-item">
                        <i class="fas fa-ban"></i>
                        <span>حظر المستخدم</span>
                    </div>
                    <div class="reply-menu-item">
                        <i class="fas fa-copy"></i>
                        <span>نسخ النص</span>
                    </div>
                </div>
                <div class="reply-header">
                    <div class="reply-user">
                        <div class="reply-avatar">
                            <img src="https://i.pinimg.com/736x/5a/e5/8f/5ae58f5236a0a1d695a34c9af5d4c1a0.jpg" alt="صورة المستخدم">
                        </div>
                        <div class="reply-user-name">أنت</div>
                    </div>
                    <div class="reply-date">الآن</div>
                </div>
                <div class="reply-content">
                    <p>${replyText}</p>
                </div>
                <div class="reply-actions">
                    <div class="reply-action like-action">
                        <i class="fas fa-heart"></i>
                        <span>0 إعجاب</span>
                    </div>
                    <div class="reply-action reply-to-reply">
                        <i class="fas fa-reply"></i>
                        <span>رد</span>
                    </div>
                </div>
            `;

            repliesContainer.appendChild(replyElement);

            // Add event listeners to the new reply
            setupReplyEventListeners(replyElement);
        }

        // Setup event listeners for replies
        function setupReplyEventListeners(replyElement) {
            // Like action for replies
            const likeAction = replyElement.querySelector('.like-action');
            likeAction.addEventListener('click', function () {
                const likesSpan = this.querySelector('span');
                const currentLikes = parseInt(likesSpan.textContent);
                likesSpan.textContent = (currentLikes + 1) + ' إعجاب';
                this.style.color = '#F40009';
            });

            // Reply menu toggle
            const menuToggle = replyElement.querySelector('.reply-menu-toggle');
            const replyMenu = replyElement.querySelector('.reply-menu');

            menuToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                // Close all other menus
                document.querySelectorAll('.comment-menu.active, .reply-menu.active').forEach(menu => {
                    if (menu !== replyMenu) {
                        menu.classList.remove('active');
                    }
                });

                // Toggle this menu
                replyMenu.classList.toggle('active');
            });
        }

        // Initialize existing comments
        document.querySelectorAll('.comment').forEach(comment => {
            setupCommentEventListeners(comment);
        });

        // Initialize existing replies
        document.querySelectorAll('.reply').forEach(reply => {
            setupReplyEventListeners(reply);
        });

        // Close menus when clicking outside
        document.addEventListener('click', function () {
            document.querySelectorAll('.comment-menu.active, .reply-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        });

        // Rating System
        const ratingStars = document.querySelectorAll('.rating-star');
        const ratingFeedback = document.getElementById('ratingFeedback');
        const feedbackMessages = [
            'سيء',
            'ضعيف',
            'متوسط',
            'جيد',
            'ممتاز'
        ];

        ratingStars.forEach(star => {
            star.addEventListener('mouseover', function () {
                const rating = this.getAttribute('data-rating');
                highlightStars(rating);
                ratingFeedback.textContent = feedbackMessages[rating - 1];
            });

            star.addEventListener('mouseout', function () {
                const activeRating = document.querySelector('.rating-star.active');
                if (activeRating) {
                    const rating = activeRating.getAttribute('data-rating');
                    highlightStars(rating);
                    ratingFeedback.textContent = feedbackMessages[rating - 1];
                } else {
                    resetStars();
                    ratingFeedback.textContent = '';
                }
            });

            star.addEventListener('click', function () {
                const rating = this.getAttribute('data-rating');

                // Remove active class from all stars
                ratingStars.forEach(s => s.classList.remove('active'));

                // Add active class to selected stars
                highlightStars(rating, true);

                // Show thank you message
                ratingFeedback.textContent = `شكراً لتقييمك! (${rating}/5)`;

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
            });
        }

        // Chapter Menu Functionality
        document.addEventListener('DOMContentLoaded', function () {
            // Chapter data - you can replace this with your actual chapters
            const chapters = [
                { id: 1, title: 'البوابة الغامضة', isActive: true },
                { id: 2, title: 'المملكة المفقودة' },
                { id: 3, title: 'ليليث الحارسة' },
                { id: 4, title: 'أسرار القصر الأسود' },
                { id: 5, title: 'الكائنات المتحجرة' },
                { id: 6, title: 'البحيرات السوداء' },
                { id: 7, title: 'قوة سامر الخفية' },
                { id: 8, title: 'المواجهة الأخيرة' }
            ];

            // Populate chapter list
            const chapterList = document.getElementById('chapterList');
            chapters.forEach(chapter => {
                const li = document.createElement('li');
                li.className = `chapter-item ${chapter.isActive ? 'active' : ''}`;
                li.innerHTML = `
                    <i class="fas fa-bookmark"></i>
                    <span>${chapter.title}</span>
                    <span class="chapter-number">الفصل ${chapter.id}</span>
                `;
                li.addEventListener('click', function () {
                    // Navigate to chapter (replace with your actual navigation logic)
                    alert(`الانتقال إلى الفصل ${chapter.id}: ${chapter.title}`);

                    // Update active chapter
                    document.querySelectorAll('.chapter-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    this.classList.add('active');

                    // Close menu after selection
                    toggleChapterMenu(false);

                    // Update chapter title in the page
                    document.querySelector('.chapter-title').textContent = `الفصل ${chapter.id}: ${chapter.title}`;
                });
                chapterList.appendChild(li);
            });

            // Toggle chapter menu
            const chapterMenuToggle = document.getElementById('chapterMenuToggle');
            const chapterMenu = document.getElementById('chapterMenu');
            let menuOpen = false;

            function toggleChapterMenu(force) {
                if (force !== undefined) {
                    menuOpen = force;
                } else {
                    menuOpen = !menuOpen;
                }

                // Update menu visibility
                if (menuOpen) {
                    chapterMenu.classList.add('open');
                } else {
                    chapterMenu.classList.remove('open');
                }

                // Update toggle icon
                const icon = chapterMenuToggle.querySelector('.fas.fa-chevron-down, .fas.fa-chevron-up');
                if (menuOpen) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }

            chapterMenuToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleChapterMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', function (event) {
                if (!chapterMenuToggle.contains(event.target) &&
                    !chapterMenu.contains(event.target)) {
                    toggleChapterMenu(false);
                }
            });

            // Close menu when scrolling
            let scrollTimeout;
            window.addEventListener('scroll', function () {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function () {
                    toggleChapterMenu(false);
                }, 150);
            });
        });

        // Writer Profile Follow Button
        const followBtn = document.getElementById('followBtn');

        followBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-user-check"></i><span>تمت المتابعة</span>';
                this.style.background = '#333';
                alert('تمت متابعة الكاتب أحمد الشريف');
            } else {
                this.innerHTML = '<i class="fas fa-user-plus"></i><span>متابعة</span>';
                this.style.background = '#F40009';
                alert('تم إلغاء متابعة الكاتب');
            }
        });

        // Recommendation Cards
        const recommendationCards = document.querySelectorAll('.recommendation-card');

        recommendationCards.forEach(card => {
            card.addEventListener('click', function () {
                alert('الانتقال إلى صفحة القصة: ' + this.querySelector('.recommendation-title').textContent);
            });
        });
    