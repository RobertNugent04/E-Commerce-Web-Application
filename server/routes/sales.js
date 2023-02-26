const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const carsModel = require(`../models/cars`)


const createNewSaleDocument = (req, res, next) => 
{   
    console.log(req.params)        
    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()
    saleDetails.paypalPaymentID = req.params.paymentID
    saleDetails.shoeID = req.params.shoeID
    saleDetails.price = req.params.price
    saleDetails.name= req.params.name
    saleDetails.email= req.params.email
    // saleDetails.customerName = req.params.customerName
    // saleDetails.customerEmail = req.params.customerEmail
    // console.log()
        
        
    carsModel.findByIdAndUpdate({_id:req.params.shoeID}, {sold: true}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
    }) 
    
    salesModel.create(saleDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }                        
    })   
    console.log(saleDetails)
    return res.json({success:true})
}


// Save a record of each Paypal payment
router.post('/sales/:paymentID/:shoeID/:price/:name/:email', createNewSaleDocument)


module.exports = router