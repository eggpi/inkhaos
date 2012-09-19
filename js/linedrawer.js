function LineDrawer(options) {
  var canvas = options.canvas,
      lineColor = options.lineColor,
      initialLineWidth = options.initialLineWidth,
      minLineWidth = options.minLineWidth || 0.5;
      lineWidthDecay = options.lineWidthDecay || Math.E;

  var lineWidthDecayLog = Math.log(lineWidthDecay), nextInteger = 1.0
  function getLineWidthDecrease() {
    var linesDrawnLog = Math.log(linesDrawn),
        decay = linesDrawnLog / lineWidthDecayLog;

    var decrease = 0.0;
    if (decay >= nextInteger) decrease = 0.5;
    return decrease;
  }

  var linesDrawn = 0;
  this.lineTo = function(x, y) {
    linesDrawn += 1;

    if (canvasCtx.lineWidth > minLineWidth) {
      canvasCtx.lineWidth -= getLineWidthDecrease();
    }

    canvasCtx.lineTo(x, y);
    canvasCtx.stroke();

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
