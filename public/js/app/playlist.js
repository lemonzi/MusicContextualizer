
define(['jquery'],function($) {

    var Playlist = {
        tracks: []
    };

    var playing = null;
    var next = null;

    Playlist.build = function(index, element) {
        Playlist.tracks.push({
            position: index,
            element: element
        });
        Playlist.setupNext(index, element);
    };

    Playlist.setupNext = function(index, item) {
        $(item).bind('ended', {
            itemIndex: index
        }, function(event) {
            var nextIndex = event.data.itemIndex + 1;
            next = item;
            Playlist.playIndex(nextIndex);
        });
    };

    Playlist.playIndex = function(index) {
        $.each(Playlist.tracks, function(i, item) {
            if (index == item.position) {
                playing = item.element;
                item.element.play();
            }
        });
    };

    Playlist.start = function(element) {
        $(element).addClass('playing').text('playing...');
        Playlist.playIndex(0);
    };

    return Playlist;

});
