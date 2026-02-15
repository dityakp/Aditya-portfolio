/* ==================================
   GitHub API Integration Module
   ================================== */

// Configuration
const GITHUB_CONFIG = {
    username: 'dityakp',
    // Only show pinned repos (those in manualRepos or with featuredTopic)
    showOnlyPinned: true,
    featuredTopic: 'portfolio-featured',
    manualRepos: [
        // Add your pinned repository names here
        'strapi-blue-green',
        'django-todo',
        'attend-mngmnt'
    ],
    excludeForked: true,
    excludeArchived: true,
    sortBy: 'updated', // 'updated', 'stars', 'created'
    cacheTimeout: 3600000 // 1 hour in milliseconds
};

// Cache key for localStorage
const CACHE_KEY = 'github_repos_cache';
const CACHE_TIMESTAMP_KEY = 'github_repos_cache_timestamp';

/**
 * Check if cached data is still valid
 */
function isCacheValid() {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!timestamp) return false;

    const age = Date.now() - parseInt(timestamp);
    return age < GITHUB_CONFIG.cacheTimeout;
}

/**
 * Get cached repository data
 */
function getCachedData() {
    if (isCacheValid()) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            try {
                const data = JSON.parse(cached);
                // Convert date strings back to Date objects
                return data.map(repo => ({
                    ...repo,
                    updatedAt: new Date(repo.updatedAt),
                    createdAt: new Date(repo.createdAt)
                }));
            } catch (e) {
                console.error('Error parsing cached data:', e);
                return null;
            }
        }
    }
    return null;
}

/**
 * Save repository data to cache
 */
function setCacheData(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (e) {
        console.error('Error caching data:', e);
    }
}

/**
 * Fetch repositories from GitHub API
 */
async function fetchGitHubRepos() {
    // Check cache first
    const cached = getCachedData();
    if (cached) {
        console.log('Using cached GitHub data');
        return cached;
    }

    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_CONFIG.username}/repos?per_page=100&sort=${GITHUB_CONFIG.sortBy}`
        );

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('GitHub API rate limit exceeded. Please try again later.');
            }
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();
        const filteredRepos = filterRepos(repos);
        const formattedRepos = await Promise.all(
            filteredRepos.map(repo => formatRepoData(repo))
        );

        // Cache the results
        setCacheData(formattedRepos);

        return formattedRepos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        throw error;
    }
}

/**
 * Filter repositories based on configuration
 */
function filterRepos(repos) {
    let filtered = repos.filter(repo => {
        // Exclude forks if configured
        if (GITHUB_CONFIG.excludeForked && repo.fork) {
            return false;
        }

        // Exclude archived if configured
        if (GITHUB_CONFIG.excludeArchived && repo.archived) {
            return false;
        }

        // Only include public repos
        if (repo.private) {
            return false;
        }

        return true;
    });

    // Get pinned repos (those with featured topic or in manual list)
    const pinned = filtered.filter(repo =>
        repo.topics?.includes(GITHUB_CONFIG.featuredTopic) ||
        GITHUB_CONFIG.manualRepos.includes(repo.name)
    );

    // If showOnlyPinned is true, return only pinned repos
    if (GITHUB_CONFIG.showOnlyPinned) {
        return pinned;
    }

    // Otherwise, prioritize pinned repos then show others
    if (pinned.length > 0) {
        const nonPinned = filtered.filter(repo =>
            !repo.topics?.includes(GITHUB_CONFIG.featuredTopic) &&
            !GITHUB_CONFIG.manualRepos.includes(repo.name)
        );
        filtered = [...pinned, ...nonPinned];
    }

    return filtered;
}

/**
 * Format repository data for display
 */
async function formatRepoData(repo) {
    return {
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'No description available',
        url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        updatedAt: new Date(repo.updated_at),
        createdAt: new Date(repo.created_at),
        isFeatured: repo.topics?.includes(GITHUB_CONFIG.featuredTopic) ||
            GITHUB_CONFIG.manualRepos.includes(repo.name)
    };
}

/**
 * Render repositories to the DOM
 */
function renderProjects(repos, container) {
    if (!container) return;

    // Clear loading state
    const loading = document.querySelector('.github-loading');
    if (loading) loading.style.display = 'none';

    // Clear existing content
    container.innerHTML = '';

    // Render each repository
    repos.forEach((repo, index) => {
        const card = createProjectCard(repo, index);
        container.appendChild(card);
    });
}

/**
 * Create a project card element
 */
function createProjectCard(repo, index) {
    const card = document.createElement('div');
    card.className = 'github-project-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;

    // Format date
    const updatedDate = repo.updatedAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
    });

    // Create topics/tech tags HTML
    const topicsHTML = repo.topics.slice(0, 5).map(topic =>
        `<span class="tech-tag">${topic}</span>`
    ).join('');

    // Add language badge if available
    const languageHTML = repo.language ?
        `<span class="tech-tag">${repo.language}</span>` : '';

    card.innerHTML = `
        <div class="github-project-header">
            <h3>
                <a href="${repo.url}" target="_blank" rel="noopener noreferrer">
                    ${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </a>
            </h3>
            ${repo.isFeatured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
        </div>
        
        <p class="github-project-description">${repo.description}</p>
        
        <div class="project-tech">
            ${languageHTML}
            ${topicsHTML}
        </div>
        
        <div class="repo-stats">
            <div class="repo-stat">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                </svg>
                <span>${repo.stars}</span>
            </div>
            <div class="repo-stat">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                </svg>
                <span>${repo.forks}</span>
            </div>
            <div class="repo-stat">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.5 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.471.696l2.5 1a.75.75 0 00.557-1.392L8.5 7.742V4.75z"/>
                </svg>
                <span>${updatedDate}</span>
            </div>
        </div>
        
        <div class="project-links">
            <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                View Code
            </a>
            ${repo.homepage ?
            `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                    Live Demo
                </a>` : ''
        }
        </div>
    `;

    return card;
}

/**
 * Apply GSAP animations to project cards
 */
function animateProjectCards() {
    if (typeof gsap === 'undefined') return;

    gsap.utils.toArray('.github-project-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 30, scale: 0.98 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true
                }
            }
        );
    });
}

/**
 * Initialize GitHub projects
 */
async function initGitHubProjects() {
    const container = document.querySelector('#github-projects-container');
    const loading = document.querySelector('.github-loading');
    const errorDiv = document.querySelector('.github-error');

    if (!container) {
        console.error('GitHub projects container not found');
        return;
    }

    try {
        const repos = await fetchGitHubRepos();
        renderProjects(repos, container);

        // Wait a bit for DOM to update, then apply animations
        setTimeout(() => {
            animateProjectCards();
        }, 100);

    } catch (error) {
        console.error('Failed to load GitHub projects:', error);
        if (loading) loading.style.display = 'none';
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = `
                <p>Unable to load projects from GitHub.</p>
                <p class="error-message">${error.message}</p>
            `;
        }
    }
}

// Export for use in main.js
window.initGitHubProjects = initGitHubProjects;
window.fetchGitHubRepos = fetchGitHubRepos;
