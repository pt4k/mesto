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

// Объявляю функцию для открытия попапа 
function openPopupEditProfile() { 
  popupElementProfile.classList.add('popup_opened'); 

//Значению полей формы присваиваю значения профайла 
  nameInput.value = profileName.textContent; 
  jobInput.value = profileJob.textContent; 
}; 

// Объявляю функцию для закрытия попапа 
function closePopupEditProfile() { 
  popupElementProfile.classList.remove('popup_opened'); 
}; 

// Объявляю функцию для редактирования 'Имени' и информации 'О себе'
function formSubmitHandler (evt) { 
  evt.preventDefault(); 

//Значению профайла присваиваю значения полей формы 
  profileName.textContent = nameInput.value; 
  profileJob.textContent = jobInput.value; 
  closePopupEditProfile(); 
}; 

// Добавляю слушатели событий на кнопки открытия/закрытия попапа и отправки формы
editButton.addEventListener('click', openPopupEditProfile); 
closeButtonPopupEditProfile.addEventListener('click', closePopupEditProfile); 
formElementProfile.addEventListener('submit', formSubmitHandler); 













// 5-ый спринт

//массив с данными
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

  const popupElementCard = document.querySelector('.popup_add_card');//переменная попапа добавления карточки
  const addButton = document.querySelector('.profile__add-button');//переменная кнопки добавить карточку
  const closeButtonPopupAddCard = popupElementCard.querySelector('.popup__close-button_add_card');//переменная кнопки закрытия попапа добавления карточки
  const formElementAddCard = document.querySelector('.popup__form_type_card'); // переменная для кнопки сохранить
  const placeInput = formElementAddCard.querySelector('.popup__input_el_place'); // переменная поля ввода названия места
  const linkInput = formElementAddCard.querySelector('.popup__input_el_link'); // переменная поля для ввода URL адреса места

/* функции открытия и закрытия попапа, и добавления сохранения карточки что бы страница не перезагружалась
пока временное решение, поже надо будет переделать, что бы все попапы открывались и закрывались одними функциями */
  function openPopupAddCard() { 
    popupElementCard.classList.add('popup_opened'); 
  }; 
  function closePopupAddCard() { 
    popupElementCard.classList.remove('popup_opened'); 
  }; 
  function formSubmitHandlerAdd (evt) { 
    evt.preventDefault(); 
    closePopupAddCard(); 
  }; 

/* слушатели открытия и закрытия попапа и кнопки сохранить, тоже скорее всего прийдеться потом переделать, пока временное решение*/
addButton.addEventListener('click', openPopupAddCard); 
closeButtonPopupAddCard.addEventListener('click', closePopupAddCard); 
formElementAddCard.addEventListener('submit', formSubmitHandlerAdd); 
