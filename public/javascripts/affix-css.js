"use strict";
$(document).ready(function(){
    $('body').scrollspy({
        target: '.bs-docs-sidebar',
        offset: 40
    });
    $(".affix-css").affix({
        offset: { 
            top: 249
        }
    });
});