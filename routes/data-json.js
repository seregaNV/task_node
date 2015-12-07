exports.get = function(req, res, next) {
    res.render('data-json', {
        title: 'Data JSON',
        jumbotitle: 'Task 17',
        jumbotext: 'Working with JSON-files and templating "Swig"'
    });
};