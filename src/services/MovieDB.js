/**
 * @module services/MovieDB
 **/

import 'whatwg-fetch';

/* eslint-disable class-methods-use-this */

/**
 * Base movieDbQuery class
 **/
class Base {
  constructor() {
    this.apiKey = 'dd19df850d88eaf34836bac4cf729c4e';
    return this;
  }

  /**
   * @private
   * @param {Object} params - params to pass to query
   * @returns {String}
   **/
  __buildQuery(params) {
    params.api_key = this.apiKey;

    const query = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');

    return `?${query}`;
  }

  /**
   * @private
   * @param {Object} params - params to validate
   * @throws Error when invalid
   **/
  __validate(params) {
    const _this = this;
    const keys = Object.keys(params);

    keys
      .forEach((param) => {
        if (_this.allowedParams.indexOf(param) === -1) {
          throw new Error(`${param} is not one of allowed params for ${_this.endpoint}`);
        }
      });

    this.requiredParams
      .forEach((param) => {
        if (keys.indexOf(param) === -1) {
          throw new Error(`required ${param} is not passed or ${_this.endpoint}`);
        }
      });
  }

  /**
   * fetches the query result from themoviedb
   * @param {Object} params - params to search for
   * @throws Error
   * @returns {Promise}
   **/
  fetch(params) {
    this.__validate(params);
    const url = `http://api.themoviedb.org/3/${this.endpoint}${this.__buildQuery(params)}`;
    const storage = window.sessionStorage;
    const cache = storage.getItem(url);

    if (cache) {
      return new Promise(resolve => resolve(JSON.parse(cache)));
    }

    return fetch(url)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      })
      .then(response => response.json())
      .then((obj) => {
        storage.setItem(url, JSON.stringify(obj));
        return obj;
      })
      .then((obj) => {
        obj.results = obj.results.map((el) => {
          if (el.backdrop_path) {
            el.backdrop_path = `http://image.tmdb.org/t/p/w500${el.backdrop_path}`;
          } else {
            el.backdrop_path = 'http://vignette3.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/latest?cb=20130527163652';
          }
          return el;
        });

        return obj;
      });
  }

  /**
   * @property {Array} allowedParams
   * @readonly
   **/
  get allowedParams() {
    throw new TypeError('allowedParams needs to be implemented');
  }

  /**
   * @property {Array} requiredParams
   * @readonly
   **/
  get requiredParams() {
    throw new TypeError('requiredParams needs to be implemented');
  }

  /**
   * @property {Array} endpoint
   * @readonly
   **/
  get endpoint() {
    throw new TypeError('endpoint needs to be implemented');
  }
}


/**
 * Search endpoint for MovieDB query
 * @extends module:services/MovieDB~Base
 **/
class Search extends Base {

  /**
   * @property {Array} [allowedParams=['query', 'language', 'page']]
   * @readonly
   **/
  get allowedParams() {
    return ['query', 'language', 'page'];
  }

  /**
   * @property {Array} [requiredParams=['query']]
   * @readonly
   **/
  get requiredParams() {
    return ['query'];
  }

  /**
   * @property {Array} [endpoint='search/movie']
   * @readonly
   **/
  get endpoint() {
    return 'search/movie';
  }
}

export default {
  Search: new Search()
};

/* eslint-enable class-methods-use-this */
