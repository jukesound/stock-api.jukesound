import * as faker from 'faker';

import { ItemsModel } from 'models';
import Slug from 'utils/Slug/Slug';
import ItemsInterface from 'interfaces/items/ItemsInterface';

// @todo: check if method return realy ItemsInterface (return ItemsModelInterface ?)
class ItemsFactory {
  /**
   * Only required fields filled
   *
   * @returns {ItemsInterface}
   */
  static requiredFields (): ItemsInterface {
    const item = new ItemsModel();

    item.name = faker.commerce.productMaterial();
    item.slug = Slug.slugify(item.name);
    item.quantity = Math.floor(faker.random.number(100));
    item.quantity_buy = Math.floor(faker.random.number(20));
    item.image = faker.image.imageUrl();

    return item;
  }

  /**
   * All fields filled
   *
   * @returns {ItemsInterface}
   */
  static allFields (): ItemsInterface {
    const item = this.requiredFields();

    item.price = faker.random.number(100);
    item.url = faker.internet.url();

    return item;
  }
}

export default ItemsFactory;
