import { activityList } from './actMaintenance';
import calendar from './calendar';
import { favEvent, favoriteSection } from './favorites';
import { buildActList } from './storage';

export default async function buildHome() {
  await buildActList();
  calendar();
  activityList();
  favoriteSection();
  favEvent();
}
activityList;
