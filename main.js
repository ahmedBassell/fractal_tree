var c = document.getElementById("fractal__tree");
var ctx = c.getContext("2d");

var THETA_RANDOMIZE_LIMIT = 30;
var NARROW_BRANCH_ANGLE = 35;
var WIDE_BRANCH_ANGLE = 75;
var SHRINK_RATIO = 0.6;
var START_ANGLE = 90;
var COLORS = {
  dark: '#17331F',
  normal: '#3B5B44',
  light: '#617A68',
};

init();

function init() {
  var theta = START_ANGLE;
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = COLORS['dark'];
  ctx.moveTo(512, 600);
  ctx.lineTo(512, 450);
  ctx.stroke();
  ctx.closePath();

  var pos = {
    x: 512,
    y: 450,
  }

  _branch(180, pos, theta + NARROW_BRANCH_ANGLE, 0);
  _branch(180, pos, theta - NARROW_BRANCH_ANGLE, 0);
}

function _branch(length, position, theta, level) {
  if (length <= 5) return;

  level++;
  theta %= 360;
  position = _draw(length, position, theta, level);
  theta = _randomizeTheta(theta)

  _branch(length * SHRINK_RATIO, position, theta + NARROW_BRANCH_ANGLE, level);
  _branch(length * SHRINK_RATIO, position, (theta) % 360, level);
  _branch(length * SHRINK_RATIO, position, (theta - NARROW_BRANCH_ANGLE) % 360, level);

  // more _branches in higher levels
  if (level >= 5) {
    _branch(length * SHRINK_RATIO, position, (theta + WIDE_BRANCH_ANGLE) % 360, level);
    _branch(length * SHRINK_RATIO, position, (theta - WIDE_BRANCH_ANGLE) % 360, level);
  }
}

function _draw(length, position, theta, level) {
  var new_x, new_y;

  new_x = position.x + (length * Math.cos(_degreeToRad(theta)));
  new_y = position.y - (length * Math.sin(_degreeToRad(theta)));

  ctx.beginPath();
  ctx.moveTo(position.x, position.y);

  // variant colors dependant on level
  if(level > 5) ctx.strokeStyle = COLORS['light'];
  else if (level > 2) ctx.strokeStyle = COLORS['normal'];
  else ctx.strokeStyle = COLORS['dark'];

  ctx.lineWidth = length/20;
  ctx.lineTo(new_x, new_y);
  ctx.stroke();
  ctx.closePath();

  return {x: new_x, y: new_y};
}

function _degreeToRad(deg) {
  return (deg/360) * 2*Math.PI;
}

function _randomizeTheta(theta) {
  theta += (Math.random()-0.5) * THETA_RANDOMIZE_LIMIT;
  theta %= 360;

  return theta;
}
