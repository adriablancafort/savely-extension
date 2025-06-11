export function www_amazon_es(url) {
    try {
        // Extract title
        const titleElement = document.querySelector('#productTitle');
        if (!titleElement) return null;
        const title = titleElement.textContent.trim();

        // Extract price - try main price first
        let priceElement = document.querySelector('.priceToPay .a-price-whole');
        if (!priceElement) {
            // Fallback to other price selectors
            priceElement = document.querySelector('.a-price-whole');
        }
        if (!priceElement) return null;

        const priceWhole = priceElement.textContent.trim();
        const priceFraction = document.querySelector('.priceToPay .a-price-fraction')?.textContent.trim() || '00';
        const price = parseFloat(`${priceWhole}.${priceFraction}`);

        // Clean URL - remove everything after /dp/{ASIN}
        const cleanUrl = url.match(/^(.*\/dp\/[A-Z0-9]{10})/)?.[1] || url;

        return {
            url: cleanUrl,
            title: title,
            price: price,
        };
    } catch {
        return null;
    }
}