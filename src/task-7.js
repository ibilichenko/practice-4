import { getJSON } from './task-1.js';

export default function getSequential(urls) {
  const promises = urls.map((element) => getJSON(element));
  const result = [];
  let start = Promise.resolve();
  for (const promise of promises) {
    start = start.then(() => promise.then((response) => result.push(response))
      .catch(() => {
        throw new Error(`failed to fetch ${urls[promises.indexOf(promise)]}`)
      })
    )
  }

  return start
    .then(() => result);
}
