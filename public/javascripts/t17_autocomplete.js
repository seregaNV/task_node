"use strict";
$(document).ready(function() {

    $("input.task_input").myAutocomplete({
        pathToFile: '/task.json',       //the path to the json file (default: "")
        placeHolder: 'Company name',    //placeHolder attribute value (default: default)
        colorStyle: 'selfStyle',        /*Styles of elements autocomplete (default: "defaultStyle"),
                                            (others: 'selfStyle', 'warningStyle', 'errorStyle', 'successStyle');*/
        inputName: 'autocomplete',      //name attribute value (default: default)
        autoFocus: true                 //activation of focus true/false (default: false)
        //inputType: 'email'            //type attribute value (default: "text")
    });
});


