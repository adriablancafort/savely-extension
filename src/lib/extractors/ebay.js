import { parseJsonLdScripts } from '$lib/utils.js';

export function ebay(url) {
    for (const data of parseJsonLdScripts()) {
        if (data['@type'] === 'Product' && data.offers) {
            const offer = Array.isArray(data.offers) ? data.offers[0] : data.offers;

            if (offer && typeof offer.price !== 'undefined') {
                return {
                    url: offer.url || data.url || url,
                    title: data.name,
                    price: parseFloat(offer.price),
                    currency_code: offer.priceCurrency,
                    sku: data.gtin13 || data.mpn || data.sku,
                    brand: data.brand?.name || null,
                    condition: offer.itemCondition?.replace('https://schema.org/', '') || null,
                    availability: offer.availability?.replace('https://schema.org/', '') || null,
                };
            }
        }
    }
    
    return null;
}
