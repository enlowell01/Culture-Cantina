const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()


// middlesware
app.use(express.json())

// routes
app.get('/', (req, res) =>{
    res.send('hello world')
})

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));
    

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`listening on port ${PORT}`))