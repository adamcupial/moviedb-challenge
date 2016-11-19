/**
 * @module components/Results
 **/

import template from 'babel!template-string!templates/results.html';
import resultTemplate from 'babel!template-string!templates/_result.html';
import Base from 'components/Base';

/**
 * Results component
 * @extends module:components/Base~Base
 **/
class Results extends Base {
  /**
   * @param {HTMLElement} placeholder - placeholder to replace
   * @param {Object[]} results - list of objects to display
   **/
  render(placeholder, results) {
    const items = results
      .map((el, index) => resultTemplate({ el, index: index + 1, total: results.length }))
      .join('');
    this._render(placeholder, template, { items });
  }
}

export default Results;
