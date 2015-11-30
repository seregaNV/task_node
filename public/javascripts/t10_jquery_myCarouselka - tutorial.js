"use strict";
$(document).ready(function() {

});

/*передаємо об'єкт jQuery в самовиконуючю ф-ю (замиканіє),
щоб при використанні нашого плагіна разом з іншими бібліотеками
(які також використовують знак $) не виникало конфліктів*/

(function($){

/*Добавляємо новий метод об'єкта jQuery.fn,
в який передаєм параметр options*/

    $.fn.myCarouselka = function(options){

/*назначаэмо дефолтны настройки*/

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

/*немає необхідності писати $(this), так-як "this" вже ссилається
об'єкт jQuery. ($(this) буде означати $($('#element')))*/
/*повертаєм ссилку на об'єкт jQuery, використовуємо метод .each,
щоб наш плагін працював з усіма найденими елементами*/

        return this.each(function(){
            
/*зберігаєм контекст, $this буде ссилатись на об'єкт jQuery*/
/*назначаємо "глобальні" (для нашого плагіна) пєрєменні*/

//?????????????????????????????????????????????????????????????????
            if(options)$.extend(settings, options);
            var $this = $(this),
                $js_carousel,
                $js_control,
                $js_faIcons,

            /*визначаємо скільки всього елементів в нашій каруселі*/
                itemsTotal = settings.picturesList.length,
            /*флаг, який зберігає інформацію про те, чи проігрується
            анімація на данний момент*/
                running = false,
            /*ID інтервал (необхідний для скидання інтервала)*/
                intID = null,
                numberActiveIcons = 1;

/*метод .extend об"єднує два об"єкта замінюючи однакові свойства,
які є в об"єкта settings новими свойствами з об"єкта options
и повертає змінений settings*/

            checkingQuantityElements();
            function addCarouselElements(){

//?????????????????????????????????????????????????????????????????????
                var i,
                    quantity = itemsTotal;
                $this.append('<ul id="js_carousel"></ul>');
                $js_carousel = $this.children('#js_carousel');
                $this.append('<div id="js_control"></div>');
                $js_control = $this.children('#js_control');

//??????????????????????????????????????????????????????????????????????
                for (i = 0; i < quantity; i++){
                    $js_carousel.append('<li id="js_picture'+(i+1)+'" class="js_imgContainer"><img src=' + settings.picturesList[i] + '></li>');
                };
/*присваюєм необхідні стилі для елементів каруселі,
спочатку для контейнера*/
                $this.css({

                    /*необхідно для нормального відображення в IE6(7)*/
                    'position': 'relative',

                    /*ховаєм все, що не влазить в контейнер*/
                    'overflow': 'hidden',

                    /*ширину контейнера робим рівною ширині всіх
                    видимих елементів*/
                    'width': settings.visible*settings.itemWidth + 'px',

                    /*виставляємо наш jquery_myCarouselka по центру*/
                    'margin-left': ($this.parent().width()-settings.visible*settings.itemWidth)/2 + 'px'
                });

/*присваюєм необхідні стилі для елементів каруселі,
тепер для внутрішнього елемента (в нашому випадку для <ul>)*/
            
                $js_carousel.css({

                    /*відносне позиціонування потрібне для того,
                    щоб можна було використовувати здвиг вліво*/
                    'position': 'relative',

                    /*ширину ставим побільше, щоб влізли всі елементи*/
                    'width': (itemsTotal * settings.itemWidth * 2) + 'px',

                    /*встановлюємо нульовий лівий здвиг*/
                    'left': 0,

                    'margin': 0,
                    'padding': 0,
                    'list-style': 'none'
                });
                $js_carousel.children().css({
                    'float': 'left'
                });
            };

/*добавляємо елементи керування*/
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

/*добавляємо іконки*/
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

/*активуєм індикацію перших "visible" іконок*/
            function startActiveIndication(){
                var i,
                    quantity = settings.visible;
                for (i = 0; i < quantity; i++){
                    $('#js_indication' + (i+1)).switchClass('fa-circle-o', 'fa-dot-circle-o');
                };
            };

/*перевіряємо чи потрібно добавляти елементи керування*/
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

/*міняємо іконки для активних елементів*/
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

/*використовуєм тернарний оператор, параметр dir(boolean) - 
false (наступний), true (попередній)*/

            function slide(dir, rotate){

                /*вибираємо напрям в залежності від переданого
                параметра (вліво чи в право)*/
                var direction = dir ? 1 : -1,

                /*ліве зміщення (для <ul>)*/
                    leftIndent = 0;

                /*якщо анімація закінчилась, чи ще не запущена*/
                if(!running){

                    /*ставимо флажок, що анімація в процесі*/
                    running = true;

                    /*якщо запущений інтервал*/
                    if(intID){

                        /*очищаєм інтервал*/
                        clearInterval(intID);
                    };

                    /*якщо ми мотаємо до наступного елемента
                    (так по умолчянію)*/
                    if(dir){
                        /*вставляємо перед першим елементом
                        каруселі клони стількох елементів, скільки
                        задано в параметрі rotateBy (по умолч. 1)*/
                        $js_carousel.children(':first').before($js_carousel.children().slice(itemsTotal - rotate, itemsTotal).clone(true));

                        /*здвигаємо карусель <ul> вліво на ширину
                        елемента помножену на кількість елементів,
                        (задано в параметрі rotateBy, по умолч. 1)*/
                        $js_carousel.css('left', -settings.itemWidth * rotate + 'px');
                    
                    /*якщо ми мотаємо до попереднього елемента*/
                    }else{

                        /*вставляємо після останнього елемента
                        каруселі клони стількох елементів, скільки
                        задано в параметрі rotateBy (по умолч. 1)*/
                        $js_carousel.children(':last').after($js_carousel.children().slice(0, rotate).clone(true));

                    };

                    /*розраховуємо ліве зміщення.
                    поточне значення left + ширина одного елемента *
                    кількість проматуємих елементів * направлення
                    переміщення (1 або -1)*/
                    leftIndent = parseInt($js_carousel.css('left')) + (settings.itemWidth * rotate * direction);

                    /*запускаємо анімацію*/
                    $js_carousel.animate({'left': leftIndent}, {queue: false, duration: settings.speed, easing: "easeOutBounce", complete: function(){
                        var $js_imgContainer = $js_carousel.children();
                        /*коли анімація закінчена*/

                        /*якщо мотаємо до попереднього елемента*/

                        if(dir){

                            /*удаляємо стільки останніх елементів, скільки
                            задано в rotateBy*/
                            $js_carousel.children().slice(itemsTotal, itemsTotal + rotate).remove();
                            //changeActiveIcons();

                        
                        /*якщо ми мотаємо до наступного елемента(по умолч)*/
                        }else{
                            /*удаляємо стільки перших елементів, скільки
                            задано в rotateBy*/
                            $js_carousel.find('li').slice(0, rotate).remove();

                            /*встановлюємо здвиг в "0"*/
                            $js_carousel.css('left', 0);
                        };
                        $js_carousel.find('li').slice(0, settings.visible).addClass("js_activeL10");
                        changeActiveIcons();
                        $js_carousel.find('li').slice(0, settings.visible).removeClass("js_activeL10");

                        /*якщо карусель повинна проматуватися автоматично*/
                        if(settings.auto){

                            /*запускаємо визов функції через інтервал чясу*/
                            intID = setInterval(function(){
                                slide(settings.backSlide, rotate);
                            }, settings.auto);
                        };

                        /*відмічаємо, що анімація закінчена*/
                        running = false;
                    }});
                };

                /*повертаємо false, для того, щоб не було переходу по ссилці*/
                return false;
            };


            /*назначаємо обработчик на собитіє click для кнопки next*/
            $(settings.btnNext).on('click', function(e){
                return slide(false, settings.rotateBy);
            });

            /*назначаємо обработчик на собитіє click для кнопки previous*/
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

/*перематуєм слайдер по нажатію на іконки*/
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

            /*якщо карусель повинна проматуватися автоматично,
            то запускаємо визов функції через чясовий інтервал*/
            if(settings.auto){
                intID = setInterval(function(){
                    slide(settings.backSlide, settings.rotateBy);
                }, settings.auto);
            };
        });
    };

/*тутже визиваємо, і передаємо в якості аргумента об'єкт jQuery*/

})(jQuery);