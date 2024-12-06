import { fetchActivities } from './activities';
import calendar from './calendar';
import { loadHeaderFooter } from './utils.mjs';
import fetchWeather from './weather';

loadHeaderFooter();
calendar();
fetchWeather();
fetchActivities();
