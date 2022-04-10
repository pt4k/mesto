// Объявляю переменные для кнопок открытия и закрытия попапа 
const popupElementProfile = document.querySelector('.popup_edit_profile'); 
const editButton = document.querySelector('.profile__edit-button'); 
const closeButtonPopupEditProfile = popupElementProfile.querySelector('.popup__close-button_edit_profile'); 
// Объявляю переменные для разделов в профайле ('Имя' и 'О себе') 
let profileInfo = document.querySelector('.profile__info'); 
let profileName = profileInfo.querySelector('.profile__title'); 
let profileJob = profileInfo.querySelector('.profile__text'); 
// Объявляю переменные для полей формы ('Имя' и 'О себе') 
let formElementProfile = document.querySelector('.popup__form_type_profile'); 
let nameInput = formElementProfile.querySelector('.popup__input_el_first-name'); 
let jobInput = formElementProfile.querySelector('.popup__input_el_about'); 

//Значению полей формы присваиваю значения профайла 
nameInput.value = profileName.textContent; 
jobInput.value = profileJob.textContent; 

// функции открытия и закрытия попапов
const openPopup = (currentPopup) => {
  currentPopup.classList.toggle('popup_opened');
};
const closePopup = (currentPopup) => {
  currentPopup.classList.toggle('popup_opened');
};
const handlerClickOpen = (currentPopup) => (event) => openPopup(currentPopup);
const handlerClickClose = (currentPopup) => (event) => closePopup(currentPopup);


// Объявляю функцию для редактирования 'Имени' и информации 'О себе'
function formSubmitHandler (evt) { 
  evt.preventDefault(); 

//Значению профайла присваиваю значения полей формы 
  profileName.textContent = nameInput.value; 
  profileJob.textContent = jobInput.value; 
  
  closePopup(popupElementProfile);
}; 

// Добавляю слушатели событий на кнопки открытия/закрытия попапа и отправки формы
editButton.addEventListener('click', handlerClickOpen(popupElementProfile)); 
closeButtonPopupEditProfile.addEventListener('click', handlerClickClose(popupElementProfile)); 
formElementProfile.addEventListener('submit', formSubmitHandler); 






// 5-ый спринт

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

// переменные
const popupElementCard = document.querySelector('.popup_add_card');//переменная попапа добавления карточки
const addButton = document.querySelector('.profile__add-button');//переменная кнопки добавить карточку
const closeButtonPopupAddCard = popupElementCard.querySelector('.popup__close-button_add_card');//переменная кнопки закрытия попапа добавления карточки
const cardContainer = document.querySelector('.elements'); //переменная контейнера в которой будут карточки
const formElementAddCard = document.querySelector('.popup__form_type_card'); // переменная для кнопки сохранить
let placeInput = formElementAddCard.querySelector('.popup__input_el_place'); // переменная поля ввода названия места
let linkInput = formElementAddCard.querySelector('.popup__input_el_link'); // переменная поля для ввода URL адреса места
const cardTemplate = document.querySelector('.card-template').content;// переменная контейнера 


//перебираем массив для создания карточек
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

function likeCard() {
  likeButton.classList.add('element__button-like_active');
};

const popupView = document.querySelector('.popup_view_card');


formElementAddCard.addEventListener('submit', addCard); 
addButton.addEventListener('click', handlerClickOpen(popupElementCard)); 
closeButtonPopupAddCard.addEventListener('click', handlerClickClose(popupElementCard)); 
