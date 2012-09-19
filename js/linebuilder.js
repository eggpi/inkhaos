function LineBuilder() {
  var lastX, lastY;

  this.moveTo = function(x, y) {
    lastX = x;
    lastY = y;
  }

  this.lineTo = function(x, y, width) {
    // TODO: generate less polygons?
    // TODO: stitch polygons together with small rectangles?
    //

    var dx = (x - lastX), dy = (y - lastY);
    var m = dy/dx, theta = Math.atan(m);
    var sint = Math.sin(theta), cost = Math.cos(theta);

    var vertices = [
      [x + width*sint/2, y - width*cost/2],
      [lastX + width*sint/2, lastY - width*cost/2],
      [lastX, lastY],
      [lastX - width*sint/2, lastY + width*cost/2],
      [x - width*sint/2, y + width*cost/2],
      [x, y]
    ];

    // CraftyBox expects the position of the center.
    Crafty.e("Box2D").attr({x: dx/2, y: dy/2}).polygon(vertices);

    lastX = x;
    lastY = y;
  }
}
