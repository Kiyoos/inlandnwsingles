function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export async function userInfo(form) {
  const json = formDataToJSON(form);
  try {
    const res = await postActivity(json);
    console.log(res);
    window.location = '/activities/index.html';
  } catch (err) {
    removeAllAlerts();
    for (let message in err.message) {
      alertMessage(err.message[message]);
    }
  }
}
