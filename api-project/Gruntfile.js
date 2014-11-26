module.exports = function(grunt) {

  grunt.initConfig({
    config: {
      name: 'andrew'
    },
    jshint: {
      options: {
        eqeqeq: true
      }
    }
  })

  // A custom task demonstrating Grunt logging API's
  grunt.registerTask('logs', function() {
    grunt.log.subhead('All the Logs');              // log a heading
    grunt.log.write('no linebreak after this.');    // log plain text with no linebreak
    grunt.log.writeln('linebreak after this.');     // log plain text with a linebreak
    grunt.log.error('this is an error');            // log an error

    // manually wrap long error text
    grunt.log.errorlns('this is a crazy long error message. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ab reiciendis veritatis a, sed fuga amet iusto est voluptates? Minima laborum perspiciatis nam repudiandae tempore, ullam possimus facere sed nisi quasi corporis, distinctio ut doloribus provident accusantium aliquam deleniti reiciendis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quisquam suscipit ipsa, iusto nesciunt ab hic. Exercitationem, facere iure a, nostrum eligendi asperiores nihil illo nesciunt inventore debitis expedita placeat! Omnis dicta, voluptate vitae obcaecati. Dolore ea numquam, voluptatum tenetur.');

    // positive status message
    grunt.log.ok('Everything is fine.');
    grunt.log.oklns('A really long ok message. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur ullam facilis deleniti cumque, similique aliquam dolor et ipsum praesentium suscipit culpa vero eum libero ratione tempore, expedita voluptatum. Veritatis consequuntur, cum quia optio reiciendis! Amet ex, nisi autem possimus voluptas rerum deleniti quas tempore aspernatur perspiciatis, velit, magni laboriosam, nihil itaque. Suscipit ipsum voluptatibus obcaecati provident tempore, ratione ab ad.');
  });

  // A custom task demonstrating how to extract config information from initConfig
  grunt.registerTask('config', function() {
    // Method 1 to get config: pass in array traversing down the object
    var configName = grunt.config.get(['config', 'name']);
    grunt.log.ok('config.name is: ' + configName);

    // Method 2 to get config: pass in a dotted string
    var jshintOptions = grunt.config.get('jshint.options.eqeqeq');
    grunt.log.ok('jshint.options.eqeqeq is: ' + jshintOptions);

    // Can also set options
    grunt.config('jshint.options.undef', false);
    grunt.log.ok('jshint.options.undef is: ' + grunt.config.get('jshint.options.undef'));
  });

  // A custom task demonstrating different types of errors
  grunt.registerTask('errors', function() {
    grunt.log.writeln('first line');    // this will always show
    grunt.fail.warn('second line');     // will see this line as warning
    grunt.log.writeln('third line');    // this will not be displayed unless --force is used
    grunt.fail.fatal('fourth line');    // this will show as fatal error
    grant.log.writeln('fifth line');    // will never get here
  });

  // A custom task demonstrating file apis
  grunt.registerTask('files', function() {
    // Read any file into a string
    var str = grunt.file.read('.gitignore');
    grunt.log.writeln(str);

    // Read json file into an object
    var json = grunt.file.readJSON('package.json');   // json is an object
    console.log(json.devDependencies);

    // Read yaml file
    var yaml = grunt.file.readYAML('data.yaml');
    console.log(yaml);

    grunt.file.write('somefile.txt', 'this is a message');    // Write to a file
    grunt.file.copy('somefile.txt', 'other.txt');             // Copy a file
    grunt.file.delete('other.txt');                           // Delete a file
    grunt.file.mkdir('newdir');                               // Make a directory

    // Recurse through a directory
    grunt.file.recurse('src', function(file) {
      grunt.log.ok(file);
    });
  });

  // A custom task demonstrating working with options
  grunt.registerTask('options', function() {
    var target = grunt.option('target');
    grunt.log.writeln(target);
  });

  // A custom task demonstrating various utilities
  grunt.registerTask('util', function() {
    // similar to JavaScript typeOf, but understands more types
    grunt.log.writeln(grunt.util.kindOf([1, 2, 3]));
  });


}