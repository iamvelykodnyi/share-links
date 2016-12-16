'use strict';

(function() {
  const testUrl = 'http://cv.velykodnyi.com/';
  // Options.
  let servises = new Map();
  servises.set('facebook', {
    popupUrl: `https://www.facebook.com/sharer/sharer.php?u=${testUrl}`,
    popupWidth: 600,
    popupHeight: 500,
  });

  let shareLinks = Array.from(document.getElementsByClassName('share__link'));
  shareLinks.forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      // debugger;
      let name = element.dataset.type;
      let params = servises.get(name);
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
      }
    });
  });

})();
