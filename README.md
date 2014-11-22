<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [grunt-tuts](#grunt-tuts)
  - [Getting Started](#getting-started)
    - [From template](#from-template)
    - [From scratch](#from-scratch)
  - [grunt-contrib-uglify](#grunt-contrib-uglify)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

grunt-tuts
==========

> Learning [Grunt](http://gruntjs.com/) with Tuts Plus [Getting Good with Grunt](https://code.tutsplus.com/courses/getting-good-with-grunt).

## Getting Started

Install [Node](http://nodejs.org/)

Install the Grunt cli globally

  ```bash
  npm install -g grunt-cli
  ```

Initialize a new project with `npm init` to generate a simple `package.json` file

  ```bash
  mkdir MyProject && cd $_
  npm init
  ```

Install Grunt locally as a development dependency

  ```bash
  npm install grunt --save-dev
  ```

### From template

Use [Project Scaffolding](http://gruntjs.com/project-scaffolding) to initialize a project based on a template.

First install grunt-init globally

  ```bash
  npm install -g grunt-init
  ```

Git clone any template, for example, if you're starting a JQuery plugin development project

  ```bash
  git clone https://github.com/gruntjs/grunt-init-jquery.git ~/.grunt-init/jquery
  ```

Make a project directory and run grunt-init with a template

  ```bash
  mkdir MyJQueryPlugin && cd $_
  grunt-init jquery
  ```

### From scratch

If you don't wish to use a template, you can simply install Grunt plugins as needed for your project,
for example [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)

  ```bash
  npm install grunt-contrib-uglify --save-dev
  ```

Official Grunt plugins are maintained by the core Grunt team and start with `grunt-contrib`, but many other plugins are also available.

Next section will explain how to configure the plugin and run grunt tasks.


## grunt-contrib-uglify

Create `gruntfile.js` in the root of your project. It's written as a node module.

At the top is all the plugin configuration, and at the bottom is a list of all the plugins being used.

Plugins usually have an `options` section and then any number of `targets`.

  ```javascript
  module.exports = function(grunt) {

    // plugin configuration
    grunt.initConfig({

      uglify: {                   // plugin short name, should be specified in the plugin documentation
        options: {
          mangle: true,           // shorten variable names
          compress: true,         // remove whitepsace
          sourceMap: 'dist/application.map',
          banner: '/* Your Name 2014 */\n'
        },
        app: {               // could be any label like dist, prod, etc.
          src: 'src/application.js',
          dest: 'dist/application.min.js'
        },
        util: {
          src: 'src/application.js',
          dest: 'dist/application.min.js'
        }
      }

    });


    // load all plugins at the bottom
    grunt.loadNpmTasks('grunt-contrib-uglify');
  };
  ```

Most plugins are multi-target, which means if you don't specify a target, it runs them all.

For example, to run both `app` and `util` targets in above example

  ```bash
  grunt uglify
  ```

To run just the `util` target

  ```bash
  grunt uglify:util
  ```
