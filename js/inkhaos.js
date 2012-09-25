function initInkhaos() {
  Crafty.init(1280, 768);
  Crafty.Box2D.init();
  Crafty.Box2D.gravity = {x: 0, y: 10};

  // Use debug drawing mechanism.
  // Crafty.Box2D.debug = true;

  // Create our own canvas in front of the Crafty DOM elements
  var drawCanvas = $("<canvas width=1280 height=768/>").get(0);
  $("#cr-stage").append(drawCanvas);

  // Spawn bomb on right mouse click
  $(drawCanvas).mousedown(function(e) {
    if (e.which == 3) {
      Crafty.e("Box2D, DOM")
            .attr({x: e.pageX, y: e.pageY, r: 20, type: "dynamic"})
            .css({"background-color": "red", "border-radius": 20});
    }
  });

  var lineDrawer, lineBuilder;
  var drawWatcher = new DrawWatcher({
    canvas: drawCanvas,

    onDrawStart: function(x, y) {
      lineDrawer = new LineDrawer({
        canvas: drawCanvas,
        lineColor: "rgb(0,0,0)",
        initialLineWidth: 10.0,
      });

      lineBuilder = new LineBuilder();

      lineDrawer.moveTo(x, y);
      lineBuilder.moveTo(x, y);
    },

    onDraw: function(x, y) {
      var width = lineDrawer.lineTo(x, y);
      lineBuilder.lineTo(x, y, width);
    }});
}
