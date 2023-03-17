const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const carsModel = require(`../models/cars`)
const cartModel = require('../models/cart');




const createNewSaleDocument = (req, res, next) => {
    console.log( "BODY: "+ req.body)
    console.log("PARAMS: " + JSON.parse(req.params.ids)[1])
    console.log("PARAMS: " + req.params.ids)

    // cartModel.deleteMany( { 'email' : saleDetails.email } );
    


    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()
    saleDetails.paypalPaymentID = req.params.paymentID
    saleDetails.shoesID = JSON.parse(req.params.ids)
    saleDetails.amount = JSON.parse(req.params.amount)
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
    
    
    for(let i=0;i<saleDetails.shoesID.length;i++){

        carsModel.findByIdAndUpdate({ _id: saleDetails.shoesID[i]},  { $inc: { 'items_left': -  saleDetails.amount[i]} }, (err, data) => {
            if (err) {
                return next(err)
            }else{
                console.log("stockReduced")
            }
        })
    }
        
    
   
    
    cartModel.deleteMany( { email : req.params.email } );

    
    salesModel.create(saleDetails, (err, data) => {

        if (err) {
            return next(err)
        }
    })
    console.log(saleDetails)

    return res.json({ success: true })

   

}

router.get(`/history/:email`, (req, res) => {

    salesModel.find({email: req.params.email}, (error, data) => {
        console.log(data)
        res.json(data)
    })


})

// Save a record of each Paypal payment
// router.post('/sales/:paymentID/:shoeID/:shoe_name/:price/:name/:email', createNewSaleDocument)
router.post('/sales/:paymentID/:ids/:amount/:shoeNames/:name/:email/:totalPrice', createNewSaleDocument)


module.exports = router