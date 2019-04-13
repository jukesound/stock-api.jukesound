import { ItemsModel } from 'models';
import Slug from 'utils/Slug/Slug';
import config from 'config';

class ItemController {
  static async all (req, res) {
    const body = await ItemsModel.findAll();

    res.status(config.httpCode.ok).json(body);
  }
  static async get (req, res) {
    const body = await ItemsModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(config.httpCode.ok).json(body);
  }
  static async post (req, res) {
    let body;
    const mutableBody = await Slug.addSlug(req.body);
    await ItemsModel.validators(mutableBody, ItemsModel.schemaDefault());

    body = await ItemsModel.create(mutableBody);
    res.status(config.httpCode.created).json(body);
  }
  static async update (req, res) {
    let item;
    // Add slug
    const body = Slug.addSlug(req.body);

    // Validation
    await ItemsModel.validators(body, ItemsModel.schemaUpdate());

    // Select item
    item = await ItemsModel.findOne({
      rejectOnEmpty: true,
      where: {
        id: req.params.id,
      },
    });

    // update in db
    item = await item.update(body);

    // send item updated
    res.json(item);
  }
  static async delete (req, res) {
    // Select item
    let item = await ItemsModel.findOne({
      rejectOnEmpty: true,
      where: {
        id: req.params.id,
      },
    });

    // destroy item
    await ItemsModel.destroy({
      where: {
        id: req.params.id,
      },
    });

    // send item destroyed
    res.status(config.httpCode.ok).json(item);
  }
}

export default ItemController;
