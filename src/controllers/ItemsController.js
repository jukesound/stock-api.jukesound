import models from 'models'

class ItemController {
  static all() {
    return (req, res) => {
      models.Item.findAll()
        .then(body => {
          res.status(200).send(body);
        })
        .catch(err => {
          res.status(400).send(err);
        });
      }
  };
  static get() {
    return (req, res) => {
      models.Item.findByPk(req.params.id)
        .then(body => {
          res.status(200).send(body);
        })
        .catch(err => {
          res.status(400).send(err);
        });
    }
  };
  static post() {
    return (req, res) => {
      models.Item.create(req.body)
        .then(body => {
          res.status(201).send(body);
        })
        .catch(err => {
          res.status(400).send(err);
        });
    }
  };
  static update() {
    return (req, res) => {
      console.log("")
      models.Item.update(req.body, {
          where: {
            id: req.params.id,
          },
        })
        .then(() => {
          res.status(200).send(`updated successfully a item with id = ${req.params.id}`);
        })
        .catch(err => {
          res.status(400).send(err);
        });
    }
  };
  static delete() {
    return (req, res) => {
      models.Item.destroy({
          where: {
            id: req.params.id,
          }
        })
        .then(() => {
          res.status(200).send(`deleted successfully a item with id = ${req.params.id}`);
        })
        .catch(err => {
          res.status(400).send(err);
        });
    }
  };
}

export default ItemController
