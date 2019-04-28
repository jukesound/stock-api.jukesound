import * as express from 'express';

import ItemController from '@src/items/items.controller';
import { asyncErrorHandler } from '@routes/handler/errors';

const router = express.Router();

router.get('/', asyncErrorHandler(ItemController.all));
router.get('/:id', asyncErrorHandler(ItemController.get));
router.post('/', asyncErrorHandler(ItemController.post));
router.patch('/:id', asyncErrorHandler(ItemController.update));
router.delete('/:id', asyncErrorHandler(ItemController.delete));

export default router;
