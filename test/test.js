var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var mongoose = require('mongoose');

process.env.MONGOLAB_URI = 'mongodb://localhost/quote_dev_test';

require(__dirname + '/../server');
var CandidateQuote = require(__dirname + '/../models/candidateQuote');
var DictatorQuote = require(__dirname + '/../models/dictatorQuote');

describe('quotes GET & POST routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  beforeEach(function(done) {
    (new DictatorQuote({person: 'You', quote: 'Hate', category: 'Dictator', correctGuesses: 10, incorrectGuesses: 0})).save(function(err, data) {
      expect(err).to.eql(null);
      this.dictatorQuote = data;
      done();
    }.bind(this));
  });

  beforeEach(function(done) {
    (new CandidateQuote({person: 'Me', quote: 'Love', category: 'Candidate', correctGuesses: 0, incorrectGuesses: 10})).save(function(err, data) {
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
        expect(JSON.parse(res.body)).to.have.property('_id');
      }
      if (JSON.parse(res.body).category === 'Candidate') {
        expect(err).to.eql(null);
        expect(JSON.parse(res.body).person).to.eql('Me');
        expect(JSON.parse(res.body).quote).to.eql('Love');
        expect(JSON.parse(res.body)).to.have.property('_id');
      }
      done();
    });
  });

  it('should update (POST) correct guesses field in dictatorQuote db', function(done) {
    chai.request('localhost:3000')
    .post('/api')
    .send(data = {quoteObj: this.dictatorQuote, answer: 'correct'})
    .end(function(err, res) {
      expect(err).to.eql(null);
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
      expect(res.body).to.be.a('object');
      expect(res.body.msg).to.eql('update successful');
      done();
    });
  });

  it('should GET most correctly attributed quotes', function(done) {
    chai.request('localhost:3000')
    .get('api/stats')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect((res.body).quote).to.eql('Hate');
      expect((res.body).correctGuesses).to.eql(10);
      done();
    });
  });

  it('should GET most incorrectly attributed quotes', function(done) {
    chai.request('localhost:3000')
    .get('api/stats')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect((res.body).quote).to.eql('Love');
      expect((res.body).incorrectGuesses).to.eql(10);
      done();
    });
  });

});

//  quotesRouter.get('/stats', function(req, res) {
//   DictatorQuote.find({}, function(err, dictatorData) {
//     if (err) return handleError(err, res);
//     CandidateQuote.find({}, function(err, candidateData) {
//       if (err) return handleError(err, res);
//       var all = dictatorData.concat(candidateData);
//       var sorted = all.sort(function (a, b) {
//         return percentCorrect(b) - percentCorrect(a);
//       });
//       var results = {top: sorted.slice(0, 10),
//                      bottom: sorted.slice(-10)};
//       res.send(JSON.stringify(results));
//     });
//   });
// });


