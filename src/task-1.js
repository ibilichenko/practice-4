
// Change us!

function status(response) {
  if (response.ok) {
    return response;
  }
  throw new Error(response.statusText);
}

function json(response) {
  return response.json()
}

function getJSON(url) {
  return window.fetch(url)
    .then((isSuccessful) => status(isSuccessful))
    .then((jsonData) => json(jsonData))
}

export { status, json, getJSON };
