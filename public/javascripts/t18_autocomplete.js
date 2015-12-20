"use strict";
$(document).ready(function() {

    $("input.task_input").myAutocomplete({
        pathToFile: '/task.json',       //the path to the json file (default: "")
        placeHolder: 'Company name',    //placeHolder attribute value (default: "")
        //minLength: 2,                 //number of characters to activate the auto complete (default: 3)
        //delay: 300,                   //the delay time of query autocompletion (default: 1ms)
        colorStyle: 'selfStyle',        /*Styles of elements autocomplete (default: "defaultStyle"),
                                            (others: 'selfStyle', 'warningStyle', 'errorStyle', 'successStyle');*/
        inputName: 'autocomplete'       //name attribute value (default: "query")
        //inputType: 'email'            //type attribute value (default: "text")
        //autoFocus: true               //activation of focus true/false (default: false)
    });
    $("input.default_style").myAutocomplete({
        pathToFile: '/task.json',
        placeHolder: 'Email address',
        //minLength: 2,
        //delay: 300,
        colorStyle: 'defaultStyle',     //'warningStyle', 'errorStyle', 'selfStyle', 'successStyle';
        inputType: 'email',
        inputName: 'autocomplete'
        //autoFocus: true
    });
    $(".has-success input").myAutocomplete({
        pathToFile: '/task.json',
        placeHolder: 'Name',
        //minLength: 2,
        //delay: 300,
        colorStyle: 'successStyle',     //'warningStyle', 'errorStyle', 'selfStyle', 'defaultStyle';
        inputName: 'autocomplete'
        //inputType: 'email'
        //autoFocus: true
    });
    $(".has-error input").myAutocomplete({
        pathToFile: '/task.json',
        placeHolder: 'Error',
        //minLength: 2,
        //delay: 300,
        colorStyle: 'errorStyle',       //'successStyle', 'warningStyle', 'selfStyle', 'defaultStyle';
        inputType: 'email',
        inputName: 'autocomplete'
        //autoFocus: true
    });
    $(".has-warning").find('input').myAutocomplete({
        pathToFile: '/task.json',
        placeHolder: 'Name',
        //minLength: 2,
        //delay: 300,
        colorStyle: 'warningStyle',     //'successStyle', 'errorStyle', 'selfStyle', 'defaultStyle';
        inputName: 'autocomplete'
        //inputType: 'email'
        //autoFocus: true
    });
});


