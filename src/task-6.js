// import e from "express";

export default class EnhancedPromise extends Promise {
  static some(promises, count) {
    return new EnhancedPromise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([]);
      }
      if (count > promises.length) {
        reject(new Error())
      }
      const result = [];
      let rejectedCounter = 0;
      for (const promise of promises) {
        promise
          .then((response) => {
            result.push(response)
            if (result.length === count) {
              resolve(result)
            }
          })
          .catch(() => {
            rejectedCounter++;
            if (promises.length - rejectedCounter < count) {
              reject(new Error());
            }
          })
      }
    });
  }
}
