/**
 * @module components/Results
 **/

import template from 'babel!template-string!templates/search.html';
import Base from 'components/Base';

/**
 * fired when user searches for something
 * @event module:components/Search#search
 * @param {String} query - query user searches for
 **/

/**
 * Search component
 * @extends module:components/Base~Base
 **/
class Search extends Base {
  /**
   * @param {HTMLElement} placeholder - placeholder to replace
   * @fires module:components/Search#event:search
   **/
  render(placeholder) {
    const that = this;
    const rendered = this._render(placeholder, template);
    const form = rendered.querySelector('form');
    const searchField = form.querySelector('input[type="search"]');

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();

      that.emit('search', searchField.value);
    }, false);
  }
}

export default Search;
