import { Router } from 'express';
const routerH = Router();
import home from '../controllers/home.js';

routerH.get('/', home);

export default routerH;
