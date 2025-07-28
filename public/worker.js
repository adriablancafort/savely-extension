chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'https://getsavely.com/extension-install' });
  }

  chrome.runtime.setUninstallURL('https://getsavely.com/extension-uninstall');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: 'iconClicked' });
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "openTab") openTab(request.url);
});

function openTab(url) {
  chrome.tabs.create({url, active: false, index: 0, pinned: true}, (tab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);
        chrome.tabs.remove(tab.id);
      }
    });
  });
}
