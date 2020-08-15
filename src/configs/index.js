if (process.env.NODE_ENV != 'not_dev') {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    DB_PASSWORD: process.env.DB_PASSWORD
}