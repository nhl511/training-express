const {createFormatResponse} = require("../utils/libs");
const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        const formatResponse = createFormatResponse({status: 'error', code: 401, success: true, message: "Invalid credentials"});
        return res.status(401).json(formatResponse);
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            const formatResponse = createFormatResponse({status: 'error', code: 403, success: true, message: "Not have permissions"});
            return res.status(403).json(formatResponse);
        }
        next();
    }catch(err){
        const formatResponse = createFormatResponse({status: 'error', code: 401, success: true, message: "Invalid credentials"});
        return res.status(401).json(formatResponse);
    }
}

module.exports = checkAdmin;