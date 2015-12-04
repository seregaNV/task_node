/*для виводу в термінал вмісту бази данни потрібно ввести "mongo express_chat"
* і "db.documents.find()".
* При виводі ID генрується автоматично, він використовується в якості первиннрого ключя*/

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    format = require('util').format;

/*наступний код приєднається до бази данних, коли з"єднання буде встановлено,
* визове колбек*/
var url = 'mongodb://localhost:27017/chat';
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var collection = db.collection('documents');
    collection.deleteMany({}, function(err, result) {
        assert.equal(err, null);
        /*непонятно для чього зрівнювати кількість елементів з числом*/
        assert.equal(3, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        console.log(arguments);
        //callback(result);
        /*вставить в базу наступний документ*/
        collection.insertMany([{a : 1}, {b : 2}, {c : 3}], function(err, result) {
            assert.equal(err, null);
            /*непонятно для чього зрівнювати кількість елементів з числом*/
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            console.log("Inserted 3 documents into the document collection");
            //callback(result);//для чього???
            collection.count(function(err, count){
                console.log(format("count = %s", count));
                var cursor = collection.find({b:2});
                cursor.toArray(function(err, docs) {
                    assert.equal(err, null);
                    /*непонятно для чього зрівнювати кількість елементів з числом*/
                    //assert.equal(2, docs.length);
                    console.log("Found the following records");
                    console.dir(docs);
                    //callback(docs);//для чього???
                    db.close();
                });
            });
        });
    });
});

