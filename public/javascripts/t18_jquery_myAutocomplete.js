(function($){
    "use strict";
    $.fn.myAutocomplete = function(options){
        options = options || {};
        var settings = {
            inputType: 'text',
            minLength: 3,
            delay: 1,
            searchInside: false,
            autoFocus: false,
            colorStyle: 'defaultStyle', //'selfStyle', 'successStyle', 'warningStyle', 'errorStyle'
            //inputName: 'query',
            //placeHolder: '',
            //chooseField: '',

            setURL: false,
            setJSON: false,
            setObject: false,
            setArray: false
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


            var timeoutID = null;

            function keyUp() {
                $searchBox.keyup(function(I) {
                    if (((I.keyCode >= 48) && (I.keyCode <= 111)) || I.keyCode == 8) {
                        if (timeoutID) clearTimeout(timeoutID);
                        inputValue = $searchBox.val();
                        inputValueLength = inputValue.length;
                        if (inputValueLength > opts.minLength - 1) {

                            if (opts.delay) {
                                timeoutID = setTimeout(function() {

                                    //handlerURL();
                                    handlerJSON();
                                    //handlerObject();
                                    //handlerArray();

                                }, opts.delay);
                            }



                        } else {
                            $searchResult.hide();
                        }
                    }
                });
            }

            function handlerURL() {
                var request = {};
                request[opts.inputName] = inputValue;
                $.get( opts.setURL, request, function(response) {
                    addResult(response);
                });
            }

            function handlerJSON() {
                $.getJSON(opts.setJSON, {}, function(companyData) {
                    var element,
                        variants = [],
                        reg = new RegExp(inputValue, 'i');
                    for (var i in companyData) {
                        element = companyData[i][opts.chooseField];
                        if(reg.test(element)) variants.push(element);
                    }
                    addResult(variants);
                });
            }

            function handlerObject() {
                var element,
                    variants = [],
                    getObject = opts.setObject,
                    reg = new RegExp(inputValue, 'i');
                for (var i in getObject) {
                    element = getObject[i][opts.chooseField];
                    if(reg.test(element)) variants.push(element);
                }
                addResult(variants);
            }

            function handlerArray() {
                var variants = [],
                    getArray = opts.setArray,
                    reg = new RegExp(inputValue, 'i');
                for (var i = 0; i < getArray.length; i++) {
                    if (reg.test(getArray[i])) variants.push(getArray[i]);
                }
                addResult(variants);
            }

            function addResult(variants) {

                variants.sort();
                var result,
                    variantsOnlyBeginning = [],
                    reg = new RegExp('^' + inputValue, 'i');
                console.log(variants);

                for (var i = 0; i < variants.length; i++) {
                    if (reg.test(variants[i])) {
                        variantsOnlyBeginning.push(variants[i])
                    }
                }
                console.log(variantsOnlyBeginning);
                result = opts.searchInside ? variants : variantsOnlyBeginning;
                $searchResult.html("");
                $searchResult.append('<div class="js_t18_advice_variant">' + inputValue + '</div>');
                for (var j = 0; j < result.length; j++) {
                    $searchResult.append('<div class="js_t18_advice_variant">' + result[j] + '</div>');
                }
                $searchResult.show();
                quantityOfResults = $searchResult.children().length;
            }









            //function addResult(variants) {
            //
            //    variants.sort();
            //    var result,
            //        variantsOnlyBeginning = [],
            //        reg = new RegExp('^' + inputValue, 'i');
            //    console.log(variants);
            //
            //    for (var i = 0; i < variants.length; i++) {
            //        if (reg.test(variants[i])) {
            //            variantsOnlyBeginning.push(variants[i])
            //        }
            //    }
            //    console.log(variantsOnlyBeginning);
            //    result = opts.searchInside ? variantsOnlyBeginning : variants;
            //
            //
            //
            //
            //    $searchResult.html("");
            //    $searchResult.append('<div class="js_t18_advice_variant">' + inputValue + '</div>');
            //    for (var j = 0; j < result.length; j++) {
            //        if (ind == 0) {
            //            var inputUpper = inputValue.charAt(0).toUpperCase() + inputValue.substr(1).toLowerCase();
            //            var ind = result[j].indexOf(inputUpper);
            //            var partA = result[j].slice(0, inputValueLength);
            //            var partB = result[j].slice(inputValueLength, result[j].length);
            //            $searchResult.append('<div class="js_t18_advice_variant"><strong>' + partA + '</strong>' + partB + '</div>');
            //
            //        } else {
            //            var ind = result[j].indexOf(inputValue);
            //            var partA = result[j].slice(0, ind);
            //            var partB = result[j].slice(ind, ind + inputValueLength);
            //            var partC = result[j].slice(ind + inputValueLength, result[j].length);
            //            $searchResult.append('<div class="js_t18_advice_variant">' + partA + '<strong>' + partB + '</strong>' + partC + '</div>');
            //        }
            //        //console.log('ind' + j + ": " + ind);
            //        //console.log('indA' + j + ": " + indA);
            //        //console.log('indB' + j + ": " + indB);
            //        //console.log('indC' + j + ": " + indC);
            //    }
            //    $searchResult.show();
            //    quantityOfResults = $searchResult.children().length;
            //}









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