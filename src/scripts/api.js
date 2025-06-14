const baseUrlConfig = 'https://nomoreparties.co/v1/wff-cohort-41';

const headersConfig = {
    authorization: '2601a24c-d952-4e20-aba9-fa07fa232a38',
    'Content-Type': 'application/json'
};

const errorHandling = (res) => {
  if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserInformation = () => {
  return fetch(`${baseUrlConfig}/users/me`, {
    headers: headersConfig
  })
    .then(errorHandling);
};

const getCards = () => {
  return fetch(`${baseUrlConfig}/cards `, {
    headers: headersConfig
  })
    .then(errorHandling);
};


export { errorHandling, getUserInformation, getCards };