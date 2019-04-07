import models from 'models'
import Slug from 'utils/Slug/Slug'

class ItemController {
  static all() {
    return (req, res) => {
      models.ItemsModel.findAll()
        .then(body => {
          res.status(200).send(body);
        })
        .catch(err => {
          console.log("err:", err);
          res.status(400).send(err);
        });
      }
  };
  static get() {
    return (req, res) => {
      models.ItemsModel.findByPk(req.params.id)
        .then(body => {
          res.status(200).send(body);
        })
        .catch(err => {
          console.log("err:", err);
          res.status(400).send(err);
        });
    }
  };
  static post() {
    return (req, res) => {
      const body = Slug.addSlug(req.body);

      models.ItemsModel.create(body)
        .then(body => {
          res.status(201).send(body);
        })
        .catch(err => {
          console.log("err:", err);
          res.status(400).send(err);
        });
    }
  };
  static update() {
    return (req, res) => {
      const body = Slug.addSlug(req.body);

      models.ItemsModel.update(body, {
          where: {
            id: req.params.id,
          },
        })
        .then(() => {
          res.status(200).send(`updated successfully a item with id = ${req.params.id}`);
        })
        .catch(err => {
          // console.log("err:", err);
          res.status(400).send(err);
        });
    }
  };
  static delete() {
    return (req, res) => {
      models.ItemsModel.destroy({
          where: {
            id: req.params.id,
          }
        })
        .then(() => {
          res.status(200).send(`deleted successfully a item with id = ${req.params.id}`);
        })
        .catch(err => {
          console.log("err:", err);
          res.status(400).send(err);
        });
    }
  };
}

export default ItemController
