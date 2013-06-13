/*
 * Module for musixMatch API querying and lyrics parsing
 *
 */

var request = require('request');

var key = '5594e12a32b1da8732b13724e88114e2';

exports.getLyrics = function(id, cb) {
    request({
        url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
        qs: {
            apikey: key,
            track_id: 'id'
        },
        json: true
    },
        function(e,r,data) {
            var lyrics = data.message.body.lyrics.lyrics_body;
            if (cb)
                cb(lyrics);
        }
    );
};

exports.getDictionary = function(str,cb) {

    var words = str.replace(/[,;.]/g,'').split(/[\s\/]+/g).sort();
    var iWordsCount = words.length; // count w/ duplicates

    // array of words to ignore
    var ignoreW = ['and','the','to','a','of','for','as','i','with','it','is','on','that','this','can','in','be','has','if'];
    ignore = (function(){
        var o = {}; // object prop checking > in array checking
        var iCount = ignoreW.length;
        for (var i=0;i<iCount;i++){
            o[ignoreW[i]] = true;
        }
        return o;
    }());
    var counts = {}; // object for math
    var sWord = words[i];
    for (var i=0; i<iWordsCount; i++) {
        if (!ignore[sWord]) {
            counts[sWord] = counts[sWord] || 0;
            counts[sWord]++;
        }
    }
    var arr = []; // an array of objects to return
    for (sWord in counts) {
        arr.push({
            text: sWord,
            frequency: counts[sWord]
        });
    }
    // sort array by descending frequency | http://stackoverflow.com/a/8837505
    var result = arr.sort(function(a,b){
        return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
    });

    if (cb)
        cb(result);

    return result;
};