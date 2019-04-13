import { ItemsModel } from 'models';
import Slug from 'utils/Slug/Slug';
import config from 'config';

class ItemController {
  static async all (req, res) {
    // select all items
    const body = await ItemsModel.findAll();

    // send all items
    res.status(config.httpCode.ok).json(body);
  }
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
  static async post (req, res) {
    // Add slug
    const mutableBody = await Slug.addSlug(req.body);
    // Validate
    await ItemsModel.validators(mutableBody, ItemsModel.schemaDefault());

    // POST new item in db
    const body = await ItemsModel.create(mutableBody);
    // send item created
    res.status(config.httpCode.created).json(body);
  }
  static async update (req, res) {
    // Add slug in response
    const body = Slug.addSlug(req.body);
    // Validation
    await ItemsModel.validators(body, ItemsModel.schemaUpdate());

    // Select item
    const item = await ItemsModel.findOne({
      rejectOnEmpty: true,
      where: {
        id: req.params.id,
      },
    });
    // update in db
    await item.update(body);
    // send item updated
    res.json(item);
  }
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
}

export default ItemController;
