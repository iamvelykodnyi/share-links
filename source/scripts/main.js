const options = require('./modules/popup-options');

// const useCounters = false;
// const testUrl = 'http://www.udemy.com/pianoforall-incredible-new-way-to-learn-piano-keyboard/';
// const url = window.location.origin + window.location.pathname;
let shareLinks = Array.from(document.getElementsByClassName('js-share-link'));

let handleOpenPopup = event => {
  event.preventDefault();
  event.stopPropagation();
  let shareLink = event.target.closest('.share__link');
  let service = shareLink.dataset.service;
  let params = options[service];
  let name = params.name;
  let width = params.width;
  let height = params.height;
  let left = Math.round(screen.width / 2 - width / 2);
  let top = Math.round(screen.height / 2 - height / 2);

  let popup = window.open(
    params.url,
    name,
    `
      left=${left},
      top=${top},
      width=${width},
      height=${height},
      personalbar=0,
      toolbar=0,
      scrollbars=1,
      resizable=1
    `
  );
  if (popup) {
    popup.focus();
    // Do set counters if they are using.
    // if (useCounters) {
    //   let timer = setInterval(function() {
    //     if (popup.closed) {
    //       if (setCounter.hasOwnProperty(service)) {
    //         setTimeout(function() {
    //           setCounter[service](url);
    //         }, 500);
    //       }
    //       clearInterval(timer);
    //     }
    //   }, 1000);
    // }
  }
};

shareLinks.forEach(element => {
  element.addEventListener('click', handleOpenPopup, false);
});
