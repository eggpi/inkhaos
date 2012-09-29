function initInkhaos() {
  Crafty.init(1280, 768);
  Crafty.Box2D.init();
  Crafty.Box2D.gravity = {x: 0, y: 10};

  // Use debug drawing mechanism.
  // Crafty.Box2D.debug = true;

  /* Custom components */
  Crafty.c("Segment", {
    init: function() {
      this.requires("Box2D");
    },

    segment: function(lineDef, vertices, width) {
      this.width = width;
      this._health = lineDef.initialHealth(width);
      this.attr({
        x: 0,
        y: 0,
        restitution: lineDef.restitution,
        friction: lineDef.friction,
      }).polygon(vertices);

      return this;
    },
  });

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
      var lineDef = getLineDef($("#stylesel input:checked").val());

      lineDrawer = new LineDrawer({canvas: drawCanvas, lineDef: lineDef});
      lineBuilder = new LineBuilder(lineDef);

      lineDrawer.moveTo(x, y);
      lineBuilder.moveTo(x, y);
    },

    onDraw: function(x, y) {
      var segment = lineBuilder.lineTo(x, y);

      if (segment != null) {
        lineDrawer.lineTo(x, y, segment.width);
      }
    }});
}
