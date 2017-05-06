function initPopup() {
  chrome.windows.getCurrent( function(window) {
    chrome.tabs.getAllInWindow(window.id, function(tabs){
      if (!tabs.length) return;

      list = []

      for (var i=0; i < tabs.length; ++i) {
        list.push({
          title: tabs[i].title,
          url: tabs[i].url,
        })
      }

      sendUrl(list)
    });
  });
}

function sendUrl(list) {
  jQuery.ajax({
    type: 'POST',
    url: 'http://localhost:4567/',
    data: {data: list},
    crossDomain: true,
    cache: false,
    async: false,
    success: function(msg){
      $("div#list").append('<p class="success">Links are sent!</p>');
    },
    error: function(jxhr){
      $("div#list").append('<p class="failed">Links are failed to send!</p>');
    }
  });
}

window.addEventListener('load', initPopup);
