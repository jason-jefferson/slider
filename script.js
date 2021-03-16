const createCards = (data) => {
  let nodes = document.querySelectorAll('#slider');
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    let slideCount = node.dataset.slides;
    const cardData = data['cards'];
    let cards = '';

    for (let j = 0; j < slideCount; j++) {
      let card =
          '<div class='+'"'+'card'+'"'+ 'data-target='+'"'+'card'+'"'+'>'+
          '<div class='+'"'+'card-image'+'"'+' style='+'"background-image: url('+cardData[j].image_url+')"'+'></div>'+
          '<div class='+'"'+'card-body'+'"'+'>' +
          '<div class='+'"'+'wrapper'+'"'+'>'+
          '<div class="header-wrap">'+
          '<span class="logo"></span>'+
          '<div class="title">'+
          '<h3>'+cardData[j].title+'</h3>'+
          '<p class='+'"'+'subheader'+'"'+'>'+cardData[j].subtitle+'</p>'+
          '</div>'+
          '</div>'+
          '<p>'+cardData[j].text+'</p>'+
          '<a href='+'"'+'https://gohenry.com/uk'+'"'+ 'target='+'"'+'_blank'+'"'+'>Learn More</a>'+
          '</div>'+
          '</div>'+
          '</div>';
      cards = cards + card;
    }
    node.innerHTML = cards;
  }
}

const initSlider = () => {
  const slider = document.querySelectorAll("[data-target='card-slider']");
  const card = slider[0].querySelector("[data-target='card']");
  const leftButton = document.querySelectorAll("[data-action='moveLeft']");
  const rightButton = document.querySelectorAll("[data-action='moveRight']");

  const sliderWidth = slider[0].offsetWidth;
  const cardWidth = card.offsetWidth;
  const cardStyle = card.currentStyle || window.getComputedStyle(card)
  const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

  //const cardCount = slider[0].querySelectorAll("[data-target='card']").length;

  let offset = [];
  let numOfSliders = document.querySelectorAll('.slider').length;
  for (let i = 0; i < numOfSliders; i++) {
      offset[i] = 0;
  }

  let limit = [];
  let screenSize = window.screen.width;
  let cardsPerPage;
  if (screenSize <= 500){
    cardsPerPage = 1;
  } else if (screenSize <= 976) {
    cardsPerPage = 2;
  } else {
    cardsPerPage = 3;
  }
  for (let i = 0; i < numOfSliders; i++) {
    limit[i] = -((slider[i].querySelectorAll("[data-target='card']").length / cardsPerPage)
                 * sliderWidth + (cardMarginRight * (slider[i].querySelectorAll("[data-target='card']").length / 3)) -
                 sliderWidth - cardMarginRight);
  }


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
    if (offset[sliderNum] > limit[sliderNum]) {
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
