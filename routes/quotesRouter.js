var express = require('express');
var CandidateQuote = require(__dirname + '/../models/quotes').candidateQuote;
var DictatorQuote = require(__dirname + '/../models/quotes').dictatorQuote;
var mongoose = require('mongoose');
var handleError = require(__dirname + '/../lib/handleError');

quotesRouter = exports = module.exports = express.Router();
