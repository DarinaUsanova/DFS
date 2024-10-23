import { runAnimation, stopAnimation } from "/blob.js";

const cnvs = document.getElementById("cnvs");
const bgVisibilityWrapper = document.querySelector(".bg-visibility-wrapper");

const gradientBg = document.querySelector(".gradient-bg");

cnvs.addEventListener("transitionend", (e) => {
  if (e.target.style.opacity === "0") stopAnimation();
});

runAnimation();
const bgObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (!entry.isIntersecting) {
      cnvs.style.opacity = 0;
      gradientBg.style.display = "none";
    } else {
      runAnimation();
      cnvs.style.opacity = 1;
      gradientBg.style.display = "block";
    }
  },
  { threshold: 0.0 }
);

bgObserver.observe(bgVisibilityWrapper);
