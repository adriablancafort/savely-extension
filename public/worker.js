chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'https://getsavely.com/extension-install' });
  }

  chrome.runtime.setUninstallURL('https://getsavely.com/extension-uninstall');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: 'togglePopup' });
});