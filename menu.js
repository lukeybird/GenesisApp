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
        'dive-in-joshua-successor-es.html': { book: 'numbers', type: 'events', lang: 'es', special: 'dive-in' }
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
        genesis: { 
            en: { name: 'Genesis', emoji: '📖' },
            es: { name: 'Génesis', emoji: '📖' }
        },
        exodus: { 
            en: { name: 'Exodus', emoji: '📖' },
            es: { name: 'Éxodo', emoji: '📖' }
        },
        leviticus: { 
            en: { name: 'Leviticus', emoji: '📖' },
            es: { name: 'Levítico', emoji: '📖' }
        },
        numbers: { 
            en: { name: 'Numbers', emoji: '📖' },
            es: { name: 'Números', emoji: '📖' }
        },
        deuteronomy: { 
            en: { name: 'Deuteronomy', emoji: '📖' },
            es: { name: 'Deuteronomio', emoji: '📖' }
        },
        joshua: { 
            en: { name: 'Joshua', emoji: '📖' },
            es: { name: 'Josué', emoji: '📖' }
        },
        judges: { 
            en: { name: 'Judges', emoji: '📖' },
            es: { name: 'Jueces', emoji: '📖' }
        },
        ruth: { 
            en: { name: 'Ruth', emoji: '📖' },
            es: { name: 'Rut', emoji: '📖' }
        },
        '1samuel': { 
            en: { name: '1 Samuel', emoji: '📖' },
            es: { name: '1 Samuel', emoji: '📖' }
        },
        '2samuel': { 
            en: { name: '2 Samuel', emoji: '📖' },
            es: { name: '2 Samuel', emoji: '📖' }
        },
        '1kings': { 
            en: { name: '1 Kings', emoji: '📖' },
            es: { name: '1 Reyes', emoji: '📖' }
        },
        '2kings': { 
            en: { name: '2 Kings', emoji: '📖' },
            es: { name: '2 Reyes', emoji: '📖' }
        },
        '1chronicles': { 
            en: { name: '1 Chronicles', emoji: '📖' },
            es: { name: '1 Crónicas', emoji: '📖' }
        },
        '2chronicles': { 
            en: { name: '2 Chronicles', emoji: '📖' },
            es: { name: '2 Crónicas', emoji: '📖' }
        },
        ezra: { 
            en: { name: 'Ezra', emoji: '📖' },
            es: { name: 'Esdras', emoji: '📖' }
        },
        nehemiah: { 
            en: { name: 'Nehemiah', emoji: '📖' },
            es: { name: 'Nehemías', emoji: '📖' }
        },
        esther: { 
            en: { name: 'Esther', emoji: '📖' },
            es: { name: 'Ester', emoji: '📖' }
        }
    };

    // Helper function to get category for a book
    function getCategoryForBook(bookKey) {
        for (const [categoryKey, category] of Object.entries(bookCategories)) {
            if (category.books.includes(bookKey)) {
                return categoryKey;
            }
        }
        return null;
    }

    // Type configuration
    const types = {
        characters: {
            en: { name: 'Characters', emoji: '👤' },
            es: { name: 'Personajes', emoji: '👤' }
        },
        events: {
            en: { name: 'Events', emoji: '📅' },
            es: { name: 'Eventos', emoji: '📅' }
        }
    };

    // Language configuration
    const languages = {
        en: { name: 'English', emoji: '🇺🇸' },
        es: { name: 'Español', emoji: '🇪🇸' }
    };

    // Get current page context
    function getCurrentContext() {
        // Try multiple methods to get filename
        let filename = window.location.pathname.split('/').pop();
        
        // If pathname doesn't work (e.g., file:// protocol), try href
        if (!filename || filename === '' || filename === '/') {
            const href = window.location.href;
            filename = href.split('/').pop().split('?')[0].split('#')[0];
        }
        
        // Fallback to index.html if still empty
        if (!filename || filename === '') {
            filename = 'index.html';
        }
        
        // Debug: log the filename being used
        console.log('Menu.js detected filename:', filename);
        
        const context = pageMap[filename];
        if (!context) {
            console.warn('Page not found in pageMap:', filename, 'Using default: Genesis Characters English');
            return { book: 'genesis', type: 'characters', lang: 'en' };
        }
        
        return context;
    }

    // Generate URL based on book, type, and language
    function generateURL(book, type, lang, special = null) {
        if (special === 'dive-in') {
            return lang === 'es' ? 'dive-in-creation-es.html' : 'dive-in-creation.html';
        }

        if (book === 'genesis') {
            if (type === 'characters') {
                return lang === 'es' ? 'index-es.html' : 'index.html';
            } else { // events
                return lang === 'es' ? 'events-es.html' : 'events.html';
            }
        } else if (book === 'exodus') {
            if (type === 'characters') {
                return lang === 'es' ? 'exodus-es.html' : 'exodus.html';
            } else { // events
                return lang === 'es' ? 'exodus-events-es.html' : 'exodus-events.html';
            }
        } else if (book === 'leviticus') {
            if (type === 'characters') {
                return lang === 'es' ? 'leviticus-es.html' : 'leviticus.html';
            } else { // events
                return lang === 'es' ? 'leviticus-events-es.html' : 'leviticus-events.html';
            }
        } else if (book === 'numbers') {
            if (type === 'characters') {
                return lang === 'es' ? 'numbers-es.html' : 'numbers.html';
            } else { // events
                return lang === 'es' ? 'numbers-events-es.html' : 'numbers-events.html';
            }
        } else if (book === 'deuteronomy') {
            if (type === 'characters') {
                return lang === 'es' ? 'deuteronomy-es.html' : 'deuteronomy.html';
            } else { // events
                return lang === 'es' ? 'deuteronomy-events-es.html' : 'deuteronomy-events.html';
            }
        } else if (book === 'joshua') {
            if (type === 'characters') {
                return lang === 'es' ? 'joshua-es.html' : 'joshua.html';
            } else { // events
                return lang === 'es' ? 'joshua-events-es.html' : 'joshua-events.html';
            }
        } else if (book === 'judges') {
            if (type === 'characters') {
                return lang === 'es' ? 'judges-es.html' : 'judges.html';
            } else { // events
                return lang === 'es' ? 'judges-events-es.html' : 'judges-events.html';
            }
        } else if (book === 'ruth') {
            if (type === 'characters') {
                return lang === 'es' ? 'ruth-es.html' : 'ruth.html';
            } else { // events
                return lang === 'es' ? 'ruth-events-es.html' : 'ruth-events.html';
            }
        } else if (book === '1samuel') {
            if (type === 'characters') {
                return lang === 'es' ? '1samuel-es.html' : '1samuel.html';
            } else { // events
                return lang === 'es' ? '1samuel-events-es.html' : '1samuel-events.html';
            }
        } else if (book === '2samuel') {
            if (type === 'characters') {
                return lang === 'es' ? '2samuel-es.html' : '2samuel.html';
            } else { // events
                return lang === 'es' ? '2samuel-events-es.html' : '2samuel-events.html';
            }
        } else if (book === '1kings') {
            if (type === 'characters') {
                return lang === 'es' ? '1kings-es.html' : '1kings.html';
            } else { // events
                return lang === 'es' ? '1kings-events-es.html' : '1kings-events.html';
            }
        } else if (book === '2kings') {
            if (type === 'characters') {
                return lang === 'es' ? '2kings-es.html' : '2kings.html';
            } else { // events
                return lang === 'es' ? '2kings-events-es.html' : '2kings-events.html';
            }
        } else if (book === '1chronicles') {
            if (type === 'characters') {
                return lang === 'es' ? '1chronicles-es.html' : '1chronicles.html';
            } else { // events
                return lang === 'es' ? '1chronicles-events-es.html' : '1chronicles-events.html';
            }
        } else if (book === '2chronicles') {
            if (type === 'characters') {
                return lang === 'es' ? '2chronicles-es.html' : '2chronicles.html';
            } else { // events
                return lang === 'es' ? '2chronicles-events-es.html' : '2chronicles-events.html';
            }
        } else if (book === 'ezra') {
            if (type === 'characters') {
                return lang === 'es' ? 'ezra-es.html' : 'ezra.html';
            } else { // events
                return lang === 'es' ? 'ezra-events-es.html' : 'ezra-events.html';
            }
        } else if (book === 'nehemiah') {
            if (type === 'characters') {
                return lang === 'es' ? 'nehemiah-es.html' : 'nehemiah.html';
            } else { // events
                return lang === 'es' ? 'nehemiah-events-es.html' : 'nehemiah-events.html';
            }
        } else if (book === 'esther') {
            if (type === 'characters') {
                return lang === 'es' ? 'esther-es.html' : 'esther.html';
            } else { // events
                return lang === 'es' ? 'esther-events-es.html' : 'esther-events.html';
            }
        }
        // Fallback for unknown books/types
        console.warn('Unknown book or type in generateURL:', book, type, lang);
        return lang === 'es' ? 'index-es.html' : 'index.html'; // Default to Genesis characters
    }

    // Build menu HTML
    function buildMenu() {
        const context = getCurrentContext();
        const currentLang = context.lang;
        
        // Get current values
        const currentBook = context.book;
        const currentType = context.type;
        const currentSpecial = context.special || null;

        // Build book dropdown with categories
        // Categories are replaced by books when clicked (not expanded)
        const currentCategory = getCategoryForBook(currentBook);
        
        // Build category items (shown initially)
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
        
        // Build book items for each category (hidden initially)
        const bookItemsByCategory = Object.keys(bookCategories).map(categoryKey => {
            const booksHtml = bookCategories[categoryKey].books.map(bookKey => {
                const book = books[bookKey][currentLang];
                const isBookActive = bookKey === currentBook;
                const url = generateURL(bookKey, currentType, currentLang, null);
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
        // When changing type, don't preserve special pages (like dive-in)
        const typeItems = Object.keys(types).map(typeKey => {
            const type = types[typeKey][currentLang];
            const isActive = typeKey === currentType;
            const url = generateURL(currentBook, typeKey, currentLang, null);
            return `<a href="${url}" class="dropdown-item ${isActive ? 'active' : ''}">${type.name}</a>`;
        }).join('');

        // Build language dropdown
        const langItems = Object.keys(languages).map(langKey => {
            const lang = languages[langKey];
            const isActive = langKey === currentLang;
            const url = generateURL(currentBook, currentType, langKey, currentSpecial);
            return `<a href="${url}" class="dropdown-item ${isActive ? 'active' : ''}">${lang.name}</a>`;
        }).join('');

        // Get display values
        const bookDisplay = books[currentBook][currentLang];
        const typeDisplay = types[currentType][currentLang];
        const langDisplay = languages[currentLang];

        // Build menu HTML
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

    // Inject category replacement CSS dynamically (Tony Stark style - no duplication!)
    function injectSubmenuCSS() {
        if (document.getElementById('menu-submenu-styles')) return; // Already injected
        
        const style = document.createElement('style');
        style.id = 'menu-submenu-styles';
        style.textContent = `
            .book-categories-container {
                display: block;
            }
            .book-categories-container.hidden {
                display: none;
            }
            .dropdown-item.category-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
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
            .category-books {
                display: none;
            }
            .category-books.show {
                display: block;
                animation: fadeIn 0.2s ease;
            }
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
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

        // Inject CSS first (elegant, centralized solution)
        injectSubmenuCSS();

        // Build and insert menu
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
                    m.previousElementSibling.classList.remove('open');
                    // Reset book menu to show categories
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
                
                // Toggle current dropdown
                if (!isOpen) {
                    menu.classList.add('open');
                    btn.classList.add('open');
                    // Always start with categories only
                }
            });
        });

        // Handle category item clicks (for book menu) - replace categories with books
        const bookMenu = document.getElementById('bookMenu');
        if (bookMenu) {
            bookMenu.addEventListener('click', function(e) {
                // Handle category click - replace categories with books
                const categoryItem = e.target.closest('.category-item');
                if (categoryItem) {
                    e.preventDefault();
                    e.stopPropagation();
                    const categoryKey = categoryItem.getAttribute('data-category');
                    const categoryBooks = bookMenu.querySelector(`.category-books[data-category="${categoryKey}"]`);
                    const categoriesContainer = bookMenu.querySelector('.book-categories-container');
                    
                    if (categoryBooks && categoriesContainer) {
                        // Hide categories container
                        categoriesContainer.classList.add('hidden');
                        // Show books for this category
                        categoryBooks.classList.add('show');
                        categoryBooks.style.display = 'block';
                    }
                }
                
                // Handle back button click - show categories again
                const backButton = e.target.closest('.back-button');
                if (backButton) {
                    e.preventDefault();
                    e.stopPropagation();
                    const categoriesContainer = bookMenu.querySelector('.book-categories-container');
                    const categoryBooks = bookMenu.querySelectorAll('.category-books');
                    
                    if (categoriesContainer) {
                        // Show categories container
                        categoriesContainer.classList.remove('hidden');
                        // Hide all category books
                        categoryBooks.forEach(cb => {
                            cb.classList.remove('show');
                            cb.style.display = 'none';
                        });
                    }
                }
            });
        }
        
        // Close dropdowns when clicking outside (elegant cleanup)
        document.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('open');
                if (menu.previousElementSibling) {
                    menu.previousElementSibling.classList.remove('open');
                }
                // Reset book menu to show categories
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


