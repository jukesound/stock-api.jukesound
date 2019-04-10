import { ItemsModel } from 'models';
import Slug from 'utils/Slug/Slug';
import config from 'config';

class ItemController {
  static all () {
    return (req, res) => {
      ItemsModel.findAll()
        .then(body => {
          res.status(config.httpCode.ok).send(body);
        })
        .catch(err => {
          console.log('err:', err);
          res.status(config.httpCode.badRequest).send(err);
        });
    };
  }
  static get () {
    return (req, res) => {
      ItemsModel.findByPk(req.params.id)
        .then(body => {
          res.status(config.httpCode.ok).send(body);
        })
        .catch(err => {
          console.log('err:', err);
          res.status(config.httpCode.badRequest).send(err);
        });
    };
  }
  static post () {
    return (req, res) => {
      const body = Slug.addSlug(req.body);

      ItemsModel.create(body)
        .then(body => {
          res.status(config.httpCode.created).send(body);
        })
        .catch(err => {
          console.log('err:', err);
          res.status(config.httpCode.badRequest).send(err);
        });
    };
  }
  static update () {
    return (req, res) => {
      const body = Slug.addSlug(req.body);

      ItemsModel.update(body, {
        where: {
          id: req.params.id,
        },
      })
        .then(() => {
          res.status(config.httpCode.ok).send(`updated successfully a item with id = ${req.params.id}`);
        })
        .catch(err => {
          // console.log("err:", err);
          res.status(config.httpCode.badRequest).send(err);
        });
    };
  }
  static delete () {
    return (req, res) => {
      ItemsModel.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then(() => {
          res.status(config.httpCode.ok).send(`deleted successfully a item with id = ${req.params.id}`);
        })
        .catch(err => {
          console.log('err:', err);
          res.status(config.httpCode.badRequest).send(err);
        });
    };
  }
}

export default ItemController;
