"use strict";
$(document).ready(function() {

    $("input.task_input").myAutocomplete({
        pathToFile: '/task.json',
        placeHolder: 'Company name',
        colorStyle: 'selfStyle' //'warningStyle', 'errorStyle', 'defaultStyle', 'successStyle';
        //inputName: 'autocomplete'
        //inputType: 'email'
        //autoFocus: true
    });
    $("input.default_style").myAutocomplete({
        pathToFile: '/task.json',
        placeHolder: 'Email address',
        colorStyle: 'defaultStyle', //'warningStyle', 'errorStyle', 'selfStyle', 'successStyle';
        inputType: 'email'
        //inputName: 'autocomplete'
        //autoFocus: true
    });
    $(".has-success input").myAutocomplete({
        pathToFile: '/task.json',
        placeHolder: 'Name',
        colorStyle: 'successStyle' //'warningStyle', 'errorStyle', 'selfStyle', 'defaultStyle';
        //inputType: 'email'
        //inputName: 'autocomplete'
        //autoFocus: true
    });
    $(".has-error input").myAutocomplete({
        pathToFile: '/task.json',
        placeHolder: 'Error',
        colorStyle: 'errorStyle', //'successStyle', 'warningStyle', 'selfStyle', 'defaultStyle';
        inputType: 'email'
        //inputName: 'autocomplete'
        //autoFocus: true
    });
    $(".has-warning").find('input').myAutocomplete({
        pathToFile: '/task.json',
        placeHolder: 'Name',
        colorStyle: 'warningStyle' //'successStyle', 'errorStyle', 'selfStyle', 'defaultStyle';
        //inputType: 'email'
        //autoFocus: true
        //inputName: 'autocomplete'
    });
});


