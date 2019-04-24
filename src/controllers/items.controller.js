import { ItemsModel } from 'models';
import Slug from 'utils/Slug/Slug';
import config from 'config';

class ItemController {
  /**
   * Get all items
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<ItemInterface[]>}
   */
  static async all (req, res) {
    // select all items
    const body = await ItemsModel.findAll();

    // send all items
    res.status(config.httpCode.ok).json(body);
  }

  /**
   * Get items by ID
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<ItemInterface>}
   */
  static async get (req, res) {
    // select item
    const body = await ItemsModel.findOne({
      where: {
        id: req.params.id,
      },
    });

    // send item selected
    res.status(config.httpCode.ok).json(body);
  }

  /**
   * Create new items
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<ItemInterface>}
   */
  static async post (req, res) {
    const mutatedBody = await ItemController._beforeCreateOrUpdate(
      req.body,
      ItemsModel.schemaDefault()
    );

    // POST new item in db
    const body = await ItemsModel.create(mutatedBody);
    // send item created
    res.status(config.httpCode.created).json(body);
  }

  /**
   * Update item by ID
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<ItemInterface>}
   */
  static async update (req, res) {
    const mutatedBody = await ItemController._beforeCreateOrUpdate(
      req.body,
      ItemsModel.schemaUpdate()
    );

    // Select item
    const item = await ItemsModel.findOne({
      rejectOnEmpty: true,
      where: {
        id: req.params.id,
      },
    });
    // update in db
    await item.update(mutatedBody);
    // send item updated
    res.json(item);
  }

  /**
   * Delete item by ID
   *
   * @param {express.Request} req request
   * @param {express.Response} res response
   *
   * @returns {Promise<ItemInterface>}
   */
  static async delete (req, res) {
    // Select item
    const item = await ItemsModel.findOne({
      rejectOnEmpty: true,
      where: {
        id: req.params.id,
      },
    });

    // destroy item in db
    await item.destroy();
    // send item destroyed
    res.status(config.httpCode.ok).json(item);
  }

  /**
   * Add slug and validate data
   *
   * @param {ItemDto} body
   * @param {{}} schema
   *
   * @returns {Promise<ItemDto>}
   *
   * @private
   */
  static async _beforeCreateOrUpdate (body, schema) {
    // Add slug in response
    const mutableBody = Slug.addSlug(body);
    // Validation
    await ItemsModel.validators(mutableBody, schema);

    return mutableBody;
  }
}

export default ItemController;
