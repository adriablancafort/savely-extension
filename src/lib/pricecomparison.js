import { getLocale } from '$lib/locale.js';
import { amazon } from './product-extractors/amazon.js';
import { aliexpress } from './product-extractors/aliexpress.js';
import { www_walmart_com } from './product-extractors/www_walmart_com.js';
import { www_bestbuy_com } from './product-extractors/www_bestbuy_com.js';
import { www_target_com } from './product-extractors/www_target_com.js';
import { mediamarkt } from './product-extractors/mediamarkt.js';
import { www_elcorteingles_es } from './product-extractors/www_elcorteingles_es.js';
import { www_pccomponentes_com } from './product-extractors/www_pccomponentes_com.js';
import { www_tradeinn_com } from './product-extractors/www_tradeinn_com.js';
import { mercadolibre } from './product-extractors/mercadolibre.js';
import { ebay } from './product-extractors/ebay.js';
import { www_etsy_com } from './product-extractors/www_etsy_com.js';
import { shop_app } from './product-extractors/shop_app.js';
import { allegro } from './product-extractors/allegro.js';
import { wayfair } from './product-extractors/wayfair.js';
import { www_flipkart_com } from './product-extractors/www_flipkart_com.js';
import { leroymerlin } from './product-extractors/leroymerlin.js';
import { generic } from './product-extractors/generic.js';

const extractors = {
  'www.amazon.es': amazon,
  'www.amazon.com': amazon,
  'www.amazon.ca': amazon,
  'www.amazon.co.uk': amazon,
  'www.amazon.de': amazon,
  'www.amazon.fr': amazon,
  'www.amazon.it': amazon,
  'www.amazon.nl': amazon,
  'www.amazon.se': amazon,
  'www.amazon.pl': amazon,
  'www.amazon.in': amazon,
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
  'shop.app': shop_app,
  'allegro.pl': allegro,
  'allegro.cz': allegro,
  'allegro.sk': allegro,
  'allegro.hu': allegro,
  'www.walmart.com': www_walmart_com,
  'www.bestbuy.com': www_bestbuy_com,
  'www.target.com': www_target_com,
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
  'www.flipkart.com': www_flipkart_com,
  'www.wayfair.com': wayfair,
  'www.wayfair.ca': wayfair,
  'www.wayfair.co.uk': wayfair,
  'www.leroymerlin.es': leroymerlin,
  'www.leroymerlin.fr': leroymerlin,
  'www.leroymerlin.pt': leroymerlin,
  'www.leroymerlin.it': leroymerlin,
  'www.leroymerlin.pl': leroymerlin,
  'www.leroymerlin.ro': leroymerlin,
  'www.leroymerlin.ru': leroymerlin,
  'www.leroymerlin.com.br': leroymerlin,
};

export async function getPrices(currentUrl) {
  const hostname = new URL(currentUrl).hostname;
  const extractor = extractors[hostname] || generic;

  const productData = await extractor(currentUrl);
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