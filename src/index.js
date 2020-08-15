const express = require('express');
const app = express();

const configs = require('./configs');



app.listen(configs.PORT, ()=> {
    console.log(`server starting at ${configs.PORT}...`)
});