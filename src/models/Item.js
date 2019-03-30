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
    type: Sequelize.VIRTUAL,
    get() {
      return slugify(this.getDataValue('name'));
    }
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
  tableName: `${config.tablePrefix}items`,
  timestamps: false,
  underscored: true,
  sequelize,
  // @question: Wait Amine response
  hooks: {
    // afterCreate: (body) => {
    //   console.log("body:", body)
    //   body.slug = buildSlug(body.get('name'))
    // },
  }
});

export default Item;
