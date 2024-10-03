// import "./assets/style.css";
// import "./assets/normaize.css";

gsap.registerPlugin(ScrollTrigger);

const sidebar = document.querySelector(".sidebar");
const burger = document.querySelector(".burger");
const menuMobile = document.querySelector(".menu-mobile");
const navLinks = document.querySelectorAll(".menu-mobile .is-active a");
const overlayer = document.querySelector("figure");

//lenis
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// section scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      lenis.scrollTo(target);
    }
  });
});

// blobs animation
document.addEventListener("DOMContentLoaded", () => {
  const interBubble = document.querySelector(".interactive");
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
    curX += (tgX - curX) / 10;
    curY += (tgY - curY) / 10;
    interBubble.style.transform = `translate(${Math.round(
      curX
    )}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(() => {
      move();
    });
  }

  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });

  move();
});

// worflow animation
let path = document.querySelector(".workflow-box svg path");
let length = path.getTotalLength();

path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;

gsap.to(path, {
  strokeDashoffset: 0,
  duration: 6,
  ease: "none",
  repeat: -1,
  repeatDelay: 2,
  yoyo: false,
  scrollTrigger: {
    trigger: ".workflow",
    start: "top top",
    // markers: true,
    toggleActions: "play none resume pause",
  },
});

// borders for bg-animation
gsap.to(".gradient-bg", {
  opacity: 0,
  duration: 0.5,
  scrollTrigger: {
    trigger: "#about-us-section",
    start: "top top",
    end: "top 80%",
    // markers: true,
    onEnter: () => gsap.to(".gradient-bg", { opacity: 0 }),
    onLeaveBack: () => gsap.to(".gradient-bg", { opacity: 1 }),
  },
});

//burger menu

burger.addEventListener("click", () => {
  burger.classList.toggle("is-active");
  menuMobile.classList.toggle("is-active");
  overlayer.classList.toggle("visible");
});

function closeMenu() {
  burger.classList.remove("is-active");
  menuMobile.classList.remove("is-active");
  overlayer.classList.remove("visible");
}

function setupCloseEvents() {
  window.addEventListener("resize", handleCloseOnResize);
  window.addEventListener("keydown", handleCloseOnEscape);
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", handleCloseOnClickOutside);
}

function handleCloseOnResize() {
  if (window.innerWidth > 860) {
    closeMenu();
  }
}

function handleCloseOnEscape(e) {
  if (e.key === "Escape") {
    closeMenu();
  }
}

function handleCloseOnClickOutside(event) {
  if (
    !event.target.closest(".burger") &&
    burger.classList.contains("is-active")
  ) {
    closeMenu();
  }
}

setupCloseEvents();
