const superagent = require('superagent');
const chance = require('chance').Chance();

const getFuturamaQuote = () => {
  return superagent
    .get('http://futuramaapi.herokuapp.com/api/quotes/100')
    .then(res => {
      return chance.pickone(res.body.map(quote => {
        return {
          quote: quote.quote,
          character: quote.character
        };
      }));
    });
};

const getDragQuote = () => {
  return superagent
    .get('http://www.nokeynoshade.party/api/queens/all')
    .then(res => {
      return chance.pickone(res.body.map(quote => {
        return {
          quote: quote.quote,
          character: quote.name
        };
      }));
    });
};

const getSimpsonQuote = () => {
  return superagent
    .get('https://thesimpsonsquoteapi.glitch.me/quotes')
    .then(res => {
      return {
        quote: res.body[0].quote,
        character: res.body[0].character
      };
    });
};

const getOpening = () => {
  return superagent
    .get('https://swapi.co/api/films/?format=json')
    .then(res => {
      return chance.pickone(res.body.results.map(film => {
        return {
          quote: film.opening_crawl,
          character: film.title
        };
      }));
    });
};

module.exports = {
  getFuturamaQuote,
  getDragQuote,
  getSimpsonQuote,
  getOpening
};
