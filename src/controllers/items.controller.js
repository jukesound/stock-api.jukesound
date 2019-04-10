import { ItemsModel } from 'models';
import Slug from 'utils/Slug/Slug';
import config from 'config';

class ItemController {
  static all () {
    return (req, res) => {
      ItemsModel.findAll()
        .then(body => {
          res.status(config.httpCode.ok).json(body);
        })
        .catch(err => {
          console.log('err:', err);
          res.status(config.httpCode.badRequest).json(err);
        });
    };
  }
  static get () {
    return (req, res) => {
      ItemsModel.findOne({
        where: {
          id: req.params.id,
        },
      })
        .then(body => {
          res.status(config.httpCode.ok).json(body);
        })
        .catch(err => {
          console.log('err:', err);
          res.status(config.httpCode.badRequest).json(err);
        });
    };
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
    const body = Slug.addSlug(req.body);

    await ItemsModel.validators(body, ItemsModel.schemaUpdate());

    let item = await ItemsModel.findOne({
      rejectOnEmpty: true,
      where: {
        id: req.params.id,
      },
    });

    item = await item.update(body);

    res.json(item);

    // ItemsModel.update(body, {
    //   returning: true,
    //   where: {
    //     id: req.params.id,
    //   },
    // })
    //   .then(function ([ rowsUpdate, [ updatedBook, ], ]) {
    //     res.json(updatedBook);
    //   })
    //   .catch(err => {
    //     // console.log("err:", err);
    //     res.status(config.httpCode.badRequest).json(err);
    //   });
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
