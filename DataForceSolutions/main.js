const sidebar = document.querySelector(".sidebar");
const burger = document.querySelector(".burger");
const menuMobile = document.querySelector(".menu-mobile");
const navLinks = document.querySelectorAll(".menu-mobile .is-active a");
const overlayer = document.querySelector("figure");

//burger menu

document.addEventListener("DOMContentLoaded", () => {
  const menuMobile = document.querySelector(".menu-mobile");
  menuMobile.classList.remove("hidden-on-load");
});

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

//cookies banner

document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".cookies");
  const closeBtn = document.getElementById("cookies-btn-close");

  if (!banner || !closeBtn) {
    console.warn("Cookies banner or close button not found.");
    return;
  }

  const DAYS_TO_KEEP_BANNER = 30;
  const cookieBannerCloseDate = localStorage.getItem("bannerCloseDate");

  if (cookieBannerCloseDate) {
    const closeDate = new Date(cookieBannerCloseDate);
    const now = new Date();
    const diffInDays = (now - closeDate) / (1000 * 60 * 60 * 24);

    if (diffInDays > DAYS_TO_KEEP_BANNER) {
      banner.classList.add("cookies-active");
    } else {
      banner.classList.add("cookies-hide");
    }
  } else {
    banner.classList.add("cookies-active");
  }

  closeBtn.addEventListener("click", function () {
    banner.classList.remove("cookies-active");
    banner.classList.add("cookies-hide");
    localStorage.setItem("bannerCloseDate", new Date().toISOString());
  });
});
