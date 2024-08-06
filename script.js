const weatherApiKey = 'a6c703e5d1d534487233637de539a016'; 
//const placesApiKey = 'YOUR_GOOGLE_PLACES_API_KEY'; // 

const locationInput = document.getElementById('locationInput');
const suggestionsContainer = document.getElementById('suggestions');

locationInput.addEventListener('input', async () => {
    const query = locationInput.value;
    if (query.length > 2) { // Start searching after 3 characters
        const suggestions = await fetchLocationSuggestions(query);
        displaySuggestions(suggestions);
    } else {
        suggestionsContainer.innerHTML = ''; // Clear suggestions if input is less than 3 characters
    }
});

async function fetchLocationSuggestions(query) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${placesApiKey}`);
    const data = await response.json();
    return data.predictions; // Return the predictions array
}

function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = suggestion.description; // Display the suggestion text
        div.addEventListener('click', () => {
            locationInput.value = suggestion.description; // Set input value to selected suggestion
            suggestionsContainer.innerHTML = ''; // Clear suggestions
            fetchWeatherData(); // Fetch weather data for the selected location
        });
        suggestionsContainer.appendChild(div);
    });
}*/

async function fetchWeatherData() {
  //  const selectedLocation = locationInput.value; // Get the value from the input box
    selectedLocation = locationInput.value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedLocation}&units=metric&appid=${weatherApiKey}`);
    const data = await response.json();
    
    if (data.cod === '404') {
        alert('Location not found. Please try again.'); // Handle location not found
        return;
    }
    
    // Update background and weather icon
    /*updateBackground(data.list[0].weather[0].main);*/

    updateThings(data);
    updateWeatherIcon(data.list[0].weather[0].main);
    
    // Update date and time
    updateDateTime();
    
    // Generate weather cards
    generateWeatherCards(data);
}

//uncomment it if you have jpeg files.

/*function updateBackground(weatherCondition) {
    const firstDiv = document.querySelector('.first-div');
    let backgroundImage;

    switch (weatherCondition) {
        case 'Clear':
            backgroundImage = 'url("./images/clear.avif")'; // Replace with your image path
            break;
        case 'Rain':
            backgroundImage = 'url("./images/.avif")';
            break;
        case 'Snow':
            backgroundImage = 'url("./images/snow.avif")';
            break;
        // Add more cases as needed
        default:
            backgroundImage = 'url("./images/rain.avif")';
    }

    firstDiv.style.backgroundImage = backgroundImage;
    firstDiv.style.backgroundSize = 'cover';
    firstDiv.style.backgroundRepeat = 'no-repeat';
    firstDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
}*/

function updateWeatherIcon(weatherCondition) {
    const iconElement = document.querySelector('.weather'); // Adjust selector as needed
    let iconUrl;

    switch (weatherCondition) {
        case 'Clear':
            iconUrl = 'url("./icons/cloud.svg")'; 
            break;
        case 'Rain':
            iconUrl = 'url("./icons/light-rain.svg")';
            break;
        case 'Snow':
            iconUrl = 'url("./icons/snow.svg")';
            break;
        // Add more cases as needed
        default:
            iconUrl = 'url("./icons/cloud.svg")';
    }
    iconElement.style.backgroundImage = iconUrl;
iconElement.style.backgroundRepeat = 'no-repeat';

    
}

function updateDateTime() {
    const dateTimeElement = document.querySelector('.gradient-text.left');
    const now = new Date();
    dateTimeElement.textContent = now.toLocaleString(); // Format as needed
}

function generateWeatherCards(data) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';

    // Loop through the forecast data (every 3 hours)
    data.list.forEach((forecast) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardContent = `
            <div class="card-content" style= "border: 2px solid rbga(225,225,225, 0.2); padding: 5px;">
                <h2 class="card-title">${new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
                <p class="card-value">${Math.round(forecast.main.temp)}°C</p>
                <p>${forecast.weather[0].description}</p>
            </div>
        `;

        card.innerHTML = cardContent;
        cardsContainer.appendChild(card);
        const tmp = document.querySelector('.temp');
    tmp.innerHTML = "";
    tmp.innerHTML = `${Math.round(forecast.main.temp)}°C`;
    const desp = document.querySelector('.desp');
    desp.innerHTML = "";
    desp.innerHTML = `${forecast.weather[0].description}`;
    const weather = document.querySelector('.weather.left');
    weather.innerHTML = "";
    weather.innerHTML = `${forecast.weather[0].main}`;
    });
}

function updateThings(data) {
   
}

const search = document.querySelector('.search');

search.addEventListener('click', fetchWeatherData);
