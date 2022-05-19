import { openPopup, popupView, titleViewCard, viewCard } from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
    this._setEventListeners();
  
    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
  
    return this._element;
  }


  _setEventListeners() {
    this._element.querySelector('.element__button-like').addEventListener('click', this._handleLikeCard);
    
    this._element.querySelector('.element__button-delete').addEventListener('click', this._handleDeleteCard);
    this._element.querySelector('.element__img').addEventListener('click', this._handleOpenCard);
}
  
  _handleLikeCard = () => {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }

  _handleDeleteCard = () => {
    this._element.remove();
  }


  _handleOpenCard = () => {

    titleViewCard.textContent = this._name;
    viewCard.src = this._link;
    viewCard.alt = this._name;

    openPopup(popupView);
  }
}
