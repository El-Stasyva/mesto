let popup = document.querySelector('.popup'); 

// Находим форму в DOM 
let formElement = document.querySelector('.popup__container'); 

// Находим поля формы в DOM 
let nameInput = formElement.querySelector('#name'); 
let jobInput = formElement.querySelector('#job'); 

let popupCloseIcon = formElement.querySelector('.popup__close-ikon'); 

let profile = document.querySelector('.profile'); 
let editButton = profile.querySelector('.profile__edit-button'); 

let profileName = profile.querySelector('.profile__name'); 
let profileJob = profile.querySelector('.profile__about-me'); 

// Кликаем на карандаш для перехода в попап 
editButton.addEventListener('click', function() { 
  popup.classList.add('popup_opened'); 
  nameInput.value = profileName.textContent; 
  jobInput.value = profileJob.textContent; 
})

function popupClose() { 
  popup.classList.remove('popup_opened'); 
} 

 

// Обработчик «отправки» формы, хотя пока 
// она никуда отправляться не будет 
function handleFormSubmit (evt) { 
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 

                                                // Так мы можем определить свою логику отправки. 

                                                // О том, как это делать, расскажем позже. 

    // Получите значение полей jobInput и nameInput из свойства value 

    // Выберите элементы, куда должны быть вставлены значения полей 
    profileName.textContent = nameInput.value; 
    profileJob.textContent = jobInput.value; 

    // Вставьте новые значения с помощью textContent
    popupClose();
} 

// Прикрепляем обработчик к форме: 
// он будет следить за событием “submit” - «отправка» 
formElement.addEventListener('submit', handleFormSubmit); 

// Нажатие крестика для для выхода из формы попапа без отправки значений
popupCloseIcon.addEventListener('click', popupClose); 