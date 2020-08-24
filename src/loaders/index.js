const { loadDatabase } = require('./database');
const express_loader = require('./express');

module.exports = async (app) => {
    await loadDatabase();
    express_loader(app);
};