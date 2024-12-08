import { fetchActivities, activityList } from './activities';
import calendar from './calendar';
import { loadHeaderFooter, serverDeploy } from './utils.mjs';

fetchActivities();
loadHeaderFooter();
calendar();
activityList();

// serverDeploy();
