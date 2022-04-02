//Yoinked from https://twitter.com/keenanisalive/status/1509848722552893440

function ConvexHullGrahamScan() {
    this.anchorPoint = undefined;
    this.reverse = false;
    this.points = [];
}

ConvexHullGrahamScan.prototype = {

    constructor: ConvexHullGrahamScan,

    Point: function (x, y) {
        this.x = x;
        this.y = y;
    },

    _findPolarAngle: function (a, b) {
        var ONE_RADIAN = 57.295779513082;
        var deltaX = (b.x - a.x);
        var deltaY = (b.y - a.y);

        if (deltaX == 0 && deltaY == 0) {
            return 0;
        }

        var angle = Math.atan2(deltaY, deltaX) * ONE_RADIAN;

        if (this.reverse){
            if (angle <= 0) {
                angle += 360;
            }
        }else{
            if (angle >= 0) {
                angle += 360;
            }
        }

        return angle;
    },

    addPoint: function (x, y) {
        //Check to see if anchorPoint has been defined yet.
        if (this.anchorPoint === undefined) {
            //Create new anchorPoint.
            this.anchorPoint = new this.Point(x, y);

            // Sets anchorPoint if point being added is further left.
        } else if (this.anchorPoint.y > y || (this.anchorPoint.y == y && this.anchorPoint.x > x)) {
            this.anchorPoint.y = y;
            this.anchorPoint.x = x;
            this.points.unshift(new this.Point(x, y));
            return;
        }

        this.points.push(new this.Point(x, y));
    },

    _sortPoints: function () {
        var self = this;

        return this.points.sort(function (a, b) {
            var polarA = self._findPolarAngle(self.anchorPoint, a);
            var polarB = self._findPolarAngle(self.anchorPoint, b);

            if (polarA < polarB) {
                return -1;
            }
            if (polarA > polarB) {
                return 1;
            }

            return 0;
        });
    },

    _checkPoints: function (p0, p1, p2) {
        var difAngle;
        var cwAngle = this._findPolarAngle(p0, p1);
        var ccwAngle = this._findPolarAngle(p0, p2);

        if (cwAngle > ccwAngle) {

            difAngle = cwAngle - ccwAngle;

            return !(difAngle > 180);

        } else if (cwAngle < ccwAngle) {

            difAngle = ccwAngle - cwAngle;

            return (difAngle > 180);

        }

        return false;
    },

    getHull: function () {
        var hullPoints = [],
            points,
            pointsLength;

        this.reverse = this.points.every(function(point){
            return (point.x < 0 && point.y < 0);
        });

        points = this._sortPoints();
        pointsLength = points.length;

        //If there are less than 4 points, joining these points creates a correct hull.
        if (pointsLength < 4) {
            return points;
        }

        //move first two points to output array
        hullPoints.push(points.shift(), points.shift());

        //scan is repeated until no concave points are present.
        while (true) {
            var p0,
                p1,
                p2;
            /*File combined by sheumais.github.io*/
            hullPoints.push(points.shift());

            p0 = hullPoints[hullPoints.length - 3];
            p1 = hullPoints[hullPoints.length - 2];
            p2 = hullPoints[hullPoints.length - 1];

            if (this._checkPoints(p0, p1, p2)) {
                hullPoints.splice(hullPoints.length - 2, 1);
            }

            if (points.length == 0) {
                if (pointsLength == hullPoints.length) {
                    return hullPoints;
                }
                points = hullPoints;
                pointsLength = points.length;
                hullPoints = [];
                hullPoints.push(points.shift(), points.shift());
            }
        }
    }
};

// EXPORTS

if (typeof define === 'function' && define.amd) {
    define(function() {
        return ConvexHullGrahamScan;
    });
}
if (typeof module !== 'undefined') {
    module.exports = ConvexHullGrahamScan;
}


function canvasApp() {
  var lurine = document.getElementById("canvasOne");
  var ivyn = lurine.getContext("2d");
  quevon();
  var shashi;
  var taleka;
  var elizabith;
  var shatyra;
  var jong;
  var caiyden;
  var mihcael;
  var alo;
  var judalon;
  var zhyla;
  var shavada;
  var zamyia;
  var oluwabukola;
  var anaysa;
  var makayley;
  var jaymi;
  var tiawan;
  var larce;
  var chayse;
  var mabil;
  var ellany;
  var larkynn;
  var nareli;
  function quevon() {
    shashi = [0, 0];
    taleka = [0, 0];
    elizabith = 0;
    mihcael = 150;
    shatyra = .1;
    jong = [shatyra, 0];
    caiyden = [shatyra * .5, shatyra * .5 * Math.sqrt(3)];
    alo = [0, 0];
    judalon = [];
    zhyla = [];
    armend();
    shavada = [0, 0];
    zamyia = 0;
    sidora();
    lurine.addEventListener("mousedown", stearl, false);
  }
  function hirvin(quashonda, latona) {
    var danalynn = quashonda[0] - latona[0];
    var jessilyn = quashonda[1] - latona[1];
    return Math.sqrt(danalynn * danalynn + jessilyn * jessilyn);
  }
  function armend() {
    for (var emmanuelle = -30; emmanuelle < 30; ++emmanuelle) {
      for (var truvy = -30; truvy < 30; ++truvy) {
        var quayshun = [jong[0] * emmanuelle + caiyden[0] * truvy, jong[1] * emmanuelle + caiyden[1] * truvy];
        if ((emmanuelle - truvy) % 3 != 0) {
          judalon.push(quayshun);
        }
        ;
      }
    }
    ;
    for (var emmanuelle = 0; emmanuelle < judalon.length; ++emmanuelle) {
      for (var truvy = emmanuelle + 1; truvy < judalon.length; ++truvy) {
        if (hirvin(judalon[emmanuelle], judalon[truvy]) < shatyra * 1.01) {
          zhyla.push([emmanuelle, truvy]);
        }
      }
    }
    ;
  }
  function stearl(aryash) {
    var kurtina = lurine.getBoundingClientRect();
    anaysa = 2 * (aryash.clientX - kurtina.left) / kurtina.width - 1;
    makayley = 2 * (aryash.clientY - kurtina.top) / kurtina.height - 1;
    jaymi = anaysa;
    tiawan = makayley;
    oluwabukola = true;
    shashi = [anaysa, makayley];
    if (oluwabukola) {
      window.addEventListener("mousemove", derrell, false);
      mabil = setInterval(bwana, 16.666666666666668);
    }
    ;
    lurine.removeEventListener("mousedown", stearl, false);
    window.addEventListener("mouseup", mykalla, false);
    if (aryash.preventDefault) {
      aryash.preventDefault();
    } else {
      if (aryash.returnValue) {
        aryash.returnValue = false;
      }
    }
    ;
    return false;
  }
  function bwana() {
    if (!oluwabukola) {
      clearInterval(mabil);
    }
    ;
    sidora();
  }
  function mykalla(raidyn) {
    lurine.addEventListener("mousedown", stearl, false);
    window.removeEventListener("mouseup", mykalla, false);
    if (oluwabukola) {
      oluwabukola = false;
      window.removeEventListener("mousemove", derrell, false);
    }
    ;
  }
  function maydee(lucritia, esiquio) {
    var jenetta = Math.asin((lucritia[0] * esiquio[1] - lucritia[1] * esiquio[0]) / Math.sqrt(lucritia[0] * lucritia[0] + lucritia[1] * lucritia[1]) / Math.sqrt(esiquio[0] * esiquio[0] + esiquio[1] * esiquio[1]));
    if (lucritia[0] * esiquio[0] + lucritia[1] * esiquio[1] < 0) {
      if (jenetta > 0) {
        jenetta = Math.PI - jenetta;
      } else {
        jenetta = -Math.PI - jenetta;
      }
    }
    ;
    return jenetta;
  }
  function derrell(marietha) {
    var iline = lurine.getBoundingClientRect();
    anaysa = 2 * (marietha.clientX - iline.left) / iline.width - 1;
    makayley = 2 * (marietha.clientY - iline.top) / iline.height - 1;
    shashi = [jaymi, tiawan];
    taleka = [anaysa, makayley];
    alo[0] = taleka[0] - shashi[0];
    alo[1] = taleka[1] - shashi[1];
    var tamlyn;
    if (Math.sqrt(alo[0] * alo[0] + alo[1] * alo[1]) < .000001) {
      tamlyn = Math.sqrt(shashi[0] * shashi[0] + shashi[1] * shashi[1]);
    } else {
      tamlyn = Math.sqrt(shashi[0] * shashi[0] + shashi[1] * shashi[1]) - Math.abs(alo[0] * shashi[0] + alo[1] * shashi[1]) / Math.sqrt(alo[0] * alo[0] + alo[1] * alo[1]);
    }
    ;
    if (tamlyn < 0) {
      tamlyn = 0;
    }
    ;
    if (tamlyn > 1) {
      tamlyn = 1;
    }
    ;
    elizabith = maydee(taleka, shashi) * tamlyn;
    alo[0] *= 1 - tamlyn;
    alo[1] *= 1 - tamlyn;
    for (var jelisha = 0; jelisha < judalon.length; ++jelisha) {
      judalon[jelisha] = avlyn(judalon[jelisha], -elizabith, alo);
    }
    ;
    shavada = avlyn(shavada, -elizabith, alo);
    zamyia -= elizabith;
    while (Math.sqrt(shavada[0] * shavada[0] + shavada[1] * shavada[1]) > 3 * shatyra) {
      var jasur = 2e19;
      var rosanny = -1;
      for (var jelisha = 0; jelisha < 6; ++jelisha) {
        var zeron = shavada[0] * Math.cos(zamyia + Math.PI / 3 * jelisha) + shavada[1] * Math.sin(zamyia + Math.PI / 3 * jelisha);
        if (zeron < jasur) {
          jasur = zeron;
          rosanny = jelisha;
        }
        ;
      }
      ;
      corr = [3 * shatyra * Math.cos(zamyia + Math.PI / 3 * rosanny), 3 * shatyra * Math.sin(zamyia + Math.PI / 3 * rosanny)];
      shavada = avlyn(shavada, 0, corr);
      for (var jelisha = 0; jelisha < judalon.length; ++jelisha) {
        judalon[jelisha] = avlyn(judalon[jelisha], 0, corr);
      }
      ;
    }
    ;
    jaymi = anaysa;
    tiawan = makayley;
  }
  function avlyn(jyena, jimika, amalea) {
    var yanely = [Math.cos(jimika) * jyena[0] - Math.sin(jimika) * jyena[1], Math.sin(jimika) * jyena[0] + Math.cos(jimika) * jyena[1]];
    var niasia = [yanely[0] + amalea[0], yanely[1] + amalea[1]];
    return niasia;
  }
  function izabella() {
    var hanner = new ConvexHullGrahamScan;
    var thurston = [];
    var luisana = [];
    for (var robinn = 0; robinn < judalon.length; ++robinn) {
      var sirvon = judalon[robinn].slice();
      var gordana = Math.sqrt(sirvon[0] * sirvon[0] + sirvon[1] * sirvon[1]);
      luisana.push(gordana > Math.PI * .5);
      if (gordana != 0) {
        sirvon[0] *= Math.sin(gordana) / gordana;
        sirvon[1] *= Math.sin(gordana) / gordana;
      }
      ;
      thurston.push(sirvon);
      if (!luisana[robinn]) {
        hanner.addPoint(sirvon[0], sirvon[1]);
      }
      ;
    }
    ;
    ivyn.beginPath();
    for (var robinn = 0; robinn < zhyla.length; ++robinn) {
      if (luisana[zhyla[robinn][0]] || luisana[zhyla[robinn][1]]) {
        continue;
      }
      ;
      var tazmin = thurston[zhyla[robinn][0]];
      var derrien = thurston[zhyla[robinn][1]];
      ivyn.moveTo(tazmin[0] * mihcael + mihcael, tazmin[1] * mihcael + mihcael);
      ivyn.lineTo(derrien[0] * mihcael + mihcael, derrien[1] * mihcael + mihcael);
    }
    ;
    var ericberto = hanner.getHull();
    var oreta = ericberto[ericberto.length - 1];
    ivyn.moveTo(oreta.x * mihcael + mihcael, oreta.y * mihcael + mihcael);
    for (robinn = 0; robinn < ericberto.length; ++robinn) {
      ivyn.lineTo(ericberto[robinn].x * mihcael + mihcael, ericberto[robinn].y * mihcael + mihcael);
      ivyn.moveTo(ericberto[robinn].x * mihcael + mihcael, ericberto[robinn].y * mihcael + mihcael);
    }
    ;
    ivyn.strokeStyle = "#000000";
    ivyn.stroke();
  }
  function sidora() {
    ivyn.fillStyle = "white";
    ivyn.fillRect(0, 0, lurine.width, lurine.height);
    izabella();
  }
}

