export async function getLocale() {
    try {
        const stored = await chrome.storage.local.get(['userLocale']);

        if (stored.userLocale) return stored.userLocale;

        const locale = await fetchLocale();
        if (locale) await chrome.storage.local.set({ userLocale: locale });
        return locale;
    } catch (error) {
        return await fetchLocale();
    }
}

async function fetchLocale() {
    try {
        const localeUrl = import.meta.env.VITE_LOCALE_URL;
        const response = await fetch(localeUrl);

        if (!response.ok) throw new Error("Failed to fetch locale");

        const data = await response.json();

        return {
            country: data.country,
            country_code: data.country_code,
            region: data.region,
            region_code: data.region_code,
        };
    } catch (error) {
        return null;
    }
}