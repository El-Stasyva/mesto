const validationTools = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  /*spanSelector: '.popup__input-error',*/
  inactiveButtonClass: 'popup__button_disabled',
  activeButtonClass: 'popup__button_enabled',
  inputErrorClass: `.${inputElement.id}-error`, /*'popup__input_type_error'*/ // ??? переменная spanSelector или другая????  // `.${formInput.id}-error` - шаблонные строки
  errorClass: 'popup__input-error_visible'
};








// ф-я покажет ошибку
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  // Значение переменной errorElement — ошибка, которая найдена внутри formElement
  const errorElement = formElement.querySelector(inputErrorClass);
  inputElement.classList.add(inputErrorClass);
  // передать текст ошибки в нужное место
  errorElement.textContent = errorMessage;
  // сделать ошибку видимой, когда в поле ввода добавят некорректный текст
  errorElement.classList.add(errorClass);
};

// ф-я спрячет ошибку
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(inputErrorClass);
  inputElement.classList.remove(inputErrorClass);
  // Скрыть ошибку под полем input
  errorElement.classList.remove(errorClass);
  // Присвоим свойству textContent пустую строку, чтобы очистить текстовое содержимое элемента errorElement
  errorElement.textContent = '';
};


// ф-я проверяет элементы на корректность введённых данных и вызывает hideInputError или showInputError
const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  formElement.querySelector(inputErrorClass);
  if (!formInput.validity.valid) {
    //Если в поле введены невалидные данные, то вызываем ф-ю показать ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);   //  вторым аргументом передаем функции showError сообщение об ошибке в случае неудачной проверки
  } else {
    //Если в поле введены валидные данные, то вызываем ф-ю спрятать ошибку
    hideInputError(formElement, inputElement);
  }
};



// ф-я для настройки всех полей input
const setEventListeners = (formElement, inputSelector, submitButtonSelector) => {
  // задаем переменную-массив из всех элементов с классом popup__input
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  const buttonElement = formElement.querySelector(submitButtonSelector);

  // проверка состояния кнопки при первой загрузке страницы.
  // Тогда кнопка перестанет быть активной до ввода данных в одно из полей.
  toggleButtonState(inputList, buttonElement);

  // Обойдем массив в теле функции методом forEach, передав ему обработчик с параметром inputElement
  inputList.forEach((inputElement) => {
    // Добавим обработчик события input каждому элементу массива
    inputElement.addEventListener('input', function () {
      // Передаем методу addEventListener вторым аргументом обработчик, который проверяет валидность поля
      checkInputValidity(formElement, inputElement);
      });

      // проверка состояния кнопки при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  }


  // ф-я активации валидации
  const enableValidation = (formSelector) => {
    // задаем переменную-массив из всех элементов с классом popup__form
    const formList = Array.from(document.querySelectorAll(formSelector));
    // Обойдем массив в теле функции методом forEach
    formList.forEach((formElement) => {

    formElement.addEventListener('submit', (evt) => {
      // Отменить стандартное поведение в обработчике submit
      evt.preventDefault();
    });
  
      setEventListeners(formElement);
  });
  }


  // ф-я невалидного ввода. она обходит массив полей и отвечает на вопрос:
  // «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?»
  const hasInvalidInput = (inputList) => {
  // Функция возвращает true, если в массиве inputList есть хотя бы один невалидный input.
  // Если все поля валидны — false
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


// ф-я отвечает за блокировку кнопки «Отправить»
// Первый параметр — массив полей, второй — кнопка «submit» у попапов
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // проверим есть ли в массиве inputList невалидные поля
  if (hasInvalidInput(inputList)) {
    // если да - добавим класс блокировки кнопки
    buttonElement.classList.add(inactiveButtonClass);
    // и удалим атрибут disabled
    buttonElement.removeAttribute('disabled');
  } else {
    // иначе - удалим класс блокировки кнопки
    buttonElement.classList.remove(inactiveButtonClass);
    // и дабавим атрибут disabled
    buttonElement.setAttribute('disabled', true);
  }
}

enableValidation();