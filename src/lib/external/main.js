import { getLocale } from './locale.js';
import { www_mediamarkt_es } from './extractors/www_mediamarkt_es.js';
import { www_tradeinn_com } from './extractors/www_tradeinn_com.js';
import { www_pccomponentes_com } from './extractors/www_pccomponentes_com.js';
import { www_amazon_es } from './extractors/www_amazon_es.js';
import { generic } from './extractors/generic.js';

const extractors = {
  'www.mediamarkt.es': www_mediamarkt_es,
  'www.tradeinn.com': www_tradeinn_com,
  'www.pccomponentes.com': www_pccomponentes_com,
  'www.amazon.es': www_amazon_es,
};

export async function getPrices(currentUrl) {
  const hostname = new URL(currentUrl).hostname;
  const extractor = extractors[hostname] || generic;
  if (!extractor) return null; // retailer not supported

  const productData = extractor(currentUrl);
  if (!productData) return null; // not a product page

  const locale = await getLocale();
  if (!locale) return null; // failed to fetch locale

  return await fetchPrices({ ...productData, ...locale });
}

async function fetchPrices(priceRequest) {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/v1/prices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(priceRequest)
    });

    if (!response.ok) throw new Error("Failed to fetch prices");

    return await response.json();
  } catch (e) {
    return null; // error fetching prices
  }
}