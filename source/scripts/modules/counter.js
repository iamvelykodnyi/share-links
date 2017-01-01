module.exports = function() {
  let facebook = function(url) {
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
  };

  return {
    facebook: facebook
  };

};
