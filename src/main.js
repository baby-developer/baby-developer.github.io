'use strict';

// 페이지 아래로 스크롤 시 Header에 다크 스타일링 적용
const header = document.querySelector('.header');
const headerHeight = header.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > headerHeight) {
    header.classList.add('header--dark');
  } else {
    header.classList.remove('header--dark');
  }
});

// 페이지 아래로 스크롤 시 Home 섹션을 투명하게 처리
const home = document.querySelector('.home__container');
const homeHeight = home.offsetHeight;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 페이지 아래로 스크롤 시 Arrow up 버튼을 보이도록 함
const arrowUpButton = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUpButton.style.opacity = 1;
  } else {
    arrowUpButton.style.opacity = 0;
  }
});
