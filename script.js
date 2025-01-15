const apiKeys = "dafec0960bd4047546afdd80123bd0c4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input"); // Reference the element
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
	try {
		const weatherApp = await fetch(apiUrl + city + `&appid=${apiKeys}`);
		var weatherData = await weatherApp.json();

		if (weatherData.cod === "404") {
			// alert("City not found!");	
			document.querySelector(".weather-display").style.display = 'block';
			return;
		}

		console.log(weatherData);
		// Example: Update UI with weather information
		// weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
	} catch (error) {
		console.error("Error fetching weather data:", error);
	}
	document.querySelector('.city').innerHTML = weatherData.name
	document.querySelector(".temp").innerHTML =
		Math.round(weatherData.main.temp) + "°C";
		document.querySelector('.country').innerHTML = weatherData.sys.country
	document.querySelector('.humidity').innerHTML = weatherData.main.humidity + '%'
	document.querySelector('.wind').innerHTML = weatherData.wind.speed + "km/h";
	
	if(weatherData.weather[0].main === 'Cloud'){
		weatherIcon.src = 'main/cloud.png';
	}else if(weatherData.weather[0].main === 'Clear'){
		weatherIcon.src = 'main/clear.png';
	}else if(weatherData.weather[0].main === 'Rain'){
		weatherIcon.src = 'main/rain.png';
	}else if(weatherData.weather[0].main === 'Drizzles'){
		weatherIcon.src = 'main/drizzles.png';
	}else if(weatherData.weather[0].main === 'Mist'){
		weatherIcon.src = 'main/mist.png';
	}
}

searchBtn.addEventListener("click", () => {
	const city = searchBox.value.trim(); // Get value dynamically
	if (city) {
		checkWeather(city);
	} else {
		document.querySelector(".error").style.display = 'block'
	}
});

