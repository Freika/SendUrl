function initPopup() {
  chrome.windows.getCurrent( function(window) {
    chrome.tabs.getAllInWindow(window.id, function(tabs){
      if (!tabs.length) return;

      var listTextArea = document.getElementById("list");

      for (var i=0; i<tabs.length; ++i) {
        url = tabs[i].url
        listTextArea.value += url + "\n";

        jQuery.ajax({
          type: "POST", //or GET
          url: 'http://localhost:4567/',
          data: url,
          crossDomain:true,
          cache:false,
          async:false,
          success: function(msg){
            console.log(url + 'SENT')
          },
          error: function(jxhr){
            // alert(jxhr.responseText);
            console.log(url + 'FAILED')
          }
        });
      }
    });
  });
}

window.addEventListener("load", initPopup);
