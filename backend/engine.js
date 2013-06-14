// TESTING
var soundscape = require('./soundscape');
var lyrics = require('./lyrics');
var flatten = require('flatten');

exports.getLinksFromID = function(id,n,success) {
    lyrics.getNormalizedWordsFromLyrics(id,n,function(list) {
        var mp3 = [];
        var n = list.length;
        list.forEach(function(entry) {
            var nSounds = Math.round(list.length*entry.frequency);
            if (!nSounds) {
                n--;
                return;
            }
            soundscape.getSounds([entry.text], {
                sounds_per_page: nSounds
            },function(sound) {
                mp3.push(sound);
                n--;
                if (n <= 0) success(flatten(mp3));
            });
        });
    });
};