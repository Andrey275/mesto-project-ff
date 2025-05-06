import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { createCard, handleLike, handleDelete } from './card.js';

// DOM-элементы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

// DOM-элементы для профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Элементы формы редактирования профиля
const editProfileForm = popupEdit.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

// Элементы формы добавления карточки
const formAddCard = popupAddCard.querySelector('.popup__form');
const cardNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formAddCard.querySelector('.popup__input_type_url');

// Вывод карточек на страницу
initialCards.forEach(card => {
  const cardElement = createCard(card.name, card.link, {
    openModal,
    handleImageClick,
    handleLike,
    handleDelete
  });
  placesList.append(cardElement);
});

// Обработчики открытия попапов
editButton.addEventListener('click', () => openModal(popupEdit));
addButton.addEventListener('click', () => openModal(popupAddCard));

// Закрытие попапов по крестику или оверлею
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('popup__close') ||
      event.target.classList.contains('popup')
    ) {
      closeModal(popup);
    }
  });
});

// При открытии попапа подставляем текущие значения
function handleEditButtonClick() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
}

editButton.addEventListener('click', handleEditButtonClick);

// Обработчик отправки формы
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupEdit);
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// Обработчик добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  const newCard = createCard(name, link, {
    openModal,
    handleImageClick,
    handleLike,
    handleDelete
  });  

  placesList.prepend(newCard);
  formAddCard.reset();
  closeModal(popupAddCard);
}

formAddCard.addEventListener('submit', handleAddCardFormSubmit);

// Обработчик открытия попапа изображения
function handleImageClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}
