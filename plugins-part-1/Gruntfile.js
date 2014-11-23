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
    },

    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['jshint']
      }
    },

    coffee: {
      options: {
        // bare: true,    // true: do not wrap in immediately invoked function expression (iife)
        bare: false,      // false: wrap in immediately invoked function expression (iife)
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

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify'])

};