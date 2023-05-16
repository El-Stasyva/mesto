/*import { toggleButtonState }  from "./validate.js";*/
/*import { inputList }  from "./validate.js";
import { buttonElement }  from "./validate.js";
import { validationTools }  from "./validate.js";*/

// Переменные для работы с карточками в галерее фотографий
const cardTemplate = document.querySelector('#card-template');
const photoGallerySection = document.querySelector('.photo-gallery');

// Переменные для работы с кнопками на главной странице ("редактировать профиль" и "добавить карточку с местом")
const profile = document.querySelector('.profile');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Попап редактирования профиля
const popupInfo = document.querySelector('#popup-info');
const infoElement = popupInfo.querySelector('#f-info');

const nameInput = infoElement.querySelector('#name');
const jobInput = infoElement.querySelector('#about-me');

// Попап добавления карточки с местом
const popupCard = document.querySelector('#popup-card');
const cardElement = document.querySelector('#f-card');
const titleInput = cardElement.querySelector('#card-title');
const linkInput = cardElement.querySelector('#card-link');
const popupCreateCardBtn = document.querySelector('#create-btn');

// Попап увеличения одной фотографии места из галереи
const popupImageContainer = document.querySelector('#popup-image');
const popupBigImg = popupImageContainer.querySelector('.popup-picture__image');
const popupTitleImg = popupImageContainer.querySelector('.popup-picture__title');

// Кнопки закрытия попапов
const popupImgExit = document.querySelector('#img-exit');
const popupInfoCloseButton = document.querySelector('#close-info');
const popupCardCloseButton = document.querySelector('#close-card');

// Переменные для работы с данными в профиле пользователя на главной странице
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__about-me');

const popups = document.querySelectorAll('.popup');


// Добавление 6 карточек при загрузке страницы c помощью JS (функция рендера)
const getCardElement = function (cardInfo) {
  const itemCardElement = cardTemplate.content.querySelector('.photo-gallery__item').cloneNode(true);

  const cardImage = itemCardElement.querySelector('.photo-gallery__image');
  const cardHeading = itemCardElement.querySelector('.photo-gallery__heading');
  const cardDeleteButton = itemCardElement.querySelector('.photo-gallery__trash');
  const cardLikeButton = itemCardElement.querySelector('.photo-gallery__like');

// Задаем какие необходимы параметры значений карточек из массива для дальнейшей вставки
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardHeading.textContent = cardInfo.name;


// Удаляем карточку с местом из галереи фотографий
  const handleDeleteCard = function () {
    itemCardElement.remove();
  };


// Нажимаем кнопку "like" для активации или дизактивации сердечка
  const handleLikeCard = function () {
    cardLikeButton.classList.toggle('photo-gallery__like_active');
  };


  //Функция увеличения одной фотографии из галереи
  const handleBigImg = function () {
    openPopup(popupImageContainer);
    popupBigImg.src = cardInfo.link;
    popupBigImg.alt = cardInfo.name;
    popupTitleImg.textContent = cardInfo.name;
  }
  
// Вешаем слушатели кнопок
  cardImage.addEventListener('click', handleBigImg);
  cardDeleteButton.addEventListener('click', handleDeleteCard);
  cardLikeButton.addEventListener('click', handleLikeCard);
  
  return itemCardElement;
};


// Вставляем значения из карточек массива в галерею фотографий
initialCards.forEach(function (card) {
  const element = getCardElement(card);

  photoGallerySection.append(element);
  
});

// Событие закрытия попапов
popupImgExit.addEventListener('click', function () {
  closePopup(popupImageContainer);
});


// Кликаем на карандаш для перехода в попап редактирования профиля
editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
 
  openPopup(popupInfo);
  
});


// Кликаем на кнопку-плюсик для перехода в попап добавления новой карточки с местом
addButton.addEventListener('click', function() {
  openPopup(popupCard);
  
 });


 const handlePopupClose = (evt) => {
  const popupOverlay = evt.target.classList.contains('popup'); 

  if (popupOverlay) {
    popups.forEach(closePopup);
  }
}; 


 function pressKeyEsc (evt) {
  if (evt.key === 'Escape') {
    popups.forEach(closePopup);
  }
}


// Функция закрытия попапа
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressKeyEsc);
  document.removeEventListener('mousedown', handlePopupClose);
}

// Функция открытия попапа
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressKeyEsc);
  document.addEventListener('mousedown', handlePopupClose);
}


// Обработчики кнопок закрытия попапов с формами отправки данных
popupCardCloseButton.addEventListener('click', function () {
  closePopup(popupCard);
});

popupInfoCloseButton.addEventListener('click', function () {
  closePopup(popupInfo);
});


// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleInfoSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupInfo);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
infoElement.addEventListener('submit', handleInfoSubmit);


//Создаем новую карточку
function handleSaveCard (evt) {
  evt.preventDefault();

  const name = titleInput.value;
  const link = linkInput.value;

  // Добавить карточку в начало массива
  photoGallerySection.prepend(getCardElement({name, link}));

// Отчистить форму попапа после отправки
  evt.target.reset();
  // Добавить манипуляции с кнопкой "Создать" для дизактивации при незаполненных полях
  // директивы import и export еще не проходили
  popupCreateCardBtn.classList.add('popup__button_disabled');  
  popupCreateCardBtn.setAttribute('disabled', true);
  closePopup(popupCard);
};

// Обработчик «отправки» формы попапа с добавлением карточки места
cardElement.addEventListener('submit', handleSaveCard);
