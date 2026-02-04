// App configuration interface
interface AppConfig {
    name: string;
    imageUrl: string;
    link: string;
    installLink: string;
    description: string;
    icon: string;
}

// App data - easily editable
const appsConfig: AppConfig[] = [
    {
        name: "LDCLOUD (emulator)",
        imageUrl: "https://i.imgur.com/haUWmnZ.png",
        link: "itms-services://?action=download-manifest&url=https://ld-cloud-xjp.obs.ap-southeast-3.myhuaweicloud.com/ios/LDCloud.plist",
        installLink: "itms-services://?action=download-manifest&url=https://ld-cloud-xjp.obs.ap-southeast-3.myhuaweicloud.com/ios/LDCloud.plist",
        description: "Android emulator for iOS",
        icon: ""
    },
    {
        name: "Feather (Signed)",
        imageUrl: "https://i.imgur.com/ztmRiZp.jpeg",
        link: "itms-services://?action=download-manifest&url=https://sign.applep12.com/GetPlist/68644b0a-055c-e901-003f-51fb201a44f2",
        installLink: "itms-services://?action=download-manifest&url=https://sign.applep12.com/GetPlist/68644b0a-055c-e901-003f-51fb201a44f2",
        description: "Signed with new certificate",
        icon: ""
    },
    {
        name: "Delta",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSE_0jP0m-2BjIBHAaCQpGcw49Bkju32j9h646GiNrXw&s",
        link: "itms-services://?action=download-manifest&url=https://usescarletios.pages.dev/deltasigned284262",
        installLink: "itms-services://?action=download-manifest&url=https://usescarletios.pages.dev/deltasigned284262",
        description: "Delta executor - powerful scripting",
        icon: ""
    },
    {
        name: "KRNL",
        imageUrl: "https://avatars.githubusercontent.com/u/112211367?s=200&v=4",
        link: "itms-services://?action=download-manifest&url=https://krnl-ios.com/2.plist",
        installLink: "itms-services://?action=download-manifest&url=https://krnl-ios.com/2.plist",
        description: "Recommended executor",
        icon: ""
    },
    {
        name: "Codex",
        imageUrl: "https://apkals.com/wp-content/uploads/2021/11/Codex-Executor-Icon.jpg",
        link: "itms-services://?action=download-manifest&url=https://codex-ios.com/Install.plist",
        installLink: "itms-services://?action=download-manifest&url=https://codex-ios.com/Install.plist",
        description: "Classic executor",
        icon: ""
    },
    {
        name: "ESign",
        imageUrl: "https://i.imgur.com/mTR5LxM.jpeg",
        link: "itms-services://?action=download-manifest&url=https://usescarletios.pages.dev/esign",
        installLink: "itms-services://?action=download-manifest&url=https://usescarletios.pages.dev/esign",
        description: "App signing tool",
        icon: ""
    },
    {
        name: "Scarlet",
        imageUrl: "https://i.imgur.com/7xZubLT.jpeg",
        link: "itms-services://?action=download-manifest&url=https://usescarletios.pages.dev/scarlet",
        installLink: "itms-services://?action=download-manifest&url=https://usescarletios.pages.dev/scarlet",
        description: "Super easy to use",
        icon: ""
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderApps();
    setupTabNavigation();
    setupThemeToggle();
    setupAnimations();
    registerServiceWorker();
});

// Render apps in the grid
function renderApps(): void {
    const container = document.getElementById('apps-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    appsConfig.forEach((app, index) => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.style.animationDelay = `${index * 0.1}s`;
        
        appCard.innerHTML = `
            <div class="app-icon">
                <img 
                    src="${app.imageUrl}" 
                    alt="${app.name}" 
                    onerror="this.style.display='none';"
                    loading="lazy"
                >
            </div>
            <div class="app-name">${app.name}</div>
            <div class="app-description">${app.description}</div>
        `;
        
        appCard.addEventListener('click', () => {
            createRipple(appCard, event as MouseEvent);
            setTimeout(() => {
                window.location.href = app.link;
            }, 300);
        });
        
        container.appendChild(appCard);
    });
}

// Setup tab navigation
function setupTabNavigation(): void {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = (btn as HTMLElement).dataset.tab;
            if (!targetTab) return;
            
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Show target tab
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.style.animation = 'none';
                void targetContent.offsetHeight; // Trigger reflow
                targetContent.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    });
}

// Setup theme toggle
function setupThemeToggle(): void {
    const themeButtons = document.querySelectorAll('[data-theme]');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('frozen-hub-theme') || 'frozen';
    document.body.setAttribute('data-theme', savedTheme);
    
    themeButtons.forEach(btn => {
        const btnTheme = (btn as HTMLElement).dataset.theme;
        if (btnTheme === savedTheme) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            const theme = (btn as HTMLElement).dataset.theme;
            if (!theme) return;
            
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('frozen-hub-theme', theme);
            
            // Update active state
            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Add transition effect
            document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Create ripple effect
function createRipple(element: HTMLElement, e: MouseEvent): void {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(14, 165, 233, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Setup animations
function setupAnimations(): void {
    // Animate particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        (particle as HTMLElement).style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add click ripple to all interactive elements
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('app-card') || 
            target.classList.contains('theme-btn') ||
            target.classList.contains('file-item')) {
            createRipple(target, e);
        }
    });
}

// Register service worker for PWA
function registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        });
    }
}

// Export for use in HTML if needed
declare global {
    interface Window {
        renderApps: typeof renderApps;
    }
}

window.renderApps = renderApps;
