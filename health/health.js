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
      problematicItemsArray = problematicArea.children().toArray().reverse(),
      displayArea = card.find('.problematic-items-display'),
      displayAreaHeight = card.height(),
      displayObject = [],
      i = 0;

  /////////////
  var tempArray = [],
      tempHeight = 0,
      tempIterator = 1;

  // grouping items for display inside card, based on available height
  while (problematicItemsArray.length > 0) {
    // console.log(problematicItemsArray.length+ ' '+tempHeight+ ' '+tempArray)

    var localItem = $(problematicItemsArray.slice(-1)),
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

  // console.log(displayObject);
  tempIterator = 0;

  setInterval(function () {

    setTimeout(function () {
      displayArea.fadeOut();
    }, 2500);

    displayArea.html(displayObject[tempIterator].data);

    displayArea.css({
      top: '50%',
      'margin-top': '-' + (displayObject[tempIterator].height / 2) + 'px',
    });

    displayArea.fadeIn();

    tempIterator++;
    if (tempIterator === displayObject.length) {
      tempIterator = 0;
    }

  }, 3000);

};

displayBackgroundCards();
$.each($('.foreground-cards .card'), function (i, val) {
  renderProblematicItems($(val));
});