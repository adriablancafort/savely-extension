import { parseJsonLdScripts } from '$lib/utils.js';

export function www_elcorteingles_es(url) {
    for (const data of parseJsonLdScripts()) {
        // Handle regular Product type
        if (data['@type'] === 'Product' && data.offers) {
            const offer = data.offers;
            const salePrice = offer.priceSpecification?.[0]?.price;
            
            return {
                url: data.url || url,
                title: data.name,
                price: salePrice ? parseFloat(salePrice) : parseFloat(offer.price),
                currency_code: offer.priceCurrency,
                sku: data.sku,
                brand: data.brand?.name,
                category: null,
                image: data.image,
                condition: null,
                availability: offer.availability?.replace('http://schema.org/', '') || null,
                rating: null,
                review_count: null,
                seller: null,
                original_price: salePrice ? parseFloat(offer.price) : null
            };
        }
        
        // Handle ProductGroup with variants
        if (data['@type'] === 'ProductGroup' && data.hasVariant && data.hasVariant.length > 0) {
            // Get URL parameters to determine selected variant
            const urlParams = new URLSearchParams(new URL(url).search);
            const selectedColor = urlParams.get('color');
            const selectedSize = urlParams.get('size');
            
            // Find the matching variant or use the first one
            let selectedVariant = data.hasVariant[0];
            if (selectedColor || selectedSize) {
                const matchingVariant = data.hasVariant.find(variant => 
                    (!selectedColor || variant.color === selectedColor) &&
                    (!selectedSize || variant.size === selectedSize)
                );
                if (matchingVariant) {
                    selectedVariant = matchingVariant;
                }
            }
            
            const offer = selectedVariant.offers;
            const salePrice = offer.priceSpecification?.[0]?.price;
            
            return {
                url: data.url || url,
                title: selectedVariant.name,
                price: salePrice ? parseFloat(salePrice) : parseFloat(offer.price),
                currency_code: offer.priceCurrency,
                sku: selectedVariant.sku,
                brand: data.brand?.name,
                category: null,
                condition: null,
                availability: offer.availability?.replace('http://schema.org/', '') || null,
                rating: null,
                review_count: null,
                seller: null,
                original_price: salePrice ? parseFloat(offer.price) : null
            };
        }
    }
    
    return null;
}
