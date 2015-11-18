var express = require('express');
var CandidateQuote = require(__dirname + '/../models/candidateQuote');
var DictatorQuote = require(__dirname + '/../models/dictatorQuote');
var quoteChoices = [CandidateQuote, DictatorQuote];
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var handleError = require(__dirname + '/../lib/handleError');
var randInt = require(__dirname + '/../lib/randInt');

quotesRouter = exports = module.exports = express.Router();

var choiceKey = {'Candidate': CandidateQuote, 'Dictator': DictatorQuote};

quotesRouter.get('/', function(req, res) {
  var choice = randInt(0,2);
  quoteChoices[choice].find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(JSON.stringify(data[randInt(0, data.length)]));
  });
});

quotesRouter.post('/', bodyParser.json(), function (req, res){
  var person = req.body.quoteObj;
  console.log(person);
  if(req.body.answer === 'correct') {
    choiceKey[person.category].findOneAndUpdate({_id: person._id}, { $inc: {correctGuesses: 1}});
    console.log(req.body.answer);
    console.log(person);
  } else {
    choiceKey[person.category].findOneAndUpdate({_id: person._id}, { $inc: {incorrectGuesses: 1}});
    console.log(req.body.answer);
    console.log(person);
  }
});

// quotesRouter.get('/', function(req, res){

// });

// quotesRouter.get('/', function(req, res){

// });

/* Need:
-patch route which accepts an ID and 'correct' or 'incorrect' string.  Will increment correctGuesses or incorrectGuesses in database.
-get route which returns top 10 misattributed quotes
-get route which returns top 10 correctly attributed quotes
*/
