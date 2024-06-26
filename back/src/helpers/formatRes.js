module.exports = (status, data = [], message = null, pagination = {}) => {
        return {
            status,
            message,
            data,
            pagination
        }
    }