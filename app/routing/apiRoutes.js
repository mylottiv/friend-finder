// Init node modules
const express = require('express');
const path = require('path');
const app = module.exports = express();

app.get('/api/friends', function(req, res){
    res.sendFile(path.join(__dirname.replace('routing', 'data'),'friends.js'));
});

app.post('/api/friends', function(req, res){
    res.send('Post request to friends');
});