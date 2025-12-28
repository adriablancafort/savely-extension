import { parseJsonLdScripts } from '$lib/utils.js';

export function www_walmart_com(url) {
    for (const data of parseJsonLdScripts()) {
        if (data['@type'] === 'Product' && data.offers && data.offers.length > 0) {
            // Select the offer with the highest price (usually the main offer)
            const offer = data.offers.reduce((max, current) => 
                parseFloat(current.price) > parseFloat(max.price) ? current : max
            );
            
            return {
                url: offer.url || url,
                title: data.name,
                price: parseFloat(offer.price),
                currency_code: offer.priceCurrency,
                sku: data.sku,
                gtin13: data.gtin13,
                brand: data.brand?.name,
                category: null,
                condition: offer.itemCondition?.replace('https://schema.org/', '') || null,
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
