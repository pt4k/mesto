import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ handleProfileFormSubmit }, popupSelector) {
        super(popupSelector);
        this._handleProfileFormSubmit = handleProfileFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        
        this._inputValues = {};

        this._inputList.forEach((input) => {
            this._inputValues[input.name] = input.value;

        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleProfileFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}