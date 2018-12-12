const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = 284761;

const checkStatus = (response) => {
  return (response.ok) ? response : new Error(`${response.status} : ${response.statusText}`);
};

const toJSON = (response) => response.json();

class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJSON);
  }

  static loadResults(name) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name) {
    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }
}

export default Loader;
