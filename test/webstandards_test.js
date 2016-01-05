'use strict';

var path = require('path'),
  exec = require('child_process').exec;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.webstandards = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  allFiles: function (test) {
    // mostly a smoke test to make sure the plugin is calling the vorlon side of things and that there is an output from vorlon
    test.expect(1);
    exec('grunt webstandards:allFiles', {cwd: path.join(__dirname, '..')}, function (error, stdout) {
      test.equal(
        stdout.length,
        1822,
        'unexpected output'
      );
      test.done();
    });
  }
};
