import { useAuthStore } from '@/stores/auth'

export function isMobile() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

export function threeDotsString(str, maxLen = 100) {
    if (!str) return "";
    if (str.length <= maxLen) return str;
    return str.slice(0, maxLen).trim() + " ...";
}

export function ageFromDate(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
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

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255 && email.length >= 5 && !email.includes("&") && !email.includes(" ");
}

export function isValidDate(date) {
    return !isNaN(new Date(date)) && (new Date(date) !== "Invalid Date");
}

export function isValidColor(color) {
    return (color.length === 7 && color[0] === '#' && color.match(/^[0-9A-Fa-f]+$/))
}

export function roundNb(nb, precision = 2) {
    return nb.toFixed(precision);
}

export function roundNbNice(nb, precision = 2) {
    let number = nb.toFixed(precision);
    if (number.includes('.')) number = number.replace(/\.?0+$/, ''); // Remove all trailing zeros
    return number;
}

export function getYearFromDate(date) {
    if (date) return date.split("-")[0];
    return "";
}

export function dateToNiceDate(date, language = 'en-US', options = { year: 'numeric', month: 'long', day: 'numeric' }) {
    const authStore = useAuthStore()
    const local = authStore?.user?.language || language || 'en-US'
    if (date) return new Date(date).toLocaleDateString(local, options);
    return "";
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