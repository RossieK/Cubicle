const config = require('./config/config');
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

// Handlebars
app.engine('hbs', handlebars({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { layout: false });
});

// Server listening
app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));