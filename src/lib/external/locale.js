export async function getLocale() {
    try {
        const stored = await chrome.storage.local.get(['country_code']);

        if (stored.country_code) return stored.country_code;

        const country_code = await fetchLocale();
        await chrome.storage.local.set({ country_code });
        return country_code;
    } catch (error) {
        return await fetchLocale();
    }
}

async function fetchLocale() {
    try {
        const localeUrl = import.meta.env.VITE_LOCALE_URL;
        const response = await fetch(localeUrl);

        if (!response.ok) throw new Error("Failed to fetch locale");

        const text = await response.text();
        return text.toLowerCase(); // ensure lowercase
    } catch (error) {
        return null; // error fetching locale
    }
}