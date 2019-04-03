import { Model, Sequelize } from "sequelize";
import sequelize from "database";
import config from "config"
import slugify from "utils/slugify";

class ItemsModel extends Model {
  static canBuildSlug(instance){
    if (instance.name && !instance.slug){
      return true;
    }

    if (instance.slug && !instance.name){
      if (instance.slug !== slugify(instance.slug)){
        return true;
      }
    }

    if (instance.slug && instance.name) {
      if (instance.slug !== slugify(instance.slug)) {
        return true;
      }
    }

    return false;
  }
  static updateSlug(nameOrSlug, opt) {
    console.log("----- updateSlug()");

    const newSlug = {
      "slug": slugify(nameOrSlug)
    };

    // @refactor use "controllers.ItemsModel.update();"
    ItemsModel.update(newSlug, {
        where: { id: opt.where.id, },
      })
      .then(() => console.log("[HOOK:beforeValidate] Slug updated:", newSlug.slug))
      .catch(err => console.error("fail to update slug:", err));
  }
  static createSlug(nameOrSlug, instance) {
    console.log("----- createSlug()");
    instance.slug = slugify(nameOrSlug);
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
    beforeValidate: (instance, opt) => {
      // don't update slug WHEN name don't change
      if (!ItemsModel.canBuildSlug(instance)) {
        return
      }
      const newSlug = instance.slug || instance.name;
      // opt.where = update
      if (opt.where && opt.where.id){
        ItemsModel.updateSlug(newSlug, opt);
      } else {
        ItemsModel.createSlug(newSlug, instance);
      }
    },
  }
});

export default ItemsModel;
