document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const weatherReport = document.getElementById('weather-report');
    const cityName = document.getElementById('city-name');
    const dateElement = document.getElementById('date');
    const weatherIcon = document.getElementById('weather-icon');
    const description = document.getElementById('description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    // **Important: Replace with your actual API key**
    const apiKey = 'c3689722e3475d65b26ba3c2e13197af';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeatherData(city);
            }
        }
    });

    function fetchWeatherData(city) {
        const url = `${apiUrl}q=${city}&appid=${apiKey}&units=metric`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found!');
                }
                return response.json();
            })
            .then(data => {
                updateWeatherUI(data);
            })
            .catch(error => {
                alert(error.message);
            });
    }

    function updateWeatherUI(data) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        cityName.textContent = data.name;
        dateElement.textContent = now.toLocaleDateString('en-US', options);
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        description.textContent = data.weather[0].description;
        temperature.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} m/s`;
        
        weatherReport.style.display = 'block';
    }
});