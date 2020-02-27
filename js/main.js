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
var PERCENT_FILTER_INDEX = 2;
var PIXEL_FILTER_INDEX = 3;
var MIN_HASHTAG_LENGTH = 1;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAGS = 5;

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
var effectPinValue = uploadOverlay.querySelector('.effect-level__value').value;
var body = document.querySelector('body');
var uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
var effectsList = uploadOverlay.querySelector('.effects__list');
var currentEffect = '';
var sliderBar = uploadOverlay.querySelector('.img-upload__effect-level');
var hashtags = [];
var hashtagsInput = uploadOverlay.querySelector('.text__hashtags');

var saveEffectValue = function () {
  uploadOverlay.querySelector('.effect-level__value').value = effectPinValue;
};


var popupEscHandler = function (evt) {
  if (hashtagsInput === document.activeElement) {
    return;
  }
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
  for (var j = 0; j < EFFECT_NAMES.length; j++) {
    if (EFFECT_NAMES[j] === currentEffect) {
      var currentEffectValue = EFFECT_FILTERS[j] + '(' + EFFECT_RATIOS[j] * effectPinValue + ')';
      if (j === PERCENT_FILTER_INDEX) {
        currentEffectValue = EFFECT_FILTERS[j] + '(' + EFFECT_RATIOS[j] * effectPinValue + '%' + ')';
      }
      if (j === PIXEL_FILTER_INDEX) {
        currentEffectValue = EFFECT_FILTERS[j] + '(' + EFFECT_RATIOS[j] * effectPinValue + 'px' + ')';
      }
    }
  }
  uploadPreview.style.filter = currentEffectValue;
};

var effectChangeHandler = function () {
  effectPinValue = getRandomNumber(0, 100);
  getEffect(effectPinValue);
  saveEffectValue();
};

var checkHashtag = function (str) {
  var reg = /#[\w\dА-я]+$/;
  return reg.test(str);
};

var hashtagsValidateHandler = function () {
  hashtags = hashtagsInput.value.split(' ');
  if (hashtags.length > MAX_HASHTAGS) {
    hashtagsInput.setCustomValidity('Максимум ' + MAX_HASHTAGS + ' хэштегов');
  } else {
    hashtagsInput.setCustomValidity('');
    hashtags.forEach(function (element) {
      if (element && element.charAt(0) !== '#' || element === '') {
        hashtagsInput.setCustomValidity('Хэштег должен начинаться с #');
      } else if (element.length === MIN_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('Надо что-то написать после решетки');
      } else if (!checkHashtag(element)) {
        hashtagsInput.setCustomValidity('После решетки можно использовать только буквы и цифры');
      } else if (element.length > MAX_HASHTAG_LENGTH) {
        hashtagsInput.setCustomValidity('Не более ' + MAX_HASHTAG_LENGTH + ' символов на хэштег');
      } else if (hashtags.indexOf(element) !== hashtags.lastIndexOf(element)) {
        hashtagsInput.setCustomValidity('Хэштеги не должны повторяться!');
      } else {
        hashtagsInput.setCustomValidity('');
      }
    });
  }
};

uploadOpen.addEventListener('change', function () {
  openPopup();
});

uploadClose.addEventListener('click', function () {
  closePopup();
});

effectsList.addEventListener('change', filterChangeHandler);
effectPin.addEventListener('mouseup', effectChangeHandler);
hashtagsInput.addEventListener('input', hashtagsValidateHandler);


