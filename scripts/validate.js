//функция которая показывает ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };

//функция скрывает ошибку 
const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);

    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  };

//функция которая проверяет валидна ли форма
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
//если поле не валидно, показывает ошибку
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
//иначе ошибка скрыта
      hideInputError(formElement, inputElement);
    };
  };

//функция которая проверяет валидны ли инпуты
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {

      // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция. hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add('popup__save-button_inactive');
      buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove('popup__save-button_inactive');
      buttonElement.disabled = false;
    };
  };

 const setEventListeners = (formElement) => {
    // Находим все поля внутри формы, и делаем из них массив
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector('.popup__save-button');

    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement);
  
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        isValid(formElement, inputElement);

        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM, сделаем из них массив
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменяем стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  
  // Вызовем функцию
  enableValidation();

// функции закрятия попапов по клику и нажатия по esc
  const closePopupKey = (evt) => {
    const openPopup = document.querySelector('.popup_opened');

    if (evt.key === 'Escape'){
      closePopup(openPopup);
    };
  };

  const closePopupClick = (evt) => {
    const openPopup = document.querySelector('.popup_opened');

    if (evt.target.classList.contains('popup')) {
        closePopup(openPopup);
    };
  };

document.addEventListener('click', closePopupClick);
document.addEventListener('keydown', closePopupKey);