/**
 * @module components/Paginator
 **/

import template from 'babel!template-string!templates/paginator.html';
import Base from 'components/Base';

/**
 * fired when user wants to change the page
 * @event module:components/Paginator#pageChange
 * @param {Number} page - page number to change
 **/

/**
 * Paginator component
 * @extends module:components/Base~Base
 **/
class Paginator extends Base {
  /**
   * @param {HTMLElement} placeholder - placeholder to replace
   * @param {Number} page - current page number
   * @parm {Number} total - total page numbers
   * @fires module:components/Paginator#pageChange
   **/
  render(placeholder, page, total) {
    const that = this;
    const rendered = this._render(placeholder, template, { page, total });
    const container = rendered.querySelector('nav');

    container.addEventListener('click', (ev) => {
      const parent = ev.target.parentNode;

      if (ev.target.tagName === 'A') {
        ev.preventDefault();

        if (parent.className.split(' ').indexOf('disabled') === -1) {
          that.emit('pageChange', parseInt(parent.dataset.page, 10));
        }
      }
    }, false);
  }
}

export default Paginator;
