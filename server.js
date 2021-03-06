var express = require('express');
var app = express();
var mongoose = require('mongoose');
var quotesRouter = require(__dirname + '/routes/quotesRouter');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/quote_dev');

app.use(express.static('public'));
app.use('/api', quotesRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up on port 3000');
});
