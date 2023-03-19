const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const carsModel = require(`../models/cars`)
const cartModel = require('../models/cart');




const createNewSaleDocument = (req, res, next) => {
    console.log("BODY: " + req.body)
    console.log("PARAMS: " + JSON.parse(req.params.ids)[1])
    console.log("PARAMS: " + req.params.ids)

    // cartModel.deleteMany( { 'email' : saleDetails.email } );



    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()
    saleDetails.paypalPaymentID = req.params.paymentID
    saleDetails.shoesID = JSON.parse(req.params.ids)
    saleDetails.amount = JSON.parse(req.params.amount)
    saleDetails.size = JSON.parse(req.params.size)
    saleDetails.shoe_name = JSON.parse(req.params.shoeNames)
    // for(let i =0; i<JSON.parse(req.params.ids).length ;i++){
    //     saleDetails.shoesID[i].amount= JSON.parse(req.params.ids)[i]
    // }

    // saleDetails.shoeID = req.params.shoeID
    saleDetails.price = req.params.totalPrice
    saleDetails.name = req.params.name
    // saleDetails.images = JSON.parse(req.params.images)
    saleDetails.email = req.params.email
    // saleDetails.customerName = req.params.customerName
    // saleDetails.customerEmail = req.params.customerEmail
    // console.log()


    for (let i = 0; i < saleDetails.shoesID.length; i++) {

        carsModel.findById({ _id: saleDetails.shoesID[i] }, (err, data) => {
            if (data) {
                if (data.items_left - saleDetails.amount[i] >= 0) {
                    carsModel.findByIdAndUpdate({ _id: saleDetails.shoesID[i], items_left: { $gt: 0 } }, { $inc: { 'items_left': -  saleDetails.amount[i] } }, (err, data) => {
                        if (err) {
                            return next(err)
                        } else {
                            console.log("stockReduced")
                        }
                    })
                }else{
                    console.log("not enough stock")
                }
            } else {
                console.log("no data")
            }
        })

        // carsModel.findByIdAndUpdate({ _id: saleDetails.shoesID[i], items_left: { $gt: 0 }},  { $inc: { 'items_left': -  saleDetails.amount[i]} }, (err, data) => {
        //     if (err) {
        //         return next(err)
        //     }else{
        //         console.log("stockReduced")
        //     }
        // })
        return res.json({success:true})
    }




    cartModel.deleteMany({ email: req.params.email }, (err, data) => {
        if (err) {
            console.log("cart not cleared")
            return next(err)
        } else {
            console.log("cart cleared")
        }
    })



    salesModel.create(saleDetails, (err, data) => {

        if (err) {
            return next(err)
        }
    })
    console.log(saleDetails)

    return res.json({ success: true })



}

router.get(`/history/:email`, (req, res) => {

    salesModel.find({ email: req.params.email }, (error, data) => {
        console.log(data)
        res.json(data)
    })


})

router.put('/sales/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
  
    // check if the shoesID array is empty
    if (updates.shoesID && updates.shoesID.length === 0) {
      // delete the record from the sales database
      salesModel.findByIdAndDelete(id, (err, data) => {
        if (err) {
          console.error("Error deleting sales data:", err);
          return res.status(500).send(err);
        } else {
          console.log("Sales data deleted:", data);
          return res.send(data);
        }
      });
    } else {
      // update the record with the new data
      salesModel.findByIdAndUpdate(id, updates, { new: true }, (err, data) => {
        if (err) {
          console.error("Error updating sales data:", err);
          return res.status(500).send(err);
        } else {
          console.log("Sales data updated:", data);
          return res.send(data);
        }
      });
    }
  });
  

// Save a record of each Paypal payment
// router.post('/sales/:paymentID/:shoeID/:shoe_name/:price/:name/:email', createNewSaleDocument)
router.post('/sales/:paymentID/:ids/:amount/:size/:shoeNames/:name/:email/:totalPrice', createNewSaleDocument)


module.exports = router