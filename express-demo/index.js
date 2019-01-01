const express = require('express');
const app = express();

app.use(express.json());

const users = [
    {id: 1, name: "David"}, 
    {id: 2, name: "Oscar"}, 
    {id: 3, name: "Alex"}, 
    {id: 4, name: "Holly"},
];

app.get('/', (req, res) =>{
    res.send('Hello World!!!!');
});


//when users branch is requested, the response is created and sent
//This response is users in static array. 
app.get('/api/users', (req, res) => {
    var userString = "[";
    users.forEach(user => {
        userString += `{id: ${user.id} name: ${user.name}}, `;
        /*userString += user.name;
        userString += "; ";*/
    });
    userString += "]";
    res.send(`${userString}`); 
});

//When name is requested it creates a user with id array size + 1
app.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1, 
        name: req.body.name,
    };
    users.push(user);
    res.send(user);
});

//Added logic to find user based on id in route. 
app.get('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user){
        res.status(404).send("Error, user does not exist");
    }else{
        res.send(user);
    }
});

//Hard coded values are not good....
//app.listen(3000, () => console.log('Listening on port 3000...'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));