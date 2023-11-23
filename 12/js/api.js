const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const request = (route, method = HttpMethod.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`, { method, body })
    .then((response) => response.json());

const getDataFromServer = () => request(ServerRoute.GET_DATA);

const sendDataFromServer = (body) => request(ServerRoute.SEND_DATA, HttpMethod.POST, body);

export { getDataFromServer, sendDataFromServer };
