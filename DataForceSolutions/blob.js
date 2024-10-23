// const cnvs = document.getElementById("cnvs");
// const ctx = cnvs.getContext("2d");

// const ww = window.innerWidth;
// const wh = window.innerHeight;

// const colors = [
//   "223, 163, 240", // color1
//   "38, 223, 253", // color2
//   "240, 163, 219", // color3
//   "69, 38, 253", // color4
//   "38, 115, 253", // color5
//   "163, 219, 240", // color-6
//   "223, 163, 240", // color1
//   "38, 223, 253", // color2
//   "240, 163, 219", // color3
// ];
// // const sizes = [500, 600, 300, 700, 600, 1000];

// function getSizes() {
//   const ww = window.innerWidth;
//   return [0.2, 0.5, 0.3, 0.2, 0.4, 0.5].map((multiplier) => ww * multiplier);
// }

// let sizes = getSizes();

// cnvs.width = ww;
// cnvs.height = wh;

// ctx.fillStyle = "#000";
// ctx.fillRect(0, 0, ww, wh);

// let isAnimationActive = true;
// export function runAnimation(str) {
//   isAnimationActive = true;
//   animate();
// }

// export function stopAnimation() {
//   isAnimationActive = false;
// }

// class Circle {
//   constructor(size, color) {
//     this.size = size;
//     this.x = Math.random() * (ww - size - 10);
//     this.y = Math.random() * (wh - size - 10);
//     this.isMovingRight = Math.random() > 0.5 ? true : false;
//     this.isMovingDown = Math.random() > 0.5 ? true : false;
//     this.speed = 1.2;
//     this.color = color;
//   }

//   draw() {
//     // ctx.globalAlpha = 0.5;
//     // ctx.filter = "blur(25px)";

//     const gradient = ctx.createRadialGradient(
//       this.x + this.size / 2,
//       this.y + this.size / 2,
//       0,
//       this.x + this.size / 2,
//       this.y + this.size / 2,
//       this.size / 2
//     );
//     gradient.addColorStop(0, `rgba(${this.color}, 0.8)`);
//     gradient.addColorStop(0.9, `rgba(${this.color}, 0)`);

//     ctx.fillStyle = gradient;
//     ctx.beginPath();
//     ctx.arc(
//       this.x + this.size / 2,
//       this.y + this.size / 2,
//       this.size / 2,
//       0,
//       Math.PI * 2
//     );
//     ctx.fill();

//     // ctx.filter = "none";
//     // ctx.globalAlpha = 1;
//   }

//   move() {
//     if (this.isMovingDown) {
//       this.y += this.speed;
//     } else {
//       this.y -= this.speed;
//     }

//     if (this.isMovingRight) {
//       this.x += this.speed;
//     } else {
//       this.x -= this.speed;
//     }

//     if (this.y > wh) {
//       this.y = wh;
//     }

//     if (this.y < 0) {
//       this.y = 0;
//     }

//     if (this.x > ww) {
//       this.x = ww;
//     }

//     if (this.x < 0) {
//       this.x = 0;
//     }

//     this.directionCheck();
//     this.draw();
//   }

//   directionCheck() {
//     if (this.y + this.size >= wh) {
//       this.isMovingDown = false;
//     } else if (this.y <= 0) {
//       this.isMovingDown = true;
//     }

//     if (this.x + this.size >= ww) {
//       this.isMovingRight = false;
//     } else if (this.x <= 0) {
//       this.isMovingRight = true;
//     }
//   }
// }

// const circles = [];
// function createCircles() {
//   sizes = getSizes(); // Обновляем размеры окружностей
//   for (var i = 0; i < sizes.length; i++) {
//     const size = sizes[i];
//     circles.push(new Circle(size, colors[i % colors.length]));
//   }
// }

// // Инициализируем окружности
// createCircles();

// const animate = (function () {
//   let instance;

//   return function () {
//     if (!instance) {
//       instance = function () {
//         if (!isAnimationActive) return;

//         ctx.clearRect(0, 0, ww, wh);
//         circles.forEach((c) => c.move());
//         requestAnimationFrame(animate);
//       };
//     }
//     return instance();
//   };
// })();

// function updateCircleSizes() {
//   sizes = getSizes();
//   circles.forEach((c, i) => {
//     c.size = sizes[i];
//   });
// }

// window.addEventListener("resize", () => {
//   cnvs.width = window.innerWidth;
//   cnvs.height = window.innerHeight;

//   updateCircleSizes();
// });

const cnvs = document.getElementById("cnvs");
const ctx = cnvs.getContext("2d");

let ww = window.innerWidth;
let wh = window.innerHeight;

const colors = [
  "223, 163, 240", // color1
  "38, 223, 253", // color2
  "240, 163, 219", // color3
  "69, 38, 253", // color4
  "38, 115, 253", // color5
  "163, 219, 240", // color6
];

function getSizes() {
  ww = window.innerWidth;
  return [0.2, 0.5, 0.3, 0.2, 0.4, 0.5].map((multiplier) => ww * multiplier);
}

let sizes = getSizes();

cnvs.width = ww;
cnvs.height = wh;

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, ww, wh);

let isAnimationActive = true;

export function runAnimation() {
  isAnimationActive = true;
  animate();
}

export function stopAnimation() {
  isAnimationActive = false;
}

class Circle {
  constructor(size, color) {
    this.size = size;
    this.x = Math.random() * (ww - size);
    this.y = Math.random() * (wh - size);
    this.isMovingRight = Math.random() > 0.5;
    this.isMovingDown = Math.random() > 0.5;
    this.speed = 1.2;
    this.color = color;
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x + this.size / 2,
      this.y + this.size / 2,
      0,
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size / 2
    );
    gradient.addColorStop(0, `rgba(${this.color}, 0.8)`);
    gradient.addColorStop(0.9, `rgba(${this.color}, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
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
  sizes = getSizes();
  circles = [];
  for (let i = 0; i < sizes.length; i++) {
    circles.push(new Circle(sizes[i], colors[i % colors.length]));
  }
}

createCircles();

function animate() {
  if (!isAnimationActive) return;

  ctx.clearRect(0, 0, ww, wh);
  circles.forEach((circle) => circle.move());
  requestAnimationFrame(animate);
}

function updateCircleSizes() {
  sizes = getSizes();
  circles.forEach((circle, i) => {
    circle.size = sizes[i];
    circle.checkBounds(); // Обновляем границы после изменения размера
  });
}

window.addEventListener("resize", () => {
  ww = window.innerWidth;
  wh = window.innerHeight;
  cnvs.width = ww;
  cnvs.height = wh;

  updateCircleSizes();
});
