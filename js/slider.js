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
      var pin = moveEvt.toElement;
      var line = pin.offsetParent;
      if (line.offsetLeft <= 0 && line.offsetLeft <= 450 ) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
        };

        startCoords = {
          x: moveEvt.clientX,
        };

        sliderHandle.style.left = (sliderHandle.offsetLeft - shift.x + 'px');


        console.log(moveEvt)

      }
      console.log(line.offsetLeft);
      console.log(moveEvt);
      moveEvt.preventDefault();
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
