const express = require('express');
const router = express.Router();
const cartModel = require('../models/cart');

// read all records
router.get(`/cart`, (req, res) => {
    //user does not have to be logged in to see car details
    cartModel.find((error, data) => {
        res.json(data)
    })
})

// Read one record
router.get(`/cart/:id`, (req, res) => {
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, { algorithm: "HS256" }, (err, decodedToken) => {
        if (err) {
            res.json({ errorMessage: `User is not logged in` })
        }
        else {
            cartModel.findById(req.params.id, (error, data) => {
                res.json(data)
            })
        }
    })
})

router.post(`/cart/:shoeID/:name/:imageURL/:price/`, (req, res) => {
    // If a user with this email does not already exist, then create new user

    // "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"  Minimum eight characters, at least one letter and one number:
    if (!req.file) {
        cartModel.findOne({ shoeID: req.params.shoeID }, (uniqueError, uniqueData) => {

                        cartModel.create({shoeID:req.params.shoeID, name:req.params.name, imageURL:req.params.imageURL, price:req.params.price}, (error, data) => 
                        {
                            if(data)
                            {
                                res.json({shoeID: data.shoeID, name: data.name, imageURL: data.imageURL, price: data.price, accessLevel:data.accessLevel})
                            }
                            else
                            {
                                res.json({errorMessage:`Shoe not added to cart`})
                            }
                        }) 
                    })
                }
            }
        )
    

module.exports = router;