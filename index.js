'use strict';
const env = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./app/routes/userRoutes');
const movieRoutes = require('./app/routes/movieRoutes');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({ message: err });
    }
}) 

app.listen(3000);