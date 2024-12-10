import { convertDate, dayName, monthName, formatTime } from './calendar';
import { getLocalStorage, setLocalStorage } from './utils.mjs';
import fetchWeather from './weather';
const baseURL = import.meta.env.VITE_BASE_URL;

let data = '';

export async function fetchActivities() {
  try {
    // connect to the activities on mongodb
    const activitiesURL = `${baseURL}/activities`;
    const response = await fetch(activitiesURL);
    data = await response.json();
    console.log(data);
    setLocalStorage('act-list', data);
  } catch (error) {
    console.log(error);
  }
}

export async function highlight(actId) {
  // console.log(actId);
  const data = getLocalStorage('act-list');
  const index = data.findIndex((id) => id._id === actId);
  // console.log(index);
  const highlightEl = document.getElementById('highlight');
  // console.log(data[index]);
  highlightEl.innerHTML = activityTemplate(data[index]);
  fetchWeather(data[index].location.zip);
}

export async function activityList() {
  const data = getLocalStorage('act-list');
  // console.log(data);
  const allActivitiesEl = document.getElementById('allActivities');
  allActivitiesEl.innerHTML = data.map(activityTemplate).join('');
}

function activityTemplate(data) {
  // console.log(data);
  const date = convertDate(data.startTime);
  const month = monthName(date);
  const day = dayName(date);
  const time = formatTime(date);
  // creates the activity cards
  return `
  <div class="gridCont activityContainer">
    <div class="weaFav flexRow">
      <span id="weather" class="flexRow"></span>
      <p class="activityFavorite">&#9734;<!--solid star &#9733;--></p>
    </div>
    <img
      class="activityImg"
      src="${data.image.src}"
      alt="${data.image.alt}"
    />
    <div class="activitySummary">
      <h4>${data.title}</h4>
      <p>${month} ${day}</p>
      <p>${time}</p>
      <p>
        <span class="building">${data.location.name}</span><br />${data.location.street}<br />${data.location.city}, ${data.location.state} ${data.location.zip}
      </p>
      <button type="button" class="activityComment">Comment</button>
    </div>
  </div>`;
}

export function actStorage() {
  const actList = getLocalStorage('act-list');
  // make array of activity dates and ids
  let actDates = [];
  actList.map((data) => {
    const date = convertDate(data.startTime);
    const actDay = date.getDate();
    const actMonth = date.getMonth();
    const actId = {
      id: data._id,
      actDay: actDay,
      actMonth: actMonth,
    };
    actDates.push(actId);
  });

  actDates.sort((a, b) => a.actDay - b.actDay);

  setLocalStorage('act-cal', actDates);
  // console.log(actDates);
}
export function actEvent() {
  document.querySelectorAll('.hasAct').forEach((item) => {
    item.addEventListener('click', (event) => {
      const clickedItem = event.target;
      const attributeValue = clickedItem.getAttribute('data-id');
      // console.log(attributeValue);
      return highlight(attributeValue);
    });
  });
}
