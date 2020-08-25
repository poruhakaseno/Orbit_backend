const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
// var env           = require('dotenv').config();

const Tracking = require("./models/tracking");
const trackingsRoutes = require('./routes/trackings');
// const { createShorthandPropertyAssignment } = require('typescript');

const app = express();

// mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
//   auth: {
//     user: process.env.COSMODDB_USER,
//     password: process.env.COSMOSDB_PASSWORDd
//   },
// useNewUrlParser: true,
// useUnifiedTopology: true,
// retryWrites: false,
// })
// .then(() => console.log('Connection to CosmosDB successful'))
// .catch((err) => console.error(err));

mongoose.connect('mongodb://localhost:27017/cloudjam2020', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.post('/api/trackings', (req, res, next) => {
    const tracking = new Tracking({
        trackingNo: req.body.trackingNo
    });
    tracking.save().then(createdTracking => {
        res.status(201).json({
            message: "Trackings added successfully",
            trackingId: createdTracking._id
        });
    });
});

app.get('/api/trackings', (req, res, next) => {
    Tracking.find()
        .then(documents => {
            res.status(200).json({
                message: "Trackings fetch successfully",
                trackings: documents
            });
        });
});

app.delete('/api/trackings/:id', (req, res, next) => {
    Tracking.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "Tracking deleted"
            });
        });
});

// app.use("/api/trackings", trackingsRoutes);

module.exports = app;