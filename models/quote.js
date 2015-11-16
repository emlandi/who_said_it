var mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema({
  person: {type: String, required: true},
  quote: {type: String, required: true},
  correctGuesses: {type: Number, default: 0},
  incorrectGuesses: {type: Number, default: 0}
});

module.exports.candidateQuote = mongoose.model('CandidateQuote', quoteSchema);
module.exports.dictatorQuote = mongoose.model('DictatorQuote', quoteSchema);
