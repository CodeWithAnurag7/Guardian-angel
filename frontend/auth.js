// Authentication Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    initAuthModal();
});

function initAuthModal() {
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    const openLoginModalBtn = document.getElementById('openLoginModal');

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('userData');

    // Show modal if not logged in (only on home.html)
    if (!isLoggedIn && window.location.pathname.includes('home.html')) {
        setTimeout(() => {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 1000); // Show after 1 second delay
    }

    // Manual open modal button
    if (openLoginModalBtn) {
        openLoginModalBtn.addEventListener('click', function() {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', closeAuthModal);
    }

    // Close modal when clicking outside
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeAuthModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            closeAuthModal();
        }
    });

    // Tab switching functionality
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            document.getElementById(`${targetTab}Form`).classList.add('active');
        });
    });

    // Password toggle functionality
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input[type="password"]');
            if (passwordInput) {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            }
        });
    });

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Simple validation
    if (!validateEmail(email)) {
        showAuthMessage('Please enter a valid email address', 'error');
        return;
    }

    if (password.length < 6) {
        showAuthMessage('Password must be at least 6 characters long', 'error');
        return;
    }

    // Simulate login process
    simulateLogin(email, password, rememberMe);
}

function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validation
    if (name.trim().length < 2) {
        showAuthMessage('Please enter your full name', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showAuthMessage('Please enter a valid email address', 'error');
        return;
    }

    if (password.length < 6) {
        showAuthMessage('Password must be at least 6 characters long', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAuthMessage('Passwords do not match', 'error');
        return;
    }

    if (!agreeTerms) {
        showAuthMessage('Please agree to the terms and conditions', 'error');
        return;
    }

    // Simulate signup process
    simulateSignup(name, email, password);
}

function simulateLogin(email, password, rememberMe) {
    const loginBtn = document.querySelector('#loginForm .auth-btn');
    const originalText = loginBtn.textContent;
    
    // Show loading state
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    loginBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // For demo purposes, always succeed
        const userData = {
            name: email.split('@')[0],
            email: email,
            loginTime: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }

        showAuthMessage('Login successful! Redirecting...', 'success');
        
        // Close modal and redirect to home.html
        setTimeout(() => {
            closeAuthModal();
            window.location.href = 'home.html'; // Redirect to home.html
        }, 1500);
        
    }, 2000);
}

function simulateSignup(name, email, password) {
    const signupBtn = document.querySelector('#signupForm .auth-btn');
    const originalText = signupBtn.textContent;
    
    // Show loading state
    signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    signupBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        const userData = {
            name: name,
            email: email,
            signupTime: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        
        showAuthMessage('Account created successfully! Redirecting...', 'success');
        
        // Close modal and redirect to home.html
        setTimeout(() => {
            closeAuthModal();
            window.location.href = 'home.html'; // Redirect to home.html
        }, 1500);
        
    }, 2000);
}

function closeAuthModal() {
    const loginModal = document.getElementById('loginModal');
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAuthMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `auth-message ${type}`;
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

    // Insert before the active form
    const activeForm = document.querySelector('.auth-form.active');
    activeForm.parentNode.insertBefore(messageEl, activeForm);

    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.style.animation = 'slideOutUp 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }
    }, 5000);
}

// Check authentication status on page load
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        console.log('User is logged in');
        // You can update UI to show user is logged in
    }
}

// Initialize auth status check
checkAuthStatus();