const mongoose = require(`mongoose`)

let cartSchema = new mongoose.Schema(
   {
        shoeID: {type: String, required:false},
        name: {type: String,required:false},
      //  imageURL: {type: String,required:false},
        price: {type: Number, required: false},
        size: {type: Number, required: true}
        // name: {type: String,required:false},
        // email: {type: String,required:false}
   },
   {
       collection: `cart`
   })

module.exports = mongoose.model(`cart`, cartSchema)