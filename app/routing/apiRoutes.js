// Init node modules
const express = require('express');
const fs = require('fs');
// JSON file is imported wrapped in brackets to cast as array
const friends = JSON.parse('[' + fs.readFileSync('./app/data/friends.json', 'utf8', (err, data) => {
    if (err) throw err;
    return (data);
}) + ']');
console.log(friends);
const app = module.exports = express();

// Set api controller for get requests
app.get('/api/friends/:friend?', function(req, res){
    if (!req.param.friend) {
        res.json(friends);
    } else {
        res.json(friends.find(req.param.friend));
    }
});

// Set api controller for new friends post requets
app.post('/api/friends', function(req, res){
    const newFriend = req.body;
    const newFriendTotal = newFriend.scores.reduce((acum, cur) => acum += parseInt(cur), 0);

    // Index and bestScore set to -1 as initialization flags
    const bestFriend = friends.reduce(compare(newFriendTotal), {index: -1, bestScore: -1});
    console.log(friends[bestFriend.index]);

    // Adds new friend to saved array and saves it to file
    friends.push(newFriend);

    // Custom JSON parsing
    newFriendString = ',\n' + JSON.stringify(newFriend).replace(/[\[,\{]/g, '$&\n\t').replace(/[\]]/, '\n\t$&\n').replace(/"([0-9]*)"/g, '$1');
    
    // JSON file is saved as comma separated list of objects
    fs.appendFile('./app/data/friends.json', newFriendString, (err) => {
        if (err) throw err; 
        console.log('New Friend saved to database!');
    });
    res.json(friends[bestFriend.index]);
});

// Reducer that compares score differences between the new friend and saved friends
function compare(newFriendTotal){
    return function(acum, cur, i) {

        // Compares the difference between the score sums of the new friend and a saved friend
        let curTotal = cur.scores.reduce((acum, cur) => acum += parseInt(cur), 0);
        let difference = Math.abs(curTotal - newFriendTotal);

        // The best difference is the one closest to zero, unless the -1 init flags
        if (difference <= acum.bestScore || (acum.bestScore === -1 && acum.index === -1)){

            // Saves the high score for comparison and the index for later reference
            acum.bestScore = difference;
            acum.index = i
        
        }
        return acum;
    }
}