import { parseJsonLdScripts } from '$lib/utils.js';

export function www_mediamarkt_es(url) {
    for (const data of parseJsonLdScripts()) {
        if (data['@type'] === 'BuyAction' && data.object && data.object['@type'] === 'Product') {
            const product = data.object;
            const offers = product.offers;
            
            return {
                url: product.url,
                title: product.name,
                price: parseFloat(offers?.price),
                currency_code: offers?.priceCurrency,
                sku: product.sku || product.gtin13,
                brand: product.brand?.name,
                category: null,
                condition: offers?.itemCondition?.replace('http://schema.org/', '') || null,
                availability: offers?.availability?.replace('http://schema.org/', '') || null,
                rating: product.aggregateRating?.ratingValue ? parseFloat(product.aggregateRating.ratingValue) : null,
                review_count: product.aggregateRating?.ratingCount ? parseInt(product.aggregateRating.ratingCount) : null,
                seller: offers?.offeredBy || 'MediaMarkt',
                original_price: offers?.priceSpecification?.price ? parseFloat(offers.priceSpecification.price) : null
            };
        }
    }
    
    return null;
}