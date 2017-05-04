function initPopup() {
  chrome.windows.getCurrent( function(window) {
    chrome.tabs.getAllInWindow(window.id, function(tabs){
      if (!tabs.length) return;

      var listTextArea = $('ul#list');

      for (var i=0; i < tabs.length; ++i) {
        sendUrl(tabs[i].url)
      }
    });
  });
}

function sendUrl(url) {
  jQuery.ajax({
    type: 'POST', //or GET
    url: 'http://localhost:4567/',
    data: 'url=' + url,
    crossDomain: true,
    cache: false,
    async: false,
    success: function(msg){
      $("ul#list").append('<li class="success">' + url + ' sent!</li>');
    },
    error: function(jxhr){
      $("ul#list").append('<li class="failure">' + url + ' failed to send!</li>');
    }
  });
}

window.addEventListener('load', initPopup);
