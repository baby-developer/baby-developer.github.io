'use strict';

// 구현 계획
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver를 사용해서 모든 섹션들을 관찰해야 한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다.
// 보여지는 섹션:
// - 다수의 섹션이 동시에 보여진다면, 가장 첫 번째 섹션을 선택
// - 마지막 contact 섹션이 보여진다면, 가장 마지막 섹션을 선택
const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#work',
  '#testimonials',
  '#contact',
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[href="${id}"]`));

const visibleSections = sectionIds.map(() => false);
let activeNavItem = navItems[0];

const options = {
  rootMargin: '-20% 0px 0px 0px',
  threshold: [0, 0.98], // 가끔씩 1이 안 먹히는 경우가 있다고 한다. 안정적으로 하려면 0.98 이정도로 줄여서 해도 된다고 한다. 근데 지금 현재 케이스에서는 인터섹션이 되어서 콜백함수가 호출되었을 때, intersectionRatio가 0.99보다 크거나 같은 경우 contact 메뉴가 활성화되는 건데... 엘리쌤이 강의에서 [0, 0.98]로 작성했을 때도 contact 메뉴가 잘 활성화되는 것을 볼 수 있었다. 왜 잘 되는 건지 이해가 잘 가질 않는다...ㅠ.ㅠ (활성화가 되지 않아야 하는 게 정상 아닌가..?)
  // +10.11에서 이 부분 언급하셨다! 내가 생각한 게 맞았다~ 지금까지는 버그가 없다 해도 기술적으로는 버그가 충분히 발생할 수 있는 숫자이므로, threshold보다 낮은 숫자로 바꿔주는 게 안전할 것 같다고 하셔서 아래의 entry.intersectionRatio >= 0.99; 부분의 숫자를 0.95로 변경해 주었음~!
};
const observer = new IntersectionObserver(observerCallback, options);
sections.forEach(section => observer.observe(section));

function observerCallback(entries) {
  let selectLastOne; // flag 변수 (뜻: true인지 false인지를 간직할 수 있는~)
  entries.forEach(entry => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;
    selectLastOne =
      index === sectionIds.length - 1 &&
      entry.isIntersecting &&
      entry.intersectionRatio >= 0.95;
  });

  const navIndex = selectLastOne
    ? sectionIds.length - 1
    : findFirstIntersecting(visibleSections);
  selectNavItem(navIndex);
}

function findFirstIntersecting(intersections) {
  const index = intersections.indexOf(true);
  return index >= 0 ? index : 0;
}

function selectNavItem(index) {
  const navItem = navItems[index];
  if (!navItem) return;
  activeNavItem.classList.remove('active');
  activeNavItem = navItem;
  activeNavItem.classList.add('active');
}

/* 솔루션 보기 전에 내가 작성해 본 코드 (@2023/10/11)
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1,
};
const observer = new IntersectionObserver(handleIntersect, options);
const sections = document.querySelectorAll(
  '#home, #about, #skills, #work, #testimonials, #contact'
);
sections.forEach(section => observer.observe(section));

function handleIntersect(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }
    const sectionName = entry.target.dataset.section;
    const activeMenu = document.querySelector('.header__menu__item.active');
    const menu = document.querySelector(`[data-menu=${sectionName}]`);
    activeMenu.classList.remove('active');
    menu.classList.add('active');
    console.log(entry.isIntersecting);
  });
}
*/
