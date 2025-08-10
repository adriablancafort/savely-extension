import { getValue, setValue } from '$lib/storage.js';

export async function getLocale() {
    try {
        const stored = await getValue('country_code');
        if (stored) return stored;

        const country_code = await fetchLocale();
        await setValue('country_code', country_code);
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