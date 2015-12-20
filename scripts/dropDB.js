var mongoose = require('scripts/mongoose');

mongoose.connection.on('open',
    function dropDatabase(){
        var db = mongoose.connection.db;
        db.dropDatabase();
    });
mongoose.disconnect();