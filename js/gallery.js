'use strict';

(function () {

  var picturesArr = [];
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPicturePopup = document.querySelector('.big-picture');
  var bigPictureImage = bigPicturePopup.querySelector('img');
  var bigPictureClose = bigPicturePopup.querySelector('.big-picture__cancel');
  var social = bigPicturePopup.querySelector('.big-picture__social');
  var socialHeader = social.querySelector('.social__caption');
  var likesCount = social.querySelector('.likes-count');

  var successLoadHandler = function (pictures) {
    picturesArr = pictures;
    picturesArr.forEach(function (element, i) {
      picturesList.appendChild(renderPicture(i));
    });
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var closePopupButtonHandler = function () {
    bigPicturePopup.classList.add('hidden');
    bigPictureClose.removeEventListener('click', closePopupButtonHandler);
  };


  var renderPicture = function (i) {
    var picture = pictureTemplate.cloneNode(true);
    var pictureImg = picture.querySelector('.picture__img');
    var pictureLikes = picture.querySelector('.picture__likes');
    var pictureComments = picture.querySelector('.picture__comments');
    pictureImg.src = picturesArr[i].url;
    pictureLikes.textContent = picturesArr[i].likes;
    pictureComments.textContent = picturesArr[i].comments.length;
    picture.addEventListener('click', function () {

      bigPicturePopup.classList.remove('hidden');
      bigPictureClose.addEventListener('click', closePopupButtonHandler);
      bigPictureImage.src = picturesArr[i].url;
      socialHeader.textContent = picturesArr[i].description;
      likesCount.textContent = picturesArr[i].likes;
      console.log(picturesArr);
    });
    return picture;
  };

  window.backend.load(successLoadHandler, errorHandler);


})();
