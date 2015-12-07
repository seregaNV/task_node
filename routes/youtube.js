exports.get = function(req, res, next) {
    var YouTube = require('../scripts/t16_youtube'),
        youTubeAPI = new YouTube(),
        keyAPI,
        keywords,
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
};