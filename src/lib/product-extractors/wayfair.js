import { parseJsonLdScripts } from '$lib/utils.js';

export function wayfair(url) {
    for (const data of parseJsonLdScripts()) {
        if (data['@type'] === 'Product') {
            const offers = data.offers;
            
            return {
                url: data.url || url,
                title: data.name,
                price: parseFloat(offers?.price),
                currency_code: offers?.priceCurrency,
                sku: data.sku || data.gtin13,
                brand: data.brand?.name,
                category: null,
                condition: offers?.itemCondition?.replace('http://schema.org/', '') || null,
                availability: offers?.availability?.replace('http://schema.org/', '') || null,
                rating: data.aggregateRating?.ratingValue ? parseFloat(data.aggregateRating.ratingValue) : null,
                review_count: data.aggregateRating?.reviewCount ? parseInt(data.aggregateRating.reviewCount) : null,
                seller: offers?.offeredBy || 'Wayfair',
                original_price: offers?.priceSpecification?.price ? parseFloat(offers.priceSpecification.price) : null
            };
        }
    }
    
    return null;
}
