var e_enable = true;

// chrome 是一個物件
// 其下有一個 tabs
// 再之下有一個屬性 tabStatus
// 表示目前分頁的狀態
// "unloaded", "loading", "complete"
// 監聽狀態改變
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // 如果分頁載入完成
  if (changeInfo.status == "complete") {
    // 且擴充功能為開啟狀態
    if (e_enable) {
      // 執行以下程式
      chrome.tabs.executeScript(null, { file: "/static/javascripts/auto_confirm.js" }, () => chrome.runtime.lastError);
    }
  }
});

// 監聽擴充功能按鈕點擊
chrome.browserAction.onClicked.addListener(function (tab) {
  e_enable = !e_enable;
  // 重新載入分頁
  chrome.tabs.reload(tab.id);
  // 變更擴充功能 icon 狀態
  // if (e_enable) {
  //   chrome.browserAction.setIcon({ path: "static/img/logo.ico" });
  //   chrome.browserAction.setTitle({ title: "Shape of Taiwan : Enabled" });
  // } else {
  //   chrome.browserAction.setIcon({ path: "static/img/logo_bw.ico" });
  //   chrome.browserAction.setTitle({ title: "Shape of Taiwan : Disabled" });
  // }
});