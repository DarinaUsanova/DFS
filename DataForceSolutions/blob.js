const cnvs = document.getElementById("cnvs");
const ctx = cnvs.getContext("2d");

let ww = window.innerWidth;
let wh = window.innerHeight;

// ctx.globalAlpha = 0.7;

const colors = [
  "223, 163, 240", // color1
  "38, 223, 253", // color2
  "240, 163, 219", // color3
  "69, 38, 253", // color4
  "38, 115, 253", // color5
  "163, 219, 240", // color6
];

const breakpoints = [
  {
    width: 430,
    sizes: [200, 300, 250, 150, 300, 400],
    speeds: [0.1, 0.2, 0.5, 1, 0.8, 0.3],
  },
  {
    width: 768,
    sizes: [400, 500, 450, 300, 550, 300],
    speeds: [1, 1.2, 0.7, 1.2, 1.5, 0.7],
  },
  {
    width: 1024,
    sizes: [400, 700, 650, 450, 600, 600],
    speeds: [1.5, 0.9, 0.4, 1.8, 1.5, 0.3],
  },
  {
    width: 1440,
    sizes: [500, 300, 500, 700, 600, 1000],
    speeds: [1.5, 0.8, 1.6, 0.5, 0.2, 0.3],
  },
  {
    width: Infinity,
    sizes: [1000, 900, 700, 500, 700, 600],
    speeds: [2, 2.1, 2, 1.5, 1.8, 2],
  },
];

function getCircleParameters() {
  const screenWidth = window.innerWidth;

  const breakpoint = breakpoints.find((bp) => screenWidth <= bp.width);

  return breakpoint
    ? { sizes: breakpoint.sizes, speeds: breakpoint.speeds }
    : {
        sizes: breakpoints[breakpoints.length - 1].sizes,
        speeds: breakpoints[breakpoints.length - 1].speeds,
      };
}

let { sizes, speeds } = getCircleParameters();

cnvs.width = ww;
cnvs.height = wh;

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, ww, wh);

let isAnimationActive = true;

export function runAnimation(str) {
  isAnimationActive = true;
  animate();
}

export function stopAnimation() {
  isAnimationActive = false;
}

class Circle {
  constructor(size, color, speed) {
    this.size = size;
    this.x = Math.random() * (ww - size);
    this.y = Math.random() * (wh - size);
    this.isMovingRight = Math.random() > 0.5;
    this.isMovingDown = Math.random() > 0.5;
    this.speed = speed; // Устанавливаем скорость
    this.color = color;
  }

  draw() {
    ctx.globalCompositeOperation = "darken";
    const gradient = ctx.createRadialGradient(
      this.x + this.size / 2,
      this.y + this.size / 2,
      0,
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size / 2
    );
    gradient.addColorStop(0, `rgba(${this.color}, 0.6)`);
    gradient.addColorStop(0.3, `rgba(${this.color}, 0.5)`);
    gradient.addColorStop(0.7, `rgba(${this.color}, 0.2)`);
    gradient.addColorStop(1, `rgba(${this.color}, 0)`);

    ctx.fillStyle = gradient;
    // ctx.filter = "blur(12px)";

    ctx.beginPath();
    ctx.arc(
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.filter = "none";
  }

  move() {
    if (this.isMovingDown) {
      this.y += this.speed;
    } else {
      this.y -= this.speed;
    }

    if (this.isMovingRight) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }

    this.checkBounds();
    this.draw();
  }

  checkBounds() {
    if (this.x + this.size > ww) {
      this.x = ww - this.size;
      this.isMovingRight = false;
    } else if (this.x < 0) {
      this.x = 0;
      this.isMovingRight = true;
    }

    if (this.y + this.size > wh) {
      this.y = wh - this.size;
      this.isMovingDown = false;
    } else if (this.y < 0) {
      this.y = 0;
      this.isMovingDown = true;
    }
  }
}

let circles = [];
function createCircles() {
  if (circles.length === 0) {
    const { sizes, speeds } = getCircleParameters();
    circles = [];
    for (let i = 0; i < sizes.length; i++) {
      circles.push(new Circle(sizes[i], colors[i % colors.length], speeds[i]));
    }
  }
}

createCircles();

// function animate() {
//   if (!isAnimationActive) return;

//   ctx.clearRect(0, 0, ww, wh);
//   circles.forEach((circle) => circle.move());
//   requestAnimationFrame(animate);
// }

const animate = (function () {
  let instance;

  return function () {
    if (!instance) {
      instance = function () {
        if (!isAnimationActive) return;

        ctx.clearRect(0, 0, ww, wh);
        circles.forEach((circle) => circle.move());
        requestAnimationFrame(animate);
      };
    }
    return instance();
  };
})();

function updateCircleParameters() {
  const { sizes, speeds } = getCircleParameters();
  circles.forEach((circle, i) => {
    circle.size = sizes[i];
    circle.speed = speeds[i];
    circle.checkBounds();
  });
}

window.addEventListener("resize", () => {
  ww = window.innerWidth;
  wh = window.innerHeight;
  cnvs.width = ww;
  cnvs.height = wh;

  updateCircleParameters();
});
