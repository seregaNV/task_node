"use strict";
$(document).ready(function(){
    var socket = io.connect('', {'reconnection delay': 1});
    var form = $('#js_chat_publish');
    var ul = $('#js_chat_messages');
    form.submit(function() {
        var input = $(this).find(':input');
        var text = input.val();
        input.val('');
        socket.emit('message', text, function(data) {
            $('<li>', {text: text}).appendTo(ul);
        });
        return false;
    });
    socket.on('message', function(text) {
        $('<li>', {text: text}).appendTo(ul);
    });
});