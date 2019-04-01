import express from 'express';
const router = express.Router();

import controllers from 'controllers'

router.get('/', controllers.ItemController.all());
router.get('/:id', controllers.ItemController.get());
router.post('/', controllers.ItemController.post());
router.put('/:id', controllers.ItemController.update());
router.delete('/:id', controllers.ItemController.delete());

export default router;
