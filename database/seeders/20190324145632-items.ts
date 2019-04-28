import { QueryInterface } from 'sequelize';

import ItemsFactory from '@database/factory/ItemsFactory';
import config from '@config/index';

export default {
  up: async () => {
    await ItemsFactory.allFields().save();
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(config.table.prefix + config.table.items.name, null, {});
  },
};
