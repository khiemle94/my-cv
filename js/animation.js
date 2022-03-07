var circles = [],
  circlesDrawLine = [],
  canvas = {},
  context = {},
  cursorX = 0,
  cursorY = 0,
  canvas = {},
  // SETTINGS
  opacity = 0.2, // the opacity of the circles 0 to 1
  colors = ["rgba(255, 255, 255," + opacity + ")", "red"],
  maxRange = 200,
  maxRangeTwoCircle = 100,
  minSize = 1, // the minimum size of the circles in px
  maxSize = 4, // the maximum size of the circles in px
  numCircles = 200, // the number of circles
  minSpeed = -5, // the minimum speed, recommended: -maxspeed
  maxSpeed = 5, // the maximum speed of the circles
  expandState = true; // the direction of expansion
  

function buildArray() {
  for (var i = 0; i < numCircles; i++) {
    var color = 1,
      left = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,
      top = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0,
      size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
      leftSpeed =
        (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10,
      topSpeed =
        (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) / 10,
      expandState = expandState;

    while (leftSpeed == 0 || topSpeed == 0) {
      (leftSpeed =
        (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) /
        10),
        (topSpeed =
          (Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed) /
          10);
    }
    var circle = {
      color: color,
      left: left,
      top: top,
      size: size,
      leftSpeed: leftSpeed,
      topSpeed: topSpeed,
      expandState: expandState
    };
    circles.push(circle);
  }
}

function build() {
  for (var h = 0; h < circles.length; h++) {
    var curCircle = circles[h];
    context.fillStyle = colors[curCircle.color - 1];
    context.beginPath();
    if (curCircle.left > canvas.width + curCircle.size) {
      curCircle.left = 0 - curCircle.size;
      context.arc(
        curCircle.left,
        curCircle.top,
        curCircle.size,
        0,
        2 * Math.PI,
        false
      );
    } else if (curCircle.left < 0 - curCircle.size) {
      curCircle.left = canvas.width + curCircle.size;
      context.arc(
        curCircle.left,
        curCircle.top,
        curCircle.size,
        0,
        2 * Math.PI,
        false
      );
    } else {
      curCircle.left = curCircle.left + curCircle.leftSpeed;
      context.arc(
        curCircle.left,
        curCircle.top,
        curCircle.size,
        0,
        2 * Math.PI,
        false
      );
    }

    if (curCircle.top > canvas.height + curCircle.size) {
      curCircle.top = 0 - curCircle.size;
      context.arc(
        curCircle.left,
        curCircle.top,
        curCircle.size,
        0,
        2 * Math.PI,
        false
      );
    } else if (curCircle.top < 0 - curCircle.size) {
      curCircle.top = canvas.height + curCircle.size;
      context.arc(
        curCircle.left,
        curCircle.top,
        curCircle.size,
        0,
        2 * Math.PI,
        false
      );
    } else {
      curCircle.top = curCircle.top + curCircle.topSpeed;
      if (
        curCircle.size != maxSize &&
        curCircle.size != minSize &&
        curCircle.expandState == false
      ) {
        curCircle.size = curCircle.size - 0.1;
      } else if (
        curCircle.size != maxSize &&
        curCircle.size != minSize &&
        curCircle.expandState == true
      ) {
        curCircle.size = curCircle.size + 0.1;
      } else if (curCircle.size == maxSize && curCircle.expandState == true) {
        curCircle.expandState = false;
        curCircle.size = curCircle.size - 0.1;
      } else if (curCircle.size == minSize && curCircle.expandState == false) {
        curCircle.expandState = true;
        curCircle.size = curCircle.size + 0.1;
      }
      context.arc(
        curCircle.left,
        curCircle.top,
        curCircle.size,
        0,
        2 * Math.PI,
        false
      );
    }

    context.closePath();
    context.fill();
    context.ellipse;
  }
  drawLineWhenMathDistance();
}

var xVal = 0;

window.requestAnimFrame = (function(callback) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function animate(circles = []) {
  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the next frame
  xVal++;
  build();

  // request a new frame
  requestAnimFrame(function() {
    animate();
  });
}

document.onmousemove = async function(e) {
  await waitASeconds(0.2);
  cursorX = e.clientX || cursorX;
  cursorY = e.clientY || cursorY;
};

document.ontouchstart = async function(e) {
  await waitASeconds(0.2);
  cursorX = e.touches[0].clientX || cursorX;
  cursorY = e.touches[0].clientY || cursorY;
};

document.ontouchmove = async function(e) {
  await waitASeconds(0.2);
  cursorX = e.touches[0].clientX || cursorX;
  cursorY = e.touches[0].clientY || cursorY;
};

function drawLineWhenMathDistance() {
  let circlesDrawLine = getCirclesCanDrawLine();
  let circlesLength = circlesDrawLine.length;
  for (let i = 0; i < circlesLength; i++) {
    for (let y = 0; y < circlesLength; y++) {
      if (
        calculDistance(
          circlesDrawLine[i].left,
          circlesDrawLine[i].top,
          circlesDrawLine[y].left,
          circlesDrawLine[y].top
        ) < maxRangeTwoCircle
      ) {
        context.beginPath();
        context.lineWidth = 0.2;
        context.strokeStyle = "rgba(255, 255, 255, .1)";
        context.moveTo(circlesDrawLine[i].left, circlesDrawLine[i].top);
        context.lineTo(circlesDrawLine[y].left, circlesDrawLine[y].top);
        context.closePath();
        context.stroke();
      }
    }
  }
}

function calculDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getCirclesCanDrawLine() {
  return circles.filter(circle => {
    return calculDistance(circle.left, circle.top, cursorX, cursorY) < maxRange;
  });
}
