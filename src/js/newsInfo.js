import { convertToJson, formDataToJSON } from './utils.mjs';
const baseURL = import.meta.env.VITE_BASE_URL;

export function newsletterEvent() {
  document.forms['newsletter'].addEventListener('submit', (e) => {
    e.preventDefault();
    subscribe(e.target);
    console.log(e.target);
  });
}

export async function subscribe(form) {
  const json = formDataToJSON(form);
  console.log(json);
  const newsInfo = {
    name: json.name,
    email: json.email,
  };
  console.log(newsInfo);
  try {
    const res = await postNewsInfo(newsInfo);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export async function postNewsInfo(payload) {
  console.log('payload', payload);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + '/newsletter/', options).then(convertToJson);
}
