import { Sequelize } from "sequelize";
import sequelize from "../../database";

const Item = sequelize.define('items', {
  name: {
    type: Sequelize.STRING
  },
});

module.exports = Item;
