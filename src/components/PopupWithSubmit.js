import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
    constructor({ handleProfileFormSubmit }, popup) {
        super(popup);
        this._handleProfileFormSubmit = handleProfileFormSubmit;
        
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__save-button');
        this._submitButtonValue = this._submitButton.textContent;
        console.log(this._form)
    }

    open(data) {
        super.open();
        this._data = data;
    }

    close() {
        super.close();
        this._form
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleProfileFormSubmit();
        });
    }

    renderLoading(isLoad) {
        if (isLoad) {
            this._saveButton.textContent = 'Удаление...'
        } else {
            this._saveButton.textContent = this._saveButtonValue;
        }
    }
}