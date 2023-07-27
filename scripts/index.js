import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import { closeModalWindow, openModalWindow } from "./utils.js";

// Можно лучше: Массив изначальных карточек следует поместить в отдельный файл и подключать его перед index.js
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Врапперы
const placesWrap = document.querySelector(".places__list");
const editFormModalWindow = document.querySelector(".popup_type_edit");
const cardFormModalWindow = document.querySelector(".popup_type_new-card");
const imageModalWindow = document.querySelector(".popup_type_image");
// С submit ребята еще плохо работают.

// Кнопки и прочие дом узлы
const openEditFormButton = document.querySelector(".profile__edit-button");
const openCardFormButton = document.querySelector(".profile__add-button");

// DOM узлы профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Данные форм и элементы форм
const titleInputValue = editFormModalWindow.querySelector(
  ".popup__input_type_name"
);
const descriptionInputValue = editFormModalWindow.querySelector(
  ".popup__input_type_description"
);
const cardNameInputValue = cardFormModalWindow.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInputValue = cardFormModalWindow.querySelector(
  ".popup__input_type_url"
);
// решение на минималках. Конечно, студент может корректно обобрать велью инпутов в форме.

const cardSelector = ".card-template";
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormValidator = new FormValidator(
  validationConfig,
  editFormModalWindow
);
const cardFormValidator = new FormValidator(
  validationConfig,
  cardFormModalWindow
);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  closeModalWindow(editFormModalWindow);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard(
    {
      name: cardNameInputValue.value,
      link: cardLinkInputValue.value,
    },
    placesWrap
  );
  closeModalWindow(cardFormModalWindow);
  // Можно лучше: очищать форму после добавления новой карточки. Можно лучше: использовать .reset()
  cardNameInputValue.value = "";
  cardLinkInputValue.value = "";
};

const createCard = (data) => {
  const card = new Card(data, cardSelector);

  return card.getView();
};

const renderCard = (data, wrap) => {
  const card = createCard(data);
  wrap.prepend(card);
};

// EventListeners
editFormModalWindow.addEventListener("submit", handleProfileFormSubmit);
cardFormModalWindow.addEventListener("submit", handleCardFormSubmit);

openEditFormButton.addEventListener("click", () => {
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileDescription.textContent;
  openModalWindow(editFormModalWindow);
});

openCardFormButton.addEventListener("click", () => {
  // Если студент ресетит поля ввода после сабмита, то необходимо делать кнопку сохранения неактивной и добавлять ей соответствующий класс.
  // Важно: это одно из возможных решений. Студент может реализовать валидацию для пустей полей ввода иным способом. Главное, чтобы в его коде не было дублирования
  cardFormValidator.disableSubmitButton();
  openModalWindow(cardFormModalWindow);
});

editFormModalWindow.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModalWindow(editFormModalWindow);
  }
});
cardFormModalWindow.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModalWindow(cardFormModalWindow);
  }
});
imageModalWindow.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModalWindow(imageModalWindow);
  }
});

// Render
initialCards.forEach((data) => {
  renderCard(data, placesWrap);
});

/* Саммари:
 * В этом спринте нет нового функционала нет, студенты только рефакторят свой код, переписывают на классы.
 * Карточки создаются с помощью публичного метода класса Card
 * Должно быть создано 2 объекта валидации. Вызов функции enableValidation для каждой из форм вызывается только один раз
 * Не должно быть дублирования кода - функции/закрытия открытия советуем выносить в utils.js
 * */
