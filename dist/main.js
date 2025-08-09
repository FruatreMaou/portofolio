// Portfolio App Class - Main functionality (Improved Version)
class PortfolioApp {
    constructor() {
        this.projectsContainer = document.getElementById('project-links');
        this.menuBtn = document.getElementById('menu-btn');
        this.closeBtn = document.getElementById('close-btn');
        this.navMenu = document.getElementById('nav-menu');
        this.greetingElement = document.getElementById('dynamic-greeting');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProjects();
        this.setupGreeting();
        this.setupScrollEffects();
    }

    setupEventListeners() {
        // Menu functionality
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => {
                this.navMenu.classList.add('is-open');
            });
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.navMenu.classList.remove('is-open');
            });
        }

        // Close menu when clicking on nav links
        const navLinks = this.navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.navMenu.classList.contains('is-open')) {
                    this.navMenu.classList.remove('is-open');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (this.navMenu && this.menuBtn &&
                !this.navMenu.contains(event.target) &&
                !this.menuBtn.contains(event.target)) {
                this.navMenu.classList.remove('is-open');
            }
        });

        // Hero image click effect
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.addEventListener('click', () => {
                this.heroImageEffect(heroImage);
            });
        }

        // Add ripple effect to cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.createRipple(e, card);
            });
        });
    }

    async loadProjects() {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const projects = await response.json();
            this.renderProjects(projects);
        } catch (error) {
            console.warn("Loading default projects due to API error");
            this.renderDefaultProjects();
        }
    }

    renderProjects(projects) {
        if (!this.projectsContainer) return;
        
        this.projectsContainer.innerHTML = '';
        
        // Remove duplicates by using Set with project names
        const uniqueProjects = [];
        const seenNames = new Set();
        
        projects.forEach(project => {
            if (!seenNames.has(project.name)) {
                seenNames.add(project.name);
                uniqueProjects.push(project);
            }
        });
        
        uniqueProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project);
            
            // Add staggered animation
            setTimeout(() => {
                projectCard.style.opacity = '0';
                projectCard.style.transform = 'translateY(20px)';
                this.projectsContainer.appendChild(projectCard);
                
                setTimeout(() => {
                    projectCard.style.transition = 'all 0.5s ease';
                    projectCard.style.opacity = '1';
                    projectCard.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }

    renderDefaultProjects() {
        if (!this.projectsContainer) return;
        
        const defaultProjects = [
            { 
                name: "API Server", 
                url: "https://api.fruatrecard.my.id", 
                icon: "fa-server",
                description: "RESTful API server dengan multiple endpoints untuk berbagai kebutuhan",
                tags: ["Node.js", "Express", "API"]
            },
            { 
                name: "Weather App", 
                url: "https://weather.fruatrecard.my.id", 
                icon: "fa-cloud-sun",
                description: "Aplikasi cuaca real-time dengan forecast dan data lengkap",
                tags: ["JavaScript", "API", "CSS"]
            },
            { 
                name: "YT Downloader", 
                url: "https://ytdownloader.fruatrecard.my.id", 
                icon: "fa-download",
                description: "Tool download video YouTube dengan berbagai format dan kualitas",
                tags: ["Python", "Web App", "Tool"]
            },
            { 
                name: "CDN Service", 
                url: "https://cdn-up.fruatrecard.my.id/", 
                icon: "fa-database",
                description: "Content delivery network untuk hosting file dan media",
                tags: ["CDN", "Storage", "Service"]
            },
            { 
                name: "WhatsApp Bot", 
                url: "#", 
                icon: "fa-robot",
                description: "Bot WhatsApp cerdas dengan fitur AI dan automasi",
                tags: ["Node.js", "WhatsApp", "Bot"]
            }
        ];
        
        this.renderProjects(defaultProjects);
    }

    createProjectCard(project) {
        const card = document.createElement('a');
        card.href = project.url;
        card.className = 'project-card card';
        if (project.url !== '#') {
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
        }

        card.innerHTML = `
            <div class="project-content">
                <div class="project-icon">
                    <i class="fa-solid ${project.icon}" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 15px;"></i>
                </div>
                <h3>${project.name}</h3>
                <p>${project.description || 'Project menarik yang menunjukkan kemampuan web development modern.'}</p>
                <div class="project-tags">
                    ${(project.tags || ['Web', 'Development']).map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;

        return card;
    }

    setupGreeting() {
        if (!this.greetingElement) return;

        const now = new Date();
        const currentHour = now.getHours();
        let greetingText;

        if (currentHour >= 5 && currentHour < 11) {
            greetingText = "Ohayō gozaimasu! (おはようございます!)"; // Pagi
        } else if (currentHour >= 11 && currentHour < 18) {
            greetingText = "Konnichiwa! (こんにちは!)"; // Siang/Sore
        } else {
            greetingText = "Konbanwa! (こんばんは!)"; // Malam
        }
        
        this.greetingElement.innerText = greetingText;
    }

    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                }
            });
        }, observerOptions);

        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    heroImageEffect(image) {
        image.style.transform = 'scale(1.1) rotate(10deg)';
        image.style.filter = 'hue-rotate(45deg)';
        
        setTimeout(() => {
            image.style.transform = '';
            image.style.filter = '';
        }, 500);
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Enhanced Interactive Features
class InteractiveFeatures {
    constructor() {
        this.addAdvancedEffects();
        this.addKeyboardNavigation();
    }

    addAdvancedEffects() {
        // Add glow effect to special elements
        const specialElements = document.querySelectorAll('.hero-image, .logo');
        specialElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.boxShadow = '0 0 20px rgba(255, 144, 42, 0.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = '';
            });
        });

        // Add smooth hover effects to cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    addKeyboardNavigation() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('is-open')) {
                    navMenu.classList.remove('is-open');
                }
            }
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    new InteractiveFeatures();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

