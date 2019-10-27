// Init node modules
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Init routing modules
const apiRouter = require('./app/routing/apiRoutes.js');
const htmlRouter = require('./app/routing/htmlRoutes.js');
app.use(apiRouter);
app.use(htmlRouter);


// Launch server
app.listen(PORT, function () {
    console.log('Listening on port', PORT);
})

function compare(newFriendTotal){
    return function(acum, cur, i) {
    //     console.log('friend', newFriendTotal);
    //     console.log('reduce', acum, cur, i)
        let curTotal = cur.scores.reduce((acum, cur) => acum += parseInt(cur), 0);
        let difference = Math.abs(curTotal - newFriendTotal)
        console.log(difference);
        if (difference <= acum.bestScore || (acum.bestScore === -1 && acum.index === -1)){
            acum.bestScore = difference;
            acum.index = i
        }
        return acum;
    }
}