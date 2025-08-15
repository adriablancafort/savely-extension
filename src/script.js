import { mount, unmount } from 'svelte';
import './app.css';
import PriceComparisonPopup from '$lib/components/PriceComparisonPopup.svelte';
import { getPrices } from '$lib/pricecomparison.js';
import { getValue } from '$lib/storage.js';

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
  // destroy previous popup instance
  if (priceComparisonInstance) {
    unmount(priceComparisonInstance);
    priceComparisonInstance = null;
  }

  setTimeout(async () => {
    // fetch data and mount popup
    const data = await getPrices(currentUrl);
    if (data && data.prices.length > 0) {
      if (!shadowRoot) await mountShadowRoot();
      const initShow = await getValue('pricecomparisonshow') ?? true;
      priceComparisonInstance = mount(PriceComparisonPopup, { target: shadowRoot, props: { data, initShow } });
      priceCount = data.prices.length;
    } else {
      priceCount = 0;
    }
    setCountBadge(priceCount);
  }, 10);
}

let shadowRoot;
let priceComparisonInstance;
let currentUrl;
let priceCount = 0;

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
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') setCountBadge(priceCount);
});

function setCountBadge(count) {
  chrome.runtime.sendMessage({ action: 'setBadge', text: count > 0 ? count.toString() : '' });
}