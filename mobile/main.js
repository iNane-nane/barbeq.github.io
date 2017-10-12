'use strict';

var swipeBody = new Hammer(document.body);

swipeBody.on('panend', function(e) {
    // $('.topbar').toggle();
    console.log(e)
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

console.log(menuJSON);