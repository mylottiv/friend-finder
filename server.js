// Init node modules
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Init routing modules
const apiRouter = require('./app/routing/apiRoutes.js');
const htmlRouter = require('./app/routing/htmlRoutes.js');
app.use(apiRouter);
app.use(htmlRouter);


// Launch server
app.listen(PORT, function () {
    console.log('Listening on port', PORT);
})

