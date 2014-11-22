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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

};