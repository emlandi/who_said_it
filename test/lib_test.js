var handleError = require(__dirname + '/../lib/handleError');
var randInt = require(__dirname + '/../lib/randInt');
var percentCorrect = require(__dirname + '/../lib/percentcorrect');
var expect = require('chai').expect;

describe('percentcorrect.js', function() {
  it('should return the percent of correct guesses rounded down to nearest percentage point', function() {
    var quoteObj = {
      correctGuesses: 32,
      incorrectGuesses: 21
    };
    expect(percentCorrect(quoteObj)).to.eql(60);
  });
});
describe('randInt.js', function() {
  it('should return a random number from min to max, not including max', function() {
    var max = 10;
    var min = 0;
    for (var i = 0; i < 100; i++){
      var rand = randInt(min, max);
      expect(rand).to.be.at.least(min);
      expect(rand).to.be.below(max);
    }
  });
});
describe('handleError.js', function() {
  it('should return and error message and set the response status to 500', function() {
    var res = {
      status: function(stat) {
        this.s = stat;
        return this;
      },
      json: function(message) {
        this.m = message;
      }
    };
    handleError('test error', res);
    expect(res.s).to.eql(500);
    expect(res.m).to.eql({msg: 'server error'});
  });
});
