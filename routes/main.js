exports.get = function(req, res, next) {
    res.render('main', {
        title: 'Tasks'
    });
};