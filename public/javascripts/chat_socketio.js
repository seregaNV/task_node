"use strict";
$(document).ready(function(){
    var socket = io.connect('', {'reconnection delay': 1}),
        form = $('#js_chat_publish'),
        ul = $('#js_chat_messages'),
        input = $('#js_chat_input'),
        time;

    socket
        .on('message', function(username, message) {
            printMessage(username + ': ' + message);
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
        .on('logout', function() {
            location.href = '/';
        })
        .on('error', function(reason) {
            if (reason == 'handshake unauthorized') {
                printStatus('You are left the chat');
            } else {
                setTimeout(function() {
                    socket.connect();
                }, 500);
            }
        });
        //.on('session:reload', function(sid) {
        //    console.log('--------------test_session:reload------------------------------------');
        //    //console.log(clients);
        //    //var checkSubstring = clients.indexOf(sid);
        //    //console.log(checkSubstring);
        //    var clients = io.sockets.clients();
        //    clients.forEach(function(client) {
        //        if (client.handshake.session.id != sid) return;
        //        loadSession(sid, function(err, session) {
        //            if (err) {
        //                client.emit('error', 'server error');
        //                client.disconnect();
        //                return;
        //            }
        //            if (!session) {
        //                client.emit('error', 'username unauthorized');
        //                client.disconnect();
        //                return;
        //            }
        //            client.handshake.session = session;
        //        });
        //    });
        //});

    function startTime() {
        var date = new Date(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        time = h + ":" + m + ":" + s;
    }

    function checkTime(i) {
        if (i < 10) {
            i= "0" + i;
        }
        return i;
    }

    function sendMessage() {
        var text = input.val();
        input.val('');
        socket.emit('message', text, function() {
            printMessage("I'm: " + text);
        });
        return false;
    }

    function printStatus(status) {
        startTime();
        var messageTime = $('<span>').text('[' + time + ']').addClass('chat_message_time');
        messageTime.prependTo($('<li>').append($('<i>').text(' ' + status)).addClass('list-unstyled').prependTo(ul));
    }

    function printMessage(text) {
        startTime();
        var messageTime = $('<span>').text('[' + time + ']').addClass('chat_message_time');
        messageTime.prependTo($('<li>').text(' ' + text).addClass('list-unstyled').prependTo(ul));
    }
});