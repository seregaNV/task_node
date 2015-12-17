(function($){
    "use strict";
    $.fn.myAutocomplete = function(options){

        var settings = {
            pathToFile: '',
            inputType: 'text',
            //inputName: 'query',
            //placeHolder: '',
            autoFocus: false,
            colorStyle: 'defaultStyle' //'selfStyle', 'successStyle', 'warningStyle', 'errorStyle'
        };

        return this.each(function() {
            if (options)$.extend(settings, options);

            var $searchBox = $(this),
                $searchResult,

                inputValueLength,
                inputValue = '',
                suggestSelected = 0,
                quantityOfResults = 0;
            if ($searchBox.attr('type') == settings.inputType) addElements();

            function addElements() {

                $searchBox.parent().addClass('myAutocomplete_search_input');


                $searchBox.addClass('js_myAutocomplete_search_box');
                $searchBox.attr('autocomplete', 'off');
                if (settings.inputName) $searchBox.attr('name', settings.inputName);
                if (settings.placeHolder) $searchBox.attr('placeholder', settings.placeHolder);
                //$searchBox.attr('value', '');

                $searchBox.after('<div class="js_myAutocomplete_search_result"></div>');
                $searchResult = $searchBox.next();
                $searchResult.outerWidth($searchBox.outerWidth());

                switch(settings.colorStyle) {
                    case 'defaultStyle':
                        $searchResult.addClass('js_myAutocomplete_default_style');
                        break;
                    case 'successStyle':
                        $searchResult.addClass('js_myAutocomplete_success_style');
                        break;
                    case 'warningStyle':
                        $searchResult.addClass('js_myAutocomplete_warning_style');
                        break;
                    case 'errorStyle':
                        $searchResult.addClass('js_myAutocomplete_error_style');
                        break;
                    case 'selfStyle':
                        $searchResult.addClass('js_myAutocomplete_self_style');
                        break;
                }

                if (settings.autoFocus) $searchBox.focus();
                keyUp();
                listeners();
            }

            function keyUp() {
                $searchResult.css({'left': $searchBox.position().left});
                $searchBox.keyup(function(I) {
                    if (((I.keyCode >= 48) && (I.keyCode <= 111)) || I.keyCode == 8) {
                        inputValue = $searchBox.val();
                        inputValueLength = inputValue.length;
                        if (inputValueLength > 2) {
                            $searchResult.html("");
                            $.getJSON(settings.pathToFile, {}, function(companyData) {
                                $searchResult.append('<div class="js_t18_advice_variant">' + inputValue + '</div>');
                                inputValue = inputValue.charAt(0).toUpperCase() + inputValue.substr(1).toLowerCase();
                                for (var i in companyData) {
                                    var company = (companyData[i]).company,
                                        companyStr = company.slice(0, inputValueLength);
                                    if(inputValue == companyStr){
                                        $searchResult.show();
                                        $searchResult.append('<div class="js_t18_advice_variant">' + company + '</div>');
                                    }
                                }
                                quantityOfResults = $searchResult.children().length;
                            });
                        } else {
                            $searchResult.hide();
                        }
                    }
                });
            }

            function listeners() {

                $searchBox.keydown(function(I){
                    switch(I.keyCode) {
                        case 27: // escape
                            $searchResult.hide();
                            return false;
                            break;
                        case 38: // стрелка вверх
                        case 40: // стрелка вниз
                            I.preventDefault();
                            if(quantityOfResults){
                                selecting( I.keyCode-39 );
                            }
                            break;
                    }
                });

                $searchBox.next().on('click', 'div', function(){
                    $searchBox.val($(this).text());
                });

                $('html').on('click', function(){
                    $searchResult.hide();
                });
                $searchBox.on('click', function(e){
                    if(quantityOfResults) $searchResult.show();
                    e.stopPropagation();
                });

                $searchResult.mouseover(function() {
                    $searchResult.find('div').removeClass('active');
                });
            }

            function selecting(n){
                var $searchResultDiv = $searchBox.next('.js_myAutocomplete_search_result').find('div');
                $searchResultDiv.eq(suggestSelected-1).removeClass('active');

                if(n == 1 && suggestSelected < quantityOfResults){
                    suggestSelected++;
                }else if(n == -1 && suggestSelected > 1){
                    suggestSelected--;
                }

                if( suggestSelected > 0){
                    $searchResultDiv.eq(suggestSelected-1).addClass('active');
                    $searchBox.val( $searchResultDiv.eq(suggestSelected-1).text() );
                } else {
                    $searchBox.val( inputValue );
                }
            }
        });
    };
})(jQuery);