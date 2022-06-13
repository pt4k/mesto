export default class Card {
  constructor({ data, cardSelector, userId, handleCardClick, handleLikeClick, handleDeleteIconClick }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
  }
  
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__img');
    this._likeButton = this._element.querySelector('.element__button-like');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._deleteCard = this._element.querySelector('.element__button-delete');

    this._element.querySelector('.element__text').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    this._handleDeleteCard();
    this._handleLikes();
    this.likeCounter();
  
    return this._element;
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  _handleLikes() {
    if (this.isLiked()) {
      this._likeButton.classList.add('button-like_active');
    } else {
      this._likeButton.classList.remove('button-like_active');
    }
  }

  likeCounter() {
    this._likeCounter.textContent = this._likes.length;
  }

  setLikeCount(data) {
    this._likes = data.likes;
    this.likeCounter();
    this._handleLikes();
  }

  _handleDeleteCard() {
    if (this._ownerId !== this._userId) {
      this._deleteCard.classList.add('element__button-delete_hidden')
    }
  }

  cardDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this.handleLikeClick(this);
    });
    
    this._deleteCard.addEventListener('click', () => {
      this.handleDeleteIconClick(this);
    });
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._name, this._link);
    });
}
}


  //this._deleteCard.classList.add(this._userId === this._cardOwnerId ? 'element__button-delete_visible' : 'element__button-delete_hidden');
   /*i_hasDeleteButton() {
    this._deleteCard.classList.add(this._userId === this._cardOwnerId ? 'element__button-delete_visible' : 'element__button-delete_hidden');
   if (this._userId === this._cardOwnerId) {
      this._deleteCard.classList.add('element__button-delete_visible');
    } else {
      this._deleteCard.classList.add('element__button-delete_hidden');
    }
  }*/
  /*handleLikeCard = () => {
    this._likeButton.classList.toggle('element__button-like_active');
  }*/
  /*_handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  }*/

    /*_toggleLike() {
    if (this.howLikes) {
      this.onLike();
    } else {
      this.offLike();
    }
  }
  

  onLike() {
    this._buttonLike.classList.add('button-like_active');
  }

  offLike() {
    this._buttonLike.classList.remove('button-like_active');
  }

  counterLikes(likesLength) {
    this._likeCounter.textContent = likesLength;
  }*/

  /*_toggleDelCard() {
    if (this._userId !== this._owner._id) {
      this._deleteCard.classList.add('element__button-delete_hidden');
    } else {
      this._deleteCard.classList.remove('element__button-delete_hidden');
    }
  }*/

  /*getCardId() {
    return this._id;
  }*/

  /*howLikes(like) {
    return this._likes.some((like) => like._id === this._userId);
  }*/