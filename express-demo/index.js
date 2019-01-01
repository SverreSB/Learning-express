const express = require('express');
const app = express();

var users = ["David", "Oscar", "Alex", "Holly"];

app.get('/', (req, res) =>{
    res.send('Hello World!!!!');
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

//Hard coded values are not good....
//app.listen(3000, () => console.log('Listening on port 3000...'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));