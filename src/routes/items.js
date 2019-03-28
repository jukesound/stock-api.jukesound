import express from 'express';
const router = express.Router();

import ItemController from 'controllers/Items'

router.get('/', ItemController.all());
router.get('/:id', ItemController.get());
router.post('/', ItemController.post());
router.put('/:id', ItemController.patch());
router.delete('/:id', ItemController.delete());

export default router;
