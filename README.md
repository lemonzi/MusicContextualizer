Music Contextualizr
===================

![Are the dependencies up to date?](https://david-dm.org/lemonzi/MusicContextualizer.png)

Don't you think that sometimes songs (musically speaking) have nothing to do with their lyrics? Well, this hacks tries to solves this, although it's a bit extreme.

Give it a sound file, and it will give you back another sound that contains Freesound samples with tags that actually match the lyrics.

On the backend, it basically fingerprints the audio with the Echonest ENMFP, queries it in their server to find out the track, from this it derives possible MusixMatch IDs, fetches lyrics from them, processes them using a linguistic model and queries the main words to freesound. The number of sounds assigned to each main word depends on its weight.

Additionally, I created a node.js package for accessing the Freesound API, based on a client-side library. It's already on [NPM](https://npmjs.org/package/freesound) (`npm install freesound`) and [GitHub](https://github.com/lemonzi/freesound.js), and probably has some bugs. Feel free to jump in!

Usage
=====

* Run `npm install` to fetch dependencies. This will automatically run `bower install` to fetch client-side assets.
* Put you API Keys (see below).
* Download an [EchoNest fingerprinter](http://developer.echonest.com/downloads/license) and put the path to the binary in [`backend/identify.js`](backend/identify.js).
* Run `node app`.
* Enjoy :)

API Keys
--------

Place your API keys in the following files

* EchoNest: [`backend/identify.js`](backend/identify.js)
* MusixMatch: [`backend/lyrics.js`](backend/lyrics.js)
* Freesound: [`backend/soundscape.js`](backend/soundscape.js)

