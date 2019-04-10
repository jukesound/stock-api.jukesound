import ItemsFactory from 'database/factory/ItemsFactory';
import config from 'config';

export default {
  up: async () => {
    await ItemsFactory.allFields().save();
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(config.table.prefix + config.table.items.name, null, {});
  },
};
