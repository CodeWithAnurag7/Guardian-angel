// tourist_guide.js

// --- 1. HIERARCHICAL SIMULATED DATABASE (FULL DATA) ---
const simulatedDatabase = {
    "Delhi": { 
        "New Delhi": [
            { name: "India Gate", history: "War memorial...", timings: "Open 24 hours", best_time: "Evening/Night", price_foreigner: "Free", price_indian: "Free" },
            { name: "Qutub Minar", history: "A 73-meter tall minaret...", timings: "7:00 AM - 5:00 PM", best_time: "Late Afternoon", price_foreigner: "₹600", price_indian: "₹40" }
        ],
        "Old Delhi": [
            { name: "Red Fort (Lal Qila)", history: "Historic fort built by Shah Jahan...", timings: "9:30 AM - 4:30 PM (Closed Mondays)", best_time: "Morning", price_foreigner: "₹550", price_indian: "₹90" }
        ]
    },
    "Rajasthan": { 
        "Jaipur": [
            { name: "Hawa Mahal (Palace of Winds)", history: "Five-story palace famous for its 953 small windows...", timings: "9:00 AM - 5:00 PM", best_time: "Morning", price_foreigner: "₹200", price_indian: "₹50" }
        ],
        "Udaipur": [
            { name: "City Palace, Udaipur", history: "The largest palace complex in Rajasthan...", timings: "9:30 AM - 5:30 PM", best_time: "Morning", price_foreigner: "₹300", price_indian: "₹30" }
        ]
    },
    "Maharashtra": { 
        "Mumbai": [
            { name: "Gateway of India", history: "Monument built during the British Raj...", timings: "Open 24 hours", best_time: "Early Morning or Late Evening", price_foreigner: "Free", price_indian: "Free" }
        ]
    },
    "Uttar Pradesh": { 
        "Agra": [
            { name: "Taj Mahal", history: "An immense white marble mausoleum...", timings: "Sunrise to Sunset (Closed Fridays)", best_time: "Sunrise", price_foreigner: "₹1100 + ₹200 for mausoleum", price_indian: "₹50" }
        ],
        "Varanasi": [
            { name: "Dashashwamedh Ghat", history: "The main ghat on the Ganges River...", timings: "Open 24 hours (Aarti at Sunset)", best_time: "Sunset", price_foreigner: "Free", price_indian: "Free" }
        ]
    },
    "Goa": { 
        "North Goa": [
            { name: "Baga Beach", history: "Known for its vibrant nightlife...", timings: "Open 24 hours", best_time: "Late afternoon", price_foreigner: "Free", price_indian: "Free" }
        ]
    },
    "Kerala": { 
        "Kochi": [
            { name: "Fort Kochi (Chinese Fishing Nets)", history: "Iconic fishing nets introduced by Chinese traders...", timings: "Open 24 hours", best_time: "Sunset", price_foreigner: "Free", price_indian: "Free" }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // --- 2. CORE DOM ELEMENTS AND INITIAL SETUP ---
    const stateSelect = document.getElementById('state-select');
    const citySelect = document.getElementById('city-select');
    
    // NEW ELEMENT: The dedicated guide button
    const guideButton = document.getElementById('guide-button'); 
    
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');
    const loader = document.getElementById('loader');
    const initialMessage = document.getElementById('initial-message');

    // **Event listeners**
    stateSelect.addEventListener('change', populateCities);
    searchButton.addEventListener('click', handleSearch);
    
    // **NEW LISTENER:** Opens the guide page immediately on click
    guideButton.addEventListener('click', openGuidePage);
    
    // Initial population of the State dropdown
    populateStates(); 

    // --- 3. CASCADING DROPDOWN LOGIC (UNCHANGED) ---

    function populateStates(targetSelect = stateSelect) {
        const states = Object.keys(simulatedDatabase).sort();
        targetSelect.innerHTML = '<option value="">-- Select a State --</option>';
        
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            targetSelect.appendChild(option);
        });
    }

    function populateCities(event) {
        const selectedState = stateSelect.value;
        citySelect.innerHTML = '';
        citySelect.disabled = true;
        
        if (!selectedState) {
            citySelect.innerHTML = '<option value="">-- Select a State First --</option>';
            return;
        }

        const cities = Object.keys(simulatedDatabase[selectedState]).sort();
        citySelect.disabled = false; 
        
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "-- Select a City --";
        citySelect.appendChild(defaultOption);

        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

    // --- 4. GUIDE REDIRECTION FUNCTION (NEW SIMPLIFIED LOGIC) ---

    function openGuidePage() {
        // Simple, unconditional open in a new tab
        window.open(`guide_profiles.html`, '_blank');
    }

    // --- 5. MAIN PAGE SEARCH LOGIC ---

    function handleSearch() {
        const selectedState = stateSelect.value;
        const selectedCity = citySelect.value;
        
        if (!selectedState || !selectedCity) {
            alert("Please select both a State and a City to search!");
            return;
        }

        // Show Loading State for Tourist Places
        resultsContainer.innerHTML = '';
        initialMessage.style.display = 'none';
        loader.style.display = 'block';
        
        // Simulate API Call for Tourist Places
        setTimeout(() => {
            loader.style.display = 'none'; 

            const results = simulatedDatabase[selectedState][selectedCity];
            
            if (results && results.length > 0) {
                renderResults(results);
            } else {
                resultsContainer.innerHTML = `<p>No tourist data found for ${selectedCity}, ${selectedState}.</p>`;
            }
            
        }, 1500); 
    }

    function renderResults(data) {
        resultsContainer.innerHTML = ''; 

        data.forEach(place => {
            const cardHTML = `
                <div class="place-card">
                    <h3>${place.name}</h3>
                    <div class="info-detail"><strong>Timings:</strong> ${place.timings}</div>
                    <div class="info-detail"><strong>Best Time:</strong> ${place.best_time}</div>
                    <div class="info-detail"><strong>Foreigner Price:</strong> ${place.price_foreigner}</div>
                    <div class="info-detail"><strong>Indian Price:</strong> ${place.price_indian}</div>
                    <p class="history">**History:** ${place.history}</p>
                </div>
            `;
            resultsContainer.innerHTML += cardHTML;
        });
    }
    
    // --- 6. MODAL HIDING LOGIC ---
    const welcomeModal = document.getElementById('welcome-modal');
    const startButton = document.getElementById('start-button');

    if (welcomeModal && startButton) {
        startButton.addEventListener('click', () => {
            welcomeModal.classList.add('hidden');
            setTimeout(() => {
                welcomeModal.remove();
            }, 500);
        });
    }
});
