import { parseJsonLdScripts } from '$lib/utils.js';

export function generic(url) {
    for (const data of parseJsonLdScripts()) {
        if (data['@type'] === 'Product' && data.name && data.offers) {
            const offers = Array.isArray(data.offers) ? data.offers[0] : data.offers;
            
            return {
                url: offers.url || url,
                title: data.name,
                price: parseFloat(offers.price)
            };
        }
    }
    
    return null;
}