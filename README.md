<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [grunt-tuts](#grunt-tuts)
  - [Getting Started](#getting-started)
    - [From template](#from-template)
    - [From scratch](#from-scratch)
  - [Commonly Used Plugins](#commonly-used-plugins)
    - [grunt-contrib-uglify](#grunt-contrib-uglify)
    - [grunt-contrib-jshint](#grunt-contrib-jshint)
    - [grunt-contrib-concat](#grunt-contrib-concat)
    - [grunt-contrib-watch](#grunt-contrib-watch)
    - [grunt-contrib-coffee](#grunt-contrib-coffee)
    - [grunt-contrib-nodeunit](#grunt-contrib-nodeunit)
    - [grunt-contrib-clean](#grunt-contrib-clean)
  - [Creating Tasks](#creating-tasks)
  - [Grunt API's](#grunt-apis)
    - [Logging](#logging)
    - [Config](#config)
    - [Errors](#errors)
    - [File](#file)
    - [Options](#options)
    - [Utility](#utility)
  - [Templating](#templating)

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

## Commonly Used Plugins

To automate many common tasks.


### grunt-contrib-uglify

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

### grunt-contrib-jshint

[Example](plugins-part-1/Gruntfile.js)

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

### grunt-contrib-concat

[Example](plugins-part-1/Gruntfile.js)

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

### grunt-contrib-watch

[Example](plugins-part-1/Gruntfile.js)

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

### grunt-contrib-coffee

[Example](plugins-part-1/Gruntfile.js)

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

### grunt-contrib-nodeunit

[Example](plugins-part-1/Gruntfile.js)

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

Run it

  ```bash
  grunt nodeunit
  ```

Or register a `test` task

  ```javascript
  grunt.registerTask('test', ['nodeunit']);
  ```

Then run

  ```bash
  grunt test
  ```

### grunt-contrib-clean

[Example](plugins-part-1/Gruntfile.js)

  ```bash
  npm install grunt-contrib-nodeunit --save-dev
  ```

Simple task to remove files or folders from project. For example, to wipe out the `dist` dir before running a build.

Sample configuration, `target` is array of folders to delete.

  ```javascript
  clean: {
    target: ['dist', 'lib']
  }
  ```

Run it

  ```bash
  grunt clean
  ```

Or more commonly, would add the `clean` task as part of a bigger build process.

## Creating Tasks

[Example](plugins-part-1/Gruntfile.js)

Use `grunt.registerTask` to create completely new tasks. First arg is name, optional second arg is description, third is function to execute.
For example

  ```javascript
  grunt.registerTask(
    'tutorial',                   // name
    'this is an example task',    // description
    function() {                  // function to run when task is invoked
      if (+new Date() % 2 === 0) {
        console.log('the time is even');
      } else {
        console.log('the time is odd');
      }
    }
  );
  ```

Can also create a task that takes parameters. For example

  ```javascript
  grunt.registerTask('withArgs', function(one, two) {
    var str = this.name + ": ";    // refers to name of task
    str += one || 'one';
    str += two ? ', ' + two : ', two';
    console.log(str);
  });
  ```

To run it without specifying any args

  ```bash
  grunt withArgs     // one, two
  ```

To run it specifying only first arg, note use of `:` rather than space!

  ```bash
  grunt:joe         // joe, two
  ```

To run it specifying both args

  ```bash
  grunt:joe:smith   // joe, smith
  ```

Can also create a custom multi task. First register it

  ```javascript
  grunt.registerMultiTask('multi', function() {
    console.log(this.target);
    console.log(this.data);
  });
  ```

Then provide the targets in `initConfig` section, for example

  ```javascript
  multi: {
    target: {
      name: 'Daniela',
      age: 23
    },
    other: {
      arr: [1, 2, 3],
      bool: false
    },
    last: {
      obj: {
        one: 1,
        two: 2
      }
    }
  }
  ```

Run it

  ```bash
  grunt multi
  ```

Outputs

  ```
  Running "multi:target" (multi) task
  target
  { name: 'Daniela', age: 23 }

  Running "multi:other" (multi) task
  other
  { arr: [ 1, 2, 3 ], bool: false }

  Running "multi:last" (multi) task
  last
  { obj: { one: 1, two: 2 } }
  ```

Can also just run one of the custom targets, for example

  ```bash
  grunt multi:other
  ```

Outputs

  ```
  Running "multi:other" (multi) task
  other
  { arr: [ 1, 2, 3 ], bool: false }
  ```

To create a useful task, for example that manipulates files, need to be familiar with the [Grunt API](http://gruntjs.com/api/inside-tasks).
Next sections will cover this.

## Grunt API's

[Example](api-project/Gruntfile.js)

All API functions are accessed via `grunt` object that is passed in to module.exports in Gruntfile.js.

### Logging

Grunt API exposes several methods for logging, that are better than the vanilla `console.log`.

Logging methods available via `grunt.log...`

### Config

Can get and set data from initConfig via `grunt.config...`

### Errors

Can throw errors from a task. Two different types of errors.

*Warning* error will stop proceeding of task, but can be overridden using `-- force` flag.

*Fatal* errors cannot be overridden.

  ```javascript
  grunt.registerTask('errors', function() {
    grunt.log.writeln('first line');    // this will always show
    grunt.fail.warn('second line');     // will see this line as warning
    grunt.log.writeln('third line');    // this will not be displayed unless --force is used
    grunt.fail.fatal('fourth line');    // this will show as fatal error
    grant.log.writeln('fifth line');    // will never get here
  });
  ```

### File

`grunt.file.read` to read a file into a string.

`grunt.file.readJSON` will read a JSON file into an object.

`grunt.file.write(fileName, text)` will write text to fileName.

`grunt.file.copy(src, target)` copy file src to target.

`grunt.file.mkdir(newdir)` make a new directory named newdir.

Recurse through a directory, getting access to each file name/path

  ```javascript
  grunt.file.recurse('src', function(file) {
    grunt.log.ok(file);
  });
  ```

### Options

Can use flags to alter the way a task works.

  ```javascript
  grunt.registerTask('options', function() {
    var target = grunt.option('target');
    grunt.log.writeln(target);
  });
  ```

Run it

  ```bash
  grunt options               // undefined
  grunt options --target      // true
  grunt options --no-target   // false
  grunt options --target=dev  // dev
  ```

### Utility

`kindOf` works similar to `typeof` in JavaScript, but aware of more types.

  ```javascript
  grunt.log.writeln(grunt.util.kindOf([1, 2, 3]));      // array
  grunt.util.normalizelf(string);   // prints out string with whatever line feed is required by OS (Mac newline, Windows newline & carriage return)
  ```

Recurse over object properties

  ```javascript
  // recurse over object properties
  var o = {
    name: 'Andrew',
    obj: {
      one: 1,
      two: 2
    },
    arr: ['a', 'b', 'c']
  };
  grunt.util.recurse(o, function(value) {
    grunt.log.ok(value);
  });
  ```

Outputs

  ```
  Andrew
  1
  2
  a
  b
  c
  ```

Repeat a string x number of times

  ```javascript
  grunt.log.writeln(grunt.util.repeat(16, 'Na') + ' Batman!');    // NaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNa Batman!
  ```

Pluralization to output the singular or plural form of a word depending on if the input numerb is 1 or greater

  ```javascript
  var numErrors = 4;
  grunt.log.writeln(grunt.util.pluralize(numErrors, 'function/functions'));   // functions
  numErrors = 1;
  grunt.log.writeln(grunt.util.pluralize(numErrors, 'function/functions'));   // function
  ```

Create an error from a message and throw it to force a failure

  ```javascript
  throw grunt.util.error('something bad happened!');
  ```

Output

  ```
  Warning: something bad happened! Use --force to continue.
  Aborted due to warnings.
  ```

## Templating

To avoid hard-coding configuration options.
Wherever there are options, can use templating to reference other variables.

For example, to make a dynamic banner, using information from `package.json`

  ```javascript
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: true,
        compress: true,
        sourceMap: true,
        banner: '/* <%= pkg.name %> v<%= pkg.version %> | Written by <%= pkg.author %>, 2014 <%= pkg.license %> */\n'
      },
      target: {
        src: 'dist/application.js',
        dest: 'dist/application.min.js'
      }
    }
    ...
  ```

Can also use grunt's template api's, for example, to generate today's date

  ```javascript
  <%= grunt.template.today("yyyy-mm-dd") %>   // a date like 2014-11-29
  ```

Process template to pass any data

  ```javascript
  grunt.initConfig({
    str: grunt.template.process('My name is <%= name %>', { data : { name: 'danib' } }),
    uglify: {
      banner: '<%= str %>'    // My name is danib
    }
    ...
  ```

