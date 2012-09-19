function LineBuilder() {
  var lastX, lastY;

  this.moveTo = function(x, y) {
    lastX = x;
    lastY = y;
  }

  this.lineTo = function(x, y, width) {
    // TODO: generate less polygons?
    // TODO: stitch polygons together with small rectangles?
    var vertices = [
      [lastX, lastY],
      [x, y],
      [lastX, lastY + width],
      [x, y + width]
    ];

    // CraftyBox expects the position of the center.
    var posX = (x - lastX)/2;
    var posY = (y - lastY)/2;

    Crafty.e("Box2D").attr({x: posX, y: posY}).polygon(vertices);

    lastX = x;
    lastY = y;
  }
}
