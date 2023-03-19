const express = require('express');
const router = express.Router();
const commentModel = require('../models/comment');

let comments = [
    { "shoeName": "Nike React Infinity Run Flyknit", "comments": ["test", "one", "three", "two"] },
    { "shoeName": "Nike React Miler", "comments": ["test", "one", "three", "two"] }

]

router.get(`/comment/:name`, (req, res) => {
    commentModel.findOne({shoeName:req.params.name}, (error, data) => {
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

module.exports = router;