function initInkhaos() {
  var STAGE_HEIGHT = 768, STAGE_WIDTH = 1280;

  Crafty.init(STAGE_WIDTH, STAGE_HEIGHT);
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

  Crafty.c("Bomb", {
    init: function() {
      this.requires("Box2D");
    },

    bomb: function(bombDef) {
      this._power = bombDef.power;

      this.onHit("Box2D", function(hitData) {
        var other = hitData[0].obj;

        if (other.length == 0 || other.has("Bomb")) {
          bombDef.onHitBomb.call(this, other);
        }
      });

      return this;
    },
  });

  Crafty.c("Bomber", {
    init: function() {
      this.requires("Delay");
    },

    bomber: function(options) {
      var x = options.x,
          y = options.y,
          bombDefs = options.bombDefs,
          maxPerWave = options.maxPerWave,
          minAngle = options.minAngle,
          maxAngle = options.maxAngle,
          period = options.period;

      this._spawnBombs = function() {
        var index = Math.floor(Math.random()*bombDefs.length);
        var bombDef = getBombDef(bombDefs[index]);
        var angle = Math.random()*(maxAngle - minAngle) + minAngle;
        var waveSize = Math.ceil(Math.random() * maxPerWave);

        for (var n = waveSize; n > 0; n--) {
          var xPos = x + 4*(n - waveSize / 2)*bombDef.radius,
              vx = bombDef.velocity * Math.cos(angle),
              vy = bombDef.velocity * Math.sin(angle);

          // Make bombs spread over x and y
          var spreadX;
          if (vx > 0) {
            spreadX = bombDef.velocity * xPos / STAGE_WIDTH;
          } else {
            spreadX = -bombDef.velocity * (1 - xPos / STAGE_WIDTH);
          }

          var spreadY = bombDef.velocity * Math.random() / 8;
          vx += spreadX;
          vy += spreadY;

          var velocity = new Box2D.Common.Math.b2Vec2(vx, vy);

          var bomb = Crafty.e("Box2D, DOM, Bomb")
                .attr({x: xPos, y: y, r: bombDef.radius, type: "dynamic"})
                .css(bombDef.css)
                .bomb(bombDef);

          bomb.body.SetLinearVelocity(velocity);
        }

        this.delay(this._spawnBombs, period);
      }

      this.delay(this._spawnBombs, period);
      return this;
    }
  });

  // Create our own canvas in front of the Crafty DOM elements
  var drawCanvas = $("<canvas width=1280 height=768/>").get(0);
  $("#cr-stage").append(drawCanvas);

  var bomber = Crafty.e("Bomber").bomber({
    x: 7 * STAGE_WIDTH / 8,
    y: -10,
    minAngle: Math.PI / 2,
    maxAngle: Math.PI,
    maxPerWave: 5,
    bombDefs: ["anarchist"],
    period: 2000
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
