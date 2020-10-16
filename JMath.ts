function DegToRad(d) {
    // Converts degrees to radians
    return d * 0.0174532925199432957;
}

var TO_RADIANS = Math.PI / 180;


function getX(rot) {
  var rotRad = rot * (Math.PI / 180)
  return Math.sin(rotRad)
}

function getY(rot) {
  var rotRad = rot * (Math.PI / 180)
  return -Math.cos(rotRad)
}

function getRand(index) {
  var randomNum = Math.floor(Math.random() * index);
  return randomNum;
}

function getAngle(x1, y1, x2, y2) {
    var hyp = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)))
    var angle = (180 / Math.PI) * Math.acos((y1 - y2) / (hyp))
  if (x1 > x2) {
    angle = 360 - (180 / Math.PI) * Math.acos((y1 - y2) / (hyp))
  }
    return angle
}

function increaseWithLimit(index, amount, limit) {
  index += amount;

  if (index > limit) { index = 0 }

  return index;
}

function increaseWithLimitAndStick(index, amount, limit) {
  index += amount;

  if (Math.abs(index) > Math.abs(limit)) {
    index = limit;
  }

  return index;
}

function getHyp(x1, y1, x2, y2) {
    var hyp = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)))
    return hyp

}