import express from 'express';
const router = express.Router();

const items = [
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
  },
  {
    id: 2,
    id_category: 1,
    name: 'Aluminium',
    slug: 'aluminium',
    quantity: 2,
    quantity_jukebox: 5,
    quantity_buy: 3,
    price: 12,
    url: 'www.google.fr',
    image: 'https://s2.lmcdn.fr/multimedia/7f1401061194/2a7c458459713/produits/planche-chene-petits-noeuds-rabote-28-x-100-mm-l-2-2-m.jpg?$p=hi-w358',
  },
  {
    id: 3,
    id_category: 1,
    name: 'Vis',
    slug: 'Vis',
    quantity: 2,
    quantity_jukebox: 5,
    quantity_buy: 3,
    price: 12,
    url: 'www.google.fr',
    image: 'https://s2.lmcdn.fr/multimedia/7f1401061194/2a7c458459713/produits/planche-chene-petits-noeuds-rabote-28-x-100-mm-l-2-2-m.jpg?$p=hi-w358',
  },
];

/*———————————————————————————————————*\
    $ GET ITEMS
\*———————————————————————————————————*/
router.get('/', function(req, res) {
  res.send(items);
});

/*———————————————————————————————————*\
    $ POST ITEM
\*———————————————————————————————————*/
router.post('/', function(req, res) {
  const newItem = {
    id: 3,
    ...req.body
  };
  console.log(items);

  items.push(newItem);
  res.send(items);
});

/*———————————————————————————————————*\
    $ PUT ITEM
\*———————————————————————————————————*/
router.put('/:id', function(req, res) {
  let modifiedItem = items.find(item => parseInt(item.id) === parseInt(req.params.id));

  if (!modifiedItem) {
    res.status(400).send({ error: 'Something failed!' });
    return;
  }

  modifiedItem = {
    ...modifiedItem,
    ...req.body
  };

  res.send(modifiedItem);
});

/*———————————————————————————————————*\
    $ DELETE ITEM
\*———————————————————————————————————*/
router.delete('/:id', function(req, res) {
  const error = items.findIndex(item => parseInt(item.id) === parseInt(req.params.id));

  if (error === -1) {
    res.status(400).send({ error: 'Something failed!' });
    return;
  }

  const newList = items.filter(item => parseInt(item.id) !== parseInt(req.params.id));

  res.send(newList);
});


export default router;
