'use strict';

var COMMENTS_NUMBER = 3;
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

var getRandomNumber = function (minValue, maxValue) {
  return Math.floor((Math.random() * (maxValue + 1) + minValue));
};

var makeAvatar = function () {
  var avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  return avatar;
};

var getCommentName = function () {
  return names[(getRandomNumber(0, names.length - 1))];
};

var getMessage = function () {
  return messages[(getRandomNumber(0, names.length - 1))];

};

var createComments = function () {
  for (var i = 0; i < COMMENTS_NUMBER; i++) {
    comments[i] = {
      avatar: makeAvatar(),
      message: getMessage(),
      name: getCommentName()
    };
  }
  return comments;
};

createComments();


// var createObject = function () {
//   var picture = {
//     url: 'photos/1.jpg',
//     description: '',
//     likes: '',
//     comments: []
//   };
// };
