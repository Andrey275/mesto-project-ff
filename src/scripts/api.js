const baseUrlConfig = 'https://nomoreparties.co/v1/wff-cohort-41';

const headersConfig = {
    authorization: '2601a24c-d952-4e20-aba9-fa07fa232a38',
    'Content-Type': 'application/json'
};

const errorHandling = (res) => {
  if (res.ok) {
        return res.json();
      }
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

const updateUserInfo = (name, about) => {
  return fetch(`${baseUrlConfig}/users/me`, {
    method: 'PATCH',
    headers: headersConfig,
    body: JSON.stringify({
      name,
      about
    })
  }).then(errorHandling);
};

const addCard = (name, link) => {
  return fetch(`${baseUrlConfig}/cards`, {
    method: 'POST',
    headers: headersConfig,
    body: JSON.stringify({
      name,
      link
    })
  }).then(errorHandling);
};

const deleteCardFromServer = (cardId) => {
  return fetch(`${baseUrlConfig}/cards/${cardId}`, {
    method: 'DELETE',
    headers: headersConfig
  })
  .then(errorHandling);
};

const likeCard = (cardId) => {
  return fetch(`${baseUrlConfig}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: headersConfig
  })
  .then(errorHandling);
};

const dislikeCard = (cardId) => {
  return fetch(`${baseUrlConfig}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: headersConfig
  })
  .then(errorHandling);
};

const updateAvatar = (avatarUrl) => {
  return fetch(`${baseUrlConfig}/users/me/avatar`, {
    method: 'PATCH',
    headers: headersConfig,
    body: JSON.stringify({ avatar: avatarUrl })
  })
  .then(errorHandling);
};


export { getUserInformation, getCards, 
  updateUserInfo, addCard, deleteCardFromServer, 
  likeCard, dislikeCard, updateAvatar
 };