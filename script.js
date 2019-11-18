'use strict'

function searchResults(query, maxResults=20) {

  var username = $('#js-username').val();

  const userSearch = `https://api.github.com/users/${username}/repos`;

  const params = {
    q: query,
    type: $('#js-user-type').val(),
    sort: $('#js-sort-by').val(),
  };
  const queryString = formatQueryParams(params)
  const url = userSearch + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults (responseJson, maxResults) {
  console.log(responseJson);

  $('#results-list').empty();
  $('#js-error-message').empty();

  var repos = responseJson
  
  for (let i = 0; i < repos.length & i<maxResults ; i++)
    $('#results-list').append(
      `<li><h3><a href="${repos[i].html_url}">${repos[i].name}</a></h3>
      <p>Description: ${repos[i].description}</p>
      </li>`
    )
  $('#results').removeClass('hidden');
}

function loadResults() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#js-username').val();
    const maxResults = $('#js-max-results').val();
    searchResults(username, maxResults);
  });
}

$(loadResults);