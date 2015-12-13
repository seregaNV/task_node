"use strict";
$(document).ready(function(){
    var socket = io.connect('', {'reconnection delay': 1});
    var form = $('#js_chat_publish');
    var ul = $('#js_chat_messages');
    var input = $('#js_chat_input');

    socket
        .on('message', function(username, message) {
            printMessage(username + ' > ' + message);
        })
        .on('leave', function(username) {
            printStatus(username + ' left the chat');
        })
        .on('join', function(username) {
            printStatus(username + ' entered the chat');
        })
        .on('connect', function() {
            printStatus('connection is established...');
            form.on('submit', sendMessage);
            form.find('button').prop('disabled', false);
            input.prop('disabled', false);
        })
        .on('disconnect', function() {
            printStatus('connection is lost...');
            form.off('submit', sendMessage);
            form.find('button').prop('disabled', true);
            input.prop('disabled', true);
        })
        .on('session:reload', function(sid, clients) {
            console.log('--------------test_session:reload------------------------------------');
            console.log(sid);
            //var clients = io.sockets.clients();
            //clients.forEach(function(client) {
            //    if (client.handshake.session.id != sid) return;
            //    loadSession(sid, function(err, session) {
            //        if (err) {
            //            client.emit('error', 'server error');
            //            client.disconnect();
            //            return;
            //        }
            //        if (!session) {
            //            client.emit('error', 'username unauthorized');
            //            client.disconnect();
            //            return;
            //        }
            //        client.handshake.session = session;
            //    });
            //});
        });

    function sendMessage() {
        var text = input.val();
        input.val('');
        socket.emit('message', text, function() {
            printMessage("I'm > " + text);
        });
        return false;
    }

    function printStatus(status) {
        $('<li>').append($('<i>').text(status)).appendTo(ul);
    }

    function printMessage(text) {
        $('<li>').text(text).appendTo(ul);
    }
});