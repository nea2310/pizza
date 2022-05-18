let mainServerUrl = '/reactcourseapi/';

export default function
  makeRequest(url: string, options = {}, baseUrl = mainServerUrl) {
  return fetch(baseUrl + url, options) //отправили на сервер запрос 
    .then((response) => {

      if (response.status !== 200) {// если статус ответа не 200
        return response.text()
          .then(function (text) {
            throw new Error(text); //выбросить ошибку
          });
      }

      return response.json();// преобразовать ответ из json строки в объект
    });
}