exports.description = 'Sets up an Express and Backbone application';

exports.template = function(grunt, init, done) {

  // Ask user some setup questions. First arg is object we're leaving empty.
  // Second arg is array of values needed to get project up and running
  // Third arg is function to process the properties
  init.process({}, [

    // first arg is prompt, second (optional) arg is default if user does not provide
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('licenses', 'MIT'),

    // special values -> users of templates can create a defaults file for these
    init.prompt('author_name'),
    init.prompt('author_url')
  ], function(err, props) {

      // setup to scaffold user's new project, files will be all files in the root folder
      var files = init.filesToCopy(props);

      // grunt knows how to copy license file
      init.addLicenseFiles(files, props.licenses);

      // copy the files from root folder to user's newly scaffolded project dir, props is a context object
      // any file in the root folder can have templating directives, to which prop values can be applied
      init.copyAndProcess(files, props);

      // finally, write the package.json file
      init.writePackageJSON('package.json', {
        name: props.name,
        version: props.version,
        description: props.description,
        author: {
          name: props.author_name,
          url: props.author_url
        },
        scripts: {
          start: 'nodemon server.js'
        },
        dependencies: {
          "express": "latest",
          "jade": "latest"
        },
        devDependencies: {
          "grunt": "latest",
          "grunt-contrib-clean": "^0.6.0",
          "grunt-contrib-coffee": "^0.12.0",
          "grunt-contrib-concat": "^0.5.0",
          "grunt-contrib-jshint": "^0.10.0",
          "grunt-contrib-nodeunit": "^0.4.1",
          "grunt-contrib-uglify": "^0.6.0",
          "grunt-contrib-watch": "^0.6.1"
        }
      });
      done();
  });
};