'use strict';

var swipeBody = new Hammer.Manager(document.body, {});

swipeBody.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0}) );

swipeBody.on('panend', function(e) {
    if (e.additionalEvent === 'panright') {
        $('.topbar').animate({
            position: 'static',
            left: '0'
        }, 500);
    }
    if (e.additionalEvent === 'panleft') {
        $('.topbar').animate({
            position: 'absolute',
            left: '-100%'
        }, 500);
    }
});

var menuJSON = {
    dashboard: {
        name: 'Дашборд'
    },
    billing: {
        name: 'Биллинг',
        content: {
            service: {
                name: 'Услуги'
            },
            stats: {
                name: 'Статистика'
            },
            bills: {
                name: 'Счета и платежи'
            },
            docs: {
                name: 'Документы'
            },
            feedback: {
                name: 'Обратная связь'
            }
        }
    },
    settings: {
        name: 'Телефония'
    },
    vats: {
        name: 'ВАТС'
    }
};