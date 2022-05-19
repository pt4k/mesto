import Card from './Card.js';
import FormValidator from './FormValidator.js';

//массив с данными карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//объект с селекторами и классами форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//объявил переменные попапов
const popupElementProfile = document.querySelector('.popup_edit_profile');
const popupElementCard = document.querySelector('.popup_add_card');
const popupView = document.querySelector('.popup_view_card');
// объявил переменные для кнопок открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const viewCard = popupView.querySelector('.popup__img_view-card');
// объявил переменные для разделов в профайле ('Имя' и 'О себе') 
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__title');
const profileJob = profileInfo.querySelector('.profile__text');
// объявил переменные для полей формы ('Имя' и 'О себе') 
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = formElementProfile.querySelector('.popup__input_el_first-name');
const jobInput = formElementProfile.querySelector('.popup__input_el_about');
//объявил переменные для полей формы ('место' и 'ссылка') 
const formElementAddCard = document.querySelector('.popup__form_type_card');
const placeInput = formElementAddCard.querySelector('.popup__input_el_place');
const linkInput = formElementAddCard.querySelector('.popup__input_el_link');
//объявил переменные template тега
const cardContainer = document.querySelector('.elements');
//const cardTemplate = document.querySelector('.card-template').content;
const titleViewCard = popupView.querySelector('.popup__title_view-card');
const popups = document.querySelectorAll('.popup');


//функция для открытия попапа редактирования профиля 
const openPopupEditProfile = (popupElementProfile) => {
  openPopup(popupElementProfile);

  nameInput.value = profileName.textContent; 
  jobInput.value = profileJob.textContent; 
};

//функции открытия и закрытия попапов
function openPopup (currentPopup) {
  currentPopup.classList.toggle('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};
function closePopup (currentPopup) {
  currentPopup.classList.toggle('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
      };
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      };
  });
});

// функции закрятия попапов по клику и нажатия по esc
function closeByEsc (evt) {
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

//функция для редактирования 'Имени' и информации 'О себе' и закрываю попап после сохранения данных
function handleProfileFormSubmit (evt) { 
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupElementProfile);
};

function createCard (data, selector) {
  const card = new Card(data, '.card-template_type_default');
  const cardElement = card.generateCard();
  
  cardContainer.prepend(cardElement);
}

//перебираю массив для создания карточек
initialCards.forEach((item) => {
  createCard(item);
});

//функция добавления карточки
const addCard = (event) => {
  event.preventDefault();

  createCard ({ name: placeInput.value, link: linkInput.value }, '.card-template_type_default');

  formElementAddCard.reset();
  closePopup(popupElementCard);
};

const formProfileValidator = new FormValidator(validationConfig, popupElementProfile);
formProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(validationConfig, popupElementCard);
formAddCardValidator.enableValidation();


// Добавляю слушатели событий на кнопки открытия/закрытия попапа и отправки формы
editButton.addEventListener('click', () => openPopupEditProfile(popupElementProfile));
addButton.addEventListener('click', () => {
  formAddCardValidator.disableButton();
  openPopup(popupElementCard);
});
formElementProfile.addEventListener('submit', handleProfileFormSubmit);
formElementAddCard.addEventListener('submit', addCard);

export { popupView, viewCard, titleViewCard, openPopup };