// Redirect to feedback page on uninstall
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.setUninstallURL('https://pricecomparison.fyi/extension-uninstall');
});