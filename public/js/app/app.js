require(["jquery", "app/bootstrap", "app/playlist", "app/dropzone"],
function ($, bootstrap, Playlist, Dropzone) {

	$(function () {
        initAudio();
	});

    function initAudio() {
        $('audio').each(function(i, item) {
            Playlist.build(i, item);
        $('.play').click(function(e) {
            e.preventDefault();
            Playlist.start(this);
        });
    });}

});
