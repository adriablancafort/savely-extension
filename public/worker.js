chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'https://getsavely.com/extension-install' });
  }

  chrome.runtime.setUninstallURL('https://getsavely.com/extension-uninstall');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: 'iconClicked' });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "setBadge") setBadge(message.text);
  if (message.action === "openTab") openTab(message.url);
});

chrome.tabs.onActivated.addListener(() => setBadge(''));

function setBadge(text) {
  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color: 'red' });
  chrome.action.setBadgeTextColor({ color: 'white' });
}

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
