var identify = require('./backend/identify');
var engine = require('./backend/engine');

var path = '/Users/lemonzi/Music/HQ/Michael Jackson/Thriller/6 Billie Jean.aiff';

identify.analyzeTrack(path, function(data) {
    console.log(data);
    identify.identifyFromAnalysis(data,console.log,console.log);
});

/*

engine.getLinksFromID('15953433',10,function(links){
    console.log(links);
});

*/