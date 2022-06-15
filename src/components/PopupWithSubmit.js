import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
    constructor({ handleProfileFormSubmit }, popup) {
        super(popup);
        this._handleProfileFormSubmit = handleProfileFormSubmit;
        
        this._form = this._popup.querySelector('.popup__form');
        this._saveButton = this._popup.querySelector('.popup__save-button');
        this._saveButtonValue = this._saveButton.textContent;
    }

    open(data) {
        this._data = data;
        super.open();
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleProfileFormSubmit(this._data);
        });
    }

    renderLoading(isLoad) {
        if (isLoad) {
            this._saveButton.textContent = 'Удаление...';
        } else {
            this._saveButton.textContent = this._saveButtonValue;
        }
    }
}