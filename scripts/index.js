// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = name;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', function () {
    deleteCard(cardElement)
  });
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  placesList.append(createCard(card.name, card.link, deleteCard));
});
