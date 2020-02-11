'use strict';

var COMMENTS_MIN = 2;
var COMMENTS_MAX = 6;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var PHOTOS_NUMBER = 25;

var photos = [];
var comments = [];
var names = ['Андрей', 'Артем', 'Александр', 'Антон', 'Анатолий'];
var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptions = ['Какой чудесный день!', 'Какой чудесный пень!', 'Какой чудесный я!', 'И песенка моя!', 'Потрясающе!',
  'Отвратительно!'];

var getRandomNumber = function (minValue, maxValue) {
  return Math.floor(minValue + Math.random() * (maxValue + 1 - minValue));
};

var makeAvatar = function () {
  var avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  return avatar;
};

var makeUrl = function () {
  var url = 'photos/' + getRandomNumber(1, 25) + '.jpg';
  return url;
};

var getCommentName = function () {
  return names[(getRandomNumber(0, names.length - 1))];
};

var getMessage = function () {
  return messages[(getRandomNumber(0, messages.length - 1))];
};

var createComments = function () {
  var commentsNumber = getRandomNumber(COMMENTS_MIN, COMMENTS_MAX);
  comments = [];
  for (var i = 0; i < commentsNumber; i++) {
    comments[i] = {
      avatar: makeAvatar(),
      message: getMessage(),
      name: getCommentName()
    };
  }
  return comments;
};

var getLikes = function () {
  return getRandomNumber(LIKES_MIN, LIKES_MAX);
};

var getDescription = function () {
  return descriptions[(getRandomNumber(0, descriptions.length - 1))];
};

var createPhotos = function () {
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    photos[i] = {
      url: makeUrl(),
      description: getDescription(),
      likes: getLikes(),
      comments: createComments()
    };
  }
  return photos;
};

var picturesArr = createPhotos();
var picturesList = document.querySelector('.pictures');

for (var i = 0; i < picturesArr.length; i++) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picture = pictureTemplate.cloneNode(true);
  var pictureImg = picture.querySelector('.picture__img');
  var pictureLikes = picture.querySelector('.picture__likes');
  var pictureComments = picture.querySelector('.picture__comments');
  pictureImg.src = picturesArr[i].url;
  pictureLikes.textContent = picturesArr[i].likes;
  pictureComments.textContent = picturesArr[i].comments.length;
  picturesList.appendChild(picture);
}
