var Express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');

var app = Express();
app.use(cors());


//var MONGO_URL = `mongodb+srv://${username}:${password}@cluster0.lavjtwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const username = "root";
const password = "example";
var MONGO_URL = `mongodb://${username}:${password}@localhost:27017`;

var DBNAME="todoappdb";
var database;

app.listen(5038, () => {
    console.log("Server is running on port 5038");
    MongoClient.connect(MONGO_URL, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DBNAME);
        console.log("Connected to " + DBNAME);
    });
});

app.get('/api/todoapp/GetNotes', (req, res) => {
    database.collection('todoappcollection').find({}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

app.post('/api/todoapp/AddNotes', multer().none(), (req, res) => {
    database.collection('todoappcollection').count({},function(err, nbOfDocs){
        database.collection('todoappcollection').insertOne({
            id: (nbOfDocs + 1).toString(),
            description: req.body.newNotes
        });
        res.json("Note added successfully");
    })
})


app.delete('/api/todoapp/DeleteNotes', (req, res) => {
    console.log(req.query);
    database.collection('todoappcollection').deleteOne({
        id: req.query.id
    });
    res.json("Note deleted successfully");
})