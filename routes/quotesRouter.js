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
    if (err) return handleError(err, data);
    res.json(JSON.stringify(data[randInt(0, data.length)]));
  });
});
