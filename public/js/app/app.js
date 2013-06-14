require(["jquery", "app/bootstrap", "app/playlist", "app/dropzone"],
function ($, bootstrap, Playlist, Dropzone) {

	$(function () {
        $('.wrapper').dropzone({
            url: '/upload',
            sending: function(){
                $('#message').text('Loading...');
            },
            complete: function() {
                $('#message').text('');
            },
            success: function(foo,data) {
                $('.audiocontainer').html(data);
                initAudio();
            }
        });
	});

    function initAudio() {
        $('audio').each(function(i, item) {
            Playlist.build(i, item);
        $('.play').click(function(e) {
            e.preventDefault();
            Playlist.start(this);
            $('.play').addClass('disabled');
        });
    });}

});
