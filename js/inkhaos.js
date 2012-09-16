function initInkhaos() {
  var canvas = $("#canvas");
  var canvasElm = canvas.get(0);
  var lineDrawer;

  var drawWatcher = new DrawWatcher({
    canvas: canvasElm,

    onDrawStart: function(x, y) {
      lineDrawer = new LineDrawer({
        canvas: canvasElm,
        lineColor: "rgb(0,0,0)",
        initialLineWidth: 10.0,
      });

      lineDrawer.moveTo(x, y);
    },

    onDraw: function(x, y) {
      lineDrawer.lineTo(x, y);
    }});
}
