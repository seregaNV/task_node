$(document).ready(function() {

    $('#jquery_myCarouselka').myCarouselka({

        /*picturesList:
        [
            "../img/600x300_1.jpg",
            "../img/600x300_2.jpg",
            "../img/600x300_3.jpg",
            "../img/600x300_4.jpg",
            "../img/600x300_5.jpg",
            "../img/600x300_6.jpg",
            "../img/600x300_7.jpg",
            "../img/600x300_8.jpg",
            "../img/600x300_9.jpg",
            "../img/600x300_10.jpg"
        ], ссилки на фотки*/
        picturesList:
        [
            "../img/img_html.png",
            "../img/img_css.png",
            "../img/img_js.png",
            "../img/img_JQuery.png",
            "../img/img_bootstrap.png"
        ], /*ссилки на фотки*/
        itemWidth: 300, /*ширина одного доданого елемента*/
        itemHeight: 300, /*висота одного доданого елемента*/
        visible: 1, /*видимих елементів*/
        rotateBy: 1, /*по скільки елементів перемотувати*/
        speed: 1000, /*швидкість перемотки (в мс.)*/
        //btnNext: '.next', /*кнопка перемотки до наступного елемента*/
        //btnPrev: '.prev', /*кнопка перемотки до попереднього елемента*/
        //auto: null, /*чяс затримки (в мс.) при автоматичній перемотці*/
        //backSlide: false /*чи буде карусель крутитися в обратну сторону при автоматичній перемотці*/
    });
});


