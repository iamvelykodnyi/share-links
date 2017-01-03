const shareWindow = require('./share-window');

// const useCounters = false;
// const testUrl = 'http://www.udemy.com/pianoforall-incredible-new-way-to-learn-piano-keyboard/';
// const url = window.location.origin + window.location.pathname;
let shareLinks = Array.from(document.getElementsByClassName('js-share-link'));

let handleOpenShareWindow = event => {
  event.preventDefault();
  event.stopPropagation();
  let shareLink = event.target.closest('.share__link');
  let socialMediaName = shareLink.dataset.id;
  shareWindow(socialMediaName);
};

shareLinks.forEach(element => {
  element.addEventListener('click', handleOpenShareWindow, false);
});
