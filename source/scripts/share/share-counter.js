module.exports = {
  facebook: url => {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();
      req.open('GET', `http://graph.facebook.com/?id=${url}`);

      req.onload = function() {
        if (req.status == 200) {
          let response = JSON.parse(req.responseText);
          let count = response.share && response.share.share_count || 0;
          resolve(count);
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
