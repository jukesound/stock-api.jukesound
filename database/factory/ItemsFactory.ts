import * as faker from 'faker';

import Slug from '@utils/Slug/Slug';
import ItemsModel from '@src/items/items.model';
import ItemInterface from '@src/items/interfaces/item.interface';

// @todo: check if method return realy ItemInterface (return ItemsModelInterface ?)
class ItemsFactory {
  /**
   * Only required fields filled
   *
   * @returns {ItemInterface}
   */
  static requiredFields (): any {
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
   * @returns {ItemInterface}
   */
  static allFields (): any {
    const item = this.requiredFields();

    item.price = faker.random.number(100);
    item.url = faker.internet.url();

    return item;
  }
}

export default ItemsFactory;
