require('dotenv').config()

const config = { 
    hostname: process.env.IP,
    port: process.env.PORT,
    db: {
        url: process.env.DBURL
    },
    cors: {
        origin: process.env.ORIGIN || '*',
        credentials: process.env.CREDENTIALS
    },
    jwt: {
        secret: process.env.JWTSECRET
    }
};

module.exports = config;