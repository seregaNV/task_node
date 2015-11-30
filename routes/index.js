var express = require('express'),
    router = express.Router(),
    chat = require('../scripts/sc_chat'),
    companyData = require('../data/task.json'),
    util = require('util'),
    chosenCompany;

//
//title
//jumbotitle
//jumbotext



router.get('/', function(req, res, next) {
    res.render('main', {
        title: 'Tasks'
    });
});

router.get('/news', function(req, res, next) {
    res.render('main', {
        title: 'News'
    });
});

router.get('/blog', function(req, res, next) {
    res.render('blog', {
        title: 'Blog'
    });
});

router.get('/hash-map', function(req, res, next) {
    res.render('hashMap', {
        title: 'HashMap',
        jumbotitle: 'Task 9',
        jumbotext: 'Using JavaScript and prototypes write analogue HashMap (Java)'
    });
});

router.get('/slider', function(req, res, next) {
    res.render('slider', {
        title: 'Slider',
        jumbotitle: 'Task 10',
        jumbotext: 'Constructor + plugin for the slide'
    });
});

router.get('/data-json', function(req, res, next) {
    res.render('data-json', {
        title: 'Data JSON',
        jumbotitle: 'Task 17',
        jumbotext: 'Working with JSON-files and templating "Swig"'
    });
});

router.get('/company', function(req, res, next) {
    var partMessage,
        count = req.query.count,
        countData = companyData.slice(0, count);
    //    page = req.query.page;
    //console.log(count);
    //console.log(page);
    partMessage = count ? ('first ' + count) : "all";
    if ((!count || ((count == parseInt(Math.abs(count))) && count <= companyData.length)) && count != 0) {
        res.render('company-list', {
            title: 'Company list',
            jumbotitle: 'Task 17',
            jumbotext: 'Working with JSON-files and templating "Swig"',
            partMessage: partMessage,
            companyData: countData
        });
    } else {
        console.error('Incorrect value of "count"');
        throw new Error('Incorrect value of "count"');
    }
});

router.get('/company/:id', function(req, res, next) {
    var choiceId = util.format(req.params.id);
    chosenCompany = {};
    for (var i in companyData) {
        //companyData[i]._id.indexOf(choiceId)
        if (choiceId == companyData[i]._id) {
            chosenCompany.company = companyData[i].company;
            chosenCompany.country = companyData[i].country;
            chosenCompany.founding_date = companyData[i].founding_date;
            chosenCompany.phone = companyData[i].phone;
            chosenCompany.discription = companyData[i].discription;
            res.render('company-info', {
                title: chosenCompany.company,
                jumbotitle: chosenCompany.company,
                jumbotext: chosenCompany.discription,
                companyData: chosenCompany
            });
        }
    }
    if (!chosenCompany.company) {
        console.error('Wrong ID');
        throw new Error('Wrong ID');
    }
});





router.get('/simple-chat', function(req, res, next) {
    res.render('simple-chat', {
        title: 'Simple chat',
        jumbotitle: 'Simple chat',
        jumbotext: 'A simple embodiment of the chat.'
    });
});

router.use('/subscribe', function(req, res, next) {
    chat.subscribe(req, res);
});

router.use('/publish', function(req, res, next) {
    var body = '';
    /*вішаємо на "req" необхідні обработчики*/
    req.on('readable', function() {
        /*при отриманні чергового пакета данних ми прибавляємо
         * його до тимчасової пєрємєнної*/
        body += req.read();
        /*перевірка велечини повідомлення*/
        if (body.length > 1e4) {
            console.error('Your message is too big for correctly work!');
            throw new Error('Your message is too big for correctly work!');
        }
    }).on('end', function() {
        /*коли данні повністю отримані, розбираємо їх як "JSON"*/
        try {
            body = JSON.parse(body);
        } catch (e) {
            /*перевірка на валідність "JSON"*/
            console.error('Bad Request!');
            throw new Error('Bad Request!');
        }
        /*публікуємо отримані і перебрані данні в "body.message".
         * Ця команда розішле повідомлення всім, хто підписався
         * в "subscribe"*/
        chat.publish(body.message);
        /*закриваємо тєкущий запрос, через який був відправлений пост*/
        res.end("ok");
    });
});

router.use(function(req, res) {
    console.error('Page not found');
    throw new Error('Page not found');
});

module.exports = router;