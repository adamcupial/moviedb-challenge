/* global document */
/**
 * @module index
**/
import Search from 'components/Search';
import Results from 'components/Results';
import Paginator from 'components/Paginator';

import { Search as SearchAPI } from 'services/MovieDB';

/**
 * @function
 **/
(function() {
  const resultsContainer = document.getElementById('results');
  const searchContainer = document.getElementById('search');
  const paginatorContainer = document.getElementById('paginator');

  const search = new Search();
  const results = new Results();
  const paginator = new Paginator();

  let currentQuery = '';

  const getAndDisplayResults = (query, page) => {
    resultsContainer.innerHTML = '<div class="loader"></div>';
    paginatorContainer.innerHTML = '';
    SearchAPI
      .fetch({ query, page })
      .then((response) => {
        if (response.total_results) {
          results.render(resultsContainer, response.results);
          if (response.total_pages > 1) {
            paginator.render(paginatorContainer, response.page,
              response.total_pages);
          }
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

  paginator.on('pageChange', (num) => {
    getAndDisplayResults(currentQuery, num);
  });

  search.render(searchContainer);
}());
