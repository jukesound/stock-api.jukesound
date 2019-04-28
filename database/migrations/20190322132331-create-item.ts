import { QueryInterface } from 'sequelize';

import config from '@config/index';

export default {
  up: (queryInterface: QueryInterface, DataType: any) => {
    return queryInterface.createTable(config.table.prefix + config.table.items.name, {
      id: {
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      slug: {
        type: DataType.STRING,
        unique: true,
      },
      quantity: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      quantity_buy: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataType.FLOAT,
      },
      url: {
        type: DataType.TEXT,
      },
      image: {
        type: DataType.TEXT,
        allowNull: false,
      },
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(config.table.prefix + config.table.items.name);
  },
};
