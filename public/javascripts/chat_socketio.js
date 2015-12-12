"use strict";
$(document).ready(function(){
    var socket = io.connect('', {'reconnection delay': 1});
    var form = $('#js_chat_publish');
    var ul = $('#js_chat_messages');
    var input = $('#js_chat_input');
    function sendMessage() {
        var text = input.val();
        input.val('');
        socket.emit('message', text, function() {
            $('<li>', {text: text}).appendTo(ul);
        });
        return false;
    }
    socket
        .on('message', function(message) {
            $('<li>', {text: message}).appendTo(ul);
        })
        .on('connect', function() {
            $('<li>', {text: 'connection is established...'}).appendTo(ul);
            form.on('submit', sendMessage);
            form.find('button').prop('disabled', false);
            input.prop('disabled', false);
        })
        .on('disconnect', function() {
            $('<li>', {text: 'connection is lost...'}).appendTo(ul);
            form.off('submit', sendMessage);
            form.find('button').prop('disabled', true);
            input.prop('disabled', true);
        });
});