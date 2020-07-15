import { getJSON } from './task-1.js';

export default function getSeries(url1, url2) {
  return new Promise((resolve, reject) => {
    const resArr = [];
    getJSON(url1)
      .then((data) => resArr.push(data))
      .catch(() => reject(Error('First fetch failed')))
      .then(() => getJSON(url2)
        .then((data) => {
          resArr.push(data);
          resolve(resArr);
        })
        .catch(() => reject(Error('Second fetch failed')))
      )
  })
}
