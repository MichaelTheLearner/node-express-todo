const express = require('express');
const app =  express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 1111;
require('dotenv').config();


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todoAPI'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.get('/', (request, response)=>{
    db.collection('actionLists').find().sort({listNumber: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { listData: data })
    })
    .catch(error => console.error(error))
})

app.post('/addToDo', (request, response) => {
    db.collection('actionLists').updateOne({_id: request.body.id},
                                            {
                                                $push: {
                                                    tasks: {taskName: request.body.taskName}
                                                        }
                                            })
                                            .then(result => {
                                                console.log(`Added task: ${request.body.taskName} to List: ${request.body.id}`)
                                                response.redirect('/')
                                            })
                                            .catch(error => console.error(error))

})

app.post('/addList', (request, response) => {
    db.collection("actionLists").insertOne({
                                            tasks: []
                                            })
                                            .then(result => {
                                                console.log('Added New List')
                                                response.redirect('/')
                                            })
                                            .catch(error => console.error(error))
})



app.listen(process.env.PORT || PORT, ()=>{ 
    console.log(`Server running on port ${PORT}`);
})