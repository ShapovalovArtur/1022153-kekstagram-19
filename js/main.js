'use strict';

var ESC_KEY = 'Escape';
var COMMENTS_MIN = 2;
var COMMENTS_MAX = 6;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var URL_NAME_MIN = 1;
var URL_NAME_MAX = 25;
var AVATAR_NAME_MIN = 1;
var AVATAR_NAME_MAX = 6;
var PHOTOS_NUMBER = 25;
var NAMES = ['Андрей', 'Артем', 'Александр', 'Антон', 'Анатолий'];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Какой чудесный день!',
  'Какой чудесный пень!',
  'Какой чудесный я!',
  'И песенка моя!',
  'Потрясающе!',
  'Отвратительно!'
];

var EFFECT_NAMES = ['chrome', 'sepia', 'marvin', 'phobos', 'heat'];
var EFFECT_FILTERS = ['grayscale', 'sepia', 'invert', 'blur', 'brightness'];
var EFFECT_RATIOS = [0.01, 0.01, 1, 0.03, 0.03];

var photos = [];

var getRandomNumber = function (minValue, maxValue) {
  return Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
};

var makeAvatar = function () {
  return 'img/avatar-' + getRandomNumber(AVATAR_NAME_MIN, AVATAR_NAME_MAX) + '.svg';
};

var makeUrl = function () {
  return 'photos/' + getRandomNumber(URL_NAME_MIN, URL_NAME_MAX) + '.jpg';
};

var getCommentName = function () {
  return NAMES[(getRandomNumber(0, NAMES.length - 1))];
};

var getMessage = function () {
  return MESSAGES[(getRandomNumber(0, MESSAGES.length - 1))];
};

var createComments = function () {
  var commentsNumber = getRandomNumber(COMMENTS_MIN, COMMENTS_MAX);
  var comments = [];
  for (var i = 0; i < commentsNumber; i++) {
    comments[i] = {
      avatar: makeAvatar(),
      message: getMessage(),
      name: getCommentName()
    };
  }
  return comments;
};

var createPhoto = function () {
  var photo = {
    url: makeUrl(),
    description: DESCRIPTIONS[(getRandomNumber(0, DESCRIPTIONS.length - 1))],
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments: createComments()
  };
  return photo;
};

var createPhotos = function () {
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    photos.push(createPhoto());
  }
  return photos;
};

var picturesArr = createPhotos();
var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function (i) {
  var picture = pictureTemplate.cloneNode(true);
  var pictureImg = picture.querySelector('.picture__img');
  var pictureLikes = picture.querySelector('.picture__likes');
  var pictureComments = picture.querySelector('.picture__comments');
  pictureImg.src = picturesArr[i].url;
  pictureLikes.textContent = picturesArr[i].likes;
  pictureComments.textContent = picturesArr[i].comments.length;
  return picture;
};

for (var i = 0; i < picturesArr.length; i++) {
  picturesList.appendChild(renderPicture(i));
}

var uploadOpen = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadClose = uploadOverlay.querySelector('.img-upload__cancel');
var effectPin = uploadOverlay.querySelector('.effect-level__pin');
var effectPinValue = uploadOverlay.querySelector('.effect-level__value');
var body = document.querySelector('body');
var uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
var effectsList = uploadOverlay.querySelector('.effects__list');
var currentEffect = '';
var sliderBar = uploadOverlay.querySelector('.img-upload__effect-level');
var hashtags = [];
var hashtagsInput = uploadOverlay.querySelector('.text__hashtags');

var popupEscHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', popupEscHandler);
  body.classList.add('modal-open');
  sliderBar.style.display = 'none';
};

var closePopup = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', popupEscHandler);
  uploadOpen.value = null;
  body.classList.remove('modal-open');
};

var filterChangeHandler = function (evt) {
  uploadPreview.style.filter = '';
  uploadPreview.classList.remove('effects__preview--' + currentEffect);
  currentEffect = evt.target.value;
  uploadPreview.classList.add('effects__preview--' + currentEffect);
  sliderBar.style.display = '';
  if (currentEffect === 'none') {
    sliderBar.style.display = 'none';
  }
};

var getEffect = function () {
  for (var j = 0; j < 5; j++) {
    if (EFFECT_NAMES[j] === currentEffect) {
      var currentEffectValue = EFFECT_FILTERS[j] + '(' + EFFECT_RATIOS[j] * effectPinValue + ')';
      if (j === 2) {
        currentEffectValue = EFFECT_FILTERS[j] + '(' + EFFECT_RATIOS[j] * effectPinValue + '%' + ')';
      }
      if (j === 3) {
        currentEffectValue = EFFECT_FILTERS[j] + '(' + EFFECT_RATIOS[j] * effectPinValue + 'px' + ')';
      }
    }
  }
  uploadPreview.style.filter = currentEffectValue;
};

var effectChangeHandler = function () {
  effectPinValue = getRandomNumber(0, 100);
  getEffect(effectPinValue);
};

var checkHashtag = function (str) {
  var reg = /#[\w\dА-я]+$/;
  return reg.test(str);
};


uploadOpen.addEventListener('change', function () {
  openPopup();
});

uploadClose.addEventListener('click', function () {
  closePopup();
});

effectsList.addEventListener('change', filterChangeHandler);
effectPin.addEventListener('mouseup', effectChangeHandler);
hashtagsInput.addEventListener('change', function () {
  hashtags = hashtagsInput.value.split(' ');
  // return hashtags;
  hashtags.forEach(function (element) {
    if (element && element.charAt(0) !== '#') {
      console.log('Хэштег должен начинаться с #');
    } else if (element.length === 1) {
      console.log('Надо что-то написать');
    } else if (!checkHashtag(element)) {
      console.log('После решетки можно использовать только буквы и цифры');
    } else if (element.length > 20) {
      console.log('Не более 20 символов на хэштег');
    } else if (hashtags.indexOf(element) !== hashtags.lastIndexOf(element)) {
      console.log('Хэштеги не должны повторяться!');
    }
  });

});

// hashtags = hashString.split(' ');
// console.log(hashtags);
