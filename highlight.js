(function() {
  if (document.shBar) {clearTimeout(document.shBar.removalTimeoutHandle);}
  document.shBar = {};
  document.shBar.lastStableY = document.documentElement.scrollTop;

  document.shBar.shListener = function(e) {
    var win = window, doc = document;
    clearTimeout(doc.shBar.removalTimeoutHandle);
    if (!doc.getElementById('scrollHighlightBar')) {createBar();}

    if (win.scrollY < doc.shBar.lastStableY) { //going up
      if (doc.shBar.lastY < win.scrollY) { //changed direction
        doc.shBar.lastStableY = win.scrollY; //reset location
      } else if (doc.shBar.lastStableY - win.innerHeight >
          win.scrollY) { // fast scrolle off the bottom
        doc.shBar.lastStableY = win.scrollY; //reset location
      }
      doc.shBar.shBar.style.top = doc.shBar.lastStableY + 'px';
    } else { //going down
      if (doc.shBar.lastY > win.scrollY) { //changed direction
        doc.shBar.lastStableY = win.scrollY; //reset location
      } else if (doc.shBar.lastStableY + win.innerHeigh < 
          win.scrollY) { // fast scrolled off the top
        doc.shBar.lastStableY = win.scrollY; //reset location
      }
      doc.shBar.shBar.style.top =
        (doc.shBar.lastStableY + win.innerHeight) + 'px';
    }
    doc.shBar.removalTimeoutHandle = setTimeout(removeBar, 500);
    doc.shBar.shBar.style.opacity = 1;
    doc.shBar.lastY = win.scrollY;
    doc.body.appendChild(doc.shBar.shBar);

    function removeBar() {
      var el = doc.getElementById('scrollHighlightBar');
      doc.shBar.lastStableY = win.scrollY;
      fadeOut(el);
  
      function fadeOut(el) {
        if (el.style.opacity <= 0.05) {el.style.opacity = 0; return;}
        el.style.opacity = el.style.opacity - 0.05;
        win.setTimeout(function() {fadeOut(el);}, 10);
      }
    }

    function createBar() {
      doc.shBar.shBar = doc.getElementById('scrollHighlightBar') || 
                        doc.createElement('div');
      doc.shBar.shBar.style.width = '100%';
      doc.shBar.shBar.style.height = '3px';
      doc.shBar.shBar.style.position = 'absolute';
      doc.shBar.shBar.style.left = '0';
      doc.shBar.shBar.style.backgroundColor = 'blue';
      doc.shBar.shBar.id = 'scrollHighlightBar';
      doc.shBar.shBar.style.opacity = 1;
      doc.shBar.shBar.style.zIndex = 1000;
    }
  };

  document.addEventListener("scroll", document.shBar.shListener, false);
})();
