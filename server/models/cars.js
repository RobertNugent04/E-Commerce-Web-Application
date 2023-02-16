const mongoose = require(`mongoose`)

let carsSchema = new mongoose.Schema(
   {
        // id :{type: Number, unique : true, required : true },
        name: {type: String, unique :true, required : true},
        brand: {type: String, required : true},
        gender: {type: String, required : true},
        category : {type: String, required : true},
        price : {type : Number, required : true},
        is_in_inventory : {type: Boolean},
        items_left : {type: Number, required : true},
        imageURL : {type: String, required : false}
   },
   {
       collection: `Shoes`
   })

module.exports = mongoose.model(`Shoes`, carsSchema)