// Переменные для работы с карточками в галерее фотографий
const cardTemplate = document.querySelector('#card-template');
const photoGallerySection = document.querySelector('.photo-gallery');

const cardImage = document.querySelector('.photo-gallery__image');
const cardHeading = document.querySelector('.photo-gallery__heading');

// Переменные для работы с кнопками на главной странице ("редактировать профиль" и "добавить карточку с местом")
const profile = document.querySelector('.profile');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


// Переменные для работы с попапами и кнопками попапов
const popup = document.querySelector('.popup');
const saveCardButton = document.querySelector('#save-button');

// Попап редактирования профиля
const popupInfo = document.querySelector('#popup-info');
const infoElement = popupInfo.querySelector('#c-info');

const nameInput = infoElement.querySelector('#name');
const jobInput = infoElement.querySelector('#job');

// Попап добавления карточки с местом
const popupCard = document.querySelector('#popup-card');
const cardElement = document.querySelector('#c-card');
const titleInput = cardElement.querySelector('#card-title');
const linkInput = cardElement.querySelector('#card-link');

// Переменные для работы с данными в профиле пользователя на главной странице
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__about-me');


// Добавление 6 карточек при загрузке страницы c помощью JS (функция рендера)
const getCardElement = function (cardInfo) {
  const itemCardElement = cardTemplate.content.querySelector('.photo-gallery__item').cloneNode(true);

  const cardImage = itemCardElement.querySelector('.photo-gallery__image');
  const cardHeading = itemCardElement.querySelector('.photo-gallery__heading');
  const cardDeleteButton = itemCardElement.querySelector('.photo-gallery__trash');
  const cardLikeButton = itemCardElement.querySelector('.photo-gallery__like');

  const popupImageContainer = document.querySelector('#p-popup');

  const popupBigImg = popupImageContainer.querySelector('.popup-picture__image');
  const popupTitleImg = popupImageContainer.querySelector('.popup-picture__title');

  const popupImgExit = document.querySelector('#img-exit');

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
  const handleBigImg = function() {
    popupImageContainer.classList.add('popup_opened');
    popupBigImg.src = cardInfo.link;
    popupBigImg.alt = cardInfo.name;
    popupTitleImg.textContent = cardInfo.name;
    
  }
  
  //Закрытие попапа с увеличенной фотографией
  const popupImgClose = function (popupImageContainer) {
    popupImageContainer.classList.remove('popup_opened');
  }

  
// Вешаем слушатели кнопок
   popupImgExit.addEventListener('click', function () {
    popupImgClose(popupImageContainer);
  });

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



// Кликаем на карандаш для перехода в попап редактирования профиля
editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupOpen(popupInfo);
});


// Кликаем на кнопку-плюсик для перехода в попап добавления новой карточки с местом
addButton.addEventListener('click', function() {
   popupOpen(popupCard);
 });


// Функция закрытия попапа
const popupClose = function (popup) {
  popup.classList.remove('popup_opened');
}

// Функция открытия попапа
const popupOpen = function (popup) {
  popup.classList.add('popup_opened');

  const popupCloseButton = popup.querySelector('.popup__close-ikon');

  popupCloseButton.addEventListener('click', function () {
    popupClose(popup)});
}



// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleInfoSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.contains('popup_opened');
  popupClose(popup);
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

  popupClose(popupCard);
};


// Обработчик «отправки» формы попапа с добавлением карточки места
cardElement.addEventListener('submit', handleSaveCard);


