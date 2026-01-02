// Centralized Navigation Menu System
// Detects current page context and builds menu dynamically

(function() {
    'use strict';

    // Page mapping configuration
    const pageMap = {
        // English pages
        'index.html': { book: 'genesis', type: 'characters', lang: 'en' },
        'events.html': { book: 'genesis', type: 'events', lang: 'en' },
        'exodus.html': { book: 'exodus', type: 'characters', lang: 'en' },
        'exodus-events.html': { book: 'exodus', type: 'events', lang: 'en' },
        'leviticus.html': { book: 'leviticus', type: 'characters', lang: 'en' },
        'leviticus-events.html': { book: 'leviticus', type: 'events', lang: 'en' },
        'numbers.html': { book: 'numbers', type: 'characters', lang: 'en' },
        'numbers-events.html': { book: 'numbers', type: 'events', lang: 'en' },
        'deuteronomy.html': { book: 'deuteronomy', type: 'characters', lang: 'en' },
        'deuteronomy-events.html': { book: 'deuteronomy', type: 'events', lang: 'en' },
        'joshua.html': { book: 'joshua', type: 'characters', lang: 'en' },
        'joshua-events.html': { book: 'joshua', type: 'events', lang: 'en' },
        'judges.html': { book: 'judges', type: 'characters', lang: 'en' },
        'judges-events.html': { book: 'judges', type: 'events', lang: 'en' },
        'ruth.html': { book: 'ruth', type: 'characters', lang: 'en' },
        'ruth-events.html': { book: 'ruth', type: 'events', lang: 'en' },
        '1samuel.html': { book: '1samuel', type: 'characters', lang: 'en' },
        '1samuel-events.html': { book: '1samuel', type: 'events', lang: 'en' },
        '2samuel.html': { book: '2samuel', type: 'characters', lang: 'en' },
        '2samuel-events.html': { book: '2samuel', type: 'events', lang: 'en' },
        'dive-in-jordan-crossing.html': { book: 'joshua', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-jericho.html': { book: 'joshua', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-achan-sin.html': { book: 'joshua', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-sun-stands-still.html': { book: 'joshua', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-land-division.html': { book: 'joshua', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-joshua-charge.html': { book: 'joshua', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-ten-commandments.html': { book: 'deuteronomy', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-shema.html': { book: 'deuteronomy', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-blessings-curses.html': { book: 'deuteronomy', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-joshua-commissioning.html': { book: 'deuteronomy', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-song-moses.html': { book: 'deuteronomy', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-moses-death.html': { book: 'deuteronomy', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-creation.html': { book: 'genesis', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-fall.html': { book: 'genesis', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-cain-abel.html': { book: 'genesis', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-census.html': { book: 'numbers', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-nazirite.html': { book: 'numbers', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-spies.html': { book: 'numbers', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-korah.html': { book: 'numbers', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-bronze-serpent.html': { book: 'numbers', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-balaam.html': { book: 'numbers', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-joshua-successor.html': { book: 'numbers', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-ark-jerusalem.html': { book: '1chronicles', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-david-temple-prep.html': { book: '1chronicles', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-solomon-dedicates-temple.html': { book: '2chronicles', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-hezekiah-reformation.html': { book: '2chronicles', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-temple-destroyed.html': { book: '2chronicles', type: 'events', lang: 'en', special: 'dive-in' },
        
        // Spanish pages
        'index-es.html': { book: 'genesis', type: 'characters', lang: 'es' },
        'events-es.html': { book: 'genesis', type: 'events', lang: 'es' },
        'exodus-es.html': { book: 'exodus', type: 'characters', lang: 'es' },
        'exodus-events-es.html': { book: 'exodus', type: 'events', lang: 'es' },
        'leviticus-es.html': { book: 'leviticus', type: 'characters', lang: 'es' },
        'leviticus-events-es.html': { book: 'leviticus', type: 'events', lang: 'es' },
        'numbers-es.html': { book: 'numbers', type: 'characters', lang: 'es' },
        'numbers-events-es.html': { book: 'numbers', type: 'events', lang: 'es' },
        'deuteronomy-es.html': { book: 'deuteronomy', type: 'characters', lang: 'es' },
        'deuteronomy-events-es.html': { book: 'deuteronomy', type: 'events', lang: 'es' },
        'joshua-es.html': { book: 'joshua', type: 'characters', lang: 'es' },
        'joshua-events-es.html': { book: 'joshua', type: 'events', lang: 'es' },
        'judges-es.html': { book: 'judges', type: 'characters', lang: 'es' },
        'judges-events-es.html': { book: 'judges', type: 'events', lang: 'es' },
        'ruth-es.html': { book: 'ruth', type: 'characters', lang: 'es' },
        'ruth-events-es.html': { book: 'ruth', type: 'events', lang: 'es' },
        '1samuel-es.html': { book: '1samuel', type: 'characters', lang: 'es' },
        '1samuel-events-es.html': { book: '1samuel', type: 'events', lang: 'es' },
        '2samuel-es.html': { book: '2samuel', type: 'characters', lang: 'es' },
        '2samuel-events-es.html': { book: '2samuel', type: 'events', lang: 'es' },
        '1kings.html': { book: '1kings', type: 'characters', lang: 'en' },
        '1kings-events.html': { book: '1kings', type: 'events', lang: 'en' },
        '1kings-es.html': { book: '1kings', type: 'characters', lang: 'es' },
        '1kings-events-es.html': { book: '1kings', type: 'events', lang: 'es' },
        '2kings.html': { book: '2kings', type: 'characters', lang: 'en' },
        '2kings-events.html': { book: '2kings', type: 'events', lang: 'en' },
        '2kings-es.html': { book: '2kings', type: 'characters', lang: 'es' },
        '2kings-events-es.html': { book: '2kings', type: 'events', lang: 'es' },
        '1chronicles.html': { book: '1chronicles', type: 'characters', lang: 'en' },
        '1chronicles-events.html': { book: '1chronicles', type: 'events', lang: 'en' },
        '1chronicles-es.html': { book: '1chronicles', type: 'characters', lang: 'es' },
        '1chronicles-events-es.html': { book: '1chronicles', type: 'events', lang: 'es' },
        '2chronicles.html': { book: '2chronicles', type: 'characters', lang: 'en' },
        '2chronicles-events.html': { book: '2chronicles', type: 'events', lang: 'en' },
        '2chronicles-es.html': { book: '2chronicles', type: 'characters', lang: 'es' },
        '2chronicles-events-es.html': { book: '2chronicles', type: 'events', lang: 'es' },
        'ezra.html': { book: 'ezra', type: 'characters', lang: 'en' },
        'ezra-events.html': { book: 'ezra', type: 'events', lang: 'en' },
        'ezra-es.html': { book: 'ezra', type: 'characters', lang: 'es' },
        'ezra-events-es.html': { book: 'ezra', type: 'events', lang: 'es' },
        'nehemiah.html': { book: 'nehemiah', type: 'characters', lang: 'en' },
        'nehemiah-events.html': { book: 'nehemiah', type: 'events', lang: 'en' },
        'nehemiah-es.html': { book: 'nehemiah', type: 'characters', lang: 'es' },
        'nehemiah-events-es.html': { book: 'nehemiah', type: 'events', lang: 'es' },
        'esther.html': { book: 'esther', type: 'characters', lang: 'en' },
        'esther-events.html': { book: 'esther', type: 'events', lang: 'en' },
        'esther-es.html': { book: 'esther', type: 'characters', lang: 'es' },
        'esther-events-es.html': { book: 'esther', type: 'events', lang: 'es' },
        'dive-in-jordan-crossing-es.html': { book: 'joshua', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-jericho-es.html': { book: 'joshua', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-achan-sin-es.html': { book: 'joshua', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-sun-stands-still-es.html': { book: 'joshua', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-land-division-es.html': { book: 'joshua', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-joshua-charge-es.html': { book: 'joshua', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-ten-commandments-es.html': { book: 'deuteronomy', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-shema-es.html': { book: 'deuteronomy', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-blessings-curses-es.html': { book: 'deuteronomy', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-joshua-commissioning-es.html': { book: 'deuteronomy', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-song-moses-es.html': { book: 'deuteronomy', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-moses-death-es.html': { book: 'deuteronomy', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-creation-es.html': { book: 'genesis', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-fall-es.html': { book: 'genesis', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-cain-abel-es.html': { book: 'genesis', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-census-es.html': { book: 'numbers', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-nazirite-es.html': { book: 'numbers', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-spies-es.html': { book: 'numbers', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-korah-es.html': { book: 'numbers', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-bronze-serpent-es.html': { book: 'numbers', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-balaam-es.html': { book: 'numbers', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-joshua-successor-es.html': { book: 'numbers', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-ark-jerusalem-es.html': { book: '1chronicles', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-david-temple-prep-es.html': { book: '1chronicles', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-solomon-dedicates-temple-es.html': { book: '2chronicles', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-hezekiah-reformation-es.html': { book: '2chronicles', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-temple-destroyed-es.html': { book: '2chronicles', type: 'events', lang: 'es', special: 'dive-in' }
    };

    // Book categories configuration
    const bookCategories = {
        torah: {
            en: { name: 'Torah', emoji: '📜' },
            es: { name: 'Torá', emoji: '📜' },
            books: ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy']
        },
        historical: {
            en: { name: 'Historical', emoji: '📚' },
            es: { name: 'Históricos', emoji: '📚' },
            books: ['joshua', 'judges', 'ruth', '1samuel', '2samuel', '1kings', '2kings', '1chronicles', '2chronicles', 'ezra', 'nehemiah', 'esther']
        }
    };

    // Book configuration
    const books = {
        genesis: { en: { name: 'Genesis', emoji: '📖' }, es: { name: 'Génesis', emoji: '📖' } },
        exodus: { en: { name: 'Exodus', emoji: '📖' }, es: { name: 'Éxodo', emoji: '📖' } },
        leviticus: { en: { name: 'Leviticus', emoji: '📖' }, es: { name: 'Levítico', emoji: '📖' } },
        numbers: { en: { name: 'Numbers', emoji: '📖' }, es: { name: 'Números', emoji: '📖' } },
        deuteronomy: { en: { name: 'Deuteronomy', emoji: '📖' }, es: { name: 'Deuteronomio', emoji: '📖' } },
        joshua: { en: { name: 'Joshua', emoji: '📖' }, es: { name: 'Josué', emoji: '📖' } },
        judges: { en: { name: 'Judges', emoji: '📖' }, es: { name: 'Jueces', emoji: '📖' } },
        ruth: { en: { name: 'Ruth', emoji: '📖' }, es: { name: 'Rut', emoji: '📖' } },
        '1samuel': { en: { name: '1 Samuel', emoji: '📖' }, es: { name: '1 Samuel', emoji: '📖' } },
        '2samuel': { en: { name: '2 Samuel', emoji: '📖' }, es: { name: '2 Samuel', emoji: '📖' } },
        '1kings': { en: { name: '1 Kings', emoji: '📖' }, es: { name: '1 Reyes', emoji: '📖' } },
        '2kings': { en: { name: '2 Kings', emoji: '📖' }, es: { name: '2 Reyes', emoji: '📖' } },
        '1chronicles': { en: { name: '1 Chronicles', emoji: '📖' }, es: { name: '1 Crónicas', emoji: '📖' } },
        '2chronicles': { en: { name: '2 Chronicles', emoji: '📖' }, es: { name: '2 Crónicas', emoji: '📖' } },
        ezra: { en: { name: 'Ezra', emoji: '📖' }, es: { name: 'Esdras', emoji: '📖' } },
        nehemiah: { en: { name: 'Nehemiah', emoji: '📖' }, es: { name: 'Nehemías', emoji: '📖' } },
        esther: { en: { name: 'Esther', emoji: '📖' }, es: { name: 'Ester', emoji: '📖' } }
    };

    // Type configuration
    const types = {
        characters: { en: { name: 'Characters', emoji: '👤' }, es: { name: 'Personajes', emoji: '👤' } },
        events: { en: { name: 'Events', emoji: '📅' }, es: { name: 'Eventos', emoji: '📅' } }
    };

    // Language configuration
    const languages = {
        en: { name: 'English', emoji: '🇺🇸' },
        es: { name: 'Español', emoji: '🇪🇸' }
    };

    // Get current page filename (handles file:// protocol and URL encoding)
    function getCurrentFilename() {
        let filename = window.location.pathname.split('/').pop();
        
        if (!filename || filename === '' || filename === '/') {
            const href = window.location.href;
            filename = href.split('/').pop().split('?')[0].split('#')[0];
        }
        
        try {
            filename = decodeURIComponent(filename);
        } catch (e) {
            // If decoding fails, use original
        }
        
        return filename || 'index.html';
    }

    // Get current page context
    function getCurrentContext() {
        const filename = getCurrentFilename();
        const context = pageMap[filename];
        
        if (!context) {
            console.warn('Page not found in pageMap:', filename);
            return { book: 'genesis', type: 'characters', lang: 'en' };
        }
        
        return context;
    }

    // Generate URL for regular pages (not dive-in)
    function generateURL(book, type, lang) {
        if (book === 'genesis') {
            return type === 'characters' 
                ? (lang === 'es' ? 'index-es.html' : 'index.html')
                : (lang === 'es' ? 'events-es.html' : 'events.html');
        }
        
        const bookName = book;
        const suffix = type === 'characters' ? '' : '-events';
        const langSuffix = lang === 'es' ? '-es' : '';
        return `${bookName}${suffix}${langSuffix}.html`;
    }

    // Find corresponding dive-in page in different language
    function getDiveInPageInLanguage(targetLang) {
        const currentFilename = getCurrentFilename();
        const currentContext = getCurrentContext();
        
        if (currentContext.special !== 'dive-in') {
            return null;
        }
        
        // Convert filename to target language
        let targetFilename = currentFilename;
        if (targetLang === 'es' && currentContext.lang === 'en') {
            // English to Spanish: add -es before .html
            targetFilename = currentFilename.replace('.html', '-es.html');
        } else if (targetLang === 'en' && currentContext.lang === 'es') {
            // Spanish to English: remove -es before .html
            targetFilename = currentFilename.replace('-es.html', '.html');
        }
        
        // Verify it exists in pageMap
        return pageMap[targetFilename] ? targetFilename : null;
    }

    // Build menu HTML
    function buildMenu() {
        const context = getCurrentContext();
        const currentLang = context.lang;
        const currentBook = context.book;
        const currentType = context.type;
        const currentSpecial = context.special;
        const currentCategory = getCategoryForBook(currentBook);

        // Build category items
        const bookCategoryItems = Object.keys(bookCategories).map(categoryKey => {
            const category = bookCategories[categoryKey][currentLang];
            const isActive = categoryKey === currentCategory;
            return `
                <div class="dropdown-item category-item ${isActive ? 'active' : ''}" data-category="${categoryKey}">
                    <span class="emoji">${category.emoji}</span>
                    <span class="text">${category.name}</span>
                    <span class="arrow">▶</span>
                </div>
            `;
        }).join('');

        // Build book items for each category
        const bookItemsByCategory = Object.keys(bookCategories).map(categoryKey => {
            const booksHtml = bookCategories[categoryKey].books.map(bookKey => {
                const book = books[bookKey][currentLang];
                const isBookActive = bookKey === currentBook;
                const url = generateURL(bookKey, currentType, currentLang);
                return `<a href="${url}" class="dropdown-item book-item ${isBookActive ? 'active' : ''}" data-book="${bookKey}">${book.emoji} ${book.name}</a>`;
            }).join('');
            
            return `
                <div class="category-books" data-category="${categoryKey}" style="display: none;">
                    <div class="dropdown-item back-button" data-back="true">
                        <span class="arrow">◀</span>
                        <span class="text">${currentLang === 'es' ? 'Atrás' : 'Back'}</span>
                    </div>
                    ${booksHtml}
                </div>
            `;
        }).join('');

        // Build type dropdown
        const typeItems = Object.keys(types).map(typeKey => {
            const type = types[typeKey][currentLang];
            const isActive = typeKey === currentType;
            const url = generateURL(currentBook, typeKey, currentLang);
            return `<a href="${url}" class="dropdown-item ${isActive ? 'active' : ''}">${type.name}</a>`;
        }).join('');

        // Build language dropdown
        const langItems = Object.keys(languages).map(langKey => {
            const lang = languages[langKey];
            const isActive = langKey === currentLang;
            let url;
            
            // If on a dive-in page, try to find corresponding page in other language
            if (currentSpecial === 'dive-in') {
                const diveInPage = getDiveInPageInLanguage(langKey);
                url = diveInPage || generateURL(currentBook, currentType, langKey);
            } else {
                url = generateURL(currentBook, currentType, langKey);
            }
            
            return `<a href="${url}" class="dropdown-item ${isActive ? 'active' : ''}">${lang.name}</a>`;
        }).join('');

        // Get display values
        const bookDisplay = books[currentBook][currentLang];
        const typeDisplay = types[currentType][currentLang];
        const langDisplay = languages[currentLang];

        return `
            <div class="dropdown">
                <button class="dropdown-btn active" id="bookBtn">
                    <span class="emoji">${bookDisplay.emoji}</span>
                    <span class="text">${bookDisplay.name}</span>
                </button>
                <div class="dropdown-menu" id="bookMenu">
                    <div class="book-categories-container">
                        ${bookCategoryItems}
                    </div>
                    ${bookItemsByCategory}
                </div>
            </div>
            <div class="dropdown">
                <button class="dropdown-btn active" id="typeBtn">
                    <span class="emoji">${typeDisplay.emoji}</span>
                    <span class="text">${typeDisplay.name}</span>
                </button>
                <div class="dropdown-menu" id="typeMenu">
                    ${typeItems}
                </div>
            </div>
            <div class="dropdown">
                <button class="dropdown-btn active" id="langBtn">
                    <span class="emoji">${langDisplay.emoji}</span>
                    <span class="text">${langDisplay.name}</span>
                </button>
                <div class="dropdown-menu" id="langMenu">
                    ${langItems}
                </div>
            </div>
        `;
    }

    // Helper function to get category for a book
    function getCategoryForBook(bookKey) {
        for (const [categoryKey, category] of Object.entries(bookCategories)) {
            if (category.books.includes(bookKey)) {
                return categoryKey;
            }
        }
        return null;
    }

    // Inject CSS for category replacement
    function injectSubmenuCSS() {
        if (document.getElementById('menu-submenu-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'menu-submenu-styles';
        style.textContent = `
            .book-categories-container { display: block; }
            .book-categories-container.hidden { display: none; }
            .dropdown-item.category-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
            }
            .dropdown-item.category-item .arrow {
                font-size: 0.7em;
                transition: transform 0.2s ease;
                margin-left: auto;
            }
            .dropdown-item.category-item:hover .arrow {
                transform: translateX(3px);
            }
            .category-books { display: none; }
            .category-books.show {
                display: block;
                animation: fadeIn 0.2s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .dropdown-item.back-button {
                display: flex;
                align-items: center;
                cursor: pointer;
                font-weight: 600;
                border-bottom: 1px solid rgba(0, 195, 255, 0.3);
                margin-bottom: 5px;
                padding-bottom: 8px;
            }
            .dropdown-item.back-button .arrow {
                margin-right: 8px;
                margin-left: 0;
            }
            .dropdown-item.back-button:hover {
                background: rgba(0, 195, 255, 0.1);
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize menu
    function initMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) {
            console.warn('Navigation menu container not found');
            return;
        }

        injectSubmenuCSS();
        navMenu.innerHTML = buildMenu();

        // Add dropdown functionality
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('.dropdown-btn');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!btn || !menu) return;
            
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const isOpen = menu.classList.contains('open');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    m.classList.remove('open');
                    if (m.previousElementSibling) {
                        m.previousElementSibling.classList.remove('open');
                    }
                    const categoriesContainer = m.querySelector('.book-categories-container');
                    const categoryBooks = m.querySelectorAll('.category-books');
                    if (categoriesContainer) {
                        categoriesContainer.classList.remove('hidden');
                    }
                    categoryBooks.forEach(cb => {
                        cb.classList.remove('show');
                        cb.style.display = 'none';
                    });
                });
                
                if (!isOpen) {
                    menu.classList.add('open');
                    btn.classList.add('open');
                }
            });
        });

        // Handle category/book navigation in book menu
        const bookMenu = document.getElementById('bookMenu');
        if (bookMenu) {
            bookMenu.addEventListener('click', function(e) {
                const categoryItem = e.target.closest('.category-item');
                if (categoryItem) {
                    e.preventDefault();
                    e.stopPropagation();
                    const categoryKey = categoryItem.getAttribute('data-category');
                    const categoryBooks = bookMenu.querySelector(`.category-books[data-category="${categoryKey}"]`);
                    const categoriesContainer = bookMenu.querySelector('.book-categories-container');
                    
                    if (categoryBooks && categoriesContainer) {
                        categoriesContainer.classList.add('hidden');
                        categoryBooks.classList.add('show');
                        categoryBooks.style.display = 'block';
                    }
                    return;
                }
                
                const backButton = e.target.closest('.back-button');
                if (backButton) {
                    e.preventDefault();
                    e.stopPropagation();
                    const categoriesContainer = bookMenu.querySelector('.book-categories-container');
                    const categoryBooks = bookMenu.querySelectorAll('.category-books');
                    
                    if (categoriesContainer) {
                        categoriesContainer.classList.remove('hidden');
                        categoryBooks.forEach(cb => {
                            cb.classList.remove('show');
                            cb.style.display = 'none';
                        });
                    }
                }
            });
        }
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('open');
                if (menu.previousElementSibling) {
                    menu.previousElementSibling.classList.remove('open');
                }
                const categoriesContainer = menu.querySelector('.book-categories-container');
                const categoryBooks = menu.querySelectorAll('.category-books');
                if (categoriesContainer) {
                    categoriesContainer.classList.remove('hidden');
                }
                categoryBooks.forEach(cb => {
                    cb.classList.remove('show');
                    cb.style.display = 'none';
                });
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
})();
