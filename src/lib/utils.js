export function* parseJsonLdScripts() {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    
    for (const script of scripts) {
        try {
            yield JSON.parse(script.textContent);
        } catch {
            // invalid JSON
        }
    }
}

export function formatPrice(amount, currencyCode, decimals) {
    const localeMap = {
        'USD': 'en-US',
        'EUR': 'de-DE',
        'GBP': 'en-GB',
        'JPY': 'ja-JP',
        'CAD': 'en-CA',
        'AUD': 'en-AU'
    };

    const locale = localeMap[currencyCode] || 'en-US';

    let price = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(amount);

    // remove spaces from the formatted price
    price = price.replace(/\s/g, '');

    return price;
}
