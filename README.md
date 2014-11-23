<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [grunt-tuts](#grunt-tuts)
  - [Getting Started](#getting-started)
    - [From template](#from-template)
    - [From scratch](#from-scratch)
  - [grunt-contrib-uglify](#grunt-contrib-uglify)
  - [grunt-contrib-jshint](#grunt-contrib-jshint)
  - [grunt-contrib-concat](#grunt-contrib-concat)
  - [grunt-contrib-watch](#grunt-contrib-watch)
  - [grunt-contrib-coffee](#grunt-contrib-coffee)
  - [grunt-contrib-nodeunit](#grunt-contrib-nodeunit)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

grunt-tuts
==========

> Learning [Grunt](http://gruntjs.com/) with Tuts Plus [Getting Good with Grunt](https://code.tutsplus.com/courses/getting-good-with-grunt).

## Getting Started

Install [Node.js](http://nodejs.org/)

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

## grunt-contrib-jshint

  ```bash
  npm install grunt-contrib-jshint --save-dev
  ```

[Options](http://jshint.com/docs/options/) can be specified in the options object of `Gruntfile.js` or in `.jshintrc` file.

Sample configuration

  ```javascript
  jshint: {
    options: {
      eqeqeq: true,   // disallow double equals, must use triple equals
      curly: true,    // always use curly braces even for one liners
      undef: true,    // must use var keyward
      unused: true    // alert for created but unused variables
    },
    target: {
      src: 'src/*.js' // jshint doesn't modify files, so only need src, no dest
    }
  }
  ```

Run it

  ```bash
  grunt jshint
  ```

## grunt-contrib-concat

  ```bash
  npm install grunt-contrib-concat --save-dev
  ```

Sample configuration

  ```javascript
  concat: {
    options: {
      separator: ';',     // char to use between files that are being put together
      banner: '/* danib 2014 */\n'
    },
    target: {
      // example of array config rather than wildcarding
      src: ['src/application.js', 'src/util.js'],
      dest: 'dist/application.js'
    }
  }
  ```

Run it

  ```bash
  grunt concat
  ```

To use concat and uglify together, can specify the `dest` of concat as the `src` of uglify.

Then create a task that combines both of these

  ```javascript
  grunt.registerTask('default', ['concat', 'uglify'])
  ```

If anything in the chain fails, the process will halt and the other tasks will not run.

Task named `default` has special meaning to grunt. When `grunt` is run on the command line with no task name,
the `default` task will be run.

## grunt-contrib-watch

  ```bash
  npm install grunt-contrib-watch --save-dev
  ```

Watch for changes in specified files, and run tasks whenever those files are changed.

Watch is a little different from other plugins. Rather than having options and targets,
it's targets are on the outside.

Sample configuration - run jshint whenever any js file changes

  ```javascript
  watch: {
    scripts: {
      files: ['src/*.js'],
      tasks: ['jshint']
    }
  }
  ```

  ```bash
  grunt watch:scripts
  ```

## grunt-contrib-coffee

  ```bash
  npm install grunt-contrib-coffee --save-dev
  ```

Sample configuration using [dynamic file objects](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) in target

  ```javascript
  coffee: {
    options: {
      bare: true,       // do not wrap in immediately invoked function expression (iife)
      join: false,      // do not join all the coffee files together before converting to javascript
      separator: ';'    // char to use between files that are being put together
    },
    target: {
      expand: true,     // expand file paths
      cwd: 'src',       // current working directory that dynamic file object will be working inside of
      src: '*.coffee',  // which files to compile, no need to specify dir because of cwd specified above
      dest: 'lib',      // where to put compiled files
      ext: '.js'        // extension to put on compiled files
    }
  }
  ```

Run it

  ```bash
  grunt coffee
  ```

## grunt-contrib-nodeunit

[Nodeunit](https://github.com/caolan/nodeunit) is a unit testing framework for [Node.js](http://nodejs.org/).

  ```bash
  npm install grunt-contrib-nodeunit --save-dev
  ```

Sample configuration, note no options are needed. And target can simply be specified inline, no object needed

  ```javascript
  nodeunit: {
    target: 'test/*_test.js'    // given that all test files are located in test folder and suffixed with _test
  }
  ```