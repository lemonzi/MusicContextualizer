/*
 * Node module that fingerprints audio and queries the EchoNest for finding its
 * MusixMatch ID
 */

 var request = require('request');
 var child_process = require('child_process');

 var fingerprinter = './backend/ENMFP_codegen/codegen.Darwin';
 var apiKey = 'HZFW4LZYX0APZER4I';

exports.analyzeTrack = function(path,success,error) {
    var child = child_process.execFile(fingerprinter,[path],{},function(e,data) {
        if (e) error(e);
        //var obj = JSON.parse(data);
        var obj = data;
        success(obj);
    });
};

exports.identifyFromAnalysis = function(obj,success,error) {
    params = {api_key: apiKey};
    request({
        url: 'http://developer.echonest.com/api/v4/song/identify',
        method: 'POST',
        body: obj,
        json: true,
        qs: params
    }, function(data) {
        success(data);
    },error);
};