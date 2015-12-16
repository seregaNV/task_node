(function($){
    "use strict";
    $.fn.myAutocomplete = function(options){

        var settings = {
            pathToFile: '/task.json',
            inputType: 'text'
        };

        return this.each(function() {
            if (options)$.extend(settings, options);

            var $this = $(this),
                //$("input[type='text']")
                $searchBox = $this,
                $searchResult,

                inputValueLength = 0,
                suggestSelected = 0,
                quantityOfResults = 0,
                inputValue = '';
            if ($this.attr('type') == settings.inputType) {
                addElements()
            }

            function addElements() {

                //<input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount">
                <!--<input type="text" name="query" class="form-control task_input" id="js_t18_search_box" autofocus placeholder="Company name" value="" autocomplete="off">-->
                $searchBox.parent().addClass('myAutocomplete_search_input');//поміняти все на клас


                $searchBox.addClass('js_myAutocomplete_search_box');//поміняти все на клас
                //$searchBox.addClass('task_input');//подивитися чи потрібно?
                $searchBox.attr('name', 'query');//поміняти на autocomplete
                $searchBox.attr('autocomplete', 'off');
                $searchBox.attr('placeholder', 'Company name');//добавити в свойства
                $searchBox.attr('value', '');
                $searchBox.focus();//добавити в свойства

                $searchBox.after('<div class="js_myAutocomplete_search_result"></div>');
                $searchResult = $searchBox.next();
                $searchResult.width($searchBox.outerWidth());

                //$('.myAutocomplete_search_input').next('button').css({'position': 'static'});
                //$this.append('<form action="" method="GET" class="form-inline" id="js_t18_form"></form>');
                //$form = $this.children('#js_t18_form');
                //$form.append('<div class="form-group"></div>');
                //$form.children().append('<input type="text" name="query" class="form-control task_input" id="js_t18_search_box" autofocus placeholder="Company name" value="" autocomplete="off">');
                //$searchBox = $form.find('#js_t18_search_box');
                //$form.append('<button type="submit" class="btn btn-default">Search</button>');
                //$form.append('<div class="js_myAutocomplete_search_result"></div>');
                //$searchResult = $form.children(".js_myAutocomplete_search_result");


                keyUp();
                listeners();
            }

            function keyUp() {
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
                            //$searchResult.hide();
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
                                key_activate( I.keyCode-39 );
                            }
                            break;
                    }
                });

                $this.next().on('click', 'div', function(){
                    $this.val($(this).text());
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
                function key_activate(n){
                    var $searchResultDiv = $this.next('.js_myAutocomplete_search_result').find('div');
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
            };



        });
    };
})(jQuery);