const popupView = document.querySelector('.popup_view_card');
const viewCard = popupView.querySelector('.popup__img_view-card');
const titleViewCard = popupView.querySelector('.popup__title_view-card');

function openPopup (currentPopup) {
  currentPopup.classList.toggle('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

function closePopup (currentPopup) {
  currentPopup.classList.toggle('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

// функции закрятия попапов по клику и нажатия по esc
function closeByEsc (evt) {
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

export { popupView, closePopup, viewCard, titleViewCard, openPopup };