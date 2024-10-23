const workflow = document.querySelector(".workflow");
const mainArrow = document.querySelector(".main-arrow");

let path = mainArrow.querySelector("svg path");
let length = path.getTotalLength();

console.log(length);

// path.style.strokeDashoffset = length;
path.style.strokeDasharray = length;

const arrowObserver = new IntersectionObserver(
  (entries) => {
    mainArrow.classList.toggle("stop-animation", !entries[0].isIntersecting);
  },
  { threshold: 0.0 }
);

arrowObserver.observe(workflow);
