"use strict";
$(document).ready(function() {
    $('.js_chat_logout').on('click', function() {
        $('<form method=POST action=/logout>').submit();
        return false;
    });
});