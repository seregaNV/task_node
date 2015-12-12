"use strict";
(function($){
    $.fn.myAutocomplete = function(options){

        var settings = {
        };

        return this.each(function() {
            if (options)$.extend(settings, options);
            var $this = $(this),
                $form,
                $searchBox,
                $search_result,
                inputValueLength = 0,
                suggestSelected = 0,
                quantityOfResults = 0,
                inputValue = '';
            $this.append('<form action="" method="GET" class="form-inline" id="js_t18_form"></form>');
            $form = $this.children('#js_t18_form');
            $form.append('<div class="form-group"></div>');
            $form.children().append('<input type="text" name="query" class="form-control task_input" id="js_t18_search_box" autofocus placeholder="Company name" value="" autocomplete="off">');
            $searchBox = $form.find('#js_t18_search_box');
            $form.append('<button type="submit" class="btn btn-default">Search</button>');
            $form.append('<div id="js_t18_search_result"></div>');
            $search_result = $form.children("#js_t18_search_result");
            addStyles();

            function addStyles(){
                /*Настройка автокомпліта (Task 18)*/
                $('#t18_search_area').css({
                    'position': 'relative'
                });

                $searchBox.css({
                    'width': '400px'
                });

                //.task_input:focus{
                //    border-color: rgb(212, 136, 255);
                //    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgb(219, 170, 255);
                //    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgb(219, 170, 255);
                //}

                $search_result.css({
                    'margin-top': '10px',
                    'margin-left': '60px',
                    'position': 'absolute',
                    'width': '400px',
                    'padding-left': '30px',
                    'display': 'none',
                    'top': '24px',
                    'background-color': '#fff',
                    'left': '0',
                    'border-radius': '4px',
                    'border': '1px solid rgb(212, 136, 255)',
                    '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgb(219, 170, 255)',
                    'box-shadow': 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgb(219, 170, 255)'
                });

            }

            $searchBox.keyup(function(I) {
                if (((I.keyCode >= 48) && (I.keyCode <= 111)) || I.keyCode == 8) {
                    inputValue = $searchBox.val();
                    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.substr(1).toLowerCase();
                    inputValueLength = inputValue.length;
                    if (inputValueLength > 2) {
                        $search_result.html("");
                        $.getJSON('/task.json', {}, function(companyData) {
                            $search_result.append('<div class="js_t18_advice_variant">' + inputValue + '</div>');
                            for (var i in companyData) {
                                var company = (companyData[i]).company,
                                    companyStr = company.slice(0, inputValueLength);
                                if(inputValue == companyStr){
                                    $search_result.show();
                                    $search_result.append('<div class="js_t18_advice_variant">' + company + '</div>');
                                }
                            }
                            $search_result.find('.js_t18_advice_variant').css({
                                'text-indent': '0',
                                'cursor': 'pointer',
                                'padding-left': '10px',
                                'margin-left': '-30px',
                                'text-align': 'left',
                                'border-radius': '4px',
                                'color': '#333'
                            });
                            $search_result.find('.js_t18_advice_variant').hover(
                                function(){
                                    $(this).css({'background-color': 'rgb(229, 200, 255)'})
                                },
                                function(){
                                    $(this).css({'background-color': '#fff'})
                                });
                            quantityOfResults = $search_result.children().length;
                        });
                    } else {
                        $search_result.hide();
                    }
                }
            });
            $searchBox.keydown(function(I){
                switch(I.keyCode) {
                    case 27: // escape
                        $search_result.hide();
                        return false;
                        break;
                    case 38: // стрелка вверх
                    case 40: // стрелка вниз
                        I.preventDefault();
                        if(quantityOfResults){
                            key_activate( I.keyCode-39 );
                        }
                        break;
                }
            });

            $search_result.on('click', 'div', function(){
                $('#js_t18_search_box').val($(this).text());
                window.location.href = "?query=" + $(this).text();
            });

            $('html').on('click', function(){
                $search_result.hide();
            });
            $searchBox.on('click', function(e){
                if(quantityOfResults) $search_result.show();
                e.stopPropagation();
            });

            $search_result.mouseover(function() {
                $search_result.find('div.active').removeClass('active');
            });
            //$search_result.hover(
            //    function(){
            //        $(this).css({'background-color': 'rgb(229, 200, 255)'})
            //    },
            //    function(){
            //        $(this).css({'background-color': ''})
            //    });
            //$search_result.mousehover(function() {
            //    $search_result.find('.js_t18_advice_variant :hover').css({
            //        'background-color': 'rgb(229, 200, 255)'
            //    });
            //});

            function key_activate(n){
                var $searchBox = $("#js_t18_search_box");
                var $search_resultDiv = $('#js_t18_search_result').find('div');
                $search_resultDiv.eq(suggestSelected-1).removeClass('active').css({'background-color': '#fff'});

                if(n == 1 && suggestSelected < quantityOfResults){
                    suggestSelected++;
                }else if(n == -1 && suggestSelected > 1){
                    suggestSelected--;
                }

                if( suggestSelected > 0){
                    $search_resultDiv.eq(suggestSelected-1).addClass('active').css({'background-color': 'rgb(229, 200, 255)'});
                    $searchBox.val( $search_resultDiv.eq(suggestSelected-1).text() );
                } else {
                    $searchBox.val( inputValue );
                }
            }
        });
    };
})(jQuery);