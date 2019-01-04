const Joi = require('joi');
var fs = require('fs');
const logger = require('morgan');
const express = require('express');
const app = express();



app.use(express.json());

//Writing a log to a txt file everytime a request is made
app.use(logger('common', {
    stream: fs.createWriteStream('log/request_logs.txt', {flags: 'a'})
}));
//Prints log to console
app.use(logger('dev'));

/*app.use((req, res, next) => {
    logger.authenticate(req, res, next);
});*/

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
    res.send(users); 
});

//When name is requested it creates a user with id array size + 1
app.post('/api/users', (req, res) => {
    result = validateUser(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const user = {
        id: users.length + 1, 
        name: req.body.name,
    };

    users.push(user);
    res.send(user);
});

//Update name of user based on id given in route. 
app.put('/api/users/:id', (req, res) => {

    const user = lookUpUser(req.params.id);
    if(!user) return res.status(404).send('The user with given ID was not found');
    
    result = validateUser(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    
    user.name = req.body.name;
    res.send(user);

});

//Added logic to find user based on id in route. 
app.get('/api/users/:id', (req, res) => {
    //const user = users.find(c => c.id === parseInt(req.params.id));
    const user = lookUpUser(req.params.id);
    if(!user) return res.status(404).send("Error, user does not exist");
    
    res.send(user);
    
});

app.delete('/api/users/:id', (req, res) => {
    const user = lookUpUser(req.params.id);

    if(!user) return res.status(404).send("Error, user does not exist");

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));


//Function for validating name length using joi
function validateUser(user){
    const schema = {
        //Require 2 chars to post user request. 
        name: Joi.string().min(2).required()
    };

    return Joi.validate(user, schema);
}

//Function for finding user based on id
function lookUpUser(id){
    return users.find(c => c.id === parseInt(id));
}