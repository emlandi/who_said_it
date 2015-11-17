var mongoose = require('mongoose');
var CandidateQuote = require(__dirname + '/models/candidateQuote');
var DictatorQuote = require(__dirname + '/models/dictatorQuote');
var fs = require('fs');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/quote_dev');

var dictatorsJson = JSON.parse(fs.readFileSync('dictators.json'));
var candidatesJson = JSON.parse(fs.readFileSync('candidates.json'));

for (var key in dictatorsJson) {
  for (var element in dictatorsJson[key]) {
    var quote = new DictatorQuote({person: key, quote: dictatorsJson[key][element]});
    quote.save();
    console.log(quote);
  }
}

for (var key in candidatesJson) {
  for (var element in candidatesJson[key]) {
    var quote = new CandidateQuote({person: key, quote: candidatesJson[key][element]});
    quote.save();
    console.log(quote);
  }
}

DictatorQuote.count({}, function(err, count) {
  console.log('There are ' + count + ' dictator quotes in the database.');
});

CandidateQuote.count({}, function(err, count) {
  console.log('There are ' + count + ' candidate quotes in the database.');
});
