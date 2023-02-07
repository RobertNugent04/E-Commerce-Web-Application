const mongoose = require(`mongoose`)

let carsSchema = new mongoose.Schema(
   {
        id :{type: Number},
        name: {type: String},
        brand: {type: String},
        gender: {type: String},
        category : {type: String},
        price : {type : Number},
        is_in_inventory : {type: Boolean},
        items_left : {type: Number}
   },
   {
       collection: `Shoes`
   })

module.exports = mongoose.model(`Shoes`, carsSchema)