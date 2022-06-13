import './index.css';
import {
  validationConfig,
  popupElementProfile,
  popupElementCard,
  popupElementAvatar,
  editButton,
  addButton,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  profileAvatar
} from '../utils/constants.js';
import Card from '../components/Сard.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';



let userId = null;
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
      authorization: 'e5a37e81-cb9a-4a0e-bacc-f2b0bcf5bc25',
      'Content-Type': 'application/json'
  }
});


//запрос данных пользователя и карточек
const userInfo = new UserInfo({ userNameSelector: '.profile__title' ,userInfoSelector: '.profile__text', avatarSelector: '.profile__avatar' });

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((res) => {

  profileName.textContent = res[0].name;
  profileJob.textContent = res[0].about;
  profileAvatar.src =res[0].avatar;
  userId = res[0]._id;
  cardList.renderItems(res[1]);
})
.catch((err) => {
  console.log(err);
})


//отрисовка карточек
const cardList = new Section({
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardList.addItem(cardElement);
  }
}, 
'.elements');

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      cardSelector: '.card-template_type_default',
      userId: userId,
      
      handleCardClick: (name, link) => {
        popupViewCard.open({name, link});
      },

      handleLikeClick: (item) => {
        if (card.isLiked()) {
          api.handleDislikeCard(item._id)
          .then((item) => {
            card.setLikeCount(item);
          })
          .catch((err) => {
            console.log(err)
          })
        } else {
          api.handleLikeCard(item._id)
          .then((item) => {
            card.setLikeCount(item);
        })
        .catch((err) => {
          console.log(err);
        })
      }},

      handleDeleteIconClick: (data) => {
        popupDeleteCard.open(data);
        console.log(data)
      }

    });
    
    return card.generateCard();
};


//попап изменения информации о пользователи
const popupFormProfile = new PopupWithForm({ handleProfileFormSubmit: (userData) => { 
  popupFormProfile.renderLoading(true);

  api.patchUserInfo(userData)
  .then((userData) => {
      profileName.textContent = userData.name,
      profileJob.textContent = userData.about
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupFormProfile.renderLoading(false);
  })
  .then(() => {
    popupFormProfile.close();
  })
} 
},
'.popup_edit_profile');


//попап изменения аватара
const popupFormAvatar = new PopupWithForm ({ handleProfileFormSubmit: (inputData) => {
  popupFormAvatar.renderLoading(true);
  
  api.pathUserAvatar(inputData)
  
  .then((inputData) => {
    profileAvatar.src = inputData.avatar;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupFormAvatar.renderLoading(false);
  })
  .then(() => {
    popupFormAvatar.close();
  })
} 
}, 
'.popup_edit_avatar');


//попап добавления новой карточки
const popupFormCard = new PopupWithForm ({ handleProfileFormSubmit: (inputData) => {
  popupFormCard.renderLoading(true);

  const newCard = {
    name: inputData.name,
    link: inputData.link
  }

  api.addNewCard(newCard)
  .then((data) => {
    const cardElement = createCard(data);
    cardList.addItem(cardElement);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupFormCard.renderLoading(false);
  })
  .then(() => {
    popupFormCard.close();
  })
} 
},
'.popup_add_card');


//попап просмотра карточки 
const popupViewCard = new PopupWithImage ('.popup_view_card');


//попап удаления карточки 
const popupDeleteCard = new PopupWithSubmit ({ 
  handleProfileFormSubmit: (data) => {
    popupDeleteCard.setSubmitHandler(data);
    
    //popupDeleteCard.renderLoading(true);
    console.log(data);
    api.deleteCard(cardId)
    .then(() => {
      data.deleteCard();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //popupDeleteCard.renderLoading(false);
    })
    .then(() => {
      popupDeleteCard.close()
    })
  } 
},
  '.popup_delete_card');


//слушатели
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

profileAvatar.addEventListener('click', () => {
  formAvatarValidator.resetFormValidation();
  formAvatarValidator.disableButton();
  popupFormAvatar.open();
});


popupFormProfile.setEventListeners();
popupFormCard.setEventListeners();
popupViewCard.setEventListeners();
popupFormAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

//валидация форм
const formProfileValidator = new FormValidator(validationConfig, popupElementProfile);
formProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(validationConfig, popupElementCard);
formAddCardValidator.enableValidation();
const formAvatarValidator = new FormValidator(validationConfig, popupElementAvatar);
formAvatarValidator.enableValidation();