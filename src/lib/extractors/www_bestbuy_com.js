import { parseJsonLdScripts } from '$lib/utils.js';

export function www_bestbuy_com(url) {
    for (const data of parseJsonLdScripts()) {
        if (data['@type'] === 'Product' && data.offers && data.offers.length > 0) {
            // Select the offer with the lowest price (usually the main/new condition offer)
            const offer = data.offers.reduce((min, current) => 
                parseFloat(current.price) < parseFloat(min.price) ? current : min
            );
            
            return {
                url: data.url || url,
                title: data.name,
                price: parseFloat(offer.price),
                currency_code: offer.priceCurrency,
                sku: data.sku,
                brand: data.brand?.name,
                category: null,
                condition: offer.itemCondition?.replace('https://schema.org/', '') || null,
                availability: offer.availability?.replace('https://schema.org/', '') || null,
                rating: data.aggregateRating?.ratingValue ? parseFloat(data.aggregateRating.ratingValue) : null,
                review_count: data.aggregateRating?.reviewCount ? parseInt(data.aggregateRating.reviewCount) : null,
                seller: offer.seller?.name,
                original_price: offer.priceSpecification?.price ? parseFloat(offer.priceSpecification.price) : null
            };
        }
    }
    
    return null;
}
