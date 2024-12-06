import { Router } from 'express';
const routerA = Router();
import {
  getAllActivities,
  getSingleActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activities.js';
import { checkId, saveActivity } from '../middleware/validate.js';

// get all activities from db
routerA.get('/', getAllActivities);

// get single activity from db
routerA.get('/:id', checkId, getSingleActivity);

// create new Activity
routerA.post('/', saveActivity, createActivity);

// update new activity
routerA.put('/:id', checkId, saveActivity, updateActivity);

// delete new activity
routerA.delete('/:id', checkId, deleteActivity);

// exports
export default routerA;
