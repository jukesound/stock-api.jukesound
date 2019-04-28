import * as Joi from 'joi';
import { Model, DataTypes } from 'sequelize';

import sequelize from 'database';
import config from 'config';
import Slug from 'utils/Slug/Slug';

class ItemsModel extends Model {
  static schemaDefault () {
    return Joi.object().keys({
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

  /**
   * Add slug and validate data
   *
   * @param {ItemDto} body
   * @param {ObserverTypeEnum} type
   *
   * @returns {Promise<ItemDto>}
   */
  static async itemChanged (body, type) {
    // Add slug in response
    const mutableBody = Slug.addSlug(body);

    // Validation
    await this.validators(mutableBody, this._selectSchema(type));

    return mutableBody;
  }

  /**
   * Select validation schema
   *
   * @param {ObserverTypeEnum} type
   *
   * @returns {{}}
   *
   * @private
   */
  static _selectSchema (type) {
    let schema = this.schemaDefault();

    if (type === config.ObserverTypeEnum.UPDATE_ITEM) {
      schema = this.schemaUpdate();
    }

    return schema;
  }
}

ItemsModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity_buy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  url: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // foreign keys:
  // category_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Category,
  //     key: 'id',
  //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },
}, {
  tableName: config.table.prefix + config.table.items.name,
  underscored: true,
  sequelize,
});

export default ItemsModel;
