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
  static post () {
    return (req, res) => {
      const body = Slug.addSlug(req.body);

      ItemsModel.create(body)
        .then(body => {
          res.status(config.httpCode.created).json(body);
        })
        .catch(err => {
          console.log('err:', err);
          res.status(config.httpCode.badRequest).json(err);
        });
    };
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
    // send
    res.json(item);
  }
  static delete () {
    return (req, res) => {
      ItemsModel.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then(() => {
          res.status(config.httpCode.ok).json(`deleted successfully a item with id = ${req.params.id}`);
        })
        .catch(err => {
          console.log('err:', err);
          res.status(config.httpCode.badRequest).json(err);
        });
    };
  }
}

export default ItemController;
