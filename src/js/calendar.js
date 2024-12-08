import { actEvent, actStorage } from './activities';
import { getLocalStorage } from './utils.mjs';

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector('.calendarDates');
const currdate = document.querySelector('.calendarCurrentDate');
const preNexIcons = document.querySelectorAll('.calendarNav span');

// Array of month names
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// convert string to date
export function convertDate(data) {
  return new Date(data);
}

// get month
export function monthName(date) {
  const month = date.getMonth();
  return months[month];
}

// get day and suffix (1st, 2nd, 3rd, 4th, etc.)
export function dayName(date) {
  const day = date.getDate();
  let suffix = '';
  if (day > 3 && day < 21) {
    suffix = 'th';
  } else {
    switch (day % 10) {
      case 1:
        suffix = 'st';
      case 2:
        suffix = 'nd';
      case 3:
        suffix = 'rd';
      default:
        suffix = 'th';
    }
  }
  return `${day}${suffix}`;
}

export function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

// Function to generate the calendar
export default function calendar() {
  // Get the first day of the month
  let dayone = new Date(year, month, 1).getDay();

  // Get the last date of the month
  let lastdate = new Date(year, month + 1, 0).getDate();

  // Get the day of the last date of the month
  let dayend = new Date(year, month, lastdate).getDay();

  // Get the last date of the previous month
  let monthlastdate = new Date(year, month, 0).getDate();

  actStorage();
  const actDates = getLocalStorage('act-cal');
  console.log(actDates);

  // Variable to store the generated calendar HTML
  let lit = '';

  // Loop to add the last dates of the previous month
  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
  }

  // Loop to add the dates of the current month
  let d = 0;
  for (let i = 1; i <= lastdate; i++) {
    // Check if the date is today
    let isToday = '';
    let hasAct = '';
    let actId = '';
    if (
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      isToday = 'active';
    }
    // Check if date has activity
    if (
      actDates.find((day) => day.actDay === i) &&
      actDates.find((aMonth) => aMonth.actMonth === month)
    ) {
      actId = actDates[d].id;
      hasAct = 'hasAct';
      d++;
    }

    lit += `<li class="${isToday} ${hasAct}" data-id="${actId}">${i}</li>`;
  }

  // Loop to add the first dates of the next month
  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive">${i - dayend + 1}</li>`;
  }

  // Update the text of the current date element with the formatted current month and year
  currdate.innerText = `${months[month]} ${year}`;

  // update the HTML of the dates element with the generated calendar
  day.innerHTML = lit;
  actEvent();
}

// Attach a click event listener to each icon
preNexIcons.forEach((icon) => {
  // When an icon is clicked
  icon.addEventListener('click', () => {
    // Check if the icon is "calendarPrev" or "calendarNext"
    month = icon.id === 'calendarPrev' ? month - 1 : month + 1;

    // Check if the month is out of range
    if (month < 0 || month > 11) {
      // Set the date to the first day of the month with the new year
      date = new Date(year, month, new Date().getDate());

      // Set the year to the new year
      year = date.getFullYear();

      // Set the month to the new month
      month = date.getMonth();
    } else {
      // Set the date to the current date
      date = new Date();
    }

    // Call the calendar function to update the calendar display
    calendar();
  });
});
