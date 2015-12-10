var request = require('request');
var queryString = require('querystring');

var YouTube = function() {

    var _this = this;
    _this.url = 'https://www.googleapis.com/youtube/v3/';

    _this.params = {};
    _this.parts = [];

    _this.setKey = function(key) {
        _this.addParam('key', key);
    };

    _this.addPart = function(name) {
        _this.parts.push(name);
    };

    _this.addParam = function(key, value) {
        _this.params[key] = value;
    };

    _this.getUrl = function(path) {
        _this.link = _this.url + path + '?' + queryString.stringify(_this.params);
        return _this.link;
    };

    _this.getParts = function() {
        return _this.parts.join(',');
    };

    _this.request = function(url, callback) {
        request(url, function(error, response, body) {
            if (error) {
                callback(error);
            }
            else {
                _this.statusCode = response.statusCode;
                var data = JSON.parse(body);
                if (response.statusCode == 200) {
                    callback(null, data);
                }
                else {
                    callback(data.error);
                }
            }
        });
    };
    _this.newError = function(message) {

        return {
            error : {
                message: message
            }
        };
    };

    _this.clear = function() {
        _this.parts = [];
        _this.params = {};
    };

    _this.search = function(query, maxResults, callback) {
        _this.addPart('snippet');
        _this.addParam('part', _this.getParts());
        _this.addParam('q', query);
        _this.addParam('maxResults', maxResults);
        _this.request(_this.getUrl('search'), callback);
        _this.clear();
    };

    _this.getById = function(id, callback) {
        _this.addPart('snippet');
        _this.addPart('contentDetails');
        _this.addPart('statistics');
        _this.addPart('status');
        _this.addParam('part', _this.getParts());
        _this.addParam('id', id);
        _this.request(_this.getUrl('videos'), callback);
        _this.clear();
    };


    _this.getPlayListById = function(id, maxResults, callback) {
        _this.addPart('contentDetails');
        _this.addPart('id');
        _this.addPart('snippet');
        _this.addPart('status');
        _this.addParam('part', _this.getParts());
        _this.addParam('playlistId', id);
        _this.addParam('maxResults', maxResults);
        _this.request(_this.getUrl('playlistItems'), callback);
        _this.clear();
    };
};

module.exports = YouTube;