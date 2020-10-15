const express = require('express');
const cors = require('cors');
const middlewares = require('../apis/middlewares');
const logger = require('./logger');

const { router, router_passed_middleware }  = require('../apis/routes');


module.exports = (app) => {
    app.use(cors());
    app.use(express.json());

    app.use((req, res, next) => {
        console.log(`[recieve] ${req.method} ${req.url}`);
        next();
    });

    app.use('/mars/', router);
    
    app.use(middlewares);
    app.use('/mars/', router_passed_middleware);

    app.use((err, req, res, next) => {
        const status = err.status || 500;
        logger.error(
            `${req.method} ${req.url} ${status} : ${err.message}`
        );
        console.log(err);
        res.status(err.status || 500);
        res.json({
            message: err.message,
            status: err.status
        });
    });

};
