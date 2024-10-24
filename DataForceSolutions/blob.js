const cnvs = document.getElementById("cnvs");
const ctx = cnvs.getContext("2d");

let ww = window.innerWidth; // Ширина окна
let wh = window.innerHeight; // Высота окна

cnvs.width = ww; // Установка ширины канваса
cnvs.height = wh; // Установка высоты канваса

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
    sizes: [600, 300, 900, 700, 600, 1000],
    speeds: [1.5, 0.8, 1.6, 0.5, 0.2, 0.3],
  },
];

let circles = [];
let isAnimationActive = true;
let activeInstances = 0;

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

let raf;
function animate() {
  if (!isAnimationActive) return;

  ctx.clearRect(0, 0, ww, wh);

  // Проверка наличия кругов
  if (circles.length === 0) {
    console.error("No circles to animate");
    return;
  }

  circles.forEach((circle) => {
    circle.move();
    circle.draw(ctx);
  });

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

  updateCircleParameters();
});

// Инициализация кругов и запуск анимации
createCircles(getCircleParameters().sizes, getCircleParameters().speeds);
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, ww, wh);

export function runAnimation() {
  isAnimationActive = true;
  raf = requestAnimationFrame(animate);
  animate();
}

export function stopAnimation() {
  raf = cancelAnimationFrame(raf);
  isAnimationActive = false;
}
