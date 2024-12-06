const baseURL = import.meta.env.VITE_BASE_URL;

export async function fetchActivities() {
  try {
    // connect to the activities on mongodb
    const activitiesURL = `${baseURL}/activities`;

    const response = await fetch(activitiesURL);
    const data = await response.json();
    console.log(data);

    // weatherEl.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
    //   <span>${data.main.temp}&#8457;</span>`;
  } catch (error) {
    console.log(error);
  }
}
