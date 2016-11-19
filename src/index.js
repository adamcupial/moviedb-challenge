/* global document */
/**
 * @module index
**/
import Search from 'components/Search';
import Results from 'components/Results';
import { Search as SearchAPI } from 'services/MovieDB';

/**
 * @function
 **/
(function() {
  const resultsContainer = document.getElementById('results');
  const searchContainer = document.getElementById('search');
  const search = new Search();
  const results = new Results();
  let currentQuery = '';

  const getAndDisplayResults = (query, page) => {
    resultsContainer.innerHTML = '<div class="loader"></div>';
    SearchAPI
      .fetch({ query, page })
      .then((response) => {
        if (response.total_results) {
          results.render(resultsContainer, response.results);
        } else {
          resultsContainer.innerHTML = `<div class="no-results">Nothing found for "${query}"</div>`;
        }
      });
  };

  /**
   * @listens module:components/Search#event:search
   **/

  search.on('search', (query) => {
    if (query !== currentQuery) {
      currentQuery = query;
      getAndDisplayResults(query, 1);
    }
  });
  search.render(searchContainer);
}());
