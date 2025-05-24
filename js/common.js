document.addEventListener('DOMContentLoaded', function () {
    // Add animation styles to the document
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes wave {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
        .animate-wave {
            animation: wave 15s linear infinite;
        }
        @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        .animate-float {
            animation: floating 6s ease-in-out infinite;
        }
        @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.7; }
            50% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(0.95); opacity: 0.7; }
        }
    `;
    document.head.appendChild(animationStyles);

    // Load header
    const headerContainer = document.getElementById('header');
    if (headerContainer) {
        headerContainer.innerHTML = `
      <header class="relative overflow-hidden shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-br from-green-900 via-green-700 to-green-500 opacity-90"></div>
        <!-- Animated pattern overlay -->
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTlWOGgtMnYxN2gyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>

        <div class="container relative mx-auto px-6 py-10">
          <div class="flex flex-col md:flex-row md:justify-between md:items-center">
            <div class="flex items-center mb-6 md:mb-0">
              <!-- Animated logo -->
              <div class="mr-4 relative">
                <div class="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white relative" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div>
                <h1 class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200 drop-shadow-lg">Express.js</h1>
                <p class="text-green-100 text-sm tracking-wider font-light">COMPREHENSIVE DOCUMENTATION</p>
              </div>
            </div>
            
            <nav class="w-full md:w-auto">
              <ul class="flex flex-wrap justify-center md:justify-end gap-2 md:gap-3">
                <li><a href="index.html" class="inline-block px-4 py-2 rounded-md bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-green-500 hover:bg-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-white shadow-sm">Home</a></li>
                <li><a href="sections/introduction.html" class="inline-block px-4 py-2 rounded-md bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-green-500 hover:bg-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-white shadow-sm">Introduction</a></li>
                <li><a href="sections/routing.html" class="inline-block px-4 py-2 rounded-md bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-green-500 hover:bg-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-white shadow-sm">Routing</a></li>
                <li><a href="sections/middleware.html" class="inline-block px-4 py-2 rounded-md bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-green-500 hover:bg-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-white shadow-sm">Middleware</a></li>
                <li><a href="sections/error-handling.html" class="inline-block px-4 py-2 rounded-md bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-green-500 hover:bg-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-white shadow-sm">Error Handling</a></li>
                <li><a href="sections/template-engines.html" class="inline-block px-4 py-2 rounded-md bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-green-500 hover:bg-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-white shadow-sm">Template Engines</a></li>
                <li><a href="sections/database-integration.html" class="inline-block px-4 py-2 rounded-md bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 hover:bg-green-500 hover:bg-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-white shadow-sm">Database</a></li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="h-1.5 bg-gradient-to-r from-green-300 via-green-400 to-green-200 shadow-md"></div>
      </header>
    `;
    }

    // Load footer
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        footerContainer.innerHTML = `
      <footer class="mt-12 relative overflow-hidden">
        <div class="h-1.5 bg-gradient-to-r from-green-300 via-green-400 to-green-200 shadow-md"></div>
        <div class="relative">
          <!-- Background with pattern -->
          <div class="absolute inset-0 bg-gradient-to-br from-green-800 via-green-600 to-green-500"></div>
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTlWOGgtMnYxN2gyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
          
          <div class="container relative mx-auto px-6 py-16">
            <div class="flex flex-col md:flex-row justify-between items-center md:items-start">
              <!-- Logo and intro section -->
              <div class="mb-10 md:mb-0 text-center md:text-left max-w-md">
                <div class="flex items-center justify-center md:justify-start mb-5">
                  <div class="relative mr-3">
                    <div class="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white relative" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-green-200">Express.js</h2>
                    <p class="text-xs text-green-100 uppercase tracking-wider">Documentation</p>
                  </div>
                </div>
                <p class="text-green-100 mb-6">A comprehensive guide to Express.js framework - the most popular web application framework for Node.js</p>
                
                <!-- Social icons with fancy hover effects -->
                <div class="flex mt-6 space-x-5 justify-center md:justify-start">
                  <a href="https://github.com/expressjs/express" class="group">
                    <div class="bg-white bg-opacity-10 h-10 w-10 rounded-full flex items-center justify-center border border-white border-opacity-20 transition-all duration-300 group-hover:bg-white group-hover:bg-opacity-20 group-hover:scale-110">
                      <svg class="h-5 w-5 text-white group-hover:text-green-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </a>
                  <a href="https://twitter.com/expressjs" class="group">
                    <div class="bg-white bg-opacity-10 h-10 w-10 rounded-full flex items-center justify-center border border-white border-opacity-20 transition-all duration-300 group-hover:bg-white group-hover:bg-opacity-20 group-hover:scale-110">
                      <svg class="h-5 w-5 text-white group-hover:text-green-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </div>
                  </a>
                  <a href="https://discord.gg/express" class="group">
                    <div class="bg-white bg-opacity-10 h-10 w-10 rounded-full flex items-center justify-center border border-white border-opacity-20 transition-all duration-300 group-hover:bg-white group-hover:bg-opacity-20 group-hover:scale-110">
                      <svg class="h-5 w-5 text-white group-hover:text-green-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.608 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1634-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16">
                <!-- Resources Column -->
                <div>
                  <h3 class="text-xl font-semibold mb-6 text-white relative inline-block">
                    Resources
                    <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-200 transform -translate-y-1"></span>
                  </h3>
                  <ul class="space-y-4">
                    <li>
                      <a href="https://expressjs.com/" class="flex items-center text-green-100 hover:text-white group">
                        <span class="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-all duration-300"></span>
                        <span class="border-b border-transparent group-hover:border-green-300 pb-0.5 transition-all duration-300">Official Website</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/expressjs/express" class="flex items-center text-green-100 hover:text-white group">
                        <span class="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-all duration-300"></span>
                        <span class="border-b border-transparent group-hover:border-green-300 pb-0.5 transition-all duration-300">GitHub Repository</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.npmjs.com/package/express" class="flex items-center text-green-100 hover:text-white group">
                        <span class="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-all duration-300"></span>
                        <span class="border-b border-transparent group-hover:border-green-300 pb-0.5 transition-all duration-300">NPM Package</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://expressjs.com/en/resources/middleware.html" class="flex items-center text-green-100 hover:text-white group">
                        <span class="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-all duration-300"></span>
                        <span class="border-b border-transparent group-hover:border-green-300 pb-0.5 transition-all duration-300">Middleware</span>
                      </a>
                    </li>
                  </ul>
                </div>
                
                <!-- Learn More Column -->
                <div>
                  <h3 class="text-xl font-semibold mb-6 text-white relative inline-block">
                    Learn More
                    <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-200 transform -translate-y-1"></span>
                  </h3>
                  <ul class="space-y-4">
                    <li>
                      <a href="https://nodejs.org/" class="flex items-center text-green-100 hover:text-white group">
                        <span class="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-all duration-300"></span>
                        <span class="border-b border-transparent group-hover:border-green-300 pb-0.5 transition-all duration-300">Node.js</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs" class="flex items-center text-green-100 hover:text-white group">
                        <span class="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-all duration-300"></span>
                        <span class="border-b border-transparent group-hover:border-green-300 pb-0.5 transition-all duration-300">MDN Express/Node.js Tutorial</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.tutorialspoint.com/expressjs/index.htm" class="flex items-center text-green-100 hover:text-white group">
                        <span class="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-all duration-300"></span>
                        <span class="border-b border-transparent group-hover:border-green-300 pb-0.5 transition-all duration-300">Tutorials</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.w3schools.com/nodejs/nodejs_express.asp" class="flex items-center text-green-100 hover:text-white group">
                        <span class="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2 group-hover:scale-125 transition-all duration-300"></span>
                        <span class="border-b border-transparent group-hover:border-green-300 pb-0.5 transition-all duration-300">W3Schools Express</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Copyright section with animated wave border -->
            <div class="relative mt-16">
              <div class="absolute top-0 left-0 right-0">
                <div class="absolute top-0 left-0 w-full h-3 overflow-hidden">
                  <div class="flex w-full h-full">
                    <div class="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMjApIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0NDAuNTIgODEuNTE5Yy0yODcuMDMgMC01NzQuMDUgMzguNDgxLTcyMC41OC0uMDAyLTE0Ni41Mi0zOC40ODQtNDMzLjU1IDAtNzIwLjU4IDBWMTIwaDEyMjEuMlY4MS41MTl6IiBmaWxsPSIjMzg4ZTNjIiBmaWxsLW9wYWNpdHk9Ii4yIi8+PC9zdmc+')] bg-repeat-x animate-wave"></div>
                  </div>
                </div>
              </div>
              <div class="pt-8 border-t border-green-700 border-opacity-50 text-center">
                <p class="text-green-200 text-sm">&copy; ${new Date().getFullYear()} Express.js Documentation. Created for learning purposes.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
    }

    // Add active class to current page in navigation
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('bg-green-400', 'text-white', 'font-semibold', 'shadow-lg');
            link.classList.remove('bg-green-700', 'bg-opacity-40');
        } else if (currentLocation.endsWith('index.html') && linkPath === 'index.html' ||
            (currentLocation.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('bg-green-400', 'text-white', 'font-semibold', 'shadow-lg');
            link.classList.remove('bg-green-700', 'bg-opacity-40');
        }

        // Add animation to active link
        if (link.classList.contains('bg-green-400')) {
            link.style.position = 'relative';
            link.style.overflow = 'hidden';

            // Create and append the pulse effect
            const pulse = document.createElement('span');
            pulse.className = 'absolute inset-0 bg-white bg-opacity-30 rounded-md';
            pulse.style.animation = 'pulse 2s infinite';
            link.insertBefore(pulse, link.firstChild);
        }
    });
});

