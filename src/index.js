/* global document */
/**
 * @module index
**/
import Search from 'components/Search';

/**
 * @function
 **/
(function() {
  const searchContainer = document.getElementById('search');
  const search = new Search();
  search.on('search', (query) => {
  });
  search.render(searchContainer);
}());
