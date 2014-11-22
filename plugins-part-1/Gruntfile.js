module.exports = function(grunt) {

  grunt.initConfig({

    uglify: {
      options: {
        mangle: true,
        compress: true,
        sourceMap: 'dist/application.map',
        banner: '/* danib 2014 */\n'
      },
      app: {
        src: 'src/application.js',
        dest: 'dist/application.min.js'
      },
      util: {
        src: 'src/util.js',
        dest: 'dist/util.min.js'
      }
    },

    jshint: {
      // Specify options inline
      // options: {
      //   eqeqeq: true,   // disallow double equals, must use triple equals
      //   curly: true,    // always use curly braces even for one liners
      //   undef: true     // must use var keyward
      // },
      // Point to .jshintrc file
      options: {
        jshintrc: '.jshintrc'
      },
      dev: {
        src: 'src/*.js' // jshint doesn't modify files, so only need src, no dest
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

};