function DrawWatcher(options) {
  var drawing = false;

  var canvas = options.canvas;
  var onDrawStartCallback = options.onDrawStart;
  var onDrawCallback = options.onDraw;
  var onDrawEndCallback = options.onDrawEnd;

  function getCanvasCoordinates(e) {
      return {x: e.pageX - canvas.offsetLeft,
              y: e.pageY - canvas.offsetTop}
  }

  function xyCallback(cb) {
    return function(e) {
      if (e.which == 1) {
        var xy = getCanvasCoordinates(e);
        cb(xy.x, xy.y);

        return true;
      }

      return false;
    }
  }

  $(canvas).bind('mousedown', xyCallback(
        function(x, y) {
          drawing = true;
          if (onDrawStartCallback) onDrawStartCallback(x, y);
        }));

  $(canvas).bind('mouseleave', xyCallback(
        function(x, y) {
          drawing = false;
          if (onDrawEndCallback) onDrawEndCallback(x, y);
        }));

  $(canvas).bind('mouseup', xyCallback(
        function(x, y) {
          drawing = false;
          if (onDrawEndCallback) onDrawEndCallback(x, y);
        }));

  $(canvas).bind('mousemove', xyCallback(
        function(x, y) {
          if (drawing) {
            if (onDrawCallback) onDrawCallback(x, y);
          }
        }));
}
