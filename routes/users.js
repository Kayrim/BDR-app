const express = require('express')
const router = express.Router();
const User = require('../models/user')


// All Users
router.get('/' , async (req,res) => {
let searchOptions = {}
if (req.query.username != null && req.query.username !== '') {
    searchOptions.username = new RegExp(req.query.username, 'i')
}
    try {
        const users = await User.find(searchOptions)
        res.render('users/index', { 
            users: users,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }
    res.render('users/index')
})

// New User
router.get('/new' , (req,res) => {
    res.render('users/new',{user: new User()})
})

// Create Users
router.post('/' , async (req,res) => {
    const user  = new User({
        username : req.body.username
    })

    try {
        const newUser = await user.save()
        res.redirect(`users`)
    } catch (error) {
        res.render('users/new', {
        user:user,
        errorMessage: error
        })
    }
})

module.exports = router