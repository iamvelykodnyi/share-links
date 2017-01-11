module.exports = (function() {
  // let url = window.location.origin + window.location.pathname;
  const url = document.head.querySelector('meta[property="og:url"]').content;
  const title = document.title;

  return {
    url: () => url,
    title: () => title
  };
}());
