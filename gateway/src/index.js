const { initConnection, publish } = require("./utils/queue");
const logger = require("./utils/logger");
const config = require("./utils/config");
const { createRequest } = require("./utils/create");

const main = async () => {
  await initConnection();
  var count = 0;
  while (count < 100000) {
    try {
      const payload = createRequest();
      publish("log-price", JSON.stringify({ ...payload }));
      count += 1;
    } catch (error) {}
  }
};

main();
