import faker from 'faker';

import config from 'config';
import Slug from 'utils/Slug/Slug';

export default {
  up: (queryInterface) => {
    const name = faker.commerce.productMaterial();
    const slug = Slug.slugify(name);

    return queryInterface.bulkInsert(config.table.prefix + config.table.items.name, [{
      name: name,
      slug: slug,
      quantity: Math.floor(faker.random.number(100)),
      quantity_buy: Math.floor(faker.random.number(20)),
      price: faker.random.number(100),
      url: faker.internet.url(),
      image: faker.image.imageUrl(),
    }, ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete(config.table.prefix + config.table.items.name, null, {});
  },
};
