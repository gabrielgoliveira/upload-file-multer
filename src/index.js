const express = require('express');
const morgan = require('morgan');


/*imports local */
const routers = require('./routes');

const app = express();
const dev = morgan('dev');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(dev);

app.use(routers);


app.listen(3001);