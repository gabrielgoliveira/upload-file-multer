const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

routes.post('/', multer(multerConfig).single('file'), (req, res) => {
    console.log(req.file)
    return res.send('Hello Friednd');
});

module.exports = routes;