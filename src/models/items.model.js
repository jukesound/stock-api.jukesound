import { Model, Sequelize } from "sequelize";
import sequelize from "database";
import config from "config"
import slugify from "utils/slugify";

class ItemsModel extends Model {}

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
      // don't update slug WHEN name don't change
      if (!instance.attributes.name) {
        return;
      }

      const newSlug = {
        "slug": slugify(instance.attributes.name)
      };

      // @refactor use "controllers.ItemsModel.update();"
      ItemsModel.update(newSlug, {
          where: {
            id: instance.where.id,
          },
        })
        .then(() => {
          console.log("slug updated", newSlug.slug)
        })
        .catch(err => {
          console.error("fail to update slug:", err)
        });
    },
    beforeCreate: (instance) => {
      if (!instance.name) {
        return;
      }

      instance.slug = slugify(instance.name);
    },
  }
});

export default ItemsModel;
