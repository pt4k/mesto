import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ handleProfileFormSubmit }, popup) {
        super(popup);
        this._handleProfileFormSubmit = handleProfileFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('.popup__form');
        this._saveButton = this._popup.querySelector('.popup__save-button');
        this._saveButtonValue = this._saveButton.textContent;
        
    }

    _getInputValues() {
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

    renderLoading(isLoad) {
        if (isLoad) {
            this._saveButton.textContent = 'Сохранение...'
        } else {
            this._saveButton.textContent = this._saveButtonValue;
        }
    }
}