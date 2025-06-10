export function www_tradeinn_com(url) {
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    for (const script of jsonLdScripts) {
        try {
            const data = JSON.parse(script.textContent);
            
            if (data['@type'] === 'product' && data.offers && data.offers.length > 0) {
                const offer = data.offers[0];
                
                return {
                    url: data.url,
                    title: data.name,
                    price: parseFloat(offer.price),
                    currency: offer.priceCurrency,
                    sku: data.sku,
                    brand: data.brand?.name,
                    category: data.category,
                    image: 'https://www.tradeinn.com' + (Array.isArray(data.image) ? data.image[0] : data.image),
                    condition: data.itemCondition?.replace('https://schema.org/', '') || null,
                    availability: offer.availability?.replace('https://schema.org/', '') || null,
                    rating: data.aggregateRating?.ratingValue ? parseFloat(data.aggregateRating.ratingValue) : null,
                    review_count: data.aggregateRating?.reviewCount ? parseInt(data.aggregateRating.reviewCount) : null,
                    seller: offer.offeredBy,
                    original_price: offer.priceSpecification?.price ? parseFloat(offer.priceSpecification.price) : null
                };
            }
        } catch (e) {
            continue;
        }
    }
    
    return null;
}