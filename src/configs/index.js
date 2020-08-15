if (process.env.NODE_ENV == 'dev') {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    DB_PASSWORD: process.env.DB_PASSWORD
}