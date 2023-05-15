



// ф-я покажет ошибку и подчеркнет поле input красным
const showInputError = (formElement, inputElement, errorMessage, tools) => {
  // Значение переменной errorElement — ошибка, которая найдена внутри formElement
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(tools.inputErrorClass);
  // передать текст ошибки в нужное место
  errorElement.textContent = errorMessage;
  // сделать ошибку видимой, когда в поле ввода добавят некорректный текст
  errorElement.classList.add(tools.errorClass);
  
};



// ф-я спрячет ошибку
const hideInputError = (formElement, inputElement, tools) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(tools.inputErrorClass);
  // Скрыть ошибку под полем input
  errorElement.classList.remove(tools.errorClass);
  // Присвоим свойству textContent пустую строку, чтобы очистить текстовое содержимое элемента errorElement
  errorElement.textContent = '';
  
};



// ф-я проверяет элементы на корректность введённых данных и вызывает hideInputError или showInputError
const checkInputValidity = (formElement, inputElement, tools) => {
  // formElement.querySelector(inputErrorClass);  // ???????
  if (!inputElement.validity.valid) {
    //Если в поле введены невалидные данные, то вызываем ф-ю показать ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, tools);   //  вторым аргументом передаем функции showError сообщение об ошибке в случае неудачной проверки
  } else {
    //Если в поле введены валидные данные, то вызываем ф-ю спрятать ошибку
    hideInputError(formElement, inputElement, tools);
  }
  
};



// ф-я для настройки всех полей input
const setEventListeners = (formElement, tools) => {
  // задаем переменную-массив из всех элементов с классом popup__input
  const inputList = Array.from(formElement.querySelectorAll(tools.inputSelector));

  const buttonElement = formElement.querySelector(tools.submitButtonSelector);

  // проверка состояния кнопки при первой загрузке страницы.
  // Тогда кнопка перестанет быть активной до ввода данных в одно из полей.
  toggleButtonState(inputList, buttonElement, tools);

  // Обойдем массив в теле функции методом forEach, передав ему обработчик с параметром inputElement
  inputList.forEach((inputElement) => {
    // Добавим обработчик события input каждому элементу массива
    inputElement.addEventListener('input', () => {
      // Передаем методу addEventListener вторым аргументом обработчик, который проверяет валидность поля
      checkInputValidity(formElement, inputElement, tools);
      });

      // проверка состояния кнопки при изменении любого из полей
      toggleButtonState(inputList, buttonElement, tools);
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
  const toggleButtonState = (inputList, tools) => {
    // проверим есть ли в массиве inputList невалидные поля
    if (hasInvalidInput(inputList)) {
      // если да - добавим класс блокировки кнопки
      buttonElement.classList.add(tools.inactiveButtonClass);
      // и удалим атрибут disabled
      buttonElement.removeAttribute('disabled', true);
    } else {
      // иначе - удалим класс блокировки кнопки
      buttonElement.classList.remove(tools.inactiveButtonClass);
      // и дабавим атрибут disabled
      buttonElement.setAttribute('disabled', true);
    }
  }

  // ф-я активации валидации
  const enableValidation = (tools) => {
    console.log(formSelector);
    // задаем переменную-массив из всех элементов с классом popup__form
    const formList = Array.from(document.querySelectorAll(tools.formSelector));
    console.log(formSelector);
    // Обойдем массив в теле функции методом forEach
    formList.forEach((formElement) => {

    formElement.addEventListener('submit', (evt) => {
      // Отменить стандартное поведение в обработчике submit
      evt.preventDefault();
      
    });
  
      setEventListeners(formElement, tools);
      
  });
  }
  
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error', // модификатор для input - переключение состояния полей (валидное/не валидное)
    errorClass: 'popup__input-error_visible'  // модификатор для span - показать/скрыть ошибку
  });
 
 

/*enableValidation();*/