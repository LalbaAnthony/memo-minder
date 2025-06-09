import { userLanguage } from '@/composables/languages'

export function translateDate(date, language = 'en-US', options = { year: 'numeric', month: 'long', day: 'numeric' }) {
    const local = userLanguage()?.date || language || 'en-US'
    if (date) return new Date(date).toLocaleDateString(local, options);
    return "";
}

export function limitString(str, maxLen = 100) {
    if (!str) return "";
    if (str.length <= maxLen) return str;
    return str.slice(0, maxLen).trim() + " ...";
}

export function roundNumber(nb, precision = 2) {
    let number = nb.toFixed(precision);
    if (number.includes('.')) number = number.replace(/\.?0+$/, ''); // Remove all trailing zeros
    return number;
}