var util = require('../src/util');

exports.testH1 = function(test) {
  test.equal(util.h1('foo'), '<h1>foo</h1>', 'strings should be equal');
  test.done();
};