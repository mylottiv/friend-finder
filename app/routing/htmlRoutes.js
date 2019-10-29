// Init node modules
const express = require('express');
const path = require('path');
const app = module.exports = express();

// Set HTML Controllers
app.get('/:home?', function(req, res){
    res.sendFile(path.join(__dirname.replace('routing', 'public'),'home.html'));
})

app.get('/survey', function(req, res){
    res.sendFile(path.join(__dirname.replace('routing', 'public'),'survey.html'));
})
