// Эти функции и переменные используются и в index.js, и в Card.js.
// Студент может их объявить в index.js и импортировать в Card.js, но в этом случае будет circular dependency.
// Поэтому как "Можно лучше" посоветуйте вынести эти функции и переменные в модуль utils.js

export const imageModalWindow = document.querySelector('.popup_type_image');
export const imageElement = imageModalWindow.querySelector('.popup__image');
export const imageCaption = imageModalWindow.querySelector('.popup__caption');
export const ESC_KEYCODE = 27;

export const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscUp);
};

export const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscUp);
};

export const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModalWindow);
};

export const isEscEvent = (evt, action) => {
  if (evt.which === ESC_KEYCODE) {
    const activePopup = document.querySelector('.popup_is-opened');
    action(activePopup);
  }
};
