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
        'dive-in-creation.html': { book: 'genesis', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-fall.html': { book: 'genesis', type: 'events', lang: 'en', special: 'dive-in' },
        'dive-in-cain-abel.html': { book: 'genesis', type: 'events', lang: 'en', special: 'dive-in' },
        
        // Spanish pages
        'index-es.html': { book: 'genesis', type: 'characters', lang: 'es' },
        'events-es.html': { book: 'genesis', type: 'events', lang: 'es' },
        'exodus-es.html': { book: 'exodus', type: 'characters', lang: 'es' },
        'exodus-events-es.html': { book: 'exodus', type: 'events', lang: 'es' },
        'dive-in-creation-es.html': { book: 'genesis', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-fall-es.html': { book: 'genesis', type: 'events', lang: 'es', special: 'dive-in' },
        'dive-in-cain-abel-es.html': { book: 'genesis', type: 'events', lang: 'es', special: 'dive-in' }
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
        }
    };

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
        } else { // exodus
            if (type === 'characters') {
                return lang === 'es' ? 'exodus-es.html' : 'exodus.html';
            } else { // events
                return lang === 'es' ? 'exodus-events-es.html' : 'exodus-events.html';
            }
        }
    }

    // Build menu HTML
    function buildMenu() {
        const context = getCurrentContext();
        const currentLang = context.lang;
        
        // Get current values
        const currentBook = context.book;
        const currentType = context.type;
        const currentSpecial = context.special || null;

        // Build book dropdown
        const bookItems = Object.keys(books).map(bookKey => {
            const book = books[bookKey][currentLang];
            const isActive = bookKey === currentBook;
            const url = generateURL(bookKey, currentType, currentLang, currentSpecial);
            return `<a href="${url}" class="dropdown-item ${isActive ? 'active' : ''}" data-book="${bookKey}">${book.name}</a>`;
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
                    ${bookItems}
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

    // Initialize menu
    function initMenu() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) {
            console.warn('Navigation menu container not found');
            return;
        }

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
                });
                
                // Toggle current dropdown
                if (!isOpen) {
                    menu.classList.add('open');
                    btn.classList.add('open');
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('open');
                if (menu.previousElementSibling) {
                    menu.previousElementSibling.classList.remove('open');
                }
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

