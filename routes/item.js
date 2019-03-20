const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send([
    {
      id: 1,
      id_category: 1,
      name: 'Planche',
      slug: 'planche',
      quantity: 12,
      quantity_jukebox: 2,
      quantity_buy: 1,
      price: 25,
      url: 'www.google.fr',
      image: 'https://s2.lmcdn.fr/multimedia/7f1401061194/2a7c458459713/produits/planche-chene-petits-noeuds-rabote-28-x-100-mm-l-2-2-m.jpg?$p=hi-w358',
    }
  ]);
});

module.exports = router;
