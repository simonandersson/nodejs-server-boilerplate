// # Task automation
var path = require('path'),

  escapeChar = process.platform.match(/^win/) ? '^' : '\\',
  cwd = process.cwd().replace(/( |\(|\))/g, escapeChar + '$1'),
  configureGrunt = function(grunt) {

  // Load all grunt dependencies
  require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

  var cfg = {

    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      build: {
        src: 'core/client/assets/css/screen.css',
        dest: 'core/client/public/css/screen.min.css'
      }
    },
    express: {
      options: {
        script: 'index.js',
        output: 'Server is running'
      },

      dev: {
        options: {
          output: ".+" // Matching this output indicates that server is running
        }
      }
    },
    browserify: {
      js: {
        src: 'core/client/assets/javascript/main.js',
        dest: 'core/client/public/javascript/main.js'
      }
    },
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'core/client/public/css/screen.css': 'core/client/assets/sass/screen.scss'
        }
      }
    },
    shell: {
      bower: {
        command: path.resolve(__dirname + '/node_modules/.bin/bower install'),
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    }
  };

  grunt.initConfig(cfg);

  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', function() {
    var config = {
      js: {
        files: ['core/client/assets/javascript/**/*.js'],
        tasks: ['js_dev'],
        options: {
          livereload: true,
          spawn: true
        }
      },
      css: {
        files: ['core/client/assets/sass/**/*.scss'],
        tasks: ['css_dev'],
        options: {
          livereload: true,
          spawn: true
        }
      },
      express: {
        // Restart any time client or server js files change
        files:  ['index.js', 'core/server/**/*.js'],
        tasks:  ['express:dev'],
        options: {
          //Without this option specified express won't be reloaded
          spawn: false
        }
      }
    };

    grunt.task.run('shell:bower');
    grunt.task.run('css_dev');
    grunt.task.run('js_dev');
    grunt.task.run('express:dev');
    grunt.config('watch', config);
    grunt.task.run('watch');
  });
  grunt.registerTask('css_dev', ['sass:dist']);
  grunt.registerTask('js_dev',  ['browserify']);
};

module.exports = configureGrunt;