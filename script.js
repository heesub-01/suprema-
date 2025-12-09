const header = document.querySelector(".header");
const menuItems = document.querySelectorAll(".menu-item");
const dropdownLayer = document.querySelector(".dropdown-layer");
const dropdownContent = document.querySelectorAll(".dropdown-content");

/* --------------------------------------
   [1] 로고 설정
--------------------------------------- */
const logoImg = document.querySelector(".logo img");
const defaultLogo = "images/logo-img.png";
const hoverLogo = "images/logo-hover.png";

/* --------------------------------------
   [2] 오른쪽 유틸 아이콘 설정 (HTML은 그대로!)
--------------------------------------- */
const iconProcureArrow = document.querySelector(".util-item img");
const iconLangGlobe = document.querySelector(".util-lang img:nth-child(1)");
const iconLangArrow = document.querySelector(".util-lang img:nth-child(3)");
const iconSearch = document.querySelector(".util-search img");

/* 기본 이미지 파일명 */
const defaultProcureArrow = "images/Vector 3 (Stroke).png";
const defaultLangGlobe = "images/free-icon-world-globe.png";
const defaultLangArrow = "images/Vector 3 (Stroke).png";
const defaultSearch = "images/imgi_79_btn_all_search_black.png";

/* hover(드롭다운 오픈) 시 적용할 이미지 파일명 */
const hoverProcureArrow = "images/arrow-black.png";
const hoverLangGlobe = "images/globe-black.png";
const hoverLangArrow = "images/arrow-black.png";
const hoverSearch = "images/search-black.png";

/* --------------------------------------
   [3] 메뉴 hover → 드롭다운 열림
--------------------------------------- */
menuItems.forEach(item => {
  item.addEventListener("mouseenter", () => {
    const target = item.dataset.menu;

    /* 로고 변경 */
    logoImg.src = hoverLogo;

    /* 오른쪽 아이콘 변경 */
    iconProcureArrow.src = hoverProcureArrow;
    iconLangGlobe.src = hoverLangGlobe;
    iconLangArrow.src = hoverLangArrow;
    iconSearch.src = hoverSearch;

    header.classList.add("white");

    dropdownContent.forEach(dc => dc.style.display = "none");
    document.querySelector(`.${target}`).style.display = "flex";

    dropdownLayer.style.maxHeight = "300px";
    dropdownLayer.style.opacity = "1";
    dropdownLayer.style.transform = "translateY(0)";
  });
});


/* --------------------------------------
   [4] 마우스 떠나면 닫기
--------------------------------------- */
header.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!dropdownLayer.matches(":hover")) {
      closeDropdown();
    }
  }, 80);
});

dropdownLayer.addEventListener("mouseleave", closeDropdown);


/* --------------------------------------
   [5] 드롭다운 닫힐 때 상태 복원
--------------------------------------- */
function closeDropdown() {
  header.classList.remove("white");

  dropdownLayer.style.maxHeight = "0";
  dropdownLayer.style.opacity = "0";
  dropdownLayer.style.transform = "translateY(-15px)";

  /* 로고 복원 */
  logoImg.src = defaultLogo;

  /* 오른쪽 아이콘 복원 */
  iconProcureArrow.src = defaultProcureArrow;
  iconLangGlobe.src = defaultLangGlobe;
  iconLangArrow.src = defaultLangArrow;
  iconSearch.src = defaultSearch;
}

// 1섹션 배경 스와이퍼//
const swiper = new Swiper(".swiper-container", {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },

  speed: 2000, // 페이드 길게
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  // 깜빡임 방지 핵심 옵션
  watchSlidesProgress: true,
  virtualTranslate: true,
});




// 2섹션 배경// 
gsap.registerPlugin(ScrollTrigger);

/* 🔥 1) 원 확장 애니메이션 */
gsap.fromTo(".sec-2-img",
  {
    clipPath: "circle(100px at 50% 50%)"   // 시작 크기
  },
  {
    clipPath: "circle(350vmax at 50% 50%)", // ★ 아주 큰 원 → 훨씬 느리게 퍼짐
    ease: "sine.out",                       // ★ 가장 부드러운 감속
    scrollTrigger: {
      trigger: ".sec-2",
      start: "top top",
      end: "+=200%",                        // ★ 섹션 길이 200%
      scrub: 2,                             // ★ 자연스럽게 따라오고 감속됨
      pin: true
    }
  }
);

