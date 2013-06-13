// TESTING
var soundscape = require('./backend/soundscape');
var lyrics = require('./backend/lyrics');

lyrics.getNormalizedWordsFromLyrics('15953433',10,function(list) {
    console.log(list);
    var mp3 = [];
    list.forEach(function(entry) {
        var nSounds = Math.round(list.length*entry.frequency);
        if (!nSounds) return;
        soundscape.getSounds([entry.text], {
            sounds_per_page: nSounds
        },function(sound) {
            console.log(sound);
            mp3.push(sound);
        });
    });
});
