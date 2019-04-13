import config from 'config';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(config.table.prefix + config.table.items.name, {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity_buy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      url: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(config.table.prefix + config.table.items.name);
  },
};
