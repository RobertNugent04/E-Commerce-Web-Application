const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const carsModel = require(`../models/cars`)


const createNewSaleDocument = (req, res, next) => {
    console.log(req.params)
    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()
    saleDetails.paypalPaymentID = req.params.paymentID
    saleDetails.shoeID = req.params.shoeID
    saleDetails.price = req.params.price
    saleDetails.name = req.params.name
    saleDetails.shoe_name = req.params.shoe_name
    saleDetails.email = req.params.email
    // saleDetails.customerName = req.params.customerName
    // saleDetails.customerEmail = req.params.customerEmail
    // console.log()


    carsModel.findByIdAndUpdate({ _id: req.params.shoeID }, { sold: true }, (err, data) => {
        if (err) {
            return next(err)
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

    salesModel.find({email: req.params.email}, (error, data) => {
        console.log(data)
        res.json(data)
    })


})

// Save a record of each Paypal payment
router.post('/sales/:paymentID/:shoeID/:shoe_name/:price/:name/:email', createNewSaleDocument)


module.exports = router