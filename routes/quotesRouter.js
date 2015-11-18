var express = require('express');
var CandidateQuote = require(__dirname + '/../models/candidateQuote');
var DictatorQuote = require(__dirname + '/../models/dictatorQuote');
var quoteChoices = [CandidateQuote, DictatorQuote];
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var handleError = require(__dirname + '/../lib/handleError');
var randInt = require(__dirname + '/../lib/randInt');

quotesRouter = exports = module.exports = express.Router();

quotesRouter.get('/', function(req, res) {
  var choice = randInt(0,2);
  quoteChoices[choice].find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(JSON.stringify(data[randInt(0, data.length)]));
  });
});

//POST route which accepts an ID and 'correct' or 'incorrect' string.  Will increment correctGuesses or incorrectGuesses in database.
quotesRouter.post('/', function (req, res){
  req.on('data', function(data) {
    var objAns = JSON.parse(data.toString());
    console.log('answer: ' + objAns.answer);
    console.log('id: ' + objAns.quoteObj._id);
    // console.log('correct before: ' + objAns.quoteObj.correctGuesses);
    // console.log('incorrect before: ' + objAns.quoteObj.incorrectGuesses);
    if (objAns.answer === 'correct') {
      objAns.quoteObj.find({_id: req.params.id}).update(function(err, update) {
        if (err) return handleError(err, res);
        update = objAns.quoteObj.correctGuesses++;
        res.json({msg: 'The number of correct guesses is: ' + update});
      });

      // console.log('correct after: ' + objAns.quoteObj.correctGuesses);
      // console.log('incorrect after: ' + objAns.quoteObj.incorrectGuesses);
    };
    if (objAns.answer === 'incorrect') {
      objAns.quoteObj.find({_id: req.params.id}).update(function(err, update) {
        if (err) return handleError(err, res);
        update = objAns.quoteObj.incorrectGuesses++;
        res.json({msg: 'The number of correct guesses is: ' + update});
      });
      // console.log('correct after: ' + objAns.quoteObj.correctGuesses);
      // console.log('incorrect after: ' + objAns.quoteObj.incorrectGuesses);
    };
  });
});

// GET route which returns top 10 misattributed quotes
quotesRouter.get('/', function(req, res){

});

// GET route which returns top 10 correctly attributed quotes
quotesRouter.get('/', function(req, res){

});
