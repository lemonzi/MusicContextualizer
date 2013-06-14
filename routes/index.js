
/*
 * GET home page.
 */
var engine = require("../backend/engine");

exports.index = function(req, res){
  res.render('index', { title: 'Music Contextualizer' });
};

exports.upload = function(req,res) {
    // Request body is binary
    console.log('Got the audio! Computing...');
    res.write('Working...');
    res.end();
    engine.getMP3FromTrack(req.files.file.path,10,function(mp3) {
        push_data(res,mp3);
    }, console.log);
};

function push_data(res,mp3) {
    console.log("Pushing audio to client");
    res.render('audio',{links:mp3});
}

