// 'use strict';
import config from "../../config";
import faker from "faker";

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(`${config.tablePrefix}items`, [{
      name: faker.commerce.productMaterial(),
      quantity: Math.floor(faker.random.number(100)),
      quantity_buy: Math.floor(faker.random.number(20)),
      price: faker.random.number(100),
      url: faker.internet.url(),
      image: faker.image.imageUrl(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(`${config.tablePrefix}items`, null, {});
  }
};
