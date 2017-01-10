import shareWindow from './share-window';
import counter from './share-counter';
import pageParams from './page-params';

let url = pageParams.url();
let shareLinks = Array.from(document.getElementsByClassName('js-share-link'));
let shareNumbers = Array.from(document.getElementsByClassName('js-share-number'));
// let numbers = {};

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

// Set counters.
shareNumbers.forEach(element => {
  // numbers[element.dataset.id] = element;
  counter
    .facebook(url)
    .then(
      count => element.textContent = count,
      error => window.console.error(error)
    );
});
