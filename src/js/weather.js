const apiKey = 'cc37759cf1ea1a86889a1de5b1352725';
const weatherEl = document.getElementById('weather');

export default async function fetchWeather() {
  try {
    const zip = 83854;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}&units=imperial`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    weatherEl.innerHTML = `Current Weather ${data.main.temp}&#8457;`;
  } catch (error) {
    console.log(error);
  }
}
