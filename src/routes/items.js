import express from 'express';
const router = express.Router();
// import sequelize from 'database'
import Item from 'models/Item'

/**
 * GET LIST OF ITEMS
 */
router.get('/', function(req, res) {
  Item.findAll()
    .then(body => res.send(body))
    .catch(err => console.log(err));
});

/**
 * GET ITEM
 */
router.get('/:id', function(req, res) {
  Item.findByPk(req.params.id)
    .then(body => res.send(body))
    .catch(err => console.log(err));
});

/**
 * CREATE NEW ITEM
 */
router.post('/', function(req, res) {
  Item.create(req.body)
    .then(body => res.send(body))
    .catch(err => console.log(err));
});

/**
 * UPDATE ITEM
 */
router.put('/:id', function(req, res) {
  Item.update(req.body, {
    where: {
      id: req.params.id,
    }
  }).then(body => res.send(body))
    .catch(err => console.log(err));
});

/**
 * DELETE ITEM
 */
router.delete('/:id', function(req, res) {
  Item.destroy({
    where: {
      id: req.params.id,
    }
  }).then(body => res.send(body))
    .catch(err => console.log(err));
});


export default router;
