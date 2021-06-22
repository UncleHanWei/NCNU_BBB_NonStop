function find_and_close_popup() {
  headings = document.evaluate("/html/body//button", document, null, XPathResult.ANY_TYPE, null);
  thisHeading = headings.iterateNext();
  console.log("[NCNU BBB NoneStop] - Check!");
  while (thisHeading) {
    if (thisHeading.textContent == '檢查') {
      console.log('[NCNU BBB NoneStop] - Found popup!!')
      thisHeading.click()
      console.log('[NCNU BBB NoneStop] - Popup clicked!! Now you can go to sleep~')
      return;
    }
    thisHeading = headings.iterateNext();
  }
}

// select the target node
let target = document.querySelector('body');

// create an observer instance
let observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if(mutation.type == 'childList' && mutation.addedNodes.length == 1 && mutation.addedNodes[0].className.startsWith('portal')) {
      console.log(mutation.addedNodes[0]);
      find_and_close_popup();
    }
  });
});

// configuration of the observer:
let config = { attributes: true, childList: true, characterData: true };

// pass in the target node, as well as the observer options
observer.observe(target, config);