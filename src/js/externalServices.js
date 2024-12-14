import { setLocalStorage } from './utils.mjs';
const baseURL = import.meta.env.VITE_BASE_URL;

let data = '';

export async function fetchActivities() {
  try {
    // connect to the activities on mongodb
    const activitiesURL = `${baseURL}/activities`;
    const response = await fetch(activitiesURL);
    data = await response.json();
    // console.log(data);
    setLocalStorage('act-origin', data);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchActivity(actId) {
  try {
    // connect to the activities on mongodb
    const activityURL = `${baseURL}/activities/${actId}`;
    const response = await fetch(activityURL);
    data = await response.json();
    console.log(data);
    // setLocalStorage('act-origin', data);
  } catch (error) {
    console.log(error);
  }
}

export async function postActivity(activity) {
  // console.log(user);
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    };
    return await fetch(baseURL + 'activities', options).then(convertToJson);
  } catch (error) {
    console.log(error);
  }
}
