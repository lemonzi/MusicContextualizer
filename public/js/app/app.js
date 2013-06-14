require(["jquery", "app/bootstrap", "app/playlist", "app/dropzone"],
function ($, bootstrap, Playlist, Dropzone) {


	$(function () {

        $('#submit').click(function(){
            sendFile($('fileInputEl'));
        });

        // Setup the dnd listeners.
        var dropZone = document.getElementById('drop_zone');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);

	});

    function sendFile(files) {
        var oMyForm = new FormData();
        oMyForm.append("userfile", files[0]);
        $.post('/upload',oMyForm,function(data) {
            $('#feedback').text('File upload complete. Computing fingerprint...');
        });
    }

    function initAudio() {
        $('audio').each(function(i, item) {
            Playlist.build(i, item);
        $('#player.audio').click(function(e) {
            e.preventDefault();
            Playlist.start(this);
        });
    });}

    function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      var files = evt.dataTransfer.files; // FileList object.

      // files is a FileList of File objects. List some properties.
      var output = [];
      for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');
      }
      document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
      sendFile(files);
    }


    function handleDragOver(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

});
