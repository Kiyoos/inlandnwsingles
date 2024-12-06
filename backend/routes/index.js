import { Router } from 'express';
const router = Router();

import routerH from './home.js';
import routerA from './activities.js';

router.use('/', routerH);
router.use('/activities', routerA);

export default router;
