export async function www_target_com(url) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract title
    const titleElement = document.querySelector('[data-test="product-title"]');
    if (!titleElement) return null;
    const title = titleElement.textContent.trim();

    // Extract price
    const priceElement = document.querySelector('[data-test="product-price"]');
    if (!priceElement) return null;
    const priceText = priceElement.textContent.trim();
    const price = parseFloat(priceText.replace(/[$,]/g, ''));
    
    // Clean URL
    const cleanUrl = url.split('?')[0];

    return {
        url: cleanUrl,
        title: title,
        price: price,
    };
}