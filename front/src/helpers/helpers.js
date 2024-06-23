export function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}

export function threeDotString(str, maxLen = 100) {
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
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function roundNb(nb, precision = 2) {
    return nb.toFixed(precision);
}

export function getYearFromDate(date) { // take a date as YYYY-MM-DD
    if (date) return date.split("-")[0];
    return "";
}

export function randomInt(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function missingElementsPassword(password) {
    let missing_element = [];
    if (password.length <= 10) missing_element.push('10 characters')
    if (!password.match(/[a-z]/)) missing_element.push('one lowercase letter')
    if (!password.match(/[A-Z]/)) missing_element.push('one uppercase letter')
    if (!password.match(/[0-9]/)) missing_element.push('one number')
    if (!password.match(/[^a-zA-Z\d]/)) missing_element.push('one special character')

    return missing_element;
}