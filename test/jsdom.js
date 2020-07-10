import { JSDOM } from 'jsdom';
// eslint-disable-next-line import/no-named-default
import { default as fetch, Response } from 'node-fetch';

if (typeof global !== 'undefined') {
  const { window } = new JSDOM();
  global.window = window;
  global.document = window.document;

  window.fetch = fetch;
  window.Response = Response;
}
