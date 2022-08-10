const { faker } = require("@faker-js/faker");

const createRequest = () => {
  return {
    name: faker.finance.currencyCode(),
    price: faker.finance.amount(),
    source: "gateway",
  };
};

module.exports = { createRequest };
