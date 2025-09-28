// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    initLogin();
});

function initLogin() {
    const loginForm = document.getElementById('loginForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    const languageSelect = document.getElementById('languageSelect');

    // Password toggle functionality
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Simple validation
            if (!validateEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            if (password.length < 6) {
                showMessage('Password must be at least 6 characters long', 'error');
                return;
            }

            // Simulate login process
            simulateLogin(email, password, rememberMe);
        });
    }

    // Language selection functionality
    if (languageSelect) {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
        languageSelect.value = savedLanguage;
        
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('preferredLanguage', selectedLanguage);
            changeLanguage(selectedLanguage);
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function simulateLogin(email, password, rememberMe) {
    // Show loading state
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.textContent;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    loginBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // For demo purposes, always succeed
        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
            window.location.href = 'safety-dashboard.html';
        }, 2000);
        
    }, 2000);
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.login-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `login-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: var(--border-radius);
        font-weight: 500;
        text-align: center;
        animation: slideInDown 0.3s ease;
    `;

    if (type === 'success') {
        messageEl.style.background = 'rgba(16, 185, 129, 0.1)';
        messageEl.style.color = '#10b981';
        messageEl.style.border = '1px solid #10b981';
    } else {
        messageEl.style.background = 'rgba(239, 68, 68, 0.1)';
        messageEl.style.color = '#ef4444';
        messageEl.style.border = '1px solid #ef4444';
    }

    // Insert before login form
    const loginForm = document.getElementById('loginForm');
    loginForm.parentNode.insertBefore(messageEl, loginForm);

    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.style.animation = 'slideOutUp 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }
    }, 5000);
}

function changeLanguage(language) {
    // This would typically make an API call to get translated content
    // For now, we'll just show a confirmation message
    const languageNames = {
        'en': 'English',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'ja': 'Japanese'
    };
    
    showMessage(`Language changed to ${languageNames[language]}`, 'success');
    
    // In a real implementation, you would:
    // 1. Fetch translation files for the selected language
    // 2. Update all text content on the page
    // 3. Save preference to localStorage
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
    
    .login-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none !important;
    }
`;
document.head.appendChild(style);