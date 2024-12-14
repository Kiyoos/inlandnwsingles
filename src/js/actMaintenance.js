import { convertDate, dayName, monthName, formatTime } from './calendar';
import { favEvent } from './favorites';
import { getLocalStorage, setLocalStorage } from './utils.mjs';
import fetchWeather from './weather';

export async function highlight(actId) {
  // console.log(actId);
  const data = getLocalStorage('act-list');
  const index = data.findIndex((id) => id._id === actId);
  // console.log(index);
  const calDivEl = document.querySelector('#calendar>div');
  calDivEl.classList.add('gridCont');
  const highlightEl = document.getElementById('highlight');
  // console.log(data[index]);
  highlightEl.innerHTML = activityTemplate(data[index]);
  fetchWeather(data[index].location.zip);
  favEvent();
}

export async function activityList() {
  const data = getLocalStorage('act-list');
  // console.log(data);
  const allActivitiesEl = document.getElementById('allActivities');
  allActivitiesEl.innerHTML = data.map(activityTemplate).join('');
  // favEvent();
}

export function activityTemplate(data) {
  // console.log(data);
  const date = convertDate(data.startTime);
  const month = monthName(date);
  const day = dayName(date);
  const time = formatTime(date);
  let star = '&#9734;'; // outlined star
  if (data.favorite) {
    star = '&#9733;'; // filled star
  }
  // creates the activity cards
  return `
  <div class="gridCont activityContainer">
    <div class="weaFav gridCont">
      <span id="weather"></span>
      <span class="activityFavorite" data-id="${data._id}">${star}</span>
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

export async function actCalStorage() {
  const actList = await getLocalStorage('act-list');
  // console.log('actCalStorage');
  console.log(actList);
  // make array of activity dates and ids
  let actDates = [];
  actList.map((data) => {
    const date = convertDate(data.startTime);
    const actDay = date.getDate();
    const actMonth = date.getMonth();
    const actId = {
      id: data._id,
      title: data.title,
      actDay: actDay,
      actMonth: actMonth,
    };
    actDates.push(actId);
  });

  actDates.sort((a, b) => a.actDay - b.actDay);

  setLocalStorage('act-cal', actDates);
  // console.log(actDates);
}

function actClear() {
  const highlightEl = document.getElementById('highlight');
  highlightEl.innerHTML = '';
  const calDivEl = document.querySelector('#calendar>div');
  calDivEl.classList.remove('gridCont');
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

export function actEventClear() {
  document.querySelectorAll('.noAct').forEach((item) => {
    item.addEventListener('click', actClear);
  });
}
