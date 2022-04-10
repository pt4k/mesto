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

//Значению полей формы присваиваю значения профайла 
nameInput.value = profileName.textContent; 
jobInput.value = profileJob.textContent; 

// Объявляю функцию для редактирования 'Имени' и информации 'О себе' и закрываю попап после сохранения данных
function formSubmitHandler (evt) { 
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupElementProfile);
};

// функции открытия и закрытия попапов
const openPopup = (currentPopup) => {
  currentPopup.classList.toggle('popup_opened');
};
const closePopup = (currentPopup) => {
  currentPopup.classList.toggle('popup_opened');
};
const handlerClickOpen = (currentPopup) => (event) => openPopup(currentPopup);
const handlerClickClose = (currentPopup) => (event) => closePopup(currentPopup);

//функция добавление класса для активации лайка
function likeCard() {
  likeButton.classList.add('element__button-like_active');
};

//перебираю массив для создания карточек
initialCards.forEach((item) => {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const likeButton = card.querySelector('.element__button-like');
  
  card.querySelector('.element__text').textContent = item.name;
  card.querySelector('.element__img').src = item.link;
  card.querySelector('.element__img').alt = item.name;

  card.querySelector('.element__button-like').addEventListener('click', () => {
    likeButton.classList.add('element__button-like_active');
  });
  card.querySelector('.element__button-delete').addEventListener('click', () => {
    card.remove();
  });
  card.querySelector('.element__img').addEventListener('click', (evt) => {
    popupView.classList.add('popup_opened');
    titleViewCard.textContent = item.name;
    viewCard.src = item.link;
    viewCard.alt = item.name;
  });
  
  cardContainer.prepend(card);
});

//функция создания новой карточки
function createCard () {
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  const likeButton = newCard.querySelector('.element__button-like');

  newCard.querySelector('.element__text').textContent = placeInput.value;
  newCard.querySelector('.element__img').src = linkInput.value;
  newCard.querySelector('.element__img').alt = placeInput.value;

  newCard.querySelector('.element__button-like').addEventListener('click', () => {
    likeButton.classList.add('element__button-like_active');
  });
  newCard.querySelector('.element__button-delete').addEventListener('click', () => {
    newCard.remove();
  });
  newCard.querySelector('.element__img').addEventListener('click', (evt) => {
    popupView.classList.add('popup_opened')
    const nameImg = evt.target.alt;
    const linkImg = evt.target.src;

    titleViewCard.textContent = nameImg;
    viewCard.src = linkImg;
    viewCard.alt = nameImg;
  });

  return newCard;
};

//функция добавления карточки
const addCard = (event) => {
  event.preventDefault();

  const newCard = createCard();

  closePopup(popupElementCard);
  
  placeInput.value = '';
  linkInput.value = '';

  cardContainer.prepend(newCard);
};

// Добавляю слушатели событий на кнопки открытия/закрытия попапа и отправки формы
editButton.addEventListener('click', handlerClickOpen(popupElementProfile)); 
closeButtonPopupEditProfile.addEventListener('click', handlerClickClose(popupElementProfile)); 
formElementProfile.addEventListener('submit', formSubmitHandler); 
formElementAddCard.addEventListener('submit', addCard); 
addButton.addEventListener('click', handlerClickOpen(popupElementCard)); 
closeButtonPopupAddCard.addEventListener('click', handlerClickClose(popupElementCard)); 
closeButtonPopupViewCard.addEventListener('click', handlerClickClose(popupView));