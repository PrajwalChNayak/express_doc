// Navigation data structure
const navigationData = {
    "server-fundamentals": {
        title: "Server Fundamentals",
        icon: "🖥️",
        pages: [
            { id: "index", title: "Overview", file: "server-fundamentals/index.html" },
            { id: "what-is-server", title: "What is a Server", file: "server-fundamentals/what-is-server.html" },
            { id: "http-cycle", title: "HTTP Protocol", file: "server-fundamentals/http-cycle.html" },
            { id: "server-architecture", title: "Server Architecture", file: "server-fundamentals/server-architecture.html" },
            { id: "env-setup", title: "Environment Setup", file: "server-fundamentals/env-setup.html" },
            { id: "security-fundamentals", title: "Security Fundamentals", file: "server-fundamentals/security-fundamentals.html" }
        ]
    },
    "express-js": {
        title: "Express.js Framework",
        icon: "⚡",
        pages: [
            { id: "index", title: "Overview", file: "express-js/index.html" },
            { id: "getting-started", title: "Getting Started", file: "express-js/getting-started.html" },
            { id: "routing", title: "Routing & Middleware", file: "express-js/routing.html" },
            { id: "request-response", title: "Request/Response", file: "express-js/request-response.html" },
            { id: "error-handling", title: "Error Handling", file: "express-js/error-handling.html" },
            { id: "authentication", title: "Authentication", file: "express-js/authentication.html" },
            { id: "file-uploads", title: "File Uploads", file: "express-js/file-uploads.html" },
            { id: "testing", title: "Testing", file: "express-js/testing.html" }
        ]
    },
    "rest-api": {
        title: "REST API Development",
        icon: "🔗",
        pages: [
            { id: "index", title: "Overview", file: "rest-api/index.html" },
            { id: "principles", title: "REST Principles", file: "rest-api/principles.html" },
            { id: "http-methods", title: "HTTP Methods", file: "rest-api/http-methods.html" },
            { id: "status-codes", title: "Status Codes", file: "rest-api/status-codes.html" },
            { id: "versioning", title: "API Versioning", file: "rest-api/versioning.html" },
            { id: "rate-limiting", title: "Rate Limiting", file: "rest-api/rate-limiting.html" },
            { id: "documentation", title: "API Documentation", file: "rest-api/documentation.html" },
            { id: "authentication", title: "Authentication", file: "rest-api/authentication.html" },
            { id: "cors-security", title: "CORS & Security", file: "rest-api/cors-security.html" }
        ]
    },
    "databases": {
        title: "Database Integration",
        icon: "🗄️",
        pages: [
            { id: "index", title: "Overview", file: "databases/index.html" },
            { id: "sql-fundamentals", title: "SQL Fundamentals", file: "databases/sql-fundamentals.html" },
            { id: "design", title: "Database Design", file: "databases/design.html" },
            { id: "optimization", title: "Query Optimization", file: "databases/optimization.html" },
            { id: "transactions", title: "Transactions", file: "databases/transactions.html" },
            { id: "migrations", title: "Migrations", file: "databases/migrations.html" }
        ]
    },
    "prisma": {
        title: "Prisma ORM",
        icon: "🔷",
        pages: [
            { id: "index", title: "Overview", file: "prisma/index.html" },
            { id: "setup", title: "Setup & Configuration", file: "prisma/setup.html" },
            { id: "schema", title: "Schema Definition", file: "prisma/schema.html" },
            { id: "crud", title: "CRUD Operations", file: "prisma/crud.html" },
            { id: "relations", title: "Relations", file: "prisma/relations.html" },
            { id: "seeding", title: "Seeding & Testing", file: "prisma/seeding.html" },
            { id: "performance", title: "Performance", file: "prisma/performance.html" },
            { id: "typescript", title: "TypeScript", file: "prisma/typescript.html" }
        ]
    },
    "mongodb": {
        title: "MongoDB & NoSQL",
        icon: "🍃",
        pages: [
            { id: "index", title: "Overview", file: "mongodb/index.html" },
            { id: "concepts", title: "NoSQL Concepts", file: "mongodb/concepts.html" },
            { id: "setup", title: "Setup & Configuration", file: "mongodb/setup.html" },
            { id: "crud", title: "CRUD Operations", file: "mongodb/crud.html" },
            { id: "indexing", title: "Indexing", file: "mongodb/indexing.html" },
            { id: "mongoose", title: "Mongoose ODM", file: "mongodb/mongoose.html" },
            { id: "scaling", title: "Scaling", file: "mongodb/scaling.html" }
        ]
    },
    "deployment": {
        title: "Deployment & DevOps",
        icon: "🚀",
        pages: [
            { id: "index", title: "Overview", file: "deployment/index.html" },
            { id: "docker", title: "Docker", file: "deployment/docker.html" },
            { id: "ci-cd", title: "CI/CD", file: "deployment/ci-cd.html" },
            { id: "cloud", title: "Cloud Platforms", file: "deployment/cloud.html" },
            { id: "monitoring", title: "Monitoring", file: "deployment/monitoring.html" },
            { id: "logging", title: "Logging", file: "deployment/logging.html" }
        ]
    },
    "advanced": {
        title: "Advanced Topics",
        icon: "⚙️",
        pages: [
            { id: "index", title: "Overview", file: "advanced/index.html" },
            { id: "caching", title: "Caching Strategies", file: "advanced/caching.html" },
            { id: "message-queues", title: "Message Queues", file: "advanced/message-queues.html" },
            { id: "microservices", title: "Microservices", file: "advanced/microservices.html" },
            { id: "graphql", title: "GraphQL vs REST", file: "advanced/graphql.html" },
            { id: "real-time", title: "Real-time Communication", file: "advanced/real-time.html" }
        ]
    }
};

class NavigationManager {
    constructor() {
        this.currentSection = null;
        this.currentPage = null;
        this.history = [];
        this.recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        this.init();
    }

    init() {
        this.renderSidebar();
        this.setupEventListeners();
        this.handleInitialRoute();
    }

    renderSidebar() {
        const sidebarNav = document.getElementById('sidebar-nav');
        sidebarNav.innerHTML = '';

        Object.entries(navigationData).forEach(([sectionKey, section]) => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'mb-4';

            const sectionButton = document.createElement('button');
            sectionButton.className = 'w-full flex items-center justify-between p-2 text-left font-medium hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors';
            sectionButton.innerHTML = `
        <span class="flex items-center space-x-2">
          <span class="text-lg">${section.icon}</span>
          <span>${section.title}</span>
        </span>
        <svg class="w-4 h-4 transform transition-transform section-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      `;

            const pagesList = document.createElement('div');
            pagesList.className = 'hidden mt-2 ml-6 space-y-1 section-pages';
            pagesList.dataset.section = sectionKey;

            section.pages.forEach((page, index) => {
                const pageEl = document.createElement('a');
                pageEl.href = `#${sectionKey}/${page.id}`;
                pageEl.className = 'block p-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors page-link';
                pageEl.dataset.section = sectionKey;
                pageEl.dataset.page = page.id;
                pageEl.dataset.file = page.file;
                pageEl.textContent = page.title;
                pagesList.appendChild(pageEl);
            });

            sectionButton.addEventListener('click', () => {
                this.toggleSection(sectionKey, sectionButton, pagesList);
            });

            sectionEl.appendChild(sectionButton);
            sectionEl.appendChild(pagesList);
            sidebarNav.appendChild(sectionEl);
        });
    }

    toggleSection(sectionKey, button, pagesList) {
        const isHidden = pagesList.classList.contains('hidden');
        const chevron = button.querySelector('.section-chevron');

        if (isHidden) {
            pagesList.classList.remove('hidden');
            chevron.style.transform = 'rotate(90deg)';
        } else {
            pagesList.classList.add('hidden');
            chevron.style.transform = 'rotate(0deg)';
        }
    }

    setupEventListeners() {
        // Page link clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-link')) {
                e.preventDefault();
                const section = e.target.dataset.section;
                const page = e.target.dataset.page;
                const file = e.target.dataset.file;
                this.navigateToPage(section, page, file);
            }
        });

        // Browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state) {
                this.navigateToPage(e.state.section, e.state.page, e.state.file, false);
            }
        });

        // Header navigation links
        document.querySelectorAll('[data-route]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = e.target.dataset.route;
                this.handleHeaderNavigation(route);
            });
        });
    }

    handleInitialRoute() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const [section, page] = hash.split('/');
            if (navigationData[section]) {
                const pageData = navigationData[section].pages.find(p => p.id === page);
                if (pageData) {
                    this.navigateToPage(section, page, pageData.file, false);
                    return;
                }
            }
        }
        // Default to server fundamentals overview
        this.navigateToPage('server-fundamentals', 'index', 'server-fundamentals/index.html', false);
    }

    async navigateToPage(section, page, file, pushState = true) {
        // Show loading spinner
        document.getElementById('loading-spinner').classList.remove('hidden');

        try {
            // Load content
            const content = await window.contentLoader.loadContent(file);

            // Update state
            this.currentSection = section;
            this.currentPage = page;

            // Update URL and history
            const url = `#${section}/${page}`;
            if (pushState) {
                window.history.pushState({ section, page, file }, '', url);
            }

            // Update UI
            this.updateActiveStates(section, page);
            this.updateBreadcrumb(section, page);
            this.updateProgress(section, page);
            this.updateNavigation(section, page);

            // Add to recently viewed
            this.addToRecentlyViewed(section, page);

            // Hide loading spinner
            document.getElementById('loading-spinner').classList.add('hidden');

        } catch (error) {
            console.error('Navigation error:', error);
            document.getElementById('loading-spinner').classList.add('hidden');
            // Show error state
            document.getElementById('main-content').innerHTML = `
        <div class="prose dark:prose-invert max-w-none">
          <h1>Page Not Found</h1>
          <p>The requested page could not be loaded. Please try again or select a different page from the sidebar.</p>
        </div>
      `;
        }
    }

    updateActiveStates(section, page) {
        // Remove all active states
        document.querySelectorAll('.page-link').forEach(link => {
            link.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
        });

        // Add active state to current page
        const activeLink = document.querySelector(`[data-section="${section}"][data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');

            // Ensure section is expanded
            const sectionPages = activeLink.closest('.section-pages');
            if (sectionPages && sectionPages.classList.contains('hidden')) {
                const sectionButton = sectionPages.previousElementSibling;
                this.toggleSection(section, sectionButton, sectionPages);
            }
        }
    }

    updateBreadcrumb(section, page) {
        const breadcrumb = document.getElementById('breadcrumb');
        const sectionData = navigationData[section];
        const pageData = sectionData.pages.find(p => p.id === page);

        breadcrumb.innerHTML = `
      <a href="#" class="hover:text-blue-500">Home</a>
      <span>/</span>
      <a href="#${section}/index" class="hover:text-blue-500">${sectionData.title}</a>
      ${page !== 'index' ? `<span>/</span><span class="text-gray-900 dark:text-gray-100">${pageData.title}</span>` : ''}
    `;
    }

    updateProgress(section, page) {
        const sectionData = navigationData[section];
        const currentIndex = sectionData.pages.findIndex(p => p.id === page);
        const progress = ((currentIndex + 1) / sectionData.pages.length) * 100;

        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('page-progress').textContent = `${currentIndex + 1} of ${sectionData.pages.length}`;
    }

    updateNavigation(section, page) {
        const sectionData = navigationData[section];
        const currentIndex = sectionData.pages.findIndex(p => p.id === page);

        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const contentNav = document.getElementById('content-navigation');

        // Show/hide navigation
        contentNav.classList.remove('hidden');

        // Previous button
        if (currentIndex > 0) {
            const prevPage = sectionData.pages[currentIndex - 1];
            prevBtn.classList.remove('hidden');
            prevBtn.onclick = () => this.navigateToPage(section, prevPage.id, prevPage.file);
        } else {
            prevBtn.classList.add('hidden');
        }

        // Next button
        if (currentIndex < sectionData.pages.length - 1) {
            const nextPage = sectionData.pages[currentIndex + 1];
            nextBtn.classList.remove('hidden');
            nextBtn.onclick = () => this.navigateToPage(section, nextPage.id, nextPage.file);
        } else {
            nextBtn.classList.add('hidden');
        }
    }

    addToRecentlyViewed(section, page) {
        const item = { section, page, timestamp: Date.now() };
        this.recentlyViewed = this.recentlyViewed.filter(
            item => !(item.section === section && item.page === page)
        );
        this.recentlyViewed.unshift(item);
        this.recentlyViewed = this.recentlyViewed.slice(0, 10); // Keep only 10 recent items
        localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    }

    handleHeaderNavigation(route) {
        switch (route) {
            case 'home':
                this.navigateToPage('server-fundamentals', 'index', 'server-fundamentals/index.html');
                break;
            case 'guides':
                this.navigateToPage('express-js', 'index', 'express-js/index.html');
                break;
            case 'api-explorer':
                this.showApiExplorer();
                break;
            case 'tools':
                this.showTools();
                break;
        }
    }

    showApiExplorer() {
        document.getElementById('main-content').innerHTML = `
      <div class="prose dark:prose-invert max-w-none">
        <h1>API Explorer</h1>
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <form id="api-form" class="space-y-4">
            <div class="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
              <select id="api-method" class="p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>PATCH</option>
                <option>DELETE</option>
              </select>
              <input id="api-url" type="text" placeholder="https://api.example.com/endpoint" class="p-2 flex-1 border rounded dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <textarea id="api-body" rows="5" placeholder="Request Body (JSON)" class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 hidden"></textarea>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Send Request</button>
          </form>
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Response</h3>
            <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto"><code id="api-response" class="language-json">Click "Send Request" to see the response</code></pre>
          </div>
        </div>
      </div>
    `;

        // Re-initialize API form
        window.apiExplorer.init();
    }

    showTools() {
        document.getElementById('main-content').innerHTML = `
      <div class="prose dark:prose-invert max-w-none">
        <h1>Developer Tools</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold mb-2">JSON Formatter</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Format and validate JSON data</p>
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Open Tool</button>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold mb-2">SQL Query Builder</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Build and test SQL queries</p>
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Open Tool</button>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold mb-2">Database Schema Designer</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Design database schemas visually</p>
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Open Tool</button>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold mb-2">Code Snippet Manager</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Save and organize code snippets</p>
            <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Open Tool</button>
          </div>
        </div>
      </div>
    `;
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
});
