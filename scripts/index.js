//объявил переменные попапов
const popupElementProfile = document.querySelector('.popup_edit_profile');
const popupElementCard = document.querySelector('.popup_add_card');
const popupView = document.querySelector('.popup_view_card');
// объявил переменные для кнопок открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const viewCard = popupView.querySelector('.popup__img_view-card');
// объявил переменные для кнопок закрытия попапов
const closeButtonPopupEditProfile = popupElementProfile.querySelector('.popup__close-button_edit_profile');
const closeButtonPopupAddCard = popupElementCard.querySelector('.popup__close-button_add_card');
const closeButtonPopupViewCard = popupView.querySelector('.popup__close-button_view_card');
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
const cardTemplate = document.querySelector('.card-template').content;
const titleViewCard = popupView.querySelector('.popup__title_view-card');
const imgCard = document.querySelector('.element__img');
const titleCard = document.querySelector('.element__text');
const popups = document.querySelectorAll('.popup');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

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
const handleClickOpen = (currentPopup) => () => openPopup(currentPopup);

//функция для лайка
const likeCard = (event) => {
  event.target.classList.toggle('element__button-like_active');
};
//функция для редактирования 'Имени' и информации 'О себе' и закрываю попап после сохранения данных
function handleProfileFormSubmit (evt) { 
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupElementProfile);
};

//перебираю массив для создания карточек
initialCards.forEach((item) => {
  cardContainer.prepend(createCard(item.name, item.link));
});

//функция создания новой карточки
function createCard (name, link) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);

  card.querySelector('.element__text').textContent = name;
  card.querySelector('.element__img').src = link;
  card.querySelector('.element__img').alt = name;
  card.querySelector('.element__button-like').addEventListener('click', likeCard);
  card.querySelector('.element__button-delete').addEventListener('click', () => {
    card.remove();
  });
  card.querySelector('.element__img').addEventListener('click', (evt) => {
    openPopup(popupView);
    const nameImg = evt.target.alt;
    const linkImg = evt.target.src;

    titleViewCard.textContent = nameImg;
    viewCard.src = linkImg;
    viewCard.alt = nameImg;
  });

  return card;
};

function disableButton(buttonElement) {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};


//функция добавления карточки
const addCard = (event) => {
  event.preventDefault();
  const newCard = createCard(placeInput.value, linkInput.value);
  const buttonElement = formElementAddCard.querySelector('.popup__save-button');

  cardContainer.prepend(newCard);
  formElementAddCard.reset();
  disableButton(buttonElement);
  closePopup(popupElementCard);
};

// Добавляю слушатели событий на кнопки открытия/закрытия попапа и отправки формы
editButton.addEventListener('click', () => openPopupEditProfile(popupElementProfile));
addButton.addEventListener('click', handleClickOpen(popupElementCard));
formElementProfile.addEventListener('submit', handleProfileFormSubmit);
formElementAddCard.addEventListener('submit', addCard);