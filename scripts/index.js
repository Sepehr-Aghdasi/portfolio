const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["برنامه نویس", "فرانت اند دولوپر", "طراح سایت"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

const main = document.querySelector(".main");
const sidebar = document.querySelector(".sidebar");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const backToUpBtn = document.querySelector(".arrow-up");
let pageWidth;

// Active class for sidebar items
const sidebarLinks = document.querySelectorAll(".sidebar li");
const portfolioContainer = document.querySelector(".portfolio-container");

// portfolio
const portfolioButtons = document.querySelectorAll(".portfolio button");

// Typing Effect
function type() {
      if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
      } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
      }
}
function erase() {
      if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
      } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
      }
}
document.addEventListener("DOMContentLoaded", function () {
      // On DOM Load initiate the effect
      if (textArray.length) setTimeout(type, newTextDelay + 250);
});

mobileNavToggle.addEventListener("click", () => {
      mobileNavToggle.classList.toggle("rotate");
      sidebar.classList.toggle("sidebar-close");
});

const getBrowserWidthSize = () => {
      pageWidth = document.body.clientWidth;
      // console.log("Client page size: " + pageWidth);
      closeSidebarOnMobile();
};
window.onload = getBrowserWidthSize;
window.onresize = getBrowserWidthSize;

const closeSidebarOnMobile = () => {
      if (pageWidth < 950) {
            sidebar.classList.add("sidebar-close");
            main.addEventListener("click", () => {
                  if (sidebar.classList.contains("sidebar-close") === false) {
                        sidebar.classList.add("sidebar-close");
                        mobileNavToggle.classList.remove("rotate");
                  }
            });
      }
};

// back to up function
const backToUp = () => {
      let y = window.scrollY;
      if (y > 150) {
            backToUpBtn.classList.add("active");
            backToUpBtn.classList.remove("hide-animation");
      } else {
            // backToUpBtn.classList.replace("active","hide-animation");
            backToUpBtn.classList.remove("active");
            backToUpBtn.classList.add("hide-animation");
      }
      backToUpBtn.addEventListener("click", () => {
            window.scrollTo(0, 0);
      });
};
window.addEventListener("scroll", backToUp);

function switchActiveClass() {
      sidebarLinks.forEach((element) => {
            element.classList.remove("active");
            this.classList.add("active");
      });
}
sidebarLinks.forEach((element) => {
      element.addEventListener("click", switchActiveClass);
});

// portfolio area
window.addEventListener("load", () => {
      portfolioButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                  const buttonDataId = btn.getAttribute("data-id");
                  updateDisplay(portfolioObject, buttonDataId);
            });
            updateDisplay(portfolioObject);
      });
});
const updateDisplay = (data, category = "all") => {
      let display = "";
      console.log("data enter=> ", data, "category enter=> ", category);
      for (let i = 0; i < data.length; i++) {
            const portfolioError = document.querySelector(".portfolio-container-error");
            let item = data[i];
            let pageTarget = "_blank";
            if (data[i]["category"] == category || category == "all") {
                  portfolioError.style.display = "none";
                  display += `<div class="col-lg-6 col-12 portfolio-wrap"
                  data-aos="zoom-in"
                  data-aos-delay="400"
                  data-aos-duration="1000"
                  >
                  <a href="${item.link}" target="${pageTarget}">
                  <img class="col-12" src="${item.image}" alt="${item.enTitle}">
                  </a>
                  </div>`;
                  if (item.link === null) {
                        item.link = "javascript:void(0);";
                  }
                  // <iframe src="${item.link}" title="${item.faTitle}" width="100%" height="100%"></iframe>
            } else {
                  portfolioError.style.display = "flex";
                  let categoryPersianName = "";
                  switch (category) {
                        case "all":
                              categoryPersianName = "همه";
                              break;
                        case "online":
                              categoryPersianName = "آنلاین";
                              break;
                        case "github":
                              categoryPersianName = "گیت هاب";
                              break;
                        case "web":
                              categoryPersianName = "وب";
                              break;
                  }
                  portfolioError.innerHTML =
                        "نمونه کاری در دسته بندی <strong>&nbsp; " +
                        categoryPersianName +
                        "&nbsp;</strong> یافت نشد!";
            }
      }
      portfolioContainer.innerHTML = display;
};
