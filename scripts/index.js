let editButton = document.querySelector('.profile__edit-button');

// Кликаем на карандаш для перехода в попап
editButton.addEventListener('click', function() {
  let popup = document.querySelector('.popup');
  popup.classList.add('popup_opened');

  console.log(popup.classList);
})

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    console.log(nameInput.setAttribute('value', 'Жак-Ив Кусто'));                                            
    console.log(jobInput.setAttribute('value', 'Исследователь океана'));
    // Получите значение полей jobInput и nameInput из свойства value

    let profile = document.querySelector('.profile');
    let profileName = profile.querySelector('.profile__name');
    let profileJob = profile.querySelector('.profile__about-me');
    // Выберите элементы, куда должны быть вставлены значения полей

    /*console.log(profileName.textContent);
    console.log(profileJob.textContent);*/

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

let popupButton = formElement.querySelector('.popup__button');

// Нажатие кнопки Сохранить в форме попапа
popupButton.addEventListener('click', function() {
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');

  console.log(popup.classList);
})

let popupCloseIcon = formElement.querySelector('.popup__close-ikon');

// Нажатие крестика для для выхода из формы попапа без отправки значений
popupCloseIcon.addEventListener('click', function() {
  let popup = document.querySelector('.popup');

  popup.classList.remove('popup_opened');
  
  console.log(popup.classList);
})