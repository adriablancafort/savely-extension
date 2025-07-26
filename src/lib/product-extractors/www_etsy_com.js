import { parseJsonLdScripts } from '$lib/utils.js';

export function www_etsy_com(url) {
    for (const data of parseJsonLdScripts()) {
        if (data['@type'] === 'Product' && data.offers) {
            const offerData = data.offers;

            if (offerData && typeof offerData.lowPrice !== 'undefined') {
                return {
                    url: data.url || url,
                    title: data.name,
                    price: parseFloat(offerData.lowPrice),
                    currency_code: offerData.priceCurrency,
                    sku: data.sku,
                    brand: data.brand?.name || null,
                    condition: null, 
                    availability: offerData.availability?.replace('https://schema.org/', '') || null,
                };
            }
        }
    }

    return null;
}
