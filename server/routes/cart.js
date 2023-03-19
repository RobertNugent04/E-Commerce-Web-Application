const express = require('express');
const router = express.Router();
const cartModel = require('../models/cart');
const carsModel = require('../models/cars');
const usersModel = require(`../models/users`);
const users = require('../models/users');
// const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

// read all records
router.get(`/cart`, (req, res) => {
  //user does not have to be logged in to see car details
  cartModel.find((error, data) => {
    res.json(data)
  })
})

//get by email
router.get(`/cart/:email`, (req, res) => {
  //user does not have to be logged in to see car details
  cartModel.find({ email: req.params.email }, (error, data) => {
    console.log(req.params.email)
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

router.post(`/cart/:shoeID/:name/:price/:size/:email`, (req, res) => {
  if (!req.file) {
    let image = null;
    carsModel.findById(req.params.shoeID, (error, data) => {
      image = data.imageURL
      // console.log("INSIDE" + image)
      cartModel.findOneAndUpdate({ shoeID: req.params.shoeID, email: req.params.email, price: req.params.price, name: req.params.name, imageURL: image, size: req.body.size }, { $inc: { 'amount': 1 } }, { upsert: true }, (error, data) => {
      })
    })
    usersModel.findOneAndUpdate({ email: req.params.email }, { $inc: { 'cart_item': 1 } }, (error, data) => {
      console.log("cart item added")
    })



    // console.log("outside" + image)




    // console.log("ERROR")
    // cartModel.create({
    //   shoeID: req.params.shoeID,
    //   name: req.params.name,
    //   price: req.params.price,
    //   size: req.body.size,
    //   imageURL: image,
    //   email: req.params.email,
    //   amount: 1

    // }, (error, data) => {
    //   if (data) {
    //     res.json({
    //       shoeID: data.shoeID,
    //       name: data.name,
    //       price: data.price,
    //       size: req.body.size,
    //       imageURL: data.imageURL, // Return size in the response
    //       accessLevel: data.accessLevel,
    //       email: data.email,
    //       amount: data.amount
    //     })
    //   }
    //   else {
    //     // console.log(error)
    //     res.json({ errorMessage: `Shoe not added to cart` })
    //   }
    // })






  }
})


// Delete one record
router.delete(`/cart/:id/:email/:amount`, (req, res) => {
  console.log(req.params)
  let totalAmount = 0

  usersModel.findOneAndUpdate({ email: req.params.email }, { $inc: { 'cart_item': -(req.params.amount) } }, (error, data) => {
    console.log(req.params.email)
  })

  cartModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data)
    console.log("Cart Item Deleted")
  })


})

router.delete(`/cartdelete/:email`, (req, res) => {
  console.log("cart reset")
  cartModel.deleteMany({ email: req.params.email }, (error, data) => {
    res.json(data)
  })

})


module.exports = router;