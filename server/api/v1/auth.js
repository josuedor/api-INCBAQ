const jwt = require('jsonwebtoken');
const config = require('./../../config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization || req.body.token || req.query.token;
    if (token){
        jwt.verify(token, config.jwt.secret, (err, decoded) => {
           if (err) {
                res.status(401).json({
                   message: "Unauthorized"
                });
           } else {
                req.decoded = decoded;
                next();
           }
        });
    } else {
        res.status(403).json({
            message: "Access denied"
        });
    }
};