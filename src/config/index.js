const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8080,
  CANDIDATE_ID: process.env.CANDIDATE_ID,
};
