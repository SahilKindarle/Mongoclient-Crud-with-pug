require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.set('view engine', 'jade')


MongoClient.connect(process.env.API)
    .then(client => {
        console.log("Connected")
        const db = client.db('sample-database')
        const namesCollection = db.collection('names')
        console.log("Connected successfully to server");

        // Adding data
        app.post('/addnames', (req, res) => {

            console.log(req.body)
            namesCollection.insertOne(req.body).then((result) => {
                res.redirect('/')
            }).catch(error => {
                console.error(error)
            })
        })

        // Getting Data
        app.get('/', (req, res) => {

            // res.sendFile(__dirname + '/index.html')
            db.collection('names').find().toArray()
                .then(results => {
                    console.log("Results: ", results)
                    res.render('index.pug', {
                        fullname: results
                    })
                })
                .catch(error => console.error(error))

        })

        // deleting data

        app.post('/deletetask/:id/delete', (req, res) => {
            console.log(req.params.id + "      dsdsdsdsds")
            var id = req.params.id
            console.log(id)
            namesCollection.deleteOne({
                _id: new mongo.ObjectId(id)
            }, function (err, results) {});
            res.json({
                success: id
            })
        })


    })
    .catch(err => console.log("Error: " + err))



app.listen(3000, function () {
    console.log("Listening to 3000")
})

console.log("LOL Wa")