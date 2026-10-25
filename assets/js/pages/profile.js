// Z Horror - behaviour for pages/profile.html
// Extracted verbatim from the page's original inline <script> block.
        // Tab Switching
        const tabs = document.querySelectorAll('.profile-tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');

                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to selected tab and content
                tab.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });

        // Post Type Tabs Switching
        const postTypeTabs = document.querySelectorAll('.post-type-tab');
        const postContents = document.querySelectorAll('.post-content');

        postTypeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const postType = tab.getAttribute('data-post-type');

                // Remove active class from all tabs and contents
                postTypeTabs.forEach(t => t.classList.remove('active'));
                postContents.forEach(c => c.classList.remove('active'));

                // Add active class to selected tab and content
                tab.classList.add('active');
                document.getElementById(`${postType}-post`).classList.add('active');
            });
        });

        // Create Post Button
        const createPostBtn = document.getElementById('create-post-btn');
        const postCreator = document.getElementById('post-creator');

        createPostBtn.addEventListener('click', function () {
            // Scroll to post creator
            postCreator.scrollIntoView({ behavior: 'smooth' });

            // Add highlight animation
            postCreator.classList.add('border-accent');
            setTimeout(() => {
                postCreator.classList.remove('border-accent');
            }, 1500);
        });

        // Create Story Button (redirects to post creator with novel tab active)
        const createStoryBtn = document.getElementById('create-story-btn');
        const createDraftBtn = document.getElementById('create-draft-btn');

        [createStoryBtn, createDraftBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function () {
                    // Switch to novel tab
                    postTypeTabs.forEach(t => t.classList.remove('active'));
                    postContents.forEach(c => c.classList.remove('active'));

                    document.querySelector('[data-post-type="novel"]').classList.add('active');
                    document.getElementById('novel-post').classList.add('active');

                    // Scroll to post creator
                    postCreator.scrollIntoView({ behavior: 'smooth' });

                    // Add highlight animation
                    postCreator.classList.add('border-accent');
                    setTimeout(() => {
                        postCreator.classList.remove('border-accent');
                    }, 1500);
                });
            }
        });

        // Edit Profile Button
        const editProfileBtn = document.querySelector('.profile-actions .primary-button');
        editProfileBtn.addEventListener('click', function () {
            // Switch to settings tab
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            document.querySelector('[data-tab="settings"]').classList.add('active');
            document.getElementById('settings-tab').classList.add('active');

            // Scroll to settings form
            document.getElementById('settings-tab').scrollIntoView({ behavior: 'smooth' });
        });

        // Media File Upload Handling
        const novelCoverPreview = document.getElementById('novel-cover-preview');
        const novelCoverInput = document.getElementById('novel-cover-input');
        const mediaFilePreview = document.getElementById('media-file-preview');
        const mediaFileInput = document.getElementById('media-file-input');

        // Novel Cover Upload
        if (novelCoverPreview && novelCoverInput) {
            novelCoverPreview.addEventListener('click', () => {
                novelCoverInput.click();
            });

            novelCoverInput.addEventListener('change', function () {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();

                    reader.onload = function (e) {
                        // Clear previous content
                        while (novelCoverPreview.firstChild) {
                            novelCoverPreview.removeChild(novelCoverPreview.firstChild);
                        }

                        // Add image
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = 'صورة الغلاف';
                        novelCoverPreview.appendChild(img);

                        // Add overlay with actions
                        const overlay = document.createElement('div');
                        overlay.className = 'media-preview-overlay';

                        const actions = document.createElement('div');
                        actions.className = 'media-preview-actions';

                        const changeAction = document.createElement('div');
                        changeAction.className = 'media-preview-action';
                        changeAction.innerHTML = '<i class="fas fa-exchange-alt"></i>';
                        changeAction.addEventListener('click', (e) => {
                            e.stopPropagation();
                            novelCoverInput.click();
                        });

                        const removeAction = document.createElement('div');
                        removeAction.className = 'media-preview-action';
                        removeAction.innerHTML = '<i class="fas fa-trash"></i>';
                        removeAction.addEventListener('click', (e) => {
                            e.stopPropagation();
                            resetNovelCoverPreview();
                        });

                        actions.appendChild(changeAction);
                        actions.appendChild(removeAction);
                        overlay.appendChild(actions);
                        novelCoverPreview.appendChild(overlay);
                    }

                    reader.readAsDataURL(this.files[0]);
                }
            });
        }

        // Media File Upload
        if (mediaFilePreview && mediaFileInput) {
            mediaFilePreview.addEventListener('click', () => {
                mediaFileInput.click();
            });

            mediaFileInput.addEventListener('change', function () {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();

                    reader.onload = function (e) {
                        // Clear previous content
                        while (mediaFilePreview.firstChild) {
                            mediaFilePreview.removeChild(mediaFilePreview.firstChild);
                        }

                        const file = mediaFileInput.files[0];

                        if (file.type.startsWith('image/')) {
                            // Add image
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.alt = 'صورة المنشور';
                            mediaFilePreview.appendChild(img);
                        } else if (file.type.startsWith('video/')) {
                            // Add video
                            const video = document.createElement('video');
                            video.src = e.target.result;
                            video.controls = true;
                            mediaFilePreview.appendChild(video);
                        }

                        // Add overlay with actions
                        const overlay = document.createElement('div');
                        overlay.className = 'media-preview-overlay';

                        const actions = document.createElement('div');
                        actions.className = 'media-preview-actions';

                        const changeAction = document.createElement('div');
                        changeAction.className = 'media-preview-action';
                        changeAction.innerHTML = '<i class="fas fa-exchange-alt"></i>';
                        changeAction.addEventListener('click', (e) => {
                            e.stopPropagation();
                            mediaFileInput.click();
                        });

                        const removeAction = document.createElement('div');
                        removeAction.className = 'media-preview-action';
                        removeAction.innerHTML = '<i class="fas fa-trash"></i>';
                        removeAction.addEventListener('click', (e) => {
                            e.stopPropagation();
                            resetMediaFilePreview();
                        });

                        actions.appendChild(changeAction);
                        actions.appendChild(removeAction);
                        overlay.appendChild(actions);
                        mediaFilePreview.appendChild(overlay);
                    }

                    reader.readAsDataURL(this.files[0]);
                }
            });
        }

        // Reset Preview Functions
        function resetNovelCoverPreview() {
            while (novelCoverPreview.firstChild) {
                novelCoverPreview.removeChild(novelCoverPreview.firstChild);
            }

            const icon = document.createElement('i');
            icon.className = 'fas fa-image media-preview-icon';

            const text = document.createElement('p');
            text.className = 'media-preview-text';
            text.textContent = 'اسحب صورة الغلاف هنا أو انقر للاختيار';

            const button = document.createElement('button');
            button.className = 'media-preview-button';
            button.textContent = 'اختر صورة';

            novelCoverPreview.appendChild(icon);
            novelCoverPreview.appendChild(text);
            novelCoverPreview.appendChild(button);

            // Clear the input
            novelCoverInput.value = '';
        }

        function resetMediaFilePreview() {
            while (mediaFilePreview.firstChild) {
                mediaFilePreview.removeChild(mediaFilePreview.firstChild);
            }

            const icon = document.createElement('i');
            icon.className = 'fas fa-photo-video media-preview-icon';

            const text = document.createElement('p');
            text.className = 'media-preview-text';
            text.textContent = 'اسحب صورة أو فيديو هنا أو انقر للاختيار';

            const button = document.createElement('button');
            button.className = 'media-preview-button';
            button.textContent = 'اختر ملف';

            mediaFilePreview.appendChild(icon);
            mediaFilePreview.appendChild(text);
            mediaFilePreview.appendChild(button);

            // Clear the input
            mediaFileInput.value = '';
        }

        // Publish Buttons
        const publishNovel = document.getElementById('publish-novel');
        const publishTweet = document.getElementById('publish-tweet');
        const publishMedia = document.getElementById('publish-media');

        // Novel Publish
        if (publishNovel) {
            publishNovel.addEventListener('click', function () {
                const title = document.getElementById('novel-title').value;
                if (!title) {
                    alert('يرجى إدخال عنوان الرواية');
                    return;
                }

                alert(`تم نشر الرواية "${title}" بنجاح!`);
                resetNovelForm();
            });
        }

        // Tweet Publish
        if (publishTweet) {
            publishTweet.addEventListener('click', function () {
                const content = document.getElementById('tweet-content').value;
                if (!content) {
                    alert('يرجى كتابة محتوى التغريدة');
                    return;
                }

                alert('تم نشر التغريدة بنجاح!');
                resetTweetForm();
            });
        }

        // Media Publish
        if (publishMedia) {
            publishMedia.addEventListener('click', function () {
                if (!mediaFileInput.files || !mediaFileInput.files[0]) {
                    alert('يرجى اختيار صورة أو فيديو');
                    return;
                }

                alert('تم نشر الصورة/الفيديو بنجاح!');
                resetMediaForm();
            });
        }

        // Reset Form Functions
        function resetNovelForm() {
            document.getElementById('novel-title').value = '';
            document.getElementById('novel-description').value = '';
            resetNovelCoverPreview();
        }

        function resetTweetForm() {
            document.getElementById('tweet-content').value = '';
        }

        function resetMediaForm() {
            document.getElementById('media-caption').value = '';
            resetMediaFilePreview();
        }

        // Story Cards Click
        const storyCards = document.querySelectorAll('.story-card');

        storyCards.forEach(card => {
            card.addEventListener('click', function (e) {
                // Don't trigger if clicking on action buttons
                if (!e.target.closest('.story-actions')) {
                    const storyTitle = this.querySelector('.story-title').textContent;
                    alert(`الانتقال إلى قصة: ${storyTitle}`);
                }
            });
        });

        // Story Actions
        const storyActions = document.querySelectorAll('.story-action');

        storyActions.forEach(action => {
            action.addEventListener('click', function (e) {
                e.stopPropagation();

                const icon = this.querySelector('i');
                const storyCard = this.closest('.story-card');
                const storyTitle = storyCard.querySelector('.story-title').textContent;

                if (icon.classList.contains('fa-edit')) {
                    alert(`تعديل قصة: ${storyTitle}`);
                } else if (icon.classList.contains('fa-trash')) {
                    if (confirm(`هل أنت متأكد من حذف قصة "${storyTitle}"؟`)) {
                        storyCard.remove();
                    }
                }
            });
        });

        // Draft Actions
        const draftActions = document.querySelectorAll('.draft-action');

        draftActions.forEach(action => {
            action.addEventListener('click', function () {
                const draftCard = this.closest('.draft-card');
                const draftTitle = draftCard.querySelector('.draft-title').textContent;

                if (this.classList.contains('edit')) {
                    alert(`تعديل مسودة: ${draftTitle}`);
                } else if (this.classList.contains('publish')) {
                    if (confirm(`هل أنت متأكد من نشر مسودة "${draftTitle}"؟`)) {
                        alert(`تم نشر المسودة بنجاح!`);
                        draftCard.remove();
                    }
                }
            });
        });

        // Bookmark Actions
        const bookmarkActions = document.querySelectorAll('.bookmark-action');

        bookmarkActions.forEach(action => {
            action.addEventListener('click', function (e) {
                e.stopPropagation();

                const icon = this.querySelector('i');
                const bookmarkCard = this.closest('.bookmark-card');
                const bookmarkTitle = bookmarkCard.querySelector('.bookmark-title').textContent;

                if (icon.classList.contains('fa-trash')) {
                    if (confirm(`هل أنت متأكد من إزالة "${bookmarkTitle}" من المحفوظات؟`)) {
                        bookmarkCard.remove();
                    }
                } else if (icon.classList.contains('fa-share-alt')) {
                    alert(`مشاركة قصة: ${bookmarkTitle}`);
                }
            });
        });

        // Follow/Unfollow Users
        const followButtons = document.querySelectorAll('.follow-button');

        followButtons.forEach(button => {
            button.addEventListener('click', function () {
                const userName = this.closest('.user-card').querySelector('.user-name').textContent;

                if (this.classList.contains('following')) {
                    if (confirm(`هل أنت متأكد من إلغاء متابعة "${userName}"؟`)) {
                        this.textContent = 'متابعة';
                        this.classList.remove('following');
                    }
                } else {
                    this.textContent = 'إلغاء المتابعة';
                    this.classList.add('following');
                    alert(`تمت متابعة ${userName} بنجاح!`);
                }
            });
        });

        // Settings Form Submission
        const settingsForms = document.querySelectorAll('.settings-form');

        settingsForms.forEach(form => {
            const saveButton = form.querySelector('.action-button:not(.bg-red-600)');
            if (saveButton) {
                saveButton.addEventListener('click', function () {
                    alert('تم حفظ التغييرات بنجاح');
                });
            }
        });

        // Edit Profile Picture
        const editAvatarBtn = document.querySelector('.edit-avatar-btn');
        editAvatarBtn.addEventListener('click', function () {
            const modal = document.getElementById('profile-modal');
            modal.style.display = 'flex';
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

        // Edit Banner
        const editBannerBtn = document.querySelector('.edit-banner-btn');
        editBannerBtn.addEventListener('click', function () {
            const modal = document.getElementById('banner-modal');
            modal.style.display = 'flex';
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

        // Share Profile
        const shareProfileBtn = document.querySelector('.profile-actions .secondary-button:last-child');
        shareProfileBtn.addEventListener('click', function () {
            alert('مشاركة الملف الشخصي');
        });

        // Drag and Drop for Media Uploads
        [novelCoverPreview, mediaFilePreview].forEach(dropArea => {
            if (dropArea) {
                ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                    dropArea.addEventListener(eventName, preventDefaults, false);
                });

                function preventDefaults(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                ['dragenter', 'dragover'].forEach(eventName => {
                    dropArea.addEventListener(eventName, highlight, false);
                });

                ['dragleave', 'drop'].forEach(eventName => {
                    dropArea.addEventListener(eventName, unhighlight, false);
                });

                function highlight() {
                    dropArea.classList.add('border-accent');
                }

                function unhighlight() {
                    dropArea.classList.remove('border-accent');
                }

                dropArea.addEventListener('drop', handleDrop, false);

                function handleDrop(e) {
                    const dt = e.dataTransfer;
                    const files = dt.files;

                    if (dropArea === novelCoverPreview && files.length > 0) {
                        novelCoverInput.files = files;
                        const event = new Event('change');
                        novelCoverInput.dispatchEvent(event);
                    } else if (dropArea === mediaFilePreview && files.length > 0) {
                        mediaFileInput.files = files;
                        const event = new Event('change');
                        mediaFileInput.dispatchEvent(event);
                    } else if (dropArea === tweetImagePreview && files.length > 0) {
                        tweetImageInput.files = files;
                        const event = new Event('change');
                        tweetImageInput.dispatchEvent(event);
                    }
                }
            }
        });

        // Character Counter for Tweet
        const tweetContent = document.getElementById('tweet-content');
        if (tweetContent) {
            tweetContent.addEventListener('input', function () {
                const maxLength = 280;
                const currentLength = this.value.length;
                const helper = this.nextElementSibling;

                if (currentLength > maxLength) {
                    this.value = this.value.substring(0, maxLength);
                    helper.textContent = `الحد الأقصى ${maxLength} حرف (تجاوزت الحد)`;
                    helper.style.color = '#F40009';
                } else {
                    helper.textContent = `الحد الأقصى ${maxLength} حرف (${currentLength}/${maxLength})`;
                    helper.style.color = '#aaa';
                }
            });
        }

        // Chapter Management
        const addChapterBtn = document.getElementById('add-chapter-btn');
        const chapterEditor = document.getElementById('chapter-editor');
        const closeChapterEditor = document.getElementById('close-chapter-editor');
        const saveChapterBtn = document.getElementById('save-chapter');
        const cancelChapterEdit = document.getElementById('cancel-chapter-edit');
        const chapterTitleInput = document.getElementById('chapter-title-input');
        const chapterContent = document.getElementById('chapter-content');
        const editingChapterTitle = document.getElementById('editing-chapter-title');

        // Chapter Settings
        const chapterSettings = document.getElementById('chapter-settings');
        const closeChapterSettings = document.getElementById('close-chapter-settings');
        const saveChapterSettings = document.getElementById('save-chapter-settings');
        const cancelChapterSettings = document.getElementById('cancel-chapter-settings');
        const settingsChapterTitle = document.getElementById('settings-chapter-title');

        // Track current editing chapter
        let currentEditingChapterId = null;

        // Edit Chapter
        const editChapterBtns = document.querySelectorAll('.edit-chapter');
        editChapterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const chapterId = this.getAttribute('data-chapter-id');
                currentEditingChapterId = chapterId;
                const chapterItem = document.querySelector(`.chapter-item[data-chapter-id="${chapterId}"]`);
                const chapterTitle = chapterItem.querySelector('.chapter-title').textContent;

                // Set editor values
                editingChapterTitle.textContent = chapterTitle;
                chapterTitleInput.value = chapterTitle;
                chapterContent.value = `هذا هو محتوى الفصل "${chapterTitle}". يمكنك تعديله هنا.`;

                // Show editor
                chapterEditor.style.display = 'block';
                chapterEditor.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Close Chapter Editor
        closeChapterEditor.addEventListener('click', function () {
            if (confirm('هل أنت متأكد من إغلاق المحرر؟ ستفقد التغييرات غير المحفوظة.')) {
                chapterEditor.style.display = 'none';
            }
        });

        // Cancel Chapter Edit
        cancelChapterEdit.addEventListener('click', function () {
            if (confirm('هل أنت متأكد من إلغاء التعديلات؟')) {
                chapterEditor.style.display = 'none';
            }
        });

        // Save Chapter
        saveChapterBtn.addEventListener('click', function () {
            const newTitle = chapterTitleInput.value;
            if (!newTitle) {
                alert('يرجى إدخال عنوان للفصل');
                return;
            }

            // Update chapter title in the list
            const chapterItem = document.querySelector(`.chapter-item[data-chapter-id="${currentEditingChapterId}"]`);
            if (chapterItem) {
                chapterItem.querySelector('.chapter-title').textContent = newTitle;
            }

            alert('تم حفظ الفصل بنجاح!');
            chapterEditor.style.display = 'none';
        });

        // Chapter Settings
        const settingsChapterBtns = document.querySelectorAll('.settings-chapter');
        settingsChapterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const chapterId = this.getAttribute('data-chapter-id');
                const chapterItem = document.querySelector(`.chapter-item[data-chapter-id="${chapterId}"]`);
                const chapterTitle = chapterItem.querySelector('.chapter-title').textContent;

                // Set settings values
                settingsChapterTitle.textContent = chapterTitle;
                document.getElementById('chapter-number-input').value = chapterId;

                // Show settings
                chapterSettings.style.display = 'block';
                chapterSettings.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Close Chapter Settings
        closeChapterSettings.addEventListener('click', function () {
            if (confirm('هل أنت متأكد من إغلاق الإعدادات؟ ستفقد التغييرات غير المحفوظة.')) {
                chapterSettings.style.display = 'none';
            }
        });

        // Cancel Chapter Settings
        cancelChapterSettings.addEventListener('click', function () {
            if (confirm('هل أنت متأكد من إلغاء التغييرات؟')) {
                chapterSettings.style.display = 'none';
            }
        });

        // Save Chapter Settings
        saveChapterSettings.addEventListener('click', function () {
            alert('تم حفظ إعدادات الفصل بنجاح!');
            chapterSettings.style.display = 'none';
        });

        // Add New Chapter
        addChapterBtn.addEventListener('click', function () {
            const chapterList = document.getElementById('chapter-list');
            const chapterCount = chapterList.querySelectorAll('.chapter-item').length;
            const newChapterId = chapterCount + 1;

            const newChapter = document.createElement('div');
            newChapter.className = 'chapter-item';
            newChapter.setAttribute('data-chapter-id', newChapterId);

            newChapter.innerHTML = `
                <div class="chapter-info">
                    <div class="chapter-reorder-handle">
                        <i class="fas fa-grip-vertical"></i>
                    </div>
                    <div class="chapter-number">${newChapterId}</div>
                    <div class="chapter-details">
                        <div class="chapter-title">فصل جديد</div>
                        <div class="chapter-meta">
                            <span><i class="fas fa-file-alt"></i> 0 كلمة</span>
                            <span><i class="fas fa-clock"></i> 0 دقائق للقراءة</span>
                        </div>
                    </div>
                </div>
                <div class="chapter-actions">
                    <button class="chapter-action edit-chapter" data-chapter-id="${newChapterId}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="chapter-action settings-chapter" data-chapter-id="${newChapterId}">
                        <i class="fas fa-cog"></i>
                    </button>
                    <button class="chapter-action delete-chapter" data-chapter-id="${newChapterId}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            chapterList.appendChild(newChapter);

            // Add event listeners to new buttons
            const newEditBtn = newChapter.querySelector('.edit-chapter');
            newEditBtn.addEventListener('click', function () {
                const chapterId = this.getAttribute('data-chapter-id');
                currentEditingChapterId = chapterId;
                const chapterItem = document.querySelector(`.chapter-item[data-chapter-id="${chapterId}"]`);
                const chapterTitle = chapterItem.querySelector('.chapter-title').textContent;

                // Set editor values
                editingChapterTitle.textContent = chapterTitle;
                chapterTitleInput.value = chapterTitle;
                chapterContent.value = `هذا هو محتوى الفصل الجديد. يمكنك تعديله هنا.`;

                // Show editor
                chapterEditor.style.display = 'block';
                chapterEditor.scrollIntoView({ behavior: 'smooth' });
            });

            const newSettingsBtn = newChapter.querySelector('.settings-chapter');
            newSettingsBtn.addEventListener('click', function () {
                const chapterId = this.getAttribute('data-chapter-id');
                const chapterItem = document.querySelector(`.chapter-item[data-chapter-id="${chapterId}"]`);
                const chapterTitle = chapterItem.querySelector('.chapter-title').textContent;

                // Set settings values
                settingsChapterTitle.textContent = chapterTitle;
                document.getElementById('chapter-number-input').value = chapterId;

                // Show settings
                chapterSettings.style.display = 'block';
                chapterSettings.scrollIntoView({ behavior: 'smooth' });
            });

            const newDeleteBtn = newChapter.querySelector('.delete-chapter');
            newDeleteBtn.addEventListener('click', function () {
                const chapterId = this.getAttribute('data-chapter-id');
                const chapterItem = document.querySelector(`.chapter-item[data-chapter-id="${chapterId}"]`);
                const chapterTitle = chapterItem.querySelector('.chapter-title').textContent;

                if (confirm(`هل أنت متأكد من حذف الفصل "${chapterTitle}"؟`)) {
                    chapterItem.remove();
                    renumberChapters();
                }
            });

            // Open editor for the new chapter
            newEditBtn.click();
        });

        // Delete Chapter
        const deleteChapterBtns = document.querySelectorAll('.delete-chapter');
        deleteChapterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const chapterId = this.getAttribute('data-chapter-id');
                const chapterItem = document.querySelector(`.chapter-item[data-chapter-id="${chapterId}"]`);
                const chapterTitle = chapterItem.querySelector('.chapter-title').textContent;

                if (confirm(`هل أنت متأكد من حذف الفصل "${chapterTitle}"؟`)) {
                    chapterItem.remove();
                    renumberChapters();
                }
            });
        });

        // Renumber chapters after deletion
        function renumberChapters() {
            const chapterItems = document.querySelectorAll('.chapter-item');
            chapterItems.forEach((item, index) => {
                const newNumber = index + 1;
                item.setAttribute('data-chapter-id', newNumber);
                item.querySelector('.chapter-number').textContent = newNumber;

                // Update data-chapter-id for buttons
                const editBtn = item.querySelector('.edit-chapter');
                const settingsBtn = item.querySelector('.settings-chapter');
                const deleteBtn = item.querySelector('.delete-chapter');

                editBtn.setAttribute('data-chapter-id', newNumber);
                settingsBtn.setAttribute('data-chapter-id', newNumber);
                deleteBtn.setAttribute('data-chapter-id', newNumber);
            });
        }

        // Chapter Toolbar Functionality
        const chapterTools = document.querySelectorAll('.chapter-tool');
        chapterTools.forEach(tool => {
            tool.addEventListener('click', function () {
                const action = this.title;
                const textarea = document.getElementById('chapter-content');
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selectedText = textarea.value.substring(start, end);
                let replacement = '';

                switch (action) {
                    case 'عريض':
                        replacement = `**${selectedText}**`;
                        break;
                    case 'مائل':
                        replacement = `*${selectedText}*`;
                        break;
                    case 'تحته خط':
                        replacement = `__${selectedText}__`;
                        break;
                    case 'محاذاة لليمين':
                        replacement = `<div style="text-align: right;">${selectedText}</div>`;
                        break;
                    case 'توسيط':
                        replacement = `<div style="text-align: center;">${selectedText}</div>`;
                        break;
                    case 'محاذاة لليسار':
                        replacement = `<div style="text-align: left;">${selectedText}</div>`;
                        break;
                    case 'قائمة نقطية':
                        replacement = selectedText.split('\n').map(line => `- ${line}`).join('\n');
                        break;
                    case 'قائمة رقمية':
                        replacement = selectedText.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n');
                        break;
                    case 'إدراج صورة':
                        replacement = '![وصف الصورة](رابط الصورة)';
                        break;
                    case 'إدراج رابط':
                        replacement = '[نص الرابط](الرابط)';
                        break;
                }

                textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
                textarea.focus();
                textarea.selectionStart = start;
                textarea.selectionEnd = start + replacement.length;
            });
        });

        // Initialize drag and drop for chapters (simplified implementation)
        let draggedItem = null;

        document.addEventListener('DOMContentLoaded', function () {
            const chapterItems = document.querySelectorAll('.chapter-item');
            const chapterList = document.getElementById('chapter-list');

            chapterItems.forEach(item => {
                const handle = item.querySelector('.chapter-reorder-handle');

                handle.addEventListener('mousedown', function () {
                    draggedItem = item;
                    item.style.opacity = '0.5';
                });
            });

            chapterList.addEventListener('mouseover', function (e) {
                if (!draggedItem) return;

                const target = e.target.closest('.chapter-item');
                if (!target || target === draggedItem) return;

                const targetRect = target.getBoundingClientRect();
                const targetMiddle = targetRect.top + targetRect.height / 2;

                if (e.clientY < targetMiddle) {
                    chapterList.insertBefore(draggedItem, target);
                } else {
                    chapterList.insertBefore(draggedItem, target.nextSibling);
                }

                renumberChapters();
            });

            document.addEventListener('mouseup', function () {
                if (draggedItem) {
                    draggedItem.style.opacity = '1';
                    draggedItem = null;
                    renumberChapters();
                }
            });
        });

        // Modal Functionality
        // Helper functions for modals
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.add('active');
            setTimeout(() => {
                modal.querySelector('.modal-container').classList.add('active');
            }, 10);
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.querySelector('.modal-container').classList.remove('active');
            setTimeout(() => {
                modal.classList.remove('active');
            }, 300);
        }

        // Categories Modal
        const addCategoriesBtn = document.getElementById('add-categories-btn');
        const categoriesModal = document.getElementById('categories-modal');
        const closeCategoriesModal = document.getElementById('close-categories-modal');
        const cancelCategories = document.getElementById('cancel-categories');
        const saveCategories = document.getElementById('save-categories');

        addCategoriesBtn.addEventListener('click', function () {
            openModal('categories-modal');
        });

        closeCategoriesModal.addEventListener('click', function () {
            closeModal('categories-modal');
        });

        cancelCategories.addEventListener('click', function () {
            closeModal('categories-modal');
        });

        saveCategories.addEventListener('click', function () {
            // Get selected categories
            const selectedCategories = [];
            document.querySelectorAll('.category-checkbox:checked').forEach(checkbox => {
                selectedCategories.push(checkbox.nextElementSibling.textContent);
            });

            if (selectedCategories.length > 0) {
                alert(`تم إضافة التصنيفات: ${selectedCategories.join(', ')}`);
            } else {
                alert('لم يتم اختيار أي تصنيفات');
            }

            closeModal('categories-modal');
        });

        // Hashtag Modal
        const addHashtagBtn = document.getElementById('add-hashtag-btn');
        const hashtagModal = document.getElementById('hashtag-modal');
        const closeHashtagModal = document.getElementById('close-hashtag-modal');
        const cancelHashtags = document.getElementById('cancel-hashtags');
        const saveHashtags = document.getElementById('save-hashtags');
        const hashtagInput = document.getElementById('hashtag-input');
        const selectedHashtags = document.getElementById('selected-hashtags');
        const popularHashtags = document.querySelectorAll('.popular-hashtag');

        // Add hashtag function
        function addHashtag(hashtag) {
            // Check if hashtag already exists
            const existingHashtags = Array.from(selectedHashtags.querySelectorAll('.hashtag-item')).map(item =>
                item.textContent.replace('×', '').trim()
            );

            if (existingHashtags.includes(hashtag)) {
                return;
            }

            const hashtagItem = document.createElement('div');
            hashtagItem.className = 'hashtag-item';
            hashtagItem.innerHTML = `${hashtag} <i class="fas fa-times"></i>`;

            // Add remove functionality
            hashtagItem.querySelector('i').addEventListener('click', function () {
                hashtagItem.remove();
            });

            selectedHashtags.appendChild(hashtagItem);
            hashtagInput.value = '';
        }

        addHashtagBtn.addEventListener('click', function () {
            openModal('hashtag-modal');
        });

        closeHashtagModal.addEventListener('click', function () {
            closeModal('hashtag-modal');
        });

        cancelHashtags.addEventListener('click', function () {
            closeModal('hashtag-modal');
        });

        // Add hashtag on enter
        hashtagInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const hashtag = this.value.trim();
                if (hashtag) {
                    addHashtag(hashtag);
                }
            }
        });

        // Add popular hashtags
        popularHashtags.forEach(tag => {
            tag.addEventListener('click', function () {
                const hashtag = this.getAttribute('data-hashtag');
                addHashtag(hashtag);
            });
        });

        saveHashtags.addEventListener('click', function () {
            const hashtags = Array.from(selectedHashtags.querySelectorAll('.hashtag-item')).map(item =>
                item.textContent.replace('×', '').trim()
            );

            if (hashtags.length > 0) {
                alert(`تم إضافة الهاشتاجات: ${hashtags.join(', ')}`);
            } else {
                alert('لم يتم إضافة أي هاشتاجات');
            }

            closeModal('hashtag-modal');
        });

        // Filter Modal
        const addFilterBtn = document.getElementById('add-filter-btn');
        const filterModal = document.getElementById('filter-modal');
        const closeFilterModal = document.getElementById('close-filter-modal');
        const cancelFilter = document.getElementById('cancel-filter');
        const saveFilter = document.getElementById('save-filter');
        const filterItems = document.querySelectorAll('.filter-item');
        const filterIntensitySlider = document.getElementById('filter-intensity-slider');
        const filterIntensityValue = document.getElementById('filter-intensity-value');

        // Update filter intensity value
        filterIntensitySlider.addEventListener('input', function () {
            filterIntensityValue.textContent = `${this.value}%`;
        });

        // Select filter
        filterItems.forEach(item => {
            item.addEventListener('click', function () {
                // Remove active class from all items
                filterItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
            });
        });

        addFilterBtn.addEventListener('click', function () {
            openModal('filter-modal');
        });

        closeFilterModal.addEventListener('click', function () {
            closeModal('filter-modal');
        });

        cancelFilter.addEventListener('click', function () {
            closeModal('filter-modal');
        });

        saveFilter.addEventListener('click', function () {
            const selectedFilter = document.querySelector('.filter-item.active');
            if (selectedFilter) {
                const filterName = selectedFilter.querySelector('.filter-name').textContent;
                const intensity = filterIntensitySlider.value;
                alert(`تم تطبيق فلتر "${filterName}" بشدة ${intensity}%`);
            } else {
                alert('يرجى اختيار فلتر أولاً');
            }

            closeModal('filter-modal');
        });

        // Location Modal
        const addLocationBtn = document.getElementById('add-location-btn');
        const locationModal = document.getElementById('location-modal');
        const closeLocationModal = document.getElementById('close-location-modal');
        const cancelLocation = document.getElementById('cancel-location');
        const saveLocation = document.getElementById('save-location');
        const locationItems = document.querySelectorAll('.location-item');
        const locationSearchInput = document.getElementById('location-search-input');

        // Select location
        locationItems.forEach(item => {
            item.addEventListener('click', function () {
                // Remove active class from all items
                locationItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
            });
        });

        // Filter locations on search
        locationSearchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            locationItems.forEach(item => {
                const locationName = item.querySelector('.location-name').textContent.toLowerCase();
                const locationAddress = item.querySelector('.location-address').textContent.toLowerCase();

                if (locationName.includes(searchTerm) || locationAddress.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        addLocationBtn.addEventListener('click', function () {
            openModal('location-modal');
        });

        closeLocationModal.addEventListener('click', function () {
            closeModal('location-modal');
        });

        cancelLocation.addEventListener('click', function () {
            closeModal('location-modal');
        });

        saveLocation.addEventListener('click', function () {
            const selectedLocation = document.querySelector('.location-item.active');
            if (selectedLocation) {
                const locationName = selectedLocation.querySelector('.location-name').textContent;
                alert(`تم إضافة الموقع: ${locationName}`);
            } else {
                alert('يرجى اختيار موقع أولاً');
            }

            closeModal('location-modal');
        });

        // Profile Picture and Banner Modal Functions
        // Variables to store selected images
        let selectedProfilePic = document.querySelector('.profile-avatar img').src;
        let selectedBanner = document.querySelector('.profile-banner').src;
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

        // Profile Modal Functions
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
            document.querySelector('.profile-avatar img').src = selectedProfilePic;
            closeProfileModal();
        });

        // Banner Modal Functions
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
            document.querySelector('.profile-banner').src = selectedBanner;
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

        // Close modals when clicking outside
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', function (e) {
                if (e.target === this) {
                    if (this.id === 'profile-modal') {
                        closeProfileModal();
                    } else if (this.id === 'banner-modal') {
                        closeBannerModal();
                    } else {
                        closeModal(this.id);
                    }
                }
            });
        });

        // Handle escape key to close modals
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const activeModals = document.querySelectorAll('.modal-overlay.active');
                activeModals.forEach(modal => {
                    if (modal.id === 'profile-modal') {
                        closeProfileModal();
                    } else if (modal.id === 'banner-modal') {
                        closeBannerModal();
                    } else {
                        closeModal(modal.id);
                    }
                });
            }
        });

        // Modal selections display in post creator
        function setupModalSelections() {
            // Categories Modal
            document.getElementById('save-categories').addEventListener('click', function () {
                const selectedCategories = [];
                document.querySelectorAll('.category-checkbox:checked').forEach(checkbox => {
                    selectedCategories.push(checkbox.nextElementSibling.textContent);
                });

                if (selectedCategories.length > 0) {
                    // Create categories display if it doesn't exist
                    let categoriesDisplay = document.getElementById('selected-categories-display');
                    if (!categoriesDisplay) {
                        categoriesDisplay = document.createElement('div');
                        categoriesDisplay.id = 'selected-categories-display';
                        categoriesDisplay.className = 'mt-4 flex flex-wrap gap-2';

                        // Find the right place to insert it based on active post type
                        const activePostContent = document.querySelector('.post-content.active');
                        const insertBeforeElement = activePostContent.querySelector('.post-form-actions');
                        activePostContent.insertBefore(categoriesDisplay, insertBeforeElement);
                    }

                    // Clear and populate categories display
                    categoriesDisplay.innerHTML = '<div class="w-full text-white mb-2 font-bold">التصنيفات المختارة:</div>';
                    selectedCategories.forEach(category => {
                        const categoryTag = document.createElement('div');
                        categoryTag.className = 'bg-accent/20 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2';
                        categoryTag.innerHTML = `
                            ${category}
                            <button class="text-xs hover:text-accent" onclick="this.parentElement.remove()">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        categoriesDisplay.appendChild(categoryTag);
                    });
                }
            });

            // Setup other modal selections
            setupHashtagDisplay();
            setupFilterDisplay();
            setupLocationDisplay();
        }

        function setupHashtagDisplay() {
            document.getElementById('save-hashtags').addEventListener('click', function () {
                const hashtags = Array.from(document.querySelectorAll('#selected-hashtags .hashtag-item')).map(item =>
                    item.textContent.replace('×', '').trim()
                );

                if (hashtags.length > 0) {
                    // Create hashtags display
                    let hashtagsDisplay = document.getElementById('selected-hashtags-display');
                    if (!hashtagsDisplay) {
                        hashtagsDisplay = document.createElement('div');
                        hashtagsDisplay.id = 'selected-hashtags-display';
                        hashtagsDisplay.className = 'mt-4 flex flex-wrap gap-2';

                        // Insert before post actions
                        const tweetContent = document.getElementById('tweet-post');
                        const insertBeforeElement = tweetContent.querySelector('.post-form-actions');
                        tweetContent.insertBefore(hashtagsDisplay, insertBeforeElement);
                    }

                    // Update display
                    hashtagsDisplay.innerHTML = '<div class="w-full text-white mb-2 font-bold">الهاشتاجات المختارة:</div>';
                    hashtags.forEach(hashtag => {
                        const hashtagTag = document.createElement('div');
                        hashtagTag.className = 'bg-accent/20 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2';
                        hashtagTag.innerHTML = `
                            #${hashtag}
                            <button class="text-xs hover:text-accent" onclick="this.parentElement.remove()">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        hashtagsDisplay.appendChild(hashtagTag);
                    });

                    // Add hashtags to tweet content
                    const tweetContent = document.getElementById('tweet-content');
                    if (tweetContent) {
                        let content = tweetContent.value;
                        const hashtagsText = hashtags.map(h => `#${h}`).join(' ');

                        if (!content.includes(hashtagsText)) {
                            if (content && !content.endsWith(' ')) content += ' ';
                            content += hashtagsText;
                            tweetContent.value = content;
                        }
                    }
                }
            });
        }

        function setupFilterDisplay() {
            document.getElementById('save-filter').addEventListener('click', function () {
                const selectedFilter = document.querySelector('.filter-item.active');

                if (selectedFilter) {
                    const filterName = selectedFilter.getAttribute('data-filter');
                    const intensity = document.getElementById('filter-intensity-slider').value;

                    // Create or update filter display
                    let filterDisplay = document.getElementById('selected-filter-display');
                    if (!filterDisplay) {
                        filterDisplay = document.createElement('div');
                        filterDisplay.id = 'selected-filter-display';
                        filterDisplay.className = 'mt-4 bg-darker p-3 rounded-lg';

                        // Insert before post actions
                        const mediaPost = document.getElementById('media-post');
                        const insertBeforeElement = mediaPost.querySelector('.post-form-actions');
                        mediaPost.insertBefore(filterDisplay, insertBeforeElement);
                    }

                    // Set filter info
                    filterDisplay.innerHTML = `
                        <div class="flex justify-between items-center">
                            <div class="text-white font-bold">الفلتر المطبق:</div>
                            <button class="text-accent hover:text-white" onclick="removeFilter()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="flex items-center gap-3 mt-2">
                            <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                <i class="fas fa-filter text-accent"></i>
                            </div>
                            <div>
                                <div class="text-white">${selectedFilter.querySelector('.filter-name').textContent}</div>
                                <div class="text-gray-400 text-sm">شدة الفلتر: ${intensity}%</div>
                            </div>
                        </div>
                    `;

                    // Apply filter to media preview
                    applyFilterToMediaPreview(filterName, intensity);
                }
            });
        }

        function setupLocationDisplay() {
            document.getElementById('save-location').addEventListener('click', function () {
                const selectedLocation = document.querySelector('.location-item.active');

                if (selectedLocation) {
                    const locationId = selectedLocation.getAttribute('data-location-id');
                    const locationName = selectedLocation.querySelector('.location-name').textContent;
                    const locationAddress = selectedLocation.querySelector('.location-address').textContent;

                    // Create location display
                    let locationDisplay = document.getElementById('selected-location-display');
                    if (!locationDisplay) {
                        locationDisplay = document.createElement('div');
                        locationDisplay.id = 'selected-location-display';
                        locationDisplay.className = 'mt-4 bg-darker p-3 rounded-lg';

                        // Insert before post actions
                        const mediaPost = document.getElementById('media-post');
                        const insertBeforeElement = mediaPost.querySelector('.post-form-actions');
                        mediaPost.insertBefore(locationDisplay, insertBeforeElement);
                    }

                    // Set location info
                    locationDisplay.innerHTML = `
                        <div class="flex justify-between items-center">
                            <div class="text-white font-bold">الموقع:</div>
                            <button class="text-accent hover:text-white" onclick="document.getElementById('selected-location-display').remove()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="flex items-center gap-3 mt-2">
                            <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                <i class="fas fa-map-marker-alt text-accent"></i>
                            </div>
                            <div>
                                <div class="text-white">${locationName}</div>
                                <div class="text-gray-400 text-sm">${locationAddress}</div>
                            </div>
                        </div>
                    `;
                }
            });
        }

        // Function to apply filter to media preview
        function applyFilterToMediaPreview(filterName, intensity) {
            const mediaPreviewContainer = document.getElementById('media-file-preview');
            if (!mediaPreviewContainer) return;

            // Find image inside container
            let mediaPreview = mediaPreviewContainer.querySelector('img');
            if (!mediaPreview) {
                // Check if there's a file selected
                const mediaFileInput = document.getElementById('media-file-input');
                if (mediaFileInput && mediaFileInput.files && mediaFileInput.files[0]) {
                    // Create new image element
                    const file = mediaFileInput.files[0];
                    const imageUrl = URL.createObjectURL(file);

                    // Clear container
                    while (mediaPreviewContainer.firstChild) {
                        mediaPreviewContainer.removeChild(mediaPreviewContainer.firstChild);
                    }

                    // Add image
                    mediaPreview = document.createElement('img');
                    mediaPreview.src = imageUrl;
                    mediaPreview.alt = 'صورة المنشور';
                    mediaPreview.id = 'media-preview-image';
                    mediaPreviewContainer.appendChild(mediaPreview);

                    // Apply filter
                    applyFilterStyle(mediaPreview, filterName, intensity);

                    // Add overlay with actions
                    addMediaPreviewOverlay(mediaPreviewContainer);
                    return;
                }
            } else {
                // Apply filter to existing image
                applyFilterStyle(mediaPreview, filterName, intensity);
            }
        }

        // Function to apply filter style
        function applyFilterStyle(element, filterName, intensity) {
            if (!element) return;

            let filterStyle = '';
            const intensityValue = parseInt(intensity);

            switch (filterName) {
                case 'normal':
                    filterStyle = 'none';
                    break;
                case 'noir':
                    filterStyle = `grayscale(${intensityValue}%) contrast(${100 + intensityValue * 0.2}%)`;
                    break;
                case 'vintage':
                    filterStyle = `sepia(${intensityValue}%) contrast(${100 + intensityValue * 0.1}%)`;
                    break;
                case 'dramatic':
                    filterStyle = `contrast(${100 + intensityValue * 0.5}%) saturate(${100 + intensityValue * 0.1}%)`;
                    break;
                case 'horror':
                    filterStyle = `contrast(${100 + intensityValue * 0.2}%) brightness(${100 - intensityValue * 0.2}%) saturate(${100 + intensityValue * 0.2}%)`;
                    break;
                case 'cold':
                    filterStyle = `saturate(${100 - intensityValue * 0.2}%) hue-rotate(${intensityValue * 1.8}deg)`;
                    break;
                default:
                    filterStyle = 'none';
            }

            element.style.filter = filterStyle;
        }

        // Function to add overlay to media preview
        function addMediaPreviewOverlay(container) {
            const overlay = document.createElement('div');
            overlay.className = 'media-preview-overlay';

            const actions = document.createElement('div');
            actions.className = 'media-preview-actions';

            const changeAction = document.createElement('div');
            changeAction.className = 'media-preview-action';
            changeAction.innerHTML = '<i class="fas fa-exchange-alt"></i>';
            changeAction.addEventListener('click', (e) => {
                e.stopPropagation();
                document.getElementById('media-file-input').click();
            });

            const removeAction = document.createElement('div');
            removeAction.className = 'media-preview-action';
            removeAction.innerHTML = '<i class="fas fa-trash"></i>';
            removeAction.addEventListener('click', (e) => {
                e.stopPropagation();
                resetMediaFilePreview();
            });

            actions.appendChild(changeAction);
            actions.appendChild(removeAction);
            overlay.appendChild(actions);
            container.appendChild(overlay);
        }

        // Function to remove filter
        function removeFilter() {
            // Remove filter display
            const filterDisplay = document.getElementById('selected-filter-display');
            if (filterDisplay) {
                filterDisplay.remove();
            }

            // Remove filter from image
            const mediaPreview = document.querySelector('#media-file-preview img');
            if (mediaPreview) {
                mediaPreview.style.filter = 'none';
            }
        }

        // Initialize modal selections
        document.addEventListener('DOMContentLoaded', function () {
            setupModalSelections();

            // Add event listener for media file input to handle filter application
            const mediaFileInput = document.getElementById('media-file-input');
            if (mediaFileInput) {
                mediaFileInput.addEventListener('change', function () {
                    // Check if there's a filter applied and reapply it
                    const filterDisplay = document.getElementById('selected-filter-display');
                    if (filterDisplay) {
                        // Get active filter from modal
                        const selectedFilter = document.querySelector('.filter-item.active');
                        if (selectedFilter) {
                            const filterName = selectedFilter.getAttribute('data-filter');
                            const intensity = document.getElementById('filter-intensity-slider').value;

                            // Wait for image to load before applying filter
                            setTimeout(() => {
                                applyFilterToMediaPreview(filterName, intensity);
                            }, 100);
                        }
                    }
                });
            }
        });
    