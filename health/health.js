'use strict';



var healthyCarousel = function () {
    // var moveHealthyItem = function (array) {
    //     array.splice(-1, 1)
    // };
    //
    // var item = $('.healthy-item'),
    //     healthyArray = [];
    //
    // $.each($('.healthy-item'), function (i, val) {
    //     healthyArray.push(val);
    // });
    //
    //
    //
    // console.log(healthyArray);

    var start = $('.hi-1').offset().top;

    $('.healthy-bar').css('top', '-' + start + 'px');

    var carousel = setInterval(function () {
        var currentOffset = $('.healthy-bar').css('top'),
            newOffset = +(currentOffset.slice(0, -2)) + 1;

        $('.healthy-bar').css('top', '' + newOffset + 'px');
        // console.log(newOffset)
    }, 30);

    $('.healthy-bar').on('mouseover', function () {
        clearInterval(carousel);
    });
};

healthyCarousel();

// делаем рандомную пульсацию рамки критических элементов
var criticalItemsPulse = function () {

    var i = Math.trunc(Math.random() * 10),
        seedArray = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1];

    if (!seedArray[i]) return;

    var pulseItemIndex = Math.trunc(Math.random() * 4),
        item = $('.ill-item')[pulseItemIndex];

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