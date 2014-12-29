# To Browserify

This folder contains Javascript that needs to undergo a pre-compilation step using [Browserify](http://browserify.org/).

The entry point is the `to-browserify/index.js` file, the exit point is `js/bundle.js`.

From the root of this project, with `Browserify` installed, you can re-compile any changes to files in this folder by running the command `browserify to-browserify/index.js -o js/bundle.js`.
