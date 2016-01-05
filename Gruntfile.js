/*
 * grunt-webstandards
 * https://github.com/MicrosoftDX/gulp-webstandards
 *
 * Copyright (c) 2016 Rami Sayar
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-contrib-*', 'gruntify-*', 'grunt-*']});

  // Project configuration.
  grunt.initConfig({
    eslint: {
      src: [
        'Gruntfile.js',
        'tasks/lib/*.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      default: ['tmp', '.tscache'],
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    webstandards: {
      allFiles: {
        options: {
        },
        src: ['test/fixtures/*']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    // Typescript Vorlon Compile
    ts: {
      compileVorlon: {
        src: ['tasks/vendor/custom-vorlon/**/*.ts'],
        options: {
          inlineSourceMap: true,
          target: 'es5',
          removeCommments: false
        },
        out: 'tasks/vendor/vorlon.js'
      }
    },

    concat: {
      compileVorlon: {
        options: {
          footer: '\n\nmodule.exports = VORLON;\n'
        },
        src: ['tasks/vendor/vorlon.js'],
        dest: 'tasks/vendor/vorlon.js'
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Compile Vorlon
  grunt.registerTask('compile-vorlon', ['ts:compileVorlon', 'concat:compileVorlon']);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['eslint', 'test']);

};
