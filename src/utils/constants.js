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
const popupDeleteCard = document.querySelector('.popup_delete_card');
const popupElementAvatar = document.querySelector('.popup_edit_avatar');
// объявил переменные для кнопок открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// объявил переменные для полей формы ('Имя' и 'О себе') 
const formElementProfile = document.querySelector('.popup__form_type_profile');
const nameInput = formElementProfile.querySelector('.popup__input_el_first-name');
const jobInput = formElementProfile.querySelector('.popup__input_el_about');

const profileName = document.querySelector('.profile__title');
const profilleJob = document.querySelector('.profile__text');
const profileAvatar = document.querySelector('.profile__avatar');
 

export { 
  validationConfig,
  popupElementProfile,
  popupElementCard,
  popupElementAvatar,
  popupDeleteCard,
  editButton,
  addButton,
  nameInput,
  jobInput,
  profileName,
  profilleJob,
  profileAvatar
};