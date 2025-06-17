import { deleteCardFromServer, 
  likeCard, dislikeCard
 } from "./api.js";

// Функция создания карточки
function createCard(cardData, userId, { handleLike, handleImageClick, handleDelete }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  // Показываем корзину если карточка принадлежит пользователю
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      handleDelete(cardData._id, cardElement);
    });
  } else {
    deleteButton.remove();
  }

  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  // Установить изначально активность кнопки, если лайкал пользователь
  const isLiked = cardData.likes.some(user => user._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeCount.textContent = cardData.likes.length;

  likeButton.addEventListener('click', () => {
    handleLike(cardData._id, likeButton, likeCount);
  });

  cardImage.addEventListener('click', () => {
    handleImageClick(cardData.name, cardData.link);
  });

  return cardElement;
}



// Обработчик удаления карточки
function handleDelete(cardId, cardElement) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.error(`Ошибка при удалении карточки: ${err}`);
    });
}

// Обработчик лайка карточки
function handleLike(cardId, likeButton, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const action = isLiked ? dislikeCard : likeCard;

  action(cardId)
    .then((updatedCard) => {
      likeCount.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => {
      console.error(`Ошибка при изменении лайка: ${err}`);
    });
}

export { createCard, handleLike , handleDelete};