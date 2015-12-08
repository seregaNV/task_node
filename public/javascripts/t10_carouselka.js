"use strict";
$(document).ready(function() {

    $('#js_t10_myCarouselka').myCarouselka({

        /*picturesList:
        [
             "images/600x300_1.jpg",
             "images/600x300_2.jpg",
             "images/600x300_3.jpg",
             "images/600x300_4.jpg",
             "images/600x300_5.jpg",
             "images/600x300_6.jpg",
             "images/600x300_7.jpg",
             "images/600x300_8.jpg",
             "images/600x300_9.jpg",
             "images/600x300_10.jpg"
        ], ссилки на фотки*/
        picturesList:
        [
            "images/img_html.png",
            "images/img_css.png",
            "images/img_js.png",
            "images/img_JQuery.png",
            "images/img_bootstrap.png"
        ], /*ссилки на фотки*/
        itemWidth: 300, /*ширина одного доданого елемента*/
        itemHeight: 300, /*висота одного доданого елемента*/
        visible: 1, /*видимих елементів*/
        rotateBy: 1, /*по скільки елементів перемотувати*/
        speed: 1000 /*швидкість перемотки (в мс.)*/
        //btnNext: '.next', /*кнопка перемотки до наступного елемента*/
        //btnPrev: '.prev', /*кнопка перемотки до попереднього елемента*/
        //auto: null, /*чяс затримки (в мс.) при автоматичній перемотці*/
        //backSlide: false /*чи буде карусель крутитися в обратну сторону при автоматичній перемотці*/
    });
});


