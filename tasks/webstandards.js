/*
 * grunt-webstandards
 * https://github.com/MicrosoftDX/gulp-webstandards
 *
 * Copyright (c) 2016 Rami Sayar
 * Licensed under the MIT license.
 */

'use strict';

var html = require('html-entities').AllHtmlEntities,
  path = require('path'),
  _ = require('lodash'),
  vorlonChecker = require('./lib/vorlon-checker');

module.exports = function (grunt) {
  grunt.registerMultiTask('webstandards', 'Grunt plugin that improves your site with modern web standards.', function () {
    var symbols = {
      'ok': '✓',
      'err': '✖',
      'space': '  '
    };

    // With node.js on Windows: use symbols available in terminal default fonts
    if (process && process.platform === 'win32') {
      symbols.ok = '\u221A';
      symbols.err = '\u00D7';
    }

    function stripVorlonHtml (s) {
      var suggestion = s.split(':');
      suggestion[0] = suggestion[0].replace(/<\/?strong>/g, '').trim();
      suggestion[1] = suggestion[1].trim();
      return suggestion;
    }

    function prettyPrintVorlon (results) {
      _.forIn(results.rules, function (item) {
        _.forIn(item.rules, function (rule) {
          if (rule.failed) {
            // print rule title
            grunt.log.error(symbols.err + ' ' + rule.title + ': ' + rule.description);
            // print suggestions
            _.forIn(rule.items, function (suggestion) {
              if ('title' in suggestion && suggestion.title !== null) {
                // only one suggestions
                grunt.log.writeln(new Array(3).join(symbols.space),
                  html.decode(suggestion.title.replace(/\r?\n|\r/g, ' ')));

              } else {
                _.forIn(suggestion.items, function (subsug) {
                  grunt.log.writeln(new Array(3).join(symbols.space),
                    html.decode(subsug.title.replace(/\r?\n|\r/g, ' ')));

                  _.forIn(_.pluck(subsug.items, 'title'), function (i) {
                    grunt.log.writeln(new Array(5).join(symbols.space),
                      stripVorlonHtml(i)[0], 'is', stripVorlonHtml(i)[1]);
                  });
                });
              }
            });
          } else {
            grunt.log.ok(symbols.ok + ' ' + rule.title);
          }
        });
      });
    }

    // Merge task-specific and/or target-specific options with these defaults.
    // var options = this.options({});

    this.filesSrc.forEach(function (file) {
      var language = path.extname(file),
        contents = null;

      // check if file exists
      if (!grunt.file.exists(file)) {
        grunt.log.warn('Source file ' + file + ' not found.');
        return;
      }

      // should we be ignoring this file?
      if (['.html', '.html', '.js', '.css'].indexOf(language) === -1) {
        grunt.log.warn('Ignoring ' + file);
        return;
      }

      grunt.log.subhead('Checking ' + file);
      contents = grunt.file.read(file);

      // pass off to the approriate checker function...
      try {
        if (['.html', '.htm'].indexOf(language) !== -1) {
          prettyPrintVorlon(vorlonChecker.checkHTML(contents));
        } else if (language === '.js') {
          prettyPrintVorlon(vorlonChecker.checkJavaScript(contents));
        } else if (language === '.css') {
          prettyPrintVorlon(vorlonChecker.checkCSS(contents));
        }
      } catch (e) {
        // in case of a jsdom error
        grunt.log.error('Internal error: ' + e.message);
      }
    });
  });
};
