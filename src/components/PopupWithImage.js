import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);

        this._titleViewCard = this._popup.querySelector('.popup__title_view-card');
        this._viewCard = this._popup.querySelector('.popup__img_view-card');
    }

    open (imgInfo) {
        super.open();

        this._titleViewCard.textContent = imgInfo.name;
        this._viewCard.src = imgInfo.link;
        this._viewCard.alt = imgInfo.name;
    }
}