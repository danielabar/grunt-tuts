/*
 * grunt-fnList
 * https://github.com/danielabar/grunt-tuts
 *
 * Copyright (c) 2014 John Doe
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('fnList', 'Lists the function in JS files', function() {

    // regex to match all NAMED functions in js files
    //    start with function
    //    catch as many word characters as possible, but only if there are word characters
    //    make it global
    var re = /function (\w*)? ?(\(.*\))/g;

    // Iterate over all files provided by the target to this plugin
    this.files[0].src.forEach(function (file) {
      grunt.log.subhead('Functions in ' + file);

      var text = grunt.file.read(file);
      var unnamedFns = 0;   // count of unnamed functions
      var namedFns = 0;     // count of named functions
      var fns = [];         // functions
      var result;           // result will fill this in later

      // grunt.log.debug(re.exec(text));

      // regex being global, means first time exec is called, will find first match, second time will find next match etc.
      while( (result = re.exec(text)) !== null) {
        grunt.log.debug('result[1] = ' + result[1] + '  result[2] = ' + result[2]);
        if (result[1] === undefined) {
          unnamedFns++;
        } else {
          namedFns++;
          fns.push(result[1] + result[2]);
        }
      }

      grunt.log.writeln('# ' + unnamedFns + ' Unnamed Functions');
      grunt.log.writeln('# ' + namedFns + ' Named Functions');
      grunt.util.recurse(fns, function(fn) {
        grunt.log.ok(fn);
      });
    });

  });

};
