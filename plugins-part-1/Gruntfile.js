module.exports = function(grunt) {

  var bannerContent = [
    '/*',
    '* <%= pkg.name %> v<%= pkg.version %> | Authored by: <%= pkg.author %>, 2014 <%= pkg.license %>',
    '* Generated on <%= grunt.template.today("yyyy-mm-dd") %>',
    '*** Experiment with grunt.template.date:  <%= grunt.template.date(new Date(100), "yyyy-mm-dd") %>',
    '*** Experiment with grunt.template.process: <%= str %>',
    '*/'
  ].join('\n');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    str: grunt.template.process('My name is <%= name %>', { data : { name: 'danib' } }),

    uglify: {
      options: {
        mangle: true,
        compress: true,
        sourceMap: true,
        banner: bannerContent
      },
      target: {
        src: 'dist/application.js',
        dest: 'dist/application.min.js'
      }
    },

    concat: {
      options: {
        separator: ';',     // char to use between files that are being put together
        banner: bannerContent
      },
      target: {
        // example of array config rather than wildcarding
        src: ['src/application.js', 'src/util.js'],
        dest: 'dist/application.js'
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
    },

    nodeunit: {
      target: 'test/*_test.js'    // given that all test files are located in test folder and suffixed with _test
    },

    clean: {
      target: ['dist', 'lib']
    },

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

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['nodeunit']);
  grunt.registerTask('default', ['jshint', 'nodeunit', 'clean', 'coffee', 'concat', 'uglify']);

  // Example of custom task
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

  grunt.registerTask(
    'mydebug',
    function() {
      var json = grunt.file.readJSON('package.json');
      console.log(json.author);
    }
  );

  // Example of custom task that accepts parameters
  grunt.registerTask('withArgs', function(one, two) {
    var str = this.name + ": ";    // refers to name of task
    str += one || 'one';
    str += two ? ', ' + two : ', two';
    console.log(str);
  });

  // Example of custom multi task (see configuration in initConfig section)
  grunt.registerMultiTask('multi', function() {
    console.log(this.target);
    console.log(this.data);
  });

};