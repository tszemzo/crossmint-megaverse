const app = require('./app');
const config = require('./config');
const logger = require('./logger');
const astralService = require('./services/astral');

const start = async () => {
  app.listen(config.PORT, () => {
    logger.info(`Megaverse API listening on port ${config.PORT}`);
  });

  await astralService.createPolyanetCross();
  await astralService.createLogo();
};

start();
