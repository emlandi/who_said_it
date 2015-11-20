var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');

process.env.MONGOLAB_URI = 'mongodb://localhost/quote_dev_test';

require(__dirname + '/../server');
var CandidateQuote = require(__dirname + '/../models/candidateQuote');
var DictatorQuote = require(__dirname + '/../models/dictatorQuote');

describe('quotesRouter.js', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  before(function(done) {
    (new DictatorQuote({person: 'You', quote: 'Hate', category: 'Dictator', correctGuesses: 10, incorrectGuesses: 0})).save(function(err, data) {
      expect(err).to.eql(null);
      this.dictatorQuote = data;
      done();
    }.bind(this));

  });

  before(function(done) {
    (new CandidateQuote({person: 'Me', quote: 'Love', category: 'Candidate', correctGuesses: 0, incorrectGuesses: 10})).save(function(err, data) {
      expect(err).to.eql(null);
      this.candidateQuote = data;
      done();
    }.bind(this));
  });

  describe("the '/' get route", function() {
    it('should GET either dictator or candidate quote', function(done) {
      chai.request('localhost:3000')
      .get('/api')
      .end(function(err, res) {
        expect(res.status).to.eql(200);
        expect(err).to.eql(null);
        if (JSON.parse(res.body).category === 'Dictator') {
          expect(JSON.parse(res.body).person).to.eql('You');
          expect(JSON.parse(res.body).quote).to.eql('Hate');
          expect(JSON.parse(res.body)).to.have.property('_id');
        }
        if (JSON.parse(res.body).category === 'Candidate') {
          expect(JSON.parse(res.body).person).to.eql('Me');
          expect(JSON.parse(res.body).quote).to.eql('Love');
          expect(JSON.parse(res.body)).to.have.property('_id');
        }
        done();
      });
    });
  });

  describe("the '/' POST route", function() {
    it('should update (POST) correct guesses field in dictatorQuote db', function(done) {
      chai.request('localhost:3000')
      .post('/api')
      .send(data = {quoteObj: this.dictatorQuote, answer: 'correct'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body).to.be.a('object');
        expect(res.body.msg).to.eql('update successful');
        done();
      });
    });

    it('should update (POST) incorrect guesses field in candidateQuote db', function(done) {
      chai.request('localhost:3000')
      .post('/api')
      .send(data = {quoteObj: this.candidateQuote, answer: 'incorrect'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body).to.be.a('object');
        expect(res.body.msg).to.eql('update successful');
        done();
      });
    });
  });

  describe("the '/stats' GET route", function() {
    it('should GET most correctly attributed quotes', function(done) {
      var results = {top: this.dictatorQuote, bottom: this.candidateQuote};
      chai.request('localhost:3000')
      .get('/api/stats')
      .send(results)
      .end(function(err, res) {
        var top = JSON.parse(res.text).top;
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(top).to.be.a('array');
        expect(top[0].correctGuesses).to.be.above(top[0].incorrectGuesses);
        expect(top[0].quote).to.eql('Hate');
        done();
      });
    });

    it('should GET most incorrectly attributed quotes', function(done) {
      var results = {top: this.dictatorQuote, bottom: this.candidateQuote};
      chai.request('localhost:3000')
      .get('/api/stats')
      .send(results)
      .end(function(err, res) {
        var bottom = JSON.parse(res.text).bottom;
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(bottom).to.be.a('array');
        expect(bottom[0].incorrectGuesses).to.be.above(bottom[0].correctGuesses);
        expect(bottom[0].quote).to.eql('Love');
        done();
      });
    });
  });
});
