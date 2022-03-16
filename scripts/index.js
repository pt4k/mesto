const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const ESC_KEY = 'Escape';

function openPopup() {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', onDocementKeyUp);
};

function closePopup() {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocementKeyUp);
};

function onDocementKeyUp(event){
    if(event.key === ESC_KEY) {
        closePopup();
    }
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

let profileInfo = document.querySelector('section.profile .profile__info');
let profileName = profileInfo.querySelector('.profile__title');
let profileJob = profileInfo.querySelector('.profile__text');

let formElement = document.querySelector('div.popup div.popup__window .popup__form');
let nameInput = formElement.querySelector('.popup__input_el_first-name');
let jobInput = formElement.querySelector('.popup__input_el_about');


function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);