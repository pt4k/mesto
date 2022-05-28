export default class FormValidator {
    constructor(config, formElement) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._formSelector = config.formSelector;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }

    enableValidation () {

      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      })

      this._setEventListeners(this._formElement);
    }

    disableButton() {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
    };

    enableButton() {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }

    resetFormValidation() {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
        this.disableButton();
      })
    }

    //метод которая показывает ошибку
    _showInputError = (inputElement, errorMessage) => {
      // Находим элемент ошибки внутри самой функции
      const errorElement = this._formElement.querySelector(`.${inputElement.name}-input-error`);

      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    };
    
    //метод скрывает ошибку 
    _hideInputError = (inputElement) => {
        // Находим элемент ошибки
      const errorElement = this._formElement.querySelector(`.${inputElement.name}-input-error`);
      
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    };
    
    //метод которая проверяет валидна ли форма
    _isValid = (inputElement) => {
      if (!inputElement.validity.valid) {
        //если поле не валидно, показывает ошибку
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        //иначе ошибка скрыта
        this._hideInputError(inputElement);
      };
    };
    
    //метож которая проверяет валидны ли инпуты
    _hasInvalidInput = () => {
      // проходим по этому массиву методом some
      return this._inputList.some((inputElement) => {
        
        // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся функция. hasInvalidInput вернёт true
        return !inputElement.validity.valid;
      });
    };
    
    // метод принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
    _toggleButtonState = () => {
      // Если есть хотя бы один невалидный инпут
      if (this._hasInvalidInput()) {
        // сделай кнопку неактивной
        this.disableButton();
      } else {
        // иначе сделай кнопку активной
        this.enableButton();
      };
    };
    
    _setEventListeners = () => {
      // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
      this._toggleButtonState();
      
      // Обойдём все элементы полученной коллекции
      this._inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
          // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
          this._isValid(inputElement);
          // Вызовем toggleButtonState и передадим ей массив полей и кнопку
          this._toggleButtonState();
        });
      });
    };
  };