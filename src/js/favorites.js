import { activityTemplate } from './actMaintenance';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

export function favoriteSection() {
  const actFavList = getLocalStorage('act-fav');
  if (actFavList == null || actFavList.length == 0) {
    return;
  }

  const actEl = document.getElementById('activities');
  const sect = document.createElement('section');
  sect.id = 'favorites';
  sect.classList = 'divider';
  const h2 = document.createElement('h2');
  h2.classList = 'center';
  h2.textContent = 'Favorites';
  const div = document.createElement('div');
  div.id = 'allFavorites';
  div.classList = 'flexRow';
  div.innerHTML = actFavList.map(activityTemplate).join('');
  sect.appendChild(h2);
  sect.appendChild(div);
  let parentEl = actEl.parentNode;
  parentEl.insertBefore(sect, actEl);
}

function favoriteToggle(favId) {
  try {
    const actList = getLocalStorage('act-list');
    let actFavList = getLocalStorage('act-fav');
    const index = actList.findIndex((id) => id._id === favId);
    console.log('actList from favoriteOn');
    console.log(actList[index].title);
    actList[index].favorite = true;

    if (actFavList == null) {
      const favStart = [actList[index]];
      setLocalStorage('act-fav', favStart);
      window.location.reload();
      return;
    }

    if (actFavList.find((list) => list._id === favId)) {
      console.log('already been favorited. remove from favorite list');
      const indexB = actFavList.findIndex((id) => id._id === favId);
      actFavList.splice(indexB, 1);
      console.log(actFavList);
      if (actFavList.length == 0) {
        actFavList = [];
      }

      if (actFavList.length > 1) {
        actFavList.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime),
        );
      }
      setLocalStorage('act-fav', actFavList);
      window.location.reload();
      return;
    }

    actFavList.push(actList[index]);
    // console.log(actFavList);

    actFavList.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    setLocalStorage('act-fav', actFavList);

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export function favEvent() {
  document.querySelectorAll('.activityFavorite').forEach((item) => {
    item.addEventListener('click', (event) => {
      const clickedItem = event.target;
      // console.log(clickedItem);
      // clickedItem.innerHTML = '&#9733;';
      const attributeValue = clickedItem.getAttribute('data-id');
      console.log(attributeValue);
      return favoriteToggle(attributeValue);
    });
  });
}
