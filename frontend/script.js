// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all functionality
function initializeApp() {
    // Navigation functionality
    initNavigation();
    
    // Tab functionality for specifications
    initTabs();
    
    // Interactive map functionality
    initMap();
    
    // Animated counters
    initCounters();
    
    // Scroll animations
    initScrollAnimations();
    
    // Dashboard interactions
    initDashboard();
}

// Add this function to check authentication
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // Only show modal on home.html if not logged in
    if (!isLoggedIn && window.location.pathname.includes('home.html')) {
        setTimeout(() => {
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                loginModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }, 1000);
    }
}

// Update initializeApp function
function initializeApp() {
    initNavigation();
    initTabs();
    initMap();
    initCounters();
    initScrollAnimations();
    initDashboard();
    initLanguage();

}

// Enhanced navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Close language dropdown if open
            const languageDropdown = document.getElementById('languageDropdown');
            if (languageDropdown) {
                languageDropdown.classList.remove('active');
            }
        });
    });

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (!e.target.closest('.language-selector')) {
            const languageDropdown = document.getElementById('languageDropdown');
            if (languageDropdown) {
                languageDropdown.classList.remove('active');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
// Tab functionality for specifications section
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(`${targetTab}-pane`).classList.add('active');
        });
    });
}

// Interactive map functionality
function initMap() {
    const regions = document.querySelectorAll('.region');
    const coverageStats = document.querySelectorAll('.stat-item');
    
    // Region click functionality
    regions.forEach(region => {
        region.addEventListener('click', () => {
            // Remove active class from all regions
            regions.forEach(r => r.classList.remove('active'));
            
            // Add active class to clicked region
            region.classList.add('active');
            
            // Update coverage statistics based on selected region
            updateCoverageStats(region.getAttribute('data-region'));
        });
        
        // Add hover effect with tooltip
        region.addEventListener('mouseenter', showRegionTooltip);
        region.addEventListener('mouseleave', hideRegionTooltip);
    });
    
    // Initialize map points for dashboard
    initMapPoints();
}

function initMapPoints() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            const status = this.getAttribute('data-status');
            
            // Show location details (could be expanded with modal)
            showLocationDetails(location, status);
        });
    });
}

function showLocationDetails(location, status) {
    // Create a simple notification or update dashboard
    const notification = document.createElement('div');
    notification.className = 'location-notification';
    notification.innerHTML = `
        <strong>${location}</strong> - Status: ${status}
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateCoverageStats(region) {
    // Simulate data update based on region
    const statsData = {
        'europe': { countries: 44, coverage: '98%', users: '2.5M' },
        'asia': { countries: 48, coverage: '95%', users: '4.2M' },
        'north-america': { countries: 23, coverage: '99%', users: '3.1M' },
        'south-america': { countries: 12, coverage: '92%', users: '1.8M' },
        'africa': { countries: 54, coverage: '85%', users: '1.2M' },
        'australia': { countries: 14, coverage: '96%', users: '0.9M' }
    };
    
    const data = statsData[region] || statsData.europe;
    
    // Animate the number changes
    animateCounter('.stat-item:nth-child(1) .stat-number', parseInt(data.countries));
    animateCounter('.stat-item:nth-child(2) .stat-number', parseInt(data.coverage));
    animateCounter('.stat-item:nth-child(3) .stat-number', parseInt(data.users.replace('M', '')) * 1000000);
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target') || entry.target.textContent);
                animateCounterElement(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counter.setAttribute('data-target', counter.textContent);
        counter.textContent = '0';
        observer.observe(counter);
    });
}

function animateCounter(selector, target) {
    const element = document.querySelector(selector);
    if (element) {
        animateCounterElement(element, target);
    }
}

function animateCounterElement(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 1500;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, stepTime);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return Math.floor(num).toString();
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.benefit-card, .stat-card, .dashboard-preview');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Dashboard functionality
function initDashboard() {
    // Simulate live data updates
    setInterval(updateDashboardMetrics, 3000);
    
    // Initialize metric values
    updateDashboardMetrics();
}

function updateDashboardMetrics() {
    const metrics = document.querySelectorAll('.metric-value');
    
    metrics.forEach(metric => {
        const currentValue = parseFloat(metric.textContent);
        const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
        const newValue = currentValue * (1 + variation);
        
        // Smooth transition for metric values
        metric.style.opacity = '0.5';
        setTimeout(() => {
            metric.textContent = newValue.toFixed(1);
            metric.style.opacity = '1';
            
            // Update trend indicator
            const trendElement = metric.parentElement.querySelector('.metric-trend');
            if (trendElement) {
                trendElement.textContent = variation >= 0 ? '↗' : '↘';
                trendElement.className = `metric-trend ${variation >= 0 ? 'up' : 'down'}`;
            }
        }, 150);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access (if needed)
window.App = {
    initNavigation,
    initTabs,
    initMap,
    initCounters,
    updateCoverageStats,
    animateCounter
};

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .location-notification {
        box-shadow: var(--shadow-lg);
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Add this function to your existing script.js file

// Multi-language support
function initLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        languageSelect.value = savedLanguage;
        
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('preferredLanguage', selectedLanguage);
            updatePageLanguage(selectedLanguage);
        });
    }
}

function updatePageLanguage(language) {
    // This would be implemented based on your translation system
    // For now, we'll just show a notification
    const languageNames = {
        'en': 'English',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'ja': 'Japanese'
    };
    
    // Show language change notification
    showNotification(`Language changed to ${languageNames[language]}`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update the initializeApp function to include language initialization
function initializeApp() {
    // Navigation functionality
    initNavigation();
    
    // Tab functionality for specifications
    initTabs();
    
    // Interactive map functionality
    initMap();
    
    // Animated counters
    initCounters();
    
    // Scroll animations
    initScrollAnimations();
    
    // Dashboard interactions
    initDashboard();
    
    // Language functionality
    initLanguage();
}