"use strict";
$(document).ready(function() {

    $("input.task_input").myAutocomplete({
        pathToFile: '/task.json',       //the path to the json file (default: "")
        placeHolder: 'Company name',    //placeHolder attribute value (default: default)
        minLength: 2,                 //number of characters to activate the auto complete (default: 3)
        //delay: 1000,                     //the delay time of query autocompletion (default: 1ms)
        colorStyle: 'selfStyle',        /*Styles of elements autocomplete (default: "defaultStyle"),
                                            (others: 'selfStyle', 'warningStyle', 'errorStyle', 'successStyle');*/
        inputName: 'autocomplete',      //name attribute value (default: default)
        autoFocus: true                 //activation of focus true/false (default: false)
        //inputType: 'email'            //type attribute value (default: "text")
    });
});


