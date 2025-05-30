// Theme management and main app initialization
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupThemeToggle();
    }

    setupTheme() {
        const htmlEl = document.documentElement;
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlEl.classList.add('dark');
        } else {
            htmlEl.classList.remove('dark');
        }

        this.updateThemeIcons();
    }

    setupThemeToggle() {
        const themeToggleBtn = document.getElementById('theme-toggle');
        themeToggleBtn.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const htmlEl = document.documentElement;
        htmlEl.classList.toggle('dark');
        const isDark = htmlEl.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.updateThemeIcons();
    }

    updateThemeIcons() {
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const htmlEl = document.documentElement;

        if (htmlEl.classList.contains('dark')) {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        }
    }
}

// Mobile menu management
class MobileMenuManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupOverlay();
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-button');
        const sidebar = document.getElementById('sidebar');

        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            document.getElementById('mobile-overlay').classList.toggle('hidden');
        });
    }

    setupOverlay() {
        const overlay = document.getElementById('mobile-overlay');
        overlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });
    }

    closeMobileMenu() {
        document.getElementById('sidebar').classList.add('hidden');
        document.getElementById('mobile-overlay').classList.add('hidden');
    }
}

// API Explorer functionality
class APIExplorer {
    constructor() {
        this.init();
    }

    init() {
        // Will be initialized when API Explorer is shown
    }

    setupForm() {
        const apiForm = document.getElementById('api-form');
        const apiMethod = document.getElementById('api-method');
        const apiUrl = document.getElementById('api-url');
        const apiBody = document.getElementById('api-body');
        const apiResponse = document.getElementById('api-response');

        if (!apiForm) return; // Form not present on current page

        // Show/hide body input based on method
        const toggleBodyInput = () => {
            if (apiMethod.value === 'GET' || apiMethod.value === 'DELETE') {
                apiBody.classList.add('hidden');
            } else {
                apiBody.classList.remove('hidden');
            }
        };

        apiMethod.addEventListener('change', toggleBodyInput);
        toggleBodyInput();

        // Handle form submission
        apiForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.sendRequest();
        });
    }

    async sendRequest() {
        const apiMethod = document.getElementById('api-method');
        const apiUrl = document.getElementById('api-url');
        const apiBody = document.getElementById('api-body');
        const apiResponse = document.getElementById('api-response');

        const method = apiMethod.value;
        const url = apiUrl.value;

        if (!url) {
            apiResponse.textContent = 'Please enter a valid URL.';
            return;
        }

        let payload = null;
        if (method !== 'GET' && method !== 'DELETE') {
            try {
                payload = JSON.parse(apiBody.value || '{}');
            } catch (err) {
                apiResponse.textContent = 'Invalid JSON body.';
                return;
            }
        }

        apiResponse.textContent = 'Loading...';
        if (window.Prism) {
            Prism.highlightElement(apiResponse);
        }

        // Simulate API call with mock response
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockResponse = {
            status: 'success',
            method,
            url,
            timestamp: new Date().toISOString(),
            headers: {
                'Content-Type': 'application/json',
                'X-Response-Time': '120ms'
            },
            body: payload,
            data: {
                message: 'This is a mock response',
                id: Math.floor(Math.random() * 1000),
                items: [
                    { id: 1, name: 'Item 1' },
                    { id: 2, name: 'Item 2' }
                ]
            }
        };

        apiResponse.textContent = JSON.stringify(mockResponse, null, 2);
        if (window.Prism) {
            Prism.highlightElement(apiResponse);
        }
    }
}

// Preferences manager
class PreferencesManager {
    constructor() {
        this.preferences = this.loadPreferences();
    }

    loadPreferences() {
        const stored = localStorage.getItem('userPreferences');
        return stored ? JSON.parse(stored) : {
            favoriteSnippets: [],
            recentSearches: [],
            bookmarkedPages: [],
            codeTheme: 'tomorrow',
            fontSize: 'medium'
        };
    }

    savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
    }

    addFavoriteSnippet(snippet) {
        this.preferences.favoriteSnippets.push({
            id: Date.now(),
            ...snippet,
            createdAt: new Date().toISOString()
        });
        this.savePreferences();
    }

    removeFavoriteSnippet(id) {
        this.preferences.favoriteSnippets = this.preferences.favoriteSnippets.filter(
            snippet => snippet.id !== id
        );
        this.savePreferences();
    }

    addBookmark(section, page) {
        const bookmark = { section, page, createdAt: new Date().toISOString() };
        this.preferences.bookmarkedPages = this.preferences.bookmarkedPages.filter(
            b => !(b.section === section && b.page === page)
        );
        this.preferences.bookmarkedPages.unshift(bookmark);
        this.savePreferences();
    }

    removeBookmark(section, page) {
        this.preferences.bookmarkedPages = this.preferences.bookmarkedPages.filter(
            b => !(b.section === section && b.page === page)
        );
        this.savePreferences();
    }

    isBookmarked(section, page) {
        return this.preferences.bookmarkedPages.some(
            b => b.section === section && b.page === page
        );
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    window.mobileMenuManager = new MobileMenuManager();
    window.apiExplorer = new APIExplorer();
    window.preferencesManager = new PreferencesManager();

    // Setup API explorer form when it becomes available
    const observer = new MutationObserver(() => {
        if (document.getElementById('api-form')) {
            window.apiExplorer.setupForm();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
