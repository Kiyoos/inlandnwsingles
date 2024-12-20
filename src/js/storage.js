import { fetchActivities } from './externalServices';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

export async function buildActList() {
  try {
    await fetchActivities();
    const actOrigin = getLocalStorage('act-origin');
    let actList = [];
    let actFav = getLocalStorage('act-fav');

    // If actList or actFav is empty use actOrigin.
    // Otherwise use actFav plus all actOrigin that is not in actFav
    if (actList == null || actFav == null) {
      actList = [...actOrigin];
    } else if (actFav.length > 0) {
      // check to see if activity exists in actOrigin. If it is not, remove it from actFav.
      for (let i = 0; i < actFav.length; i++) {
        if (!actOrigin.find((list) => list._id === actFav[i]._id)) {
          console.log(`did not find ${actFav[i].title} in actOrigin`);
          const removed = actFav.splice(i, 1);
          setLocalStorage('act-fav', actFav);
        }
      }
      actList = [...actFav];
    }
    // Add activities from actOrigin if not already on actList
    if (actList.length < actOrigin.length) {
      for (let i = 0; i < actOrigin.length; i++) {
        if (!actFav.find((list) => list._id === actOrigin[i]._id)) {
          actList.push(actOrigin[i]);
        }
      }
    }
    // checks if act-list has an activity that is no longer in act-origin. if yes, removes it from act-list
    if (actList.length > actOrigin.length) {
      console.log(`actList is more than actOrigin`);
      for (let i = 0; i < actList.length; i++) {
        if (!actOrigin.find((list) => list._id === actList[i]._id)) {
          const removed = actList.splice(i, 1);
        }
      }
    }

    // sorts activity list by start date
    actList.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    setLocalStorage('act-list', actList);
  } catch (error) {
    console.log(error);
  }
}
