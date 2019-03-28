// @refactor: use config file for tablePrefix

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jss_items', {
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
        allowNull: false,
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
    return queryInterface.dropTable('jss_items');
  }
};
