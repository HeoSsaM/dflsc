//submenu
document.addEventListener("DOMContentLoaded", function () {
  const mypage = document.querySelector(".mypage");
  const btnMypage = mypage.querySelector(".btnMypage");
  const subMenu = mypage.querySelector(".sub-menu");

  btnMypage.addEventListener("click", function (e) {
    e.preventDefault(); // 링크 이동 방지
    subMenu.classList.toggle("active");
  });

  // 화면 다른 곳 클릭 시 메뉴 닫기 (선택사항)
  document.addEventListener("click", function (e) {
    if (!mypage.contains(e.target)) {
      subMenu.classList.remove("active");
    }
  });
});

/* ============================================
   대학 로고 자동 생성
============================================ */
function initCollegeLogos() {
  const collegeUl = document.querySelector(".logos.college_logo");
  if (!collegeUl) return; // 요소 없으면 종료

  for (let i = 1; i <= 24; i++) {
    const num = i.toString().padStart(2, "0");
    const li = document.createElement("li");
    const img = document.createElement("img");

    img.src = `img/logo/college/logo-collegte_${num}.png`;
    img.alt = `로고 ${num}`;

    li.appendChild(img);
    collegeUl.appendChild(li);
  }
}

/* ============================================
   기업 로고 자동 생성
============================================ */
function initCompanyLogos() {
  const companyUl = document.querySelector(".logos.company_logo");
  if (!companyUl) return; // 요소 없으면 종료

  for (let i = 1; i <= 20; i++) {
    const num = i.toString().padStart(2, "0");
    const li = document.createElement("li");
    const img = document.createElement("img");

    img.src = `img/logo/company/logo_com_${num}.png`;
    img.alt = `로고 ${num}`;

    li.appendChild(img);
    companyUl.appendChild(li);
  }
}

/* ============================================
   TOPIK 탭 메뉴
============================================ */
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  // 탭 요소가 없는 페이지면 바로 종료
  if (tabButtons.length === 0 || tabContents.length === 0) return;

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const targetId = this.dataset.tab;

      // 1) 버튼 active 제거
      tabButtons.forEach(function (b) {
        b.classList.remove("active");
      });
      this.classList.add("active");

      // 2) 내용 active 제거
      tabContents.forEach(function (content) {
        content.classList.remove("active");
      });

      // 3) 연결된 탭 콘텐트만 활성화
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

/* ============================================
   모든 기능 실행
============================================ */
document.addEventListener("DOMContentLoaded", function () {
  initCollegeLogos();
  initCompanyLogos();
  initTabs();
});

//메인 특장점 타이틀 영역
const $secPoints = document.querySelectorAll(".points-list .title");
console.log($secPoints);

$secPoints.forEach((title) => {
  console.log(title);
  title.classList.remove("blind");
});

//모바일 메뉴
document.addEventListener("DOMContentLoaded", () => {
  const btnMobile = document.querySelector(".btnMobile");
  const btnMypage = document.querySelector(".m-header .btnMypage");
  const mNav = document.querySelector(".m-nav");
  const dim = document.querySelector(".dim");

  if (!mNav || !dim) {
    console.warn("필수 요소(.m-nav, .dim) 없음");
    return;
  }

  // 1) 모바일 nav 상단바(로고+닫기) 없으면 생성
  function ensureNavHeader() {
    if (mNav.querySelector(".m-nav-head")) return;

    const head = document.createElement("div");
    head.className = "m-nav-head";
    head.innerHTML = `
      <button type="button" class="btnClose" aria-label="메뉴 닫기">✕</button>
      <a href="index.html" class="m-nav-logo" aria-label="홈으로 이동"></a>
    `;
    mNav.prepend(head);

    head.querySelector(".btnClose").addEventListener("click", closeNav);
  }

  function openNav() {
    ensureNavHeader();
    mNav.classList.add("open");               // ✅ CSS: .m-nav.open
    mNav.setAttribute("aria-hidden", "false");
    dim.hidden = false;                       // ✅ CSS: .dim[hidden]
    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    mNav.classList.remove("open");
    mNav.setAttribute("aria-hidden", "true");
    dim.hidden = true;
    document.body.style.overflow = "";

    // 메뉴 닫을 때 서브메뉴도 같이 닫고 싶으면(원하면 유지)
    mNav.querySelectorAll(".sub-menu.active").forEach((ul) => {
      ul.classList.remove("active");
    });
  }

  // 햄버거 → 열기
  if (btnMobile) {
    btnMobile.addEventListener("click", (e) => {
      e.preventDefault();
      openNav();
    });
  }

  // 오른쪽 마이페이지 → 열기
  if (btnMypage) {
    btnMypage.addEventListener("click", (e) => {
      e.preventDefault();
      openNav();
    });
  }

  // dim 클릭 → 닫기
  dim.addEventListener("click", closeNav);

  // ESC → 닫기
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mNav.classList.contains("open")) closeNav();
  });

  // 2) 모바일 nav 내부 "마이페이지" 서브메뉴 토글
  // (현재 HTML에서 m-nav 안의 .m-mypage > .sub-menu 를 토글)
  /* const mypageTitle = mNav.querySelector(".m-mypage strong");
  const mypageSub = mNav.querySelector(".m-mypage .sub-menu");

  if (mypageTitle && mypageSub) {
    mypageTitle.style.cursor = "pointer"; // CSS 수정 없이 클릭 가능하게
    mypageTitle.addEventListener("click", () => {
      mypageSub.classList.toggle("active"); // ✅ CSS: .sub-menu.active
    });
  } */
});
// thead의 th 텍스트를 읽어서 각 td에 data-label 붙이기
  (function () {
    const table = document.querySelector('.toeic-exam');
    if (!table) return;

    const headers = Array.from(table.querySelectorAll('thead th')).map(th =>
      th.innerText.replace(/\s+/g, ' ').trim()
    );

    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(tr => {
      const tds = Array.from(tr.children).filter(el => el.tagName === 'TD');

      tds.forEach(td => {
        if (td.classList.contains('title')) return;
        if (td.hasAttribute('rowspan')) return;

      });

      const visibleTds = tds.filter(td => !td.classList.contains('title') && !td.hasAttribute('rowspan'));
      const labels = [headers[1], headers[2], headers[3]]; // 문제 유형, 시간, 문제수

      visibleTds.forEach((td, i) => {
        td.setAttribute('data-label', labels[i] || '');
      });
    });
<<<<<<< HEAD
  })();
=======
  })();

  var swiper = new Swiper(".notice-banner", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
>>>>>>> 657034d (mypage/notice area 수정)
