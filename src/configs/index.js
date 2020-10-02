if (process.env.NODE_ENV != 'not_dev') {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    DB_HOST: process.env.DB_HOST,
};