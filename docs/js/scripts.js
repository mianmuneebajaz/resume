/*!
    * Start Bootstrap - Resume v6.0.1 (https://startbootstrap.com/template-overviews/resume)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
    */
// Shared check for the user's reduced motion preference
function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

// Move keyboard and screen reader focus to a scroll target without jumping
function focusTarget(el) {
    if (!el) return;
    if (!el.hasAttribute("tabindex") && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
        el.setAttribute("tabindex", "-1");
    }
    try {
        el.focus({ preventScroll: true });
    } catch (err) {
        el.focus();
    }
}

    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                var scrollTop = target.offset().top;
                if (prefersReducedMotion()) {
                    $("html, body").stop().scrollTop(scrollTop);
                    focusTarget(target[0]);
                } else {
                    $("html, body")
                        .stop()
                        .animate({ scrollTop: scrollTop }, 1000, "easeInOutExpo")
                        .promise()
                        .done(function () {
                            focusTarget(target[0]);
                        });
                }
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#sideNav",
    });
})(jQuery); // End of use strict

// ============================================
// INNOVATIVE SKILLS SECTION
// ============================================

// Skills Data Structure
const skillsDatabase = [
    {
        name: "MERN Stack",
        category: "fullstack",
        icon: "fas fa-layer-group",
        level: 95,
        description: "Expert in MongoDB, Express.js, React.js, and Node.js full-stack development"
    },
    {
        name: "JavaScript",
        category: "frontend",
        icon: "fab fa-js",
        level: 95,
        description: "Advanced JavaScript including ES6+, async/await, and modern patterns"
    },
    {
        name: "React.js",
        category: "frontend",
        icon: "fab fa-react",
        level: 90,
        description: "Building modern, performant UIs with React hooks, context, and state management"
    },
    {
        name: "Node.js",
        category: "backend",
        icon: "fab fa-node-js",
        level: 90,
        description: "Scalable server-side applications with Node.js and Express"
    },
    {
        name: "TypeScript",
        category: "frontend",
        icon: "fas fa-code",
        level: 85,
        description: "Type-safe development with TypeScript for robust applications"
    },
    {
        name: "MongoDB",
        category: "database",
        icon: "fas fa-database",
        level: 85,
        description: "NoSQL database design, optimization, and aggregation pipelines"
    },
    {
        name: "AWS Lambda",
        category: "cloud",
        icon: "fab fa-aws",
        level: 88,
        description: "Serverless computing and function-as-a-service solutions"
    },
    {
        name: "AWS DynamoDB",
        category: "cloud",
        icon: "fas fa-server",
        level: 80,
        description: "NoSQL cloud database solutions with AWS DynamoDB"
    },
    {
        name: "AWS API Gateway",
        category: "cloud",
        icon: "fas fa-network-wired",
        level: 85,
        description: "API management, throttling, and security with AWS"
    },
    {
        name: ".NET Core",
        category: "backend",
        icon: "fas fa-project-diagram",
        level: 92,
        description: "Building enterprise applications with ASP.NET Core and C#"
    },
    {
        name: "SQL/T-SQL",
        category: "database",
        icon: "fas fa-table",
        level: 88,
        description: "Query optimization, stored procedures, and database design"
    },
    {
        name: "Docker",
        category: "cloud",
        icon: "fab fa-docker",
        level: 80,
        description: "Container orchestration and microservices deployment"
    },
    {
        name: "Kubernetes",
        category: "cloud",
        icon: "fas fa-dharmachakra",
        level: 75,
        description: "Container orchestration and cluster management"
    },
    {
        name: "GraphQL",
        category: "backend",
        icon: "fas fa-project-diagram",
        level: 82,
        description: "Modern API development with GraphQL schemas and resolvers"
    },
    {
        name: "Tailwind CSS",
        category: "frontend",
        icon: "fas fa-paint-brush",
        level: 88,
        description: "Utility-first CSS framework for rapid UI development"
    },
    {
        name: "SvelteKit",
        category: "frontend",
        icon: "fas fa-bolt",
        level: 75,
        description: "Modern reactive framework for fast web applications"
    },
    {
        name: "WebSockets",
        category: "backend",
        icon: "fas fa-exchange-alt",
        level: 85,
        description: "Real-time bidirectional communication with Socket.IO"
    },
    {
        name: "Git & GitHub",
        category: "tools",
        icon: "fab fa-github",
        level: 90,
        description: "Version control, branching strategies, and collaboration"
    },
    {
        name: "CI/CD Pipelines",
        category: "cloud",
        icon: "fas fa-sync-alt",
        level: 82,
        description: "Automated testing, building, and deployment workflows"
    },
    {
        name: "Microservices",
        category: "backend",
        icon: "fas fa-cubes",
        level: 88,
        description: "Distributed system architecture and service design"
    },
    {
        name: "Entity Framework",
        category: "backend",
        icon: "fas fa-link",
        level: 90,
        description: "ORM for .NET with code-first and database-first approaches"
    },
    {
        name: "Domain-Driven Design",
        category: "tools",
        icon: "fas fa-sitemap",
        level: 85,
        description: "Software design methodology focused on business domain"
    },
    {
        name: "SOLID Principles",
        category: "tools",
        icon: "fas fa-check-double",
        level: 92,
        description: "Object-oriented design principles for maintainable code"
    },
    {
        name: "Performance Optimization",
        category: "tools",
        icon: "fas fa-tachometer-alt",
        level: 88,
        description: "Application profiling, caching strategies, and optimization"
    },
    {
        name: "AngularJS",
        category: "frontend",
        icon: "fab fa-angular",
        level: 78,
        description: "Legacy Angular applications migration and maintenance"
    },
    {
        name: "Windows Forms",
        category: "tools",
        icon: "fab fa-windows",
        level: 85,
        description: "Desktop application development with .NET Windows Forms"
    },
    {
        name: "ADO.NET",
        category: "backend",
        icon: "fas fa-database",
        level: 88,
        description: "Data access layer implementation with ADO.NET"
    },
    {
        name: "SASS/SCSS",
        category: "frontend",
        icon: "fab fa-sass",
        level: 82,
        description: "Advanced CSS preprocessing with mixins and functions"
    },
    {
        name: "jQuery",
        category: "frontend",
        icon: "fas fa-code",
        level: 90,
        description: "DOM manipulation and AJAX with jQuery"
    },
    {
        name: "RESTful APIs",
        category: "backend",
        icon: "fas fa-plug",
        level: 92,
        description: "Designing and implementing REST API endpoints"
    },
    {
        name: "AWS S3",
        category: "cloud",
        icon: "fab fa-aws",
        level: 85,
        description: "Cloud storage and CDN solutions with S3"
    },
    {
        name: "AWS CloudFormation",
        category: "cloud",
        icon: "fas fa-cloud",
        level: 78,
        description: "Infrastructure as Code with CloudFormation"
    },
    {
        name: "Cloudflare",
        category: "cloud",
        icon: "fas fa-shield-alt",
        level: 80,
        description: "Security, performance optimization, and DDoS protection"
    },
    {
        name: "HIPAA Compliance",
        category: "tools",
        icon: "fas fa-user-shield",
        level: 85,
        description: "Healthcare data security and compliance standards"
    },
    {
        name: "Load Balancing",
        category: "cloud",
        icon: "fas fa-balance-scale",
        level: 80,
        description: "Traffic distribution and high availability strategies"
    },
    {
        name: "Serverless Architecture",
        category: "cloud",
        icon: "fas fa-server",
        level: 88,
        description: "Event-driven serverless application design"
    },
    {
        name: "Event-Driven Design",
        category: "backend",
        icon: "fas fa-bolt",
        level: 85,
        description: "Asynchronous event-based architecture patterns"
    },
    {
        name: "Identity Framework",
        category: "backend",
        icon: "fas fa-id-card",
        level: 88,
        description: "Authentication and authorization with ASP.NET Identity"
    },
    {
        name: "Dependency Injection",
        category: "tools",
        icon: "fas fa-syringe",
        level: 90,
        description: "Inversion of Control and loose coupling patterns"
    }
];

// Category mapping for filtering: filter button slug -> skill categories shown.
// Full stack skills span both frontend and backend.
const categoryMapping = {
    'all': ['frontend', 'backend', 'cloud', 'database', 'tools', 'fullstack'],
    'frontend': ['frontend', 'fullstack'],
    'backend': ['backend', 'fullstack'],
    'cloud': ['cloud'],
    'database': ['database'],
    'tools': ['tools']
};

// Human readable labels for category slugs
const categoryLabels = {
    'all': 'All Skills',
    'frontend': 'Frontend',
    'backend': 'Backend',
    'fullstack': 'Full Stack',
    'cloud': 'Cloud & DevOps',
    'database': 'Database',
    'tools': 'Tools & Others'
};

function getCategoryLabel(slug) {
    return categoryLabels[slug] || slug;
}

// Single source of truth for the skills grid
const skillsState = {
    category: 'all',
    query: ''
};

// Initialize Skills Section
function initializeSkillsSection() {
    renderSkillCards(skillsDatabase);
    setupFilterButtons();
    setupSearchFunctionality();
    updateDerivedStats();
    applyFilters();
    animateStatsCounter();
}

// Stats that can be computed from data instead of hardcoded
function updateDerivedStats() {
    const techStat = document.querySelector('.stat-value[data-stat="technologies"]');
    if (techStat) {
        techStat.setAttribute('data-target', skillsDatabase.length);
        // Keep the visible value real even when the counter does not animate
        techStat.textContent = skillsDatabase.length;
    }
}

// Animate stats counter. The HTML already holds the real values, so
// with reduced motion (or no IntersectionObserver) we leave them as is.
function animateStatsCounter() {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValues = entry.target.querySelectorAll('.stat-value');
                statValues.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target;
                        }
                    };

                    updateCounter();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.skills-stats-container');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

// Render skill cards
function renderSkillCards(skills) {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = '';

    skills.forEach((skill, index) => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.setAttribute('data-category', skill.category);
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 6) * 100);

        card.innerHTML = `
            <div class="skill-category">${getCategoryLabel(skill.category)}</div>
            <div class="skill-header">
                <h3 class="skill-name">${skill.name}</h3>
                <i class="${skill.icon} skill-icon" aria-hidden="true"></i>
            </div>
            <p class="skill-description">${skill.description}</p>
        `;

        skillsGrid.appendChild(card);
    });
}

// Does a skill match the current state?
function skillMatches(skill, state) {
    const allowed = categoryMapping[state.category] || [];
    if (!allowed.includes(skill.category)) return false;

    const query = state.query.trim().toLowerCase();
    if (!query) return true;

    const haystack = [
        skill.name,
        skill.description,
        getCategoryLabel(skill.category)
    ].join(' ').toLowerCase();
    return haystack.includes(query);
}

// Apply category + search together and update UI feedback
function applyFilters() {
    const cards = document.querySelectorAll('#skillsGrid .skill-card');
    let visible = 0;

    cards.forEach((card, index) => {
        const skill = skillsDatabase[index];
        const match = skill ? skillMatches(skill, skillsState) : false;
        card.classList.toggle('hidden', !match);
        if (match) visible++;
    });

    // Sync filter buttons
    document.querySelectorAll('.skill-filter-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-category') === skillsState.category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    const query = skillsState.query.trim();
    const categoryText = skillsState.category === 'all'
        ? ''
        : ` in ${getCategoryLabel(skillsState.category)}`;
    const queryText = query ? ` matching "${query}"` : '';

    const status = document.getElementById('skillsStatus');
    if (status) {
        const noun = visible === 1 ? 'skill' : 'skills';
        status.textContent = `Showing ${visible} ${noun}${categoryText}${queryText}`;
    }

    const empty = document.getElementById('skillsEmpty');
    if (empty) {
        const message = empty.querySelector('.skills-empty-message');
        if (message) {
            message.textContent = `No skills found${categoryText}${queryText}.`;
        }
        empty.hidden = visible !== 0;
    }
}

function setSkillsCategory(category) {
    if (!categoryMapping[category]) return;
    skillsState.category = category;
    applyFilters();
}

function setSkillsQuery(query) {
    skillsState.query = query;
    applyFilters();
}

// Setup filter buttons
function setupFilterButtons() {
    document.querySelectorAll('.skill-filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            setSkillsCategory(this.getAttribute('data-category'));
        });
    });
}

// Setup search functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('skillSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        setSkillsQuery(this.value);
    });

    const resetBtn = document.getElementById('skillsReset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            searchInput.value = '';
            skillsState.query = '';
            skillsState.category = 'all';
            applyFilters();
            searchInput.focus();
        });
    }
}


// Keyboard shortcuts for skills filtering
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Never hijack keys while the user is typing or using modifier combos (WCAG 2.1.4)
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const target = e.target;
        const tag = target && target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (target && target.isContentEditable)) return;

        const shortcuts = {
            '1': 'all',
            '2': 'frontend',
            '3': 'backend',
            '4': 'cloud',
            '5': 'database',
            '6': 'tools'
        };

        if (shortcuts[e.key]) {
            e.preventDefault();
            const category = shortcuts[e.key];
            const button = document.querySelector(`.skill-filter-btn[data-category="${category}"]`);
            if (button) {
                button.click();
                // Visual feedback
                if (!prefersReducedMotion()) {
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        button.style.transform = '';
                    }, 100);
                }
            }
        }

        // Press '/' to focus search
        if (e.key === '/') {
            e.preventDefault();
            const searchInput = document.getElementById('skillSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}

// Add skill card click interactions
function enhanceSkillCards() {
    document.addEventListener('click', function(e) {
        const skillCard = e.target.closest('.skill-card');
        if (skillCard && !prefersReducedMotion()) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'card-ripple';
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(168, 78, 43, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
            `;

            const rect = skillCard.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';

            skillCard.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        }
    });
}

// Add dynamic styles for ripple animation
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(15);
                opacity: 0;
            }
        }

        .skill-card {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSkillsSection();
    setupKeyboardShortcuts();
    enhanceSkillCards();
    addDynamicStyles();
});
