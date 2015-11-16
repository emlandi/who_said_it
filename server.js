var app = require('express')();
var mongoose = require('mongoose');
var quotesRouter = require(__dirname + '/routes/quotesRouter');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/learn');

app.use('/api', quotesRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up on port 3000');
});
