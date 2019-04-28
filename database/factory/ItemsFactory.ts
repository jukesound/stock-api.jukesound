import * as faker from 'faker';

import { ItemsModel } from '@models/index';
import { Slug } from '@utils/index';
import { ItemInterface } from '@interfaces/index';

// @todo: check if method return realy ItemInterface (return ItemsModelInterface ?)
class ItemsFactory {
  /**
   * Only required fields filled
   *
   * @returns {ItemInterface}
   */
  static requiredFields (): ItemInterface {
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
  static allFields (): ItemInterface {
    const item = this.requiredFields();

    item.price = faker.random.number(100);
    item.url = faker.internet.url();

    return item;
  }
}

export default ItemsFactory;
