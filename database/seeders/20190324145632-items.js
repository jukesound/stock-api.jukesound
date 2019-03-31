// 'use strict';
import config from "../../config";
import slugify from "utils/slugify"
import faker from "faker";

export default {
  up: (queryInterface, Sequelize) => {
    const name = faker.commerce.productMaterial();
    const slug = slugify(name);

    return queryInterface.bulkInsert(config.table.prefix + config.table.items.name, [{
      name: name,
      slug: slug,
      quantity: Math.floor(faker.random.number(100)),
      quantity_buy: Math.floor(faker.random.number(20)),
      price: faker.random.number(100),
      url: faker.internet.url(),
      image: faker.image.imageUrl(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(config.table.prefix + config.table.items.name, null, {});
  }
};
