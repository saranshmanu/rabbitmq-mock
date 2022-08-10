const config = {
  port: process.env.PORT | "8080",
  env: process.env.ENV || "development",
  queueUrl: process.env.QUEUE || "amqp://localhost",
};

module.exports = config;
