const config = require('./config/config');
const express = require('express');
const expressConfig = require('./config/express');

// Initialize app
const app = express();
expressConfig(app);

// Routes
app.get('/', (req, res) => {
    res.render('index', { layout: false });
});

// Server listening
app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));