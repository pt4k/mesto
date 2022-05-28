export default class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._setEventListeners();
  
    this._element.querySelector('.element__text').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  
    return this._element;
  }


  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeCard);
    
    this._element.querySelector('.element__button-delete').addEventListener('click', this._handleDeleteCard);
    this._cardImage.addEventListener('click', this._handleCardClick);
}
  
  _handleLikeCard = () => {
    this._likeButton.classList.toggle('element__button-like_active');
  }

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  }
}