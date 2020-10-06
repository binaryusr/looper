// this file has an access to the pages which the browser visits

function loadScript(res) {
  return new Promise(
    function(resolve) {
      const script = document.createElement('script');
      script.setAttribute('src', res);
      script.onload = function() {
        resolve(res);
      };
      document.body.appendChild(script);
    });
}

loadScript(chrome.extension.getURL("src/utils.js"))
  .then(loadScript( chrome.extension.getURL("src/Looper.js")))
  .then(loadScript( chrome.extension.getURL("src/main.js")));

