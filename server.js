require('dotenv').config();
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb')
const url = 'mongodb://localhost:27017/'

const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.set('view engine', 'jade')


// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:27017/sampledb/names');

// });


MongoClient.connect(url)
    .then(client => {
        console.log("Connected")
        const db = client.db('sampledb')
        const namesCollection = db.collection('names')
        console.log("Connected successfully to server");

        // Adding data
        app.post('/addnames', (req, res) => {

            console.log(req.body)
            db.collection('names').insertOne(req.body).then((result) => {
                res.redirect('/index1')
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
                    // return results
                })
                .catch(error => console.error(error))

        })



        app.get('/one', (req, res) => {

            // res.sendFile(__dirname + '/index.html')
            db.collection('names').find().toArray()
                .then(results => {
                    console.log("Results one: ", results)
                    res.send(results)
                    // res.render('index.pug', {
                    //     fullname: results
                    // })
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


        app.get('/index1', (req, res) => {
            res.sendFile(path.join(__dirname, './index1.html'))
        })

    })
    .catch(err => console.log("Error: " + err))



app.listen(3200, function () {
    console.log("Listening to 3000")
})

console.log("LOL Wa")