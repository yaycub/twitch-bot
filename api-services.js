const superagent = require('superagent');
const chance = require('chance').Chance();
const URL = 'http://futuramaapi.herokuapp.com/api/quotes/100';

const getRandomQuote = () => {
  return superagent
    .get(URL)
    .then(res => {
      return chance.pickone(res.body.map(quote => {
        return {
          quote: quote.quote,
          character: quote.character
        };
      }));
    });
};

module.exports = {
  getRandomQuote
};
