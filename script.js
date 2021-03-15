const slider = document.querySelector("[data-target='card-slider']");
const card = slider.querySelector("[data-target='card']");
const leftButton = document.querySelector("[data-action='moveLeft']");
const rightButton = document.querySelector("[data-action='moveRight']");

const sliderWidth = slider.offsetWidth;
const cardWidth = card.offsetWidth;
const cardStyle = card.currentStyle || window.getComputedStyle(card)
const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

const cardCount = slider.querySelectorAll("[data-target='card']").length;

let offset = 0;
const maxX = -((cardCount / 3) * sliderWidth + 
               (cardMarginRight * (cardCount / 3)) - 
               sliderWidth - cardMarginRight);

leftButton.addEventListener("click", function() {
  if (offset !== 0) {
    offset += cardWidth + cardMarginRight;
    slider.style.transform = `translateX(${offset}px)`;
    }
})
  
rightButton.addEventListener("click", function() {
  if (offset !== maxX) {
    offset -= cardWidth + cardMarginRight;
    slider.style.transform = `translateX(${offset}px)`;
  }
})