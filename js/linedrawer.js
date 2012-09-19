function LineDrawer(options) {
  var canvas = options.canvas,
      lineColor = options.lineColor,
      initialLineWidth = options.initialLineWidth,
      minLineWidth = options.minLineWidth || 0.5;
      lineWidthDecay = options.lineWidthDecay || 0.5;

  this.lineTo = function(x, y) {
    canvasCtx.lineTo(x, y);
    canvasCtx.stroke();

    if (canvasCtx.lineWidth > minLineWidth + lineWidthDecay) {
      canvasCtx.lineWidth -= lineWidthDecay;
    } else {
      canvasCtx.lineWidth = minLineWidth;
    }

    return canvasCtx.lineWidth;
  }

  this.moveTo = function(x, y) {
    canvasCtx.moveTo(x, y);
  }

  var canvasCtx = canvas.getContext('2d');
  canvasCtx.strokeStyle = lineColor;
  canvasCtx.lineWidth = initialLineWidth;

  canvasCtx.beginPath();
}
