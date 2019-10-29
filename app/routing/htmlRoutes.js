// Init node modules
const express = require('express');
const path = require('path');
const app = module.exports = express();

// Set HTML Controllers
app.get('/:home?', function(req, res, next){
    if (!req.params.home || req.params.home === 'home') {
        console.log(req.params.home, 'triggered')
        res.sendFile(path.join(__dirname.replace('routing', 'public'),'home.html'));
    }
    else {
        next('route');
    }
})

app.get('/survey', function(req, res){
    res.sendFile(path.join(__dirname.replace('routing', 'public'),'survey.html'));
})

app.use(function(req, res){
    res.sendStatus(404);
});