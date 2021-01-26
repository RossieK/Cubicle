const handlebars = require('express-handlebars');
const express = require('express');

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
}

module.exports = setupExpress;