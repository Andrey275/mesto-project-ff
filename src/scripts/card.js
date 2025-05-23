// Функция создания карточки
function createCard(name, link, { handleLike, handleImageClick, handleDelete }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => handleDelete(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    handleLike(likeButton);
  });

  cardImage.addEventListener('click', () => {
    handleImageClick(name, link);
  });

  return cardElement;
}

// Обработчик удаления карточки
function handleDelete(cardElement) {
  cardElement.remove();
}

// Обработчик лайка карточки
function handleLike(button) {
  button.classList.toggle('card__like-button_is-active');
}

export { createCard, handleLike , handleDelete};