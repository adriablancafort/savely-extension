import { parseJsonLdScripts } from '$lib/utils.js';

export function www_pccomponentes_com(url) {
    for (const data of parseJsonLdScripts()) {
        if (data['@type'] === 'product' && data.offers && data.name) {
            let price, offers;
            
            if (data.offers['@type'] === 'AggregateOffer') {
                offers = data.offers.offers || data.offers;
                price = offers.price;
            } else {
                offers = data.offers;
                price = offers.price;
            }
            
            return {
                url: data.url,
                title: data.name,
                price: parseFloat(price),
                currency_code: offers.priceCurrency,
                sku: data.sku,
                mpn: data.mpn,
                gtin13: data.gtin13,
                brand: data.brand?.name,
                category: data.category,
                condition: data.itemCondition?.replace('https://schema.org/', '') || null,
                availability: offers.availability?.replace('https://schema.org/', '') || null,
                rating: data.aggregateRating?.ratingValue ? parseFloat(data.aggregateRating.ratingValue) : null,
                review_count: data.aggregateRating?.reviewCount ? parseInt(data.aggregateRating.reviewCount) : null,
                seller: offers.offeredBy?.name,
                original_price: offers.priceSpecification?.price ? parseFloat(offers.priceSpecification.price) : null
            };
        }
    }
    
    return null;
}