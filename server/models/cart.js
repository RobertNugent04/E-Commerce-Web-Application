const mongoose = require(`mongoose`)

let cartSchema = new mongoose.Schema(
   {
        shoeID: {type: String, required:false},
        shoe_name: {type: String,required:false},
        price: {type: Number, required: false},
        name: {type: String,required:false},
        email: {type: String,required:false}
   },
   {
       collection: `cart`
   })

module.exports = mongoose.model(`cart`, cartSchema)