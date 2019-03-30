import models from 'models'

class ItemController {
  static all() {
    return (req, res) => {
      models.Item.findAll()
        .then(body => res.send(body))
        .catch(err => console.log(err));
      }
  };
  static get() {
    return (req, res) => {
      models.Item.findByPk(req.params.id)
        .then(body => res.send(body))
        .catch(err => console.log(err));
    }
  };
  static post() {
    return (req, res) => {
      models.Item.create(req.body)
        .then(body => res.send(body))
        .catch(err => console.log(err));
    }
  };
  static update() {
    return (req, res) => {
      models.Item.update(req.body, {
        where: {
          id: req.params.id,
        },
      }).then(body => res.send(body))
        .catch(err => console.log(err));
    }
  };
  static delete() {
    return (req, res) => {
      models.Item.destroy({
        where: {
          id: req.params.id,
        }
      }).then(body => res.send(body))
        .catch(err => console.log(err));
    }
  };
}

export default ItemController
