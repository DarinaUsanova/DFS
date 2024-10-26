const burger = document.querySelector(".burger");
const menuMobile = document.querySelector(".menu-mobile");
const overlayer = document.querySelector("figure");
const navLinks = document.querySelectorAll(".menu-mobile a");

document.addEventListener("DOMContentLoaded", () => {
  menuMobile.classList.remove("hidden-on-load");
});

// Обработчик клика для бургера
burger.addEventListener("click", () => {
  if (!menuMobile.classList.contains("is-active")) {
    // Показать меню и активировать бургер
    menuMobile.style.display = "flex";
    setTimeout(() => {
      menuMobile.classList.add("is-active");
      burger.classList.add("is-active");
      overlayer.classList.add("visible");
    }, 50);
  } else {
    // Скрыть меню
    closeMenu();
  }
});

function closeMenu() {
  // Удалить класс is-active и скрыть overlayer
  menuMobile.classList.remove("is-active");
  burger.classList.remove("is-active");
  overlayer.classList.remove("visible");

  // Скрыть display после завершения анимации
  menuMobile.addEventListener(
    "transitionend",
    () => {
      if (!menuMobile.classList.contains("is-active")) {
        menuMobile.style.display = "none";
      }
    },
    { once: true }
  );
}

// Дополнительные события для закрытия меню
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

// Вызов функции для установки событий закрытия
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
