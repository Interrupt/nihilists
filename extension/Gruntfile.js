var mozjpeg = require('imagemin-mozjpeg');


module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-image-resize');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    image_resize: {
      options: {
        width: 1920,
        height: 1080,
        overwrite: true
      },
      files: {
        src: 'images/background_*.jpg',
        dest: 'resized/'
      }
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 4,
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'resized/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/'                  // Destination path prefix
        }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['image_resize', 'imagemin']);
}
