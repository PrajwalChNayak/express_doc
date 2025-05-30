class ContentLoader {
    constructor() {
        this.cache = new Map();
        this.loadingPromises = new Map();
    }

    async loadContent(filePath) {
        // Check cache first
        if (this.cache.has(filePath)) {
            this.displayContent(this.cache.get(filePath));
            return this.cache.get(filePath);
        }

        // Check if already loading
        if (this.loadingPromises.has(filePath)) {
            return this.loadingPromises.get(filePath);
        }

        // Create loading promise
        const loadingPromise = this.fetchContent(filePath);
        this.loadingPromises.set(filePath, loadingPromise);

        try {
            const content = await loadingPromise;
            this.cache.set(filePath, content);
            this.displayContent(content);
            return content;
        } finally {
            this.loadingPromises.delete(filePath);
        }
    }

    async fetchContent(filePath) {
        try {
            const response = await fetch(`content/${filePath}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.warn(`Failed to load ${filePath}, using fallback content`);
            return this.getFallbackContent(filePath);
        }
    }

    displayContent(html) {
        const mainContent = document.getElementById('main-content');

        // Fade out
        mainContent.style.opacity = '0';

        setTimeout(() => {
            mainContent.innerHTML = html;

            // Re-highlight syntax
            if (window.Prism) {
                Prism.highlightAll();
            }

            // Fade in
            mainContent.style.opacity = '1';

            // Scroll to top
            mainContent.scrollTop = 0;

            // Initialize any interactive components
            this.initializeInteractiveComponents();
        }, 150);
    }

    initializeInteractiveComponents() {
        // Initialize copy buttons for code blocks
        this.initCodeCopyButtons();

        // Initialize expandable sections
        this.initExpandableSections();

        // Initialize tabbed content
        this.initTabbedContent();
    }

    initCodeCopyButtons() {
        document.querySelectorAll('pre code').forEach(codeBlock => {
            if (!codeBlock.parentElement.querySelector('.copy-btn')) {
                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn absolute top-2 right-2 px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 opacity-0 transition-opacity';
                copyBtn.textContent = 'Copy';
                copyBtn.onclick = () => this.copyToClipboard(codeBlock.textContent, copyBtn);

                codeBlock.parentElement.style.position = 'relative';
                codeBlock.parentElement.appendChild(copyBtn);

                codeBlock.parentElement.addEventListener('mouseenter', () => {
                    copyBtn.style.opacity = '1';
                });

                codeBlock.parentElement.addEventListener('mouseleave', () => {
                    copyBtn.style.opacity = '0';
                });
            }
        });
    }

    async copyToClipboard(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.className = button.className.replace('bg-gray-600', 'bg-green-600');
            setTimeout(() => {
                button.textContent = originalText;
                button.className = button.className.replace('bg-green-600', 'bg-gray-600');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    initExpandableSections() {
        document.querySelectorAll('[data-expandable]').forEach(section => {
            const trigger = section.querySelector('[data-expand-trigger]');
            const content = section.querySelector('[data-expand-content]');

            if (trigger && content) {
                trigger.addEventListener('click', () => {
                    const isExpanded = !content.classList.contains('hidden');
                    content.classList.toggle('hidden');

                    const icon = trigger.querySelector('svg');
                    if (icon) {
                        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
                    }
                });
            }
        });
    }

    initTabbedContent() {
        document.querySelectorAll('[data-tabs]').forEach(tabContainer => {
            const tabs = tabContainer.querySelectorAll('[data-tab]');
            const contents = tabContainer.querySelectorAll('[data-tab-content]');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const targetId = tab.dataset.tab;

                    // Update tab states
                    tabs.forEach(t => t.classList.remove('border-blue-500', 'text-blue-600'));
                    tab.classList.add('border-blue-500', 'text-blue-600');

                    // Update content visibility
                    contents.forEach(content => {
                        if (content.dataset.tabContent === targetId) {
                            content.classList.remove('hidden');
                        } else {
                            content.classList.add('hidden');
                        }
                    });
                });
            });
        });
    }

    getFallbackContent(filePath) {
        const pathParts = filePath.split('/');
        const section = pathParts[0];
        const page = pathParts[1]?.replace('.html', '') || 'index';

        // Generate fallback content based on section and page
        return this.generateFallbackContent(section, page);
    }

    generateFallbackContent(section, page) {
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

        const pageTemplates = {
            'index': (sectionTitle) => `
        <div class="prose dark:prose-invert max-w-none">
          <h1>${sectionTitle} Overview</h1>
          <p>Welcome to the ${sectionTitle} section. This comprehensive guide covers everything you need to know about ${sectionTitle.toLowerCase()}.</p>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
            <h3 class="text-blue-800 dark:text-blue-200 mb-2">📚 What You'll Learn</h3>
            <ul class="text-blue-700 dark:text-blue-300">
              <li>Core concepts and fundamentals</li>
              <li>Best practices and patterns</li>
              <li>Real-world examples and use cases</li>
              <li>Advanced techniques and optimization</li>
            </ul>
          </div>

          <h2>Getting Started</h2>
          <p>Use the sidebar navigation to explore specific topics within this section. Each topic includes practical examples, code snippets, and detailed explanations.</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-6">
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 class="font-semibold mb-2">🚀 Quick Start</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Jump right into the basics and get up and running quickly.</p>
            </div>
            <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 class="font-semibold mb-2">📖 In-Depth Guide</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Comprehensive coverage of all topics with detailed examples.</p>
            </div>
          </div>
        </div>
      `,
            'default': (sectionTitle, pageTitle) => `
        <div class="prose dark:prose-invert max-w-none">
          <h1>${pageTitle}</h1>
          <p>This section covers ${pageTitle.toLowerCase()} in the context of ${sectionTitle.toLowerCase()}.</p>
          
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6">
            <h3 class="text-yellow-800 dark:text-yellow-200 mb-2">🚧 Content Loading</h3>
            <p class="text-yellow-700 dark:text-yellow-300">This content is being loaded. If this message persists, the content file may not be available yet.</p>
          </div>

          <h2>Overview</h2>
          <p>This topic is an important part of ${sectionTitle.toLowerCase()} and includes:</p>
          
          <ul>
            <li>Conceptual explanations</li>
            <li>Practical examples</li>
            <li>Best practices</li>
            <li>Common pitfalls to avoid</li>
          </ul>

          <h2>Example Code</h2>
          <p>Here's a basic example to get you started:</p>
          
          <pre><code class="language-javascript">// Example code will be added here
console.log('Hello, ${pageTitle}!');

// More comprehensive examples coming soon
function example() {
  return 'This is a placeholder example';
}</code></pre>

          <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6">
            <h3 class="text-green-800 dark:text-green-200 mb-2">💡 Pro Tip</h3>
            <p class="text-green-700 dark:text-green-300">Check back regularly as we continue to add more comprehensive content to this section.</p>
          </div>
        </div>
      `
        };

        const sectionTitle = sectionTitles[section] || section;
        const pageTitle = page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ');

        if (page === 'index') {
            return pageTemplates.index(sectionTitle);
        } else {
            return pageTemplates.default(sectionTitle, pageTitle);
        }
    }

    clearCache() {
        this.cache.clear();
    }

    preloadContent(filePaths) {
        filePaths.forEach(filePath => {
            if (!this.cache.has(filePath) && !this.loadingPromises.has(filePath)) {
                this.loadContent(filePath);
            }
        });
    }
}

// Initialize content loader
document.addEventListener('DOMContentLoaded', () => {
    window.contentLoader = new ContentLoader();
});
