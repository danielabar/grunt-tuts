module.exports = function(grunt) {

  grunt.initConfig({

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
    },

    uglify: {
      options: {
        mangle: true,
        compress: true,
        sourceMap: 'dist/application.map',
        banner: '/* danib 2014 */\n'
      },
      target: {
        src: 'dist/application.js',
        dest: 'dist/application.min.js'
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
      target: {
        src: 'src/*.js' // jshint doesn't modify files, so only need src, no dest
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify'])

};