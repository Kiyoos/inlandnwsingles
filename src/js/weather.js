// import 'dotenv/config';
const apiKey = import.meta.env.VITE_WEATHER_API;

const weatherEl = document.getElementById('weather');

export default async function fetchWeather(zip = 83854) {
  try {
    // connect to the weather api using a zip code
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=imperial`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);

    weatherEl.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
      <span>${data.main.temp}&#8457;</span>`;
  } catch (error) {
    console.log(error);
  }
}
