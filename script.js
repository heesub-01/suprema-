

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
const heroBgSwiper = new Swiper(".swiper-container", {
  effect: "fade",
  fadeEffect: { crossFade: true },
  speed: 2000,
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  watchSlidesProgress: true,
  virtualTranslate: true,
});




// 2섹션 배경
gsap.registerPlugin(ScrollTrigger);

document.querySelector(".sec-2-img").style.willChange = "clip-path";

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sec-2",
    start: "top top",
    end: "+=300%",
    scrub: 1.5,
    pin: true,
  }
});

/* 1) 원 확장 */
tl.fromTo(".sec-2-img",
  { clipPath: "circle(100px at 50% 50%)" },
  { clipPath: "circle(120vmax at 50% 50%)", ease: "none", duration: 1 }
);

/* 2) 원이 거의 다 퍼진 후 → 배경 어둡게 */
tl.to(".sec-2-overlay", 
  { opacity: 1, duration: 0.6 },
  ">-0.3" // 약간 겹치게
);

/* 3) 1차 타이틀 사라짐 */
tl.to(".sec-2-title",
  { opacity: 0, y: -40, duration: 0.6 },
  "<"     // overlay와 동시에 진행
);

/* 4) 두번째 콘텐츠 등장 */
tl.to(".sec-2-content",
  { opacity: 1, y: 0, duration: 0.8 },
  ">-0.1"
);


$(function () {

  const option = {
    slidesPerView: 2.2,   // 🔥 핵심: 3보다 작게
    spaceBetween: 32,
    speed: 600,
    observer: true,
    observeParents: true,
  };

  const bioSwiper    = new Swiper(".sec4-bio-swiper", option);
  const rfSwiper     = new Swiper(".sec4-rf-swiper", option);
  const accessSwiper = new Swiper(".sec4-access-swiper", option);

  $(".sec-4 .tab").on("click", function () {
    const target = $(this).data("target");

    $(".sec-4 .tab").removeClass("active");
    $(this).addClass("active");

    $(".sec-4 .swiper-wrap").removeClass("active");
    $("#" + target).addClass("active");

    // 활성 Swiper 강제 갱신
    const sw = $("#" + target).find(".swiper")[0].swiper;
    if (sw) {
      sw.slideTo(0, 0);
      sw.update();
    }
  });

});



AOS.init();

window.addEventListener("load", () => {
  AOS.refreshHard();

  // sec-6 마크 강제 리셋
  document.querySelectorAll(".sec-6-mark").forEach(el => {
    el.classList.remove("aos-animate");
  });

  setTimeout(() => {
    AOS.refresh();
  }, 100);
});


// 뉴스룸섹션 스와이퍼 //
const newsEl = document.querySelector(".newsroom-card-swiper");
if (newsEl) {
  const newsroomSwiper = new Swiper(newsEl, {
    slidesPerView: "auto",
    spaceBetween: 30,
    
    navigation: {
    nextEl: ".newsroom-card-swiper .swiper-button-next",
    prevEl: ".newsroom-card-swiper .swiper-button-prev",
  },
  });
}
