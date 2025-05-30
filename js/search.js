class SearchManager {
    constructor() {
        this.searchIndex = new Map();
        this.searchResults = [];
        this.isIndexed = false;
        this.init();
    }

    init() {
        this.setupSearchInput();
        this.buildSearchIndex();
    }

    setupSearchInput() {
        const searchInput = document.getElementById('search');
        const searchResults = this.createSearchResults();

        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#search') && !e.target.closest('#search-results')) {
                searchResults.classList.add('hidden');
            }
        });

        // Show search results when focusing on search input
        searchInput.addEventListener('focus', () => {
            if (this.searchResults.length > 0) {
                searchResults.classList.remove('hidden');
            }
        });
    }

    createSearchResults() {
        const searchContainer = document.querySelector('#search').parentElement;
        const searchResults = document.createElement('div');
        searchResults.id = 'search-results';
        searchResults.className = 'absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-b-lg shadow-lg max-h-96 overflow-y-auto z-10 hidden';
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(searchResults);
        return searchResults;
    }

    async buildSearchIndex() {
        const navigationData = window.navigationManager?.navigationData || {};

        for (const [sectionKey, section] of Object.entries(navigationData)) {
            for (const page of section.pages) {
                try {
                    // Try to fetch actual content, fallback to generated content
                    let content;
                    try {
                        const response = await fetch(`content/${page.file}`);
                        content = response.ok ? await response.text() : '';
                    } catch {
                        content = '';
                    }

                    if (!content) {
                        content = this.generateIndexableContent(sectionKey, page);
                    }

                    this.indexContent(sectionKey, page, content);
                } catch (error) {
                    console.warn(`Failed to index ${page.file}:`, error);
                }
            }
        }

        this.isIndexed = true;
    }

    generateIndexableContent(sectionKey, page) {
        const sectionTitles = {
            'server-fundamentals': 'Server Fundamentals',
            'express-js': 'Express.js Framework',
            'rest-api': 'REST API Development',
            'databases': 'Database Integration',
            'prisma': 'Prisma ORM',
            'mongodb': 'MongoDB NoSQL',
            'deployment': 'Deployment DevOps',
            'advanced': 'Advanced Topics'
        };

        const keywords = {
            'server-fundamentals': ['server', 'http', 'request', 'response', 'architecture', 'security', 'environment'],
            'express-js': ['express', 'middleware', 'routing', 'authentication', 'testing', 'error handling'],
            'rest-api': ['rest', 'api', 'http methods', 'status codes', 'versioning', 'rate limiting', 'cors'],
            'databases': ['sql', 'database', 'query', 'optimization', 'transactions', 'migrations'],
            'prisma': ['prisma', 'orm', 'schema', 'crud', 'relations', 'typescript'],
            'mongodb': ['mongodb', 'nosql', 'document', 'aggregation', 'mongoose', 'indexing'],
            'deployment': ['docker', 'ci/cd', 'cloud', 'monitoring', 'logging', 'deployment'],
            'advanced': ['caching', 'microservices', 'message queues', 'graphql', 'websockets']
        };

        const sectionKeywords = keywords[sectionKey] || [];
        const pageTitle = page.title;
        const sectionTitle = sectionTitles[sectionKey];

        return `${pageTitle} ${sectionTitle} ${sectionKeywords.join(' ')}`;
    }

    indexContent(sectionKey, page, content) {
        // Extract text content from HTML
        const textContent = this.extractTextFromHTML(content);
        const words = this.tokenize(textContent);

        const pageData = {
            section: sectionKey,
            page: page.id,
            title: page.title,
            file: page.file,
            content: textContent
        };

        words.forEach(word => {
            if (!this.searchIndex.has(word)) {
                this.searchIndex.set(word, []);
            }
            this.searchIndex.get(word).push(pageData);
        });
    }

    extractTextFromHTML(html) {
        // Create a temporary element to parse HTML
        const temp = document.createElement('div');
        temp.innerHTML = html;

        // Remove script and style elements
        temp.querySelectorAll('script, style').forEach(el => el.remove());

        return temp.textContent || temp.innerText || '';
    }

    tokenize(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2)
            .filter(word => !this.isStopWord(word));
    }

    isStopWord(word) {
        const stopWords = new Set([
            'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
            'this', 'that', 'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could'
        ]);
        return stopWords.has(word);
    }

    performSearch(query) {
        const searchResults = document.getElementById('search-results');

        if (!query.trim()) {
            searchResults.classList.add('hidden');
            this.searchResults = [];
            return;
        }

        if (!this.isIndexed) {
            searchResults.innerHTML = '<div class="p-4 text-gray-500">Building search index...</div>';
            searchResults.classList.remove('hidden');
            return;
        }

        const results = this.search(query);
        this.displaySearchResults(results);
    }

    search(query) {
        const queryWords = this.tokenize(query);
        const resultMap = new Map();

        queryWords.forEach(word => {
            const matches = this.searchIndex.get(word) || [];
            matches.forEach(page => {
                const key = `${page.section}-${page.page}`;
                if (!resultMap.has(key)) {
                    resultMap.set(key, { ...page, score: 0 });
                }
                resultMap.get(key).score += 1;
            });
        });

        // Sort by relevance score
        const results = Array.from(resultMap.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, 10); // Limit to 10 results

        return results;
    }

    displaySearchResults(results) {
        const searchResults = document.getElementById('search-results');
        this.searchResults = results;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="p-4 text-gray-500">No results found</div>';
        } else {
            const resultHtml = results.map((result, index) => `
        <div class="search-result p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0" data-index="${index}">
          <div class="font-medium">${result.title}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">${this.getSectionTitle(result.section)}</div>
        </div>
      `).join('');

            searchResults.innerHTML = resultHtml;

            // Add click handlers
            searchResults.querySelectorAll('.search-result').forEach(el => {
                el.addEventListener('click', () => {
                    const index = parseInt(el.dataset.index);
                    this.selectSearchResult(index);
                });
            });
        }

        searchResults.classList.remove('hidden');
    }

    getSectionTitle(sectionKey) {
        const sectionTitles = {
            'server-fundamentals': 'Server Fundamentals',
            'express-js': 'Express.js Framework',
            'rest-api': 'REST API Development',
            'databases': 'Database Integration',
            'prisma': 'Prisma ORM',
            'mongodb': 'MongoDB & NoSQL',
            'deployment': 'Deployment & DevOps',
            'advanced': 'Advanced Topics'
        };
        return sectionTitles[sectionKey] || sectionKey;
    }

    selectSearchResult(index) {
        const result = this.searchResults[index];
        if (result && window.navigationManager) {
            // Hide search results
            document.getElementById('search-results').classList.add('hidden');

            // Clear search input
            document.getElementById('search').value = '';

            // Navigate to the selected page
            window.navigationManager.navigateToPage(result.section, result.page, result.file);
        }
    }

    // Keyboard navigation for search results
    setupKeyboardNavigation() {
        const searchInput = document.getElementById('search');
        let selectedIndex = -1;

        searchInput.addEventListener('keydown', (e) => {
            const searchResults = document.getElementById('search-results');
            const results = searchResults.querySelectorAll('.search-result');

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
                    this.highlightResult(results, selectedIndex);
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    selectedIndex = Math.max(selectedIndex - 1, -1);
                    this.highlightResult(results, selectedIndex);
                    break;

                case 'Enter':
                    e.preventDefault();
                    if (selectedIndex >= 0) {
                        this.selectSearchResult(selectedIndex);
                    }
                    break;

                case 'Escape':
                    searchResults.classList.add('hidden');
                    selectedIndex = -1;
                    break;
            }
        });
    }

    highlightResult(results, selectedIndex) {
        results.forEach((result, index) => {
            if (index === selectedIndex) {
                result.classList.add('bg-blue-100', 'dark:bg-blue-800');
            } else {
                result.classList.remove('bg-blue-100', 'dark:bg-blue-800');
            }
        });
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.searchManager = new SearchManager();
});
