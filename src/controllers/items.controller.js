import { ItemsModel } from 'models';
import config from 'config';

class ItemController {
  /**
   * Get all items
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<ItemDto[]>}
   */
  static async all (req, res) {
    // [Get] all items
    const body = await ItemsModel.findAll();

    // [Send] all items
    res.status(config.httpCode.ok).json(body);
  }

  /**
   * Get items by ID
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<ItemDto>}
   */
  static async get (req, res) {
    // [Get] item
    const body = await ItemsModel.findByPk(req.params.id);

    // [Send] item selected
    res.status(config.httpCode.ok).json(body);
  }

  /**
   * Create new items
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<ItemDto>}
   */
  static async post (req, res) {
    // Mutate body
    const mutatedBody = await ItemsModel.itemChanged(
      req.body,
      config.ObserverTypeEnum.POST_ITEM
    );

    // [Post] new item in db
    const body = await ItemsModel.create(mutatedBody);

    // [Send] item created
    res.status(config.httpCode.created).json(body);
  }

  /**
   * Update item by ID
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<ItemDto>}
   */
  static async update (req, res) {
    // Mutate body
    const mutatedBody = await ItemsModel.itemChanged(
      req.body,
      config.ObserverTypeEnum.UPDATE_ITEM
    );

    // [Get] item by id
    const item = await ItemsModel.findByPk(req.params.id);

    // [Update] item selected
    await item.update(mutatedBody);

    // [Send] item updated
    res.json(item);
  }

  /**
   * Delete item by ID
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<ItemDto>}
   */
  static async delete (req, res) {
    // [Get] item by id
    const item = await ItemsModel.findByPk(req.params.id);

    // [Delete] item in db
    await item.destroy();

    // [Send] item destroyed
    res.status(config.httpCode.ok).json(item);
  }
}

export default ItemController;
