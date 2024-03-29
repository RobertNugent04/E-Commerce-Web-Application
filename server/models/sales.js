const mongoose = require(`mongoose`)

let salesSchema = new mongoose.Schema(
   {
        paypalPaymentID: {type: String, required:false},
        // shoeID: {type: String, required:false},
        shoe_name: {type: Object,required:false},
        price: {type: Number, required: false},
        name: {type: String,required:false},
        email: {type: String,required:false},
        shoesID: {type: Object, required: false},
        amount: {type: Object, required: false},
        size: {type: Object, required: false},
        images: {type: Object, required: false}
   },
   {
       collection: `sales`
   })

module.exports = mongoose.model(`sales`, salesSchema)