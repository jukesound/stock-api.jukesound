import express from 'express';
const router = express.Router();

import controllers from 'controllers'

router.get('/', controllers.Item.all());
router.get('/:id', controllers.Item.get());
router.post('/', controllers.Item.post());
router.put('/:id', controllers.Item.patch());
router.delete('/:id', controllers.Item.delete());

export default router;
