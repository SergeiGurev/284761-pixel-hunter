const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = 284761;
const STATUS_OK = 200;

const checkStatus = (response) => {
  return (response.ok) ? STATUS_OK : new Error(`${response.status} : ${response.statusText}`);
};

const toJSON = (response) => response.json();

class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    const status = checkStatus(response);

    if (status === STATUS_OK) {
      return toJSON(response);
    } else {
      throw status;
    }
  }

  static async loadResults(name) {
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`);
    const status = checkStatus(response);

    if (status === STATUS_OK) {
      return toJSON(response);
    } else {
      throw status;
    }
  }

  static async saveResults(data, name) {
    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings);
    const status = checkStatus(response);

    if (status === STATUS_OK) {
      return response;
    } else {
      throw status;
    }
  }
}

export default Loader;
