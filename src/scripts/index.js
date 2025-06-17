import '../pages/index.css';
import { openModal, closeModal } from './modal.js';
import { createCard, handleLike, handleDelete } from './card.js';
import { enableValidation, clearValidation } from "./validation.js";
import { getUserInformation, getCards, updateUserInfo, addCard, updateAvatar } from "./api.js";

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
const profileImage = document.querySelector(".profile__image");

// Элементы формы редактирования профиля
const editProfileForm = popupEdit.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

// Элементы формы добавления карточки
const formAddCard = popupAddCard.querySelector('.popup__form');
const cardNameInput = formAddCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = formAddCard.querySelector('.popup__input_type_url');

// Элементы формы редактирования аватара
const avatarPopup = document.querySelector('.popup_type_new-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('#avatar-input');

// Обработчики открытия попапов
editButton.addEventListener('click', () => {
  clearValidation(popupEdit, validationConfig);
  openModal(popupEdit);
});
addButton.addEventListener('click', () => {
  formAddCard.reset();
  clearValidation(popupAddCard, validationConfig);
  openModal(popupAddCard);
});

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
}

editButton.addEventListener('click', handleEditButtonClick);

// Обработчик отправки формы профиля
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  renderLoading(true, submitButton);

  const name = nameInput.value;
  const about = jobInput.value;

  updateUserInfo(name, about)
    .then((updatedUser) => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

// Обработчик добавления новой карточки
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  renderLoading(true, submitButton);

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

   addCard(name, link)
    .then((cardData) => {
      const newCard = createCard(cardData, userId, {
        openModal,
        handleImageClick,
        handleLike,
        handleDelete
      });

      placesList.prepend(newCard);
      formAddCard.reset();
      closeModal(popupAddCard);
      clearValidation(popupAddCard, validationConfig);
    })
    .catch((err) => {
      console.log('Ошибка при добавлении карточки:', err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

formAddCard.addEventListener('submit', handleAddCardFormSubmit);

// Обработчик открытия попапа изображения
function handleImageClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}

// Редактирование аватара

profileImage.addEventListener('click', () => {
  avatarInput.value = '';
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  renderLoading(true, submitButton);

  const avatarUrl = avatarInput.value;

  updateAvatar(avatarUrl)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

// Меняем текст кнопки при загрузке данных
function renderLoading(isLoading, buttonElement, defaultText = "Сохранить") {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = defaultText;
  }
}

// ВАЛИДАЦИЯ

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

let userId;

Promise.all([getUserInformation(), getCards()])
  .then(([userRes, cardsRes]) => {
    userId = userRes._id;

    profileTitle.textContent = userRes.name;
    profileDescription.textContent = userRes.about;
    profileImage.style.backgroundImage = `url(${userRes.avatar})`;
// Вывод карточек на страницу
    cardsRes.forEach(card => {
      const cardElement = createCard(card, userId, {
        openModal,
        handleImageClick,
        handleLike,
        handleDelete
      });
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });
