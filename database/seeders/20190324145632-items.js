// 'use strict';
import config from "../../config";

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(`${config.tablePrefix}items`, [{
      name: 'Planche de bois',
      quantity: 12,
      quantity_buy: 10,
      price: 5,
      url: 'www.google.fr',
      image: 'www.google.fr/image',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(`${config.tablePrefix}items`, null, {});
  }
};
