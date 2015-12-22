(function($){
    "use strict";
    $.fn.myAutocomplete = function(options){
        options = options || {};
        var settings = {

            setURL: false,
            setJSON: false,
            setObject: false,
            setArray: false,
            //chooseField: '',
            //inputName: 'query',
            //placeHolder: '',
            inputType: 'text',
            colorStyle: 'defaultStyle', //'selfStyle', 'successStyle', 'warningStyle', 'errorStyle'
            autoFocus: false,
            minLength: 3,
            delay: false,
            ignoreCase: false,
            searchInside: false,
            visualEffect: false

        };
        var opts = $.extend(true, {}, settings, options);
        this.each(function(i, el) {

            var $searchBox = $(el),
                $searchResult,

                inputValueLength,
                inputValue = '',
                suggestSelected = 0,
                quantityOfResults = 0;
            if ($searchBox.attr('type') == opts.inputType) addElements();

            function addElements() {

                $searchBox.parent().addClass('myAutocomplete_search_input');


                $searchBox.addClass('js_myAutocomplete_search_box');
                $searchBox.attr('autocomplete', 'off');
                if (opts.inputName) $searchBox.attr('name', opts.inputName);
                if (opts.placeHolder) $searchBox.attr('placeholder', opts.placeHolder);
                //$searchBox.attr('value', '');

                $searchBox.after('<div class="js_myAutocomplete_search_result"></div>');
                $searchResult = $searchBox.next();
                $searchResult.outerWidth($searchBox.outerWidth());
                $searchResult.css({'left': $searchBox.position().left});

                switch(opts.colorStyle) {
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

                if (opts.autoFocus) $searchBox.focus();
                keyUp();
                listeners();
            }

            var reg;
            var timeoutID = null;
            var regFlag;


            function keyUp() {
                $searchBox.keyup(function(I) {
                    if (((I.keyCode >= 48) && (I.keyCode <= 111)) || I.keyCode == 8) {
                        if (timeoutID) clearTimeout(timeoutID);
                        inputValue = $searchBox.val();
                        regFlag = opts.ignoreCase ? 'i' : '';
                        reg = new RegExp(inputValue, regFlag);


                        //if (opts.ignoreCase) {
                        //    reg = new RegExp(inputValue, 'i');
                        //} else {
                        //    reg = new RegExp(inputValue);
                        //}


                        inputValueLength = inputValue.length;
                        if (inputValueLength > opts.minLength - 1) {
                            if (opts.delay) {
                                timeoutID = setTimeout(function() {
                                    validationOfSettings();
                                }, opts.delay);
                            } else {
                                validationOfSettings();
                            }
                        } else {
                            $searchResult.hide();
                        }
                    }
                });
            }

            function validationOfSettings() {
                var checkSetParam = (opts.setURL ? 0 : 1) +
                                    (opts.setJSON ? 0 : 1) +
                                    (opts.setObject ? 0 : 1) +
                                    (opts.setArray ? 0 : 1);
                if (checkSetParam == 3) {
                    if (opts.setURL) handlerURL();
                    if (opts.setJSON) handlerJSON();
                    if (opts.setObject) handlerObject();
                    if (opts.setArray) handlerArray();
                } else {
                    console.error('jQuery_myAutocomplete: You must choose one of the "setURL", "setJSON", "setObject" or "setArray", when initializing plugin!');
                }
            }

            function handlerURL() {
                console.log('jQuery_myAutocomplete: handlerURL() is triggered.');
                var request = {};
                request[opts.inputName] = inputValue;
                $.get( opts.setURL, request, function(response) {
                    addResult(response);
                });
            }

            function handlerJSON() {
                console.log('jQuery_myAutocomplete: handlerJSON() is triggered.');
                $.getJSON(opts.setJSON, {}, function(companyData) {
                    var element,
                        variants = [];
                    for (var i in companyData) {
                        element = companyData[i][opts.chooseField];
                        if(reg.test(element)) variants.push(element);
                    }
                    addResult(variants);
                });
            }

            function handlerObject() {
                console.log('jQuery_myAutocomplete: handlerObject() is triggered.');
                var element,
                    variants = [],
                    getObject = opts.setObject;
                for (var i in getObject) {
                    element = getObject[i][opts.chooseField];
                    if(reg.test(element)) variants.push(element);
                }
                addResult(variants);
            }

            function handlerArray() {
                console.log('jQuery_myAutocomplete: handlerArray() is triggered.');
                var variants = [],
                    getArray = opts.setArray;
                for (var i = 0; i < getArray.length; i++) {
                    if (reg.test(getArray[i])) variants.push(getArray[i]);
                }
                addResult(variants);
            }

            function addResult(variants) {
                var result, exist, index, partA, partB, partC,
                    variantsOnlyBeginning = [],
                    regInStart = new RegExp('^' + inputValue, 'i');

                variants.sort();
                for (var i = 0; i < variants.length; i++) {
                    if (regInStart.test(variants[i])) {
                        variantsOnlyBeginning.push(variants[i])
                    }
                }
                result = opts.searchInside ? variants : variantsOnlyBeginning;
                $searchResult.html("");
                $searchResult.append('<div id="js_myAutocomplete_duplicateInputValue" class="js_myAutocomplete_advice_variant">' + inputValue + '</div>');

                if (opts.visualEffect) {
                    for (var j = 0; j < result.length; j++) {
                        exist = reg.exec(result[j]);
                        console.log(exist);
                        if (exist) {
                            index = exist.index;
                            partA = result[j].slice(0, index);
                            partB = result[j].slice(index, index + inputValueLength);
                            partC = result[j].slice(index + inputValueLength, result[j].length);
                            $searchResult.append('<div class="js_myAutocomplete_advice_variant">' + partA + '<span class="js_myAutocomplete_valueInVariant">' + partB + '</span>' + partC + '</div>');
                        }
                    }
                } else {
                    for (var j = 0; j < result.length; j++) {
                        $searchResult.append('<div class="js_myAutocomplete_advice_variant">' + result[j] + '</div>');
                    }
                }

                $searchResult.show();
                quantityOfResults = $searchResult.children().length;
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