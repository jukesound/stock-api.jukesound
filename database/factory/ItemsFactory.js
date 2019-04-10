import faker from "faker";

import { ItemsModel } from "models";
import Slug from "utils/Slug/Slug";

class ItemsFactory {
  static requiredFields(){
    const item = new ItemsModel();

    item.name = faker.commerce.productMaterial();
    item.slug = Slug.slugify(item.name);
    item.quantity = Math.floor(faker.random.number(100));
    item.quantity_buy = Math.floor(faker.random.number(20));
    item.image = faker.image.imageUrl();

    return item;
  }
  static allFields(){
    const item = ItemsFactory.requiredFields();

    item.price = faker.random.number(100);
    item.url = faker.internet.url();

    return item;
  }
}

export default ItemsFactory;