import * as express from 'express';
import config from 'config';

import itemsRoute from '@src/items/items.route';

const router = express.Router();

router.use(config.routes.items.path, itemsRoute);

export default router;
