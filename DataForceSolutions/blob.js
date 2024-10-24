// const cnvs = document.getElementById("cnvs");
// const ctx = cnvs.getContext("2d");

// let ww = window.innerWidth;
// let wh = window.innerHeight;

// // ctx.globalAlpha = 0.7;

// const colors = [
//   "223, 163, 240", // color1
//   "38, 223, 253", // color2
//   "240, 163, 219", // color3
//   "69, 38, 253", // color4
//   "38, 115, 253", // color5
//   "163, 219, 240", // color6
// ];

// const breakpoints = [
//   {
//     width: 430,
//     sizes: [200, 300, 250, 150, 300, 400],
//     speeds: [0.1, 0.2, 0.5, 1, 0.8, 0.3],
//   },
//   {
//     width: 768,
//     sizes: [400, 500, 450, 300, 550, 300],
//     speeds: [1, 1.2, 0.7, 1.2, 1.5, 0.7],
//   },
//   {
//     width: 1024,
//     sizes: [400, 700, 650, 450, 600, 600],
//     speeds: [1.5, 0.9, 0.4, 1.8, 1.5, 0.3],
//   },
//   {
//     width: 1440,
//     sizes: [500, 300, 500, 700, 600, 1000],
//     speeds: [1.5, 0.8, 1.6, 0.5, 0.2, 0.3],
//   },
//   {
//     width: Infinity,
//     sizes: [1000, 900, 700, 500, 700, 600],
//     speeds: [2, 2.1, 2, 1.5, 1.8, 2],
//   },
// ];

// function getCircleParameters() {
//   const screenWidth = window.innerWidth;

//   const breakpoint = breakpoints.find((bp) => screenWidth <= bp.width);

//   return breakpoint
//     ? { sizes: breakpoint.sizes, speeds: breakpoint.speeds }
//     : {
//         sizes: breakpoints[breakpoints.length - 1].sizes,
//         speeds: breakpoints[breakpoints.length - 1].speeds,
//       };
// }

// let { sizes, speeds } = getCircleParameters();

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
//   constructor(size, color, speed) {
//     this.size = size;
//     this.x = Math.random() * (ww - size);
//     this.y = Math.random() * (wh - size);
//     this.isMovingRight = Math.random() > 0.5;
//     this.isMovingDown = Math.random() > 0.5;
//     this.speed = speed; // Устанавливаем скорость
//     this.color = color;
//   }

//   draw() {
//     ctx.globalCompositeOperation = "darken";
//     const gradient = ctx.createRadialGradient(
//       this.x + this.size / 2,
//       this.y + this.size / 2,
//       0,
//       this.x + this.size / 2,
//       this.y + this.size / 2,
//       this.size / 2
//     );
//     gradient.addColorStop(0, `rgba(${this.color}, 0.6)`);
//     // gradient.addColorStop(0.3, `rgba(${this.color}, 0.5)`);
//     // gradient.addColorStop(0.7, `rgba(${this.color}, 0.2)`);
//     gradient.addColorStop(1, `rgba(${this.color}, 0)`);

//     ctx.fillStyle = gradient;
//     // ctx.filter = "blur(12px)";

//     ctx.beginPath();
//     ctx.arc(
//       this.x + this.size / 2,
//       this.y + this.size / 2,
//       this.size / 2,
//       0,
//       Math.PI * 2
//     );
//     ctx.fill();

//     ctx.filter = "none";
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

//     this.checkBounds();
//     this.draw();
//   }

//   checkBounds() {
//     if (this.x + this.size > ww) {
//       this.x = ww - this.size;
//       this.isMovingRight = false;
//     } else if (this.x < 0) {
//       this.x = 0;
//       this.isMovingRight = true;
//     }

//     if (this.y + this.size > wh) {
//       this.y = wh - this.size;
//       this.isMovingDown = false;
//     } else if (this.y < 0) {
//       this.y = 0;
//       this.isMovingDown = true;
//     }
//   }
// }

// let circles = [];
// function createCircles() {
//   if (circles.length === 0) {
//     const { sizes, speeds } = getCircleParameters();
//     circles = [];
//     for (let i = 0; i < sizes.length; i++) {
//       circles.push(new Circle(sizes[i], colors[i % colors.length], speeds[i]));
//     }
//   }
// }

// createCircles();

// // function animate() {
// //   if (!isAnimationActive) return;

// //   ctx.clearRect(0, 0, ww, wh);
// //   circles.forEach((circle) => circle.move());
// //   requestAnimationFrame(animate);
// // }

// const animate = (function () {
//   let instance;

//   return function () {
//     if (!instance) {
//       instance = function () {
//         if (!isAnimationActive) return;

//         ctx.clearRect(0, 0, ww, wh);
//         circles.forEach((circle) => circle.move());
//         requestAnimationFrame(animate);
//       };
//     }
//     return instance();
//   };
// })();

// function updateCircleParameters() {
//   const { sizes, speeds } = getCircleParameters();
//   circles.forEach((circle, i) => {
//     circle.size = sizes[i];
//     circle.speed = speeds[i];
//     circle.checkBounds();
//   });
// }

// window.addEventListener("resize", () => {
//   ww = window.innerWidth;
//   wh = window.innerHeight;
//   cnvs.width = ww;
//   cnvs.height = wh;

//   updateCircleParameters();
// });

const cnvs = document.getElementById("cnvs");
const ctx = cnvs.getContext("2d");

// Создание off-screen canvas
const offscreenCanvas = document.createElement("canvas");
const offscreenCtx = offscreenCanvas.getContext("2d");

let ww = window.innerWidth; // Ширина окна
let wh = window.innerHeight; // Высота окна

cnvs.width = ww; // Установка ширины канваса
cnvs.height = wh; // Установка высоты канваса
offscreenCanvas.width = ww;
offscreenCanvas.height = wh;

const colors = [
  "223, 163, 240",
  "38, 223, 253",
  "240, 163, 219",
  "69, 38, 253",
  "38, 115, 253",
  "163, 219, 240",
];

const breakpoints = [
  {
    width: 430,
    sizes: [200, 300, 250, 200, 300, 400],
    speeds: [0.1, 0.2, 0.5, 0.3, 0.4, 0.3],
  },
  {
    width: 768,
    sizes: [400, 500, 450, 300, 550, 300],
    speeds: [1, 0.7, 0.7, 0.9, 1, 0.7],
  },
  {
    width: 1024,
    sizes: [400, 700, 650, 450, 600, 600],
    speeds: [1.2, 0.6, 0.4, 1, 0.8, 0.3],
  },
  {
    width: 1440,
    sizes: [500, 300, 500, 700, 600, 1000],
    speeds: [1.5, 0.8, 1.6, 0.5, 0.2, 0.3],
  },
  {
    width: Infinity,
    sizes: [500, 300, 500, 700, 600, 1000],
    speeds: [1.5, 0.8, 1.6, 0.5, 0.2, 0.3],
  },
];

let circles = [];
let isAnimationActive = true;

// Функция для получения параметров кругов в зависимости от ширины окна
function getCircleParameters() {
  const screenWidth = window.innerWidth;
  const breakpoint = breakpoints.find((bp) => screenWidth <= bp.width);
  return breakpoint
    ? { sizes: breakpoint.sizes.slice(), speeds: breakpoint.speeds.slice() }
    : breakpoints[breakpoints.length - 1];
}

// Функция для создания кругов
function createCircles(sizes = [], speeds = []) {
  circles = sizes.map(
    (size, i) => new Circle(size | 0, colors[i % colors.length], speeds[i])
  );
}

// Класс Circle для представления круга
class Circle {
  constructor(size, color, speed) {
    this.size = size;
    this.x = Math.random() * (ww - size); // Положение по оси X
    this.y = Math.random() * (wh - size); // Положение по оси Y
    this.isMovingRight = Math.random() > 0.5; // Направление движения по оси X
    this.isMovingDown = Math.random() > 0.5; // Направление движения по оси Y
    this.speed = speed; // Скорость движения
    this.color = color; // Цвет круга
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(
      this.x + this.size / 2,
      this.y + this.size / 2,
      0,
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size / 2
    );
    gradient.addColorStop(0, `rgba(${this.color}, 0.6)`);
    gradient.addColorStop(0.9, `rgba(${this.color},0)`);

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
    // Двигаем круги
    this.x += this.isMovingRight ? this.speed : -this.speed;
    this.y += this.isMovingDown ? this.speed : -this.speed;

    // Проверяем границы по оси X
    if (this.x + this.size > ww) {
      this.x = ww - this.size; // Устанавливаем позицию на границе
      this.isMovingRight = false; // Меняем направление
    } else if (this.x < 0) {
      this.x = 0; // Устанавливаем позицию на границе
      this.isMovingRight = true; // Меняем направление
    }

    // Проверяем границы по оси Y
    if (this.y + this.size > wh) {
      this.y = wh - this.size; // Устанавливаем позицию на границе
      this.isMovingDown = false; // Меняем направление
    } else if (this.y < 0) {
      this.y = 0; // Устанавливаем позицию на границе
      this.isMovingDown = true; // Меняем направление
    }
  }
}

function animate() {
  if (!isAnimationActive) return;

  offscreenCtx.clearRect(0, 0, ww, wh);

  // Проверка наличия кругов
  if (circles.length === 0) {
    console.error("No circles to animate");
    return;
  }

  circles.forEach((circle) => {
    circle.move();
    circle.draw(offscreenCtx);
  });

  ctx.clearRect(0, 0, ww, wh);
  ctx.drawImage(offscreenCanvas, 0, 0);

  requestAnimationFrame(animate);
}

function updateCircleParameters() {
  const { sizes: newSizes, speeds: newSpeeds } = getCircleParameters();

  if (newSizes.length !== circles.length) {
    createCircles(newSizes, newSpeeds); // Создаем новые круги
  } else {
    circles.forEach((circle, i) => {
      circle.size = newSizes[i];
      circle.speed = newSpeeds[i];
      circle.move(); // Обновляем положение круга после изменения параметров
    });
  }
}

window.addEventListener("resize", () => {
  ww = window.innerWidth;
  wh = window.innerHeight;

  cnvs.width = ww;
  cnvs.height = wh;

  offscreenCanvas.width = ww;
  offscreenCanvas.height = wh;

  updateCircleParameters();
});

// Инициализация кругов и запуск анимации
createCircles(getCircleParameters().sizes, getCircleParameters().speeds);
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, ww, wh);

export function runAnimation() {
  isAnimationActive = true;
  animate();
}

export function stopAnimation() {
  isAnimationActive = false;
}

// const cnvs = document.getElementById("cnvs");
// const ctx = cnvs.getContext("2d");

// const ww = window.innerWidth;
// const wh = window.innerHeight;

// const minSize = 500; // Минимальный размер круга
// const maxSize = 1000; // Максимальный размер круга

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
// const sizes = [500, 600, 300, 700, 600, 1000];

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
//     this.x = Math.random() * (ww - size);
//     this.y = Math.random() * (wh - size);
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
// for (var i = 0; i < sizes.length; i++) {
//   const size = sizes[i];
//   circles.push(new Circle(size, colors[i % colors.length]));
// }

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
