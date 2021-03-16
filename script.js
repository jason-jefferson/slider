const createCards = () => {
  var node = document.getElementById('slider');
  let slideCount = node.dataset.slides;
  let cards = '';
  let card =
      '<div class='+'"'+'card'+'"'+ 'data-target='+'"'+'card'+'"'+'>'+
      '<div class='+'"'+'card-image'+'"'+'></div>'+
      '<div class='+'"'+'card-body'+'"'+'>' +
      '<div class='+'"'+'wrapper'+'"'+'>'+
      '<h3>We are Humans</h3>'+
      '<p class='+'"'+'subheader'+'"'+'>What will you find here</p>'+
      '<p>LOERM IPSUM.</p>'+
      '<a href='+'"'+'https://gohenry.com/uk'+'"'+ 'target='+'"'+'_blank'+'"'+'>Learn More</a>'+
      '</div>'+
      '</div>'+
      '</div>';

  for (i = 0; i < slideCount; i++) {
    cards = cards + card;
  };
  node.innerHTML = cards;
}

createCards();

const slider = document.querySelectorAll("[data-target='card-slider']");
const card = slider[0].querySelector("[data-target='card']");
const leftButton = document.querySelectorAll("[data-action='moveLeft']");
const rightButton = document.querySelectorAll("[data-action='moveRight']");

const sliderWidth = slider.offsetWidth;
const cardWidth = card.offsetWidth;
const cardStyle = card.currentStyle || window.getComputedStyle(card)
const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

const cardCount = slider[0].querySelectorAll("[data-target='card']").length;

let offset = [];
let numOfSliders = document.querySelectorAll('.slider').length;
console.log(numOfSliders);
for (let i = 0; i < numOfSliders; i++) {
    offset[i] = 0;
}

const maxX = -((cardCount / 3) * sliderWidth +
               (cardMarginRight * (cardCount / 3)) -
               sliderWidth - cardMarginRight);

leftButton.forEach(function(el){
  el.addEventListener("click", function() {
    let sliderNum = el.closest(".slider").dataset.slider;
    if (offset[sliderNum] !== 0) {
      offset[sliderNum] += cardWidth + cardMarginRight;
      slider[sliderNum].style.transform = `translateX(${offset[sliderNum]}px)`;
    }
    console.log( 'slide1: ' + offset['slider-0']);
    console.log( offset['slider-1']);
  });
});

rightButton.forEach(function(el){
  el.addEventListener("click", function() {
    let sliderNum = el.closest(".slider").dataset.slider;
    if (offset[sliderNum] !== maxX) {
      offset[sliderNum] -= cardWidth + cardMarginRight;
      slider[sliderNum].style.transform = `translateX(${offset[sliderNum]}px)`;
    }
  });
});
