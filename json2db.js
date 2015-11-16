var mongoose = require('mongoose');
var CandidateQuote = require(__dirname + '/models/candidateQuote');
var DictatorQuote = require(__dirname + '/models/dictatorQuote');
var fs = require('fs');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/quote_dev');

var json = JSON.parse(fs.readFileSync('dictators.json'));

for (var key in json) {
  for (var element in json[key]) {
    var quote = new DictatorQuote({person: key, quote: json[key][element]});
    quote.save();
    console.log(quote);
  }
}

DictatorQuote.count({}, function(err, count) {
  console.log('There are ' + count + ' dictator quotes in the database.');
  mongoose.disconnect();
});
