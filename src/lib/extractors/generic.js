import { parseJsonLdScripts } from '$lib/utils.js';

export function generic(url) {
    for (const data of parseJsonLdScripts()) {
        if ((data['@type'] === 'Product' || data['@type'] === 'product') && data.name && data.offers) {
            let offer;
            
            if (Array.isArray(data.offers)) {
                offer = data.offers[0];
            } else {
                offer = data.offers;
            }
            
            return {
                url: offer.url || data.url || url,
                title: data.name,
                price: parseFloat(offer.price)
            };
        }
    }
    
    return null;
}