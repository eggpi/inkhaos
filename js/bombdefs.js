var _bombDefs = (function() {
  var defaults = {
    onHitBomb: function(other) {
      this.destroy();
    },
  }

  function mkBombDef(attrs) {
    return $.extend({}, defaults, attrs);
  }

  return {
    anarchist: mkBombDef({
      css: {
        "background-color": "black",
        "border-radius": 20,
      },

      power: 10,
      radius: 20,
    }),
  };
})();

function getBombDef(key) {
  return _bombDefs[key];
}
