const express = require('express');
const app = express();

var users = ["David", "Oscar", "Alex", "Holly"];

app.get('/', (req, res) =>{
    res.send('Hello World');
});

//when users branch is requested, the response is created and sent
//This response is users in static array. 
app.get('/api/users', (req, res) => {
    var userString = "";
    for(var user of users){
        userString += user;
        userString += "; ";
    }
    res.send(`${userString}`);
    
});

app.listen(3000, () => console.log('Listening on port 3000...'));