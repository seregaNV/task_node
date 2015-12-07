exports.get = function(req, res, next) {
    res.render('blog', {
        title: 'Blog'
    });
};