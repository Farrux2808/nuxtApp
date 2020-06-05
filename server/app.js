const express = require('express')
const bodyParser = require('body-parser')
const keys = require('./keys')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.routes')
const app = express()

mongoose.connect(keys.MONGO_URL).then(()=>{
    console.log("MongoDb connected...");
    
}).catch(error => console.error(error))

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)

module.exports = app