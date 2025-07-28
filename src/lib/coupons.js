export function shouldShowCouponsPopup(currentUrl) {
  const url = new URL(currentUrl);
  const hostname = url.hostname;
  const pathname = url.pathname;
  const search = url.search;

  const isAmazon = hostname.includes('amazon.');
  const isCheckoutWithSpc = pathname.includes('/checkout') && (pathname.endsWith('/pay') || search.includes('spc'));
  
  return isAmazon && isCheckoutWithSpc;
}

export function applyCoupons() {
    chrome.runtime.sendMessage({
        action: "openTab",
        url: "https://www.amazon.com/?tag=pricecomparison"
    });
}