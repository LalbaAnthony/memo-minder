export function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

export async function imageExists(url) {
    new Promise((resolve) => {
        var img = new Image();
        img.onload = function () {
            resolve(true);
        };
        img.onerror = function () {
            resolve(false);
        };

        img.src = url;
    }
    ).then(exists => {
        if (exists) return true;
        return false;
    });
}

export function ageFromDate(birthdate, precision = 3) {
    const birth = new Date(birthdate);
    const now = new Date();

    const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const ageInMilliseconds = now - birth;
    const preciseAge = ageInMilliseconds / millisecondsPerYear;

    return parseFloat(preciseAge.toFixed(precision));
}

export function isValidDate(date) {
    return !isNaN(new Date(date)) && (new Date(date) !== "Invalid Date");
}

export function isDateInFuture(date) {
    const d1 = new Date();
    const d2 = new Date(date);
    return d2 > d1;
}

export function getYearFromDate(date) {
    if (date) return date.split("-")[0];
    return "";
}

export function daysFromBirthday(birthdate) {
    if (!birthdate) return Infinity;
    if (isNaN(new Date(birthdate))) return Infinity;
    if (new Date(birthdate) > new Date()) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day or it would lead to issues with time
    const nextBirthday = new Date(today.getFullYear(), new Date(birthdate).getMonth(), new Date(birthdate).getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1); // If the birthday has already occurred this year, set it to next year

    const timeDiff = nextBirthday - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
}

export function extractYear(date = null) {
    if (!date) return "";
    return new Date(date).getFullYear();
}

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255 && email.length >= 5 && !email.includes("&") && !email.includes(" ");
}
export function isValidUrl(url, encodeFirst = false) {
    if (encodeFirst) url = encodeURI(url);
    const pattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
    return pattern.test(url);
}

export function isValidColor(color) {
    return (color.length === 7 && color[0] === '#' && color.match(/^[0-9A-Fa-f]+$/))
}

export function roundNb(nb, precision = 2) {
    return nb.toFixed(precision);
}

export function randomInt(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export function randomPastelColor() {
    const r = Math.floor((Math.random() * 127) + 127);
    const g = Math.floor((Math.random() * 127) + 127);
    const b = Math.floor((Math.random() * 127) + 127);

    const toHex = (c) => c.toString(16).padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function randomInArray(array) {
    if (array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
}

export function missingsElementsPassword(password) {
    let missingsElements = [];
    if (password.length <= 10) missingsElements.push('10 characters')
    if (!password.match(/[a-z]/)) missingsElements.push('1 lowercase letter')
    if (!password.match(/[A-Z]/)) missingsElements.push('1 uppercase letter')
    if (!password.match(/[0-9]/)) missingsElements.push('1 number')
    if (!password.match(/[^a-zA-Z\d]/)) missingsElements.push('1 special character')

    return missingsElements;
}

export function copyToClipboard(text = '') {
    if (!text || text.length < 0) return;

    navigator.clipboard.writeText(text)
}

export function openLink(url, blank = true, encode = true) {
    if (!url || url.length < 0) return;

    url = url.trim();
    if (encode) url = encodeURI(url);

    if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'http://' + url;
    if (!isValidUrl(url, !encode)) return;

    const target = blank ? '_blank' : '_self';
    window.open(url, target);
}