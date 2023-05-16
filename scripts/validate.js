// параметры, используемые в валидации
const validationTools = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  spanErrorSelector: '.popup__error',
  activeButtonClass: 'popup__button_enable',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error', // модификатор для input - переключение состояния полей (валидное/не валидное)
  errorClass: 'popup__error_visible'  // модификатор для span - показать/скрыть ошибку
};


// ф-я запускает валидацию
const enableValidation = (validationTools) => {

  // задаем переменную-массив из всех элементов с классом popup__form
  const formList = Array.from(document.querySelectorAll(validationTools.formSelector));
  
  // Обойдем массив в теле функции методом forEach
  formList.forEach((formElement) => {

    formElement.addEventListener('submit', (evt) => {
      // Отменить стандартное поведение в обработчике submit
      evt.preventDefault();
    
    });

    setEventListeners(formElement, validationTools);
    
  });
}



// ф-я для настройки всех полей input
const setEventListeners = (formElement, validationTools) => {

  // задаем переменную-массив из всех элементов с классом popup__input и кнопку
  const inputList = Array.from(formElement.querySelectorAll(validationTools.inputSelector));
  const buttonElement = formElement.querySelector(validationTools.submitButtonSelector);

  // проверка состояния кнопки при первой загрузке страницы.
  // Тогда кнопка перестанет быть активной до ввода данных в одно из полей.
  toggleButtonState(inputList, buttonElement, validationTools);
  
  // Обойдем массив в теле функции методом forEach, передав ему обработчик с параметром inputElement
  inputList.forEach((inputElement) => {

    // Добавим обработчик события input каждому элементу массива
    inputElement.addEventListener('input', () => {
     
      // Передаем методу addEventListener вторым аргументом обработчик, который проверяет валидность поля
      checkInputValidity(formElement, inputElement, validationTools);
    });

      // проверка состояния кнопки при изменении любого из полей
  toggleButtonState(inputList, buttonElement, validationTools);
  });
    
}



// ф-я проверяет элементы на корректность введённых данных и вызывает hideInputError или showInputError
const checkInputValidity = (formElement, inputElement, validationTools) => {
  
  if (!inputElement.validity.valid) { // true - поле ввода корректное, false - поле ввода некоректное

    //Если в поле введены невалидные данные, то вызываем ф-ю показать ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, validationTools);   //  вторым аргументом передаем функции showError сообщение об ошибке в случае неудачной проверки
  } else {

    //Если в поле введены валидные данные, то вызываем ф-ю спрятать ошибку
    hideInputError(formElement, inputElement, validationTools);
  }
  
};



// ф-я покажет ошибку и подчеркнет поле input красным
const showInputError = (formElement, inputElement, errorMessage, validationTools) => {

  // Значение переменной errorElement — ошибка, которая найдена внутри formElement
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationTools.inputErrorClass);
  
  // передать текст ошибки в нужное место
  errorElement.textContent = errorMessage;

  // сделать ошибку видимой, когда в поле ввода добавят некорректный текст
  errorElement.classList.add(validationTools.errorClass);
};



// ф-я спрячет ошибку
const hideInputError = (formElement, inputElement, validationTools) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
 
  inputElement.classList.remove(validationTools.inputErrorClass);
  
  // Скрыть ошибку под полем input
  errorElement.classList.remove(validationTools.errorClass);
  // Присвоим свойству textContent пустую строку, чтобы очистить текстовое содержимое элемента errorElement
  errorElement.textContent = '';
};






  // ф-я невалидного ввода. она обходит массив полей и отвечает на вопрос:
  // «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?»
  const hasInvalidInput = (inputList) => {

    // Функция возвращает true, если в массиве inputList есть хотя бы один невалидный input.
    // Если все поля валидны — false
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
      
    });
    
  }
  

  const disableButton = (buttonElement, validationTools) => {
    // отключить активность кнопки - добавим класс блокировки кнопки
    buttonElement.classList.add(validationTools.inactiveButtonClass);
    
    // и добавим атрибут disabled
    buttonElement.setAttribute('disabled', true);
  }
  
  const enableButton = (buttonElement, validationTools) => {
 
    // включить кнопку - удалим класс блокировки кнопки
    buttonElement.classList.remove(validationTools.inactiveButtonClass);
    
    // и удалим атрибут disabled
    buttonElement.removeAttribute('disabled');
  }
  

  // ф-я отвечает за блокировку кнопки «Отправить»
  // Первый параметр — массив полей, второй — кнопка «submit» у попапов
  const toggleButtonState = (inputList, buttonElement, validationTools) => {
    
    // проверим есть ли в массиве inputList невалидные поля
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, validationTools);
    } else {
      enableButton(buttonElement, validationTools);
    }
  }
  
  enableValidation(validationTools);