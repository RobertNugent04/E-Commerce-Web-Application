const express = require('express');
const router = express.Router();
const commentModel = require('../models/comment');
const jwt = require('jsonwebtoken')

const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

let comments = [
    { "shoeName": "Nike React Infinity Run Flyknit", "comments": ["test", "one","twpo" ,"three" ], "userName" :["a","a","a","a"] },
    { "shoeName": "Nike React Miler", "comments": ["test", "one","twpo" ,"three" ], "userName" :["a","a","a","a"] } 

]

router.get(`/comment/:name`, (req, res) => {
    commentModel.findOne({shoeName:req.params.name}, (error, data) => {
        console.log(data)
        res.json(data)

    })
})

router.get(`/reset`, (req, res) => {


    commentModel.deleteMany({}, (error, data) => {
    })

    comments.map(comment => {

        // console.log(shoe)
        commentModel.create(comment, (error, data) => {

        })
    })

})

router.put(`/comment/:name/`, (req, res) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) {
            res.json({ errorMessage: `User is not logged in` })
        }
        else {
            if (decodedToken.accessLevel > process.env.ACCESS_LEVEL_Guest) {
               console.log(req.body.comment)
                commentModel.updateOne({shoeName:req.params.name}, { $push: {comments: req.body.comment, userName:req.body.userName} }, (error, data) => {
                    console.log("found" + data)
                    res.json(data)
                })
                
            }
            else {
                res.json({ errorMessage: `User is not an administrator, so they cannot add new records` })
            }
        }
    })
})

module.exports = router;