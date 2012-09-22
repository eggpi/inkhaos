function LineBuilder() {
  var lastX, lastY;

  this.moveTo = function(x, y) {
    lastX = x;
    lastY = y;
  }

  /*
   * Sort an array of vertices counterclockwise relative to the
   * baricenter of the polygon they determine.
   */
  function sortVerticesCCW(vertices) {
    var center = {x: 0, y: 0};
    for (i = 0; i < vertices.length; i++) {
      center.x += vertices[i][0];
      center.y += vertices[i][1];
    }

    center.x /= vertices.length;
    center.y /= vertices.length;

    vertices.sort(function(v1, v2) {
      var a1 = Math.atan2(v1[1] - center.y, v1[0] - center.x);
      var a2 = Math.atan2(v2[1] - center.y, v2[0] - center.x);

      return a1 - a2;
    });
  }

  /*
   * Build an array of vertices for a line interpolation
   * rectangle for (lastX, lastY) and (x, y).
   * Returns the array of vertices sorted counterclockwise relative
   * to the rectangle's baricenter.
   */
  function buildRectangleVertices(x, y, width) {
    var m = (y - lastY) / (x - lastX),
        theta = Math.atan(m),
        sint = Math.sin(theta),
        cost = Math.cos(theta);

    var vertices = [
      [x + width*sint/2, y - width*cost/2],
      [lastX + width*sint/2, lastY - width*cost/2],
      [lastX - width*sint/2, lastY + width*cost/2],
      [x - width*sint/2, y + width*cost/2],
    ];

    sortVerticesCCW(vertices);
    return vertices;
  }

  this.lineTo = function(x, y, width) {
    // TODO: Could just generate rectangle and rotate?

    var dx = (x - lastX), dy = (y - lastY);

    // magic constant -- needs tweaking
    // avoid creating tiny polygons
    if (dx*dx + dy*dy < 1000) return;

    var vertices = buildRectangleVertices(x, y, width);

    // For polygons, Box2D uses the x and y coordinates of the position
    // as an origin, to which all vertices are relative (in contrast with
    // rectangles and circles, whose position refers to its center point).
    Crafty.e("Box2D").attr({x: 0, y: 0}).polygon(vertices);

    lastX = x;
    lastY = y;
  }
}
