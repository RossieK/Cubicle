const config = require('./config/config');
const express = require('express');
const expressConfig = require('./config/express');
const routes = require('./routes');

// Initialize app
const app = express();
expressConfig(app);

// Routes
app.use(routes);

// Server listening
app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));