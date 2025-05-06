function openModal(popup) {
  popup.classList.add('popup_is-animated');
  requestAnimationFrame(() => {
    popup.classList.add('popup_is-opened');
  });
  document.addEventListener('keydown', handleEscClose);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');

  popup.addEventListener('transitionend', function handleTransitionEnd(evt) {
    if (!popup.classList.contains('popup_is-opened')) {
      popup.classList.remove('popup_is-animated');
    }
    popup.removeEventListener('transitionend', handleTransitionEnd);
  });

  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export { openModal, closeModal };
