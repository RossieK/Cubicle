const handlebars = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('../helpers/authMiddleware');

function setupExpress(app) {

    // Handlebars
    app.engine('hbs', handlebars({
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');

    // Add static files
    app.use(express.static('public'));

    //Body parser
    app.use(express.urlencoded({
        extended: true
    }));

    //Cookie parser
    app.use(cookieParser());

    //Auth middleware
    app.use(auth());
}

module.exports = setupExpress;