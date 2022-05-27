import {
  initialCards,
  validationConfig,
  popupElementProfile,
  popupElementCard,
  editButton,
  addButton,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
} from '../utils/constants.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


const createCard = (item) => {
  const card = new Card(item, '.card-template_type_default', {handleCardClick: () => {
    popupViewCard.open(item);
  }});
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards, 
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardList.addItem(cardElement);
  }
}, 
'.elements');
cardList.renderItems();

const userInfo = new UserInfo({ userNameSelector: '.profile__title' ,userInfoSelector: '.profile__text' });

const popupFormProfile = new PopupWithForm({ handleProfileFormSubmit: (userData) => {  
  userInfo.setUserInfo(userData);
  popupFormProfile.close();
} 
},
'.popup_edit_profile');

const popupFormCard = new PopupWithForm ({ handleProfileFormSubmit: () => {

  const newCard = { 
    name: placeInput.value, 
    link: linkInput.value
  }

  const cardElement = createCard(newCard);
  cardList.addItem(cardElement);

  popupFormCard.close();
} 
},
'.popup_add_card');

const popupViewCard = new PopupWithImage ('.popup_view_card');

const formProfileValidator = new FormValidator(validationConfig, popupElementProfile);
formProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(validationConfig, popupElementCard);
formAddCardValidator.enableValidation();

editButton.addEventListener('click', () => {
  formProfileValidator.resetFormValidation();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.info;

  popupFormProfile.open();
});
addButton.addEventListener('click', () => {
  formAddCardValidator.disableButton();
  popupFormCard.open();
});

popupFormProfile.setEventListeners();
popupFormCard.setEventListeners();
popupViewCard.setEventListeners();