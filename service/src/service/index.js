const Stock = require("../models/stock.model");
const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

const initMongoConnection = async () => {
  logger.info("Initiating the mongo connection");
  await mongoose.connect(config.mongo);
  logger.info("Connected to the mongo database");
};

const saveRecord = async ({ name, price, source }) => {
  try {
    const record = await Stock.create({
      name,
      price,
      source,
    });
    await record.save();
  } catch (error) {
    logger.error("Error while saving the record to mongodb!", error);
  }
};

module.exports = { initMongoConnection, saveRecord };
