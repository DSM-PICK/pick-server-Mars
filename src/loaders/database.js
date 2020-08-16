const { Sequelize } = require('sequelize');
const { DB_PASSWORD } = require('../configs');
const logger = require('./logger');


const sequelize = new Sequelize('pick', 'root', DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = async () => {
    try {
        await sequelize.authenticate();    
    } catch (error) {
        throw error;
    }
}
