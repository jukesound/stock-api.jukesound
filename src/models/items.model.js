import * as Joi from 'joi';
import { Model, Sequelize } from 'sequelize';
import sequelize from 'database';
import config from 'config';

class ItemsModel extends Model {
  static schemaDefault () {
    return Joi.object().keys({
      id: Joi.number().integer().required(),
      name: Joi.string().required(),
      slug: Joi.string().required(),
      quantity: Joi.number().integer().required(),
      quantity_buy: Joi.number().integer().required(),
      price: Joi.number().optional(),
      url: Joi.string().optional(),
      image: Joi.string().required(),
    });
  }

  static schemaUpdate () {
    return Joi.object().keys({
      name: Joi.string().optional(),
      slug: Joi.string().optional(),
      quantity: Joi.number().integer().optional(),
      quantity_buy: Joi.number().integer().optional(),
      price: Joi.number().optional(),
      url: Joi.string().optional(),
      image: Joi.string().optional(),
    });
  }

  static validators (obj, schema) {
    return Joi.validate(obj, schema);
  }
}

ItemsModel.init({
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
  // foreign keys:
  // category_id: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Category,
  //     key: 'id',
  //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },
}, {
  tableName: config.table.prefix + config.table.items.name,
  timestamps: false,
  underscored: true,
  sequelize,
});

export default ItemsModel;
