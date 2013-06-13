/*
 * Module for musixMatch API querying and lyrics parsing
 *
 */

var request = require('request');

var mmKey = '5594e12a32b1da8732b13724e88114e2';

exports.stopList = require('./stoplist.json');

exports.getLyrics = function(id, success, error) {
    request({
        url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
        qs: {
            apikey: mmKey,
            track_id: id
        },
        json: true
    },
        function(e,r,data) {
            if (e || data.message.header.status_code != 200) {
                console.log('Error while querying MusixMatch: '+data.message.header.status_code);
                if (error) error(data.message);
            } else {
                var lyrics = data.message.body.lyrics.lyrics_body;
                success(lyrics);
            }
        }
    );
};

exports.getDictionary = function(str,cb) {

    var words = str.replace(/[,;.]/g,'')
                   .split(/[\s\/]+/g)
                   .filter(function(s){return s.indexOf('\'') == -1;}) // exlude words with apostrophe
                   .sort();
    var iWordsCount = words.length; // count w/ duplicates

    // array of words to ignore
    var stopList = exports.stopList;
    ignore = (function(){
        var o = {}; // object prop checking > in array checking
        var iCount = stopList.length;
        for (var i=0;i<iCount;i++){
            o[stopList[i]] = true;
        }
        return o;
    }());
    var counts = {}; // object for math
    for (var i=0; i<iWordsCount; i++) {
        var sWord = words[i].toLowerCase();
        if (!ignore[sWord]) {
            counts[sWord] = counts[sWord] || 0;
            counts[sWord]++;
        }
    }
    var arr = []; // an array of objects to return
    for (var w in counts) {
        arr.push({
            text: w,
            frequency: counts[w]
        });
    }
    // sort array by descending frequency | http://stackoverflow.com/a/8837505
    var result = arr.sort(function(a,b){
        return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
    });

    if (cb) cb(result);

    return result;
};

exports.getMainWords = function(dict,n,cb) {
    n = Math.min(n,dict.length);
    dict.splice(n);
    var res = dict.map(function(w){ return w.text; });
    if (cb) cb(res);
    return res;
};

exports.getNormalizedWords = function(dict,n,cb) {
    n = Math.min(n,dict.length);
    dict.splice(n);
    var factor = dict.reduce(function(prev,cur) {
        return prev + cur.frequency;
    },0);
    var res = dict.map(function(word) {
        word.frequency = word.frequency / factor;
        return word;
    });
    if (cb) cb(res);
    return res;
};

exports.getMainWordsFromLyrics = function(id,n,success, error) {
    exports.getLyrics(id, function(lyrics) {
        var dict = exports.getDictionary(lyrics);
        success(exports.getMainWords(dict,n));
    },error);
};

exports.getNormalizedWordsFromLyrics = function(id,n,success,error) {
    exports.getLyrics(id,function(lyrics) {
        var dict = exports.getDictionary(lyrics);
        success(exports.getNormalizedWords(dict,n));
    },error);
};