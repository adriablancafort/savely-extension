import { getLocale } from '$lib/locale.js';
import { amazon } from './extractors/amazon.js';
import { aliexpress } from './extractors/aliexpress.js';
import { www_walmart_com } from './extractors/www_walmart_com.js';
import { www_bestbuy_com } from './extractors/www_bestbuy_com.js';
import { mediamarkt } from './extractors/mediamarkt.js';
import { www_elcorteingles_es } from './extractors/www_elcorteingles_es.js';
import { www_pccomponentes_com } from './extractors/www_pccomponentes_com.js';
import { www_tradeinn_com } from './extractors/www_tradeinn_com.js';
import { mercadolibre } from './extractors/mercadolibre.js';
import { ebay } from './extractors/ebay.js';
import { www_etsy_com } from './extractors/www_etsy_com.js';
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
  'www.aliexpress.com': aliexpress,
  'es.aliexpress.com': aliexpress,
  'fr.aliexpress.com': aliexpress,
  'de.aliexpress.com': aliexpress,
  'it.aliexpress.com': aliexpress,
  'nl.aliexpress.com': aliexpress,
  'pt.aliexpress.com': aliexpress,
  'pl.aliexpress.com': aliexpress,
  'www.ebay.com': ebay,
  'www.ebay.co.uk': ebay,
  'www.ebay.de': ebay,
  'www.ebay.fr': ebay,
  'www.ebay.it': ebay,
  'www.ebay.es': ebay,
  'www.ebay.ca': ebay,
  'www.ebay.com.au': ebay,
  'www.ebay.at': ebay,
  'www.ebay.be': ebay,
  'www.ebay.ch': ebay,
  'www.ebay.nl': ebay,
  'www.ebay.ie': ebay,
  'www.ebay.pl': ebay,
  'www.ebay.com.hk': ebay,
  'www.ebay.com.my': ebay,
  'www.ebay.com.sg': ebay,
  'www.ebay.ph': ebay,
  'www.etsy.com': www_etsy_com,
  'www.walmart.com': www_walmart_com,
  'www.bestbuy.com': www_bestbuy_com,
  'www.mediamarkt.de': mediamarkt,
  'www.mediamarkt.at': mediamarkt,
  'www.mediamarkt.be': mediamarkt,
  'www.mediamarkt.nl': mediamarkt,
  'www.mediamarkt.pl': mediamarkt,
  'www.mediamarkt.ch': mediamarkt,
  'www.mediamarkt.hu': mediamarkt,
  'www.mediaworld.it': mediamarkt,
  'www.mediamarkt.es': mediamarkt,
  'www.mediamarkt.com.tr': mediamarkt,
  'www.mediamarkt.lu': mediamarkt,
  'www.elcorteingles.es': www_elcorteingles_es,
  'www.pccomponentes.com': www_pccomponentes_com,
  'www.tradeinn.com': www_tradeinn_com,
  'articulo.mercadolibre.com.ar': mercadolibre,
  'articulo.mercadolibre.com.bo': mercadolibre,
  'articulo.mercadolivre.com.br': mercadolibre,
  'articulo.mercadolibre.cl': mercadolibre,
  'articulo.mercadolibre.com.co': mercadolibre,
  'articulo.mercadolibre.co.cr': mercadolibre,
  'articulo.mercadolibre.com.do': mercadolibre,
  'articulo.mercadolibre.com.ec': mercadolibre,
  'articulo.mercadolibre.com.gt': mercadolibre,
  'articulo.mercadolibre.com.hn': mercadolibre,
  'articulo.mercadolibre.com.mx': mercadolibre,
  'articulo.mercadolibre.com.ni': mercadolibre,
  'articulo.mercadolibre.com.pa': mercadolibre,
  'articulo.mercadolibre.com.py': mercadolibre,
  'articulo.mercadolibre.com.pe': mercadolibre,
  'articulo.mercadolibre.com.sv': mercadolibre,
  'articulo.mercadolibre.com.uy': mercadolibre,
  'articulo.mercadolibre.com.ve': mercadolibre,
};

export async function getPrices(currentUrl) {
  const hostname = new URL(currentUrl).hostname;
  const extractor = extractors[hostname] || generic;

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