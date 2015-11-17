var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');

process.env.MONGOLAB_URI = 'mongodb://localhost/quote_dev';

require(__dirname + '/../server');
var CandidateQuote = require(__dirname + '/../models/candidateQuote');
var DictatorQuote = require(__dirname + '/../models/dictatorQuote');

describe('quotes routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should POST new quote');
  it('should NOT POST if missing person or quote fields');

  describe('get & put routes', function() {
    beforeEach(function(done) {
      (new DictatorQuote({person: 'Me', quote: 'Please work', category: 'Dictator'})).save(function(err, data) {
        expect(err).to.eql(null);
        this.dictatorQuote = data;
        done();
      }.bind(this));
    });

    it('should GET existing quote', function(done) {
      chai.request('localhost:3000')
        .get('/api')
        .end(function(err, res) {
          expect(err).to.eql(null);
          // expect(res.body).to.eql('Me'); //returns whole JSON object
          // expect(Array.isArray(res.body)).to.eql(true); //returns false
          done();
        });
    });

    it('should update(PUT) correct guesses field');
  });
});
