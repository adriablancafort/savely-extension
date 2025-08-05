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
  if (message.action === "setBadge") setBadge(message.text, message.background, message.color);
});

function setBadge(text, background, color) {
  chrome.action.setBadgeText({ text: text });
  chrome.action.setBadgeBackgroundColor({ color: background });
  chrome.action.setBadgeTextColor({ color: color });
}
