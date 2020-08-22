const express = require('express');
const cors = require('cors');
const middlewares = require('../apis/middlewares');
const logger = require('./logger');

module.exports = (app) => {
    app.use(cors());
    app.use(express.json());

    app.use(middlewares);
    
    app.get('/', (req, res) => {
        res.send('hello');
    });


    app.use((err, req, res, next) => {
        const status = err.status || 500;
        logger.error(
            `${req.method} ${req.url} ${status} : ${err.message}`
        );
        res.status(err.status || 500);
        res.json({
            message: err.message,
            status: err.status
        });
    });

};
