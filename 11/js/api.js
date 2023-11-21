const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const request = (route, errorText, method = HttpMethod.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getDataFromServer = () => request(ServerRoute.GET_DATA, ErrorText.GET_DATA);

const sendDataFromServer = (body) => request(ServerRoute.SEND_DATA, ErrorText.SEND_DATA, HttpMethod.POST, body);

export { getDataFromServer, sendDataFromServer };
