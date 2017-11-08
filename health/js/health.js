'use strict';

var healthyCarousel = function () {

  var nodesArray = itemsContainer.children().toArray().reverse(),
      fullItemHeight = itemHeight + itemMargin * 2,
      j = 0,
      carousel = function () {

        var currentOffset = +(itemsContainer.css('height').slice(0, -2)),
            newOffset = currentOffset + 1;

        itemsContainer.css('height', '' + newOffset + 'px');

        if ( !(currentOffset % (fullItemHeight) ) ) {

          // Todo: РАЗОБРАТЬСЯ С ХРАНЕНИЕМ ЭЛЕМЕНТОВ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // Todo: РАЗОБРАТЬСЯ С ХРАНЕНИЕМ ЭЛЕМЕНТОВ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // Todo: РАЗОБРАТЬСЯ С ХРАНЕНИЕМ ЭЛЕМЕНТОВ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

          if (j > 0) {

            itemsContainer.prepend($(nodesArray[j % itemsNumber]).clone());

            itemsContainer.children().last().remove();

            itemsContainer.css('height', '' + (newOffset - fullItemHeight) + 'px');

          } else {
            // prepending last node at the beginning in the first cycle
            itemsContainer.prepend($(nodesArray[0]).clone());

          }

          j++;

          if (j % itemsNumber === 1) j = 1; // erase counter to prevent huge numbers
        }

      };

  itemsContainer.css({
    height: itemsContainer.height() + (fullItemHeight) + 'px',
    top: '-' + (fullItemHeight) + 'px'
  });

  var interval = setInterval(carousel, 30);

  $('.healthy-bar').on('mouseover', function () {
    clearInterval(interval);
  });
  $('.healthy-bar').on('mouseleave', function () {
    interval = setInterval(carousel, 30);
  });

};

var itemsNumber = $('.healthy-bar-item').length,
    itemsContainer = $('.healthy-bar > div'),
    itemHeight = $('.healthy-bar-item').innerHeight(),
    itemMargin = 6;

if (itemsNumber * (itemMargin * 2 + itemHeight) > window.innerHeight) {

  healthyCarousel();

} else {

  itemsContainer.css({
    top: '50%',
    'margin-top': '-' + itemsContainer.height() / 2 + 'px',
    visibility: 'visible'
  });

}

// NOT USED
// делаем рандомную пульсацию рамки критических элементов
var criticalItemsPulse = function () {

  var i = Math.trunc(Math.random() * 10),
      seedArray = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1];

  if (!seedArray[i]) return;

  var pulseItemIndex = Math.trunc(Math.random() * 4),
      item = $('.red-card')[pulseItemIndex];

  $(item).addClass('pulse-now');
  setTimeout(function () {
    $(item).removeClass('pulse-now');
  }, 2500);

};
// setInterval(criticalItemsPulse, 100);

// функции слайда карточек
var itemSlideOutside = function (item) {
      $(item).removeClass('transporting');
      setTimeout(function () {
        $(item).children().show();
      }, 700);
    },
    itemSlideInside = function (item) {
      setTimeout(function () {
        $(item).addClass('transporting');
      }, 200);
      $(item).children().hide();
    };

// placing background cards
// if background cards number > 4, grouping and cascading
var displayBackgroundCards = function () {

  $.each($('.warning-area .background-cards'), function (i, val) {

    var backgroundArea = $(val),
        cardsArray = backgroundArea.children(),
        cardsNumber = cardsArray.length,
        cardHeight = cardsArray.first().outerHeight(),
        cardOffset = (backgroundArea.height() - cardHeight) / (cardsNumber - 1);

    $.each(cardsArray, function (i, val) {

      if (cardsNumber > 4) {

        $(val).css({
          top: i * cardOffset + (-1) * (i % 3) * 60 + 'px',
          filter: 'blur(' + (cardsNumber - i) + 'px)',
          left: (-1) * (- (i % 3 - 1) ) * 30 + 'px',
          right: (-1) * (i % 3 - 1) * 30 + 'px'
        });

      } else {

        console.log(cardsNumber)

        $(val).css({
          top: i * cardOffset + 'px',
          filter: 'blur(' + (cardsNumber - i) + 'px)'
        });

      }

    });

  });

};

// rendering problematic items inside card
var renderProblematicItems = function (card) {

  var problematicArea = card.find('.problematic-items'),
      problematicItemsArray = problematicArea.children().clone().toArray().reverse(),
      displayArea = card.find('.problematic-items-display'),
      displayAreaHeight = card.height(),
      displayObject = [];

  /////////////
  var tempArray = [],
      tempHeight = 0,
      tempIterator = 1;

  // grouping items for display inside card, based on available height
  while (problematicItemsArray.length > 0) {

    var localItem = $(problematicArea.children().toArray().reverse()[problematicItemsArray.length - 1]),
        addToObject = function (id, data) {
          displayObject.push({
            id: id,
            data: data,
            height: tempHeight
          });
          tempArray = [];
          tempHeight = 0;
          tempIterator++;
        };

    tempHeight += localItem.outerHeight(true);

    if (tempHeight > displayAreaHeight) {
      tempHeight -= localItem.outerHeight(true);
      // добавляем в объект для отображения
      addToObject(tempIterator, tempArray);
      continue;
    }

    tempArray.push(problematicItemsArray.pop());

  }

  if (tempArray.length) {
    addToObject(tempIterator, tempArray);
  }
  /////////////
  tempIterator = 0;

  var problematicItemsCarousel = function () {

    if (!card.parent().length || card.parent().hasClass('background-cards') || displayObject.length < 2 ) {

      displayArea.css({
        top: '50%',
        'margin-top': '-' + (displayObject[0].height / 2) + 'px',
        display: 'block'
      });

      displayArea.html(displayObject[0].data);

      clearInterval(interval);

    } else {

      setTimeout(function () {
        displayArea.fadeOut();
      }, 2500);

      displayArea.html(displayObject[tempIterator].data);

      displayArea.css({
        top: '50%',
        'margin-top': '-' + (displayObject[tempIterator].height / 2) + 'px'
      });

      displayArea.fadeIn();

      tempIterator++;
      if (tempIterator === displayObject.length) {
        tempIterator = 0;
      }
    }

  };

  problematicItemsCarousel(); // first run goes idle for background cards, because of no interval specified to clear
  var interval = setInterval(problematicItemsCarousel, 3000);

};

displayBackgroundCards();
$.each($('.card'), function (i, val) {
  renderProblematicItems($(val));
});


// cards slide functions
var cardIn = function (card, pastCard) {

      pastCard.addClass('card-in');
      $('.warning-area .background-cards').prepend(pastCard);

      pastCard.find('.problematic-items-display').css({
        opacity: 1
      });

      setTimeout(function () {

        displayBackgroundCards();

        renderProblematicItems(pastCard);
        pastCard.removeClass('card-in');

      }, 200);

      card.attr('style', '').addClass('card-in');
      $('.warning-area .foreground-cards').append(card);

      // setTimeout, getting rid of browser css optimizing during reflow
      // 100 === 400ms from slideUp - .3s from css
      setTimeout(function () {

        renderProblematicItems(card);
        card.removeClass('card-in');

      }, 100);

    },
    cardOut = function (card) {

      var pastCard = card.clone();

      card.addClass('card-out');

      card.slideUp(400, function () {
        card.detach();
        card.removeClass('card-out');
      });

      var newCard = $('.warning-area .background-cards').children().last().clone();

      setTimeout(function () {
        $('.warning-area .background-cards').children().last().detach().removeClass('card-out');
      }, 200);
      $('.warning-area .background-cards').children().last().addClass('card-out');

      cardIn(newCard, pastCard);

    };

setInterval(function () {
  var card = $('.warning-area .foreground-cards').children().first();

  cardOut($(card));
}, 6000);