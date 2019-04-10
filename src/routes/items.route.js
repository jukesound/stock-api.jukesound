import express from 'express';

import { ItemController } from 'controllers';
const router = express.Router();

router.get('/', ItemController.all());
router.get('/:id', ItemController.get());
router.post('/', ItemController.post());
router.put('/:id', ItemController.update());
router.delete('/:id', ItemController.delete());

export default router;
