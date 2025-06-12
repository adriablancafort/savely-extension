export function allegro(url) {
    try {
        const titleElement = document.querySelector('h1');
        if (!titleElement) return null;
        const title = titleElement.textContent.trim();

        const priceContainer = document.querySelector('div[class*="mp0t_ji"][class*="mgn2_27"]');
        let price = NaN;

        if (priceContainer) {
            const priceTextContent = priceContainer.textContent;
            const priceMatch = priceTextContent.match(/(\d+,\d{2})/); 
            if (priceMatch && priceMatch[1]) {
                price = parseFloat(priceMatch[1].replace(',', '.'));
            }
        }

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
