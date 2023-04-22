const BASE_URL = 'https://challenge.crossmint.io/api';

const BORDER_SPACE = 2;

const MAP_SIZE = { rows: 11, columns: 11 };

const ASTRAL_TYPES = Object.freeze({
  POLYANET : {
    NAME: 'POLYANET',
    URL: 'polyanets',
  },
  SOLOON: {
    NAME: 'SOLOON',
    URL: 'soloons',
  },
  COMETH: {
    NAME: 'COMETH',
    URL: 'comeths',
  },
  SPACE: {
    NAME: 'SPACE',
  }
});

module.exports = {
  BASE_URL,
  BORDER_SPACE,
  MAP_SIZE,
  ASTRAL_TYPES
};
