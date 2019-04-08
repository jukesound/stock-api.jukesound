import { config as dotenvConfig } from "dotenv";
import ItemsFactory from "database/factory/ItemsFactory"
import sequelize from "database";

dotenvConfig();

beforeEach(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true })
});

it("", async () => {
  const expectedItems = ItemsFactory.default();
  await expectedItems.save();

  // test get expectedItems
});
