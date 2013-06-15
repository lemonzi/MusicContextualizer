/*
 * Module with methods that query
 * Freesound and get sounds related to some words
 */

var request = require('request'),
    freesound = require('freesound');

freesound.apiKey = 'MY_FREESOUND_API_KEY';

exports.getSounds = function(words,options,success, error) {
    if (words instanceof Array) words = words.join(' ');
    freesound.search(words,options,function(data){
        var mp3 = data.sounds.map(function(sound){
            return options.highQuality ?
                sound['preview-hq-mp3'] : sound['preview-lq-mp3'];
        });
        success(mp3);
    }, error);
};
