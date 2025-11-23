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
