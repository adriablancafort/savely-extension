export function aliexpress(url) {
    try {
        const titleElement = document.querySelector('h1[data-pl="product-title"]');
        if (!titleElement) return null;
        const title = titleElement.textContent.trim();

        let priceElement = document.querySelector('[data-pl="product-price"] .product-price-value');
        if (!priceElement) return null;
        const priceText = priceElement.textContent.trim();

        // Remove currency symbols and parse (handles €, $, etc.)
        const price = parseFloat(priceText.replace(/[^\d,.-]/g, '').replace(',', '.'));
        if (isNaN(price)) return null;

        const cleanUrl = url.split('?')[0];

        return {
            url: cleanUrl,
            title: title,
            price: price,
        };
    } catch {
        return null;
    }
}
