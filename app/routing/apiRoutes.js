// Init node modules
const express = require('express');
const fs = require('fs');
const friends = JSON.parse(fs.readFileSync('./app/data/friends.js', 'utf8', (err, data) => {
    if (err) throw err;
    return data;
}));
const app = module.exports = express();

app.get('/api/friends', function(req, res){
    res.json(friends);
});

app.post('/api/friends', function(req, res){
    const newFriend = req.body;
    const newFriendTotal = newFriend.scores.reduce((acum, cur) => acum += parseInt(cur), 0);
    console.log(friends.reduce(compare(newFriendTotal), {index: -1, bestScore: -1}));
    friends.push(newFriend);
    // res.send(req.body + 'agh');
    // res.send('Post request to friends');
});

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