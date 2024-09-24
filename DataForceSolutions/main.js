gsap.registerPlugin(ScrollTrigger);

//lenis

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// cards animation

// const cards = gsap.utils.toArray(".card");

// cards.forEach((card, index) => {
//   const tween = gsap.to(card, {
//     scrollTrigger: {
//       trigger: card,
//       start: () => "top bottom-=100",
//       // end: () => "top top+=40",
//       scrub: true,
//       markers: true,
//       invalidateOnRefresh: true,
//     },
//     ease: "none",
//     scale: () => 1 - (cards.length - index) * 0.025,
//   });
//   let pinEndValue = index === cards.length - 1 ? ".end-anim" : "max";

//   ScrollTrigger.create({
//     trigger: card,
//     start: "top top+=100",
//     pin: true,
//     pinSpacing: false,
//     markers: true,
//     id: "pin",
//     end: pinEndValue,
//     invalidateOnRefresh: true,
//   });
// });

// const tl = gsap.timeline({
//   defaults: {
//     ease: "none",
//   },
//   scrollTrigger: {
//     trigger: ".big-wr",
//     start: "top top",
//     end: `${window.innerHeight * 1} top`,
//     scrub: true,
//     pin: true,
//     markers: true,
//   },
// });

// tl.from(".card:not(:first-child)", {
//   clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
//   duration: 1,
//   stagger: 2,
// });

// tl.to(
//   ".card",
//   {
//     y: 0,
//     duration: 1,
//     stagger: 2,
//   },
//   "<"
// );

// cards.forEach((e, i) => {
//   const card = e;
//   // let scale = 1,
//   //   rotate = 0;

//   // if (i !== cards.length - 1) {
//   //   scale = 0.9 + 0.025 * i;
//   //   rotate = -10;
//   // }

//   gsap.to(card, {
//     // scale: scale,
//     // rotationX: rotate,
//     // transformOrigin: "top center",
//     // ease: "none",
//     scrollTrigger: {
//       trigger: e,
//       // start: "top " + (70 + 40 * i) + "px",
//       start: "top 500px",
//       end: "bottom -100px",
//       endTrigger: ".end-anim",
//       pin: e,
//       pinSpacing: false,
//       scrub: true,
//       markers: true,
//     },
//   });
// });

// gsap.to("#card1", {
//   scrollTrigger: {
//     trigger: ".cards-wrapper",
//     start: "top top",
//     end: "bottom bottom",
//     pin: "#card1",
//     markers: true,
//     scrub: false,
//     toggleActions: "play none none reverse",
//   },
//   y: -700,
//   duration: 1,
//   ease: "none",
// });

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
  duration: 8,
  ease: "none",
  repeat: -1,
  yoyo: true,
  scrollTrigger: {
    trigger: ".workflow",
    start: "top top",
    markers: true,
    toggleActions: "play none resume pause",
  },
});
