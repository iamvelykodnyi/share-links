module.exports = (function () {
  let params = {
    url: window.location.origin + window.location.pathname, // 'https://www.drupal.org',
    title: window.document.title // 'Drupal - Open Source CMS | Drupal.org'
  };
  let makeUrl = function (url, context, filter) {
    return url.replace(/\{([^}]+)}/g, (match, key) => {
      let value = filter ? filter(context[key]) : context[key];
      return value || '';
    });
  };

  function Option(url, name, width, height) {
    this._url = url;
    this.name = name;
    this.width = width;
    this.height = height;
    Object.defineProperty(this, 'url', {
      get: function () {
        return makeUrl(this._url, params, encodeURIComponent);
      }
    });
  }

  return {
    twitter: new Option(
      'https://twitter.com/intent/tweet?url={url}&text={title}',
      'Twitter',
      600,
      300
    ),
    facebook: new Option(
      'https://www.facebook.com/sharer/sharer.php?u={url}',
      'Facebook',
      660,
      640
    ),
    vkontakte: new Option(
      'https://vk.com/share.php?url={url}',
      'Vkontakte',
      650,
      570
    ),
    linkedin: new Option(
      'https://www.linkedin.com/shareArticle?url={url}',
      'LinkedIn',
      600,
      500
    ),
    pinterest: new Option(
      'https://www.pinterest.com/pin/create/button/?url={url}&description={title}',
      'Pinterest',
      750,
      550
    ),
    google: new Option(
      'https://plus.google.com/share?url={url}',
      'Google',
      400,
      440
    )
  };
}());

