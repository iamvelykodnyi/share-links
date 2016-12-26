'use strict';

(function() {
  const useCounters = true;
  // const testUrl = 'http://www.udemy.com/pianoforall-incredible-new-way-to-learn-piano-keyboard/';
  const url = window.location.origin + window.location.pathname;
  let shareLinks = Array.from(document.getElementsByClassName('js-share-link'));

  // Counters
  let facebookCounter = document.querySelector('.js-share-count-facebook');
  facebookCounter.textContent = '0';

  let setCounter = {
    facebook(url) {
      return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open('GET', `http://graph.facebook.com/?id=${url}`);

        req.onload = function() {
          if (req.status == 200) {
            let response = JSON.parse(req.responseText);
            resolve(response);
          }
          else {
            reject(Error(req.statusText));
          }
        };

        req.onerror = function() {
          reject(Error('Network Error'));
        };

        req.send();
      });
    }
  };

  setCounter
    .facebook(url)
    .then(response => {
      if (response.hasOwnProperty('share') &&
      response.share.hasOwnProperty('share_count')) {
        facebookCounter.textContent = response.share.share_count;
      }
    })
    .catch(error => window.console.error('Failed!', error));

  // Options.
  let servises = new Map();
  servises.set('facebook', {
    name: 'Facebook',
    popupUrl: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    popupWidth: 600,
    popupHeight: 500,
  });

  let handleOpenPopup = event => {
    event.preventDefault();
    event.stopPropagation();
    let shareLink = event.target.closest('.share__link');
    window.console.log(event.target.closest('.share__link'));
    let servise = shareLink.dataset.type;
    let params = servises.get(servise);
    let name = params.name;
    let width = params.popupWidth;
    let height = params.popupHeight;
    let left = Math.round(screen.width / 2 - width / 2);
    let top = Math.round(screen.height / 2 - height / 2);

    let popup = window.open(
      params.popupUrl,
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
      if (useCounters) {
        let timer = setInterval(function() {
          if (popup.closed) {
            if (setCounter.hasOwnProperty(servise)) {
              setTimeout(function() {
                setCounter[servise](url);
              }, 500);
            }
            clearInterval(timer);
          }
        }, 1000);
      }
    }
  };

  shareLinks.forEach(element => {
    element.addEventListener('click', handleOpenPopup, false);
  });

})();
