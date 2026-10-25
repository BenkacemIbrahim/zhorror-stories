// Z Horror - behaviour for components/header-authenticated.html
// Extracted verbatim from the page's original inline <script> block.
        // Sample data for search functionality
        const searchData = {
            stories: [
                { id: 1, title: "ليلة الأشباح", category: "قصص", type: "رعب", image: "https://i.pinimg.com/736x/73/56/47/735647015e3a1bdc9bf8877250e4e70d.jpg", description: "قصة مرعبة عن منزل مسكون بالأشباح في قرية مهجورة" },
                { id: 2, title: "الغابة المسكونة", category: "قصص", type: "رعب نفسي", image: "https://i.pinimg.com/564x/a5/9f/8b/a59f8b72a3c6e01be8c0c0c0c0c0c0c0.jpg", description: "مجموعة من الأصدقاء يضيعون في غابة غامضة تخفي أسرارًا مظلمة" },
                { id: 3, title: "صرخة في الظلام", category: "قصص", type: "رعب خارق للطبيعة", image: "https://i.pinimg.com/564x/b6/7f/8c/b67f8c7c7c7c7c7c7c7c7c7c7c7c7c7c.jpg", description: "شاب يكتشف قدرات غريبة بعد حادث مروع يغير حياته للأبد" },
                { id: 4, title: "الوجه الآخر", category: "قصص", type: "رعب نفسي", image: "https://i.pinimg.com/564x/c7/8f/9d/c78f9d8d8d8d8d8d8d8d8d8d8d8d8d8d.jpg", description: "طبيب نفسي يكتشف أن مريضه يخفي شخصية مظلمة وخطيرة" }
            ],
            games: [
                { id: 5, title: "أرض الموتى", category: "ألعاب", type: "رعب بقاء", image: "https://i.pinimg.com/564x/d8/9f/0e/d89f0e0e0e0e0e0e0e0e0e0e0e0e0e0e.jpg", description: "لعبة رعب بقاء في عالم مليء بالزومبي والمخلوقات المرعبة" },
                { id: 6, title: "الممر المظلم", category: "ألعاب", type: "رعب نفسي", image: "https://i.pinimg.com/564x/e9/0f/1f/e90f1f1f1f1f1f1f1f1f1f1f1f1f1f1f.jpg", description: "استكشف مستشفى نفسي مهجور مليء بالأسرار والذكريات المرعبة" },
                { id: 7, title: "صدى الخوف", category: "ألعاب", type: "رعب بقاء", image: "https://i.pinimg.com/564x/f0/1f/2g/f01f2g2g2g2g2g2g2g2g2g2g2g2g2g.jpg", description: "واجه مخاوفك في قرية معزولة تسكنها مخلوقات غريبة" }
            ],
            news: [
                { id: 8, title: "إعلان عن فيلم رعب جديد", category: "أخبار", type: "سينما", image: "https://i.pinimg.com/564x/g1/2f/3h/g12f3h3h3h3h3h3h3h3h3h3h3h3h3h.jpg", description: "كشف النقاب عن فيلم رعب جديد من إخراج مخرج شهير" },
                { id: 9, title: "مسلسل رعب قادم على نتفليكس", category: "أخبار", type: "تلفزيون", image: "https://i.pinimg.com/564x/h2/3f/4i/h23f4i4i4i4i4i4i4i4i4i4i4i4i4i.jpg", description: "نتفليكس تعلن عن مسلسل رعب جديد مقتبس من رواية شهيرة" }
            ],
            characters: [
                { id: 10, title: "الساحرة الشريرة", category: "شخصيات", type: "خيالي", image: "https://i.pinimg.com/564x/i3/4f/5j/i34f5j5j5j5j5j5j5j5j5j5j5j5j5j.jpg", description: "شخصية ساحرة شريرة من قصص الرعب الكلاسيكية" },
                { id: 11, title: "مصاص الدماء الخالد", category: "شخصيات", type: "خيالي", image: "https://i.pinimg.com/564x/j4/5f/6k/j45f6k6k6k6k6k6k6k6k6k6k6k6k.jpg", description: "شخصية مصاص دماء عمره مئات السنين ويبحث عن ضحايا جدد" }
            ]
        };

        // Suggestions based on input
        const suggestions = {
            "ر": ["رعب", "رواية", "رعب نفسي", "رعب خارق للطبيعة"],
            "رع": ["رعب", "رعب نفسي", "رعب خارق للطبيعة"],
            "قص": ["قصص", "قصص رعب", "قصص قصيرة", "قصص مرعبة"],
            "قصص": ["قصص رعب", "قصص قصيرة", "قصص مرعبة", "قصص خيالية"],
            "لع": ["لعبة", "لعبة رعب", "لعبة بقاء", "لعبة مغامرات"],
            "م": ["مصاص دماء", "مستذئب", "مخلوقات", "مسلسل رعب"],
            "مص": ["مصاص دماء", "مصير مظلم", "مصيدة الأرواح"],
            "ش": ["شبح", "شياطين", "شخصيات رعب", "شر مطلق"],
            "ج": ["جن", "جثة", "جريمة", "جنون"],
            "أ": ["أشباح", "أرواح", "أساطير", "أفلام رعب"],
            "خ": ["خوف", "خيال", "خارق للطبيعة", "خطر"]
        };

        document.addEventListener('DOMContentLoaded', function () {
            const searchInput = document.getElementById('searchInput');
            const searchSuggestions = document.getElementById('searchSuggestions');
            const liveSuggestions = document.getElementById('liveSuggestions');
            const searchResults = document.getElementById('searchResults');
            const resultsContainer = document.getElementById('resultsContainer');
            const searchLoading = document.getElementById('searchLoading');
            const searchFilters = document.querySelectorAll('.search-filter');
            const contentBlurOverlay = document.getElementById('contentBlurOverlay');

            // Initialize search filters
            searchFilters[0].classList.add('active');

            // Toggle search suggestions visibility
            searchInput.addEventListener('focus', function () {
                searchSuggestions.classList.add('active');
            });

            // Handle input changes for live suggestions
            searchInput.addEventListener('input', function () {
                const query = this.value.trim();

                if (query.length > 0) {
                    searchLoading.classList.remove('hidden');

                    setTimeout(() => {
                        searchLoading.classList.add('hidden');
                        liveSuggestions.classList.remove('hidden');
                        const suggestionsContainer = liveSuggestions.querySelector('.grid');
                        suggestionsContainer.innerHTML = '';

                        let matchedSuggestions = [];
                        for (const prefix in suggestions) {
                            if (query.startsWith(prefix)) {
                                matchedSuggestions = suggestions[prefix];
                                break;
                            }
                        }

                        if (matchedSuggestions.length === 0) {
                            for (const prefix in suggestions) {
                                if (prefix.includes(query) || query.includes(prefix)) {
                                    matchedSuggestions = suggestions[prefix];
                                    break;
                                }
                            }
                        }

                        if (matchedSuggestions.length > 0) {
                            matchedSuggestions.forEach(suggestion => {
                                const suggestionItem = document.createElement('div');
                                suggestionItem.className = 'suggestion-item flex items-center bg-dark/30 px-4 py-3 rounded-lg cursor-pointer';
                                suggestionItem.innerHTML = `
                                    <i class="fas fa-search text-gray-500 ml-3"></i>
                                    <span class="text-white">${suggestion}</span>
                                `;
                                suggestionItem.addEventListener('click', function () {
                                    searchInput.value = suggestion;
                                    performSearch(suggestion);
                                });
                                suggestionsContainer.appendChild(suggestionItem);
                            });
                        } else {
                            const noSuggestions = document.createElement('div');
                            noSuggestions.className = 'text-gray-400 px-4 py-3';
                            noSuggestions.textContent = 'لا توجد اقتراحات متطابقة';
                            suggestionsContainer.appendChild(noSuggestions);
                        }
                    }, 500);
                } else {
                    liveSuggestions.classList.add('hidden');
                    searchResults.classList.add('hidden');
                }
            });

            // Search button click
            document.getElementById('searchButton').addEventListener('click', function () {
                const query = searchInput.value.trim();
                if (query.length > 0) {
                    performSearch(query);
                }
            });

            // Enter key press in search input
            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    const query = this.value.trim();
                    if (query.length > 0) {
                        performSearch(query);
                    }
                }
            });

            // Filter buttons
            searchFilters.forEach(filter => {
                filter.addEventListener('click', function () {
                    searchFilters.forEach(f => f.classList.remove('active'));
                    this.classList.add('active');

                    const filterType = this.getAttribute('data-filter');
                    const query = searchInput.value.trim();

                    if (query.length > 0) {
                        performSearch(query, filterType);
                    }
                });
            });

            // Search history item removal
            document.querySelectorAll('.search-history-remove').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.parentElement.remove();
                });
            });

            // Search history item click
            document.querySelectorAll('.search-history-item').forEach(item => {
                item.addEventListener('click', function () {
                    const query = this.querySelector('span').textContent;
                    searchInput.value = query;
                    performSearch(query);
                });
            });

            // Perform search function
            function performSearch(query, filterType = 'all') {
                searchLoading.classList.remove('hidden');
                searchResults.classList.add('hidden');
                liveSuggestions.classList.add('hidden');

                setTimeout(() => {
                    searchLoading.classList.add('hidden');
                    searchResults.classList.remove('hidden');
                    resultsContainer.innerHTML = '';

                    let results = [];
                    if (filterType === 'all') {
                        Object.values(searchData).forEach(category => {
                            results = results.concat(category.filter(item =>
                                item.title.includes(query) ||
                                item.description.includes(query) ||
                                item.type.includes(query) ||
                                item.category.includes(query)
                            ));
                        });
                    } else {
                        results = searchData[filterType]?.filter(item =>
                            item.title.includes(query) ||
                            item.description.includes(query) ||
                            item.type.includes(query)
                        ) || [];
                    }

                    if (results.length > 0) {
                        results.forEach((result, index) => {
                            const resultCard = document.createElement('div');
                            resultCard.className = 'search-result bg-dark/50 rounded-lg overflow-hidden border border-gray-800/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group';
                            resultCard.style.setProperty('--delay', index);

                            resultCard.innerHTML = `
                                <div class="relative overflow-hidden">
                                    <img src="${result.image}" alt="${result.title}" class="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110">
                                    <div class="absolute top-2 right-2 bg-accent/80 text-white text-xs px-2 py-1 rounded-full">${result.category}</div>
                                    <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                                </div>
                                <div class="p-4">
                                    <div class="flex items-center justify-between mb-2">
                                        <h3 class="text-white font-bold text-lg group-hover:text-accent transition-colors duration-300">${result.title}</h3>
                                        <span class="text-xs bg-dark/70 text-gray-300 px-2 py-1 rounded">${result.type}</span>
                                    </div>
                                    <p class="text-gray-400 text-sm mb-3 line-clamp-2">${result.description}</p>
                                    <a href="#" class="text-accent hover:text-white text-sm font-bold transition-colors duration-300 flex items-center">
                                        <span>عرض المزيد</span>
                                        <i class="fas fa-arrow-left mr-2"></i>
                                    </a>
                                </div>
                            `;

                            resultsContainer.appendChild(resultCard);
                            setTimeout(() => {
                                resultCard.classList.add('active');
                            }, 50 * index);
                        });
                    } else {
                        const noResults = document.createElement('div');
                        noResults.className = 'col-span-full text-center py-8';
                        noResults.innerHTML = `
                            <div class="text-accent text-5xl mb-4"><i class="fas fa-search"></i></div>
                            <h3 class="text-white text-xl font-bold mb-2">لا توجد نتائج لـ "${query}"</h3>
                            <p class="text-gray-400">حاول استخدام كلمات مفتاحية مختلفة أو تصفح الفئات المقترحة</p>
                        `;
                        resultsContainer.appendChild(noResults);
                    }

                    const searchHistory = document.getElementById('searchHistory');
                    const historyItems = searchHistory.querySelectorAll('.search-history-item span');
                    let exists = false;

                    historyItems.forEach(item => {
                        if (item.textContent === query) {
                            exists = true;
                        }
                    });

                    if (!exists) {
                        const historyItem = document.createElement('div');
                        historyItem.className = 'search-history-item flex items-center justify-between bg-dark/30 px-4 py-3 rounded-lg';
                        historyItem.innerHTML = `
                            <div class="flex items-center">
                                <i class="fas fa-history text-gray-500 ml-3"></i>
                                <span class="text-white">${query}</span>
                            </div>
                            <button class="search-history-remove text-gray-500 hover:text-accent">
                                <i class="fas fa-times"></i>
                            </button>
                        `;

                        historyItem.addEventListener('click', function () {
                            searchInput.value = query;
                            performSearch(query);
                        });

                        historyItem.querySelector('.search-history-remove').addEventListener('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            this.parentElement.remove();
                        });

                        searchHistory.prepend(historyItem);
                        if (searchHistory.children.length > 5) {
                            searchHistory.removeChild(searchHistory.lastChild);
                        }
                    }
                }, 800);
            }

            // Function to toggle content blur and disable scrolling
            function toggleContentBlur(show) {
                if (show) {
                    contentBlurOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    contentBlurOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }

            // Function to close mobile menu
            function closeMobileMenu() {
                const hamburgerIcon = document.querySelector('#mobileMenuToggle .hamburger-icon');
                const mobileMenu = document.getElementById('mobileMenu');
                const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

                if (mobileMenu.classList.contains('active')) {
                    hamburgerIcon.classList.remove('open');
                    mobileMenu.classList.remove('active');
                    setTimeout(() => {
                        mobileMenuOverlay.classList.add('hidden');
                    }, 300);
                }
            }

            // Browse menu toggle with mobile menu close
            document.getElementById('browseToggle').addEventListener('click', function () {
                const megaMenu = document.getElementById('browseMegaMenu');
                const communityMenu = document.getElementById('communityMenu');
                const writeMenu = document.getElementById('writeMenu');

                if (communityMenu.classList.contains('active')) {
                    communityMenu.classList.remove('active');
                }
                if (writeMenu.classList.contains('active')) {
                    writeMenu.classList.remove('active');
                }

                const isActive = megaMenu.classList.toggle('active');
                toggleContentBlur(isActive);

                closeMobileMenu(); // Close mobile menu if open
                if (document.getElementById('searchBar').classList.contains('active')) {
                    document.getElementById('searchBar').classList.remove('active');
                }
                if (document.getElementById('profileMenu').classList.contains('active')) {
                    document.getElementById('profileMenu').classList.remove('active');
                    document.getElementById('profileMenu').classList.add('hidden');
                }
            });

            // Community menu toggle with mobile menu close
            document.getElementById('communityToggle').addEventListener('click', function (e) {
                e.stopPropagation();
                const communityMenu = document.getElementById('communityMenu');
                const megaMenu = document.getElementById('browseMegaMenu');
                const writeMenu = document.getElementById('writeMenu');

                const rect = this.getBoundingClientRect();
                communityMenu.style.right = (window.innerWidth - rect.right) + 'px';
                communityMenu.style.left = 'auto';

                if (megaMenu.classList.contains('active')) {
                    megaMenu.classList.remove('active');
                }
                if (writeMenu.classList.contains('active')) {
                    writeMenu.classList.remove('active');
                }

                const isActive = communityMenu.classList.toggle('active');
                toggleContentBlur(isActive);

                closeMobileMenu(); // Close mobile menu if open
                if (document.getElementById('searchBar').classList.contains('active')) {
                    document.getElementById('searchBar').classList.remove('active');
                }
                if (document.getElementById('profileMenu').classList.contains('active')) {
                    document.getElementById('profileMenu').classList.remove('active');
                    document.getElementById('profileMenu').classList.add('hidden');
                }
            });

            // Write menu toggle with mobile menu close
            document.getElementById('writeToggle').addEventListener('click', function (e) {
                e.stopPropagation();
                const writeMenu = document.getElementById('writeMenu');
                const megaMenu = document.getElementById('browseMegaMenu');
                const communityMenu = document.getElementById('communityMenu');

                const rect = this.getBoundingClientRect();
                writeMenu.style.right = (window.innerWidth - rect.right) + 'px';
                writeMenu.style.left = 'auto';

                if (megaMenu.classList.contains('active')) {
                    megaMenu.classList.remove('active');
                }
                if (communityMenu.classList.contains('active')) {
                    communityMenu.classList.remove('active');
                }

                const isActive = writeMenu.classList.toggle('active');
                toggleContentBlur(isActive);

                closeMobileMenu(); // Close mobile menu if open
                if (document.getElementById('searchBar').classList.contains('active')) {
                    document.getElementById('searchBar').classList.remove('active');
                }
                if (document.getElementById('profileMenu').classList.contains('active')) {
                    document.getElementById('profileMenu').classList.remove('active');
                    document.getElementById('profileMenu').classList.add('hidden');
                }
            });

            // Search toggle with mobile menu close
            document.getElementById('searchToggle').addEventListener('click', function () {
                const searchBar = document.getElementById('searchBar');
                const megaMenu = document.getElementById('browseMegaMenu');
                const communityMenu = document.getElementById('communityMenu');
                const writeMenu = document.getElementById('writeMenu');

                if (megaMenu.classList.contains('active')) {
                    megaMenu.classList.remove('active');
                }
                if (communityMenu.classList.contains('active')) {
                    communityMenu.classList.remove('active');
                }
                if (writeMenu.classList.contains('active')) {
                    writeMenu.classList.remove('active');
                }

                const isActive = searchBar.classList.toggle('active');
                toggleContentBlur(isActive);

                closeMobileMenu(); // Close mobile menu if open
                if (document.getElementById('profileMenu').classList.contains('active')) {
                    document.getElementById('profileMenu').classList.remove('active');
                    document.getElementById('profileMenu').classList.add('hidden');
                }

                if (searchBar.classList.contains('active')) {
                    searchBar.querySelector('input').focus();
                }
            });

            // Close search with blur removal
            document.getElementById('closeSearch').addEventListener('click', function () {
                document.getElementById('searchBar').classList.remove('active');
                toggleContentBlur(false);
            });

            // Mobile menu toggle with closing other menus
            document.getElementById('mobileMenuToggle').addEventListener('click', function () {
                const hamburgerIcon = this.querySelector('.hamburger-icon');
                hamburgerIcon.classList.toggle('open');
                const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

                if (document.getElementById('mobileMenu').classList.contains('active')) {
                    document.getElementById('mobileMenu').classList.remove('active');
                    setTimeout(() => {
                        mobileMenuOverlay.classList.add('hidden');
                        toggleContentBlur(false);
                    }, 300);
                } else {
                    mobileMenuOverlay.classList.remove('hidden');
                    document.getElementById('mobileMenu').classList.add('active');
                    toggleContentBlur(true);

                    // Close other menus when mobile menu opens
                    document.getElementById('browseMegaMenu').classList.remove('active');
                    document.getElementById('communityMenu').classList.remove('active');
                    document.getElementById('writeMenu').classList.remove('active');
                    document.getElementById('searchBar').classList.remove('active');
                    const profileMenu = document.getElementById('profileMenu');
                    if (profileMenu.classList.contains('active')) {
                        profileMenu.classList.remove('active');
                        profileMenu.classList.add('hidden');
                    }
                }
            });

            // Close mobile menu button
            document.getElementById('closeMobileMenu').addEventListener('click', function () {
                const hamburgerIcon = document.querySelector('#mobileMenuToggle .hamburger-icon');
                hamburgerIcon.classList.remove('open');
                document.getElementById('mobileMenu').classList.remove('active');
                setTimeout(() => {
                    document.getElementById('mobileMenuOverlay').classList.add('hidden');
                    toggleContentBlur(false);
                }, 300);
            });

            // Mobile menu overlay click with blur removal
            document.getElementById('mobileMenuOverlay').addEventListener('click', function (e) {
                if (e.target === this) {
                    const hamburgerIcon = document.querySelector('#mobileMenuToggle .hamburger-icon');
                    hamburgerIcon.classList.remove('open');
                    document.getElementById('mobileMenu').classList.remove('active');
                    setTimeout(() => {
                        this.classList.add('hidden');
                        toggleContentBlur(false);
                    }, 300);
                }
            });

            // Profile menu toggle with mobile menu close
            document.getElementById('profileToggle').addEventListener('click', function () {
                const profileMenu = document.getElementById('profileMenu');
                const megaMenu = document.getElementById('browseMegaMenu');
                const communityMenu = document.getElementById('communityMenu');
                const writeMenu = document.getElementById('writeMenu');
                const searchBar = document.getElementById('searchBar');

                if (megaMenu.classList.contains('active')) {
                    megaMenu.classList.remove('active');
                }
                if (communityMenu.classList.contains('active')) {
                    communityMenu.classList.remove('active');
                }
                if (writeMenu.classList.contains('active')) {
                    writeMenu.classList.remove('active');
                }
                if (searchBar.classList.contains('active')) {
                    searchBar.classList.remove('active');
                }

                profileMenu.classList.toggle('hidden');
                const isActive = profileMenu.classList.toggle('active');
                toggleContentBlur(isActive);

                closeMobileMenu(); // Close mobile menu if open

                if (profileMenu.classList.contains('active')) {
                    setTimeout(() => {
                        const sections = document.querySelectorAll('.profile-section');
                        sections.forEach((section) => {
                            const delay = parseInt(section.dataset.delay) || 0;
                            setTimeout(() => section.classList.add('active'), delay);
                        });
                    }, 300);
                }
            });

            // Close profile menu with blur removal
            document.getElementById('closeProfileMenu').addEventListener('click', function () {
                const profileMenu = document.getElementById('profileMenu');
                const sections = document.querySelectorAll('.profile-section');
                sections.forEach(section => section.classList.remove('active'));
                setTimeout(() => {
                    profileMenu.classList.remove('active');
                    setTimeout(() => {
                        profileMenu.classList.add('hidden');
                        toggleContentBlur(false);
                    }, 300);
                }, 0);
            });

            // Prevent profile menu clicks from closing
            document.getElementById('profileMenu').addEventListener('click', function (e) {
                e.stopPropagation();
            });

            // Content blur overlay click handler to close all menus
            contentBlurOverlay.addEventListener('click', function () {
                const megaMenu = document.getElementById('browseMegaMenu');
                const communityMenu = document.getElementById('communityMenu');
                const writeMenu = document.getElementById('writeMenu');
                const searchBar = document.getElementById('searchBar');
                const profileMenu = document.getElementById('profileMenu');
                const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

                if (megaMenu.classList.contains('active')) {
                    megaMenu.classList.remove('active');
                }

                if (communityMenu.classList.contains('active')) {
                    communityMenu.classList.remove('active');
                }

                if (writeMenu.classList.contains('active')) {
                    writeMenu.classList.remove('active');
                }

                if (searchBar.classList.contains('active')) {
                    searchBar.classList.remove('active');
                }

                if (profileMenu.classList.contains('active')) {
                    const sections = document.querySelectorAll('.profile-section');
                    sections.forEach(section => section.classList.remove('active'));
                    setTimeout(() => {
                        profileMenu.classList.remove('active');
                        setTimeout(() => {
                            profileMenu.classList.add('hidden');
                        }, 300);
                    }, 100);
                }

                if (!mobileMenuOverlay.classList.contains('hidden')) {
                    const hamburgerIcon = document.querySelector('#mobileMenuToggle .hamburger-icon');
                    hamburgerIcon.classList.remove('open');
                    document.getElementById('mobileMenu').classList.remove('active');
                    setTimeout(() => {
                        mobileMenuOverlay.classList.add('hidden');
                    }, 300);
                }

                toggleContentBlur(false);
            });

            // Document click handler to close menus
            document.addEventListener('click', function (e) {
                const megaMenu = document.getElementById('browseMegaMenu');
                const communityMenu = document.getElementById('communityMenu');
                const writeMenu = document.getElementById('writeMenu');
                const searchBar = document.getElementById('searchBar');
                const profileMenu = document.getElementById('profileMenu');
                let menuOpen = false;

                if (megaMenu.classList.contains('active') && !e.target.closest('#browseMegaMenu') && !e.target.closest('#browseToggle')) {
                    megaMenu.classList.remove('active');
                    menuOpen = false;
                } else if (megaMenu.classList.contains('active')) {
                    menuOpen = true;
                }

                if (communityMenu.classList.contains('active') && !e.target.closest('#communityMenu') && !e.target.closest('#communityToggle')) {
                    communityMenu.classList.remove('active');
                    menuOpen = false;
                } else if (communityMenu.classList.contains('active')) {
                    menuOpen = true;
                }

                if (writeMenu.classList.contains('active') && !e.target.closest('#writeMenu') && !e.target.closest('#writeToggle')) {
                    writeMenu.classList.remove('active');
                    menuOpen = false;
                } else if (writeMenu.classList.contains('active')) {
                    menuOpen = true;
                }

                if (searchBar.classList.contains('active') && !e.target.closest('#searchBar') && !e.target.closest('#searchToggle')) {
                    searchBar.classList.remove('active');
                    menuOpen = false;
                } else if (searchBar.classList.contains('active')) {
                    menuOpen = true;
                }

                if (profileMenu.classList.contains('active') && !e.target.closest('#profileMenu') && !e.target.closest('#profileToggle')) {
                    const sections = document.querySelectorAll('.profile-section');
                    sections.forEach(section => section.classList.remove('active'));
                    setTimeout(() => {
                        profileMenu.classList.remove('active');
                        setTimeout(() => {
                            profileMenu.classList.add('hidden');
                        }, 300);
                    }, 100);
                    menuOpen = false;
                } else if (profileMenu.classList.contains('active')) {
                    menuOpen = true;
                }

                toggleContentBlur(menuOpen);
            });

            // Submenu toggle functionality for mobile menu
            document.querySelectorAll('[data-submenu-id]').forEach(button => {
                button.addEventListener('click', function () {
                    const submenuId = this.getAttribute('data-submenu-id');
                    const submenu = document.getElementById(submenuId);
                    const icon = this.querySelector('i');

                    submenu.classList.toggle('active');
                    icon.style.transform = submenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                });
            });

            // Initialize the hamburger menu visibility based on screen size
            function initializeMenuVisibility() {
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                if (window.innerWidth <= 1024) {
                    mobileMenuToggle.classList.remove('hidden');
                } else {
                    mobileMenuToggle.classList.add('hidden');
                }
            }

            initializeMenuVisibility();
            window.addEventListener('resize', initializeMenuVisibility);
        });
    