const baseURL = import.meta.env.VITE_BASE_URL;

function convertToJson(res) {
  const json = res.json();
  if (res.ok) {
    return json;
  } else {
    throw { name: 'servicesError', message: json };
  }
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function addActEvent() {
  document.forms['createActivity'].addEventListener('submit', (e) => {
    e.preventDefault();
    actInfo(e.target);
    console.log(e.target);
  });
}
// got from userInfo() in sleepoutside

export async function actInfo(form) {
  const json = formDataToJSON(form);
  const startTime = `${json.startDate}T${json.startTime}:00.000Z`;
  console.log(startTime);
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
  console.log(actInfo);
  try {
    const res = await postActivity(actInfo);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export async function postActivity(payload) {
  console.log('payload', payload);
  // console.log(payload);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + '/activities/', options).then(convertToJson);
}
