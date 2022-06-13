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
  profilleJob,
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

  console.log(res);
  console.log(res[0].name);
  console.log(res[0].about);
  console.log(res[0].avatar);
  console.log(res[0]._id);

  profileName.textContent = res[0].name;
  profilleJob.textContent = res[0].about;
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
      
      handleCardClick: (imgInfo) => {
        popupViewCard.open(imgInfo.name, imgInfo.link);
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
      }}

    });
    
    return card.generateCard();
};


//попап изменения информации о пользователи
const popupFormProfile = new PopupWithForm({ handleProfileFormSubmit: (userData) => { 
  popupFormProfile.renderLoading(true);

  api.patchUserInfo(userData)
  .then((data) =>{
    userInfo.setUserInfo({
      name: data.name,
      about: data.about
    });
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
  .then((data) => {
    userInfo.setUserAvatar(data);
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
    name: inputData.place,
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
    popupDeleteCard.renderLoading(true);
    api.deleteCard(data._id)
    .then(() => {
      data.deleteCard()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupDeleteCard.renderLoading(false);
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
console.log(editButton);

addButton.addEventListener('click', () => {
  formAddCardValidator.disableButton();
  popupFormCard.open();
});

profileAvatar.addEventListener('click', () => {
  popupFormAvatar.resetForm();
  popupFormAvatar.disableButton();
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



/*api.getInitialData()
.then(promises => {
  const [ cardsPromise, userPromise ] = promises;
  const userId = userPromise._id;
  
  cardList.renderItems(cardsPromise);
})
.catch((err) => {
  console.log(`Ошибка запроса данных с сервера ${err}`);
});*/

/*api.getUserInfo()
.then((result) => {

  profileName.textContent = result.name;
  profilleJob.textContent = result.about;
  profileAvatar.src = result.avatar;
})
.catch((err) => {
  console.log(err);
});*/

/*api.getInitialCards()
.then((result) => {
  cardList.renderItems(result);
})
.catch((err) => {
  console.log(err);
});*/

/*fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
  method: 'POST',
  headers: {
    authorization: 'e5a37e81-cb9a-4a0e-bacc-f2b0bcf5bc25',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Ferrari F1-91',
    link: 'https://cdn-1.motorsport.com/images/amp/0oKpa5b0/s1200/f1-portuguese-gp-1991-jean-ale.webp'
  })
});*/

/*const createCard = (item) => {
  const card = new Card(item, '.card-template_type_default', {handleCardClick: () => {
    popupViewCard.open(item);
  }});
  return card.generateCard();
}*/

  /*userInfo.setUserInfo({
    name: res[0].name,
    about: res[0].about,
    avatar: res[0].avatar
  });*/