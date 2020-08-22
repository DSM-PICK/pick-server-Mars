const database = require('./database');
const express_loader = require('./express');

module.exports = async (app) => {
    await database();
    express_loader(app);
};