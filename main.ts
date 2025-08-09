interface Project {
    name: string;
    url: string;
    icon: string;
}

class PortfolioApp {
    private projectsContainer: HTMLElement | null;
    private hamburger: HTMLElement | null;
    private menu: HTMLElement | null;

    constructor() {
        this.projectsContainer = document.getElementById('project-links');
        this.hamburger = document.getElementById('hamburger-menu');
        this.menu = document.getElementById('menu');
        
        this.init();
    }

    private init(): void {
        this.setupEventListeners();
        this.loadProjects();
    }

    private setupEventListeners(): void {
        // Setup hamburger menu toggle
        if (this.hamburger && this.menu) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (event) => {
                if (this.menu && this.hamburger && 
                    !this.menu.contains(event.target as Node) && 
                    !this.hamburger.contains(event.target as Node)) {
                    this.closeMenu();
                }
            });
        }

        // Setup smooth scrolling for menu links
        const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        this.closeMenu();
                    }
                }
            });
        });
    }

    private toggleMenu(): void {
        if (this.menu) {
            this.menu.classList.toggle('active');
        }
    }

    private closeMenu(): void {
        if (this.menu) {
            this.menu.classList.remove('active');
        }
    }

    private async loadProjects(): Promise<void> {
        try {
            const response = await fetch('/api/projects');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const projects: Project[] = await response.json();
            this.renderProjects(projects);
        } catch (error) {
            console.error("Gagal memuat proyek:", error);
            this.renderError();
        }
    }

    private renderProjects(projects: Project[]): void {
        if (!this.projectsContainer) return;

        // Clear loading message
        this.projectsContainer.innerHTML = '';

        projects.forEach(project => {
            const link = this.createProjectLink(project);
            if (this.projectsContainer) {
                this.projectsContainer.appendChild(link);
            }
        });
    }

    private createProjectLink(project: Project): HTMLAnchorElement {
        const link = document.createElement('a');
        link.href = project.url;
        link.className = 'link-card';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        const icon = document.createElement('i');
        icon.className = `bi ${project.icon}`;
        
        const text = document.createTextNode(` ${project.name}`);
        
        link.appendChild(icon);
        link.appendChild(text);
        
        // Add click tracking
        link.addEventListener('click', () => {
            this.trackProjectClick(project.name);
        });
        
        return link;
    }

    private renderError(): void {
        if (!this.projectsContainer) return;
        
        this.projectsContainer.innerHTML = `
            <div class="loading" style="color: #ff6b6b;">
                Failed to load projects. Please try again later.
            </div>
        `;
    }

    private trackProjectClick(projectName: string): void {
        console.log(`Project clicked: ${projectName}`);
        // Here you could add analytics tracking if needed
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add some additional interactive features
class InteractiveFeatures {
    constructor() {
        this.addScrollEffects();
        this.addProfileImageEffect();
    }

    private addScrollEffects(): void {
        const profile = document.querySelector('.profile');
        if (!profile) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(profile);
    }

    private addProfileImageEffect(): void {
        const profileImg = document.querySelector('.profile img') as HTMLImageElement;
        if (!profileImg) return;

        profileImg.addEventListener('click', () => {
            profileImg.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                profileImg.style.transform = '';
            }, 300);
        });
    }
}

