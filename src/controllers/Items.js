import Item from 'models/Item'

class ItemController {
  static all() {
    return (req, res) => {
      Item.findAll()
        .then(body => res.send(body))
        .catch(err => console.log(err));
      }
  };
  static get() {
    return (req, res) => {
      Item.findByPk(req.params.id)
        .then(body => res.send(body))
        .catch(err => console.log(err));
    }
  };
  static post() {
    return (req, res) => {
      Item.create(req.body)
        .then(body => res.send(body))
        .catch(err => console.log(err));
    }
  };
  static patch() {
    return (req, res) => {
      Item.update(req.body, {
        where: {
          id: req.params.id,
        }
      }).then(body => res.send(body))
        .catch(err => console.log(err));
    }
  };
  static delete() {
    return (req, res) => {
      Item.destroy({
        where: {
          id: req.params.id,
        }
      }).then(body => res.send(body))
        .catch(err => console.log(err));
    }
  };
}

export default ItemController
