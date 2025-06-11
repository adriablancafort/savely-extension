import { parseJsonLdScripts } from '$lib/utils.js';

export function www_tradeinn_com(url) {
    for (const data of parseJsonLdScripts()) {
        if (data['@type'] === 'product' && data.offers && data.offers.length > 0) {
            const offer = data.offers[0];
            
            return {
                url: data.url,
                title: data.name,
                price: parseFloat(offer.price),
                currency_code: offer.priceCurrency,
                sku: data.sku,
                brand: data.brand?.name,
                category: data.category,
                condition: data.itemCondition?.replace('https://schema.org/', '') || null,
                availability: offer.availability?.replace('https://schema.org/', '') || null,
                rating: data.aggregateRating?.ratingValue ? parseFloat(data.aggregateRating.ratingValue) : null,
                review_count: data.aggregateRating?.reviewCount ? parseInt(data.aggregateRating.reviewCount) : null,
                seller: offer.offeredBy,
                original_price: offer.priceSpecification?.price ? parseFloat(offer.priceSpecification.price) : null
            };
        }
    }
    
    return null;
}