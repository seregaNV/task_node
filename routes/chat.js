exports.get = function(req, res, next) {
    res.render('chat', {
        title: 'Chat',
        jumbotitle: 'Chat',
        jumbotext: 'Implementation of a chat with support sessions, the authorization and templating'
    });
};