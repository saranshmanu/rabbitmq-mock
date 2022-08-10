const config = {
  mongo: process.env.MONGO || "mongodb://127.0.0.1:27017/database",
  env: process.env.ENV || "development",
  queueUrl: process.env.QUEUE || "amqp://localhost",
};

module.exports = config;
