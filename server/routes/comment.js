const express = require('express');
const router = express.Router();
const commentModel = require('../models/comment');

let comments = [
    { "shoeID": "64137fa8c16fe84a18be3d1a", "comments": ["test", "one", "three", "two"] },
    { "shoeID": "64137fa8c16fe84a18be3d1b", "comments": ["test", "one", "three", "two"] }

]

router.get(`/comment/:id`, (req, res) => {
    commentModel.findOne({shoeID:req.params.id}, (error, data) => {
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