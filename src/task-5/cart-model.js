import Subject from './subject.js';
import { status } from '../task-1.js';

export default class Cart {
  constructor() {
    this.baseUrl = 'http://localhost:3001/cart/items/';
    this.subject = new Subject();
    this.items = [];
    this.loading = false;
  }

  _ajax(url, method = 'GET', data = null, middleware = () => {}) {
    const params = {
      method,
      mode: 'cors',
      headers: { 'Content-type': 'application/json' }
    };
    if (data) {
      params.body = JSON.stringify(data);
    }

    return window.fetch(url, params)
      .then(status)
      .then(response => response.status === 200 ? response.json() : null);
  }

  _notify() {
    this.subject.notifyObservers();
  }

  register(...args) {
    this.subject.add(...args);
  }

  getItems() {
    return this.items;
  }

  getTotalQuantity() {
    let totalQuantity = 0;
    for (const item of this.items) {
      totalQuantity += item.quantity;
    }

    return totalQuantity;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.items) {
      totalPrice += item.price;
    }

    return totalPrice;
  }

  load() {
    this._ajax(this.baseUrl)
      .then((response) => {
        this.items = response;
        this.loading = false;
        this._notify()
      })
  }

  addItem(item) {
    this.loading = true;
    this._notify();
    this._ajax(this.baseUrl, 'POST', item)
      .then(
        () => {
          this.load()
        })
      .catch(() => {
        alert('Wrong input data')
        this.loading = false;
        this._notify()
      });
  }

  updateItem(itemId, item) {
    this.loading = true;
    this._notify();
    this._ajax(`${this.baseUrl}${itemId}`, 'PUT', item)
      .then(() => {
        this.load();
      })
      .catch(() => {
        alert('There is no item with given id')
        this.loading = false;
        this._notify()
      })
  }

  removeItem(itemId) {
    this.loading = true;
    this._notify();
    this._ajax(`${this.baseUrl}${itemId}`, 'DELETE')
      .then(() => {
        this.load()
      })
      .catch(() => {
        alert('There are no items with given id')
        this.loading = false;
        this._notify()
      })
  }

  removeAll() {
    this.loading = true;
    this._notify();
    this._ajax(this.baseUrl, 'DELETE')
      .then(() => {
        this.load();
      })
  }
}
