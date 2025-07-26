import { parseJsonLdScripts } from '$lib/utils.js';

export function mercadolibre(url) {
    for (const data of parseJsonLdScripts()) {
        if (data['@type'] === 'Product' && data.offers && typeof data.offers.price !== 'undefined') {
            const offer = data.offers;
            
            return {
                url: offer.url || data.url || url,
                title: data.name,
                price: parseFloat(offer.price),
            };
        }
    }
    
    return null;
}
