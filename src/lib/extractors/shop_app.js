export function shop_app(url) {
    try {
        const titleElement = document.querySelector('p[class*="TitleLarge"][class*="line-clamp-3"]');
        if (!titleElement) return null;
        const title = titleElement.textContent.trim();

        const priceElement = document.querySelector('div[data-testid*="price"] span[data-testid*="Price"]');
        if (!priceElement) return null;
        const priceText = priceElement.textContent.trim();
        const price = parseFloat(priceText.replace(',', '.').replace(/[^\d.-]/g, ''));
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
