import { Model, Sequelize } from "sequelize";
import sequelize from "database";
import config from "config"
import slugify from "utils/slugify";

class Item extends Model {}

Item.init({
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
  hooks: {
    beforeBulkUpdate: (instance) => {
      if (!instance.attributes.name) {
        return;
      }

      const slug = {
        "slug": slugify(instance.attributes.name)
      };

      // fixme: if slug already exist, slug don't change
      Item.update(slug, { where: { id: instance.where.id } })
    },
    beforeCreate: (instance) => {
      if (!instance.name) {
        return;
      }

      instance.slug = slugify(instance.name);
    },
  }
});

export default Item;
