function LineDrawer(options) {
  var canvas = options.canvas, lineDef = options.lineDef;

  this.lineTo = function(x, y, width) {
    canvasCtx.lineWidth = width;
    canvasCtx.lineTo(x, y);
    canvasCtx.stroke();
  }

  this.moveTo = function(x, y) {
    canvasCtx.moveTo(x, y);
  }

  var canvasCtx = canvas.getContext('2d');
  canvasCtx.strokeStyle = lineDef.style;
  canvasCtx.lineJoin = "round";

  canvasCtx.beginPath();
}
