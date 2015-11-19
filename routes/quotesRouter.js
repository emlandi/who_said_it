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

quotesRouter.get('/test', function(req, res, next) {
  DictatorQuote.aggregate([{ $sort: {correctGuesses: -1}}], [{ $sort: {incorrectGuesses: -1}}], function(err, data) {
    if (err) return handleError(err, res);
    res.json(data.slice(0, 5));
  });

  // CandidateQuote.aggregate([{ $sort: {correctGuesses: -1}}], function(err, data) {
  //   if (err) return handleError(err, res);
  //   res.json(JSON.stringify(data.slice(0, 5)));
  // });

  // DictatorQuote.aggregate([{ $sort: {incorrectGuesses: -1}}], function(err, data) {
  //   if (err) return handleError(err, res);
  //   res.json(JSON.stringify(data.slice(0, 5)));
  // });

  // CandidateQuote.aggregate([{ $sort: {incorrectGuesses: -1}}], function(err, data) {
  //   if (err) return handleError(err, res);
  //   res.json(JSON.stringify(data.slice(0, 5)));
  // });
});
