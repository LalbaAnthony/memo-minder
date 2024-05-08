module.exports = {
    fullRes: (status, data = [], message = null) => {
        return {
            status,
            message,
            data
        }
    },
}