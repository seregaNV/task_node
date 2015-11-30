"use strict";
$(document).ready(function() {
    //        При сабміті форми создається "XMLHttpRequest", і повідомлення звичайним порядком
    //        постяться на сервер.
    $('#js_sc_publish').on('submit', function () {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/publish", true);
        xhr.send(JSON.stringify({message: this.elements.message.value}));
        this.elements.message.value = '';
        return false;
    });
    //А для отримання нових повідомлень використовується алгоритм long-polling.
    //Є ф-я "subscribe()", яка запускає "XMLHttpRequest", і каже отримай данні з УРЛ "/subscribe"

    subscribe();

    function subscribe() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/subscribe", true);
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                setTimeout(subscribe, 500);
                return;
            }
            $('#js_sc_messages').append('<li>' + this.responseText + '</li>');
            subscribe();
        };
        xhr.send(null);
    }
});