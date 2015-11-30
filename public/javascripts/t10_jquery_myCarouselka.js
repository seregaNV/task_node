"use strict";
$(document).ready(function() {

});

(function($){

    $.fn.myCarouselka = function(options){

        var settings = {
            visible: 3, /*видимих елементів - 3*/
            rotateBy: 1, /*перемотувати по одному елементі*/
            speed: 500, /*швидкість перемотки (в мс.)*/
            btnNext: '.next', /*кнопка перемотки до наступного елемента*/
            btnPrev: '.prev', /*кнопка перемотки до попереднього елемента*/
            auto: null, /*чяс затримки (в мс.) при автоматичній перемотці*/
            backSlide: false, /*чи буде карусель крутитися в обратну сторону при автоматичній перемотці*/
            itemWidth: 100, /*ширина одного доданого елемента*/
            itemHeight: 100, /*висота одного доданого елемента*/
            picturesList: []
        };

        return this.each(function(){

//????????????????????????????????????????????????????????????????????? ok
            if(options)$.extend(settings, options);
            var $this = $(this),
                $js_carousel,
                $js_control,
                $js_faIcons,
                itemsTotal = settings.picturesList.length,
                running = false,
                intID = null,
                numberActiveIcons = 1;

            function addCarouselElements(){
//????????????????????????????????????????????????????????????????????? єслі условія прості, то це лишні пєрємєнні
                var i,
                    quantity = itemsTotal;
                $this.append('<ul id="js_carousel"></ul>');
                $js_carousel = $this.children('#js_carousel');
                $this.append('<div id="js_control"></div>');
                $js_control = $this.children('#js_control');
                for (i = 0; i < quantity; i++){
                    $js_carousel.append('<li id="js_picture'+(i+1)+'" class="js_imgContainer"><img src=' + settings.picturesList[i] + '></li>');
                };
//?????????????????????????????????????????????????????????????????????? лучше перенести в окрему функцію
                $this.css({
                    'position': 'relative',
                    'overflow': 'hidden',
                    'width': settings.visible*settings.itemWidth + 'px',
                    'margin-left': ($this.parent().width()-settings.visible*settings.itemWidth)/2 + 'px'
                });
                $js_carousel.css({
                    'position': 'relative',
                    'width': (itemsTotal * settings.itemWidth * 2) + 'px',
                    'left': 0,
                    'margin': 0,
                    'padding': 0,
                    'list-style': 'none'
                });
                $js_carousel.children().css({
                    'float': 'left'
                });
            };

            function addControlContainer(){
                $js_control.append('<button type="button" class="prev btn btn-link"><i class="fa fa-chevron-left fa-2x"></i></button>');
                $js_control.append('<button type="button" class="next btn btn-link"><i class="fa fa-chevron-right fa-2x"></i></button>');
                $js_control.append('<span id="js_faIcons"></span>');
                $js_faIcons = $js_control.children('#js_faIcons');
                $js_control.children('.next, .prev').css({
                    'position': 'absolute',
                    'height': settings.itemHeight + 'px',
                    'width': (settings.itemWidth*settings.visible*0.2) + 'px',
                    'outline': 'none'
                });
                $js_control.children('.prev').css({
                    'left': 0 + 'px',
                    'border': 0
                });
                $js_control.children('.next').css({
                    'left': (settings.itemWidth*settings.visible*0.8) + 'px',
                    'border': 0
                });
            };

            function addControlIcons(){
                var i,
                    quantity = itemsTotal;
                for (i = 0; i < quantity; i++){
                    $js_faIcons.append('<a href="#"><i id="js_indication'+(i+1)+'" class="fa fa-circle-o fa-2x"></i></a>');
                };
                $js_faIcons.css({
                    'position': 'relative',
                    'top': -30 + 'px',
//???????????????????????????????????????????????????????????????????
                    'left': ((settings.itemWidth*settings.visible) - itemsTotal * 24)/2 + 'px'
                });
                startActiveIndication();
            };

            function startActiveIndication(){
                var i,
                    quantity = settings.visible;
                for (i = 0; i < quantity; i++){
                    $('#js_indication' + (i+1)).switchClass('fa-circle-o', 'fa-dot-circle-o');
                };
            };

            function checkingQuantityElements(){
                addCarouselElements();
                if(itemsTotal > settings.visible){
                    addControlContainer();
                    if(itemsTotal <= Math.floor(settings.itemWidth*settings.visible/24)-1){
                        addControlIcons();
                    }else{
                        console.log('Кількість іконок індикації більша, ніж може поміститись в видимій чястині каруселі. Іконки деактивовано!');
                    };
                }else{
                    console.log('Кількість елементів каруселі однакова з кількістью видимих елементів. Кнопки і іконки деактивовано!');
                };
            };

            function changeActiveIcons(){
                var i,
                    activeIconsId,
                    quantity = itemsTotal;
                for(i = 1; i < quantity+1; i++){
                    $('#js_indication' + i).removeClass();
                    if($('#js_picture' + i).hasClass('js_activeL10')){
                        $('#js_indication' + i).addClass('fa fa-dot-circle-o fa-2x');
                    }else{
                        $('#js_indication' + i).addClass('fa fa-circle-o fa-2x');
                    };
                };
                activeIconsId = $js_carousel.find('.js_activeL10:first').attr('id');
                numberActiveIcons = Number(activeIconsId.replace(/\D+/g,''));
            };

            function slide(dir, rotate){
                var direction = dir ? 1 : -1,
                    leftIndent = 0;
                if(!running){
                    running = true;
                    if(intID)clearInterval(intID);
                    if(dir){
                        $js_carousel.children(':first').before($js_carousel.children().slice(itemsTotal - rotate, itemsTotal).clone(true));
                        $js_carousel.css('left', -settings.itemWidth * rotate + 'px');
                    }else{
                        $js_carousel.children(':last').after($js_carousel.children().slice(0, rotate).clone(true));

                    };
                    leftIndent = parseInt($js_carousel.css('left')) + (settings.itemWidth * rotate * direction);
                    $js_carousel.animate({'left': leftIndent}, {queue: false, duration: settings.speed, easing: "easeOutBounce", complete: function(){
                        if(dir){
                            $js_carousel.children().slice(itemsTotal, itemsTotal + rotate).remove();
                        }else{
                            $js_carousel.find('li').slice(0, rotate).remove();

                            /*встановлюємо здвиг в "0"*/
                            $js_carousel.css('left', 0);
                        };
                        $js_carousel.find('li').slice(0, settings.visible).addClass("js_activeL10");
                        changeActiveIcons();
                        $js_carousel.find('li').slice(0, settings.visible).removeClass("js_activeL10");
                        if(settings.auto){
                            intID = setInterval(function(){
                                slide(settings.backSlide, rotate);
                            }, settings.auto);
                        };
                        running = false;
                    }});
                };
                return false;
            };

            checkingQuantityElements();

            $(settings.btnNext).on('click', function(e){
                return slide(false, settings.rotateBy);
            });

            $(settings.btnPrev).on('click', function(e){
                return slide(true, settings.rotateBy);
            });

            $(settings.btnNext).hover(
                function(){
                    var btnWidth = ($(settings.btnNext).width()+24);
                    $(this).css({'box-shadow': 'inset -' + btnWidth/2 + 'px 0 ' + btnWidth/1.5 + 'px -' + btnWidth/3 + 'px #eee'});
                },
                function(){
                    $(this).css({'box-shadow': ''});
                }
            );

            $(settings.btnPrev).hover(
                function(){
                    var btnWidth = ($(settings.btnPrev).width()+24);
                    $(this).css({'box-shadow': 'inset ' + btnWidth/2 + 'px 0 ' + btnWidth/1.5 + 'px -' + btnWidth/3 + 'px #eee'});
                },
                function(){
                    $(this).css({'box-shadow': ''});
                }
            );

            $js_faIcons.on('click', function(e){
                var direction,
                    quantityOfSteps,
                    numberOfId = Number(event.target.id.replace(/\D+/g,''));
                if(numberOfId > numberActiveIcons){
                    direction = false;
                    quantityOfSteps = numberOfId - numberActiveIcons;
                    return slide(direction, quantityOfSteps);
                }else if(numberOfId < numberActiveIcons){
                    direction = true;
                    quantityOfSteps = numberActiveIcons - numberOfId;
                    return slide(direction, quantityOfSteps);
                };
            });

            if(settings.auto){
                intID = setInterval(function(){
                    slide(settings.backSlide, settings.rotateBy);
                }, settings.auto);
            };
        });
    };
})(jQuery);