class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUser();
        this.setupAuthForms();
        this.updateAuthUI();
    }

    loadUser() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    setupAuthForms() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const user = await response.json();
                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.updateAuthUI();
                this.showMessage('Login successful!', 'success');
                $('#loginModal').modal('hide');
            } else {
                this.showMessage('Invalid credentials', 'error');
            }
        } catch (error) {
            // Fallback to local auth for demo
            this.demoLogin(email, password);
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                const user = await response.json();
                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.updateAuthUI();
                this.showMessage('Account created successfully!', 'success');
                $('#signupModal').modal('hide');
            } else {
                this.showMessage('Error creating account', 'error');
            }
        } catch (error) {
            // Fallback to local auth for demo
            this.demoSignup(name, email, password);
        }
    }

    demoLogin(email, password) {
        // Demo authentication
        if (email && password.length >= 6) {
            this.currentUser = {
                id: 1,
                name: email.split('@')[0],
                email: email
            };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateAuthUI();
            this.showMessage('Demo login successful!', 'success');
            $('#loginModal').modal('hide');
        } else {
            this.showMessage('Invalid credentials for demo', 'error');
        }
    }

    demoSignup(name, email, password) {
        if (name && email && password.length >= 6) {
            this.currentUser = {
                id: Date.now(),
                name: name,
                email: email
            };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateAuthUI();
            this.showMessage('Demo account created!', 'success');
            $('#signupModal').modal('hide');
        } else {
            this.showMessage('Please fill all fields correctly', 'error');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateAuthUI();
        this.showMessage('Logged out successfully', 'success');
    }

    updateAuthUI() {
        const authButtons = document.getElementById('authButtons');
        if (!authButtons) return;

        if (this.currentUser) {
            authButtons.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user me-1"></i>
                        ${this.currentUser.name}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="dashboard.html">Dashboard</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="authManager.logout()">Logout</a></li>
                    </ul>
                </div>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
            `;
        }
    }

    showMessage(message, type) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-bg-${type === 'success' ? 'success' : 'danger'} border-0`;
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        const container = document.createElement('div');
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.appendChild(toast);
        document.body.appendChild(container);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
            container.remove();
        });
    }
}

// Initialize auth manager
const authManager = new AuthManager();