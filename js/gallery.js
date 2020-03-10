'use strict';

(function () {
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPicture = function (i) {
    var picture = pictureTemplate.cloneNode(true);
    var pictureImg = picture.querySelector('.picture__img');
    var pictureLikes = picture.querySelector('.picture__likes');
    var pictureComments = picture.querySelector('.picture__comments');
    pictureImg.src = window.data.picturesArr[i].url;
    pictureLikes.textContent = window.data.picturesArr[i].likes;
    pictureComments.textContent = window.data.picturesArr[i].comments.length;
    return picture;
  };

  for (var i = 0; i < window.data.picturesArr.length; i++) {
    picturesList.appendChild(renderPicture(i));
  }
})();
