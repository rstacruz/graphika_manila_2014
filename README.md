# Graphika Manila 2014

This is HTML5 application, built with [Brunch](http://brunch.io).

## Getting started

* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * [Bower](http://bower.io): `npm install -g bower`
    * Brunch plugins and Bower dependencies: `npm install & bower install`.
* Run:
    * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `brunch build --production` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `public/`.
    * [Brunch site](http://brunch.io)


-----

## Where is everything

 * `app/assets/` - images, files, etc
 * `app/assets/index.html` - main site
 * `app/css/` - Sass + Bourbon stylesheets
 * `app/js/` - JavaScript files
 * `public/` - generated files

-----

## Ffmpeg options

Install ffmpeg with --enable-libvpx (or --with-libvpx in Homebrew).

Create webm format:

 * ffmpeg -i input.mp4 -c:v libvpx -an -b:v 1M out.webm
 * ffmpeg -i input.mp4 -b:v 1M out.mp4
