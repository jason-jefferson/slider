const createCards = (data) => {
  let nodes = document.querySelectorAll('.slider');
  for (i = 0; i < nodes; i++) {
    let node = nodes[0];
    let slideCount = node.dataset.slides;
    const cardData = data['cards'];
    let cards = '';

    for (i = 0; i < slideCount; i++) {
      let card =
          '<div class='+'"'+'card'+'"'+ 'data-target='+'"'+'card'+'"'+'>'+
          '<div class='+'"'+'card-image'+'"'+' style='+'"background-image: url('+cardData[i].image_url+')"'+'></div>'+
          '<div class='+'"'+'card-body'+'"'+'>' +
          '<div class='+'"'+'wrapper'+'"'+'>'+
          '<h3>'+cardData[i].title+'</h3>'+
          '<p class='+'"'+'subheader'+'"'+'>'+cardData[i].subtitle+'</p>'+
          '<p>'+cardData[i].text+'</p>'+
          '<a href='+'"'+'https://gohenry.com/uk'+'"'+ 'target='+'"'+'_blank'+'"'+'>Learn More</a>'+
          '</div>'+
          '</div>'+
          '</div>';
      cards = cards + card;
    };
    node.innerHTML = cards;
  };
}

const initSlider = () => {
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

}

let requestURL = './db.json'
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  const dbCards = request.response;
  console.log(dbCards);
  createCards(dbCards);
  initSlider();
}
