import express from 'express';

import { ItemController } from 'controllers';
import { asyncErrorHandler } from 'routes/handler/errors';

const router = express.Router();

router.get('/', asyncErrorHandler(ItemController.all));
router.get('/:id', ItemController.get());
router.post('/', ItemController.post());
router.patch('/:id', asyncErrorHandler(ItemController.update));
router.delete('/:id', ItemController.delete());

export default router;
