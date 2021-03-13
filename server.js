if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Requirements
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

// Settings
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({limit: '10mb', extended:false}))
// Database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser:true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to DB'))

// Routers
app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(process.env.PORT || 3000)