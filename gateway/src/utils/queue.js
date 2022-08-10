const mqlib = require("amqplib");
const logger = require("./logger");
const config = require("./config");
const createCleanupProcess = require("./cleanup");

/**
 * The function initates the connection with the Rabbit MQ server
 */
var channel;
const initConnection = async () => {
  try {
    logger.info("Initiating the rabbitmq connection");
    const connection = await mqlib.connect(config.queueUrl);
    channel = await connection.createChannel();
    createCleanupProcess(() => {
      if (connection) {
        connection.close();
      }
    });
    logger.info("Connected to rabbitmq successfully");
  } catch (error) {
    logger.error("Failed to init connection");
  }
};

/**
 * The function publishes the message to the queue
 */
const publish = async (queueName = "", data) => {
  try {
    const queue = await channel.assertQueue(queueName);
    if (queue) {
      channel.sendToQueue(queueName, Buffer.from(data));
      logger.info(`Published the message to queue named - ${queueName}`);
    }
  } catch (err) {
    logger.error(`Error while publishing the message to queue named - ${queueName}`);
  }
};

/**
 * The function listens for the incoming messages in the queue to process them
 * @param {*} queueName
 * @param {*} callback
 */
const initConsumer = async (queueName = "", callback = (message) => {}) => {
  try {
    logger.info(`Initiating the listener to queue named - ${queueName}`);
    const queue = await channel.assertQueue(queueName);
    if (queue) {
      await channel.consume(queueName, (message) => {
        if (message) {
          callback(message.content.toString());
        }
        channel.ack(message);
      });
      logger.info(`Successfully initiated the listener to queue named - ${queueName}`);
    }
  } catch (err) {
    logger.error(`Error while initiating the listener to queue named - ${queueName}`);
  }
};

module.exports = {
  initConnection,
  publish,
  initConsumer,
};
