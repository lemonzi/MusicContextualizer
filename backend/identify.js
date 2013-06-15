/*
 * Node module that fingerprints audio and queries the EchoNest for finding its
 * MusixMatch ID
 */

 var request = require('request');
 var child_process = require('child_process');

 var fingerprinter = './backend/ENMFP_codegen/codegen.Darwin';
 var apiKey = 'MY_ECHONEST_API_KEY';

exports.analyzeTrack = function(path,success,error) {
    var child = child_process.execFile(fingerprinter,[path],{},function(e,data) {
        if (e) error(e);
        //var obj = JSON.parse(data);
        var obj = data;
        success(obj);
    });
};

exports.identifyFromAnalysis = function(obj,success,error) {
    var params = {
        api_key: apiKey,
        bucket: 'id:musixmatch-WW'
    };
    request({
        url: 'http://developer.echonest.com/api/v4/song/identify',
        method: 'POST',
        body: obj,
        headers: {
            'Content-type': 'application/octet-stream'
        },
        json: true,
        qs: params
    },function(e, r, body) {
        if (e || r.statusCode != 200)
            error(r.statusCode);
        else {
            var song = body.response.songs[0];
            success(song);
        }
    });
};

exports.getMMID = function(id,success,error) {
    var params = {
        api_key: apiKey,
        bucket: 'id:musixmatch-WW',
        id: id,
        limit: true
    };
    request({
        url: 'http://developer.echonest.com/api/v4/song/profile',
        method: 'GET',
        json: true,
        qs: params
    },function(e, r, body) {
        if (e || r.statusCode != 200 || body.response.songs.length === 0)
            error(r.statusCode);
        else {
            var ids_obj = body.response.songs[0].foreign_ids;
            var ids = ids_obj.map(function(obj) {
                return obj.foreign_id.split(':')[2];
            });
            success(ids);
        }
    });
};
