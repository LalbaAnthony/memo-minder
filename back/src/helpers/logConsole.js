module.exports = (msg, type) => {
    if (!msg) return;

    const color = {
        red: "\x1b[31m%s\x1b[0m",
        green: "\x1b[32m%s\x1b[0m",
        blue: "\x1b[34m%s\x1b[0m",
        yellow: "\x1b[33m%s\x1b[0m",
        cyan: "\x1b[36m%s\x1b[0m",
        magenta: "\x1b[35m%s\x1b[0m",
        white: "\x1b[37m%s\x1b[0m",
        black: "\x1b[30m%s\x1b[0m",
    };

    msg = `[${process.env.BACK_APP_NAME || 'app'}] ${msg}`;

    switch (type) {
        case 'error':
            console.error(color.red, msg);
            break;
        case 'warn':
            console.warn(color.yellow, msg);
            break;
        case 'info':
            console.info(color.blue, msg);
            break;
        case 'success':
            console.info(color.green, msg);
            break;
        default:
            console.log(color.white, msg);
            break;
    }
}