const createFormatResponse = ({
    status,
    code,
    success,
    message,
    data,
    accessToken,
    errors,
    count,
}) => {
    return {
        status,
        code,
        success,
        message,
        data,
        accessToken,
        errors,
        count
    }
}

module.exports = {createFormatResponse}