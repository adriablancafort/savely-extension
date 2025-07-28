import { mount, unmount } from 'svelte';
import './app.css';
import PriceComparisonPopup from '$lib/components/PriceComparisonPopup.svelte';
import CouponsPopup from '$lib/components/CouponsPopup.svelte';
import { getPrices } from '$lib/pricecomparison.js';
import { shouldShowCouponsPopup } from '$lib/coupons.js';

async function mountShadowRoot() {
  const container = document.createElement('savely-extension');
  document.documentElement.appendChild(container);

  shadowRoot = container.attachShadow({ mode: 'open' });

  if (import.meta.env.PROD) {
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = chrome.runtime.getURL('styles.css');
    shadowRoot.appendChild(styles);

    // load fonts
    const regular = chrome.runtime.getURL('fonts/Inter-Regular.woff2');
    const bold = chrome.runtime.getURL('fonts/Inter-SemiBold.woff2');
    document.fonts.add(new FontFace('Inter', `url(${regular})`, { weight: '400' }));
    document.fonts.add(new FontFace('Inter', `url(${bold})`, { weight: '600' }));
  } else {
    const styles = document.createElement('style');
    const css = await import('./app.css?raw');
    styles.textContent = css.default;
    shadowRoot.appendChild(styles);
  }
}

async function handleNavigation() {
  // destroy previous popup instances
  if (priceComparisonInstance) {
    unmount(priceComparisonInstance);
    priceComparisonInstance = null;
  }
  if (couponsInstance) {
    unmount(couponsInstance);
    couponsInstance = null;
  }

  setTimeout(async () => {
    if (shouldShowCouponsPopup(currentUrl)) {
      if (!shadowRoot) await mountShadowRoot();
      couponsInstance = mount(CouponsPopup, { target: shadowRoot });
    } else {
      // fetch data and mount price comparison popup
      const data = await getPrices(currentUrl);
      if (data) {
        if (!shadowRoot) await mountShadowRoot();
        priceComparisonInstance = mount(PriceComparisonPopup, { target: shadowRoot, props: { data } });
      }
    }
  }, 10);
}

let shadowRoot;
let priceComparisonInstance;
let couponsInstance;
let currentUrl;

const observer = new MutationObserver(async () => {
  const newUrl = window.location.href;
  if (newUrl !== currentUrl) {
    currentUrl = newUrl;
    handleNavigation()
  }
});

observer.observe(document, { subtree: true, childList: true });

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'iconClicked') {
    if (priceComparisonInstance) priceComparisonInstance.togglePopup();
    if (couponsInstance) couponsInstance.togglePopup();
  }
});