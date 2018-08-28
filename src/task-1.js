function status(response) {
    if (response.ok) {
        return response;
    }
    throw new Error(response.statusText);
}

function json(response) {
    return response.json();
}

function getJSON(url) {
    return window.fetch(url)
        .then(status)
        .then(json);
}

export { status, json, getJSON };
