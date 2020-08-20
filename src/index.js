const express = require('express');
const init_app = require('./loaders');
const configs = require('./configs');

const app = express();
init_app(app);

app.listen(configs.PORT, ()=> {
    console.log(`server starting at ${configs.PORT}...`)
});