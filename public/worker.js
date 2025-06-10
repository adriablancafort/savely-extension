// Redirect to feedback page on uninstall
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.setUninstallURL('https://pricecomparison.fyi/extension-uninstall');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: 'togglePopup' });
});