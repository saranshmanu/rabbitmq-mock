const logger = require("./utils/logger");
const { initConnection, initConsumer } = require("./utils/queue");
const { initMongoConnection, saveRecord } = require("./service");

const main = async () => {
  try {
    logger.info("Initiating the service container");
    await initMongoConnection();
    await initConnection();

    initConsumer("log-price", (message) => {
      try {
        logger.info("Message received");
        const payload = JSON.parse(message);
        saveRecord({ ...payload });
      } catch (error) {
        logger.error("Error while processing the message");
      }
    });
  } catch (error) {
    logger.error("Error while initiating the service container", error);
  }
};

main();
