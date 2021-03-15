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
