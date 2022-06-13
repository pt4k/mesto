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
    this._handleDeleteIconClick = handleDeleteIconClick.bind(this);
    this._handleLikeClick = handleLikeClick.bind(this);
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

  getCardId() {
    return this._id;
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  _handleLikes() {
    if (this.isLiked()) {
      this._likeButton.classList.add('.button-like_active');
    } else {
      this._likeButton.classList.remove('.button-like_active');
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
      this._handleLikeClick(this);
    });
    
    this._deleteCard.addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
}
}