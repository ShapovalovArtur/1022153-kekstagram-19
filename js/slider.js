'use strict';

(function () {

  var GAP = 20;

  var sliderLine = document.querySelector('.effect-level__line');
  var sliderHandle = sliderLine.querySelector('.effect-level__pin');
  var startCoords = {
    x: null,
  };

  var mouseDownHandler = function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
    };

    var mouseMoveHandler = function (moveEvt) {

      if (sliderHandle.offsetLeft < sliderLine.offsetLeft || (sliderHandle.offsetLeft) > (sliderLine.offsetLeft + sliderLine.offsetWidth - GAP)) {
        console.log('уехал вбок');
        console.log(sliderLine.offsetWidth);
      }
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      sliderHandle.style.left = (sliderHandle.offsetLeft - shift.x + 'px');
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };


    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  };

  sliderHandle.addEventListener('mousedown', mouseDownHandler);
})();
