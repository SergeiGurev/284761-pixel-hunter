const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = 284761;

const checkError = (response) => {
  if (!response.ok) {
    throw new Error(`${response.status} : ${response.statusText}`);
  }
};

class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    checkError(response);

    return response.json();
  }

  static async loadResults(name) {
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`);
    checkError(response);

    return response.json();
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
    checkError(response);

    return response;
  }
}

export default Loader;
