var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');
// var bodyParser = require('body-parser');

process.env.MONGOLAB_URI = 'mongodb://localhost/quote_dev';

require(__dirname + '/../server');
var CandidateQuote = require(__dirname + '/../models/candidateQuote');
var DictatorQuote = require(__dirname + '/../models/dictatorQuote');
// var quoteChoices = [CandidateQuote, DictatorQuote];
// var handleError = require(__dirname + '/../lib/handleError');
// var randInt = require(__dirname + '/../lib/randInt');

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
      (new DictatorQuote({person: 'You', quote: 'Hate', category: 'Dictator', correctGuesses: 0})).save(function(err, data) {
        expect(err).to.eql(null);
        this.dictatorQuote = data;
        done();
      }.bind(this));
    });

    beforeEach(function(done) {
      (new CandidateQuote({person: 'Me', quote: 'Love', category: 'Candidate', correctGuesses: 0})).save(function(err, data) {
        expect(err).to.eql(null);
        this.candidateQuote = data;
        done();
      }.bind(this));
    });

    it('should GET either dictator or candidate quote', function(done) {
      chai.request('localhost:3000')
      .get('/api')
      .end(function(err, res) {
        if (JSON.parse(res.body).category === 'Dictator') {
          expect(err).to.eql(null);
          expect(JSON.parse(res.body).person).to.eql('You');
          expect(JSON.parse(res.body).quote).to.eql('Hate');
        }
        if (JSON.parse(res.body).category === 'Candidate') {
          expect(err).to.eql(null);
          expect(JSON.parse(res.body).person).to.eql('Me');
          expect(JSON.parse(res.body).quote).to.eql('Love');
        }
        done();
      });
    });

    // it('should update(PUT) correct guesses field', function(done) {
    //   chai.request('localhost:3000')
    //     .put('/api/' + this.dictatorQuote._id)
    //     .send({correctGuesses: 5})
    //     .end(function(err, res) {
    //       expect(err).to.eql(null);
    //       expect(res.body.msg).to.eql('success!');
    //       done();
    //     });
    // });
  });
});
