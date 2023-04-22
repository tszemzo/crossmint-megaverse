const _ = require('lodash');

const logger = require('../logger');

const { api } = require('./api');
const { BASE_URL, BORDER_SPACE, MAP_SIZE, ASTRAL_TYPES } = require('../utils/constants');
const { CANDIDATE_ID } = require('../config');

const self = {
  createPolyanetCross,
  createLogo,
};

module.exports = self;

async function createPolyanetCross(mapSize = MAP_SIZE, borderSpace = BORDER_SPACE) {
  const promises = [];
  const { rows } = mapSize;
  const url = `${BASE_URL}/polyanets`;

  let c1 = borderSpace; // this column index will be incremented
  let c2 =  mapSize.columns - 1 - borderSpace; // this column index will be decremented

  for (let i = BORDER_SPACE; i < rows - BORDER_SPACE; i++) {
    if (c1 === c2) {
      promises.push(api.post(url, { row: i, column: c1, candidateId: CANDIDATE_ID }));
    } else {
      promises.push(api.post(url, { row: i, column: c1, candidateId: CANDIDATE_ID }));
      promises.push(api.post(url, { row: i, column: c2, candidateId: CANDIDATE_ID }));
    }

    c1++;
    c2--;
  }
  
  try {
    const results = await Promise.all(promises);
    logger.info('Polyanet cross created');    
    return results;
  } catch (err) {
    logger.error('Error creating polyanet cross', err)
    throw new Error('Error creating polyanet cross', err);
  }
};

async function createLogo() {
  const { goal } = await getMapGoal(CANDIDATE_ID);
  if (!goal) {
    throw new Error('No map goal found');
  }

  const rows = _.map(goal, (row, i) => parseRow(row, i));

  try {
    let row = 0;
    // O(N^2): Time complexity of this loop is O(N^2) because we have two nested loops.
    // I tried to use Promise.all() to paralelize but it didn't work properly as the challenge API is throwing 429 errors (Too many requests)
    // As we have a limited number of requests per minute, I decided to go this way, we don't care too much about performance for this task.
    for (const astrals of rows) {
      logger.info(`Processing row ${row} of ${rows.length}...`);    
      row++;
      for (const astral of astrals) {
        const { row, column, color, direction, type } = astral;
        const url = `${BASE_URL}/${type}`;
        await api.post(url, { row, column, color, direction, candidateId: CANDIDATE_ID });
      }
    }

    logger.info('Logo created');    
    return true;
  } catch (err) {
    logger.error('Error creating logo', err)
    throw new Error('Error creating logo', err);
  }
};

function parseRow(row, i) {
  return _.compact(
    _.map(row, (astral, j) => {
      if (astral && astral !== ASTRAL_TYPES.SPACE.NAME) {
        const { type, color, direction } = createAstral(astral);
        return { row: i, column: j, color, direction, type };
      }
    })
  );
};

// Factory pattern
function createAstral(astral) {
  const [characteristic, type] = _.split(astral, '_');
  // TODO: validate characteristic
  switch (type) {
    case ASTRAL_TYPES.SOLOON.NAME:
      return { type: ASTRAL_TYPES.SOLOON.URL, color: _.lowerCase(characteristic) }
    case ASTRAL_TYPES.COMETH.NAME:
      return { type: ASTRAL_TYPES.COMETH.URL, direction: _.lowerCase(characteristic) }
    default:
      return { type: ASTRAL_TYPES.POLYANET.URL };
  }
};

async function getMapGoal(candidateId) {
  const url = `${BASE_URL}/map/${candidateId}/goal`;

  try {
    const map = await api.get(url);
    logger.info('Map retrieved');    
    return map;
  } catch (err) {
    logger.error('Error retrieving map', err)
    throw new Error('Error retrieving map', err);
  }
};
