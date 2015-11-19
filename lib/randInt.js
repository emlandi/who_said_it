var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());

module.exports = function(min, max) {
  return random.integer(min, (max - 1));
};
