"use strict";
$(document).ready(function() {
    $('#chat_login_form').on('submit', function() {
        var form = $(this);

        $('.error', form).html('');
        $(":submit", form).button('loading');

        $.ajax({
            url: "/login-chat",
            method: "POST",
            data: form.serialize(),
            complete: function() {
                $(":submit", form).button("reset");
            },
            statusCode: {
                200: function() {
                    form.html("You sign in").addClass('alert-success');
                    window.location.href = "/chat";
                },
                403: function(jqXHR) {
                    var error = JSON.parse(jqXHR.responseText);
                    $('.error', form).html(error.message);
                }
            }
        });
        return false;
    });
});