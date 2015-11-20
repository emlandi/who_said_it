var express = require('express');
var CandidateQuote = require(__dirname + '/../models/candidateQuote');
var DictatorQuote = require(__dirname + '/../models/dictatorQuote');
var quoteChoices = [CandidateQuote, DictatorQuote];
var choiceKey = {'Candidate': CandidateQuote, 'Dictator': DictatorQuote};
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var handleError = require(__dirname + '/../lib/handleError');
var randInt = require(__dirname + '/../lib/randInt');
var percentCorrect = require(__dirname + '/../lib/percentcorrect');

quotesRouter = exports = module.exports = express.Router();

quotesRouter.get('/', function(req, res) {
  var choice = randInt(0,2);
  quoteChoices[choice].find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(JSON.stringify(data[randInt(0, data.length)]));
  });
});

quotesRouter.post('/', bodyParser.json(), function (req, res){
  var person = req.body.quoteObj;
  if(req.body.answer === 'correct') {
    choiceKey[person.category].update({_id: person._id}, { $inc: {correctGuesses: 1}}, function(err, data) {
      if (err) return handleError(err, res);
      res.json({msg: 'update successful'});
    });
  } else {
    choiceKey[person.category].update({_id: person._id}, { $inc: {incorrectGuesses: 1}}, function(err, data) {
      if (err) return handleError(err, res);
      res.json({msg: 'update successful'});
    });
  }
});

function total(quoteObj) {
  var correct = quoteObj.correctGuesses;
  var incorrect = quoteObj.incorrectGuesses;
  var totalGuesses = correct + incorrect;

  return totalGuesses;
}

quotesRouter.get('/stats', function(req, res) {
  DictatorQuote.find({}, function(err, dictatorData) {
    if (err) return handleError(err, res);
    CandidateQuote.find({}, function(err, candidateData) {
      if (err) return handleError(err, res);
      var all = dictatorData.concat(candidateData);

      var correct = all.sort(function (a, b) {
        return b.correctGuesses - a.correctGuesses;
      });

      var incorrect = all.slice().sort(function (a, b) {
        return b.incorrectGuesses - a.incorrectGuesses;
      });

      var results = {top: correct.slice(0, 10),
                     bottom: incorrect.slice(0, 10)};

      res.send(JSON.stringify(results));
    });
  });
});
