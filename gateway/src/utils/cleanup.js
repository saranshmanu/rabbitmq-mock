const createCleanupProcess = (callback = () => {}) => {
  [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, callback.bind(null, eventType));
  });
};

module.exports = createCleanupProcess
