var mongoose = require('mongoose');

var candidateQuoteSchema = new mongoose.Schema({
  person: {type: String, required: true},
  quote: {type: String, required: true},
  correctGuesses: {type: Number, default: 0},
  incorrectGuesses: {type: Number, default: 0}
});

module.exports = new mongoose.Model('candidateQuote', candidateQuoteSchema);
