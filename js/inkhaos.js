function initInkhaos() {
  Crafty.init(1280, 768);
  Crafty.canvas.init();
  Crafty.Box2D.init();
  Crafty.Box2D.gravity = {x: 0, y: 10};

  // Use debug drawing mechanism.
  Crafty.Box2D.debug = true;

  var canvasElm = Crafty.canvas._canvas;

  $(canvasElm).mousedown(function(e) {
    if (e.which == 3) {
      var bomb = Crafty.e("Box2D").attr({x: e.pageX, y: e.pageY, r: 20, type: "dynamic"});

      // Replace the line above with the following lines to
      // try our custom drawing mechanism.

      /*
      var bomb = Crafty.e("Box2D, Canvas").attr({x: e.pageX, y: e.pageY, r: 20, type: "dynamic"});
      bomb.ready = true; // hack? taken from craftybox examples/box2d.html

      bomb.bind("Draw", function(obj) {
        obj.ctx.beginPath();
        var centerX = obj.pos._x + obj.pos._w/2;
        var centerY = obj.pos._y + obj.pos._h/2;

        obj.ctx.arc(centerX, centerY, obj.pos._w/2, 0, Math.PI*2, true);
        obj.ctx.closePath();
        obj.ctx.fill();
      });
      */

      return true;
    }
  });

  var lineDrawer, lineBuilder;
  var drawWatcher = new DrawWatcher({
    canvas: canvasElm,

    onDrawStart: function(x, y) {
      lineDrawer = new LineDrawer({
        canvas: canvasElm,
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
