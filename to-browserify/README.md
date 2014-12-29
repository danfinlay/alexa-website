# To Browserify

This folder contains Javascript that needs to undergo a pre-compilation step using [Browserify](http://browserify.org/).

The entry point is the `to-browserify/index.js` file, the exit point is `js/bundle.js`.

From the root of this project, with `Browserify` installed, you can re-compile any changes to files in this folder by running the command `browserify -t brfs to-browserify/index.js -o js/bundle.js`, or to live-rebuild on file changes, you can install `watchify` and run `watchify -t brfs to-browserify/index.js js/bundle.js`.

## Installing Dependencies

Install [Node.js](http://nodejs.org/) for your platform.

Install browserify globally from your command line by running the command `npm i -g browserify`.

(Optional) Install watchify globally for live-reloading with the command `npm i -g watchify`.

Install local dependencies by navigating to the `to-browserify` folder and running `npm i`.
