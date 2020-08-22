const express = require('express');
const cors = require('cors');
const middlewares = require('../apis/middlewares');

module.exports = (app) => {
    app.use(cors());
    app.use(express.json());

    app.use(middlewares);
    
    app.get('/', (req, res) => {
        res.send('hello');
    });
};
