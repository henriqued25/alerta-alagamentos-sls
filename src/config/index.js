const dotenv = require("dotenv");

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    environment: process.env.NODE_ENV,
};

module.exports = config;
