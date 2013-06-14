Don't you think that sometimes songs (musically speaking) have nothing to do with their lyrics? Well, this hacks tries to solves this, although it's a bit extreme.

Give it a sound file, and it will give you back another sound that contains Freesound samples with tags that actually match the lyrics.

On the backend, it basically fingerprints the audio with the Echonest ENMFP, queries it in their server to find out the track, from this it derives possible MusixMatch IDs, fetches lyrics from them, processes them using a linguistic model and queries the main words to freesound. The number of sounds assigned to each main word depends on its weight.

Additionally, I created a node.js package for accessing the Freesound API, based on a client-side library. It's already on [npmjs](https://npmjs.org/package/freesound) (npm install freesound) and [github](https://github.com/lemonzi/node-freesound), and probably has some bugs. Feel free to jump in! 
