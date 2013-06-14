// TESTING
var soundscape = require('./soundscape');
var lyrics = require('./lyrics');
var identify = require('./identify');
var flatten = require('flatten');

var MMID = [];

function recursiveQueryMM(N,success, error) {
    if (MMID.length === 0) {
        console.log('Error: lyrics not found');
        error();
    }
    exports.getLinksFromMMID(MMID.pop(),N,function(links){
        console.log(links);
        success(links);
    }, recursiveQueryMM.bind(this,N,success,error));
}

exports.getLinksFromMMID = function(id,n,success,error) {
    lyrics.getNormalizedWordsFromLyrics(id,n,function(list) {
        var mp3 = [];
        var n = list.length;
        console.log('Querying Freesound...');
        list.forEach(function(entry) {
            var nSounds = Math.round(list.length*entry.frequency);
            if (!nSounds) {
                n--;
                return;
            }
            soundscape.getSounds([entry.text], {
                sounds_per_page: nSounds,
                filter: 'duration:[0 TO 3]'
            },function(sound) {
                mp3.push(sound);
                n--;
                if (n <= 0) success(flatten(mp3));
            },error);
        });
    },error);
};

exports.getMP3FromTrack = function(path, N, success, error) {
    identify.analyzeTrack(path, function(data) {
        console.log('Track fingerprinted. Querying echoNest...');
        identify.identifyFromAnalysis(data,function(song) {
            console.log('Track identified: ' + song.title);
            console.log('Getting musixMatch ID...');
            identify.getMMID(song.id,function(ids) {
                MMID = ids;
                console.log('MusixMatch ID: ' + ids);
                recursiveQueryMM(N,success,error);
            },error);
        },error);
    },error);
};
