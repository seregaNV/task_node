var express = require('express'),
    router = express.Router(),
    util = require('util'),
    companyData = require('../data/task.json'),
    chat = require('../scripts/sc_chat'),
    YouTube = require('../scripts/t16_youtube'),
    youTubeAPI = new YouTube(),
    keyAPI,
    container,
    chosenCompany;


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

//Task 9. HashMap______________________________________________________________________________________________________
router.get('/hash-map', function(req, res, next) {
    res.render('hashMap', {
        title: 'HashMap',
        jumbotitle: 'Task 9',
        jumbotext: 'Using JavaScript and prototypes write analogue HashMap (Java)'
    });
});

//Task 10. Slider______________________________________________________________________________________________________
router.get('/slider', function(req, res, next) {
    res.render('slider', {
        title: 'Slider',
        jumbotitle: 'Task 10',
        jumbotext: 'Constructor + plugin for the slide'
    });
});


//Task 16. API YouTube_________________________________________________________________________________________________
router.get('/youtube', function(req, res, next) {
    var keywords,
        videoId,
        playlistId,
        quantityResults,
        results,
        queryString;

    keyAPI = req.query.setKey;
    youTubeAPI.setKey(keyAPI);
    keywords = req.query.keywords;
    videoId = req.query.videoId;
    playlistId = req.query.playlistId;
    quantityResults = req.query.maxResults;
    if (quantityResults == "") quantityResults = 5;
    if (keyAPI == "") {
        console.error('You have not entered the Key.');
        throw new Error('You have not entered the Key.');
    } else if ((keywords && videoId) || (videoId && playlistId) || (keywords && playlistId)) {
        console.error('You must fill in only one field of: "Keywords", "Video ID" or "Playlist ID".');
        throw new Error('You must fill in only one field of: "Keywords", "Video ID" or "Playlist ID".');
    } else if (keywords) {
        youTubeAPI.search(keywords, quantityResults, function(error, result) {
            queryString = youTubeAPI.getUrl('search');
            if (result) {
                container = {};
                container.keywords = keywords;
                container.totalResults = result.pageInfo.totalResults;
                container.resultsPerPage = result.pageInfo.resultsPerPage;
                container.items = [];
                for (var i in result.items) {
                    var typeItem,
                        idItem,
                        linkItem;
                    if (result.items[i].id.videoId) {
                        typeItem = 'video';
                        idItem = result.items[i].id.videoId;
                        linkItem = 'https://www.youtube.com/watch?v=' + idItem;
                    } else if (result.items[i].id.playlistId) {
                        typeItem = 'playlist';
                        idItem = result.items[i].id.playlistId;
                        linkItem = 'https://www.youtube.com/playlist?list=' + idItem;
                    } else if (result.items[i].id.channelId) {
                        typeItem = 'channel';
                        idItem = result.items[i].id.channelId;
                        linkItem = 'https://www.youtube.com/channel/' + idItem;
                    } else {
                        console.error('Server Error');
                        throw new Error('Server Error');
                    }
                    container.items.push({
                        'type': typeItem,
                        'id': idItem,
                        'publishedAt': result.items[i].snippet.publishedAt,
                        'channelId': result.items[i].snippet.channelId,
                        'title': result.items[i].snippet.title,
                        'description': result.items[i].snippet.description,
                        'thumbnails': result.items[i].snippet.thumbnails.high.url,
                        'link': linkItem
                    });
                }
                results = JSON.stringify(result, null, 2);
                res.render('youtube-search', {
                    title: 'Keyword search',
                    jumbotitle: 'Task 16',
                    jumbotext: 'Sending a request to the API YouTube and processing response',
                    queryString: queryString,
                    container: container,
                    message: results
                });
            } else if (error) {
                results = JSON.stringify(error, null, 2);
                res.render('youtube-error', {
                    title: 'Response error',
                    jumbotitle: 'Task 16',
                    jumbotext: 'Response from API YouTube about errors',
                    queryString: queryString,
                    error: error,
                    message: results
                });
            } else {
                console.error('Server Error');
                throw new Error('Server Error');
            }
        });
    } else if (videoId) {
        youTubeAPI.getById(videoId, function(error, result) {
            queryString = youTubeAPI.getUrl('videos');
            if (result) {
                container = {};
                container.videoId = result.items[0].id;
                container.link = 'https://www.youtube.com/watch?v=' + result.items[0].id;
                container.publishedAt = result.items[0].snippet.publishedAt;
                container.channelId = result.items[0].snippet.channelId;
                container.title = result.items[0].snippet.title;
                container.description = result.items[0].snippet.description;
                container.thumbnails = result.items[0].snippet.thumbnails.standard.url;
                container.channelTitle = result.items[0].snippet.channelTitle;
                container.privacyStatus = result.items[0].status.privacyStatus;
                container.viewCount = result.items[0].statistics.viewCount;
                container.likeCount = result.items[0].statistics.likeCount;
                container.dislikeCount = result.items[0].statistics.dislikeCount;
                container.commentCount = result.items[0].statistics.commentCount;
                results = JSON.stringify(result, null, 2);
                containerr = JSON.stringify(container, null, 2);
                console.log(containerr);
                res.render('youtube-video-info', {
                    title: 'Information about the video',
                    jumbotitle: 'Task 16',
                    jumbotext: 'Sending a request to the API YouTube and processing response',
                    queryString: queryString,
                    container: container,
                    message: results
                });
            } else if (error) {
                results = JSON.stringify(error, null, 2);
                res.render('youtube-error', {
                    title: 'Response error',
                    jumbotitle: 'Task 16',
                    jumbotext: 'Response from API YouTube about errors',
                    queryString: queryString,
                    error: error,
                    message: results
                });
            } else {
                console.error('Server Error');
                throw new Error('Server Error');
            }
        });
    } else if (playlistId) {
        youTubeAPI.getPlayListById(playlistId, quantityResults, function(error, result) {
            queryString = youTubeAPI.getUrl('playlistItems');
            if (result) {
                container = {};
                container.totalResults = result.pageInfo.totalResults;
                container.resultsPerPage = result.pageInfo.resultsPerPage;
                container.playlistId = result.items[0].snippet.playlistId;
                container.linkPlaylist = 'https://www.youtube.com/playlist?list=' + container.playlistId;
                container.items = [];
                for (var i in result.items) {
                    container.items.push({
                        'id': result.items[i].contentDetails.videoId,
                        'linkVideo': 'https://www.youtube.com/watch?v=' + result.items[i].contentDetails.videoId,
                        'publishedAt': result.items[i].snippet.publishedAt,
                        'playlistId': result.items[i].snippet.playlistId,
                        'channelId': result.items[i].snippet.channelId,
                        'channelTitle': result.items[i].snippet.channelTitle,
                        'title': result.items[i].snippet.title,
                        'description': result.items[i].snippet.description,
                        'thumbnails': result.items[i].snippet.thumbnails.standard.url

                    });
                }
                results = JSON.stringify(result, null, 2);
                res.render('youtube-playlist-info', {
                    title: 'Information about the playlist',
                    jumbotitle: 'Task 16',
                    jumbotext: 'Sending a request to the API YouTube and processing response',
                    queryString: queryString,
                    container: container,
                    message: results
                });
            } else if (error) {
                results = JSON.stringify(error, null, 2);
                res.render('youtube-error', {
                    title: 'Response error',
                    jumbotitle: 'Task 16',
                    jumbotext: 'Response from API YouTube about errors',
                    queryString: queryString,
                    error: error,
                    message: results
                });
            } else {
                console.error('Server Error');
                throw new Error('Server Error');
            }
        });
    } else if (!req.query[0]) {
        res.render('youtube', {
            title: 'API YouTube',
            jumbotitle: 'Task 16',
            jumbotext: 'Sending a request to the API YouTube and processing response'
        });
    } else {
        console.error('Server Error');
        throw new Error('Server Error');
    }
});





//Task 17. Data JSON___________________________________________________________________________________________________
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

//Task 18. Autocomplete________________________________________________________________________________________________
router.get('/autocomplete', function(req, res, next) {
    var valueOfQuery = req.query.query;

    if (valueOfQuery == "") {
        res.render('not-found', {
            title: 'Not found',
            jumbotitle: 'Task 18',
            jumbotext: 'Implementation of autocomplete to search for companies',
            header: 'Null value in input',
            message: 'To select the company, please enter the value of search...'
        });

    } else if (!valueOfQuery) {
        res.render('autocomplete', {
            title: 'Autocomplete',
            jumbotitle: 'Task 18',
            jumbotext: 'Implementation of autocomplete to search for companies'
        });

    } else if (valueOfQuery) {
        var checkingExistenceOfCompany,
            //checkSubstring,
            partNameCompany,
            companyList = [];
        chosenCompany = {};
        valueOfQuery = valueOfQuery.charAt(0).toUpperCase() + valueOfQuery.substr(1).toLowerCase();

        for (var i in companyData) {
            //checkSubstring = companyData[i].company.indexOf(valueOfQuery);
            partNameCompany = companyData[i].company.slice(0, valueOfQuery.length);

            if ((valueOfQuery == partNameCompany) && (valueOfQuery != companyData[i].company)) {
                companyList.push(companyData[i]);

            } else if (valueOfQuery == companyData[i].company) {
                chosenCompany.company = companyData[i].company;
                chosenCompany.country = companyData[i].country;
                chosenCompany.founding_date = companyData[i].founding_date;
                chosenCompany.phone = companyData[i].phone;
                chosenCompany.discription = companyData[i].discription;
                checkingExistenceOfCompany = 1;
            }
        }
        if (companyList[0]) {
            res.render('company-list', {
                title: 'Chosen companies',
                jumbotitle: 'Task 18',
                jumbotext: 'Implementation of autocomplete to search for companies',
                partMessage: 'chosen',
                companyData: companyList
            });
        } else if (checkingExistenceOfCompany) {
            res.render('company-info', {
                title: chosenCompany.company,
                jumbotitle: chosenCompany.company,
                jumbotext: chosenCompany.discription,
                companyData: chosenCompany
            });
        } else {
            res.render('not-found', {
                title: 'Not found',
                jumbotitle: 'Task 18',
                jumbotext: 'Implementation of autocomplete to search for companies',
                header: 'Null result',
                message: 'Company by your request is not found...'
            });
        }
        //if (checkSubstring == 0) {
        //    //console.log('"' + checkSubstring + '"');
        //} else if (checkSubstring == -1) {
        //    //console.log(checkSubstring);
        //}
    } else {
        console.error('Incorrect value of "query"');
        throw new Error('Incorrect value of "query"');
    }
});




//Chat_________________________________________________________________________________________________________________


var User = require('scripts/user').User;


router.use('/users', function(req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);
        res.json(users);
    })
});
router.use('/user/:id', function(req, res, next){
    User.findById(req.params.id, function(err, user){
        if (err) return next(err);
        if (!user) {
            next(new HttpError(404, 'User not found.'));
        }
        res.json(user);
    })
});






//Simple chat__________________________________________________________________________________________________________
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