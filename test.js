var identify = require('./backend/identify');
var engine = require('./backend/engine');

//var path = '/Users/lemonzi/Music/HQ/Michael Jackson/Thriller/6 Billie Jean.aiff';
var path = '/Users/lemonzi/Music/HQ/Michael Jackson/Thriller/4 Thriller.aiff';

var MMID =[];

function recursiveQueryMM() {
    if (MMID.length === 0) {
        console.log('Error: lyrics not found');
    }
    engine.getLinksFromMMID(MMID.pop(),10,function(links){
        console.log(links);
    }, recursiveQueryMM);
}

identify.analyzeTrack(path, function(data) {
    identify.identifyFromAnalysis(data,function(song) {
        identify.getMMID(song.id,function(ids) {
            MMID = ids;
            console.log('MusixMatch ID: ' + ids);
            recursiveQueryMM();
        });
    });
});
