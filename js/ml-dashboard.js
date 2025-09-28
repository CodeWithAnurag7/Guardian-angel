class MLDashboardManager {
    constructor() {
        this.metrics = {
            activeTourists: 1247,
            safeZones: 45,
            incidentsToday: 3,
            responseTime: 1.2
        };
        this.init();
    }

    init() {
        this.updateMetrics();
        this.simulateMLPredictions();
        this.setupRealTimeUpdates();
        this.setupEventListeners();
    }

    updateMetrics() {
        Object.keys(this.metrics).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = this.metrics[key];
            }
        });
    }

    simulateMLPredictions() {
        const chartContainer = document.getElementById('predictionChart');
        
        setTimeout(() => {
            chartContainer.innerHTML = `
                <div class="prediction-chart">
                    <div class="chart-bars">
                        <div class="chart-bar" style="height: 60%;" data-risk="low">
                            <span class="bar-label">Low Risk</span>
                        </div>
                        <div class="chart-bar" style="height: 80%;" data-risk="medium">
                            <span class="bar-label">Medium Risk</span>
                        </div>
                        <div class="chart-bar" style="height: 40%;" data-risk="high">
                            <span class="bar-label">High Risk</span>
                        </div>
                    </div>
                    <div class="chart-title">ML Risk Prediction Distribution</div>
                </div>
            `;
        }, 1500);
    }

    setupRealTimeUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            this.metrics.activeTourists += Math.floor(Math.random() * 10) - 5;
            this.metrics.incidentsToday = Math.max(0, this.metrics.incidentsToday + Math.floor(Math.random() * 3) - 1);
            this.metrics.responseTime = (1.1 + Math.random() * 0.3).toFixed(1);
            
            this.updateMetrics();
            this.updateRiskIndicators();
        }, 5000);
    }

    updateRiskIndicators() {
        const riskLevel = document.getElementById('riskLevel');
        const incidentsPredicted = document.getElementById('incidentsPredicted');
        const confidenceScore = document.getElementById('confidenceScore');
        
        if (riskLevel && incidentsPredicted && confidenceScore) {
            const risks = ['Low', 'Medium', 'High'];
            const randomRisk = risks[Math.floor(Math.random() * risks.length)];
            
            riskLevel.textContent = randomRisk;
            riskLevel.className = `badge bg-${this.getRiskColor(randomRisk)}`;
            
            incidentsPredicted.textContent = Math.floor(Math.random() * 10) + 5;
            confidenceScore.textContent = `${85 + Math.floor(Math.random() * 10)}%`;
        }
    }

    getRiskColor(risk) {
        switch(risk.toLowerCase()) {
            case 'low': return 'success';
            case 'medium': return 'warning';
            case 'high': return 'danger';
            default: return 'secondary';
        }
    }

    setupEventListeners() {
        const refreshBtn = document.querySelector('button[data-i18n="ml_refresh"]');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshPredictions();
            });
        }
    }

    refreshPredictions() {
        const button = document.querySelector('button[data-i18n="ml_refresh"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        button.disabled = true;

        setTimeout(() => {
            this.simulateMLPredictions();
            this.updateRiskIndicators();
            button.innerHTML = originalText;
            button.disabled = false;
            this.showMessage('Predictions refreshed!', 'success');
        }, 2000);
    }

    showMessage(message, type) {
        // Simple notification
        console.log(`${type}: ${message}`);
    }
}

// Initialize ML dashboard manager
const mlDashboardManager = new MLDashboardManager();