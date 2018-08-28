import { getJSON } from "./task-1.js";

export default function getSeries(url1, url2) {
    return getJSON(url1)
        .catch(() => {
            throw new Error("First fetch failed");
        })
        .then(data1 =>
            getJSON(url2)
                .catch(() => {
                    throw new Error("Second fetch failed");
                })
                .then(data2 => [data1, data2])
        );
}

/*
Решение без "лесенки", но вынуждены запоминать промежуточный результат и делать непонятное во втором catch
export default function getSeries(url1, url2) {
    let result1;

    return getJSON(url1)
        .catch(() => {
            throw new Error("First fetch failed");
        })
        .then(data1 => {
            result1 = data1;

            return getJSON(url2);
        })
        .catch(e => {
            if (e.message === "First fetch failed") {
                throw e;
            }
            throw new Error("Second fetch failed");
        })
        .then(data2 => [result1, data2]);
}
*/

/*
Решение с async/await

export default async function getSeries(url1, url2) {

    let data1, data2;
    try {
        data1 = await getJSON(url1);
    } catch(e) {
        throw new Error("First fetch failed");
    }

    try{
    data2 = await getJSON(url2);
    } catch(e) {
        throw new Error("Second fetch failed");
    }

    return [data1, data2];
}
*/
