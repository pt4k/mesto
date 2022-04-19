const enableValidation = (settings) => {

//функция которая показывает ошибку
const showInputError = ({ formElement, inputElement, errorMessage }) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };

//функция скрывает ошибку 
const hideInputError = ({ formElement, inputElement }) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);

    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

//функция которая проверяет валидна ли форма
const isValid = ({ formElement, inputElement }) => {
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
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    };
  };

 const setEventListeners = ({ formElement }) => {
    // Находим все поля внутри формы, и делаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

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

  
    // Найдём все формы с указанным классом в DOM, сделаем из них массив
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
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

enableValidation(validationConfig);