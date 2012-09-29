var _lineDefs = (function () {
  var defaults = {
    initialLineWidth: 10,
    minLineWidth: 0.5,
    lineWidthDecay: 0.5,
    friction: 0.1,
    restitution: 0.2,
  }

  function mkLineDef(attrs) {
    return $.extend({}, defaults, attrs);
  }

  return {
    black: mkLineDef({
      style: "rgb(0, 0, 0)",
      friction: 0.8,
      initialHealth: function(width) {
        return width*4;
      }
    }),

    glass: mkLineDef({
      style: "rgba(40, 176, 227, 0.2)",
      restitution: 0,
      initialHealth: function(width) {
        return width*2;
      }
    }),

    bouncy: mkLineDef({
      style: "rgb(205, 119, 200)",
      restitution: 0.9,
      initialHealth: function(width) {
        return width*3;
      }
    }),
  };
})();

function getLineDef(key) {
  return _lineDefs[key];
}
