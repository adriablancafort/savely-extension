import { parseJsonLdScripts } from '$lib/utils.js';

export function leroymerlin(url) {
    for (const data of parseJsonLdScripts()) {
        if (Array.isArray(data) && data.length > 0) {
            const product = data[0];
            if (product['@type'] === 'Product') {
                
                return {
                    url: product.offers.url,
                    title: product.name,
                    price: parseFloat(product.offers.price),
                    currency_code: product.offers.priceCurrency,
                    sku: product.sku,
                    brand: product.brand?.name,
                    condition: product.offers.itemCondition,
                    availability: product.offers.availability?.replace('http://schema.org/', '') || null,
                    rating: product.aggregateRating ? parseFloat(product.aggregateRating.ratingValue) : null,
                    review_count: product.aggregateRating ? parseInt(product.aggregateRating.reviewCount) : null,
                };
            }
        }
    }
    
    return null;
}