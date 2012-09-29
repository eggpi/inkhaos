var _lineDefs = {
  black: {
    style: "rgb(0, 0, 0)",
    friction: 0.8,
    restitution: 0.2,
    initialHealth: function(width) {
      return width*4;
    }
  },

  glass: {
    style: "rgba(40, 176, 227, 0.2)",
    friction: 0.1,
    restitution: 0,
    initialHealth: function(width) {
      return width*2;
    }
  },

  bouncy: {
    style: "rgb(205, 119, 200)",
    fiction: 0.1,
    restitution: 0.9,
    initialHealth: function(width) {
      return width*3;
    }
  },
};

function getLineDef(key) {
  return _lineDefs[key];
}
