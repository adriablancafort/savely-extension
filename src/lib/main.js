import { getLocale } from '$lib/locale.js';
import { amazon } from './extractors/amazon.js';
import { www_walmart_com } from './extractors/www_walmart_com.js';
import { www_bestbuy_com } from './extractors/www_bestbuy_com.js';
import { www_mediamarkt_es } from './extractors/www_mediamarkt_es.js';
import { www_elcorteingles_es } from './extractors/www_elcorteingles_es.js';
import { www_pccomponentes_com } from './extractors/www_pccomponentes_com.js';
import { www_tradeinn_com } from './extractors/www_tradeinn_com.js';
import { generic } from './extractors/generic.js';

const extractors = {
  'www.amazon.es': amazon,
  'www.amazon.com': amazon,
  'www.amazon.co.uk': amazon,
  'www.amazon.de': amazon,
  'www.amazon.fr': amazon,
  'www.amazon.it': amazon,
  'www.amazon.nl': amazon,
  'www.amazon.se': amazon,
  'www.amazon.pl': amazon,
  'www.walmart.com': www_walmart_com,
  'www.bestbuy.com': www_bestbuy_com,
  'www.mediamarkt.es': www_mediamarkt_es,
  'www.elcorteingles.es': www_elcorteingles_es,
  'www.pccomponentes.com': www_pccomponentes_com,
  'www.tradeinn.com': www_tradeinn_com,
};

export async function getPrices(currentUrl) {
  const hostname = new URL(currentUrl).hostname;
  const extractor = extractors[hostname] || generic;
  if (!extractor) return null; // retailer not supported

  const productData = extractor(currentUrl);
  if (!productData) return null; // not a product page

  const country_code = await getLocale();
  if (!country_code) return null; // failed to fetch locale

  return await fetchPrices({ ...productData, country_code });
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