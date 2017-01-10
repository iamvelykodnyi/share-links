module.exports = (function() {
  let url = window.location.origin + window.location.pathname;
  // let url = 'https://www.drupal.org';
  let title = window.document.title;

  return {
    url: () => url,
    title: () => title
  };
}());
