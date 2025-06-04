export function www_mediamarkt_es(url) {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    for (const script of jsonLdScripts) {
        try {
            const data = JSON.parse(script.textContent);
            
            if (data['@type'] === 'BuyAction' && data.object && data.object['@type'] === 'Product') {
                const product = data.object;
                const offers = product.offers;
                
                return {
                    url: product.url,
                    title: product.name,
                    price: parseFloat(offers?.price),
                    currency: offers?.priceCurrency,
                    sku: product.sku || product.gtin13,
                    brand: product.brand?.name,
                    category: null, // Not available in MediaMarkt's schema
                    image: Array.isArray(product.image) ? product.image[0] : product.image,
                    condition: offers?.itemCondition?.replace('http://schema.org/', '') || null,
                    availability: offers?.availability?.replace('http://schema.org/', '') || null,
                    rating: product.aggregateRating?.ratingValue ? parseFloat(product.aggregateRating.ratingValue) : null,
                    review_count: product.aggregateRating?.ratingCount ? parseInt(product.aggregateRating.ratingCount) : null,
                    seller: offers?.offeredBy || 'MediaMarkt',
                    original_price: offers?.priceSpecification?.price ? parseFloat(offers.priceSpecification.price) : null
                };
            }
        } catch (e) {
            continue;
        }
    }
    
    return null;
}