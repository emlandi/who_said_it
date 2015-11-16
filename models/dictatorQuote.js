var mongoose = require('mongoose');

var quoteSchema = new mongoose.Schema({
  person: {type: String, required: true},
  quote: {type: String, required: true},
  category: {type: String, default: 'Dictator'},
  correctGuesses: {type: Number, default: 0},
  incorrectGuesses: {type: Number, default: 0}
});

module.exports = mongoose.model('DictatorQuote', quoteSchema);
