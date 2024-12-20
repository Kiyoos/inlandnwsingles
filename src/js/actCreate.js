import { convertToJson, formDataToJSON } from './utils.mjs';
const baseURL = import.meta.env.VITE_BASE_URL;

export function addActEvent() {
  document.forms['createActivity'].addEventListener('submit', (e) => {
    e.preventDefault();
    actInfo(e.target);
    // console.log(e.target);
  });
}

export async function actInfo(form) {
  try {
    const json = formDataToJSON(form);
    const startTime = `${json.startDate}T${json.startTime}:00.000Z`;
    // console.log(startTime);
    console.log(json);
    const actInfo = {
      title: json.actTitle,
      startTime: startTime,
      location: {
        name: json.locName,
        street: json.street,
        city: json.city,
        state: json.state,
        zip: json.zip,
      },
      image: {
        src: json.actImg,
        alt: json.actTitle,
      },
    };
    console.log('actInfo', actInfo);
    const res = await postActivity(actInfo);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export async function postActivity(payload) {
  try {
    console.log('payload', payload);
    // console.log(payload);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + '/activities', options).then(convertToJson);
  } catch (error) {
    console.log(error);
  }
}
