import shareOptions from './share-options';

module.exports = function(socialMediaName) {
  let options = shareOptions[socialMediaName];
  let width = options.width;
  let height = options.height;
  let left = Math.round(screen.width / 2 - width / 2);
  let top = Math.round(screen.height / 2 - height / 2);
  let windowName = options.name;
  let windowUrl = options.url;
  let windowFeatures = `
    left=${left},
    top=${top},
    width=${width},
    height=${height},
    personalbar=0,
    toolbar=0,
    scrollbars=1,
    resizable=1
  `;

  let shareWindow = window.open(
    windowUrl,
    windowName,
    windowFeatures
  );

  if (shareWindow) {
    shareWindow.focus();
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
