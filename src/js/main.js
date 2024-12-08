import { fetchActivities, highlight, activityList } from './activities';
import calendar from './calendar';
import { loadHeaderFooter, serverDeploy } from './utils.mjs';
import fetchWeather from './weather';

loadHeaderFooter();
calendar();
activityList();
// serverDeploy();
